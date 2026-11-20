const { createApp } = Vue;

function crearPerfilInicial() {
  return {
    nombre: 'Alex Hernández',
    carrera: 'Ingeniería en Software',
    descripcion: 'Me gusta crear interfaces web.',
    correo: 'alex@example.com',
    color: '#2563eb',
    semestre: 'Primero',
    disponible: false,
    temaOscuro: false,
    mostrarContacto: false
  };
}

createApp({
  data() {
    return crearPerfilInicial();
  },
  methods: {
    alternarContacto() {
      this.mostrarContacto = !this.mostrarContacto;
    },
    restablecer() {
      Object.assign(this, crearPerfilInicial());
    },
    alternarTema() {
      this.temaOscuro = !this.temaOscuro;
    }
  }
}).mount('#app');
