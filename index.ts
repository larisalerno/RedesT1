import { createSocket } from "dgram";

const host           :  string  = '127.0.0.1';
const port           :  number  =  5801;
const server = createSocket('udp4');

let connection_message = { code: 'conn', ack: 0, message: '' };

let messages : any[] = [];

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

server.on('listening', () => {
    console.log(`                                                                    ,*,(/,,                         
                                                               , .,  ...,*,,                        
                                                       .  .. . .  , .  , .,/,                       
                                                 ,/.  .  ,.,. .. ,, , ,*,.*,                        
                                           .,*,,.,, ...,,., ,. .,/.,,*,,,,.                         
                                        ./. .  . . ,,. ..,,..,,..*,/,*.**                           
                                     ., ,. .,,..,. ..,,  ,.,*.,,(,*.,,*.                            
                                  ..,..,.,    *..*.,.,.,,,,,*,*,.,,**,                              
                              .....,.,.  ,,,  .,,..,,,/.,,,*,.,,,*,*                                
                           ..  ...... ** .,,,,., ,.,. ,,**.,,**,*,**                                
                         . .  ,.,..,  . ,/. ..,,,/.,**..,,,*/,*%#(/*,*,,.                           
                     .  ,..,..,..,.   , ,.,,.*.......,,,**,*%#((/**,,,,,......                      
                     .. ......,, .,(. ,,,/*.....,,,,,,/,,%#((//**,,,,..............                 
                *,,, .,..,,..,.,*,.*,*/ .. .,,,,,,,/,,,#((((//**,,,..*,,,,,... ,......,             
              .,.,..,..,,.,.,,,.,..*..,..,,,,,,/,,,*(((((/(//////**,*,,,,,.,...*,,........          
             .,#/,/(,,,,,,,.,,,,*.,.,,.,,,,*,,,,*//////////////***/*****,*,*.*,,,,*,,.,,,,,,.       
            , / / ./*/,**,,, ......,,,,*,,,,,(    #(//////////*/**//**/**,*/,*/,***,,.,,,.,*..,*    
            ,.*, .*/,/,,,......,.,,,,,,.*/             .(((///*****,,,*,,,,****,**,******...#///    
       .. ,*. .,/.,*////*,*,,,.. ,.,,**                       #((/*******,********/***/##./,,.(/    
     ,..,. .,.,**/.....,,,,,,,,,,,,                                   #///*****/**/*****/****/*     
     ..,,,,.,,,,,,,,,,,,**,,,*                                                    /#(//,            
      ,/*,,,,,****                                                                                  
      \n\n
      
      O Show do Milhão vai começar! Aguardando um jogar se conectar...
      `);
});

server.on('message', async (message, rinfo) => {

    console.log(message.toString());

    let received_message = JSON.parse(message.toString());

    if(received_message.code == 'conn') {
        console.log('Um jogador tentou se conectar, vamos aguardar.');
    }

    if (received_message.code == 'conn' && received_message.ack == 0) {
        received_message.ack = 1;
                await sleep(6000);
                server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                    if(error) throw error;
                });
    } else {
        console.log("message was different from connect: ", message);

        if (received_message.code == 'start' && received_message.ack == 0) {
            console.log("Vamos começar. Enviando a primeira pergunta e suas alternativas.\n\n")
            server.send(Buffer.from(JSON.stringify({ code: 'question', question : 'Qual a capital da França?', answers : [{ a: 'Paris', b: 'Roma', c: 'Berlim'}]})), port, host, (error) => {
                if(error) throw error;
            });
        }
    }

    


});


server.bind(5800);
