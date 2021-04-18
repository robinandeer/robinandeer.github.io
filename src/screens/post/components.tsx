import styled from '@emotion/styled'
import { breakpoint, mediaQuery } from 'styles/theme'

export const Main = styled.main`
  padding: 10vw 1.5rem;

  max-width: ${breakpoint[3]}px;
  margin: 0 auto;

  ${mediaQuery[1]} {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`
