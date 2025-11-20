describe("Doctor Zurab Marshania - Homepage Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  // ----------------- Page Title -----------------
  it("Should have correct page title", () => {
    cy.title().should(
      "include",
      "Doctor Zurab Marshania - marshaniasexologist"
    );
  });

  // ----------------- Header -----------------
  describe("Header Section", () => {
    it("Header should be visible", () => {
      cy.get("header").scrollIntoView().should("be.visible");
    });

    it("Logo should be visible", () => {
      cy.get(".header__logo").scrollIntoView().should("be.visible");
    });

    it("Navigation should have correct links", () => {
      const navTexts = [
        "მთავარი",
        "ბიოგრაფია",
        "ინტერვიუები",
        "სერვისები",
        "წიგნები",
        "კონტაქტი",
      ];
      cy.get("nav#nav a").should("have.length", navTexts.length);
      navTexts.forEach((text) => {
        cy.get("nav#nav").contains(text).scrollIntoView().should("exist");
      });
    });

    it("Language switcher should be visible and clickable", () => {
      cy.get("#burger").scrollIntoView().should("be.visible").click();
      cy.get("#language-transform")

        .should("be.visible")
        .click();
      cy.get(".language-switcher__dropdown .language-switcher__item").should(
        "have.length",
        3
      );
    });
  });

  // ----------------- Hero Section -----------------
  describe("Hero Section", () => {
    it("Hero title should exist", () => {
      cy.get("#hero_title")
        .scrollIntoView()
        .should("contain.text", "ზურაბ მარშანია");
    });

    it("Hero subtitle should exist", () => {
      cy.get("#hero__subtitle").scrollIntoView().should("exist");
    });

    it("Hero image should be visible", () => {
      cy.get(".hero__image").scrollIntoView().should("be.visible");
    });

    it("Hero button should scroll to Bio section", () => {
      cy.get("#hero__button").scrollIntoView().click();
      cy.get("#bio-section").scrollIntoView().should("be.visible");
    });
  });

  // ----------------- Navigation scrolling -----------------
  describe("Navigation scrolling", () => {
    const navLinks = [
      { text: "მთავარი", id: "#main", section: "#main-section" },
      { text: "ბიოგრაფია", id: "#bio", section: "#bio-section" },
      { text: "ინტერვიუები", id: "#articles", section: "#interviews-section" },
      { text: "სერვისები", id: "#serve", section: "#services" },
      { text: "წიგნები", id: "#books", section: "#book-section" },
      { text: "კონტაქტი", id: "#contact", section: "#contact-section" },
    ];

    navLinks.forEach((link) => {
      it(`Clicking '${link.text}' scrolls to correct section`, () => {
        cy.get("#burger").scrollIntoView().should("be.visible").click();
        cy.get(link.id).scrollIntoView().click();
        cy.get(link.section).scrollIntoView().should("be.visible");
      });
    });
  });

  // ----------------- Bio Section -----------------
  describe("Bio Section", () => {
    it("Bio title should exist", () => {
      cy.get("#bio_title")
        .scrollIntoView()
        .should("contain.text", "მოკლე ბიოგრაფია");
    });

    it("Bio text should exist", () => {
      cy.get("#bio_text").scrollIntoView().should("exist");
    });

    it("Bio toggle button should exist and clickable", () => {
      cy.get("#srulad").scrollIntoView().should("exist").click();
    });
  });

  // ----------------- Services Section -----------------
  describe("Services Section", () => {
    it("Services title should exist", () => {
      cy.get("#serve-title")
        .scrollIntoView()
        .should("contain.text", "სერვისები");
    });

    const categories = [
      { id: "man-category-title", items: 4 },
      { id: "woman-category-title", items: 4 },
      { id: "other-category-title", items: 6 },
    ];

    categories.forEach((cat) => {
      it(`${cat.id} should have correct number of services`, () => {
        cy.get(`#${cat.id}`).scrollIntoView().should("exist");
        cy.get(`#${cat.id}`)
          .next("ul")
          .children()
          .should("have.length", cat.items);
      });
    });
  });

  // ----------------- Book Section -----------------
  describe("Book Section", () => {
    it("Books title should exist", () => {
      cy.get("#books-promo__title")
        .scrollIntoView()
        .should("contain.text", "ავტორის გამოცემა");
    });
  });

  // ----------------- Interviews & Articles -----------------
  describe("Interviews & Articles", () => {
    it("Interviews section title should exist", () => {
      cy.get("#interviews-title")
        .scrollIntoView()
        .should("contain.text", "🎥 ვიდეო ინტერვიუები");
    });

    it("Articles section title should exist", () => {
      cy.get("#articles-title")
        .scrollIntoView()
        .should("contain.text", "📰 სტატიები");
    });
  });

  // ----------------- Contact Section -----------------
  describe("Contact Section", () => {
    it("Contact title should exist", () => {
      cy.get("#contact_title")
        .scrollIntoView()
        .should("contain.text", "კონტაქტი");
    });

    it("Contact location should exist", () => {
      cy.get("#contact_location_text")
        .scrollIntoView()
        .should("contain.text", "თევდორე მღვდლის ქუჩა 48");
    });

    it("Contact phone should exist", () => {
      cy.get(".contact__info")
        .scrollIntoView()
        .contains("+995 599 641187")
        .should("exist");
    });

    it("Contact email should exist", () => {
      cy.get(".contact__info")
        .scrollIntoView()
        .contains("zurab.marshania.cabinet@gmail.com")
        .should("exist");
    });
  });

  // ----------------- Footer -----------------
  describe("Footer Section", () => {
    it("Footer should be visible", () => {
      cy.get("footer").scrollIntoView().should("be.visible");
    });

    it("Footer logo should be visible", () => {
      cy.get(".footer__brand .brand-info__logo")
        .scrollIntoView()
        .should("be.visible");
    });

    it("Footer links should exist", () => {
      cy.get("#main2").scrollIntoView().should("exist");
      cy.get("#bio2").scrollIntoView().should("exist");
      cy.get("#contact2").scrollIntoView().should("exist");
    });
  });

  // ----------------- Scroll To Top -----------------
  describe("Scroll To Top Button", () => {
    it("Scroll To Top button should exist and clickable", () => {
      cy.scrollTo("bottom");
      cy.get("#scrollToTopBtn")
        .scrollIntoView()
        .should("exist")
        .click({ force: true });
    });
  });
});
