module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },

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
        3: '0.03',
        10: '0.1',
        20: '0.2',
      },
      gridTemplateRows: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
};
