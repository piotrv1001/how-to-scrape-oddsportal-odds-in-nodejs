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
