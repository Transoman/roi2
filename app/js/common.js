'use strict';
jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  window.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var header = document.querySelector('.header');

    if (scrolled >= 80) {
      header.classList.add('sticky');
    }
    else {
      header.classList.remove('sticky');
    }
  });

  $('a[href*="#"]')
  // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('.portfolio-list__tabs a')
    .click(function(event) {
    // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();

          var headerHeight = parseInt($('.header').height(), 10),
            top = target.offset().top - headerHeight - 50;
          $('.nav-toggle').removeClass('active');
          $('.header__nav').removeClass('open');

          $('html, body').animate({
            scrollTop: top
          }, 1000);
        }
      }
    });

  // Parallax
  if ($(window).width() > 1200) {
    var scene = document.getElementById('scene');
    new Parallax(scene, {
      relativeInput: true
    });
  }

  function simpleParallax(intensity, element) {
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      var imgPos = scrollTop / intensity + 'px';
      element.css('transform', 'translateY(' + imgPos + ')');
    });
  }
  
  simpleParallax(6, $('.parallax-star'));
  simpleParallax(-6, $('.parallax-ship'));

  // Portfolio slider
  $('.portfolio-slider').each(function(i, el) {
    var $this = $(this);
    $this.addClass('portfolio-slider-' + i);
    $this.parent().find('.swiper-button-prev').addClass('button-prev-' + i);
    $this.parent().find('.swiper-button-next').addClass('button-next-' + i);
    $this.parent().find('.swiper-pagination').addClass('swiper-pagination-' + i);
  
    var btnNext = '.button-next-' + i;
    var btnPrev = '.button-prev-' + i;

    new Swiper ('.portfolio-slider-' + i, {
      slidesPerView: 2,
      spaceBetween: -120,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination-' + i,
        type: 'fraction',
      },
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
      breakpoints: {
        992: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      }
    });

  });

  // Tabs
  $('.portfolio-list').tabslet();

  // Input mask
  var element = document.querySelectorAll('input[type="tel"]');
  var maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  if (element) {
    for (var i = 0; i < element.length; i++) {
      new IMask(element[i], maskOptions);
    }
  }

  $('.services-list__item .btn-trs').click(function(e) {
    var name = $(this).parents('.services-list__item').find('h3').text();
    $('#order-form input[name="subject"]').val('Заказ услуги: ' + name);
  });

  $.validator.addMethod('phoneno', function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, 'Введите Ваш телефон');
  
  $('.repeat-form').each(function(i) {
    $(this).addClass('repeat-form-' + i);

    $('.repeat-form-' + i).validate({
      messages: {
        name: 'Введите Ваше имя',
        phone: 'Введите Ваш телефон',
        message: 'Введите Ваше сообщение',
      },
      rules: {
        'phone': {
          required: true,
          phoneno: true
        }
      },
      submitHandler: function() {
        var t = $('.repeat-form-' + i).serialize();
        ajaxSend('.repeat-form-' + i, t);
      }
    });
  });

  /* Функцыя для отправки формы */
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: 'POST',
      url: 'sendmail.php',
      data: data,
      success: function() {
        $('.modal').popup('hide');
        $('#thanks').popup('show');
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

});