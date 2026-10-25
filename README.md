# Decalque

App web estilo AR Drawing para estudos de pintura: a referência fica sobre a câmera do celular e você desenha olhando a tela.

**Online:** https://raffribeiro.github.io/ARDrawing/

## Recursos
- Câmera traseira em tela cheia, troca de câmera e lanterna (quando o aparelho suporta)
- Referência por upload, colar (Ctrl+V) ou arrastar
- Perspectiva por **4 pontos**: arraste os cantos para alinhar a referência ao papel; desative o modo para mover e usar pinça. **Travar** fixa o alinhamento, **Ajustar** restaura o formato. As setas do teclado ajustam o canto selecionado (Shift para passos maiores).
- Opacidade, mover (1 dedo), escala e rotação (pinça), espelhar
- Modos de estudo: Original, Cinza, Valores (2/3/5/7 faixas, 2 = notan) e Linhas (contornos com fundo transparente)
- Grade quadrada (3, 4, 6, 8 divisões no lado menor)
- Travar posição, Espiar (segura para esconder a referência), esconder controles
- Tela fica acesa durante o uso; última imagem e ajustes ficam salvos no aparelho
- PWA: dá para instalar na tela inicial e funciona offline

Desktop: roda do mouse = zoom, Shift + roda = girar, `L` trava, `G` grade, `F` espelha, segurar espaço = espiar.

## Deploy
Site estático, sem build. GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.
