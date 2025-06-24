const axios = require('axios');

async function fetchAmulStockData() {
  try {
    const res = await axios.get('https://shop.amul.com/ms/store/amul/cacheEntities/auto/EN/storedata.js');
    const json = JSON.parse(res.data.replace(/^var storedata = /, '').replace(/;$/, ''));
    return json.products;
  } catch (error) {
    console.error("❌ Failed to fetch Amul store data:", error.message);
    return null;
  }
}

function checkProductStock(products, keywords, label) {
  const match = products.find(p =>
    keywords.every(keyword => p.name.toLowerCase().includes(keyword.toLowerCase()))
  );

  if (!match) {
    console.log(`❓ ${label}: Product not found`);
    return;
  }

  const inStock = match.stock_status === 'in_stock' || match.quantity > 0;
  console.log(`${inStock ? '✅' : '❌'} ${label}: ${inStock ? 'In Stock' : 'Sold Out'}`);
}

async function runStockCheck() {
  console.log(`\n===== Stock Check at ${new Date().toLocaleString()} =====\n`);
  const products = await fetchAmulStockData();
  if (!products) return;

  checkProductStock(products, ['whey', 'gift'], 'Whey Protein Gift Pack (10)');
  checkProductStock(products, ['whey', '30'], 'Whey Protein (30)');
  checkProductStock(products, ['whey', '60'], 'Whey Protein (60)');
  checkProductStock(products, ['chocolate', 'whey', 'gift'], 'Chocolate Whey Gift Pack (10)');
  checkProductStock(products, ['chocolate', 'whey', '30'], 'Chocolate Whey (30)');
  checkProductStock(products, ['chocolate', 'whey', '60'], 'Chocolate Whey (60)');
  checkProductStock(products, ['kesar'], 'Kool Protein Milkshake - Kesar (30)');
}

runStockCheck();
