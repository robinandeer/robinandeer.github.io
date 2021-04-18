import styled from '@emotion/styled'
import BaseLink from 'next/link'
import { breakpoint, mediaQuery } from 'styles/theme'

export const Link = styled(BaseLink)`
  color: var(--color-text-link);
`

export const Main = styled.main`
  padding: 3rem 1.5rem;

  max-width: calc(${breakpoint[1]}px - 8rem);
  margin: 0 auto;

  ${mediaQuery[1]} {
    padding: 6rem 1.5rem;
  }
`

export const HomeSection = styled.section`
  display: grid;
  gap: 1rem;

  & + & {
    margin-top: 4rem;

    ${mediaQuery[1]} {
      margin-top: 5rem;
    }
  }

  ${mediaQuery[1]} {
    gap: 0;
    grid-template-columns: 12rem 1fr;
  }
`

export const SectionAside = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SectionBody = styled.div``
