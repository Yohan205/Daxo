function alertT() {
    var msg = document.getElementById('msgText').value;
    var options = document.getElementById('canalID').value;
    console.log(options);
    if (options === "none") return alert("No colocaste un canal");
    alert("El mensaje a enviar es:\n" + msg);
}

const sendT = {
    msgToto: "yeii funciona"
}