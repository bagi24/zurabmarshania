const textElement = document.getElementById('typing-text');
const words = ['ექიმი სექსოლოგი', 'მკვლევარი'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let pauseBetweenWords = 2000;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
    textElement.textContent = currentWord.substring(0, charIndex);
  } else {
    charIndex++;
    textElement.textContent = currentWord.substring(0, charIndex) + '__';
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, pauseBetweenWords);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
}

document.addEventListener('DOMContentLoaded', type);

window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

function smoothScrollTo(targetY, duration = 1200) {
  const startY = window.scrollY;
  const distanceY = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // 0 to 1

    // Easing ფუნქცია – უფრო "სუსტი" დაწყება და დამთავრება
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startY + distanceY * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// ღილაკის ქლიქზე ეშვება
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const targetOffset = targetElement.offsetTop - 80; // -80px for header
      smoothScrollTo(targetOffset, 1200); // 1200ms -> ნელა

      history.pushState(null, null, targetId);
    }
  });
});

const selected = document.querySelector('.language-switcher__selected');
const dropdown = document.querySelector('.language-switcher__dropdown');

selected.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
});

// Dropdown ავტომატურად დაიხუროს სხვა ადგილას დაკლიკებისას
document.addEventListener('click', e => {
  if (!document.querySelector('.header__language-switcher').contains(e.target)) {
    dropdown.style.display = 'none';
  }
});
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('gender-loader');
    loader.style.display = 'none';
  }, 0);
});

// ყველა ბმულის არჩევა
const navLinks = document.querySelectorAll('.nav-list__link');

// თითოეულ ბმულზე click-ის დაკვირვება
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    // წავშალოთ active კლასი ყველა ბმულიდან
    navLinks.forEach(link => link.classList.remove('nav-list__link--active'));

    // დავამატოთ active კლასი იმ ბმულს, რომელზეც დააწკაპუნეს
    this.classList.add('nav-list__link--active');
  });
});

document.querySelector('.header__logo').addEventListener('click', function (e) {
  e.preventDefault();
  const section = document.querySelector('#main-section');
  if (section) {
    const offset = section.offsetTop - 80;
    smoothScrollTo(offset);
    history.pushState(null, null, '#main-section');
  }
});

const selectedFlagImg = document.querySelector('.language-switcher__selected img');
const dropdownMenu = document.querySelector('.language-switcher__dropdown');
const languageOptions = document.querySelectorAll('.language-switcher__item img');
const selectedWrapper = document.querySelector('.language-switcher__selected');
const languageSwitcherContainer = document.querySelector('.header__language-switcher');

//ენის შეცვლა

// თარგმანის მონაცემები (მაგალითად)

async function updateTexts(lang) {
  const res = await fetch('./translate.json');
  const allTranslations = await res.json();
  const translations = allTranslations[lang]; // აი აქ! მხოლოდ ერთი ენა

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations && translations[key]) {
      el.textContent = translations[key];
    }
  });
}

// თავდაპირველი ენა
let currentLanguage = 'ge';
updateTexts(currentLanguage);

// Dropdown-ის გამოჩენა/დამალვა
selectedWrapper.addEventListener('click', e => {
  e.stopPropagation(); // არ გადავიდეს document-ზე
  dropdownMenu.classList.toggle('show');
});

// გარეთ დაკლიკებისას dropdown-ის დახურვა
document.addEventListener('click', event => {
  if (!languageSwitcherContainer.contains(event.target)) {
    dropdownMenu.classList.remove('show');
  }
});

// ენის შეცვლა dropdown-დან
languageOptions.forEach(option => {
  option.addEventListener('click', e => {
    e.stopPropagation();
    const selectedLang = option.getAttribute('data-language');

    if (selectedLang) {
      selectedFlagImg.src = option.src;
      selectedFlagImg.alt = option.alt;

      changeLanguage(selectedLang);

      dropdownMenu.classList.remove('show');
      dropdown.style.display = 'none';
    }
  });
});

/*  burger Menu */
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  const navList = document.getElementById('nav');

  burger.addEventListener('click', function () {
    navList.classList.toggle('active');
    burger.classList.toggle('open');
  });
});

function showClockDetails() {
  document.getElementById('clockDisplay').style.display = 'block';
}

function hideClockDetails() {
  document.getElementById('clockDisplay').style.display = 'none';
}

function toggleBio() {
  const bioText = document.querySelector('.bio__text');
  const button = document.querySelector('.bio__toggle-btn');
  const isExpanded = bioText.classList.toggle('expanded');
  button.textContent = isExpanded ? 'შეკუმშვა' : 'სრულად ნახვა';
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

const fadeElements = document.querySelectorAll('.fade-slide-up');
fadeElements.forEach(el => observer.observe(el));

///ენის პარამეტრები

i18next.use(i18nextHttpBackend).init(
  {
    lng: 'ge',
    fallbackLng: 'ge',
    debug: true,
    backend: {
      loadPath: './locales/{{lng}}/translation.json', // შენს სტრუქტურაზე ზუსტად ასე
    },
  },
  function (err, t) {
    if (err) return console.error(err);
    updateContent();
  }
);

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18next.t(key);
  });
}

function changeLanguage(lang) {
  i18next.changeLanguage(lang, () => {
    updateContent();
  });
}
