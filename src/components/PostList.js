import styled from "styled-components";

import StickyListHeader from "./StickyHeaderList";
import { media } from "../theme";

const PostList = styled(StickyListHeader)`
	max-width: 800px;
	margin: 0 auto;
`;
PostList.Header = styled.div`
	padding: ${props => props.theme.spacing.small} 0;
	text-align: center;
	background-color: ${props => props.theme.colors.shades[4]};
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	border-radius: 4px;
	margin: 0 ${props => props.theme.spacing.smaller};
	opacity: 0.95;
`;
PostList.Item = styled.div`
	margin: 0 ${props => props.theme.spacing.smaller};
	padding: ${props => props.theme.spacing.medium}
		${props => props.theme.spacing.smaller};
	transition: background-color 0.3s;

	${media.tablet`
		padding: ${props => props.theme.spacing.large}
			${props => props.theme.spacing.medium};

		&:hover {
			background-color: rgba(255, 255, 255, .03);
			border-radius: 4px;
		}
	`};
`;

export default PostList;
