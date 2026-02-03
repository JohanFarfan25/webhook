export default function handler(req, res) {
    // 🔑 Verificación de Meta (GET)
    if (req.method === 'GET') {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            console.log('✅ Webhook verificado');
            return res.status(200).send(challenge);
        }

        return res.status(403).json({ error: 'Token inválido' });
    }

    // 📩 Recepción de eventos (POST)
    if (req.method === 'POST') {
        console.log('📩 Evento recibido:', JSON.stringify(req.body, null, 2));
        return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método no permitido' });
}
