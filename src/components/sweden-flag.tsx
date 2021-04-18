import styled from '@emotion/styled'

interface Props {
  className?: string
}

const BaseSwedenFlag: React.FC<Props> = (props) => (
  <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256">
      <circle cx="128" cy="128" r="128" fill="#C4C4C4" />
    </mask>
    <g mask="url(#mask0)">
      <rect x="-9" y="-5" width="275" height="267" fill="#0076D9" />
      <rect x="77" y="-5" width="40" height="267" fill="#FFBF00" />
      <rect x="266" y="108" width="40" height="275" transform="rotate(90 266 108)" fill="#FFBF00" />
    </g>
  </svg>
)

const SwedenFlag = styled(BaseSwedenFlag)`
  height: 40px;
  width: 40px;
`

export default SwedenFlag
