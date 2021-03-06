/*! (c) 2018 Craig Cooper */

var app = (function ($) {
    'use strict';

    // private alias to settings
    //var s;

    return {
        settings: function () {
            this.$window        = $(window);
        },

        init: function () {
            //var s = new this.settings();
            
            this.bindUIActions();       // UI Actions (click, focus etc)
            this.nav();                 // Main navigation
//            this.features();            // do stuff on scroll (Scrollify)
            this.form();                // form type stuff
            this.lazy();                // lazyload config
            this.parallax();            // parallaxy images
            this.scrollon();            // scroll down a bit
        },

        bindUIActions: function() {
            
            ////////// LOGO DEBOSS ///////////
            setTimeout(function(){
                $('body').addClass('loaded');
            }, 2000);
        },
        
        nav: function() {
            var nav = '#mainNav';
            var navon = 'mainNav--active';
            
            $('#navTrigger').click(function(e) {
                e.preventDefault();
                $(nav).addClass(navon);
            });
            $('.mainNav__close').click(function(e) {
                e.preventDefault();
                $(nav).removeClass(navon);
            });
            $('.mainNav__link').click(function() {
                $(nav).removeClass(navon);
            });
            
            $('#works').click(function() {
                
                var first = '[data-slide="1"]';
                var active = 'active';
                
                if ($(first).hasClass(active)) {
                    //do nothing
                }
                else if ($('.slide').not(first).hasClass(active)) { 
                    $('.slide').not(first).removeClass(active);
                    $(first).addClass(active);
                }
                else {
                    $(first).addClass(active);
                }
            });
        },
        
        scrollon: function() {
            
            var scrollTrigger = function() {
                $('#helper').on('click', function(e) {
                    e.preventDefault(); 

                    var scrollPos = $(document).scrollTop();

                    $('html, body').animate({ 
                        scrollTop: $(window).height() + scrollPos  //Get the document height
                    }, 'slow'); //Animates the scroll
                });
            };
        
            $(window).on('load resize', function() {
                
                if (window.location.href !== 'http://localhost:3000/') {
                    scrollTrigger();
                }
                else if ($(this).width() < 768) {
                    scrollTrigger();
                }
            });
        },
        
        form: function() {
            
            $('.form__txt').blur(function() {
                var tmpval = $(this).val();
                if(tmpval === '') {
//                    $(this).addClass('empty');
                    $(this).removeClass('filled');
                } else {
                    $(this).addClass('filled');
//                    $(this).removeClass('empty');
                }
            });
        },
        
        lazy: function() {

            $('.lazy').Lazy({
                // your configuration goes here
                scrollDirection: 'vertical',
                effect: 'fadeIn',
                effectTime: 1000,
                visibleOnly: true,
                onError: function(element) {
                    console.log('error loading ' + element.data('src'));
                },
                afterLoad: function(e) {
                    $(this).addClass('loadeded');
                    console.log('loaded' + e.data('src'));
                }
            });
        },
        
        parallax: function() {
            
            $( window ).scroll(function() {
                
                var scroll = $(window).scrollTop();
                var h = $( window ).innerHeight()/2;
                $('.hero img').css('top', scroll/5);
                $('.hero__banner').css('opacity', 1 - scroll/h);
            });
        }
    };
})(jQuery);

jQuery(document).ready(function() {
    app.init();
});