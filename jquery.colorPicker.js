/**
 * Created by vitali.nalivaika on 23.07.2015.
 */

(function($){
    //все переменные не затираются после отработки ф-ии
    function rgb2hex(color)
    {
        return '#' +  Number(color.red).toString(16).toUpperCase().replace(/^(.)$/,'0$1') +
            Number(color.green).toString(16).toUpperCase().replace(/^(.)$/,'0$1') +
            Number(color.blue).toString(16).toUpperCase().replace(/^(.)$/,'0$1');
    }

    var $template = (function () {
        var baseForm = $('<div>');
        baseForm.append("<div id='left_block'></div>");

        for(var r = 0; r < 64; r++){
            for(var g = 0; g < 16; g++) {
                for(var b = 0; b < 4; b++) {
                    var pp = $("<div  class='choose_color_block'></div>");
                    pp.css('background-color', rgb2hex({red: r*4, green: g*16, blue: b*64}));
                    baseForm.find('#left_block').append(pp);
                }
            }
        }
        baseForm.append("<div id='right_block'></div>");
        baseForm.find('#right_block').append("<div id='red_value_block' class='color_block'></div>");
        baseForm.find('#right_block').append("<div id='green_value_block' class='color_block'></div>");
        baseForm.find('#right_block').append("<div id='blue_value_block' class='color_block'></div>");
        baseForm.find('#right_block').append("<div id='hex_value_block' class='color_block'></div>");
        baseForm.find('#right_block').append("<div id='show_color_block' class='color_block'></div>");
        baseForm.find('#red_value_block').append("<label for='red_input' >R<input id='red_input' type='text' /></label>");
        baseForm.find('#green_value_block').append("<label for='green_input'>G<input id='green_input' type='text' /></label>");
        baseForm.find('#blue_value_block').append("<label for='blue_input'>B<input id='blue_input' type='text' /></label>");
        baseForm.find('#hex_value_block').append("<label for='hex_input'>#<input id='hex_input' readonly='readonly' type='text' /></label>");
        baseForm.find('#show_color_block').append("<label for='color_input'>C<input id='color_input' readonly='readonly' type='text' /></label>");
        baseForm.append("<div id='footer'></div>");
        baseForm.find('#footer').append("<input id='applyButton' type='button' value='Apply' class='applyButton' />");
        baseForm.find('#footer').append("<input id='modal_close' type='button' value='Cancel' class='modal_close' />");

        return baseForm;
    });

    jQuery.fn.colorPicker = function(options){

        var makePicker = function(){
            var instance;
            var myInput = $(this).find('input');
            var myDiv = $(this).find('div');
            var outputMode = undefined;
            var hrgbValues = {
                red: 0,
                green: 0,
                blue: 0,
                rgbToHex: '#000',
                hex: '#000'
            };

            if(options) {
                outputMode = $(this).find(options);
            }

            myInput.click( function(event){
                instance = Singleton.getInstance(outputMode);
                instance.carcas.css('visibility', 'visible');
                instance.overlay.css('visibility', 'visible');
                event.preventDefault();
                if(myDiv) {
                    instance.carcas
                        .css('display', 'block')
                        .animate({opacity: 1, top: '50%'}, 1);
                }
                instance.overlay.fadeIn(400,
                    function(){
                        instance.carcas
                            .css('display', 'block')
                            .animate({opacity: 1, top: '50%'}, 200);
                    });

                $('.applyButton').click( function() {
                    hidePickerForm(instance);
                    getHrgbValues(instance);
                    paintInput(hrgbValues);
                });

                $('.modal_close, .overlay').click( function(){
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
                    .animate({opacity: 0, top: '45%'}, 200,
                    function(){
                        $(this).css('display', 'none');
                        object.overlay.fadeOut(400);
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

            function createDialog(outerDiv) {
                var self = this;

                if(outerDiv === undefined) {
                    $('body').append('<div id="modal_form" class=""></div>');
                    $('body').append('<div id="overlay" class="overlay"></div>');
                    var baseForm = $('#modal_form').append($template);
                } else {
                    baseForm = outerDiv.append($template);
                }

                self.carcas =  baseForm;
                self.overlay = $("#overlay");

            }

            var Singleton = (function () {
                var instance;

                function createInstance(element) {
                    var buildObject = new createDialog(element);

                    return buildObject;
                }

                return {
                    getInstance: function (element) {
                        if (!instance) {
                            instance = createInstance(element);
                        }

                        return instance;
                    }
                };
            })();

        };

        return this.each(makePicker);

    };
})(jQuery);

