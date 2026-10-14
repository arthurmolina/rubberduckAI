# RubberDuckAI — Plano do Projeto

## Visão Geral

Chat mock com uma IA fictícia estilo "rubber duck debugging". O usuário escolhe um "personagem" de pato e conversa livremente. O pato responde com frases de encorajamento passivo, escuta ativa e curiosidade vaga — exatamente como o método do pato de borracha funciona na prática.

**Stack:** Vanilla JavaScript + HTML + CSS
**Hospedagem:** GitHub Pages (estático, zero backend)
**i18n:** suporte a PT-BR e EN-US (extensível)

---

## Personagens (Ducks)

| ID         | Nome       | Personalidade                            |
|------------|------------|------------------------------------------|
| `claude`   | ClaudeDuck | Ponderado, filosófico, usa pausas longas |
| `gpt`      | DuckGPT    | Entusiasmado, sempre positivo            |
| `gemini`   | GeminiDuck | Analítico, gosta de "padrões"            |
| `llama`    | LlamaDuck  | Despojado, informal, usa gírias          |
| `quack`    | QuackAI    | Completamente ininteligível, só "quack"  |

Cada personagem tem seu próprio pool de respostas e estilo visual (cor/avatar).

---

## Fluxo de Usuário

```
[Tela de Seleção]
  → escolhe o personagem do pato
  → (opcional) digita seu nome

[Tela de Chat]
  → campo de input + botão enviar
  → respostas do pato aparecem com delay simulado ("digitando...")
  → histórico de conversa na sessão
  → botão "Novo Chat" / trocar personagem
```

---

## Estrutura de Respostas

As respostas são sorteadas de pools por personagem. Categorias:

- **Escuta ativa:** "É mesmo?", "Continue...", "Mm-hmm."
- **Curiosidade:** "Por quê você acha isso?", "Interessante..."
- **Encorajamento:** "Parece que você está chegando lá.", "Faz sentido."
- **Reflexão:** "E o que acontece se...?", "Já pensou no contrário?"
- **Silêncio produtivo:** "..." , "Hm.", "*acena com a cabeça*"

Regras de seleção:
- Nunca repetir a mesma resposta duas vezes seguidas
- Peso maior para respostas de "escuta ativa" nas primeiras mensagens
- Após 5+ mensagens, aumentar peso de "reflexão"

---

## Internacionalização (i18n)

Arquivo único `i18n.js` com objeto de traduções:

```js
const LOCALES = {
  'pt-BR': { ... },
  'en-US': { ... }
}
```

Detecção automática via `navigator.language`, com fallback para `en-US`.
Botão de troca de idioma na UI.

Elementos traduzíveis:
- Todos os textos da UI (labels, placeholders, botões)
- Pools de respostas dos personagens
- Mensagem de boas-vindas de cada personagem

---

## Estrutura de Arquivos

```
rubberduck/
├── index.html          # SPA única página
├── style.css           # Estilos + temas por personagem
├── app.js              # Lógica principal (state machine)
├── ducks.js            # Definição de personagens e pools de resposta
├── i18n.js             # Traduções PT-BR / EN-US
├── assets/
│   └── ducks/          # SVGs/PNGs dos avatares
└── PLAN.md             # Este arquivo
```

---

## Fases de Implementação

### Fase 1 — Estrutura base
- [ ] `index.html` com tela de seleção e tela de chat (sections toggle)
- [ ] `style.css` base responsivo (mobile-first)
- [ ] `i18n.js` com PT-BR e EN-US

### Fase 2 — Lógica de chat
- [ ] `ducks.js` com 5 personagens e pools de resposta bilíngues
- [ ] `app.js`: seleção de personagem, envio de mensagem, resposta com delay
- [ ] Lógica anti-repetição e progressão de peso por número de mensagens

### Fase 3 — Polish
- [ ] Indicador "digitando..." animado
- [ ] Tema visual por personagem (cor de acento no chat)
- [ ] Avatar do pato na bolha de resposta
- [ ] Efeito sonoro opcional (quack) — arquivo de áudio leve
- [ ] Persistência de idioma preferido via `localStorage`

### Fase 4 — Deploy
- [ ] `README.md` com instruções
- [ ] Configurar GitHub Pages (branch `main`, raiz `/`)
- [ ] Testar em mobile

---

## Decisões Técnicas

| Decisão | Escolha | Motivo |
|---|---|---|
| Framework | Nenhum (Vanilla JS) | Zero build step, direto no GH Pages |
| Bundler | Nenhum | Mesmo motivo |
| CSS | Custom Properties + Flexbox/Grid | Temas dinâmicos por personagem sem JS extra |
| Módulos | ES Modules nativos (`type="module"`) | Suportado em todos os browsers modernos |
| Estado | Objeto global simples | App pequeno, sem necessidade de reatividade |
| Avatares | SVG inline ou emoji estilizado | Leve, sem dependência de imagem externa |

---

## Comportamento Esperado

- O pato **nunca** dá respostas úteis de verdade
- O pato **nunca** faz perguntas técnicas específicas
- O pato **sempre** age como se estivesse prestando atenção
- O efeito deve ser que o usuário se sinta ouvido e resolva o problema **sozinho**
- Humor sutil: o usuário eventualmente percebe que o pato não sabe de nada
