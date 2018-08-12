import React from 'react'
import styled from 'styled-components'

import theme, { media } from '../../../theme'
import Badge from '../../molecules/Badge'

const badgeTypes = {
  tutorial: '#2e7d32', // green
  conference: '#1565c0', // blue
  reflections: '#6a1b9a', // purple
  news: '#c62828', // red
  guide: '#ad1457', // pink
}

const PostPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  max-width: 768px;
  margin: 0 auto;
`

const Title = styled.h2`
  color: ${theme.colors.headings};
  font-weight: 400;
  line-height: 1.7;
  margin: 0;
  margin-right: 32px;
  transition: color 0.3s;

  font-size: 18px;
  ${media.tablet`font-size: 20px;`};

  a {
    color: ${theme.colors.headings};
    transition: color 0.3s;
  }

  &:hover,
  a:hover {
    color: white;
  }
`

export default ({ category, className, children }) => (
  <PostPreview className={className}>
    <Title>{children}</Title>
    {category && <Badge color={badgeTypes[category]}>{category}</Badge>}
  </PostPreview>
)
