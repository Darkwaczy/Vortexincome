(function ($) {
  "use strict";

  // menu options custom affix
  var fixed_top = $(".header");
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      fixed_top.addClass("animated fadeInDown menu-fixed");
    } else {
      fixed_top.removeClass("animated fadeInDown menu-fixed");
    }
  });

  // mobile menu js
  $(".navbar-collapse>ul>li>a, .navbar-collapse ul.sub-menu>li>a").on(
    "click",
    function () {
      const element = $(this).parent("li");
      if (element.hasClass("open")) {
        element.removeClass("open");
        element.find("li").removeClass("open");
      } else {
        element.addClass("open");
        element.siblings("li").removeClass("open");
        element.siblings("li").find("li").removeClass("open");
      }
    }
  );

  // Show or hide the sticky footer button
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".scroll-to-top").fadeIn(200);
    } else {
      $(".scroll-to-top").fadeOut(200);
    }
  });

  // Animate the scroll to top
  $(".scroll-to-top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  //preloader js code
  $(".preloader")
    .delay(300)
    .animate(
      {
        opacity: "0",
      },
      300,
      function () {
        $(".preloader").css("display", "none");
      }
    );

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  new WOW().init();

  // custom cursor
  var cursor = $(".cursor"),
    follower = $(".cursor-follower");

  var posX = 0,
    posY = 0;

  var mouseX = 0,
    mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;

      TweenMax.set(follower, {
        css: {
          left: posX - 12,
          top: posY - 12,
        },
      });

      TweenMax.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY,
        },
      });
    },
  });

  $(document).on("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  $("a").on("mouseenter", function () {
    cursor.addClass("active");
    follower.addClass("active");
  });
  $("a").on("mouseleave", function () {
    cursor.removeClass("active");
    follower.removeClass("active");
  });

  /*==================== custom dropdown select js ====================*/
  $(".custom--dropdown > .custom--dropdown__selected").on("click", function () {
    $(this).parent().toggleClass("open");
  });
  $(".custom--dropdown > .dropdown-list > .dropdown-list__item").on(
    "click",
    function () {
      $(
        ".custom--dropdown > .dropdown-list > .dropdown-list__item"
      ).removeClass("selected");
      $(this)
        .addClass("selected")
        .parent()
        .parent()
        .removeClass("open")
        .children(".custom--dropdown__selected")
        .html($(this).html());

      // Get the selected value
      var selectedValue = $(this).data("url"); // Assuming data-code attribute contains the value
      // Call onchange function
      changeLanguage(selectedValue);
    }
  );
  $(document).on("keyup", function (evt) {
    if ((evt.keyCode || evt.which) === 27) {
      $(".custom--dropdown").removeClass("open");
    }
  });
  $(document).on("click", function (evt) {
    if (
      $(evt.target).closest(".custom--dropdown > .custom--dropdown__selected")
        .length === 0
    ) {
      $(".custom--dropdown").removeClass("open");
    }
  });

  function changeLanguage(selectedValue) {
    // Do something with the selected value
    window.location.href = selectedValue;
  }
})(jQuery);
