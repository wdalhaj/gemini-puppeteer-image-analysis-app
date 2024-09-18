# Gemini-Powered Image Analysis App

## Introduction

This Node.js application uses Google's Gemini AI to analyze product images from web pages. It combines web scraping and Gemini AI-powered image analysis to extract products information automatically.

## How It Works

1. The app captures a screenshot of a specified website using Puppeteer.
2. The screenshot is uploaded to Google's AI services using the Gemini API.
3. The Gemini model analyzes the image, identifying products and their prices.
4. The results are returned in a structured JSON format, ready for further processing or display.

## Stack

- Node.js
- Google Generative AI SDK.
- Puppeteer for web scraping.
- dotenv for environment management.

## Potential Applications

- AI-driven image analysis in e-commerce
- Price monitoring/comparison.
- Competitive analysis.
- you name it ...

## Installation Steps

1. **Clone the Repository**
   ```
   git clone https://github.com/wdalhaj/gemini-puppeteer-image-analysis-app.git
   cd gemini-image-analysis-app
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the project root and add your Google API key get the key from [Google AI Studio](https://aistudio.google.com/app/apikey): 
   ```
   API_KEY=your_google_api_key_here
   ```

4. **Install Chrome or Chromium**
   Ensure you have Chrome or Chromium browser installed on your system, as it's required for Puppeteer. [supported browsers list](https://pptr.dev/supported-browsers)

   5. **Verify Node.js Version**
   Make sure you have Node.js version 20 or later installed:
   ```
   node --version
   ```

6. **Configure the Application**
   - Open `src/puppeteer-screenshot.js` and adjust the options (browser, sleep time, screen size, etc.).
   - Modify the URL in `src/app.js` to capture screenshots from your desired website.

7. **Run the Application**
   ```
   npm start
   ```

Thnaks!