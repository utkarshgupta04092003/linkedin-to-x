import { telegramJobTemplates } from "../config/telegram";
import { TELEGRAM_CHANNEL_URL, TWITTER_URL } from "../config/twitter";

export const getFormattedJobForTelegram = (
  companyName: string,
  jobRole: string,
  location: string,
  postedDate: string,
  jobURL: string
) => {
  const randomIndex = Math.floor(Math.random() * telegramJobTemplates.length);
  const randomJobPost =
    telegramJobTemplates[randomIndex]
      .replace("{companyName}", companyName)
      .replace("{jobRole}", jobRole)
      .replace("{location}", location)
      .replace("{postedDate}", postedDate)
      .replace("{jobURL}", jobURL) +
    `\n\n🔥 Follow on twitter: ${TWITTER_URL}\n🔗 Follow on Telegram: ${TELEGRAM_CHANNEL_URL}`;

  return randomJobPost;
};
