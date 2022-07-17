$(document).ready(main);
var hoy = new Date();
var codFecha = 'D'+ hoy.getDate() +'M'+ ( hoy.getMonth() + 1 ) +'A'+ hoy.getFullYear() +'H'+ hoy.getHours() +'M'+ hoy.getMinutes()+'S'+ hoy.getSeconds();
console.log(codFecha);

/*=============================================
=            Menu Toggle            =
=============================================*/

var botonToggle = 1;

function main (){
    $('.menu_bar').click(function(){
        //$('nav').toggle();
       
        if(botonToggle == 1){
            $('nav').animate({
                left:'0'
            });
            botonToggle = 0;
        }else{
            botonToggle = 1;
            $('nav').animate({
                left:'-100%'
            });
        }
        
    });
    $('#li-pub').click(function(){
        $('#li-ul-pub').toggle();
       
        if(botonToggle == 1){
            $('nav').animate({
                left:'0'
            });
            botonToggle = 0;
        }else{
            botonToggle = 1;
            $('nav').animate({
                left:'-100%'
            });
        }
        
    });
}

/*=====  End of Menu Toggle  ======*/

var recargar = document.getElementById('recargar');
var saldo = document.getElementById('saldo');
var res = document.getElementById("respuesta");
var resSaldo = document.getElementById("verSaldo");


/*=============================================
=            Recargar            =
=============================================*/

recargar.addEventListener('submit', function(e){
    e.preventDefault();

    var datos = new FormData(recargar);
    datos.append("usuario", "yoalco11");
    datos.append("tk", codFecha);
    console.log(datos);

    fetch("https://mipago.co/set/api.php", { method: 'POST', body: datos})
    .then( ans => ans.json())
    .then( data => {
        console.log(data);
        if (data.Estado == "false"){
            console.log(data.Estado);
            res.innerHTML = `
                <h3>${data.Detalle}</h3>`
        }
        res.innerHTML = `
        <h3>${data.Detalle}</h3>
        <p>Ref. ${data.Ref}</p>`
    });
})

/*=====  End of Recargar  ======*/
/*=============================================
=            Consultar Saldo            =
=============================================*/

window.onload = function(){
    var datos = new FormData();
	datos.append("usuario", "yoalco11");
	datos.append("clave", "Alejo2021");
	datos.append("consulta", "saldo");

    fetch("https://mipago.co/set/api.php", { method: 'POST', body: datos})
    .then( ans => ans.json())
    .then( data => {
        console.log(data);
        if (data.Estado == "false"){
            console.log(data.Estado);
            res.innerHTML = `
                <h3>${data.Detalle}</h3>`
        }
        resSaldo.innerHTML = `
        <p id="resultSaldo">Saldo: ${data.Saldo} Ganancia: ${data.Ganancia}</p>`
    });
}

/*=====  End of Consultar Saldo  ======*/