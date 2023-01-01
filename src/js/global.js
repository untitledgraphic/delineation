/*! (c) 2018 Craig Cooper */

var app = (function ($) {
    'use strict';

    return {
        settings: function () {
            this.$window        = $(window);
        },

        init: function () {            
            this.parallax();            // parallaxy images
        },
             
        // to be converted to vanilla JS and moved to a view file

//         form: function() {
            
//             $('.form__txt').blur(function() {
//                 var tmpval = $(this).val();
//                 if(tmpval === '') {
// //                    $(this).addClass('empty');
//                     $(this).removeClass('filled');
//                 } else {
//                     $(this).addClass('filled');
// //                    $(this).removeClass('empty');
//                 }
//             });
//         },
          
        // to convert to vanilla js and moved to home 
        
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