const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  });
const messagePrefix = "#B:";
async function runBard(msg) {
    const { init, askAI } = await import("bard-ai");
  
    await init("WwgQ-vtIJ9mBP_llStJ2rjZwS_2pnHX-bkYS-qFhytt_nN5e31crTMrg7sI0H9SRZC75cQ.");
    let myConversation = new Bard.Chat();
    let response = await myConversation.ask(msg);
  }
  
  runBard().catch((error) => {
    console.error(error);
  });


client.on('qr', (qr) => {
    // Display the QR code in the terminal
    console.log('Scan the QR code below:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
   // IF MSG.BODY  contain the messagePrixfix the runBard and send a wait message
    // ELSE send the message to the bard and wait for the response
    // THEN send the response to the user
    if (msg.body.includes(messagePrefix)) {
        //strp the prefix
        var stripped = msg.body.replace(messagePrefix, "");
        runBard(stripped).then((response) => {
            msg.reply(response);

        }).catch((error) => {
            console.error(error);
        });
        msg.reply('Please wait while I think of a response');
    }
});

client.initialize();
