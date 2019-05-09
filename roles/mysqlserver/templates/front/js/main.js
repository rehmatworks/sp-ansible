
//--- Form layouts

$('label.with-ico input').on('click focus', function () {
    $(this).parent().find('i, span').addClass('colored');
});

$('label.with-ico input').blur(function () {
    $(this).parent().find('i, span').removeClass('colored');
});

$('label input').focus(function () {
    $(this).parent().removeClass('has-error warning')
});

$('.btn-like').click(function () {
    $(this).toggleClass('liked');
});

$('label.checkbox input').click(function () {
    if ($(this).is(':checked')) {
        $(this).parent().addClass('checked');
    } else {
        $(this).parent().removeClass('checked');
    }
});

$('label.radio input').click(function () {

    $(this).parent().parent().find('.checked').removeClass('checked');

    if ($(this).is(':checked')) {
        $(this).parent().addClass('checked');
    } else {
        $(this).parent().removeClass('checked');
    }
});

$('label img.show').click(function () {

    $(this).toggleClass('active');

    if($(this).hasClass('active')) {
        $(this).parent().find('input').attr('type', 'text');
    } else {
        $(this).parent().find('input').attr('type', 'password');
    }

});

//--- end


//--- Transform img to svg

jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        var $svg = jQuery(data).find('svg');
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');

        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
    }, 'xml');

});

//--- end


//--- Top apps list number count

var topAppsCount = $('.widget-top__list').find('.num');

for (var i = 0; i <= topAppsCount.length; i++) {
    $(topAppsCount[i]).text(i+1);
}

//--- end


//--- Details page description

var detailsDescText = $('.details__description__text-area');
var detailsDescShowMore = $('.details__description__text-area__show-more');
if (detailsDescText.height() > 90) {
    detailsDescText.addClass('fixed-height');
    detailsDescShowMore.show();
} else {
    detailsDescText.removeClass('fixed-height');
    detailsDescShowMore.hide();
}

detailsDescShowMore.click(function () {
    $(this).prev().toggleClass('full-height');
    $(this).toggleClass('more');
    $(this).find('span').text(function(i, text){
        return text === "Show more" ? "Show less" : "Show more";
    });
});

//--- end


//--- Details page history accordion

$('.details__history__accordion__item-title').click(function () {
    $(this).toggleClass('toggled');
    $(this).parent().parent().find('.details__history__accordion__item-title').not($(this)).removeClass('toggled');
    $(this).parent().parent().find('.details__history__accordion__item-content').not($(this).next()).slideUp(300);
    $(this).next().slideToggle(300);
});

var historyItems = $('.details__history__accordion .details__history__accordion__item');
var historyItemsMoreThree = $('.details__history__accordion .details__history__accordion__item:nth-child(n+4)');
var historyShowMore = $('.details__history__show-more');

if (historyItems.length > 3) {
    historyShowMore.show();
    $(historyItemsMoreThree).hide();
} else {
    historyShowMore.hide();
}

historyShowMore.click(function () {
    $(this).find('span').text(function(i, text){
        return text === "Show more" ? "Show less" : "Show more";
    });
    historyItemsMoreThree.toggle();
});

//--- end


//--- Dropdown user click

$('.dropdown').click(function () {
    $(this).find('.dropdown-menu').fadeToggle(200);
});

$(document).mouseup(function(e) {
    var container = $('.dropdown');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.find('.dropdown-menu').hide();
    }
});

//--- end


//--- Mobile navbar

var navBars = $('.header__m-bar');
var headerContent = $('.header__content');
var mobileShadow = $('.mobile-nav-shadow');

var closeMobileNav = function () {
    $(document).mouseup(function(e) {
        var container = headerContent;
        if (!container.is(e.target) && !navBars.is(e.target) && container.has(e.target).length === 0) {
            headerContent.removeClass('visible');
            mobileShadow.fadeOut();
        }
    });
};

navBars.click(function () {
    headerContent.addClass('visible');
    mobileShadow.fadeIn();
    closeMobileNav();
});

//--- end


//--- Recommended and Top Apps section cut text

$('.main-item__description a.title-smallest, .widget-top__list__item__title a, .widget-top__list__item__dev a span').each(function () {

    var text = $.trim($(this).text());

    if (text.length > 15) {
        $(this).text(text.substring(0, 15).split("").slice(0, -1).join("") + "...")
    }
});

