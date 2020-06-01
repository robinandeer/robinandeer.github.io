module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--base-color)',
        surface: 'var(--surface-color)',
        'raised-background': 'var(--raised-base-color)',
        'raised-surface': 'var(--raised-surface-color)',
        border: 'var(--border-color)',
        rose: 'var(--rose-color)',
        pine: 'var(--pine-color)',
        'pine-50': 'var(--pine-50-color)',
        gold: 'var(--gold-color)',
        'gold-50': 'var(--gold-50-color)',
        foam: 'var(--foam-color)',
        'foam-50': 'var(--foam-50-color)',
        iris: 'var(--iris-color)',
        'iris-50': 'var(--iris-50-color)',
        heat: 'var(--heat-color)',
        'heat-50': 'var(--heat-50-color)',
        text: 'var(--text-color)',
        soft: 'var(--soft-color)',
      },
      opacity: {
        '3': '0.03',
        '10': '0.1',
        '20': '0.2',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
};
