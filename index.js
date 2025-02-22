const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for API keys
const apiKeys = new Set();

// Middleware to check API key
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || !apiKeys.has(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
};

// Generate new API key
app.post('/generate-key', (req, res) => {
  const newKey = Math.random().toString(36).substring(2, 15);
  apiKeys.add(newKey);
  res.json({ apiKey: newKey });
});

// Download MP3
app.get('/download/mp3', authenticate, async (req, res) => {
  const videoUrl = req.query.url;
  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
    ytdl(videoUrl, { filter: 'audioonly' }).pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download audio' });
  }
});

// Download MP4
app.get('/download/mp4', authenticate, async (req, res) => {
  const videoUrl = req.query.url;
  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(videoUrl, { quality: 'highestvideo' }).pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download video' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
