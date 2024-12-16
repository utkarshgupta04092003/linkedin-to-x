import { linkedinJobTemplates } from "../config/linkedin";
import { TELEGRAM_CHANNEL_URL, TWITTER_URL } from "../config/twitter";

export const getFormattedJobForLinkedIn = (
  companyName: string,
  jobRole: string,
  jobURL: string
) => {
  const randomIndex = Math.floor(Math.random() * linkedinJobTemplates.length);
  const randomJobPost = linkedinJobTemplates[randomIndex]
    .replaceAll("{companyName}", companyName)
    .replaceAll("{jobRole}", jobRole)
    .replaceAll("{jobURL}", jobURL)
    .replaceAll("{telegramLink}", TELEGRAM_CHANNEL_URL)
    .replaceAll("{twitterLink}", TWITTER_URL);

  return randomJobPost;
};
