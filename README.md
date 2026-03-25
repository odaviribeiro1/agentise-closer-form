# Agentise Closer Form

Formulário interativo de seleção de closers para a Agentise com React + TypeScript.

## Features

- ✨ Design moderno dark mode (roxo e preto)
- 📱 Mobile first e totalmente responsivo
- 🎯 Uma pergunta por tela (estilo Typeform)
- ⚡ Knockout questions com eliminação automática
- 💾 Salvamento automático em localStorage
- 🔄 Integração Supabase para persistência
- 🪝 Webhook N8N para automação

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Supabase (@supabase/supabase-js)
- Axios (HTTP client)

## Quick Start

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build
```

## Environment Variables

Create `.env.local`:

```env
VITE_SUPABASE_URL=https://fjaqodkjstiujnsrtkhz.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_N8N_WEBHOOK_URL=https://n8n-webhook.autocademy.com.br/webhook/forms-closer
```

## Form Blocks

1. **Bloco 1 - Knockout** (4 perguntas): Filtro inicial de requisitos
2. **Bloco 2 - Perfil** (4 perguntas): Experiência em vendas
3. **Bloco 3 - Habilidade Real** (3 perguntas): Skills práticos
4. **Bloco 4 - Mentalidade** (3 perguntas): Motivação e disponibilidade

## Project Structure

```
src/
├── components/
│   ├── Questions/
│   │   ├── MultipleChoice.tsx
│   │   ├── Scale.tsx
│   │   ├── TextInput.tsx
│   │   └── MultipleWithText.tsx
│   ├── QuestionCard.tsx
│   ├── ProgressBar.tsx
│   └── EndScreen.tsx
├── lib/
│   ├── questions.ts
│   └── supabase.ts
├── types.ts
└── App.tsx
```

## Integrations

### Supabase
Saves all responses to `closer_applications` table with status tracking and elimination info.

### N8N Webhook
Triggers on form completion with full response payload.

## License

© 2024 Agentise
