# Portafolio — Alfredo Vargas Vázquez

Versión consolidada y verificada, lista para desplegar.

## Qué se corrigió en esta pasada

- **Bug de fondo**: 4 bloques de proyecto (Gym Access, Trans-Matic, PlantApp, SCARA)
  tenían 2 `</div>` de más cada uno — un error que arrastraba yo mismo desde el script
  que usé para rediseñar los carruseles hace varios turnos. Rompía el anidado del HTML
  y hacía que las tarjetas se "escaparan" de su contenedor a partir de Gym Access.
  Ya está corregido y verificado: 112 aperturas = 112 cierres de `<div>` en todo el archivo.
- Botón de cerrar del modal (duplicado accidental).
- Crossfade dentro del modal ampliado.
- Fondo de "Cómo trabajo" de vuelta a pergamino.
- Destello azul al cambiar de foto en el modal (color propio para el modal, separado
  de las tarjetas de la página).
- Tarjeta de Perfil con esquinas redondeadas, viñeta y animación al hacer scroll.

## Estructura

```
index.html
styles.css
script.js
images/     (17 archivos)
cv/         (tu CV en PDF)
```

## Siguiente paso: desplegar con git

Cuando confirmes que todo se ve bien con Live Server, avísame y seguimos con:
1. Inicializar el repositorio (`git init`)
2. Subirlo a GitHub
3. Activar GitHub Pages para que quede público
