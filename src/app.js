/**
 * @fileoverview This module provides functionality for capturing screenshots of web pages,
 * uploading them to Google AI services, and generating content analysis using the Gemini model.
 * @module app
 */

/**
 * Main function to execute the screenshot capture, upload, and AI analysis process.
 * @async
 * @function main
 * @throws {Error} If an error occurs during execution.
 */

import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import  {takeScreenshot}  from "./puppeteer-screenshot.js";

async function main() {
  try {
    // Take screenshot 
    const screenshotPath = './screenshot.jpg';
    const websiteUrl = 'https://player.flipsnack.com/?hash=NUI2OEU3Q0M1QTgraDlmNm1tY3J6cA=='; // Replace with your target website
    await takeScreenshot(websiteUrl, screenshotPath);
    console.log('Screenshot taken successfully');

    // file upload
    const fileManager = new GoogleAIFileManager(process.env.API_KEY);

    const uploadResult = await fileManager.uploadFile(
      screenshotPath,
      {
        mimeType: 'image/jpeg',
      },
    );

    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "export json format of this image from catalog page describing each product arabic and english name, prices and categories.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
        },
      },
    ]);

    console.log(result.response.text());
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the main function
main();



