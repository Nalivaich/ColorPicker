/**
 * Created by vitali.nalivaika on 23.07.2015.
 */

(function($){
    //все переменные не затираются после отработки ф-ии
    var $template = {};

    jQuery.fn.colorPicker = function(options){

        var myInput = $(this).find('input');
        var myDiv = $(this).find('div');
        //myInput.css('background-color','green');

        options = $.extend({
            defColor:"white",
            hoverColor:"red"
        }, options);

        function buildModalForm() {
            var self = this;

            $('body').append('<div id="modal_form" class=""></div>');
            $('#modal_form').append("<div id='left_block'></div>");
            $('#modal_form').append("<div id='right_block'></div>");
            $('#right_block').append("<div id='red_value_block' class='color_block'></div>");
            $('#right_block').append("<div id='green_value_block' class='color_block'></div>");
            $('#right_block').append("<div id='blue_value_block' class='color_block'></div>");
            $('#right_block').append("<div id='hex_value_block' class='color_block'></div>");
            $('#red_value_block').append("<label for='red_input' >R<input id='red_input' type='text' /></label>");
            $('#green_value_block').append("<label for='green_input'>G<input id='green_input' type='text' /></label>");
            $('#blue_value_block').append("<label for='blue_input'>B<input id='blue_input' type='text' /></label>");
            $('#hex_value_block').append("<label for='hex_input'>#<input id='hex_input' type='text' /></label>");
            $('#modal_form').append("<div id='footer'></div>");
            $('#footer').append("<input id='applyButton' type='button' value='Apply' />");
            $('#footer').append("<input id='modal_close' type='button' value='Cancel' />");


            $('body').append('<div id="overlay"></div>');

            self.carcas =  $("#modal_form");
            self.overlay = $("#overlay");
        }

        var Singleton = (function () {
            var instance;

            function createInstance() {
                var buildObject = new buildModalForm();
                return buildObject;
            }


            return {
                getInstance: function () {
                    if (!instance) {
                        instance = createInstance();
                    }
                    return instance;
                }
            };
        })();


        //var $template = $('<div id="modal_form" class=""></div>' + '')
       //var $modal =  $('#modal_form');

        var initializePicker = function(){
           // $(this).find()


            $(myInput).click( function(event){ // лoвим клик пo ссылки с id="go"
                var instance = Singleton.getInstance();
                instance.carcas.css('visibility', 'visible');
                instance.overlay.css('visibility', 'visible');
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
                            instance.carcas.css('visibility', 'hidden');
                            instance.overlay.css('visibility', 'hidden');
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

        return this.each(initializePicker);

    };
})(jQuery);

