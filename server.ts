import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));

  // Initialize Gemini AI
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      model: 'gemini-3.8-flash',
    });
  });

  // Live prompt testing endpoint with Gemini
  app.post('/api/test-prompt', async (req, res) => {
    try {
      const { prompt, model = 'gemini-3.8-flash' } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required and must be text' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'مفتاح GEMINI_API_KEY غير متوفر. يمكنك نسخ البرومبت يدويًا إلى أي مساعد ذكي، أو إضافة المفتاح لتجربته مباشرة هنا.',
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({
        success: true,
        text: response.text || '',
        model: 'gemini-3.8-flash',
      });
    } catch (err: any) {
      console.error('Gemini execution error:', err);
      return res.status(500).json({
        error: err?.message || 'حدث خطأ أثناء تنفيذ البرومبت في الذكاء الاصطناعي',
      });
    }
  });

  // Smart prompt enhancement / creative suggestion
  app.post('/api/enhance-idea', async (req, res) => {
    try {
      const { idea, command, lang = 'ar' } = req.body;
      if (!idea || typeof idea !== 'string') {
        return res.status(400).json({ error: 'Idea is required' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured',
        });
      }

      const systemInstruction = lang === 'ar'
        ? `أنت مهندس برومبتات استثنائي وخبير في تحويل الأفكار البسيطة إلى مهام واضحة ومحددة تناسب الأمر /${command}. اكتب فكرة مطورة في فقرة مركزة ومحفزة في حدود 2-4 جمل بدون مقدمات أو ألقاب.`
        : `You are an elite prompt engineer. Expand this core idea into a rich, detailed, actionable task description for the /${command} command in 2-4 concise sentences. Output only the improved idea.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: idea,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        success: true,
        enhanced: response.text?.trim() || idea,
      });
    } catch (err: any) {
      console.error('Enhance idea error:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to enhance idea',
      });
    }
  });

  // Serve Vite in development or static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wasit Studio server running on port ${PORT}`);
  });
}

startServer();
