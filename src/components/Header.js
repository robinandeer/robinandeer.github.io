import styled from "styled-components";

const Header = styled.div`
	background-color: ${props => props.theme.colors.shades[3]};
	height: 56px;
	border-bottom: 2px solid ${props => props.theme.colors.shades[0]};
`;

export default Header;
