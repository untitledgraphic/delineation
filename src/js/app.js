/*! (c) 2018 Craig Cooper */

var app = (function ($) {
    'use strict';

    // private alias to settings
    //var s;

    return {
        settings: function() {
            this.$window        = $(window);
        },

        init: function() {
            //var s = new this.settings();
            
            this.bindUIActions();       // UI Actions (click, focus etc)
            this.bindWindowActions();   // Window actions (scrolling, resize etc)
            this.nav();                 // Main navigation
//            this.features();            // do stuff on scroll (Scrollify)
            this.lazy();                // lazyload config
        },

        bindUIActions: function() {
            
            ////////// LOGO DEBOSS ///////////
            setTimeout(function(){
                $('body').addClass('loaded');
            }, 2000);
        },

        bindWindowActions: function() {
            ////////// Nothing to see here ///////////
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
        
//        features: function() {
//            $.scrollify({
//                section : '.panel',
//                easing: 'easeOutExpo',
//                scrollbars: false,
//                setHeights: false,
//                overflowScroll: true,
//                updateHash: true,
//                touchScroll:true,
//                before: function(i) {
//                    var active = $('.slide.active');
//                    active.addClass('remove');
//
//                    $('[data-slide=' + i + ']').addClass('active');
//                    active.removeClass('remove active');
//                },
//                afterRender: function() {
//                    $('.panel').each(function() {
//                        $(this).css('height', parseInt($(window).height()));
//                    });
//                    $.scrollify.update();
//                    $('[data-slide=0]').addClass('active');
//                }
//            });            
//        },
        
        lazy: function() {

            $('.lazy').show().lazy( {
                effect: 'fadeIn',
                threshold: 0,
                afterLoad: function(e) {
                    e.addClass('loaded');
                }
            });
        }    
    };
})(jQuery);

jQuery(document).ready(function() {
    app.init();
});