//--- end


//--- Popups

$(document).mouseup(function(e) {
    var container = $('.popup__card, .auth__card');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.popup').fadeOut();
        $('body').css({
            'overflow': 'visible'
        });
    }
});

$('.popup-btn').click(function () {

    var popupId = $(this).attr('data-popup-target');

    $('.popup' + popupId).fadeIn();
    $('body').css({
       'overflow': 'hidden'
    });
});
$('.popup__close').click(function () {
    $('.popup').fadeOut();
    $('body').css({
        'overflow': 'visible'
    });
});

//--- end


//--- Auth form

var logInForm = $('.auth__form.auth__form--login');
var signUpForm = $('.auth__form.auth__form--sign-up');
var forgotPwdForm = $('.auth__form--forgot-pwd');
var tabForms = $('.auth__tabs, .auth__form');
var loginTab = $('.auth__tabs__item:first-of-type');

$('.auth__tabs__item').click(function () {
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
});

$('.auth__tabs__item--login').click(function () {
    logInForm.show();
    signUpForm.hide();
});

$('.auth__tabs__item--sign-up').click(function () {
    signUpForm.show();
    logInForm.hide();
});

$('.auth__form__row__forgot-pwd span').click(function () {
    tabForms.hide();
    forgotPwdForm.show();
});

$('.auth__form__back-to .btn-outlined').click(function () {
    logInForm.show();
    $('.auth__tabs').show();
    forgotPwdForm.hide();
    loginTab.parent().find('.active').removeClass('active');
    loginTab.addClass('active');
});

//--- end


//--- Recommended tabs

$('.recommended__tabs .recommended__tabs__item').click(function () {
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
});

$('.recommended__tabs__item').click(function () {
    $(this).parent().parent().find('.recommended__tabs-content__item').removeClass('active');
    if($(this).hasClass('recommended__tabs__item--games')) {
        $(this).parent().parent().find('.recommended__tabs-content__item--games').addClass('active');
    } else {
        $(this).parent().parent().find('.recommended__tabs-content__item--apps').addClass('active');
    }
});

//--- end


//--- Search results page show more
$('.search__items__show-more').addClass('visible-btn')
var searchItems = $('.search__item').length;

if (searchItems > 3) {
    $('.search__items__show-more').addClass('visible-btn')
} else {
    $('.search__items__show-more').removeClass('visible-btn')
}

$('.search__items__show-more span').click(function () {
    $('.search__items').addClass('more');
});

//--- end


//--- Games/apps page sort click
$('.apps__sort__header__item').click(function () {
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
});

//--- end


//--- Profile page sidebar
$('.profile__nav__list__item, .profile__user-info__footer__item').click(function () {
    $('.profile').find('.active').removeClass('active');
    $(this).addClass('active');
});
//--- end


//--- Profile page tabs

$('.tab-btn').click(function () {

    $('.tab-content').removeClass('active');
    var tabId = $(this).attr('data-tab-target');
    $('.tab-content' + tabId).addClass('active');

    $('html, body').animate({
        scrollTop: $('.profile__card').offset().top - 54
    }, 500);

});

//--- end


//--- Top/new/updated

var tnuItems = $('.tnu__items .tnu__item').length;

if (tnuItems > 3) {
    $('.tnu__items__show-more').addClass('visible-btn')
} else {
    $('.tnu__items__show-more').removeClass('visible-btn')
}

$('.tnu__items__show-more span.btn-outlined').click(function () {
    $('.tnu__items .tnu__item').addClass('visible');
});

$('.page-content.tnu .main-nav-tabs__item').click(function () {
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
    $('.tnu__items').removeClass('active');

    if ($(this).hasClass('games')) {
        $('.tnu__items--games').addClass('active')
    } else {
        $('.tnu__items--apps').addClass('active')
    }
});

if (window.location.pathname === '/updated') {
    $('.tnu__item .total-downloads').find('i').addClass('icon-refresh');
} else if (window.location.pathname === '/new') {
    $('.tnu__item .total-downloads').find('i').addClass('fa fa-calendar');
} else if (window.location.pathname === '/trending') {
    $('.tnu__item .total-downloads').find('i').addClass('icon-download');
}

//--- end
