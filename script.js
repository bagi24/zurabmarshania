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
