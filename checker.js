const axios = require("axios");
const cheerio = require("cheerio");

async function checkStock(url) {
  try {
    // Use ScraperAPI (replace YOUR_API_KEY)
    const fullUrl = `http://api.scraperapi.com?api_key=YOUR_API_KEY&url=${encodeURIComponent(url)}`;
    const response = await axios.get(fullUrl, { timeout: 30000 });

    const $ = cheerio.load(response.data);

    // Check for "Sold Out" label in HTML
    const soldOut = $('span.stock-indicator-text').text().trim().toLowerCase();
    
    if (soldOut.includes('sold out')) {
      return 'Sold Out';
    }

    // Check if an "Add to Cart" or "Notify Me" button exists
    const notifyMe = $('span:contains("Notify Me")').length > 0;
    const addToCart = $('span:contains("ADD")').length > 0;

    if (addToCart && !notifyMe) return 'In Stock';
    if (notifyMe && !addToCart) return 'Sold Out';

    return 'Unknown';
  } catch (err) {
    console.error(`❌ Error checking ${url}: ${err.message}`);
    return 'Error';
  }
}

module.exports = checkStock;
