const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        coolGray: colors.coolGray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        emerald: colors.emerald,
        cyan: colors.cyan,
        teal: colors.teal,
        indigo: colors.indigo,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      },
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       blockquote: {
      //         color: theme('colors.fuchsia.500'),
      //         quotes: 'none',
      //         paddingLeft: 0,
      //         borderLeftWidth: 0,
      //       },
      //       h2: {
      //         fontWeight: 600,
      //       },
      //       hr: {
      //         borderColor: theme('colors.warmGray.300'),
      //       },
      //       a: {
      //         color: theme('colors.rose.400'),
      //         fontWeight: 'bold',
      //         textDecoration: 'none',
      //         '&:hover': {
      //           textDecoration: 'underline',
      //           color: theme('colors.rose.400'),
      //         },
      //       },
      //       code: {
      //         display: 'inline-block',
      //         letterSpacing: '-0.5px',
      //         padding: '2px 6px',
      //         margin: '1px 0px',
      //         backgroundColor: theme('colors.warmGray.600'),
      //         color: theme('colors.warmGray.200'),
      //         borderRadius: theme('borderRadius.md'),
      //         '&::before': {
      //           content: '""',
      //         },
      //         '&::after': {
      //           content: '""',
      //         },
      //       },
      //     },
      //   },
      //   lg: {
      //     css: {
      //       blockquote: {
      //         paddingLeft: 0,
      //         '> p': {
      //           fontSize: '1.25rem',
      //         },
      //       },
      //     },
      //   },
      //   xl: {
      //     css: {
      //       blockquote: {
      //         paddingLeft: 0,
      //       },
      //     },
      //   },
      //   dark: {
      //     css: {
      //       color: theme('colors.warmGray.200'),
      //       strong: {
      //         color: theme('colors.warmGray.100'),
      //       },
      //       blockquote: {
      //         color: theme('colors.fuchsia.400'),
      //       },
      //       hr: {
      //         borderColor: theme('colors.warmGray.600'),
      //       },
      //       h2: {
      //         color: theme('colors.warmGray.200'),
      //       },
      //       a: {
      //         color: theme('colors.rose.400'),
      //         fontWeight: 'bold',
      //         textDecoration: 'none',
      //         '&:hover': {
      //           textDecoration: 'underline',
      //           color: theme('colors.rose.400'),
      //         },
      //       },
      //     },
      //   },
      // }),
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
  variants: {
    extend: {
      borderOpacity: ['dark'],
      translate: ['group-hover'],
    },
  },
  plugins: [],
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
};
