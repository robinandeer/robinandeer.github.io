import styled from '@emotion/styled'
import { breakpoint, mediaQuery } from 'styles/theme'

const PageHeader = styled.header`
  background-color: var(--color-bg-overlay);
  height: 4rem;

  display: flex;
  align-items: center;
`

export const Navigation = styled.nav`
  flex: 1;
  display: flex;
  justify-content: space-between;

  max-width: ${breakpoint[3]}px;
  margin: 0 auto;

  padding: 0 1.5rem;

  ${mediaQuery[1]} {
    padding-left: 3rem;
    padding-right: 3rem;

    display: grid;
    gap: 1rem;
    grid-auto-flow: column;
    justify-content: flex-start;
  }

  ${PageHeader} & {
    position: relative;
    top: -3px;
  }
`

export default PageHeader
