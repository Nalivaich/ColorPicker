/**
 * Created by vitali.nalivaika on 23.07.2015.
 */

(function($){
    //��� ���������� �� ���������� ����� ��������� �-��
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


            $(myInput).click( function(event){ // �o��� ���� �o ������ � id="go"
                var instance = Singleton.getInstance();
                instance.carcas.css('visibility', 'visible');
                instance.overlay.css('visibility', 'visible');
                event.preventDefault(); // ������a�� ��a��a����� �o�� �������a
                $('#overlay').fadeIn(400, // ��a�a�a ��a��o �o�a���a�� ������ �o��o���
                    function(){ // �o��� ���o������ ����������� a���a���
                        $('#modal_form')
                            .css('display', 'block') // ����a�� � �o�a���o�o o��a display: none;
                            .animate({opacity: 1, top: '50%'}, 200); // ��a��o ����a����� ��o��a��o��� o��o�������o �o �����a���� ����
                    });


                $('#modal_close, #overlay').click( function(){ // �o��� ���� �o �������� ��� �o��o���
                    $('#modal_form')
                        .animate({opacity: 0, top: '45%'}, 200,  // ��a��o ������ ��o��a��o��� �a 0 � o��o�������o ����a�� o��o �����
                        function(){ // �o��� a���a���
                            $(this).css('display', 'none'); // ���a�� ��� display: none;
                            $('#overlay').fadeOut(400); // �����a�� �o��o���
                            instance.carcas.css('visibility', 'hidden');
                            instance.overlay.css('visibility', 'hidden');
                        }
                    );
                });
            });





            // ����� ���������� this ����� ��������� ���������
            // DOM-�������, � �������� � ����� ����� ���������
            // ����������� �������
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

