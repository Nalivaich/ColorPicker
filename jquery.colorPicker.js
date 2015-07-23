/**
 * Created by vitali.nalivaika on 23.07.2015.
 */

(function($){
    //все переменные не затираются после отработки ф-ии


    jQuery.fn.colorPicker = function(inputParam, divParam, options){

        options = $.extend({
            defColor:"white",
            hoverColor:"red"
        }, options);

        //var $template = $('<div id="modal_form" class=""></div>' + '')

       var $modal =  $('#modal_form');

        var initilizePicker = function(){
           // $(this).find()


            $(inputParam).click( function(event){ // лoвим клик пo ссылки с id="go"
                $('body').append('<div id="modal_form" class=""></div>');
                $('#modal_form').append("<span id='modal_close'>DFGDFGDFGD</span>");
                $('body').append('<div id="overlay"></div>');
                event.preventDefault(); // выключaем стaндaртную рoль элементa
                $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
                    function(){ // пoсле выпoлнения предъидущей aнимaции
                        $('#modal_form')
                            .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                            .animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
                    });


                $('#modal_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
                    $('#modal_form')
                        .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                        function(){ // пoсле aнимaции
                            $(this).css('display', 'none'); // делaем ему display: none;
                            $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                            $("#modal_form").remove();
                            $("#overlay").remove();
                        }
                    );
                });
            });





            // здесь переменная this будет содержать отдельный
            // DOM-элемент, к которому и нужно будет применить
            // воздействия плагина
            /*$(this).css("background-color",options.defColor)
                .mouseenter( function(){
                    $(this).css("background-color",options.hoverColor);
                })
                .mouseleave( function(){
                    $(this).css("background-color",options.defColor);
                });*/
        };

        return this.each(make);

    };
})(jQuery);

