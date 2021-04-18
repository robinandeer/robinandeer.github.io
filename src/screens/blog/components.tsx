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

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;

  padding-bottom: 3rem;

  ${mediaQuery[1]} {
    padding-bottom: 5rem;
  }
`
