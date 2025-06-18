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

// თარგმანის მონაცემები (მაგალითად)
const translations = {
  ge: {
    main: 'მთავარი',
    bio: 'ბიოგრაფია',
    articles: 'სტატიები',
    books: 'წიგნები',
    contact: 'კონტაქტი',
    hero_title: 'ზურაბ მარშანია',
    hero_subtitle: 'პროფესორი',
    hero_button: 'დეტალურად',
    call_text: 'ვიზიტის ჯავშნისთვის დაგვიკავშირდით',
    books_promo_title: 'ავტორის გამოცემა',
    bestseller_badge: 'ბესტსელერი',
    new_badge: 'ახალი',
    book1_title: 'სექსუალური ჯანმრთელობის საფუძვლები',
    book1_author: 'ზურაბ მარშანია',
    book1_description:
      'წიგნი, რომელიც ყოველმხრივ აშუქებს ადამიანის სექსუალური ჯანმრთელობის საკითხებს.',
    buy_button: 'ყიდვა',
    book2_title: 'პარტნიორობის ფსიქოლოგია',
    book2_author: 'ზურაბ მარშანია',
    book2_description: 'თანამედროვე ურთიერთობების ფსიქოლოგიური ასპექტების გაშიფვრა.',
    bio_title: 'ბიოგრაფია',
    bio_subtitle: ' ზურაბ მარშანია - ექიმი სექსოლოგი, მედიცინის აკადემიური დოქტორი',
    bio_text:
      '   ზურაბ მარშანია - ექიმი სექსოლოგი, მედიცინის აკადემიური დოქტორი, საქართველოს ეროვნული უნივერსიტეტი - სეუ-ს მედიცინის ფაკულტეტის სექსოლოგიის სრული პროფესორი, ევროპის სამედიცინო სექსოლოგიის საზოგადოებასთან (European Society for Sexual Medicine) აფილირებული ეროვნული საზოგადოების (National Associated Society) - საქართველოს სამედიცინო სექსოლოგიის საზოგადოების პრეზიდენტი, საქართველოს საბუნებისმეყველო მეცნიერებათა აკადემიის ნამდვილი წევრი. სექსოლოგ - კლინიცისტად მუშაობა დაიწყო 1988 წელს ი.ჟორდანიას სახ. სამეცნიერო კვლევით ინსტიტუტში. ამჟამად კლინიკურ პრაქტიკას (პაციენტების ამბულატორიულ მიღებას) აგრძელებს "ზურაბ მარშანიას სამედიცინო სექსოლოგიის კაბინეტში"; (წინასწარი ჩაწერა ტელეფონზე 599 641187 აუცილებელია) ორშაბათიდან პარასკევის ჩათვლით 10 საათიდან 15 საათამდე, მისამართზე, ქ.თბილისი, თევდორე მღვდლის ქ. 48, კორპუსი Iა, ბინა 2. ზურაბ მარშანიამ საქართველოში, აშშ-ში, ესპანეთში, პორტუგალიაში, თურქეთში, შვედეთში, დანიაში, ესტონეთში და უკრაინაში გამოაქვეყნა მრავალი ათეული სამეცნიერო ნაშრომი და გააკეთა მოხსენებები საერთაშორისო კონფერენციებზე, ხოლო ქალისა და მამაკაცის სექსუალური დისფუნქციების საკითხებზე საჯარო ლექციების წასაკითხად, მიწვეული იყო ჩეხეთის, უნგრეთისა და სლოვენიის რესპუბლიკებში. ზ.მარშანია პოლიტიკურ მეცნიერებათა დოქტორიცაა, 1998 წელს მინიჭებული აქვს საგანგებო და სრულუფლებიანი დესპანის დიპლომატიური რანგი და წლების განმავლობაში ხელმძღვანელობდა საქართველოს დიპლომატიურ მისიებს ბალტიის ქვეყნებსა და უკრაინაში.',
    articles_title: 'სტატიები',
    article1_title: 'სექსუალური განათლების მნიშვნელობა',
    article1_excerpt:
      'როგორ ვასწავლოთ ახალგაზრდებს სექსუალობა სწორად და კულტურულად – პროფესორის მოსაზრება.',
    article1_link: 'სრულად წაკითხვა',
    article2_title: 'გენდერული იდენტობის ფსიქოლოგია',
    article2_excerpt:
      'როგორ ყალიბდება გენდერული იდენტობა და რა როლი აქვს გარემოს ფსიქოლოგიურ განვითარებაში.',
    article2_link: 'სრულად წაკითხვა',
    contact_title: 'კონტაქტი',
    contact_location_label: 'მისამართი',
    contact_location_text: 'თბილისი, წინანდლის ქუჩა 9',
    contact_phone_label: 'ტელეფონი',
    contact_phone_text: '+995 599 12 34 56',
    contact_call_text: 'ვიზიტის ჯავშნისთვის დაგვიკავშირდით',
  },
  en: {
    main: 'Main',
    bio: 'Biography',
    articles: 'Articles',
    books: 'Books',
    contact: 'Contact',
    hero_title: 'Zurab Marshania',
    hero_subtitle: 'Professor',
    hero_button: 'Details',
    call_text: 'Contact us to book a visit',
    books_promo_title: "Author's Publication",
    bestseller_badge: 'Bestseller',
    new_badge: 'New',
    book1_title: 'Fundamentals of Sexual Health',
    book1_author: 'Zurab Marshania',
    book1_description: 'A book that comprehensively covers issues of human sexual health.',
    buy_button: 'Buy',
    book2_title: 'Psychology of Partnership',
    book2_author: 'Zurab Marshania',
    book2_description: 'Decoding psychological aspects of modern relationships.',
    bio_title: 'Biography',
    bio_subtitle:
      'Zurab Marshania - President of the Georgian Medical Sexology Society and Chairman of the Scientific Council, Professor',
    bio_text:
      'Sexologist doctor, Associate Professor at the Psychology Faculty of the Georgian National University (SEU)...',
    articles_title: 'Articles',
    article1_title: 'The Importance of Sexual Education',
    article1_excerpt:
      "How to teach youth sexuality correctly and culturally – professor's opinion.",
    article1_link: 'Read more',
    article2_title: 'Psychology of Gender Identity',
    article2_excerpt:
      'How gender identity forms and the role of environment in psychological development.',
    article2_link: 'Read more',
    contact_title: 'Contact',
    contact_location_label: 'Location',
    contact_location_text: 'Tbilisi, 9 Tsinandali Street',
    contact_phone_label: 'Phone',
    contact_phone_text: '+995 599 12 34 56',
    contact_call_text: 'Contact us to book a visit',
  },
  ru: {
    main: 'Главная',
    bio: 'Биография',
    articles: 'Статьи',
    books: 'Книги',
    contact: 'Контакт',
    hero_title: 'Зураб Маршания',
    hero_subtitle: 'Профессор',
    hero_button: 'Подробнее',
    call_text: 'Свяжитесь с нами для записи на прием',
    books_promo_title: 'Издание автора',
    bestseller_badge: 'Бестселлер',
    new_badge: 'Новый',
    book1_title: 'Основы сексуального здоровья',
    book1_author: 'Зураб Маршания',
    book1_description:
      'Книга, которая всесторонне освещает вопросы сексуального здоровья человека.',
    buy_button: 'Купить',
    book2_title: 'Психология партнерства',
    book2_author: 'Зураб Маршания',
    book2_description: 'Расшифровка психологических аспектов современных отношений.',
    bio_title: 'Биография',
    bio_subtitle:
      'Зураб Маршания - Президент Грузинского общества медицинской сексологии и председатель научного совета, профессор',
    bio_text:
      'Доктор-сексолог, доцент факультета психологии Национального университета Грузии (СЕУ)...',
    articles_title: 'Статьи',
    article1_title: 'Значение сексуального образования',
    article1_excerpt:
      'Как правильно и культурно обучать молодежь сексуальности — мнение профессора.',
    article1_link: 'Читать полностью',
    article2_title: 'Психология гендерной идентичности',
    article2_excerpt:
      'Как формируется гендерная идентичность и роль окружения в психологическом развитии.',
    article2_link: 'Читать полностью',
    contact_title: 'Контакт',
    contact_location_label: 'Местоположение',
    contact_location_text: 'Тбилиси, улица Цинандали 9',
    contact_phone_label: 'Телефон',
    contact_phone_text: '+995 599 12 34 56',
    contact_call_text: 'Свяжитесь с нами для записи на прием',
  },
};

// ენის განახლების ფუნქცია
function updateTexts(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
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
    e.stopPropagation(); // თავიდან ავიცილოთ document-ის event
    const selectedLang = option.getAttribute('data-language');

    if (selectedLang && translations[selectedLang]) {
      selectedFlagImg.src = option.src;
      selectedFlagImg.alt = option.alt;

      currentLanguage = selectedLang;
      updateTexts(currentLanguage);

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
