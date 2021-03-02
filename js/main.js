$(document).ready(function () {
  // Modal
  // Зберігаємо в перемінну кнопку з атрибутом data-modal і кнопку закриття data-close
  const modalCall = $("[data-modal]");
  const modalClose = $("[data-close]");

  // Відкриття. При кліку на modalCall буде виконуватись функція
  modalCall.on("click", function (event) {
    //   event.preventDefault(); - додається коли в HTML кнопки у вигляді ссилок,
    //  відміняє стандартну поведедінку

    let $this = $(this);
    let modalId = $this.data("modal");

    //  Виклик модального вікна
    $(modalId).addClass("show");
    //  Додавання класу яка не дозволяє проручуват фон
    $("body").addClass("no-scroll");

    //  Затримка анімації
    setTimeout(function () {
      //  Анімація вкилику
      $(modalId).find(".modal-dialog").css({
        transform: "scale(1)",
      });
    }, 200);
  });

  //Закриття модального вікна
  modalClose.on("click", function (event) {
    let $this = $(this);

    //Метод закриття для кількох модальних вікон, по класу "радітєля"
    let modalParent = $this.parents(".modal-contact");

    //  Анімація зариття
    modalParent.find(".modal-dialog").css({
      transform: "scale(0)",
    });

    //  Затримка анімації
    setTimeout(function () {
      //  Забираємо клас "show" у модального вікна
      modalParent.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  //   Закриття модалки по кліку на маску
  $(".modal-contact ").on("click", function (event) {
    let $this = $(this);
    //  Анімація зариття
    $this.find(".modal-dialog").css({
      transform: "scale(0)",
    });

    //  Затримка анімації
    setTimeout(function () {
      //  Забираємо клас "show" у модального вікна
      $this.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  //   Робимо так, щоб при кліку на саму модалку, наприкалд для заповнення форми вона не закривалсь
  $(".modal-dialog").on("click", function (event) {
    event.stopPropagation();
  });

  // form validation
  $(".modal-contact__form").each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Пожалуйста, введите Ваше имя",
          minlength: "Имя должно состоять не менее чем из 4 букв.",
        },
        phone: {
          required: "Телефон обязателен",
          number: "Телефон должен состоять только из цифр",
          minlength: "Номер телефона должен составлять не менее 5 цифр",
        },
      },
      rules: {
        phone: {
          required: true,
          minlength: 5,
        },
        name: {
          required: true,
          minlength: 4,
        },
      },
    });
  });

  // Активація Бургер-меню
  $(".burger-menu").click(function (event) {
    $(".burger-menu, .nav__wrapper, .burger-menu__line").toggleClass("active");
    $("body").toggleClass("no-scroll");
  });
  // Закриваємо меню при натисканні по пункту меню в бургері
  $(".nav__link").click(function (event) {
    $(".burger-menu, .nav__wrapper, .burger-menu__line").removeClass("active");
  });
  // Закриваємо меню при кліку по кнопці звязатись
  $(".nav__link--btn").click(function (event) {
    $(".burger-menu, .nav__wrapper, .burger-menu__line").removeClass("active");
  });
});

// Плавний скролл по секціям
let anchors = document.querySelectorAll('header a[href*="#"]'); //обовязково вказати де знаходиться меню

for (anchor of anchors) {
  if (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      anchorId = this.getAttribute("href");
      yOffset = -75; // задаете отступ
      element = document.querySelector(anchorId); // находим элемент до которого нужно прокручивать страницу
      y = element.getBoundingClientRect().top + window.pageYOffset + yOffset; // находим расстояние до элемента
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  }
}

// Кнопка scroll-up
const offset = 300;
const scrollUp = document.querySelector(".scroll-up");
const scrollUpSvgPath = document.querySelector(".scroll-up__svg-path");
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = "stroke-dashoffset 20ms";

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// Заливка індикатору прокрутки
const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength) / height;
  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// Показання і приховування кнопки
window.addEventListener("scroll", () => {
  updateDashoffset();

  if (getTop() > offset) {
    scrollUp.classList.add("active");
  } else {
    scrollUp.classList.remove("active");
  }
});

// Підняття екрану уверх по кліку
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// AOS
AOS.init();
