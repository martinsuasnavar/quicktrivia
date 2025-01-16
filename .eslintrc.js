module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'], // Configuración base de Next.js
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Ejemplo: desactivar regla específica
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};