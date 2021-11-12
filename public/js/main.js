$(document).ready(main);

var contador = 1;

function main (){
    $('.menu_bar').click(function(){
        //$('nav').toggle();
       
        if(contador == 1){
            $('nav').animate({
                left:'0'
            });
            contador = 0;
        }else{
            contador = 1;
            $('nav').animate({
                left:'-100%'
            });
        }
        
    });
    $('#li-pub').click(function(){
        $('#li-ul-pub').toggle();
       
        if(contador == 1){
            $('nav').animate({
                left:'0'
            });
            contador = 0;
        }else{
            contador = 1;
            $('nav').animate({
                left:'-100%'
            });
        }
        
    });
}

var form = document.getElementById('recargas');

form.addEventListener('submit', function(e){
    e.preventDefault();
    // console.log('hiciste click');

    var datos = new FormData(form);
    var rec = document.getElementById("rec");
    console.log(datos.get('usuario'));

    fetch("https://mipago.co/set/api.php", { method: 'POST', body: datos})
    .then( res => res.json())
    .then( data => {
        console.log(data);
        // if (data.Estado == "true"){
            console.log(data.Estado);
            rec.innerHTML = `
                <h3>${data.Detalle}</h3>
                <ol>
                    <li><p id="saldo">Saldo: ${data.Saldo}</p></li>
                    <li><p id="ganancia">Ganancia: ${data.Ganancia}</p></li>
                </ol>`
        // }
    });
})