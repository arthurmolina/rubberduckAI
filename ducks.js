export const DUCK_IDS = ['claude', 'gpt', 'gemini', 'llama', 'grok', 'deepseek', 'quack'];

export const DUCK_META = {
  claude:   { img: 'assets/ducks/claude.png',   color: '#d97706', bg: '#fef3c7' },
  gpt:      { img: 'assets/ducks/gpt.png',      color: '#16a34a', bg: '#dcfce7' },
  gemini:   { img: 'assets/ducks/gemini.png',   color: '#7c3aed', bg: '#ede9fe' },
  llama:    { img: 'assets/ducks/llama.png',     color: '#b45309', bg: '#fef9c3' },
  grok:     { img: 'assets/ducks/grok.png',      color: '#18181b', bg: '#f1f5f9' },
  deepseek: { img: 'assets/ducks/deepseek.png', color: '#2563eb', bg: '#dbeafe' },
  quack:    { img: 'assets/ducks/quack.png',     color: '#ca8a04', bg: '#fefce8' },
};

export const CATEGORIES = ['listen', 'curious', 'encourage', 'reflect', 'silence'];

// Weights per category [listen, curious, encourage, reflect, silence]
// Progress: early messages lean on listening, later messages lean on reflection
export function getWeights(messageCount) {
  if (messageCount <= 2) return [6, 1, 2, 0, 1];
  if (messageCount <= 6) return [3, 3, 2, 2, 1];
  return [2, 2, 2, 4, 1];
}
