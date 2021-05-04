import React from 'react'
import styled from '@emotion/styled'
import { MdxRemote } from 'next-mdx-remote/types'
import hydrate from 'next-mdx-remote/hydrate'
import { Main as PostScreenMain } from 'screens/post/components'
import { mediaQuery } from 'styles/theme'
import { ListItem, OrderedList, ProseImage } from './base'

export const MARKDOWN_COMPONENTS = {
  Image: ProseImage,
  li: ListItem,
  ol: OrderedList,
}

const StyledContainer = styled.div`
  max-width: 45rem;
  font-size: 1.1rem;

  ${mediaQuery[2]} {
    font-size: 1.2rem;
  }

  p {
    line-height: 1.6;
    color: var(--color-text-body);

    .remark-highlight + &,
    & + .remark-highlight {
      margin-top: 1rem;
    }

    code {
      background-color: var(--color-bg-code);
      padding: 0.1rem 0.3rem 0.2rem;
      border-radius: 3px;
      font-size: 0.9em;
      white-space: nowrap;
      position: relative;
      top: -1px;
    }
  }

  h2,
  h3 {
    & > a {
      opacity: 0;
      color: var(--color-text-secondary);
      text-decoration: none;
      margin-left: 0.5rem;

      ::after {
        content: '#';
      }
    }

    &:hover a {
      opacity: 1;
    }
  }

  h2 {
    color: var(--color-text-primary);
    font-size: 1.4em;
    font-weight: 500;

    margin-bottom: 0.5rem;
    margin-top: 3rem;

    & + p {
      margin-top: 0;
    }

    & + ul,
    & + ol {
      margin-top: 1rem;
    }
  }

  h3 {
    color: var(--color-text-primary);
    font-size: 1.2em;
    font-weight: 500;

    margin-bottom: 0.5rem;
    margin-top: 2rem;

    & + p {
      margin-top: 0;
    }
  }

  h4 {
    color: var(--color-text-primary);
    font-size: 1em;
    text-transform: uppercase;
    font-weight: 600;

    margin-bottom: 0.5rem;
    margin-top: 1.5rem;

    & + p {
      margin-top: 0;
    }
  }

  ul,
  ol {
    margin-bottom: 0;
    padding-left: 0.5rem;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  a {
    color: var(--color-text-link);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1px;
  }

  hr {
    border-width: 0;
    border-bottom-width: 2px;
    border-color: var(--color-border-primary);

    margin-top: 2rem;
    margin-bottom: 2rem;

    ${PostScreenMain} & {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }
  }

  blockquote {
    padding-left: 1rem;
    border-left: 3px solid var(--color-text-yellow);

    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    letter-spacing: -0.5px;

    & > p {
      font-size: 0.9em;
    }

    p + & {
      margin-top: 0.5rem;
    }
  }

  ${PostScreenMain} & .remark-highlight {
    margin-left: -1.5rem;
    margin-right: -1.5rem;

    > pre {
      padding: 0.5rem 1.5rem;

      > code {
        padding-right: 1.5rem;
      }
    }
  }

  .remark-highlight {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    background-color: var(--color-bg-code);
    overflow-x: auto;
    font-size: 0.85em;

    ${mediaQuery[1]} {
      border-radius: 6px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
  }

  > * + * {
    margin-top: 1.5em;
  }
`

interface Props {
  children: MdxRemote.Source
}

const MarkdownContent: React.FC<Props> = ({ children }) => {
  const content = hydrate(children, { components: MARKDOWN_COMPONENTS })
  return <StyledContainer>{content}</StyledContainer>
}

export default MarkdownContent
