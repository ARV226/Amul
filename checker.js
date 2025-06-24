const { chromium } = require('playwright-chromium');

async function checkStock(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for something meaningful to load
    await page.waitForSelector('.product-grid-body, .mobile-btn, .stock-indicator-text', { timeout: 15000 });

    const content = await page.content();

    const isSoldOut = await page.$('.stock-indicator-text');
    const isAddButton = await page.$('.mobile-btn');

    if (isAddButton) {
      const text = await isAddButton.innerText();
      if (text.toLowerCase().includes('add')) {
        await browser.close();
        return 'In Stock';
      }
    }

    if (isSoldOut) {
      const text = await isSoldOut.innerText();
      if (text.toLowerCase().includes('sold out')) {
        await browser.close();
        return 'Sold Out';
      }
    }

    await browser.close();
    return 'Unknown';
  } catch (err) {
    await browser.close();
    console.error("Error checking stock:", err.message);
    return 'Error';
  }
}

module.exports = checkStock;
