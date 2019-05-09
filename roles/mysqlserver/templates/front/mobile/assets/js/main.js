(function($) {
    $(".top-slider").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true


    });
    // navbar toggler
    $('.mb-menu-toggle').on('click', function(e) {
        e.preventDefault();
        if (!$('body').hasClass('menu-open')) {
            $('body').addClass('menu-open');
            $('span.line.mid').css('opacity', 0);

            $('.mobile-menu > ul > li').each(function(i, el) {
                setTimeout(function(i) {
                    $(el).addClass('revealed');
                }, i * 100 + 100);
            });

        } else {
            $('body').removeClass('menu-open');
            setTimeout(function() {
                $('span.line.mid').css('opacity', 1);
            }, 300);

            setTimeout(function() {
                $('.mobile-menu ul > li.has-menu').removeClass('expanded');
                $('.mobile-menu ul > li.has-menu .sub_ul').hide();

                $('.mobile-menu > ul > li').removeClass('revealed');
            }, 400);
        }
    });

    $('.search-toggle').on('click', function() {
        $('.header').toggleClass('search-open');
    });


    // $(window).scroll(function() {
    //     var wscrolled = $(this).scrollTop();
    //     var headerH = $('.header').innerHeight();
    //     var navH = $('nav').innerHeight();
    //   if(wscrolled > headerH + navH) {
    //      $('')
    //   }
    //   else{

    //   }

    // });

    $('.expandable .more-btn-dots').on('click', function(e) {
        e.preventDefault();
        $(this).parents('.expandable').toggleClass('expanded');
        $(this).parents('.expandable').find('.expandable_content').slideToggle();
    });

    $(window).load(function() {
        $('.scrollable-x').perfectScrollbar({
            wheelSpeed: 2.3
        });

        $(window).on('resize', function() {
            $('.scrollable-x').perfectScrollbar('update');
        });
    });

})(jQuery);

$(document).on('submit', '#searchForm', function(){
    var query = $('#main-search').val();
    var url = $(this).attr('action');
    var targetLocation = url+query+'/';
    window.open(targetLocation, '_self');

    return false;
});
