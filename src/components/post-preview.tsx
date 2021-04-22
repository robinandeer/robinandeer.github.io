import styled from '@emotion/styled'
import { mediaQuery } from 'styles/theme'
import { RiArrowRightLine } from 'react-icons/ri'

const PostPreview = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;

  & + & {
    margin-top: 0.5rem;
  }

  ${mediaQuery[1]} {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 5rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }

  &:focus {
    outline: none;
    border-color: var(--color-text-yellow);
  }
`

export const StyledArrowRight = styled(RiArrowRightLine)`
  color: var(--color-text-yellow);

  ${PostPreview} & {
    display: none;

    position: absolute;
    right: 1.5rem;
    opacity: 0.5;
    transition: all 0.1s;
    transform: scale(0.95);

    ${mediaQuery[1]} {
      display: block;
    }
  }

  ${PostPreview}:hover & {
    opacity: 1;
    right: 1.3rem;
    transform: scale(1);
  }
`

export default PostPreview
