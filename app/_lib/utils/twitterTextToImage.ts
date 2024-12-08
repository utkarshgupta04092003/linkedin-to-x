import {
  CanvasRenderingContext2D,
  createCanvas,
  loadImage,
  registerFont,
} from "canvas";
import path from "path";
import { TWITTER_HANDLE, TWITTER_USERNAME } from "../config/twitter";
import { getCurrentFormatTimeStamp, getRandomHashtags } from "./globals";

const fontPath = path.join(process.cwd(), "public", "fonts", "Arial.ttf");
registerFont(fontPath, { family: "Arial" });

export const generateTwitterLikeImage = async (
  content: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(800, 500);
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject("Canvas context not found.");

    const backgroundImageSrc = path.join(
      process.cwd(),
      "public",
      "bg-image.jpg"
    );
    const logoImageSrc = path.join(process.cwd(), "public", "logo.png");
    // TODO: remove this after testing in prod
    console.log("logoImageSrc", logoImageSrc);
    const username = TWITTER_USERNAME;
    const handle = TWITTER_HANDLE;

    const fontSize = 22;
    const canvasWidth = 800;
    const canvasHeight = 500;
    const tweetBoxWidth = 700;
    const tweetBoxHeight = 400;
    const borderRadius = 20;

    const drawMultilineText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      lineHeight: number,
      maxWidth: number
    ) => {
      const lines = text.split("\n");
      lines.forEach((line, index) => {
        const lineY = y + index * lineHeight;
        ctx.fillText(line, x, lineY, maxWidth);
      });
    };

    // Load the background and logo images
    loadImage(backgroundImageSrc)
      .then((backgroundImage) => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

        // Draw white tweet box with rounded corners
        const x = (canvasWidth - tweetBoxWidth) / 2;
        const y = (canvasHeight - tweetBoxHeight) / 2;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(x + borderRadius, y);
        ctx.lineTo(x + tweetBoxWidth - borderRadius, y);
        ctx.quadraticCurveTo(
          x + tweetBoxWidth,
          y,
          x + tweetBoxWidth,
          y + borderRadius
        );
        ctx.lineTo(x + tweetBoxWidth, y + tweetBoxHeight - borderRadius);
        ctx.quadraticCurveTo(
          x + tweetBoxWidth,
          y + tweetBoxHeight,
          x + tweetBoxWidth - borderRadius,
          y + tweetBoxHeight
        );
        ctx.lineTo(x + borderRadius, y + tweetBoxHeight);
        ctx.quadraticCurveTo(
          x,
          y + tweetBoxHeight,
          x,
          y + tweetBoxHeight - borderRadius
        );
        ctx.lineTo(x, y + borderRadius);
        ctx.quadraticCurveTo(x, y, x + borderRadius, y);
        ctx.closePath();
        ctx.fill();

        // Load and draw the logo image
        loadImage(logoImageSrc)
          .then((logoImage) => {
            const logoSize = 80;
            const logoX = x + 40;
            const logoY = y + 10;
            ctx.drawImage(logoImage, logoX, logoY + 10, logoSize, logoSize);

            // Add username and handle
            const textX = logoX + logoSize + 10;
            ctx.fillStyle = "black";
            ctx.font = `bold ${fontSize}px Arial, Helvetica, sans-serif`;
            ctx.fillText(username, textX, logoY + logoSize / 2);

            ctx.fillStyle = "#657786";
            ctx.font = `normal ${fontSize}px Arial, Helvetica, sans-serif`;
            ctx.fillText(handle, textX, logoY + logoSize / 2 + 30);

            // Add tweet content
            ctx.fillStyle = "#14171A";
            ctx.font = `normal ${fontSize}px Arial, Helvetica, sans-serif`;
            const maxTextWidth = tweetBoxWidth - 40;
            const lineHeight = fontSize + 8;
            drawMultilineText(
              ctx,
              content,
              x + 50,
              y + 140,
              lineHeight,
              maxTextWidth
            );

            // Add hashtags
            ctx.fillStyle = "#0070f3";
            ctx.fillText(getRandomHashtags(3), x + 40, y + 330);

            // Add tweet timestamp
            ctx.fillStyle = "#657786";
            ctx.font = `normal ${fontSize - 4}px Arial, Helvetica, sans-serif`;
            ctx.fillText(
              getCurrentFormatTimeStamp(new Date()),
              x + 40,
              y + 370
            );

            // Convert canvas to base64 image URL
            const imageURL = canvas.toDataURL("image/jpeg");
            return imageURL;
          })
          .then((cloudinaryUrl) => {
            resolve(cloudinaryUrl);
          })
          .catch(reject);
      })
      .catch(reject);
  });
};
