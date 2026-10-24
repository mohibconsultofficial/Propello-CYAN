# Propello.Online — Contractor Website Platform

Official website for Propello.Online, specializing in custom digital platforms, Google SEO infrastructure, and lead capture for contractors and trade specialists.

## Technical Stack
- **Frontend**: React 19 SPA, Tailwind CSS v4, Motion, Lucide Icons, Vite
- **Assistant**: Propello AI with serverless Google GenAI SDK integration (`@google/genai`)
- **Backend / Deployment**: Netlify Functions (`netlify/functions/chat.ts`, `netlify/functions/booking.ts`) + Local Express fullstack development server (`server.ts`)

---

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```bash
   GEMINI_API_KEY="your-google-gemini-api-key"
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.

---

## Netlify Production Deployment
This repository is pre-configured for instant zero-configuration deployment to Netlify via `netlify.toml`:
1. Push this repository to GitHub.
2. In Netlify, click **Add new site** > **Import an existing project** and select your GitHub repository.
3. Build Settings are automatically populated from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
4. Under **Site configuration > Environment variables**, add:
   - `GEMINI_API_KEY`: Your Gemini API key from Google AI Studio.
5. Click **Deploy site**. Both the website and the Propello AI serverless endpoints will be live.
