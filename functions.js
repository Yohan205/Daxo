//Definir antes del evento message el cooldown puede ser asi:
//let setCooldown = new Set();
function cooldownIf(time) {
    var und = "",
        timeMsg = "";
    if (time >= 60) {
        und = " minutos!";
        timeMsg = time / 60;
    } else {
        und = " segundos!";
        timeMsg = time;
    }

    if (cooldownSet.has(message.author.id)) {
        message.channel.send(message.author.username + " puedes usar el comando despues de " + timeMsg + und);
        return;
    }
}

function cooldownAdd(time) {
    const timeNum = time * 1000;
    cooldownSet.add(message.author.id);
    setTimeout(function() {
        cooldownSet.delete(message.author.id)
    }, timeNum);
}