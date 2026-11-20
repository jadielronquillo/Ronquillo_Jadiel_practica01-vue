# Bitácora · Práctica 1: Mi tarjeta interactiva con Vue 3

**Perfil inicial usado:** Alex Hernández (datos ficticios, según el manual).
**Archivos:** `index.html`, `estilos.css`, `app.js` (más `evidencias/` y esta bitácora).
**Entorno:** navegador con conexión a internet para cargar Vue 3 desde `https://unpkg.com/vue@3/dist/vue.global.js`.

## Comprobaciones realizadas

| # | Acción | Resultado esperado | Resultado observado |
|---|--------|--------------------|---------------------|
| 1 | Escribir un nombre distinto | La tarjeta se actualiza sin recargar | Al escribir «Jadiel Pérez», el `<h3>` de la tarjeta mostró «Jadiel Pérez» inmediatamente |
| 2 | Modificar carrera y descripción | Ambos cambios aparecen en la vista previa | «Ingeniería Informática» y el nuevo texto aparecieron en la tarjeta; el contador pasó de `30 / 160` a `61 / 160` |
| 3 | Vaciar el nombre | Aparece «Tu nombre» | Apareció «Tu nombre» (operador `\|\|`) |
| 4 | Seleccionar otro color | Solo cambia el borde de la tarjeta | Con `#c026d3` el borde pasó a `rgb(192, 38, 211)`; el color del texto no se modificó |
| 5 | Mostrar y ocultar contacto | El correo aparece/desaparece y el botón cambia de texto | Apareció «Contacto: alex@example.com», el botón pasó a «Ocultar contacto» y `aria-expanded="true"`; al volver a pulsar, el correo desapareció y el botón volvió a «Mostrar contacto» |
| 6 | Modificar campos y pulsar «Restablecer datos» | Se recuperan los valores iniciales y se oculta el contacto | Nombre, carrera, descripción, correo, color, semestre, disponibilidad y contacto volvieron a su estado inicial; el contador volvió a `30 / 160` |
| 7 | Reducir la ventana a 375 px | Una columna, sin desbordamiento horizontal | A 375 px, `grid-template-columns: 328px` (una columna) y `scrollWidth = clientWidth = 360` (sin scroll horizontal) |
| 8 | Recorrer controles con Tab | Foco visible | El elemento enfocado mostró un contorno `3px solid rgb(180, 83, 9)` |
| A | Seleccionar semestre | Al menos cuatro opciones, valor inicial definido y visible en la tarjeta | 8 opciones; inicia en «Primero», al elegir «Séptimo» la tarjeta mostró «Semestre: Séptimo» y «Restablecer» devolvió «Primero» |
| B | Contador de caracteres | Se actualiza al escribir, borrar y restablecer | `30 / 160` inicial, `29 / 160` al reemplazar la descripción, `61 / 160` con el texto personalizado y `30 / 160` tras restablecer |
| C | Casilla «Disponible para colaborar» | Mensaje distinto según el estado, comunicado con texto | Con la casilla marcada: «Disponible para colaborar»; sin marcar: «No disponible para colaborar en este momento»; se restablece a este último |
| Opcional | Botón de tema oscuro | Alternar tema con `:class`, texto y controles legibles | Al activarlo se aplicó `.tema-oscuro`, el panel pasó a `rgb(30, 41, 59)` con texto `rgb(226, 232, 240)`, los campos mantuvieron contraste y el botón cambió a «Usar tema claro» |

Todas las comprobaciones se ejecutaron sin manipular el DOM para actualizar la vista: los cambios se hicieron con `v-model`, `:class`, `:style`, `v-if`/`v-else` y los métodos de Vue.

## Error encontrado y solución

**Error:** el primer intento del desafío opcional colocó `:class="{ 'tema-oscuro': temaOscuro }"` directamente en `<main id="app">`. El botón cambiaba su texto (el estado `temaOscuro` sí cambiaba), pero la clase no se aplicaba y los colores no cambiaban. Al inspeccionar el DOM, el atributo `:class` aparecía literalmente en el elemento raíz.

**Causa:** Vue monta la aplicación *dentro* del elemento indicado en `.mount('#app')`; por eso no compila los atributos del propio elemento de montaje.

**Solución:** se movió `:class` a un `<div>` interno dentro de `<main id="app">`. Después de recargar, la clase `.tema-oscuro` se aplicó correctamente y las variables CSS cambiaron el fondo, los paneles, los campos y los botones.

## Respuestas

**¿Qué diferencia existe entre interpolación y `v-model`?**
La interpolación `{{ dato }}` es unidireccional: toma el valor del estado de JavaScript y lo escribe como texto en la vista; si el estado cambia, el texto se actualiza, pero el usuario no puede modificar el dato desde ahí. `v-model` crea un enlace bidireccional: muestra el valor en el control y, cuando el usuario escribe o selecciona, actualiza la propiedad correspondiente de `data()`. Por eso el formulario y la tarjeta se sincronizan sin código adicional.

**¿Para qué se usa `:style`?**
`:style` es la forma abreviada de `v-bind:style` y enlaza estilos CSS con expresiones reactivas. En la práctica, `:style="{ borderColor: color }"` hace que el borde de la tarjeta tome el color elegido en el control `type="color"`; el resto de las reglas CSS se mantienen intactas.

**¿Qué cambia al ejecutar `alternarContacto()`?**
Invierte el booleano `mostrarContacto` (`this.mostrarContacto = !this.mostrarContacto`). Como el párrafo del correo tiene `v-if="mostrarContacto"`, aparece o desaparece según el nuevo valor; al mismo tiempo, la expresión condicional del botón cambia su texto entre «Mostrar contacto» y «Ocultar contacto», y `:aria-expanded` refleja el estado para tecnologías de asistencia.

**¿Por qué desaparecen los cambios al recargar?**
Porque los datos viven solo en memoria: `data()` devuelve un objeto nuevo creado por `crearPerfilInicial()` cada vez que se monta la aplicación. No hay `localStorage`, cookies ni backend, así que al recargar la página se descarta el estado anterior y se restauran los valores iniciales. Lo mismo hace el botón «Restablecer datos» mediante `Object.assign(this, crearPerfilInicial())`.

## Evidencias

- `evidencias/01_vista_inicial.png` — vista inicial con los datos por defecto.
- `evidencias/02_tarjeta_personalizada.png` — tarjeta personalizada con contacto visible, semestre seleccionado, disponibilidad y contador actualizados.
- `evidencias/03_pantalla_pequena.png` — vista a 375 px (una sola columna).
