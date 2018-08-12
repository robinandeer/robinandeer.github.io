import React from "react";
import { withRouteData, Link } from "react-static";
import styled from "styled-components";
//
import theme from "../theme";
import PostPreview from "../components/organisms/PostPreview";
import Divider from "../components/atoms/Divider";
import Intro from "../components/organisms/Intro";

const Wrapper = styled.div`
	padding: 0;
`;

const YearContainer = styled.div``;
const YearTitle = styled.div`
	text-align: center;
	margin: -48px auto 0;
	background-color: ${theme.colors.shades[0]};
	border-radius: 24px;
	width: 100px;
	padding: 4px 0;
	font-weight: 500;
	font-size: 16px;
`;

const YearDivider = styled(Divider)`
	margin-top: 64px;
`;

const PostPreviewBlock = styled(PostPreview)`
	margin: 40px auto;
`;

export default withRouteData(({ years }) => (
	<Wrapper>
		<Intro />
		{years.map(year => (
			<YearContainer key={year.year}>
				<YearDivider />
				<YearTitle>{year.year}</YearTitle>
				{year.posts.map(post => (
					<PostPreviewBlock key={post.slug} category={post.category}>
						<Link to={`/blog${post.link}/`}>{post.title}</Link>
					</PostPreviewBlock>
				))}
			</YearContainer>
		))}
	</Wrapper>
));
