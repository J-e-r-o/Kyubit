  /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          fontFamily: {
            // Reemplazamos la fuente 'sans-serif' por defecto con 'Outfit'.
            // Asegúrate de que 'Outfit' coincida EXACTAMENTE con el nombre de Google Fonts.
            // Añadimos 'sans-serif' como fallback genérico por si falla la carga.
            sans: ['Outfit', 'sans-serif'],
          },
          // Puedes añadir tus colores aquí si quieres
          // colors: {
          //   primary: "#FA8100",
          //   background: "#FFF1E0",
          //   secondary: "#FEDAB3"
          // }
        },
      },
      plugins: [],
    }