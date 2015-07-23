/**
 * Created by vitali.nalivaika on 23.07.2015.
 */

(function($){
    //��� ���������� �� ���������� ����� ��������� �-��


    jQuery.fn.colorPicker = function(inputParam, divParam, options){

        options = $.extend({
            defColor:"white",
            hoverColor:"red"
        }, options);

        //var $template = $('<div id="modal_form" class=""></div>' + '')

       var $modal =  $('#modal_form');

        var initilizePicker = function(){
           // $(this).find()


            $(inputParam).click( function(event){ // �o��� ���� �o ������ � id="go"
                $('body').append('<div id="modal_form" class=""></div>');
                $('#modal_form').append("<span id='modal_close'>DFGDFGDFGD</span>");
                $('body').append('<div id="overlay"></div>');
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
                            $("#modal_form").remove();
                            $("#overlay").remove();
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

        return this.each(make);

    };
})(jQuery);

