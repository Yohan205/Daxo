const { spawn } = require("child_process");
const socketIo = require("socket.io");

const serverToSocket = (server) => {
    //@ts-ignore
    const io = socketIo(server);
    // io.on("connection", handleSocketConnection);
    let processInstance = null;

    io.on("connection", (socket) => {
        // console.log("Usuario conectado");

        socket.on("startCommand", (command) => {
            if (processInstance) {
                socket.emit("output", "⚠️ Un proceso ya está en ejecución.");
                return;
            }

            processInstance = spawn(command, { shell: true });
            console.log(processInstance);

            processInstance.stdout.on("data", (data) => {
                socket.emit("output", data.toString());
            });

            processInstance.stderr.on("data", (data) => {
                socket.emit("output", "Error: " + data.toString());
            });

            processInstance.on("close", (code) => {
                socket.emit("output", `Proceso terminado con código ${code}`);
                processInstance = null;
            });
        });

        socket.on("sendCommand", (cmd) => {
            if (processInstance) {
                processInstance.stdin.write(cmd + "\n"); // Enviar el comando al proceso
                socket.emit("output", `➡️ Enviado: ${cmd}`);
            } else {
                socket.emit("output", "⚠️ No hay proceso en ejecución.");
            }
        });

        socket.on("disconnect", () => {
            console.log("Usuario desconectado");
        });
    });
}

const handleSocketConnection = (socket) => {
    console.log("Usuario conectado");

    socket.on("startCommand", (command) => {
        const processInstance = spawn(command, { shell: true });

        processInstance.stdout.on("data", (data) => {
            socket.emit("output", data.toString());
        });

        processInstance.stderr.on("data", (data) => {
            socket.emit("output", "Error: " + data.toString());
        });

        processInstance.on("close", (code) => {
            socket.emit("output", `Proceso terminado con código ${code}`);
        });
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
};

module.exports = serverToSocket;