import type { Question } from '../types';

export const questions: Question[] = [
  // BLOCO 0 — Identificação
  {
    id: 15,
    block: 0,
    question: 'Qual é o seu nome completo?',
    type: 'text-short',
    placeholder: 'Seu nome completo...',
  },
  {
    id: 16,
    block: 0,
    question: 'Qual é o seu WhatsApp?',
    type: 'text-short',
    placeholder: '(11) 99999-9999',
  },
  {
    id: 17,
    block: 0,
    question: 'Qual é o seu Instagram?',
    type: 'text-short',
    placeholder: '@seuinstagram',
  },

  // BLOCO 1 — Knockout
  {
    id: 1,
    block: 1,
    question: 'Esta posição é remunerada com comissão de 5% a 10% sobre o valor total de contratos fechados, sem salário fixo. Está alinhado com isso?',
    type: 'multiple-choice',
    options: [
      { id: '1a', label: 'Sim, topo', value: 'sim_topo' },
      { id: '1b', label: 'Não, preciso de fixo desde o início', value: 'nao_preciso_fixo', isEliminating: true },
    ],
  },
  {
    id: 2,
    block: 1,
    question: 'Exigimos exclusividade total. Você está disponível para trabalhar apenas para a Agentise?',
    type: 'multiple-choice',
    options: [
      { id: '2a', label: 'Sim, com exclusividade', value: 'sim_exclusividade' },
      { id: '2b', label: 'Trabalho em outro lugar', value: 'trabalho_outro_lugar', isEliminating: true },
    ],
  },
  {
    id: 3,
    block: 1,
    question: 'O horário fixo é das 10h às 19h, de segunda a sexta. Consegue cumprir?',
    type: 'multiple-choice',
    options: [
      { id: '3a', label: 'Sim', value: 'sim' },
      { id: '3b', label: 'Não', value: 'nao', isEliminating: true },
    ],
  },
  {
    id: 4,
    block: 1,
    question: 'Você tem computador, câmera e microfone de qualidade para reuniões remotas?',
    type: 'multiple-choice',
    options: [
      { id: '4a', label: 'Sim', value: 'sim' },
      { id: '4b', label: 'Não', value: 'nao', isEliminating: true },
    ],
  },

  // BLOCO 2 — Perfil
  {
    id: 5,
    block: 2,
    question: 'Quantos anos de experiência você tem em vendas?',
    type: 'scale',
    options: [
      { id: '5a', label: '1', value: '1' },
      { id: '5b', label: '2', value: '2' },
      { id: '5c', label: '3', value: '3' },
      { id: '5d', label: '4', value: '4' },
      { id: '5e', label: '5+', value: '5+' },
    ],
  },
  {
    id: 6,
    block: 2,
    question: 'Já atuou como closer, SDR, executivo de vendas ou consultor comercial? Descreva brevemente sua trajetória.',
    type: 'text-long',
    placeholder: 'Conte um pouco sobre sua experiência em vendas...',
  },
  {
    id: 7,
    block: 2,
    question: 'Qual foi o maior valor que você fechou em uma única venda? (R$)',
    type: 'text-short',
    placeholder: 'Ex: 50.000',
  },
  {
    id: 8,
    block: 2,
    question: 'Você já vendeu algum produto ou serviço de tecnologia, software ou automação?',
    type: 'multiple-with-text',
    options: [
      { id: '8a', label: 'Sim', value: 'sim' },
      { id: '8b', label: 'Não', value: 'nao' },
    ],
    placeholder: 'Descreva brevemente o produto/serviço',
  },

  // BLOCO 3 — Habilidade Real
  {
    id: 9,
    block: 3,
    question: 'Um lead chega na call animado, mas no final diz: "Ficou caro, vou pensar e te retorno." Escreva exatamente o que você responderia, como se estivesse na ligação agora.',
    type: 'text-long',
    placeholder: 'Digite sua resposta como se estivesse na ligação...',
  },
  {
    id: 10,
    block: 3,
    question: 'Como você se descreveria em uma palavra como vendedor? Justifique em 2 linhas.',
    type: 'text-long',
    placeholder: 'Palavra: ...\nJustificativa: ...',
  },
  {
    id: 11,
    block: 3,
    question: 'Escreva em 3 linhas por que um empresário que nunca ouviu falar de IA deveria contratar um agente de WhatsApp para o negócio dele.',
    type: 'text-long',
    placeholder: 'Sua resposta aqui...',
  },

  // BLOCO 4 — Mentalidade
  {
    id: 12,
    block: 4,
    question: 'Quais são seus objetivos financeiros para os próximos 12 meses? Seja específico.',
    type: 'text-long',
    placeholder: 'Descreva seus objetivos financeiros...',
  },
  {
    id: 13,
    block: 4,
    question: 'O que te motiva além do dinheiro? Por que você quer trabalhar com vendas de IA?',
    type: 'text-long',
    placeholder: 'Conte-nos sobre suas motivações...',
  },
  {
    id: 14,
    block: 4,
    question: 'Quando você pode começar?',
    type: 'multiple-choice',
    options: [
      { id: '14a', label: 'Agora', value: 'agora' },
      { id: '14b', label: '1-2 semanas', value: '1_2_semanas' },
      { id: '14c', label: '2-4 semanas', value: '2_4_semanas' },
      { id: '14d', label: '1-3 meses', value: '1_3_meses' },
    ],
  },
];
