$(document).ready(function () {

  $('form').each(function () {
    const form = $(this);
    const fileInput = $(this).find('input[type="file"]');
    const fileSpan = $(this).find('input[type="file"] ~ span');
    const fileText = 'Прикрепить файл';
    const phone = $(this).find('input[name*="phone"]');
    const privacyLabel = $(this).find('label[class*="privacy"]');
    const privacyInput = privacyLabel.find('input');

    privacyLabel.on('click', function () {
      if (privacyInput.attr('type') == 'checkbox') {
        privacyInput.is(':checked')
          ? privacyLabel.addClass('active')
          : privacyLabel.removeClass('active');
      } else if (privacyInput.attr('type') == 'radio') {
        privacyInput.is(':checked')
          ? (privacyLabel.siblings().removeClass('active'), privacyLabel.addClass('active'))
          : privacyLabel.removeClass('active');
      }
    });

    phone.each(function () {
      $(this).inputmask("+7 (999) 999-99-99");
    });

    fileInput.on('change', function () {
      const fileVal = $(this).val().replace(/.+[\\\/]/, '');
      fileVal !== '' ? fileSpan.text(fileVal) : fileSpan.text(fileText);
    });

    form.on('submit', function () {
      fileSpan.text(fileText);
      privacyLabel.removeClass('active');
    });
  });

  $(window).scroll(function () {
    $(this).scrollTop() > 600 ? $('#top').show(200) : $('#top').hide(200);
  });

  $('#top').click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
  });

  const menuIcon = $('.menu-toggle .icon-toggle');
  const menuItems = $('.main-menu-items');
  const menuLinks = $('.main-menu__link');

  menuIcon.click(function () {
    $(this).toggleClass('active');
    menuItems.slideToggle();
  });

  if ($(window).width() <= 900) {
    menuLinks.on('click', function () {
      menuItems.slideUp();
      menuIcon.removeClass('active');
    });
  }

  $('.about__item, .production-gallery, .reviews__item').each(function () {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery: {
        enabled: true
      }
    });
  });

  $(document).on('click', '.goto, .main-menu__link', function (event) {
    event.preventDefault();
    let id = $(this).attr('href');
    let top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 500);
  });

  function changeTotalPrice() {
    const priceTotal = priceBasic * quantityInput.val();
    $('.price__total').text(priceTotal);
  }

  const priceBasic = 2500;
  const quantity = $('.quantity');
  const quantityMinus = quantity.find('.quantity__button_minus');
  const quantityPlus = quantity.find('.quantity__button_plus');
  const quantityInput = quantity.find('input');

  changeTotalPrice();

  $('.price__basic').text(priceBasic);

  quantityMinus.on('click', function () {
    if (quantityInput.val() > 1) {
      quantityInput.val(quantityInput.val() - 1);
      changeTotalPrice();
    }
  });

  quantityPlus.on('click', function () {
    quantityInput.val(+quantityInput.val() + 1);
    changeTotalPrice();
  });

  $('.main-menu').append('<div class="main-menu__hover"></div>');

  $('.main-menu__item').on('mouseover', function () {
    let pseudoWidth = $(this).innerWidth();
    let pseudoHeight = $(this).innerHeight();
    let pseudoOffsetLeft = $(this).position().left;
    let pseudoOffsetTop = $(this).position().top;
    $('.main-menu__hover').css({
      'width': pseudoWidth + 'px',
      'height': pseudoHeight + 'px',
      'left': pseudoOffsetLeft + 'px',
      'top': pseudoOffsetTop + 'px',
      'opacity': 1,
    });
  });

  $('.main-menu__item').on('mouseout', function () {
    $('.main-menu__hover').css('opacity', '0');
  });

  $('.about-items').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="slick-prev fas fa-chevron-left a-drop"></button>',
    nextArrow: '<button class="slick-next fas fa-chevron-right a-drop"></button>',
  });

  $('.reviews-items').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: '<button class="slick-prev fas fa-chevron-left a-drop"></button>',
    nextArrow: '<button class="slick-next fas fa-chevron-right a-drop"></button>',
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          adaptiveHeight: true
        }
      }
    ]
  });

  wow = new WOW(
    {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    }
  );
  wow.init();

});
