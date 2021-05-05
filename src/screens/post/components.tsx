import styled from '@emotion/styled'
import { mediaQuery } from 'styles/theme'

export const Main = styled.main`
  padding: 5vw 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQuery[1]} {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`
