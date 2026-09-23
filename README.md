# How to Scrape OddsPortal Odds in Node.js

This example calls the [OddsPortal Scraper](https://apify.com/piotrv1001/oddsportal-scraper) on Apify. It does not implement a scraper from scratch.

## What this example does

- Calls the Actor with `apify-client`
- Requests six finished Premier League matches from the 2024/25 season
- Waits for the Actor run to finish
- Fetches the run's default dataset and prints each result

## Prerequisites

- Node.js 18 or newer
- An [Apify account](https://console.apify.com/sign-up)
- An [Apify API token](https://console.apify.com/settings/integrations)

## Installation

```bash
npm install
```

## Environment setup

Copy the example file and put your token in `.env`:

```bash
cp .env.example .env
```

```env
APIFY_TOKEN=your_apify_token_here
```

## Usage

```bash
npm start
```

`maxItems` is a global match limit. The example keeps `scrapeMatchMarkets` off, so it collects match-winner odds without the additional full-market event.

## Code example

```js
import { ApifyClient } from 'apify-client';
import 'dotenv/config';

// Initialize the ApifyClient with your Apify API token
// Set APIFY_TOKEN in your .env file (copy .env.example to get started)
const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

// Prepare Actor input
const input = {
    startUrls: [
        { url: 'https://www.oddsportal.com/football/england/premier-league-2024-2025/results/' },
    ],
    maxItems: 6,
    scrapeMatchMarkets: false,
    proxyConfiguration: {
        useApifyProxy: true,
        apifyProxyGroups: ['RESIDENTIAL'],
        apifyProxyCountry: 'MT',
    },
};

// Run the Actor and wait for it to finish
const run = await client.actor("piotrv1001/oddsportal-scraper").call(input);

// Fetch and print Actor results from the run's dataset (if any)
console.log('Results from dataset');
console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
    console.dir(item, { depth: null });
});

// 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/js/docs
```

## Example output

See [`sample-output.json`](./sample-output.json) for two abbreviated match records. Useful fields include `matchId`, `league`, `result`, `odds`, `bookmakerCount`, and `bookmakerOdds`. Each match can contain more bookmakers than the excerpt shows.

## Use cases

- Export a league season with results and bookmaker prices
- Compare match-winner odds within one region
- Build a historical research dataset
- Add full market books for a specific market study

## Try the Actor on Apify

**[Open the OddsPortal Scraper on Apify](https://apify.com/piotrv1001/oddsportal-scraper)**

## Related resources

- [How to scrape historical football odds from OddsPortal](https://falconscrape.com/blog/how-to-scrape-oddsportal-historical-football-odds)
- [Apify JavaScript client documentation](https://docs.apify.com/api/client/js/docs)

## License

MIT
