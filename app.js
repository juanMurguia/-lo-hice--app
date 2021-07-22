       
    /* si no hay tarea creada, pone el parrafo */ 
    const no_tareas = $('<p id="no_tareas"> No hay tareas agregadas. </p>');  


    if($('.nota').length == 0){
                $('.notas').append(no_tareas);
            }else{
                $('#no_tareas').remove();
            }
     

    /*hago click en eliminar*/
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

    /* hago click en eliminar todos */

    $('#home').on('click', '#borrar_todo', function(){
        var eliminar = confirm("¿Desea eliminar todas las notas?");

        if(eliminar){
            $('.nota').remove();
            guardarNotas();
        }

        if($('.nota').length == 0){
            $('.notas').append(no_tareas);
        }
    })

      


    
       
    /* se añade la tarea */

    $('#añadir form').on('submit', function(){
        
        const contenido = $('#entrada').val();
        const done = $('<button class="done"> <span class="icon-check-solid"></span> </button>');
        const eliminar = $('<button class="delete"> <span class="icon-times-solid"></span> </button>');
        const info = $('<p class="info">Última vez: </p>');
        const nueva_nota = $('<div></div>');
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

      /*hago click en done*/
      $(".notas").on("click", ".nota .done", function(){
            const date = new Date();
            const hora = date.getHours().toString().length < 2 ? "0" + date.getHours() : date.getHours();
            const minutos = date.getMinutes().toString().length < 2 ? "0" + date.getMinutes() : date.getMinutes();
            const dia = date.getDate();
            const mes = date.getMonth() + 1;
            console.log(dia)

             if( $(this).attr("data-click") != "on"  ) {
               $(this).next().html('Última vez: ' + " " + '<span id="hora">' + hora + ":" + minutos + " - " + dia + "/" + mes + '</span>');
               $(this).attr("data-click","on");  
               guardarNotas();
                
            }else{
                $(this).next().html('Última vez: ' + " " + '<span id="hora">' + hora + ":" + minutos + " - " + dia + "/" + mes + '</span>');
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


    $('#login form').on('submit',function(){
        var nombre = $('#form_login #entrada_login').val();

        
        const bienvenido = $('<p>Hola, ' + nombre + '. </p>')
        $('#container').prepend(bienvenido);

        localStorage.setItem('user',nombre);

    
        $.mobile.navigate("#home");
        return false;
        
        
    })


    $(document).on('ready', function () {


            if(localStorage.getItem('user')){
                $.mobile.navigate("#home");
                const nombre = localStorage.getItem('user');
                const bienvenido = $('<p>Hola, ' + nombre + '. </p>')
                $('#container').prepend(bienvenido);
                //console.log('hay user');
                
            }else{
                $.mobile.navigate("#login");
                //console.log('no hay user');
               
            }

        var recuperado_json = localStorage.getItem('notas');


        if(recuperado_json != null &&
           recuperado_json != undefined &&
           recuperado_json != "") {
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



