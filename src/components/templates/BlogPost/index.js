import styled from 'styled-components'

import theme, { media } from '../../../theme'

const BlogPost = styled.div`
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: 18px;
  line-height: 1.7;
  padding: 32px 0;
  font-weight: 400;

  h1,
  h2,
  h3,
  h4 {
    color: ${theme.colors.headings};
    font-weight: 500;
    margin-bottom: -8px;
  }

  strong {
    color: ${theme.colors.headings};
  }

  p,
  ul,
  h2,
  h3,
  h4,
  ol,
  ul,
  .instagram-media,
  .caption,
  pre > code {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    padding: 0 24px;
    ${media.tablet`padding: 0;`};
  }

  h1 {
    font-size: 32px;
    ${media.tablet`font-size: 40px;`};
  }

  a {
    color: #158ab5;
  }

  code {
    font-family: Consolas, ‘Andale Mono WT’, ‘Andale Mono’, ‘Lucida Console’,
      ‘Lucida Sans Typewriter’, ‘DejaVu Sans Mono’, ‘Bitstream Vera Sans Mono’, ‘Liberation Mono’,
      ‘Nimbus Mono L’, Monaco, ‘Courier New’, Courier, monospace;
    line-height: 1.6;
    font-size: 14px;
    background-color: ${theme.colors.shades[4]};
  }
  code:not(.hljs) {
    color: #cccccc;
    padding: 1px 7px 3px 8px;
    border-radius: 4px;
  }

  iframe {
    max-width: 1170px;
    margin: 40px auto;
    display: block;
  }

  pre {
    max-width: 1170px;
    margin: 40px auto;
    background-color: ${theme.colors.shades[4]};

    ${media.giant`border-radius: 8px;`};

    > code {
      padding-top: 16px;
      padding-bottom: 16px;
    }
  }

  ul,
  ol {
    padding-left: 48px;
    ${media.tablet`padding-left: 24px;`};
  }

  ul > li,
  ol > li {
    margin: 16px 0;
  }

  hr {
    border: 0;
    height: 2px;
    background-color: ${theme.colors.shades[0]};
    margin: 32px 0;
  }

  figure {
    max-width: 1170px;
    margin: 40px auto;

    > img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
  }

  blockquote > p {
    padding-left: 20px;
    border-left: 4px solid rgba(255, 255, 255, 0.1);
  }

  .caption {
    margin-top: -24px;
    margin-bottom: 40px;
  }
`

export default BlogPost
