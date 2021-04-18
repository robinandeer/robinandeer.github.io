import styled from '@emotion/styled'
import { HomeSection } from 'screens/home/components'
import { mediaQuery } from 'styles/theme'
import PostPreview from './post-preview'

const Text = styled.p<{ type?: 'muted'; size?: 'large' | 'medium' | 'small' }>`
  font-size: ${({ size }) => (size === 'large' ? '2rem' : size === 'small' ? '1rem' : '1.3rem')};
  color: var(${({ type }) => (type === 'muted' ? '--color-text-secondary' : '--color-text-primary')});
  font-weight: 500;

  ${HomeSection} & {
    text-align: center;

    ${mediaQuery[1]} {
      text-align: left;
      font-size: ${({ size }) => (size === 'large' ? '2.2rem' : '1.4rem')};
    }
  }

  ${PostPreview} & {
    text-align: left;
    font-size: 1rem;

    ${mediaQuery[1]} {
      font-size: 1.1rem;
    }
  }
`

export default Text
