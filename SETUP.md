# Setup Guide - Agentise Closer Form

## ✅ Completed Steps

Your React + TypeScript project has been created with:

- ✅ Vite + React 18 setup
- ✅ TypeScript configuration
- ✅ Tailwind CSS + PostCSS setup
- ✅ 14-question form (4 blocks)
- ✅ Responsive components:
  - MultipleChoice, Scale, TextInput, MultipleWithText
  - ProgressBar, QuestionCard, EndScreen
- ✅ Supabase integration ready
- ✅ N8N webhook integration ready
- ✅ localStorage auto-save
- ✅ Git repository initialized with 2 commits

## 🚀 Next Steps

### 1. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
VITE_SUPABASE_URL=https://fjaqodkjstiujnsrtkhz.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
VITE_N8N_WEBHOOK_URL=https://n8n-webhook.autocademy.com.br/webhook/forms-closer
```

### 2. Create Supabase Table

In your Supabase dashboard, create table `closer_applications`:

```sql
CREATE TABLE public.closer_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  q1 text,
  q2 text,
  q3 text,
  q4 text,
  q5 integer,
  q6 text,
  q7 text,
  q8 text,
  q8_details text,
  q9 text,
  q10 text,
  q10_justification text,
  q11 text,
  q12 text,
  q13 text,
  q14 text,
  status text DEFAULT 'pending',
  eliminated boolean DEFAULT false,
  eliminated_at_question integer,
  created_at timestamp DEFAULT now()
);
```

Enable RLS and allow anonymous inserts:
```sql
ALTER TABLE public.closer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_anonymous_insert" ON public.closer_applications
  FOR INSERT WITH CHECK (true);
```

### 3. Setup GitHub Repository

#### Option A: Using the setup script (recommended)

```bash
chmod +x setup-github.sh
./setup-github.sh
```

This will:
1. Authenticate with GitHub
2. Create the repository
3. Push all commits

#### Option B: Manual setup

1. Go to https://github.com/new
2. Create new repository named `agentise-closer-form`
3. Run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/agentise-closer-form.git
git push -u origin main
```

### 4. Run Development Server

```bash
npm install
npm run dev
```

Visit http://localhost:5173

### 5. Build for Production

```bash
npm run build
```

The `dist/` folder is ready to deploy.

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Any Static Host
Upload the `dist/` folder to any static hosting service.

## 📋 Checklist

- [ ] Environment variables configured in `.env.local`
- [ ] Supabase table `closer_applications` created
- [ ] RLS policies configured in Supabase
- [ ] GitHub repository created and pushed
- [ ] Development server runs: `npm run dev`
- [ ] Build succeeds: `npm run build`
- [ ] Ready for deployment

## 🔧 Troubleshooting

### Supabase connection error
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
- Check RLS policies allow anonymous inserts
- Test with Supabase client in browser console

### GitHub push fails
- Run `gh auth login` first
- Ensure you have permissions to create repos
- Check internet connection

### npm run dev doesn't start
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Check Node.js version (16+)

## 📚 Project Structure

```
agentise-closer-form/
├── src/
│   ├── components/
│   │   ├── Questions/      # Form input components
│   │   ├── QuestionCard.tsx
│   │   ├── ProgressBar.tsx
│   │   └── EndScreen.tsx
│   ├── lib/
│   │   ├── questions.ts    # 14 questions definition
│   │   └── supabase.ts     # Supabase client
│   ├── types.ts
│   ├── App.tsx             # Main component
│   └── index.css           # Tailwind + globals
├── .env.local              # Environment variables
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## 🎨 Design System

- **Primary**: #6C2BD9 (Roxo)
- **Secondary**: #9B59F5 (Roxo Claro)
- **Background**: #0D0D0D (Preto)
- **Surface**: #1A1A1A (Cinza Escuro)
- **Text**: #FFFFFF (Branco)
- **Success**: #00C48C (Verde)

## 📞 Support

For issues or questions:
1. Check the README.md for features overview
2. Review component files in `src/components/`
3. Check browser console for errors (F12)
4. Verify Supabase and N8N configurations

---

**Ready to go! 🚀**
