import dotenv from 'dotenv';
import Twitter from 'twitter';
import CoinMarketCap from 'coinmarketcap-api';

dotenv.config();

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const cryptoClient = new CoinMarketCap(process.env.COINMARKETCAP_KEY);

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const percentageFormatter = (num) => {
  const s = `${parseFloat(num).toFixed(2)}%`;
  if (num === 0) {
    return `${s} ⭕`;
  }
  if (num.toString().charAt(0) === '-') {
    return `${s} 🔴`;
  } else {
    return `${s} 🟢`;
  }
};

cryptoClient
  .getQuotes({ id: '9212' })
  .then((quotes) => {
    const stats = quotes.data['9212'].quote.USD;
    const status = `💦 CUMROCKET CRYPTO STATS 🚀🌑

CURRENT PRICE (USD): ${currencyFormatter.format(stats.price)} 😫👌
PERCENT CHANGE (1H): ${percentageFormatter(stats.percent_change_1h)}
PERCENT CHANGE (24H): ${percentageFormatter(stats.percent_change_24h)}
PERCENT CHANGE (7D): ${percentageFormatter(stats.percent_change_7d)}

@CumRocketCrypto #CumRocket #100DaysOfCode
  `.trim();
    twitterClient.post(
      'statuses/update',
      { status },
      (error, tweet, response) => {
        if (error) throw error;
      }
    );
  })
  .catch(console.error);
