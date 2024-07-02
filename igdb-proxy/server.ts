import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
  origin: 'https://localhost:6041',
}));

// eslint-disable-next-line consistent-return
app.post('/api/games', async (req: Request, res: Response) => {
  const clientId = process.env.IGDB_CLIENT_ID;
  const accessToken = process.env.IGDB_ACCESS_TOKEN;
  if (!clientId || !accessToken) {
    return res.status(400).send('Missing Client ID or Access Token');
  }

  try {
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      body: 'fields name, summary, cover.url; limit 10;',
    });

    if (!response.ok) {
      return res.status(response.status).send('Error fetching data from IGDB');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Fetching games failed:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
});
