require('dotenv').config();
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const TEMPLATES = path.join(__dirname, 'templates');
const ASSETS = path.join(__dirname, 'assets');

app.use((req, res, next) => {
  const started = Date.now();

  res.on('finish', () => {
    const entry = {
      time: new Date().toISOString(),
      method: req.method,
      path: req.path,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - started,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      query: req.query,
      headers: {
        host: req.headers.host,
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
        referer: req.headers.referer,
        origin: req.headers.origin,
      },
      body: req.body && Object.keys(req.body).length ? req.body : undefined,
    };

    console.log('[request]', JSON.stringify(entry));
  });

  next();
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing name, email or message' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.TO_EMAIL || 'atbssupport1@gmail.com';

    const info = await transporter.sendMail({
      from: `${name} <${email}>`,
      to,
      subject: `Portfolio Contact Form — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    });

    return res.json({ ok: true, info });
  } catch (err) {
    console.error('Mail error', err);
    return res.status(500).json({ ok: false, error: 'Failed to send message' });
  }
});

app.use('/assets', express.static(ASSETS));
app.use(express.static(TEMPLATES));

app.use((_req, res) => {
  res.status(404).type('text').send('Not found');
});

app.listen(PORT, HOST, () => {
  console.log(`Portfolio listening on ${HOST}:${PORT}`);
});
