# Portafolio — Alfredo Vargas Vázquez

## Últimos 3 ajustes (segunda ronda de feedback de testers)

1. **Reconocimientos**: las 4 fotos de la tira ahora abren el modal ampliado al
   hacer clic/tocar. El zoom con los dedos no necesitó código propio — el
   sitio nunca bloqueó el zoom nativo del navegador, así que ya funcionaba
   apenas la imagen se ve en pantalla completa.
2. **Navbar móvil**: el nombre y el botón ES/EN ahora comparten la primera
   fila (ya no hay una fila vacía solo para el idioma); la navegación pasa
   a ser una segunda fila centrada.
3. **Navbar que se oculta al bajar**: en pantallas ≤700px, al hacer scroll
   hacia abajo el menú y el botón de idioma se encogen, dejando solo el
   nombre visible; al subir (aunque sea un poco), reaparece completo.

## Cómo instalarlo

Reemplaza tu `styles.css` y tu `script.js` por estos dos — `index.html`,
`images/` y `cv/` no cambiaron.

## Para actualizar tu sitio publicado

```
git add .
git commit -m "Zoom en reconocimientos y navbar móvil mejorado"
git push
```
