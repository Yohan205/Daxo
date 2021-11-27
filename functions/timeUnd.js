const obj = { und: "", msg: 0, time: 0 };

module.exports = {
    timeOUT: (sec) => {
        if (!sec) return console.error('No se ha ingresado un tiempo para el cooldown')
        
        obj.time = sec * 1000;
        if (sec >= 60) {
            obj.und = " minutos!";
            obj.msg  = sec / 60;
        } else {
            obj.und = " segundos!";
            obj.msg= sec;
        }
        return obj;
    }
}