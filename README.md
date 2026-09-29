# Cyber Fair CTF

CTF estático para GitHub Pages.

## Retos

1. **Warm Up** — inspección HTML.
2. **Caesar** — cifrado César y fuerza bruta.
3. **Inspect Me** — inspección del lado cliente.
4. **Beyond the CTF** — acceso al taller externo de esteganografía.

Todos los retos están disponibles desde el principio.

## Esteganografía

El reto avanzado de esteganografía **no está incluido en este repositorio**.
La página `challenges/04-stego/index.html` simplemente redirige al repositorio
o página del taller independiente.

Configura allí:

```js
const WORKSHOP_URL = "";
```

con la URL del taller.

Los archivos de imagen/audio del taller no se incluyen en este repositorio
para evitar duplicar el contenido del reto avanzado.

## GitHub Pages

`Settings → Pages → Deploy from a branch → main → / (root)`

El proyecto no necesita un servidor para funcionar.

## Nota sobre flags

La validación es client-side y el progreso usa `localStorage`. Es apropiado
para una actividad/demo estática, pero no debe considerarse un sistema de
competición seguro.
