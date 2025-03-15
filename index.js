const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializa o cliente
const client = new Client({
    authStrategy: new LocalAuth()
});

// Gera o QR Code para autenticação
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code gerado, escaneie com o WhatsApp.');
});

// Confirmação de login
client.on('ready', () => {
    console.log('Cliente está pronto pra uso!');
});

// Responde a mensagens
client.on('message_create', message => {
    let rep = message.body.trim();

    if (!rep.startsWith("!") || rep.length < 2) return; // Ignorar mensagens inválidas

    let command = rep.slice(1).split(" ");

    console.log("Comando Detectado:", command);

    switch (command[0]) {
        case "test":
            message.reply("> Testado com sucesso");
            break;

        case "r":
            try {
                let resultado = Function('"use strict"; return (' + rep.slice(2) + ')')();
                message.reply("> " + resultado.toString());
            } catch (e) {
                message.reply("> Erro ao executar código!");
            }
            break;

         case "d":
            if (!command[1] || !/^(\d*)d(\d+)$/.test(command[1])) {
                message.reply("> Formato inválido! Use: !d XdY (ex: !d 3d6)");
                return;
            }

            try {
                let [numDados, tipoDado] = command[1].split("d").map(x => parseInt(x) || 1);
                if (numDados > 10 || tipoDado > 100) {
                    message.reply("> Número muito alto! (Máx: 10 dados, d100)");
                    return;
                }

                let resultados = Array.from({ length: numDados }, () => Math.floor(Math.random() * tipoDado) + 1);
                let somaResultado = resultados.reduce((acc, val) => acc + val, 0);

                message.reply(`> 🎲 Rolagem: [${resultados.join(", ")}] = *${somaResultado}*`);
            } catch (e) {
                message.reply("> Erro ao rolar dados!");
            }
             break;
        case "q":
            x = command[1];
            y = command[2];
            console.log(x,y)
            if(x > 0 && y > 0){
            message.reply("Primeiro Quadrante!")
            } 
            else if(x < 0 && y > 0){
            message.reply("Segundo Quadrante!")
            }
            else if(x < 0 && y < 0){
            message.reply("Terceiro Quadrante!")
            }
            else if(x > 0 && y < 0){
            message.reply("Quarto Quadrante!")
            }
            else if(x == 0 && y == 0){
            message.reply("Origem")
            }
            else if(x == 0){
            message.reply("Eixo Y")
            }
            else if(y == 0){
            message.reply("Eixo X")
            }
            break;
        default:
            message.reply("> Comando desconhecido!");
    }
});

// Inicializa o cliente
client.initialize();
