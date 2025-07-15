import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const headers = { ...req.headers };
  delete headers.host;
  delete headers['content-length'];
  delete headers['accept-encoding'];

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login/customer`,
      req.body,
      { headers }
    );
    res.status(resp.status).json(resp.data);
  } catch (e) {
    res
      .status(e.response?.status || 500)
      .json(e.response?.data || { error: e.message });
  }
}
