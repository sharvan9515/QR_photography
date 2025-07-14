import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { authorization } = req.headers;
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, req.body, {
      headers: { Authorization: authorization, 'Content-Type': req.headers['content-type'] },
    });
    res.status(resp.status).json(resp.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
