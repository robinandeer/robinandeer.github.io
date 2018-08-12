import { css } from 'styled-components'

export default {
  colors: {
    background: '#1d1d1d',
    headings: '#cecece',
    text: '#8a8a8a',
    shades: ['#000000', '#131313', '#1d1d1d', '#242424', '#2a2a2a'],
  },
}

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376,
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})
