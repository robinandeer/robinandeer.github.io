import React from "react";
import { withRouteData, Link } from "react-static";
import convert from "htmr";
import styled from "styled-components";
import { MdArrowBack } from "react-icons/md";

import BlogPost from "../components/templates/BlogPost";
import { media } from "../theme";

const PostHeader = styled.div`
	text-align: center;
	padding: 0 16px;

	${media.tablet`padding: 16px 0 16px;`};
`;

const Title = styled.h1`
	font-size: 32px;
	color: ${props => props.theme.colors.headings};
	font-weight: 500;
	${media.tablet`font-size: 40px;`};
`;

const Date = styled.div`
	font-size: 14px;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	color: ${props => props.theme.colors.shades[5]};
	padding: 2px 8px;
	background-color: ${props => props.theme.colors.shades[0]};
	display: inline-block;
	border-radius: 4px;
`;

const Divider = styled.hr`
	border: 0;
	height: 2px;
	background-color: ${props => props.theme.colors.shades[0]};
	margin: 32px 0;
`;

const BackLink = styled.div`
	background-color: ${props => props.theme.colors.shades[4]};
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	border-radius: 50%;
	opacity: 0.95;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.colors.text};
	position: fixed;
	bottom: ${props => props.theme.spacing.small};
	left: ${props => props.theme.spacing.small};
	height: 56px;
	width: 56px;

	&:hover {
		color: ${props => props.theme.colors.headings};
	}

	&:active {
		opacity: 0.6;
	}

	${media.desktop`
		top: ${props => props.theme.spacing.small};
	`};
`;

const PostPage = ({ post }) => (
	<React.Fragment>
		<Link exact to="/">
			<BackLink>
				<MdArrowBack size="28" />
			</BackLink>
		</Link>
		<BlogPost>
			<PostHeader>
				<Date>{post.dateStr}</Date>
				<Title>{post.title}</Title>
			</PostHeader>
			<Divider />
			{convert(post.contents)}
		</BlogPost>
	</React.Fragment>
);

export default withRouteData(PostPage);
