"use strict";


// TABLE OF CONTENTS

//  1. preloader
//  2. page scrolling feature - requires jQuery Easing plugin
//  3. fixed navbar
//  4. back to top
//  6. tooltip
//  7. our clients logo carousel
//  8. magnify popup video
// 9. client-testimonial one item carousel
// 10. client-testimonial two
// 11. monthly and yearly pricing switch
// 12. coming soon count
// 13. contact form
// 14. custom vps hosting plan js

(function ($) {
  "use strict";

  // 1. preloader
  $(window).ready(function () {
    $("#preloader").delay(200).fadeOut("fade");
  });

  // 2. mega menu js
  // $(".js-mega-menu").HSMegaMenu({
  //   event: "hover",
  //   pageContainer: $(".container"),
  //   breakpoint: 767.98,
  //   hideTimeOut: 0
  // });

  // Off Canvas Menu Open & Close
  $("#offCanvas").on("click", function () {
    $(".nav-offcanvas").addClass("open");
    $(".offcanvas-overlay").addClass("on");
  });
  $("#offCanvasClose, .offcanvas-overlay").on("click", function () {
    $(".nav-offcanvas").removeClass("open");
    $(".offcanvas-overlay").removeClass("on");
  });

  // 3. fixed navbar
  $(window).on("scroll", function () {
    // checks if window is scrolled more than 500px, adds/removes solid class
    if ($(this).scrollTop() > 0) {
      $(".main-header-menu-wrap").addClass("affix");
      $(".scroll-to-target").addClass("open");
    } else {
      $(".main-header-menu-wrap").removeClass("affix");
      $(".scroll-to-target").removeClass("open");
    }
    // checks if window is scrolled more than 500px, adds/removes top to target class
    if ($(this).scrollTop() > 500) {
      $(".scroll-to-target").addClass("open");
    } else {
      $(".scroll-to-target").removeClass("open");
    }
  });

  // 4. back to top
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate({
        scrollTop: $(target).offset().top
      }, 500);
    });
  }

  // 6. tooltip

  $(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
    $('.custom-map-location li span').tooltip('show');
  });

  // 7. our clients logo carousel
  // $(".clients-carousel").owlCarousel({
  //   autoplay: true,
  //   loop: true,
  //   margin: 15,
  //   dots: false,
  //   slideTransition: "linear",
  //   autoplayTimeout: 4500,
  //   autoplayHoverPause: true,
  //   autoplaySpeed: 4500,
  //   responsive: {
  //     0: {
  //       items: 2
  //     },
  //     500: {
  //       items: 3
  //     },
  //     600: {
  //       items: 4
  //     },
  //     800: {
  //       items: 5
  //     },
  //     1200: {
  //       items: 6
  //     }
  //   }
  // });

  //hero gaming slider
  // $(".custom-indicator-slider").owlCarousel({
  //   items: 1,
  //   nav: false,
  //   dots: true,
  //   smartSpeed: 1000,
  //   dotsContainer: "#carousel-custom-indicator"
  // });

  // 8. magnify popup video
  // $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
  //   disableOn: 700,
  //   type: "iframe",
  //   mainClass: "mfp-fade",
  //   removalDelay: 160,
  //   preloader: false,
  //   fixedContentPos: false
  // });

  // 9. client-testimonial one item carousel
  // $(".client-testimonial-1").owlCarousel({
  //   loop: true,
  //   nav: false,
  //   dots: true,
  //   responsiveClass: true,
  //   autoplay: true,
  //   autoplayHoverPause: true,
  //   lazyLoad: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     500: {
  //       items: 2
  //     },
  //     600: {
  //       items: 2
  //     },
  //     800: {
  //       items: 3
  //     },
  //     1200: {
  //       items: 3
  //     }
  //   }
  // });
  // 10. client-testimonial one item carousel
  // $(".client-testimonial-2").owlCarousel({
  //   loop: true,
  //   nav: false,
  //   dots: true,
  //   responsiveClass: true,
  //   autoplay: true,
  //   autoplayHoverPause: true,
  //   lazyLoad: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     500: {
  //       items: 1
  //     },
  //     600: {
  //       items: 1
  //     },
  //     800: {
  //       items: 2
  //     },
  //     1200: {
  //       items: 2
  //     }
  //   }
  // });
  // 11. monthly and yearly pricing switch
  $("#js-contcheckbox").change(function () {
    if (this.checked) {
      $(".monthly-price").css("display", "none");
      $(".yearly-price").css("display", "block");
      $(".afterinput").addClass("text-success");
      $(".beforeinput").removeClass("text-success");
    } else {
      $(".monthly-price").css("display", "block");
      $(".yearly-price").css("display", "none");
      $(".afterinput").removeClass("text-success");
      $(".beforeinput").addClass("text-success");
    }
  });

  // 12. coming soon count
  function countDown() {
    var countDay = $(".counter-days");
    var countHour = $(".counter-hours");
    var countMinutes = $(".counter-minutes");
    var countSeconds = $(".counter-seconds");
    var date = new Date("Jan 1, 2024 12:00:00");
    var interval = setInterval(function () {
      var today = new Date().getTime();
      var distance = date - today;
      countDay.html(Math.floor(distance / (1000 * 60 * 60 * 24)) + 'D');
      countHour.html(Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) + 'H');
      countMinutes.html(Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)) + 'M');
      countSeconds.html(Math.floor(distance % (1000 * 60) / 1000) + 'S');
      if (distance < 0) {
        clearInterval(interval);
        $(".counter-days").html("00");
        $(".counter-hours").html("00");
        $(".counter-minutes").html("00");
        $(".counter-seconds").html("00");
      }
    }, 1000);
  }
  countDown();


  // 16. hero slider one
  // $(".hero-slider-one").owlCarousel({
  //   loop: true,
  //   autoplay: true,
  //   dots: true,
  //   margin: 0,
  //   autoplayHoverPause: true,
  //   items: 1,
  //   smartSpeed: 1000,
  //   animateOut: "slideOutLeft",
  //   animateIn: "slideInRight"
  // });

})(jQuery); // JQuery end