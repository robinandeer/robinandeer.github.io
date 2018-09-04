import React from "react";
import { withRouteData, Link } from "react-static";
import convert from "htmr";
import styled from "styled-components";
import { MdArrowBack } from "react-icons/md";

import BlogPost from "../components/templates/BlogPost";
import Header from "../components/Header";
import { media } from "../theme";

const PostHeader = styled.div`
	text-align: center;
	padding: 0 16px;

	${media.tablet`padding: 16px 0 24px;`};
`;

const Title = styled.h1`
	margin-top: 0;
`;

const Date = styled.div`
	font-size: 14px;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	color: ${props => props.theme.colors.shades[5]};
`;

const Divider = styled.hr`
	border: 0;
	height: 2px;
	background-color: ${props => props.theme.colors.shades[0]};
	margin: 32px 0;
`;

const BackLink = styled.div`
	height: 100%;
	display: inline-flex;
	align-items: center;
	padding: 0 16px;
	color: ${props => props.theme.colors.text};
	border-right: 2px solid ${props => props.theme.colors.shades[0]};

	&:hover {
		color: ${props => props.theme.colors.headings};
		background-color: ${props => props.theme.colors.shades[4]};
	}

	> svg {
		margin-right: 4px;
	}
`;

export default withRouteData(({ post }) => (
	<React.Fragment>
		<Header>
			<Link exact to="/">
				<BackLink>
					<MdArrowBack size="28" />
				</BackLink>
			</Link>
		</Header>
		<BlogPost>
			<PostHeader>
				<Date>{post.dateStr}</Date>
				<Title>{post.title}</Title>
			</PostHeader>
			<Divider />
			{convert(post.contents)}
		</BlogPost>
	</React.Fragment>
));
