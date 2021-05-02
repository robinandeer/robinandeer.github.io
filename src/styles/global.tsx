import { Global, css } from '@emotion/react'

const AMERICAN_SILVER = '209, 209, 209'
const MATTE_BLACK = '23, 23, 23'
const GHOST_WHITE = '#F6F9FF'
const GHOST_WHITE_BODY = 'hsl(218deg 80% 98% / 90%)'
const MAXIMUM_YELLOW = '#FAFA37'

export const globalStyles = (
  <Global
    styles={css`
      :root {
        --color-bg-canvas: rgb(${AMERICAN_SILVER});
        --color-bg-overlay: #bbbbbe;

        --color-bg-code: rgb(49, 51, 76);
        --color-border-primary: #444c56;

        --color-text-primary: rgb(${MATTE_BLACK});
        --color-text-secondary: hsl(210deg 10% 40%);
        --color-text-link: #4184e4;
        --color-text-body: rgba(${MATTE_BLACK}, 0.9);

        --color-text-yellow: ${MAXIMUM_YELLOW};
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --color-bg-canvas: rgb(35, 35, 35);
          --color-bg-overlay: #373e47;

          --color-border-primary: #444c56;

          --color-text-primary: ${GHOST_WHITE};
          --color-text-secondary: #808b99;
          --color-text-body: ${GHOST_WHITE_BODY};
        }
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
          'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: 'calt' 'case' 'rlig';

        font-size: 16px;
        line-height: 1.5;

        background-color: var(--color-bg-canvas);
        color: var(--color-text-primary);
      }

      /* Box sizing rules */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      /* Remove default padding */
      ul[class],
      ol[class] {
        padding: 0;
      }

      /* Remove default margin */
      body,
      h1,
      h2,
      h3,
      h4,
      p,
      li,
      figure,
      figcaption,
      blockquote,
      dl,
      dd {
        margin: 0;
      }

      /* Set core body defaults */
      body {
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
      }

      /* Remove list styles on ul, ol elements with a class attribute */
      ul[class],
      ol[class] {
        list-style: none;
      }

      /* A elements that don't have a class get default styles */
      a:not([class]) {
        text-decoration-skip-ink: auto;
      }

      /* Make images easier to work with */
      img {
        max-width: 100%;
        display: block;
      }

      /* Natural flow and rhythm in articles by default */
      article > * + * {
        margin-top: 1em;
      }

      /* Inherit fonts for inputs and buttons */
      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      /* Remove all animations and transitions for people that prefer not to see them */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}
  />
)
