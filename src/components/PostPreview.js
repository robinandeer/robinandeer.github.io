import React from "react";
import styled from "styled-components";

import theme, { media } from "../theme";
import Badge from "./Badge";

const BADGE_COLORS = {
	tutorial: theme.colors.green,
	conference: theme.colors.blue,
	reflections: theme.colors.purple,
	news: theme.colors.red,
	guide: theme.colors.pink
};

const Category = styled(Badge)`
	order: 1;

	${media.tablet`
    order: 3;
  `};
`;

const Title = styled.h3`
	color: ${props => props.theme.font.color.highlight};
	font-size: ${props => props.theme.font.size.large};
	line-height: 1.6;

	${media.tablet`
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
  `};

	order: 2;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;

	> ${Category} {
		margin-bottom: ${props => props.theme.spacing.smallest};
	}

	${media.tablet`
    flex-direction: row;
		align-items: center;
  `};
`;

const PostPreview = ({ title, category, className }) => (
	<Wrapper className={className}>
		<Category color={BADGE_COLORS[category]}>{category}</Category>
		<Title>{title}</Title>
	</Wrapper>
);

export default PostPreview;
