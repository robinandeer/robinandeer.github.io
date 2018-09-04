import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import { MdMail } from "react-icons/md";

import Avatar from "./Avatar";
import { media } from "../theme";

const IntroAvatar = styled(Avatar)`
	margin: 0 auto;
	margin-bottom: ${props => props.theme.spacing.large};

	${media.tablet`
		margin: 0;
	`};
`;

const Wrapper = styled.div`
	max-width: 800px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	padding: ${props => props.theme.spacing.largest}
		${props => props.theme.spacing.smaller};

	${media.tablet`
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-top: ${props => props.theme.spacing.huge};
		padding-bottom: ${props => props.theme.spacing.huge};

		> ${IntroAvatar} {
			margin-right: ${props => props.theme.spacing.large};
		}
	`};
`;

const IntroTextWrapper = styled.div`
	text-align: center;

	${media.tablet`
		text-align: left;
	`};
`;

const IntroHeading = styled.h1`
	font-size: ${props => props.theme.font.size.larger};
	color: ${props => props.theme.font.color.highlight};
	margin-bottom: ${props => props.theme.spacing.smallest};
`;

const IntroText = styled.div`
	font-size: ${props => props.theme.font.size.medium};
	line-height: 1.5;
	margin-bottom: ${props => props.theme.spacing.small};

	${media.tablet`
		font-size: ${props => props.theme.font.size.large};
	`};
`;

const FuturiceLink = styled.a`
	color: ${props => props.theme.colors.green};
`;

const IconWrapper = styled.div`
	color: white;
`;
const IconText = styled.div`
	font-weight: 500;
	white-space: nowrap;
`;
const SocialButton = styled.a`
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	background-color: ${props => props.theme.colors.shades[3]};
	padding: ${props => props.theme.spacing.smaller}
		${props => props.theme.spacing.medium};
	border-radius: 30px;
	overflow: hidden;
	margin: 0 auto;
	color: ${props => props.theme.colors.text};

	> ${IconWrapper} {
		margin-right: ${props => props.theme.spacing.small};
	}

	&:hover {
		> ${IconText} {
			color: white;
		}
	}

	${media.tablet`
		margin: 0;
	`};
`;
const TwitterButton = styled(SocialButton)`
	&:hover {
		background-color: #20aaf4;
	}
`;
const EmailButton = styled(SocialButton)`
	&:hover {
		background-color: #e25e50;
	}
`;
const SocialButtons = styled.div`
	display: flex;
	flex-direction: row;

	> ${SocialButton}:not(:last-child) {
		margin-right: ${props => props.theme.spacing.medium};
	}
`;

const Intro = ({ className }) => (
	<Wrapper className={className}>
		<IntroAvatar />
		<IntroTextWrapper>
			<IntroHeading>Robin Andeer</IntroHeading>
			<IntroText>
				Developer. Gymnast. Traveller. Mad keen on technology. <br />
				Constantly learning at{" "}
				<FuturiceLink href="https://www.futurice.com/">
					Futurice
				</FuturiceLink>{" "}
				in Stockholm.
			</IntroText>
			<SocialButtons>
				<EmailButton href="mailto:robin.andeer@gmail.com?subject=Hello">
					<IconWrapper>
						<MdMail size="18" />
					</IconWrapper>
					<IconText>Say hi</IconText>
				</EmailButton>
				<TwitterButton href="https://twitter.com/robinandeer">
					<IconWrapper>
						<FaTwitter size="18" />
					</IconWrapper>
					<IconText>Ask me anything</IconText>
				</TwitterButton>
			</SocialButtons>
		</IntroTextWrapper>
	</Wrapper>
);

export default Intro;
