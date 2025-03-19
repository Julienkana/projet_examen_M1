module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/hooks/**/*.{js,ts,jsx,tsx}',
      './src/models/**/*.{js,ts,jsx,tsx}',
    ],
    purge: false,  // Ajoute cette ligne pour désactiver la purge (si tu ne veux pas qu'il fasse de purge)
    theme: {
      extend: {},
    },
    plugins: [],
  }
  