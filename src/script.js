document.addEventListener('DOMContentLoaded', function () {
  // Loader function
  function hideLoader() {
    const loader = document.getElementById('gender-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 0);
    }
  }

  // Typing animation variables
  const textElement = document.getElementById('typing-text');
  let wordList = ['ექიმი სექსოლოგი', 'მკვლევარი'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const pauseBetweenWords = 2000;

  // Typing fun
  function type() {
    if (!textElement) return;
    const currentWord = wordList[wordIndex];

    if (isDeleting) {
      charIndex--;
      textElement.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      textElement.textContent = currentWord.substring(0, charIndex);
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
      wordIndex = (wordIndex + 1) % wordList.length;
    }

    setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
  }

  const translations = {
    ge: {
      '#main': 'მთავარი',
      '#bio': 'ბიოგრაფია',
      '#articles': 'ინტერვიუები',
      '#books': 'წიგნები',
      '#contact': 'კონტაქტი',
      '#hero_title': 'ზურაბ მარშანია',
      '#hero_subtitle': 'პროფესორი',
      '#hero_button': 'დეტალურად',
      '#call_desc': 'ვიზიტის ჯავშნისთვის დაგვიკავშირდით',
      '#books_promo_title': 'ავტორის გამოცემა',
      '#bestseller_badge': 'ბესტსელერი',
      '#new_badge': 'ახალი',
      '#book1_title': 'სექსოლოგიის საფუძვლები',
      '#book1_author': 'ზურაბ მარშანია',
      '#book1_description':
        'წიგნში გაშუქებულია სქესობრივ ცხოვრებასთან დაკავშირებული და ადრე თითქმის მთლიანად ტაბუირებული ისეთი საკითხები...',
      '#buy_button': 'ყიდვა',
      '#book2_title': 'Sexual Medicine from the point of view of a clinician-sexologist',
      '#book2_author': 'ზურაბ მარშანია',
      '#book2_description':
        'წიგნი გვაწვდის უნიკალურ, ამომწურავ საბაზისო ცოდნას კლინიკური სექსოლოგიის სფეროში, რაც აუცილებელია როგორც მედიცინის სტუდენტებისთვის, ისე სხვადასხვა სპეციალობის ექიმებისთვის.',
      '#bio_title': 'მოკლე ბიოგრაფია',
      '#bio_subtitle': 'ზურაბ მარშანია - ექიმი სექსოლოგი, მედიცინის აკადემიური დოქტორი',
      '#bio_text':
        'ზურაბ მარშანია - ექიმი სექსოლოგი, მედიცინის აკადემიური დოქტორი, საქართველოს ეროვნული უნივერსიტეტი - სეუ-ს მედიცინის ფაკულტეტის სექსოლოგიის სრული პროფესორი, ევროპის სამედიცინო სექსოლოგიის საზოგადოებასთან (European Society for Sexual Medicine) აფილირებული ეროვნული საზოგადოების (National Associated Society) - საქართველოს სამედიცინო სექსოლოგიის საზოგადოების პრეზიდენტი, საქართველოს საბუნებისმეყველო მეცნიერებათა აკადემიის ნამდვილი წევრი. სექსოლოგ - კლინიცისტად მუშაობა დაიწყო 1988 წელს ი.ჟორდანიას სახ. სამეცნიერო კვლევით ინსტიტუტში. ამჟამად კლინიკურ პრაქტიკას (პაციენტების ამბულატორიულ მიღებას) აგრძელებს "ზურაბ მარშანიას სამედიცინო სექსოლოგიის კაბინეტში"; ზურაბ მარშანიამ საქართველოში, აშშ-ში, ესპანეთში, პორტუგალიაში, თურქეთში, შვედეთში, დანიაში, ესტონეთში და უკრაინაში გამოაქვეყნა მრავალი ათეული სამეცნიერო ნაშრომი და გააკეთა მოხსენებები საერთაშორისო კონფერენციებზე, ხოლო ქალისა და მამაკაცის სექსუალური დისფუნქციების საკითხებზე საჯარო ლექციების წასაკითხად, მიწვეული იყო ჩეხეთის, უნგრეთისა და სლოვენიის რესპუბლიკებში. ზ.მარშანია პოლიტიკურ მეცნიერებათა დოქტორიცაა, 1998 წელს მინიჭებული აქვს საგანგებო და სრულუფლებიანი დესპანის დიპლომატიური რანგი და წლების განმავლობაში ხელმძღვანელობდა საქართველოს დიპლომატიურ მისიებს ბალტიის ქვეყნებსა და უკრაინაში.',
      '#articles_title': 'სტატიები',
      '#article1_title': 'სექსუალური განათლების მნიშვნელობა',
      '#article1_excerpt':
        'როგორ ვასწავლოთ ახალგაზრდებს სექსუალობა სწორად და კულტურულად – პროფესორის მოსაზრება.',
      '#article1_link': 'სრულად წაკითხვა',
      '#article2_title': 'გენდერული იდენტობის ფსიქოლოგია',
      '#article2_excerpt':
        'როგორ ყალიბდება გენდერული იდენტობა და რა როლი აქვს გარემოს ფსიქოლოგიურ განვითარებაში.',
      '#article2_link': 'სრულად წაკითხვა',
      '#contact_title': 'კონტაქტი',
      '#contact_location_label': 'მისამართი',
      '#contact_location_text': 'თბილისი, წინანდლის ქუჩა 9',
      '#contact_phone_label': 'ტელეფონი',
      '#contact_phone_text': '+995 599 12 34 56',
      '#contact_call_text': 'ვიზიტის ჯავშნისთვის დაგვიკავშირდით',
      '#hero__subtitle_static': 'პროფესორი',
      wordList: ['ექიმი სექსოლოგი', 'მკვლევარი'],
      '#hero__button': 'დეტალურად',
      '#books-promo__title': 'ავტორის გამოცემა',
      '#buy_button2': 'ყიდვა',
      '#book2_author': 'ზურაბ მარშანია',
      '#email': 'ელ.ფოსტა',
      '#clock': 'სამუშაო საათები',
      '#clock_description':
        'მოგესალმებით, მადლობა რომ დაგვიკავშირდით, შეგახსენებთ: პაციენტების მიღება (წინასწარი ჩაწერა ტელეფონით 599 641187 - აუცილებელია). ორშაბათიდან პარასკევის ჩათვლით 10:00-15:00. მისამართზე: თევდორე მღვდლის ქუჩა 48, კორპუსი 1ა, ბინა 2',
      '#brand-desc':
        'სამედიცინო სექსოლოგია თანამედროვე მედიცინის ინტერდისციპლინარული დარგია, რომლის შესწავლის საგანია ადამიანის სექსუალური ჯანმრთელობა..',
      '#item-adress': 'თევდორე მღვდლის ქუჩა 48, კორპუსი 1ა, ბინა 2',
      '#main2': 'მთავარი',
      '#bio2': 'ბიოგრაფია',
      '#contact2': 'კონტაქტი',
      '#srulad': 'სრულად ნახვა',
    },
    en: {
      '#main': 'Main',
      '#bio': 'Biography',
      '#articles': 'Interviews',
      '#books': 'Books',
      '#contact': 'Contact',
      '#hero_title': 'Zurab Marshania',
      '#hero_subtitle': 'Professor',
      '#hero_button': 'Details',
      '#call_desc': 'Contact us to book a visit',
      '#books_promo_title': "Author's Publication",
      '#bestseller_badge': 'Bestseller',
      '#new_badge': 'New',
      '#book1_title': 'Fundamentals of Sexual Health',
      '#book1_author': 'Zurab Marshania',
      '#book1_description':
        'The book covers issues related to sexual life that were previously almost completely taboo, such as: human psychosexual development, virginity, and the first wedding night...',
      '#buy_button': 'Buy',
      '#book2_title': 'Psychology of Partnership',
      '#book2_author': 'Zurab Marshania',
      '#book2_description':
        'The book provides unique, comprehensive basic knowledge of clinical sexology, which is absolutely necessary for both medical students and doctors of various specialties.',
      '#bio_title': 'Short Biography',
      '#bio_subtitle': 'Zurab Marshania - Sexologist, Academic Doctor of Medicine',
      '#bio_text':
        'Zurab Marshania, clinician - sexologist, MD, PhD, Full Professor of Sexology at the Faculty of Medicine of the Georgian National University - SEU, President of the Georgian Society of Medical Sexology, an affiliated national society with the European Society for Medical Sexology (ESSM), a full member of the Georgian Academy of Natural Sciences. He has been working as a clinician-sexologist since 1988 (he headed the andrology department at the I. Zhordania Scientific Research Institute). Currently, he continues his clinical practice (Outpatient appointment) at the Zurab Marshania Sexual Medicine Office; Zurab Marshania has published lots of scientific papers and gives presentations at international conferences in Georgia, and in the USA, Spain, Portugal, Turkey, Sweden, Denmark, Estonia and Ukraine, and has been invited to give public lectures on male and female sexual dysfunction in the Czech Republic, Hungary and Slovenia. Z. Marshania also holds a doctorate in political science, was awarded the diplomatic rank of Envoy Extraordinary and Plenipotentiary in 1998 and headed Georgia&#39;s diplomatic missions in the Baltic States and Ukraine for several years.',
      '#articles_title': 'Articles',
      '#article1_title': 'The Importance of Sexual Education',
      '#article1_excerpt':
        "How to teach youth sexuality correctly and culturally – professor's opinion.",
      '#article1_link': 'Read more',
      '#article2_title': 'Psychology of Gender Identity',
      '#article2_excerpt':
        'How gender identity forms and the role of environment in psychological development.',
      '#article2_link': 'Read more',
      '#contact_title': 'Contact',
      '#contact_location_label': 'Location',
      '#contact_location_text': 'Tbilisi, 9 Tsinandali Street',
      '#contact_phone_label': 'Phone',
      '#contact_phone_text': '+995 599 12 34 56',
      '#contact_call_text': 'Contact us to book a visit',
      '#hero__subtitle_static': 'Professor',
      wordList: ['Sexologist', 'Researcher'],
      '#hero__button': 'In detail',
      '#books-promo__title': "Author's publication",
      '#buy_button2': 'Buy',
      '#book2_author': 'Zurab Marshania',
      '#email': 'Email',
      '#clock': 'Working hours',
      '#clock_description':
        'are accepting patients (pre-registration by phone 599 641187 - required). Monday to Friday 10:00-15:00. Address: 48 Tevdore Mgvdli Street, Building 1A, Apartment 2',
      '#brand-desc':
        'Medical sexology is an interdisciplinary field of modern medicine that studies human sexual health',
      '#item-adress': '48 Tevdore Mgvdli Street, Building 1A, Apartment 2',
      '#main2': 'main',
      '#bio2': 'biography',
      '#contact2': 'contact',
      '#srulad': 'completely',
    },
    ru: {
      '#main': 'Главный',
      '#bio': 'Биография',
      '#articles': 'Интервью',
      '#books': 'Книги',
      '#contact': 'Контакт',
      '#hero_title': 'Зураб Маршания',
      '#hero_subtitle': 'Профессор',
      '#hero_button': 'Подробнее',
      '#call_desc': 'Свяжитесь с нами для записи на прием',
      '#books_promo_title': 'Издание автора',
      '#bestseller_badge': 'Бестселлер',
      '#new_badge': 'Новый',
      '#book1_title': 'Основы сексуального здоровья',
      '#book1_author': 'Зураб Маршания',
      '#book1_description':
        'Книга, которая всесторонне освещает вопросы сексуального здоровья человека.',
      '#buy_button': 'Купить',
      '#book2_title': 'Психология партнерства',
      '#book2_author': 'Зураб Маршания',
      '#book2_description':
        'В книге даются уникальные, комплексные базовые знания по клинической сексологии, которые абсолютно необходимы как студентам-медикам, так и врачам различных специальностей (прежде всего врачам общей практики, а также гинекологам, урологам, эндокринологам, психиатрам, неврологам и др.).',
      '#bio_title': 'Краткая биография',
      '#bio_subtitle': 'Зураб Маршания - сексолог, академический доктор медицинских наук',
      '#bio_text':
        'Зураб Маршания - врач-сексолог, доктор медицинских наук, профессор сексологии факультета медицины грузинского национального университета - СЕУ, президент грузинского общества медицинской сексологии, аффилированного национального объединения с европейским обществом медицинской сексологии (ESSM), действительный член грузинской академии естественных наук. Работаем врачом сексологом с 1988 году ( руководил отделом андрологии научно-исследовательского институте имени И. Жордания). В настоящее время продолжает клиническую практику (амбулаторный прием пациентов) в «Кабинете медицинской сексологии Зураба Маршания». Зураб Маршания опубликовал десятки научных работ и выступил с докладами на международных конференциях в Грузии, США, Испании, Португалии, Турции, Швеции, Дании, Эстонии и Украине, а также был приглашен для чтения публичных лекций по проблемам мужской и женской сексуальной дисфункции в Чехию, Венгрию и Словению. З. Маршания также имеет степень доктора политических наук, в 1998 году ему был присвоен дипломатический ранг Чрезвычайного и Полномочного Посланника, и на протяжении ряда лет возглавлял дипломатические миссии Грузии в странах Балтии и в Украине.',
      '#articles_title': 'Статьи',
      '#article1_title': 'Значение сексуального образования',
      '#article1_excerpt':
        'Как правильно и культурно обучать молодежь сексуальности — мнение профессора.',
      '#article1_link': 'Читать полностью',
      '#article2_title': 'Психология гендерной идентичности',
      '#article2_excerpt':
        'Как формируется гендерная идентичность и роль окружения в психологическом развитии.',
      '#article2_link': 'Читать полностью',
      '#contact_title': 'Контакт',
      '#contact_location_label': 'Местоположение',
      '#contact_location_text': 'Тбилиси, улица Цинандали 9',
      '#contact_phone_label': 'Телефон',
      '#contact_phone_text': '+995 599 12 34 56',
      '#contact_call_text': 'Свяжитесь с нами для записи на прием',
      '#hero__subtitle_static': 'Профессор',
      wordList: ['Сексолог', 'Исследователь'],
      '#hero__button': 'Подробно',
      '#books-promo__title': 'Авторское издание',
      '#buy_button2': 'Купить',
      '#book2_author': 'Зураб Маршания',
      '#email': 'почта',
      '#clock': 'рабочее время',
      '#clock_description':
        'Добро пожаловать, спасибо, что обратились к нам, напоминаем: Мы принимаем пациентов (предварительная запись по телефону 599 641187 - обязательна). С понедельника по пятницу с 10:00 до 15:00. Адрес: ул. Тевдоре Мгвдли, 48, корпус 1А, квартира 2',
      '#brand-desc':
        'Медицинская сексология — междисциплинарная область современной медицины, изучающая сексуальное здоровье человека.',
      '#item-adress': 'Улица Тевдоре Мгвдли 48, дом 1А, квартира 2',
      '#main2': 'Главный',
      '#bio2': 'Биография',
      '#contact2': 'Контакт',
      '#srulad': 'Полностью',
    },
  };

  // lang exchange and text update
  function applyLanguage(langCode) {
    const selectedLang = translations[langCode];
    if (!selectedLang) return;

    Object.entries(selectedLang).forEach(([selector, text]) => {
      if (selector === 'wordList') {
        wordList = text;
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
        type();
        return;
      }
      const el = document.querySelector(selector);
      if (el) el.textContent = text;
    });
  }

  // lang Menu
  const langSwitcher = document.querySelector('.header__language-switcher');
  const langSelected = langSwitcher?.querySelector('.language-switcher__selected');
  const langDropdown = langSwitcher?.querySelector('.language-switcher__dropdown');
  const langItems = langDropdown?.querySelectorAll('.language-switcher__item img');

  if (langSelected && langDropdown && langItems) {
    langSelected.addEventListener('click', e => {
      e.stopPropagation();
      langDropdown.classList.toggle('visible');
    });

    langItems.forEach(img => {
      img.addEventListener('click', e => {
        e.stopPropagation();

        // flag change in UI
        const selectedImg = langSelected.querySelector('img');
        if (selectedImg) {
          selectedImg.src = img.src;
          selectedImg.alt = img.alt;
        }

        const selectedLang = img.dataset.language;
        localStorage.setItem('selectedLanguage', selectedLang);
        applyLanguage(selectedLang);
        langDropdown.classList.remove('visible');
      });
    });

    document.addEventListener('click', e => {
      if (!langSwitcher.contains(e.target)) {
        langDropdown.classList.remove('visible');
      }
    });

    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
      const savedImg = Array.from(langItems).find(img => img.dataset.language === savedLang);
      if (savedImg) {
        const selectedImg = langSelected.querySelector('img');
        selectedImg.src = savedImg.src;
        selectedImg.alt = savedImg.alt;
        applyLanguage(savedLang);
      }
    }
  }

  // Header shrink on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
      header.classList.toggle('shrink', window.scrollY > 50);
    }
  });

  // Smooth scrolling function
  function smoothScrollTo(targetY, duration = 1200) {
    const startY = window.scrollY;
    const distanceY = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startY + distanceY * ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  // Anchor smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        smoothScrollTo(targetElement.offsetTop - 80, 1200);
        history.pushState(null, null, targetId);
      }
    });
  });

  // Burger menu toggle
  const burger = document.getElementById('burger');
  const navList = document.getElementById('nav');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      navList.classList.toggle('active');
      burger.classList.toggle('open');
    });
  }

  // Work hours show/hide
  window.showClockDetails = function () {
    const clock = document.getElementById('clockDisplay');
    if (clock) clock.style.display = 'block';
  };
  window.hideClockDetails = function () {
    const clock = document.getElementById('clockDisplay');
    if (clock) clock.style.display = 'none';
  };

  // Biography toggle
  window.toggleBio = function () {
    const bioText = document.querySelector('.bio__text');
    const button = document.querySelector('.bio__toggle-btn');
    if (bioText && button) {
      const isExpanded = bioText.classList.toggle('expanded');
      button.textContent = isExpanded ? 'ჩაკეცვა' : 'სრულად ნახვა';
    }
  };

  // Intersection observer for fade-slide-up elements
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });
  document.querySelectorAll('.fade-slide-up').forEach(el => {
    if (el) observer.observe(el);
  });

  // Logo click scroll to main section
  const logo = document.querySelector('.header__logo');
  if (logo) {
    logo.addEventListener('click', e => {
      e.preventDefault();
      const section = document.querySelector('#main-section');
      if (section) {
        smoothScrollTo(section.offsetTop - 80);
        history.pushState(null, null, '#main-section');
      }
    });
  }

  // Active nav link toggle
  const navLinks = document.querySelectorAll('.nav-list__link');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('nav-list__link--active'));
      this.classList.add('nav-list__link--active');
    });
  });

  // Start typing animation
  type();

  // Hide loader immediately
  setTimeout(hideLoader, 1000);
});
