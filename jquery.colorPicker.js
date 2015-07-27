/**
 * Created by vitali.nalivaika on 23.07.2015.
 */

(function($){
    var colorRegex = /.*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;

    //все переменные не затираются после отработки ф-ии
    function rgb2hex(color)
    {
        return '#' +  Number(color.red).toString(16).toUpperCase().replace(/^(.)$/,'0$1') +
            Number(color.green).toString(16).toUpperCase().replace(/^(.)$/,'0$1') +
            Number(color.blue).toString(16).toUpperCase().replace(/^(.)$/,'0$1');
    }

    var $template = (function () {
        var $right = $("<div id='right_block' class='right_block'></div>");
        var $left = $("<div id='left_block' class='left_block'></div>");
        var $footer = $("<div id='footerPicker' class='footerPicker'></div>");

        var baseForm = $('<div>')
            .append($left)
            .append($right)
            .append($footer);

        for(var r = 0; r < 64; r++){
            for(var g = 0; g < 16; g++) {
                for(var b = 0; b < 4; b++) {
                    $("<div  class='choose_color_block'></div>")
                        .css('background-color', rgb2hex({red: r*4, green: g*16, blue: b*64}))
                        .appendTo($left);
                }
            }
        }

        var inputs = [
            { name: 'red', title: 'R' },
            { name: 'green', title: 'G' },
            { name: 'blue', title: 'B' },
            { name: 'hex', title: '#', readonly: true },
            { name: 'color', title: 'C', readonly: true }
        ];

        $.each(inputs, function (i, info) {
           $('<div/>')
               .attr('class',  'color_block ' + info.name + '_value_block')
               .append($('<label>')
                   .attr('for', info.name + '_input')
                   .text(info.title)
                   .append($('<input/>')
                       .attr('class', info.name + '_input')
                       .attr('type', 'text')
                       .attr('readonly' , info.readonly)
                       .attr('id', info.name + '_input')
                    )
                )
           .appendTo($right);
        });

        $("<input id='applyButton' type='button' value='Apply' class='applyButton' />")
            .appendTo($footer);
        $("<input id='modal_close' type='button' value='Cancel' class='modal_close' />")
            .appendTo($footer);

        return baseForm;
    });

    jQuery.fn.colorPicker = function(options){

        var makePicker = function(){
            var instance;
            var myInput = $(this).find('input');
            var myDiv = $(this).find('div');
            var outputMode = undefined;

            var currentHrgbValues = {
                red: 0,
                green: 0,
                blue: 0,
                rgbToHex: '#000',
                hex: '#000'
            };

            var oldHrgbValues = $.extend(true,currentHrgbValues);

            if(options) {
                outputMode = $(this).find(options);
            }

            myInput.click( function(event){
                instance = Singleton.getInstance(outputMode);
                instance.carcas.css('visibility', 'visible');
                instance.overlay.css('visibility', 'visible');
                setHrgbValues(oldHrgbValues,instance);
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

                instance.carcas.find('.applyButton').click( function() {
                    hidePickerForm(instance);
                    getHrgbValues(instance, currentHrgbValues);
                    oldHrgbValues = $.extend(true,currentHrgbValues);
                    paintInput(currentHrgbValues);
                    instance.carcas.find('input').off();
                });

                instance.carcas.find('.modal_close, .overlay').click( function(){
                    setHrgbValues(oldHrgbValues,instance);
                    hidePickerForm(instance);
                    instance.carcas.find('input').off();
                });



                instance.carcas.find('.red_input, .green_input, .blue_input ').bind("keyup", function (eventObject){
                    getHrgbValues(instance, currentHrgbValues);
                    setHrgbValues(currentHrgbValues,instance, 1);
                });



                instance.carcas.find('.choose_color_block').click( function() {
                    var newColor = $(this).css('background-color');
                    parseHrgbString(newColor , currentHrgbValues);
                    setHrgbValues(currentHrgbValues,instance);
                });


            });
            /*
            function copyObject(copyFromObject , copyToObject) {
                for (var key in copyFromObject) {
                    copyToObject[key] = copyFromObject[key];
                }
            }*/

            function parseHrgbString(color, hrgbObject) {

                var values = colorRegex.exec(color).splice(1);
                hrgbObject.red = values[0];
                hrgbObject.green = values[1];
                hrgbObject.blue = values[2];
                hrgbObject.rgbToHex = rgb2hex(currentHrgbValues);

            }

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

            function getHrgbValues(object, hrgbObject) {
                hrgbObject.red = object.carcas.find('.red_value_block input').val();
                hrgbObject.green = object.carcas.find('.green_value_block input').val();
                hrgbObject.blue =object.carcas.find('.blue_value_block input').val();
                hrgbObject.hex = object.carcas.find('.hex_value_block input').val();
                hrgbObject.rgbToHex = rgb2hex(hrgbObject);
            }

            function setHrgbValues(colorObject , instanceObject, mode) {
                if(!mode) {
                    instanceObject.carcas.find('#red_input').val(colorObject.red);
                    instanceObject.carcas.find('#green_input').val(colorObject.green);
                    instanceObject.carcas.find('#blue_input').val(colorObject.blue);
                }
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

