/**
 * Created by vitali.nalivaika on 23.07.2015.
 */

(function($){
    //��� ���������� �� ���������� ����� ��������� �-��
    var $template = {};

    jQuery.fn.colorPicker = function(options){

        var instance;
        var myInput = $(this).find('input');
        var myDiv = $(this).find('div');
        var hrgbValues = {
            red: 0,
            green: 0,
            blue: 0,
            rgbToHex: '#000',
            hex: '#000'
        };

        options = $.extend({
            defColor:"white",
            hoverColor:"red"
        }, options);

        function rgb2hex(color)
        {
            return '#' +  Number(color.red).toString(16).toUpperCase().replace(/^(.)$/,'0$1') +
                Number(color.green).toString(16).toUpperCase().replace(/^(.)$/,'0$1') +
                Number(color.blue).toString(16).toUpperCase().replace(/^(.)$/,'0$1');
        }


        function buildModalForm(outerDiv) {
            var self = this;

            /*if(outerDiv !== undefined) {
                baseForm = outerDiv;
            }*/
            $('body').append('<div id="modal_form" class=""></div>');
            var baseForm = $('#modal_form');
            baseForm.append("<div id='left_block'></div>");

            for(var i = 0; i < 16; i++ ) {
                for(var j = 0;j < 16; j++) {
                    var pp = $("<div  class='choose_color_block'   ></div>");
                    pp.css('background-color', rgb2hex({red: (255), green: (i + 16 * j), blue: (i + 16 * j)}));
                    $('#left_block').append(pp);
                }
            }
            $('#modal_form').append("<div id='right_block'></div>");
            $('#right_block').append("<div id='red_value_block' class='color_block'></div>");
            $('#right_block').append("<div id='green_value_block' class='color_block'></div>");
            $('#right_block').append("<div id='blue_value_block' class='color_block'></div>");
            $('#right_block').append("<div id='hex_value_block' class='color_block'></div>");
            $('#right_block').append("<div id='show_color_block' class='color_block'></div>");
            $('#red_value_block').append("<label for='red_input' >R<input id='red_input' type='text' /></label>");
            $('#green_value_block').append("<label for='green_input'>G<input id='green_input' type='text' /></label>");
            $('#blue_value_block').append("<label for='blue_input'>B<input id='blue_input' type='text' /></label>");
            $('#hex_value_block').append("<label for='hex_input'>#<input id='hex_input' type='text' /></label>");
            $('#show_color_block').append("<label for='color_input'>C<input id='color_input' type='text' /></label>");
            baseForm.append("<div id='footer'></div>");
            $('#footer').append("<input id='applyButton' type='button' value='Apply' class='applyButton' />");
            $('#footer').append("<input id='modal_close' type='button' value='Cancel' class='modal_close' />");


            $('body').append('<div id="overlay" class="overlay"></div>');

            self.carcas =  baseForm;
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


        //var $template = $('<div id="modal_form" class=""></div>' + '' )
       //var $modal =  $('#modal_form');

        var initializePicker = function(){
           // $(this).find()


            $(myInput).click( function(event){ // �o��� ���� �o ������ � id="go"
                instance = Singleton.getInstance();
                instance.carcas.css('visibility', 'visible');
                instance.overlay.css('visibility', 'visible');
                event.preventDefault(); // ������a�� ��a��a����� �o�� �������a
                instance.overlay.fadeIn(400, // ��a�a�a ��a��o �o�a���a�� ������ �o��o���
                    function(){ // �o��� ���o������ ����������� a���a���
                        instance.carcas
                            .css('display', 'block') // ����a�� � �o�a���o�o o��a display: none;
                            .animate({opacity: 1, top: '50%'}, 200); // ��a��o ����a����� ��o��a��o��� o��o�������o �o �����a���� ����
                    });


                $('.applyButton').click( function() {

                    hidePickerForm(instance);
                    getHrgbValues(instance);
                    paintInput(hrgbValues);
                });


                $('.modal_close, .overlay').click( function(){ // �o��� ���� �o �������� ��� �o��o���
                    hidePickerForm(instance);
                });

                $('.choose_color_block').click( function() {

                    var newColor = $(this).css('background-color');
                    newColor = newColor.split(')')[0];
                    newColor = newColor.split('(')[1];
                    newColor = newColor.split(',');
                    hrgbValues.red = newColor[0];
                    hrgbValues.green = newColor[1];
                    hrgbValues.blue = newColor[2];
                    hrgbValues.rgbToHex = rgb2hex(hrgbValues);
                    setHrgbValues(hrgbValues,instance);
                });

            });


            function hidePickerForm(object) {
                object.carcas
                    .animate({opacity: 0, top: '45%'}, 200,  // ��a��o ������ ��o��a��o��� �a 0 � o��o�������o ����a�� o��o �����
                    function(){ // �o��� a���a���
                        $(this).css('display', 'none'); // ���a�� ��� display: none;
                        object.overlay.fadeOut(400); // �����a�� �o��o���
                        object.carcas.css('visibility', 'hidden');
                        object.overlay.css('visibility', 'hidden');
                    }
                );

            }


            function getHrgbValues(object) {

                hrgbValues.red = object.carcas.find('#red_input').val();
                hrgbValues.green = object.carcas.find('#green_input').val();
                hrgbValues.blue =object.carcas.find('#blue_input').val();
                hrgbValues.hex = object.carcas.find('#hex_input').val();
                hrgbValues.rgbToHex = rgb2hex(hrgbValues);
            }

            function setHrgbValues(colorObject , instanceObject) {

                instanceObject.carcas.find('#red_input').val(colorObject.red);
                instanceObject.carcas.find('#green_input').val(colorObject.green);
                instanceObject.carcas.find('#blue_input').val(colorObject.blue);
                instanceObject.carcas.find('#hex_input').val((colorObject.rgbToHex).split('#')[1]);
                instanceObject.carcas.find('#color_input').css('background-color' , colorObject.rgbToHex);


            }



            function paintInput(colorObject) {
                myInput.css('background-color' , colorObject.rgbToHex);
                myInput.val(colorObject.rgbToHex);
                if(colorObject.red > 150 && colorObject.green > 150 && colorObject.blue > 150) {
                    myInput.css('color' , '#000');
                } else {
                    myInput.css('color' , '#FFF');
                }
            }


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

