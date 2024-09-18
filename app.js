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
import { exportToJson } from "./toJson.js";
async function main() {

  console.log( process.cwd());
  
  try {
    // Take screenshot 
    const screenshotPath = `./screenshot.jpg`;
    const websiteUrl = 'https://player.flipsnack.com/?hash=NUI2OEU3Q0M1QTgraDlmNm1tY3J6cA=='; // Replace with your target website
    await takeScreenshot(websiteUrl, screenshotPath);
    console.log('Screenshot taken successfully');

    // file upload
    const fileManager = new GoogleAIFileManager(process.env.API_KEY);

    const uploadResult = await fileManager.uploadFile(
      screenshotPath,
      {
        displayName: 'screenshot.jpg',
        mimeType: 'image/jpeg',
      },
    );

    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    
    // set the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // send the prompt and the image to the model
    const result = await model.generateContent([
      "export json format of this image from catalog page describing each product arabic and english name, prices and categories. dont include json code blocks",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
        },
      },
    ]);

    //  clean the result text from the annoying code blocks, might be other better way to do it but thsi will work for now
    let cleanedResponse = result.response.text();
    cleanedResponse = cleanedResponse.replace("```json\n", "");
    cleanedResponse = cleanedResponse.replace("```", "");
  
    exportToJson(cleanedResponse, './output.json');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the main function
main();



