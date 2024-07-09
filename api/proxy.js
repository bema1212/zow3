const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Visit the specified URL
    await page.goto('https://www.wozwaardeloket.nl');

    // Wait for the button to be available and then click it
    await page.waitForSelector('#kaart-bekijken-btn'); // Selector for the button with ID 'kaart-bekijken-btn'
    await page.click('#kaart-bekijken-btn');

    // Wait for the page to load completely after clicking
    await page.waitForNavigation();

    // Get the HTML content of the page
    const html = await page.content();

    // Close the browser
    await browser.close();

    // Return the HTML content
    res.status(200).send(html);
  } catch (error) {
    console.error('Error during Puppeteer operation:', error);
    res.status(500).send('Something went wrong');
  }
};
