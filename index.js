import dotenv from 'dotenv';
import Twitter from 'twitter';

dotenv.config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

client.post(
  'statuses/update',
  { status: 'I AM LORD BOTTINGTON OF BOTSVILLE' },
  (error, tweet, response) => {
    if (error) throw error;
  }
);
