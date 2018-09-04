import React from "react";
import styled from "styled-components";

import { media } from "../theme";

const Wrapper = styled.div`
	background-color: ${props => props.theme.colors.shades[3]};
	padding: ${props => props.theme.spacing.smallest}
		${props => props.theme.spacing.smaller};
	border-radius: 4px;
	display: flex;
	flex-direction: row;
	align-items: center;

	> div:first-child {
		margin-right: ${props => props.theme.spacing.smaller};

		${media.tablet`
			margin-left: ${props => props.theme.spacing.smaller};
			margin-right: 0;
		`};
	}
`;
const Dot = styled.div`
	height: 12px;
	width: 12px;
	background-color: ${props => props.color};
	border-radius: 50%;
	order: 1;

	${media.tablet`
		order: 3;
	`};
`;
const Label = styled.div`
	color: ${props => props.theme.font.color.default};
	font-size: ${props => props.theme.font.size.small};
	text-transform: uppercase;

	order: 2;
`;

const Badge = ({ children, color, className }) => (
	<Wrapper className={className}>
		<Dot color={color} />
		<Label>{children}</Label>
	</Wrapper>
);

export default Badge;
