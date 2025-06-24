const checkStock = require('./checker');
const { sendWhatsApp } = require('./sendWhatsApp');

const products = [
  {
    name: "Chocolate Whey (60)",
    url: "https://shop.amul.com/en/product/amul-kool-protein-milkshake-or-kesar-180-ml-or-pack-of-30"
  },
  // Add others here
];

const numbers = [
  "919711720145"
];

async function monitor() {
  for (const product of products) {
    const status = await checkStock(product.url);
    if (status === 'In Stock') {
      const msg = `✅ ${product.name} is now in stock!\n${product.url}`;
      await sendWhatsApp(numbers, msg);
    } else {
      console.log(`❌ ${product.name} is ${status}.`);
    }
  }
}

setInterval(monitor, 20 * 60 * 1000); // every 20 mins
monitor();
