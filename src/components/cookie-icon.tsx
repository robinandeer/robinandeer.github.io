import styled from '@emotion/styled'

interface Props {
  className?: string
}

const BaseCookieIcon: React.FC<Props> = (props) => (
  <svg viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.1163 8.633C18.2885 7.88912 17 6.09502 17 3.99997C17 2.92164 17.3414 1.92303 17.9219 1.10632C7.85272 2.14582 0 10.6557 0 20.9997C0 32.0454 8.9543 40.9997 20 40.9997C31.0457 40.9997 40 32.0454 40 20.9997C40 19.3132 39.7913 17.6755 39.3982 16.111C38.6922 17.2451 37.4343 18 36 18C34.6916 18 33.5299 17.3718 32.8001 16.4005C31.463 17.4049 29.801 18 28 18C23.5817 18 20 14.4183 20 10C20 9.53395 20.0399 9.07722 20.1163 8.633ZM36 10C36.2573 10 36.5089 10.0243 36.7526 10.0707C36.4904 9.66964 36.2142 9.27858 35.9247 8.8982C35.9744 9.25837 36 9.62619 36 10Z"
      fill="#FFB300"
    />
    <circle cx="8" cy="20.9996" r="3" fill="#683529" />
    <circle cx="26" cy="30.9996" r="3" fill="#683529" />
    <circle cx="30" cy="2" r="2" fill="#FFB300" />
    <circle cx="28.5" cy="8.5" r="1.5" fill="#FFB300" />
    <circle cx="36.5" cy="10.5" r="1.5" fill="#FFB300" />
    <circle cx="13.5" cy="31.4996" r="2.5" fill="#683529" />
    <circle cx="18.5" cy="21.4996" r="1.5" fill="#683529" />
    <circle cx="12.5" cy="11.4996" r="1.5" fill="#683529" />
    <circle cx="31.5" cy="22.4996" r="1.5" fill="#683529" />
  </svg>
)

const CookieIcon = styled(BaseCookieIcon)`
  height: 41px;
`

export default CookieIcon
