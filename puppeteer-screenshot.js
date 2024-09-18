/**
 * @module puppeteer-screenshot
 * @description This module provides functionality for taking screenshots of web pages using Puppeteer.
 */

/**
 * Takes a screenshot of a specified URL and saves it to the given output path.
 * @async
 * @function takeScreenshot
 * @param {string} url - The URL of the web page to screenshot.
 * @param {string} outputPath - The file path where the screenshot will be saved.
 * @throws {Error} If there's an issue with launching the browser, navigating to the page, or taking the screenshot.
 */

/**
 * Pauses execution for a specified number of milliseconds.
 * @function sleep
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */

import puppeteer from 'puppeteer';

export async function takeScreenshot(url, outputPath) {
  try {
  // launch browser
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  

  const page = await browser.newPage();

  // set the viewport for better screenshot quality (Adjust based on your needs)
  await page.setViewport({ width: 1740, height: 1141 });

  // go to the url
  await page.goto(url,{ waitUntil: 'networkidle0' });
  
  // waiting for page to load, increase if sh!tty internet connection (Adjust based on your needs)
  await sleep(5000);


  // take the screenshot
  await page.screenshot({ path: outputPath, fullPage: true , quality: 100, type: 'jpeg'});

  // close browser
  await browser.close();
} catch (error) {
  console.error('Error taking screenshot:', error);
  throw error;
}
}

// sleep function 
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
