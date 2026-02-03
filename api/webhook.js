import express from 'express';

const app = express();

// Necesario para Vercel
app.use(express.json());

// VERIFY_TOKEN desde variables de entorno
const verifyToken = process.env.VERIFY_TOKEN;

// Verificación de webhook (GET)
app.get('/', (req, res) => {
  const {
    'hub.mode': mode,
    'hub.challenge': challenge,
    'hub.verify_token': token
  } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    return res.status(200).send(challenge);
  }

  return res.status(403).end();
});

// Recepción de webhooks (POST)
app.post('/', (req, res) => {
  console.log('Webhook received');
  console.log(JSON.stringify(req.body, null, 2));

  return res.status(200).end();
});

// 👇 CLAVE: exportar, NO escuchar
export default app;
