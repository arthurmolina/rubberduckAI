// Suggested conversation starters per duck, in both languages.
// Intended use: show examples in the UI or as placeholder inspiration.

export const PROMPTS = {
  'pt-BR': {
    claude: [
      'Tenho um bug que não consigo encontrar e já olhei esse código umas dez vezes...',
      'Preciso decidir entre duas arquiteturas e não sei qual faz mais sentido.',
      'Esse algoritmo funciona, mas não consigo explicar direito por quê.',
      'Refatorei esse trecho e acho que ficou pior do que antes.',
      'Não sei se estou indo na direção certa com esse projeto.',
      'Tem uma decisão de design que me incomoda mas não sei o que trocar.',
    ],
    gpt: [
      'Finalmente entendi como closure funciona em JavaScript!',
      'Resolvi um bug que me perseguiu por três dias. Preciso contar pra alguém.',
      'Tenho uma ideia incrível pra um projeto novo e tô animado.',
      'Quase terminei a feature, falta só um detalhe.',
      'Acho que encontrei uma solução muito elegante pra esse problema.',
      'Meu PR foi aprovado e vou fazer o deploy hoje!',
    ],
    gemini: [
      'Preciso analisar a performance desse sistema em produção.',
      'Tenho dados inconsistentes no banco e não sei de onde vêm.',
      'Esse bug aparece só em produção, nunca em desenvolvimento.',
      'Quero entender o padrão de falha desse componente específico.',
      'Minha query SQL tá demorando muito mais do que deveria.',
      'Preciso modelar esse domínio e não sei qual estrutura de dados usar.',
    ],
    llama: [
      'Cara, esse código tá um caos e preciso refatorar tudo do zero.',
      'Não tô entendendo nada dessa documentação, é horrível.',
      'Tô tentando fazer uma coisa simples mas tá complicando absurdamente.',
      'Esse framework foi uma péssima escolha, por que a gente optou por isso?',
      'Trabalhei a noite toda nisso e não sai do lugar nenhum.',
      'Meu ambiente de desenvolvimento quebrou de novo. Terceira vez essa semana.',
    ],
    grok: [
      'Preciso de uma opinião honesta sobre esse código. Sem papas na língua.',
      'Acho que minha solução é boa, mas tenho a sensação de que tô errado.',
      'Esse projeto tá claramente indo pro buraco. Não sei o que fazer.',
      'Meu tech lead disse que meu código é ruim e não explicou por quê.',
      'Fiz uma escolha técnica e agora preciso defender ela na reunião.',
      'Sinto que tô resolvendo o problema errado há semanas.',
    ],
    deepseek: [
      'Preciso otimizar esse algoritmo para funcionar em escala.',
      'Tenho um problema de race condition no sistema distribuído.',
      'Quero entender a complexidade computacional dessa solução.',
      'Preciso de uma análise objetiva das trocas nesse design.',
      'Meu sistema de cache tem comportamento inesperado sob carga.',
      'Preciso reduzir a latência desse serviço de 200ms para menos de 50ms.',
    ],
    quack: [
      'Quack.',
      'Não sei nem por onde começar.',
      'Tá tudo quebrando e não sei por quê.',
      'Preciso de ajuda urgente com esse bug.',
      'Meu projeto inteiro parou de funcionar.',
      'Erro de segmentation fault. Novamente.',
    ],
  },

  'en-US': {
    claude: [
      "There's a bug I can't find and I've looked at this code ten times already...",
      "I need to decide between two architectures and I'm not sure which makes more sense.",
      'This algorithm works, but I can\'t properly explain why.',
      'I refactored this piece and I think it got worse than before.',
      "I'm not sure if I'm going in the right direction with this project.",
      "There's a design decision that bothers me but I don't know what to change.",
    ],
    gpt: [
      'I finally understood how closures work in JavaScript!',
      "I fixed a bug that chased me for three days. I need to tell someone.",
      "I have an amazing idea for a new project and I'm excited.",
      'Almost done with the feature, just one small detail left.',
      'I think I found a really elegant solution to this problem.',
      'My PR got approved and I\'m deploying today!',
    ],
    gemini: [
      'I need to analyze the performance of this system in production.',
      "I have inconsistent data in the database and I don't know where it's coming from.",
      'This bug only appears in production, never in development.',
      'I want to understand the failure pattern of this specific component.',
      'My SQL query is taking much longer than it should.',
      "I need to model this domain and I'm not sure which data structure to use.",
    ],
    llama: [
      "This code is a mess and I need to refactor everything from scratch.",
      "I can't understand anything in this documentation, it's terrible.",
      "I'm trying to do something simple but it's getting absurdly complicated.",
      'This framework was a bad choice, why did we go with it?',
      "I worked all night on this and didn't get anywhere.",
      'My dev environment broke again. Third time this week.',
    ],
    grok: [
      "I need an honest opinion on this code. Don't sugarcoat it.",
      "I think my solution is good, but I have a feeling I'm wrong.",
      "This project is clearly going sideways. I don't know what to do.",
      "My tech lead said my code is bad and didn't explain why.",
      'I made a technical choice and now I have to defend it in the meeting.',
      "I feel like I've been solving the wrong problem for weeks.",
    ],
    deepseek: [
      'I need to optimize this algorithm to work at scale.',
      'I have a race condition in the distributed system.',
      'I want to understand the computational complexity of this solution.',
      'I need an objective analysis of the tradeoffs in this design.',
      'My caching system has unexpected behavior under load.',
      'I need to reduce the latency of this service from 200ms to under 50ms.',
    ],
    quack: [
      'Quack.',
      "I don't even know where to start.",
      "Everything is breaking and I don't know why.",
      'I need urgent help with this bug.',
      'My entire project stopped working.',
      'Segmentation fault. Again.',
    ],
  },
};

export function getPrompts(lang, duckId) {
  const locale = PROMPTS[lang] || PROMPTS['en-US'];
  return locale[duckId] || [];
}
