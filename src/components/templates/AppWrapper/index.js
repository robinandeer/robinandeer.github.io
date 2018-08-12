import styled from "styled-components";

import theme, { media } from "../../../theme";

const AppStyles = styled.div`
	background-color: ${theme.colors.background};
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	height: 100%;

	border: 2px solid ${theme.colors.shades[0]};

	${media.tablet`
    border-radius: 16px;
    border: 10px solid ${theme.colors.shades[0]};
  `};
`;

export default AppStyles;
