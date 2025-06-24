const checkStock = require('./checker');
const { sendWhatsApp } = require('./sendWhatsApp');

const products = [
  {
    name: "Chocolate Whey (60)",
    url: "https://shop.amul.com/en/product/amul-kool-protein-milkshake-or-kesar-180-ml-or-pack-of-30"
  },
  {
    name: "Whey Protein Gift Pack (10)",
    url: "https://shop.amul.com/en/product/amul-whey-protein-gift-pack-32-g-or-pack-of-10-sachets"
  },
  {
    name: "Whey Protein (30)",
    url: "https://shop.amul.com/en/product/amul-whey-protein-32-g-or-pack-of-30-sachets"
  },
  {
    name: "Whey Protein (60)",
    url: "https://shop.amul.com/en/product/amul-whey-protein-32-g-or-pack-of-60-sachets"
  },
  {
    name: "Chocolate Whey Gift Pack (10)",
    url: "https://shop.amul.com/en/product/amul-chocolate-whey-protein-gift-pack-34-g-or-pack-of-10-sachets"
  },
  {
    name: "Chocolate Whey (30)",
    url: "https://shop.amul.com/en/product/amul-chocolate-whey-protein-34-g-or-pack-of-30-sachets"
  }
];

const numbers = [
  "919711720145",  // Your verified WhatsApp numbers
  "918377884512",
  "918287154627"
];

async function monitor() {
  console.log(`\n===== Stock Check at ${new Date().toLocaleString()} =====\n`);

  for (const product of products) {
    console.log(`🔍 Checking: ${product.url}`);

    const status = await checkStock(product.url);

    if (status === 'In Stock') {
      const msg = `✅ ${product.name} is now in stock!\n${product.url}`;
      console.log(msg); // ✅ Also print in console
      await sendWhatsApp(numbers, msg);
    } else if (status === 'Sold Out') {
      console.log(`❌ ${product.name} is sold out.`);
    } else {
      console.log(`⚠️ Unknown status for ${product.name}: ${status}`);
    }
  }
}

// Run every 20 minutes
setInterval(monitor, 20 * 60 * 1000);
monitor();
