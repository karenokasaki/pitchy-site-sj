# Pitch Site — SJ Design Studio

Vanilla HTML/CSS/JS, single page, mobile-first responsive. Sem framework, sem build step.

## Estrutura

```
index.html        ← marcação semântica, uma <section> por bloco do Figma
styles.css        ← tokens (CSS variables) extraídos do Figma + estilos
script.js         ← só o toggle do menu mobile
.env              ← FIGMA_TOKEN (não commitar — já está no .gitignore)
scripts/extract.js← script para re-extrair conteúdo/tokens do Figma se precisar
figma-raw.json    ← JSON cru do Figma (ignorado pelo git)
figma-out/        ← saídas legíveis: tokens.json, content.json, structure.txt
```

## Rodando

Basta abrir `index.html` no navegador. Para um servidor local (recomendado para
testar fontes/CORS):

```
npx serve .
# ou
python -m http.server 8000
```

## O que ainda falta

- **Imagens / ilustrações**: o Figma tem placeholders (cards do Samsung, LG SKS,
  etc.) — exportar pelo Figma e colocar em `assets/`, depois referenciar nas
  sections correspondentes.
- **Logo**: o "sj" no nav está como texto + bolinha vermelha; trocar pelo SVG real
  quando exportado.
- **Formulário**: o markup está pronto mas sem backend. Conectar a Formspree /
  Netlify Forms / endpoint próprio quando definirem.
- **Animations**: nenhum scroll-reveal ou parallax — adicionar se quiser depois.

## Re-extrair do Figma

Se o design mudar:

```
node scripts/extract.js
```

Vai reescrever `figma-out/tokens.json`, `content.json` e `structure.txt` a partir
de `figma-raw.json`. Para baixar o JSON de novo:

```
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FIGMA_FILE_KEY" -o figma-raw.json
```

## Tokens extraídos

Cores principais e tipografia estão em `:root` no topo de `styles.css`. Family
map:

- **Inter** — display + corpo + botões
- **JetBrains Mono** — eyebrows, labels, números de seção
- **Roboto Serif** — corpo "leitura", subtítulos
- **Newsreader** — captions das estatísticas
- **Just Me Again Down Here** — anotações manuscritas ("AI + Human")

Todas vêm via Google Fonts no `<head>`.
