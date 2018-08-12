import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-static'
import theme from '../theme'

const Centered = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Heading = styled.h1`
  color: ${theme.colors.headings};
`

const HomeLink = styled.div`
  font-size: 20px;
  color: ${theme.colors.text};

  &:hover {
    color: rgba(158, 158, 158, 1);
  }

  &:active {
    color: rgba(138, 138, 138, 0.6);
  }
`

export default () => (
  <Centered>
    <Heading>
      404 - Oh no's! We couldn't find that page{' '}
      <span role="img" aria-label="Sad">
        😕
      </span>
    </Heading>

    <Link exact to="/">
      <HomeLink>Go back home</HomeLink>
    </Link>
  </Centered>
)
