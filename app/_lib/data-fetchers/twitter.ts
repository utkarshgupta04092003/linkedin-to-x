import axios from "axios";
import { TwitterApi } from "twitter-api-v2";

export async function postToTwitter(tweetText: string, imageUrl: string) {
  const client = new TwitterApi({
    // @ts-ignore
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  try {
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(imageResponse.data, "binary");
    const media = await client.v1.uploadMedia(imageBuffer, {
      mimeType: "image/jpeg",
    });
    const response = await client.v2.tweet({
      text: tweetText,
      media: { media_ids: [media] },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
