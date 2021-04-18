import styled from '@emotion/styled'

interface Props {
  className?: string
}

const BaseBlogIcon: React.FC<Props> = (props) => (
  <svg viewBox="0 0 80 54" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M40 20V11.5C40 10.9477 40.4477 10.5 41 10.5H59C59.5523 10.5 60 10.0523 60 9.5V0"
      stroke="#546E7A"
      strokeWidth="4"
    />
    <path
      d="M0 21C0 20.4477 0.447715 20 1 20H79C79.5523 20 80 20.4477 80 21V53C80 53.5523 79.5523 54 79 54H0.999999C0.447714 54 0 53.5523 0 53V21Z"
      fill="#8CBCD6"
    />
    <path d="M4 45H10V50H5C4.44772 50 4 49.5523 4 49V45Z" fill="#E1F5FE" />
    <rect x="20" y="45" width="40" height="5" fill="#E1F5FE" />
    <rect x="12" y="45" width="6" height="5" fill="#E1F5FE" />
    <rect x="13" y="31" width="6" height="5" fill="#E1F5FE" />
    <rect x="21" y="31" width="6" height="5" fill="#E1F5FE" />
    <rect x="4" y="38" width="11" height="5" fill="#E1F5FE" />
    <rect x="65" y="38" width="11" height="5" fill="#E1F5FE" />
    <rect x="53" y="31" width="6" height="5" fill="#E1F5FE" />
    <rect x="62" y="45" width="6" height="5" fill="#E1F5FE" />
    <rect x="61" y="31" width="6" height="5" fill="#E1F5FE" />
    <rect x="69" y="31" width="7" height="5" fill="#E1F5FE" />
    <rect x="37" y="31" width="6" height="5" fill="#E1F5FE" />
    <rect x="4" y="31" width="7" height="5" fill="#E1F5FE" />
    <rect x="45" y="31" width="6" height="5" fill="#E1F5FE" />
    <rect x="29" y="31" width="6" height="5" fill="#E1F5FE" />
    <rect x="57" y="38" width="6" height="5" fill="#E1F5FE" />
    <rect x="41" y="38" width="6" height="5" fill="#E1F5FE" />
    <rect x="25" y="38" width="6" height="5" fill="#E1F5FE" />
    <rect x="49" y="38" width="6" height="5" fill="#E1F5FE" />
    <rect x="33" y="38" width="6" height="5" fill="#E1F5FE" />
    <rect x="17" y="38" width="6" height="5" fill="#E1F5FE" />
    <path d="M4 25C4 24.4477 4.44772 24 5 24H15V29H4V25Z" fill="#E1F5FE" />
    <path d="M65 24H75C75.5523 24 76 24.4477 76 25V29H65V24Z" fill="#E1F5FE" />
    <rect x="57" y="24" width="6" height="5" fill="#E1F5FE" />
    <rect x="41" y="24" width="6" height="5" fill="#E1F5FE" />
    <rect x="25" y="24" width="6" height="5" fill="#E1F5FE" />
    <rect x="49" y="24" width="6" height="5" fill="#E1F5FE" />
    <rect x="33" y="24" width="6" height="5" fill="#E1F5FE" />
    <rect x="17" y="24" width="6" height="5" fill="#E1F5FE" />
    <path d="M70 45H76V49C76 49.5523 75.5523 50 75 50H70V45Z" fill="#E1F5FE" />
  </svg>
)

const BlogIcon = styled(BaseBlogIcon)`
  height: 42px;
`

export default BlogIcon
