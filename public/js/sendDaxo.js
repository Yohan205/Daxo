function alertT() {
    var msg = document.getElementById('msgText').value;
    var option = document.getElementById('canalID').value;
    if (option === "none") {
        return alert("No colocaste un canal");
    }
    alert(msg);
}

const sendT = {
    msgToto: "yeii funciona"
}