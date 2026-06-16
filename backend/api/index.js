require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(cors());
app.use(express.json());

// Serve uploaded images statically (For backward compatibility if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'origindevv_portfolio',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4']
  }
});
const upload = multer({ storage: storage });

// Simple auth middleware for admin routes
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// --- PUBLIC ROUTES --- //

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { number: 'asc' }
    });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project by slug
app.get('/api/projects/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({
      where: { slug }
    });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// --- ADMIN ROUTES --- //

// Verify Auth
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ token: ADMIN_PASSWORD, success: true });
  } else {
    res.status(401).json({ error: 'Invalid password', success: false });
  }
});

// Upload image endpoint
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }
  // Return the public URL for the uploaded image from Cloudinary
  res.json({ url: req.file.path });
});

// Create project
app.post('/api/projects', requireAuth, async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: req.body
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
app.put('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.update({
      where: { id },
      data: req.body
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
app.delete('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id }
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Export app for serverless platforms like Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
