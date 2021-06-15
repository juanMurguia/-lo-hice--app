const no_tareas = $('<p id="no_tareas"> No hay tareas agregadas. </p>');  
    console.log($('.nota').length)

    if($('.nota').length == 0){
                $('.notas').append(no_tareas);
            }else{
                $('#no_tareas').remove();
            }
     
    $('.notas').on("click", '.nota .delete', function () {
            var eliminar = confirm("¿Desea eliminar esta nota?");

            if (eliminar) {
                $(this).parent().remove();
                guardarNotas();
            }

            if($('.nota').length == 0){
                $('.notas').append(no_tareas);
            }
        })



    $('form').on('submit', function(){
        
        const contenido = $('#entrada').val();
        const done = $('<button class="done"> <span class="icon-check-circle"></span> </button>');
        const eliminar = $('<button class="delete"> <span class="icon-trash"></span> </button>');
        const info = $('<p class="info">Última vez: </p>');
        var id_random = Math.floor(Math.random() * 5) + Date.now();
        const nueva_nota = $('<div></div>');
        nueva_nota.attr('data-id',id_random)
        const nombre_nota = $('<h3></h3>').prepend(contenido);
        
        
        

        nueva_nota.attr('class','nota')
        .append(nombre_nota)
        .append(eliminar)
        .append(done)
        .append(info);


        $('.notas').prepend(nueva_nota);
        $('#entrada').val('');


        guardarNotas();    
        $.mobile.navigate('#home');
        $('#no_tareas').remove();
        return false;
    })


      $(".notas").on("click", ".nota .done", function(){
            const date = new Date();
            const hora = date.getHours() + ':' + date.getMinutes();
            const dia = date.getDate() + '/' + (date.getMonth() + 1);

             if( $(this).attr("data-click") != "on"  ) {
               $(this).next().html('Última vez: ' + " " + '<span id="hora">' + hora + " - " + dia + '</span>');
               $(this).attr("data-click","on");  
               guardarNotas();
                
            }else{
                $(this).next().html(' Última vez: ' + " " + '<span id="hora">' + hora + " - " + dia + '</span> ');
                $('#no_tareas').remove();
                $(this).removeAttr('data-click');
                guardarNotas();
            }

            if($('.nota').length == 0){
                $('.notas').append(no_tareas);
            }


        })



    function guardarNotas(){
            var actuales = new Array();

            $('.notas div').each(function(){
                actuales.push( $(this).html() );
            });

            var actuales_json = JSON.stringify(actuales);

            localStorage.setItem('notas',actuales_json);
        }


    $(document).on('ready', function () {
            var recuperado_json = localStorage.getItem('notas');

            if (recuperado_json != null &&
                recuperado_json != undefined &&
                recuperado_json != '') {
                var recuperado_array = JSON.parse(recuperado_json);
                $.each(recuperado_array, function (indice, valor) {
                    var nota = $('<div></div>');
                    nota.attr('class', 'nota').append(valor);

                    $('.notas').append(nota);
                })
            }

            if($('.nota').length == 0){
                $('.notas').append(no_tareas);
            }else{
                $('#no_tareas').remove();
            }



    })



    window.addEventListener('scroll', function(){
            var boton = $('.boton');
            var posicion = $(window).scrollTop();

            if(posicion > 0){
                boton.addClass('scroll');
                $('.añadir').text('+')
            }else{
                boton.removeClass('scroll');
                $('.añadir').text('Añadir tarea')
            }
    })

