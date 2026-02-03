export default function handler(req, res) {
  if (req.method === 'GET') {
    const verifyToken = process.env.VERIFY_TOKEN;

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK VERIFIED');
      return res.status(200).send(challenge);
    }

    return res.status(403).send('Forbidden');
  }

  if (req.method === 'POST') {
    console.log('Webhook received');
    console.log(JSON.stringify(req.body, null, 2));

    return res.status(200).json({ status: 'ok' });
  }

  return res.status(405).send('Method Not Allowed');
}
