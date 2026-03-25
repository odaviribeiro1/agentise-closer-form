interface EndScreenProps {
  type: 'eliminated' | 'success';
}

export function EndScreen({ type }: EndScreenProps) {
  if (type === 'eliminated') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 md:px-12 pt-[3px] md:pt-1">
        <div className="max-w-[640px] w-full text-center animate-fadeIn">
          <div className="text-6xl md:text-7xl mb-6 md:mb-8">👋</div>
          <h2 className="text-[22px] md:text-[26px] font-semibold text-text-main mb-4">Obrigado!</h2>
          <p className="text-text-secondary text-base leading-relaxed mb-8">
            No momento, seu perfil não se encaixa nos requisitos desta vaga. Fique de olho nas nossas oportunidades futuras!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full h-12 md:h-12 px-6 bg-primary hover:bg-blue-600 text-white font-semibold rounded-md transition-all duration-200"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 md:px-12 pt-[3px] md:pt-1">
      <div className="max-w-[640px] w-full text-center animate-fadeIn">
        <div className="text-6xl md:text-7xl mb-6 md:mb-8">✓</div>
        <h2 className="text-[22px] md:text-[26px] font-semibold text-text-main mb-4">Enviado com sucesso!</h2>
        <p className="text-text-secondary text-base leading-relaxed">
          Suas respostas foram recebidas. Nossa equipe analisará seu perfil e entrará em contato em breve.
        </p>
      </div>
    </div>
  );
}
