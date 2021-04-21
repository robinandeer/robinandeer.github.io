import styled from '@emotion/styled'
import { breakpoint, mediaQuery } from 'styles/theme'

export const Main = styled.main`
  padding: 3rem 1rem;

  max-width: ${breakpoint[1]}px;
  margin: 0 auto;

  ${mediaQuery[1]} {
    padding: 5rem 1rem;
  }
`

export const PageTitle = styled.h1`
  font-size: calc(1.5rem + 3vw);
  line-height: 1.3;
  font-weight: 700;
`

export const TitleContainer = styled.div`
  padding-bottom: 3rem;

  ${mediaQuery[1]} {
    padding-bottom: 5rem;
  }
`

export const BlogPostsContainer = styled.div`
  & + & {
    margin-top: 3rem;
  }

  > * + * {
    margin-top: 0.5rem;
  }
`
