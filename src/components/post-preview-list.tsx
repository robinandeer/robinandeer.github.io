import styled from '@emotion/styled'
import { HomeSection } from 'screens/home/components'
import { mediaQuery } from 'styles/theme'

const PostPreviewList = styled.div`
  ${HomeSection} & {
    margin-top: 1rem;

    ${mediaQuery[1]} {
      margin-top: 2.5rem;
      margin-left: -1.5rem;
      margin-right: -1.5rem;

      grid-column: 1 / 3;
    }
  }
`

export default PostPreviewList
