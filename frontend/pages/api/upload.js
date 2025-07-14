import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const headers = { ...req.headers };
    delete headers.host; // let axios set correct host
    delete headers['content-length'];
    delete headers['accept-encoding'];

    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      req,
      {
        headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );
    res.status(resp.status).json(resp.data);
  } catch (e) {
    res.status(e.response?.status || 500).json({ error: e.message });
  }
}
