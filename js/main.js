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
      $(modalId).find(".modal-contact__dialog").css({
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
    modalParent.find(".modal-contact__dialog").css({
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
    $this.find(".modal-contact__dialog").css({
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
  $(".modal-contact__dialog").on("click", function (event) {
    event.stopPropagation();
  });
});

// Плавний скролл по секціям
let anchors = document.querySelectorAll('header a[href*="#"]'); //обовязково вказати де знаходиться меню

for (anchor of anchors) {
  if (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      anchorId = this.getAttribute("href");
      yOffset = -70; // задаете отступ
      element = document.querySelector(anchorId); // находим элемент до которого нужно прокручивать страницу
      y = element.getBoundingClientRect().top + window.pageYOffset + yOffset; // находим расстояние до элемента
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  }
}
