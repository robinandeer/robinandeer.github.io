import styled from '@emotion/styled'
import { breakpoint, mediaQuery } from 'styles/theme'

export const Main = styled.main`
  padding: 3rem 1rem;

  max-width: ${breakpoint[3]}px;
  margin: 0 auto;

  ${mediaQuery[1]} {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`

export const PageTitle = styled.h1`
  font-size: calc(1.5rem + 3vw);
  line-height: 1.3;
  font-weight: 700;
`

export const TitleContainer = styled.div`
  padding-bottom: 3rem;
  max-width: 45rem;

  ${mediaQuery[1]} {
    padding-bottom: 5rem;
  }
`

export const BlogPostsContainer = styled.div`
  max-width: 45rem;

  & + & {
    margin-top: 3rem;
  }

  > * + * {
    margin-top: 0.5rem;
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(0, 0, 0, 0.2);

  font-size: 1.2rem;
  color: var(--color-text-primary);
  font-weight: 500;

  background-color: transparent;

  @media (prefers-color-scheme: dark) {
    border-color: transparent;
    background-color: var(--color-bg-overlay);
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }

  &:focus {
    outline: none;
    border-color: var(--color-text-yellow);
  }

  ${TitleContainer} & {
    margin-top: 0.5rem;
  }
`
