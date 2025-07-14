const express = require('express');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const upload = multer({ storage: multer.memoryStorage() });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

app.use(express.json());

function authMiddleware(role) {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'missing token' });
    try {
      const payload = jwt.decode(token);
      if (role && payload.role !== role) {
        return res.status(403).json({ error: 'forbidden' });
      }
      next();
    } catch (e) {
      return res.status(401).json({ error: 'invalid token' });
    }
  };
}

// Admin login - delegates to Supabase auth
app.post('/login/admin', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json(data);
});

// Customer login
app.post('/login/customer', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json(data);
});

// Upload media to Supabase Storage (protected admin)
app.post('/upload', authMiddleware('admin'), upload.single('file'), async (req, res) => {
  const file = req.file;
  const { galleryId } = req.body;
  const { data, error } = await supabase.storage.from('images').upload(`${galleryId}/${file.originalname}`, file.buffer, {
    contentType: file.mimetype,
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Assign gallery to customer (protected admin)
app.post('/assign', authMiddleware('admin'), async (req, res) => {
  const { galleryId, userId } = req.body;
  const { error } = await supabase.from('assignments').insert({ gallery_id: galleryId, user_id: userId });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

// Get gallery by UUID (protected customer)
app.get('/gallery/:id', authMiddleware('customer'), async (req, res) => {
  const id = req.params.id;
  const { data, error } = await supabase.storage.from('images').list(id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app; // for testing
