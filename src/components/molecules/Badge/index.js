import styled from 'styled-components'
import { media } from '../../../theme'

const Badge = styled.span`
  background-color: ${props => props.color || 'white'};
  border-radius: 2px;
  padding: 1px 6px 2px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  font-size: 14px;
  user-select: none;

  ${media.tablet`
    font-size: 16px;
    padding: 2px 8px 3px;
  `};
`

export default Badge
