interface EndScreenProps {
  type: 'eliminated' | 'success';
}

export function EndScreen({ type }: EndScreenProps) {
  if (type === 'eliminated') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center animate-fadeIn">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-4">Obrigado pelo interesse!</h2>
          <p className="text-secondary leading-relaxed">
            No momento, seu perfil não se encaixa nos requisitos desta vaga. Fique de olho nas nossas redes — novas oportunidades podem surgir em breve.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition-all duration-200"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center animate-fadeIn">
        <div className="text-6xl mb-6">✨</div>
        <h2 className="text-2xl font-bold text-white mb-4">Incrível!</h2>
        <p className="text-secondary leading-relaxed mb-2">
          Suas respostas foram enviadas com sucesso. Nossa equipe vai analisar seu perfil e entrar em contato em breve.
        </p>
        <p className="text-success font-semibold">
          Fique preparado para as próximas etapas! 💪
        </p>
      </div>
    </div>
  );
}
