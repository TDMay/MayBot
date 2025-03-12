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
        console.log(command);
        if(command == "test"){
            message.reply("> Testado com sucesso");
        }
        else if (command == "r") {
        try{
            message.reply(eval(rep.slice(2)).toString());
        } 
        catch(e){
            message.reply("> Entre com um comando valido!")
        }
        }
        else{
            try{
                const roll = (min,max) =>{
                    return Math.round(Math.random() * (max - min) + min);
                }
                numeroDeDados = command.split("d")[0]||1;
                tipoDeDado = command.split("d")[1];
                
                resultados = [];
                for(i = 0; i < numeroDeDados; i++){
                resultados.push(roll(1,tipoDeDado))
                }
                somaResultado = resultados.reduce((accumulator, curr) => accumulator + curr)
                message.reply(resultados.toString())
            }
            catch(e){
                reply("Pare de tentar crashar meu bot!!! >:(")  
            }
        }
    }
});

// Inicializa o cliente
client.initialize();
