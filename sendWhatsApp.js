const axios = require('axios');

// You can replace this with your actual API call (e.g., Twilio or WhatsApp Business API)
async function sendWhatsApp(numbers, message) {
  for (const number of numbers) {
    console.log(`📤 Sending WhatsApp to ${number}: ${message}`);

    try {
      // Example using a dummy webhook or your server endpoint
      await axios.post('https://your-webhook-or-service/send', {
        to: number,
        msg: message
      });
    } catch (err) {
      console.error(`❌ Failed to send to ${number}: ${err.message}`);
    }
  }
}

module.exports = { sendWhatsApp };
