# Portafolio — Alfredo Vargas Vázquez

## Qué se agregó en esta pasada (feedback de pruebas en celular)

1. **Navbar en móvil**: el nombre ocupa su propia fila completa; navegación + ES/EN
   comparten la fila de abajo. Se ajustó el padding del héroe para que no quede
   tapado por el encabezado, ahora más alto en pantallas chicas.
2. **Modal ampliado (lightbox)**: en pantallas ≤700px las flechas se ocultan y en
   su lugar: avance automático cada 3.5s + deslizar con el dedo para navegar
   manualmente (como los estados de WhatsApp). Deslizar reinicia el temporizador.
3. **Carruseles de proyectos**: en pantallas ≤700px las flechas se ocultan; se
   navega deslizando el dedo sobre la foto (sin avance automático — el ritmo
   lo controlas tú).
4. **"Cómo trabajo"**: ahora se puede arrastrar con el dedo. Al soltar, la tira
   sigue moviéndose por inercia y frena poco a poco hasta detenerse en la
   palabra más cercana — como una ruleta, no como un salto directo.

Todo lo anterior es exclusivo de gestos táctiles (touch) — el mouse y las
flechas en escritorio siguen funcionando exactamente igual que antes.

## Cómo instalarlo

Reemplaza tu `styles.css` y tu `script.js` por estos dos. `index.html`,
`images/` y `cv/` no cambiaron — no hace falta tocarlos.

## Para actualizar tu sitio ya publicado

```
git add .
git commit -m "Mejoras de experiencia móvil: navbar, swipe y carrusel con inercia"
git push
```

GitHub Pages se actualiza solo, en 1-2 minutos.
