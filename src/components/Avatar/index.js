import React from "react";
import styled from "styled-components";

import leftFace from "./face/left.png";
import rightFace from "./face/right.png";
import middleFace from "./face/middle.png";

const FACES = {
	left: leftFace,
	middle: middleFace,
	right: rightFace
};

const Wrapper = styled.div`
	width: 144px;
	height: 144px;
	border-radius: 100%;
	background: ${props =>
		props.active ? "white" : props.theme.colors.shades[0]};
	box-shadow: ${props =>
		props.active
			? "0px 2px 10px rgba(255, 255, 255, 0.8), 0px 5px 50px rgba(255, 255, 255, 0.8), 0px 8px 80px rgba(255, 255, 255, 0.6), 0px 8px 120px rgba(255, 255, 255, 0.6)"
			: "none"};
	transition: 0.5s;
	overflow: hidden;

	> img {
		height: 100%;
		width: 100%;
	}
`;

export default class Intro extends React.Component {
	constructor(props) {
		super(props);
		this.faceRef = React.createRef();
		this.state = {
			mousePosition: "middle",
			hasClickedFace: false
		};
	}

	componentDidMount() {
		window.addEventListener("mousemove", this.handleMouseMove);
	}

	componentWillUnmount() {
		window.removeEventListener("mousemove", this.handleMouseMove);
	}

	handleMouseMove = event => {
		const bulbPosition = this.faceRef.current.getBoundingClientRect();
		const relPosition = event.pageX - bulbPosition.left;
		if (relPosition < 0) {
			this.setState({ mousePosition: "left" });
		} else if (relPosition > 150) {
			this.setState({ mousePosition: "right" });
		} else {
			this.setState({ mousePosition: "middle" });
		}
	};

	render() {
		return (
			<Wrapper
				className={this.props.className}
				active={this.state.hasClickedFace}
				onClick={() =>
					this.setState({ hasClickedFace: !this.state.hasClickedFace })
				}
			>
				<img
					ref={this.faceRef}
					src={FACES[this.state.mousePosition]}
					alt="Avatar face"
				/>
			</Wrapper>
		);
	}
}
