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
    rep = message.body;
    command = rep.slice(1).split(" ")[0];
    if(rep[0] == "!"){
        console.log("Comando Detectado!");
        console.log(command)
        if(command == "test"){
            message.reply("Testado com sucesso")
        }
    }
});

// Inicializa o cliente
client.initialize();
