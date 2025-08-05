document.addEventListener("DOMContentLoaded", function () {
  let currentLang = localStorage.getItem("selectedLanguage") || "ge";
  // Loader function
  function hideLoader() {
    const loader = document.getElementById("gender-loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 0);
    }
  }

  function showLoader() {
    const loader = document.getElementById("gender-loader");
    if (loader) {
      loader.style.display = "flex";
      loader.style.opacity = "1";
    }
  }

  showLoader();

  // Typing animation variables
  const textElement = document.getElementById("typing-text");
  let wordList = ["ექიმი სექსოლოგი", "მკვლევარი"];
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
      "#main": "მთავარი",
      "#bio": "ბიოგრაფია",
      "#articles": "ინტერვიუები",
      "#serve": "სერვისები",
      "#books": "წიგნები",
      "#contact": "კონტაქტი",
      "#hero_title": "ზურაბ მარშანია",
      "#hero_subtitle": "პროფესორი",
      "#hero_button": "დეტალურად",
      "#call_desc":
        "ვიზიტის, მათ შორის ონლაინ კონსულტაციების დასაჯავშნად აუცილებლად დაგვიკავშირდით წინასწარ ",
      "#books_promo_title": "ავტორის გამოცემა",
      "#bestseller_badge": "ბესტსელერი",
      "#new_badge": "ახალი",
      "#book1_title": "სამედიცინო სექსოლოგიისა და ფსიქოსექსოლოგიის საფუძვლები",
      "#book1_author": "ზურაბ მარშანია",
      "#book1_description":
        "წიგნში გაშუქებულია სქესობრივ ცხოვრებასთან დაკავშირებული და ადრე თითქმის მთლიანად ტაბუირებული ისეთი საკითხები...",
      "#buy_button": "ყიდვა",
      "#book2_title":
        "Sexual Medicine from the point of view of a clinician-sexologist",
      "#book2_author": "ზურაბ მარშანია",
      "#book2_description":
        "წიგნი გვაწვდის უნიკალურ, ამომწურავ საბაზისო ცოდნას კლინიკური სექსოლოგიის სფეროში, რაც აუცილებელია როგორც მედიცინის სტუდენტებისთვის, ისე სხვადასხვა სპეციალობის ექიმებისთვის.",
      "#bio_title": "მოკლე ბიოგრაფია",
      "#bio_subtitle":
        "ზურაბ მარშანია - ექიმი სექსოლოგი, მედიცინის აკადემიური დოქტორი",
      "#bio_text":
        'ზურაბ მარშანია - ექიმი სექსოლოგი, მედიცინის აკადემიური დოქტორი, საქართველოს ეროვნული უნივერსიტეტი - სეუ-ს მედიცინის ფაკულტეტის სექსოლოგიის სრული პროფესორი, ევროპის სამედიცინო სექსოლოგიის საზოგადოებასთან (European Society for Sexual Medicine) აფილირებული ეროვნული საზოგადოების (National Associated Society) - საქართველოს სამედიცინო სექსოლოგიის საზოგადოების პრეზიდენტი, საქართველოს საბუნებისმეყველო მეცნიერებათა აკადემიის ნამდვილი წევრი. სექსოლოგ - კლინიცისტად მუშაობა დაიწყო 1988 წელს ი.ჟორდანიას სახ. სამეცნიერო კვლევით ინსტიტუტში. ამჟამად კლინიკურ პრაქტიკას (პაციენტების ამბულატორიულ მიღებას) აგრძელებს "ზურაბ მარშანიას სამედიცინო სექსოლოგიის კაბინეტში"; ზურაბ მარშანიამ საქართველოში, აშშ-ში, ესპანეთში, პორტუგალიაში, თურქეთში, შვედეთში, დანიაში, ესტონეთში და უკრაინაში გამოაქვეყნა მრავალი ათეული სამეცნიერო ნაშრომი და გააკეთა მოხსენებები საერთაშორისო კონფერენციებზე, ხოლო ქალისა და მამაკაცის სექსუალური დისფუნქციების საკითხებზე საჯარო ლექციების წასაკითხად, მიწვეული იყო ჩეხეთის, უნგრეთისა და სლოვენიის რესპუბლიკებში. ზ.მარშანია პოლიტიკურ მეცნიერებათა დოქტორიცაა, 1998 წელს მინიჭებული აქვს საგანგებო და სრულუფლებიანი დესპანის დიპლომატიური რანგი და წლების განმავლობაში ხელმძღვანელობდა საქართველოს დიპლომატიურ მისიებს ბალტიის ქვეყნებსა და უკრაინაში.',
      "#articles_title": "სტატიები",
      "#article1_title": "სექსუალური განათლების მნიშვნელობა",
      "#article1_excerpt":
        "როგორ ვასწავლოთ ახალგაზრდებს სექსუალობა სწორად და კულტურულად – პროფესორის მოსაზრება.",
      "#article1_link": "სრულად წაკითხვა",
      "#article2_title": "გენდერული იდენტობის ფსიქოლოგია",
      "#article2_excerpt":
        "როგორ ყალიბდება გენდერული იდენტობა და რა როლი აქვს გარემოს ფსიქოლოგიურ განვითარებაში.",
      "#article2_link": "სრულად წაკითხვა",
      "#contact_title": "კონტაქტი",
      "#contact_location_label": "მისამართი",
      "#contact_location_text": "თევდორე მღვლდლის 48",
      "#contact_phone_label": "ტელეფონი",
      "#contact_phone_text": "+995 599 12 34 56",
      "#contact_call_text": "ვიზიტის ჯავშნისთვის დაგვიკავშირდით",
      "#hero__subtitle_static": "პროფესორი",
      wordList: ["ექიმი სექსოლოგი", "მკვლევარი"],
      "#hero__button": "დეტალურად",
      "#books-promo__title": "ავტორის გამოცემა",
      "#buy_button2": "ყიდვა",
      "#book2_author": "ზურაბ მარშანია",
      "#email": "ელ.ფოსტა",
      "#clock": "სამუშაო საათები",
      "#clock_description": `
  <p>მოგესალმებით,</p>
  <p>გმადლობთ, რომ დაგვიკავშირდით.</p> 
  <p>  გთხოვთ გაითვალისწინოთ,რომ პაციენტების მიღება სრულდება წინასწარი ჩაწერით, ნომერზე: +995 599 64 11 87.  კონსულტაციების ჩატარება ხდება როგორც ქართულ, ინგლისურ ასევე რუსულ ენაზე.</p>
  <p>მიღების საათებია ორშაბათიდან პარასკევის ჩათვლით, 10:00–15:00 საათამდე. მისამართი: თევდორე მღვდლის ქუჩა №48, კორპუსი 1ა, ბინა 2.</p>
`,

      "#brand-desc":
        "სამედიცინო სექსოლოგია თანამედროვე მედიცინის ინტერდისციპლინარული დარგია, რომლის შესწავლის საგანია ადამიანის სექსუალური ჯანმრთელობა..",
      "#item-adress": "თევდორე მღვდლის ქუჩა 48",
      "#main2": "მთავარი",
      "#bio2": "ბიოგრაფია",
      "#contact2": "კონტაქტი",
      "#srulad": "სრულად ნახვა",
      "#serve-title": "სერვისები",
      "#man-category-title": "მამაკაცის სქესობრივი დისფნუქცია",
      "#man-category-title-1": "ერექციული დისფუნქია",
      "#man-category-title-2": "ნაადრევი ეაკულაცია",
      "#man-category-title-3": "ეაკულაციის გაძნელება",
      "#man-category-title-4": "ლიბიდოს დაქვეითება",
      "#woman-category-title": "ქალის სქესობრივი დისფუნქცია",
      "#woman-category-title-1": "ვაგინიზმი",
      "#woman-category-title-2": "ანორგაზმია",
      "#woman-category-title-3": "ლიბიდოს დაქვეითება",
      "#woman-category-title-4": "აგზნებადობის დაქვეითება",
      "#other-category-title": "სხვა სერვისები",
      "#other-category-title-1": "ფსიქოლოგია",
      "#other-category-title-2": "ფსიქიატრია",
      "#other-category-title-3": "გინეკოლოგია",
      "#other-category-title-4": "ექოსკოპია",
      "#other-category-title-5": "კარდიოლოგია",
      "#other-category-title-6": "ლაბორატორიული კვლევები",
      "#interviews-title": "🎥 ვიდეო ინტერვიუები",
      "#articles-title": "📰 სტატიები",
      "#article-card-title": " როდესაც ადამიანს არ აქვს ჰარმონიული სექსი...",
      "#article-card-excerpt":
        " სექსოლოგი ზურაბ მარშანია ლიბიდოს დაქვეითებაზე — როგორ მოქმედებს ჰარმონიული სექსუალური ცხოვრება ადამიანზე.",
      "#article-card-link": " სრულად წაკითხვა",
      "#article-card-title-1":
        "არსებობს მთელი რიგი დაავადებები, რომლებიც ემართებათ ქალებს",
      "#article-card-excerpt-1":
        " პროფესორი ზურაბ მარშანია საუბრობს იმ დაავადებებზე, რომლებიც შეიძლება ქალებში განვითარდეს გინეკოლოგიურ საფუძველზე.",
      "#article-card-link-1": " სრულად წაკითხვა",
      "#add":
        "⚠️  გთხოვთ   გაითვალისწინოთ,     შვებულებიდან   გამომდინარე,   კონსულტაციები   აღდგება  15  სექტემბრიდან,    წინასწარ  ჩასაწერად  კი  შეგიძლიათ  დაგვიკავშირდეთ  მითითებულ ნომერზე.",
    },
    en: {
      "#main": "Main",
      "#bio": "Biography",
      "#articles": "Interviews",
      "#serve": "Service",
      "#books": "Books",
      "#contact": "Contact",
      "#hero_title": "Zurab Marshania",
      "#hero_subtitle": "Professor",
      "#hero_button": "Details",
      "#call_desc":
        "To book a visit, including online consultations, please contact us in advance",
      "#books_promo_title": "Author's Publication",
      "#bestseller_badge": "Bestseller",
      "#new_badge": "New",
      "#book1_title": "Fundamentals of Sexual Health",
      "#book1_author": "Zurab Marshania",
      "#book1_description":
        "The book covers issues related to sexual life that were previously almost completely taboo, such as: human psychosexual development, virginity, and the first wedding night...",
      "#buy_button": "Buy",
      "#book2_title": "Psychology of Partnership",
      "#book2_author": "Zurab Marshania",
      "#book2_description":
        "The book provides unique, comprehensive basic knowledge of clinical sexology, which is absolutely necessary for both medical students and doctors of various specialties.",
      "#bio_title": "Short Biography",
      "#bio_subtitle":
        "Zurab Marshania - Sexologist, Academic Doctor of Medicine",
      "#bio_text":
        "Zurab Marshania, clinician - sexologist, MD, PhD, Full Professor of Sexology at the Faculty of Medicine of the Georgian National University - SEU, President of the Georgian Society of Medical Sexology, an affiliated national society with the European Society for Medical Sexology (ESSM), a full member of the Georgian Academy of Natural Sciences. He has been working as a clinician-sexologist since 1988 (he headed the andrology department at the I. Zhordania Scientific Research Institute). Currently, he continues his clinical practice (Outpatient appointment) at the Zurab Marshania Sexual Medicine Office; Zurab Marshania has published lots of scientific papers and gives presentations at international conferences in Georgia, and in the USA, Spain, Portugal, Turkey, Sweden, Denmark, Estonia and Ukraine, and has been invited to give public lectures on male and female sexual dysfunction in the Czech Republic, Hungary and Slovenia. Z. Marshania also holds a doctorate in political science, was awarded the diplomatic rank of Envoy Extraordinary and Plenipotentiary in 1998 and headed Georgia&#39;s diplomatic missions in the Baltic States and Ukraine for several years.",
      "#articles_title": "Articles",
      "#article1_title": "The Importance of Sexual Education",
      "#article1_excerpt":
        "How to teach youth sexuality correctly and culturally – professor's opinion.",
      "#article1_link": "Read more",
      "#article2_title": "Psychology of Gender Identity",
      "#article2_excerpt":
        "How gender identity forms and the role of environment in psychological development.",
      "#article2_link": "Read more",
      "#contact_title": "Contact",
      "#contact_location_label": "Location",
      "#contact_location_text": "Tbilisi, Teudore Mghvdeli 48",
      "#contact_phone_label": "Phone",
      "#contact_phone_text": "+995 599 12 34 56",
      "#contact_call_text": "Contact us to book a visit",
      "#hero__subtitle_static": "Professor",
      wordList: ["Sexologist", "Researcher"],
      "#hero__button": "In detail",
      "#books-promo__title": "Author's publication",
      "#buy_button2": "Buy",
      "#book2_author": "Zurab Marshania",
      "#email": "Email",
      "#clock": "Working hours",
      "#clock_description": `<p>Welcome,</p>
<p>Thank you for contacting us. Please note that patients are seen by prior appointment only, at the following number: +995 599 641187. Consultations are available in Georgian, English, and Russian languages.</p>
<p>Reception hours are from Monday to Friday, 10:00 AM – 3:00 PM. Address: 48 Tevdore Mghvdlis Street, Building 1A, Apartment 2.</p>`,
      "#brand-desc":
        "Medical sexology is an interdisciplinary field of modern medicine that studies human sexual health",
      "#item-adress": "48 Tevdore Mghvdeli Street",
      "#main2": "main",
      "#bio2": "biography",
      "#contact2": "contact",
      "#srulad": "completely",
      "#serve-title": "Service",
      "#man-category-title": "Male Sexual Dysfunction",
      "#man-category-title-1": "Erectile Dysfunction",
      "#man-category-title-2": "Premature Ejaculation",
      "#man-category-title-3": "Delayed Ejaculation",
      "#man-category-title-4": "Low Libido",
      "#woman-category-title": "Female Sexual Dysfunction",
      "#woman-category-title-1": "Vaginismus",
      "#woman-category-title-2": "Anorgasmia",
      "#woman-category-title-3": "Low Libido",
      "#woman-category-title-4": "Reduced Arousal",
      "#other-category-title": "Other Services",
      "#other-category-title-1": "Psychology",
      "#other-category-title-2": "Psychiatry",
      "#other-category-title-3": "Gynecology",
      "#other-category-title-4": "Ultrasound",
      "#other-category-title-5": "Cardiology",
      "#other-category-title-6": "Laboratory Testing",
      "#interviews-title": "🎥 Video Interviews",
      "#articles-title": "📰 Articles",
      "#article-card-title": "When a person doesn’t have harmonious sex...",
      "#article-card-excerpt":
        "Sexologist Zurab Marshania on low libido — how a harmonious sexual life affects a person.",
      "#article-card-link": "Read More",
      "#article-card-title-1":
        "There are a number of diseases that affect women",
      "#article-card-excerpt-1":
        "Professor Zurab Marshania discusses diseases that may develop in women due to gynecological causes.",
      "#article-card-link-1": "Read More",
      "#add":
        "⚠️ Please note that due to the holidays, consultations will resume from September 15. To make an appointment in advance, you can contact us at the number provided.",
    },
    ru: {
      "#main": "Главный",
      "#bio": "Биография",
      "#articles": "Интервью",
      "#serve": "Услуга",
      "#books": "Книги",
      "#contact": "Контакт",
      "#hero_title": "Зураб Маршания",
      "#hero_subtitle": "Профессор",
      "#hero_button": "Подробнее",
      "#call_desc":
        "Чтобы записаться на прием, включая онлайн-консультации, пожалуйста, свяжитесь с нами заранее.",
      "#books_promo_title": "Издание автора",
      "#bestseller_badge": "Бестселлер",
      "#new_badge": "Новый",
      "#book1_title": "Основы сексуального здоровья",
      "#book1_author": "Зураб Маршания",
      "#book1_description":
        "Книга, которая всесторонне освещает вопросы сексуального здоровья человека.",
      "#buy_button": "Купить",
      "#book2_title": "Психология партнерства",
      "#book2_author": "Зураб Маршания",
      "#book2_description":
        "В книге даются уникальные, комплексные базовые знания по клинической сексологии, которые абсолютно необходимы как студентам-медикам, так и врачам различных специальностей (прежде всего врачам общей практики, а также гинекологам, урологам, эндокринологам, психиатрам, неврологам и др.).",
      "#bio_title": "Краткая биография",
      "#bio_subtitle":
        "Зураб Маршания - сексолог, академический доктор медицинских наук",
      "#bio_text":
        "Зураб Маршания - врач-сексолог, доктор медицинских наук, профессор сексологии факультета медицины грузинского национального университета - СЕУ, президент грузинского общества медицинской сексологии, аффилированного национального объединения с европейским обществом медицинской сексологии (ESSM), действительный член грузинской академии естественных наук. Работаем врачом сексологом с 1988 году ( руководил отделом андрологии научно-исследовательского институте имени И. Жордания). В настоящее время продолжает клиническую практику (амбулаторный прием пациентов) в «Кабинете медицинской сексологии Зураба Маршания». Зураб Маршания опубликовал десятки научных работ и выступил с докладами на международных конференциях в Грузии, США, Испании, Португалии, Турции, Швеции, Дании, Эстонии и Украине, а также был приглашен для чтения публичных лекций по проблемам мужской и женской сексуальной дисфункции в Чехию, Венгрию и Словению. З. Маршания также имеет степень доктора политических наук, в 1998 году ему был присвоен дипломатический ранг Чрезвычайного и Полномочного Посланника, и на протяжении ряда лет возглавлял дипломатические миссии Грузии в странах Балтии и в Украине.",
      "#articles_title": "Статьи",
      "#article1_title": "Значение сексуального образования",
      "#article1_excerpt":
        "Как правильно и культурно обучать молодежь сексуальности — мнение профессора.",
      "#article1_link": "Читать полностью",
      "#article2_title": "Психология гендерной идентичности",
      "#article2_excerpt":
        "Как формируется гендерная идентичность и роль окружения в психологическом развитии.",
      "#article2_link": "Читать полностью",
      "#contact_title": "Контакт",
      "#contact_location_label": "Местоположение",
      "#contact_location_text": "Тбилиси, ул. Тевдоре Мгвдели, 48",
      "#contact_phone_label": "Телефон",
      "#contact_phone_text": "+995 599 12 34 56",
      "#contact_call_text": "Свяжитесь с нами для записи на прием",
      "#hero__subtitle_static": "Профессор",
      wordList: ["Сексолог", "Исследователь"],
      "#hero__button": "Подробно",
      "#books-promo__title": "Авторское издание",
      "#buy_button2": "Купить",
      "#book2_author": "Зураб Маршания",
      "#email": "почта",
      "#clock": "рабочее время",
      "#clock_description": `<p>Добро пожаловать,</p>
<p>Благодарим вас за обращение. Пожалуйста, обратите внимание, что приём пациентов осуществляется только по предварительной записи по номеру: +995 599 641187. Консультации проводятся на грузинском, английском и русском языках.</p>
<p>Часы приёма: с понедельника по пятницу, с 10:00 до 15:00. Адрес: улица Тевдоре Мгвдли №48, корпус 1А, квартира 2.</p>
`,
      "#brand-desc":
        "Медицинская сексология — междисциплинарная область современной медицины, изучающая сексуальное здоровье человека.",
      "#item-adress": "Улица Тевдоре Мгвдели, 48",
      "#main2": "Главный",
      "#bio2": "Биография",
      "#contact2": "Контакт",
      "#srulad": "Полностью",
      "#serve-title": "Услуга",
      "#man-category-title": "Сексуальная дисфункция у мужчин",
      "#man-category-title-1": "Эректильная дисфункция",
      "#man-category-title-2": "Преждевременная эякуляция",
      "#man-category-title-3": "Задержка эякуляции",
      "#man-category-title-4": "Снижение либидо",
      "#woman-category-title": "Сексуальная дисфункция у женщин",
      "#woman-category-title-1": "Вагинизм",
      "#woman-category-title-2": "Аногазмия",
      "#woman-category-title-3": "Снижение либидо",
      "#woman-category-title-4": "Снижение возбуждения",
      "#other-category-title": "Другие услуги",
      "#other-category-title-1": "Психология",
      "#other-category-title-2": "Психиатрия",
      "#other-category-title-3": "Гинекология",
      "#other-category-title-4": "Ультразвуковое исследование",
      "#other-category-title-5": "Кардиология",
      "#other-category-title-6": "Лабораторные исследования",
      "#interviews-title": "🎥 Видео интервью",
      "#articles-title": "📰 Статьи",
      "#article-card-title":
        "Когда у человека нет гармоничной сексуальной жизни...",
      "#article-card-excerpt":
        "Сексолог Зураб Маршания о снижении либидо — как гармоничная сексуальная жизнь влияет на человека.",
      "#article-card-link": "Читать полностью",
      "#article-card-title-1":
        "Существует ряд заболеваний, которые возникают у женщин",
      "#article-card-excerpt-1":
        "Профессор Зураб Маршания говорит о заболеваниях, которые могут развиваться у женщин по гинекологическим причинам.",
      "#article-card-link-1": "Читать полностью",
      "#add":
        "⚠️ Обратите внимание, что в связи с праздниками консультации возобновятся с 15 сентября. Чтобы записаться на прием заранее, вы можете связаться с нами по указанному номеру.",
    },
  };

  document.getElementById("clockDisplay").innerHTML = `
  <i class="fa-solid fa-xmark close-icon" onclick="hideClockDetails()"></i>
  ${translations[currentLang]["#clock_description"]}
`;

  function applyLanguage(langCode) {
    currentLang = langCode;
    const selectedLang = translations[langCode];
    if (!selectedLang) return;

    Object.entries(selectedLang).forEach(([selector, text]) => {
      if (selector === "wordList") {
        wordList = text;
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
        type();
        return;
      }

      const el = document.querySelector(selector);
      if (el) {
        if (text.includes("<") || text.includes("&")) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    const clockDisplay = document.getElementById("clockDisplay");
    if (clockDisplay) {
      clockDisplay.innerHTML = `
      <i class="fa-solid fa-xmark close-icon" onclick="hideClockDetails()"></i>
      ${translations[langCode]["#clock_description"]}
    `;
    }

    window.currentLang = langCode;
  }

  // lang Menu
  const langSwitcher = document.querySelector(".header__language-switcher");
  const langSelected = langSwitcher?.querySelector(
    ".language-switcher__selected"
  );
  const langDropdown = langSwitcher?.querySelector(
    ".language-switcher__dropdown"
  );
  const langItems = langDropdown?.querySelectorAll(
    ".language-switcher__item img"
  );

  if (langSelected && langDropdown && langItems) {
    langSelected.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("visible");
    });

    langItems.forEach((img) => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();

        // flag change in UI
        const selectedImg = langSelected.querySelector("img");
        if (selectedImg) {
          selectedImg.src = img.src;
          selectedImg.alt = img.alt;
        }

        const selectedLang = img.dataset.language;
        localStorage.setItem("selectedLanguage", selectedLang);
        applyLanguage(selectedLang);
        langDropdown.classList.remove("visible");
      });
    });

    document.addEventListener("click", (e) => {
      if (!langSwitcher.contains(e.target)) {
        langDropdown.classList.remove("visible");
      }
    });

    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) {
      const savedImg = Array.from(langItems).find(
        (img) => img.dataset.language === savedLang
      );
      if (savedImg) {
        const selectedImg = langSelected.querySelector("img");
        selectedImg.src = savedImg.src;
        selectedImg.alt = savedImg.alt;
        applyLanguage(savedLang);
      }
    }
  }

  // Header shrink on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (header) {
      header.classList.toggle("shrink", window.scrollY > 50);
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
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startY + distanceY * ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  // Anchor smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        smoothScrollTo(targetElement.offsetTop - 80, 1200);
        history.pushState(null, null, targetId);
      }
    });
  });

  //Burger menu toggle
  const burger = document.getElementById("burger");
  const languagetransform = document.getElementById("language-transform");
  const navList = document.getElementById("nav");
  if (burger && navList) {
    burger.addEventListener("click", () => {
      navList.classList.toggle("active");
      burger.classList.toggle("open");
      languagetransform.classList.toggle("act");
    });
  }

  // Work hours show/hide
  window.showClockDetails = function () {
    const clock = document.getElementById("clockDisplay");
    if (clock) {
      clock.style.display = "block";

      setTimeout(() => {
        document.addEventListener("click", handleOutsideClick);
      }, 0);
    }
  };

  window.hideClockDetails = function () {
    const clock = document.getElementById("clockDisplay");
    if (clock) clock.style.display = "none";

    document.removeEventListener("click", handleOutsideClick);
  };

  function handleOutsideClick(event) {
    const clockBlock = document.getElementById("work-clock");
    if (clockBlock && !clockBlock.contains(event.target)) {
      hideClockDetails();
    }
  }

  // Biography toggle
  window.toggleBio = function () {
    const bioText = document.querySelector(".bio__text");
    const button = document.querySelector(".bio__toggle-btn");
    if (bioText && button) {
      const isExpanded = bioText.classList.toggle("expanded");

      // Get current language
      const savedLang = localStorage.getItem("selectedLanguage") || "ge";
      const translations = {
        ge: {
          collapse: "ჩაკეცვა",
          expand: "სრულად ნახვა",
        },
        en: {
          collapse: "Collapse",
          expand: "Read more",
        },
        ru: {
          collapse: "Свернуть",
          expand: "Читать полностью",
        },
      };

      button.textContent = isExpanded
        ? translations[savedLang].collapse
        : translations[savedLang].expand;
    }
  };

  // Intersection observer for fade-slide-up elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });
  document.querySelectorAll(".fade-slide-up").forEach((el) => {
    if (el) observer.observe(el);
  });

  // Logo click scroll to main section
  const logo = document.querySelector(".header__logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      const section = document.querySelector("#main-section");
      if (section) {
        smoothScrollTo(section.offsetTop - 80);
        history.pushState(null, null, "#main-section");
      }
    });
  }

  // Active nav link toggle
  const navLinks = document.querySelectorAll(".nav-list__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("nav-list__link--active"));
      this.classList.add("nav-list__link--active");
    });
  });

  type();

  setTimeout(hideLoader, 1000);
});

const scrollBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
