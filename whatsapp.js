const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer-core');
const Bard = require('bard-ai');

const client = new Client({
  puppeteer: {
    executablePath: puppeteer.executablePath(),
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

const messagePrefix = "#B:";

async function runBard(msg) {
  await Bard.init("WwgQ-vtIJ9mBP_llStJ2rjZwS_2pnHX-bkYS-qFhytt_nN5e31crTMrg7sI0H9SRZC75cQ.");
  let myConversation = new Bard.Chat();
  let response = await myConversation.ask(msg);
  return response;
}

function displayQRCode(qr) {
  // Display the QR code in the terminal
  console.log('Scan the QR code below:');
  qrcode.generate(qr, { small: true });
}

async function initializeClient() {
  client.on('qr', (qr) => {
    displayQRCode(qr);
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('message', async (msg) => {
    if (msg.body.includes(messagePrefix)) {
      const stripped = msg.body.replace(messagePrefix, '');
      const response = await runBard(stripped);
      msg.reply(response);
    }
  });

  await client.initialize();
}

initializeClient().catch((error) => {
  console.error(error);
});
