import React from "react";
import styled from "styled-components";

import leftFace from "./face/left.png";
import rightFace from "./face/right.png";
import middleFace from "./face/middle.png";
import theme, { media } from "../../../theme";
import Divider from "../../atoms/Divider";

const faces = {
  left: leftFace,
  middle: middleFace,
  right: rightFace
};

const IntroWrapper = styled.div`
  padding: 40px 0 0;
`;

const FaceWrapper = styled.div`
  width: 144px;
  height: 144px;
  border-radius: 100%;
  margin: 0 auto;
  background: ${props => (props.active ? "white" : theme.colors.shades[0])};
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

const IntroHeading = styled.h1`
  margin: 0;
  font-weight: 500;
  color: ${theme.colors.headings};

  ${media.tablet`text-align: center;`};
`;

const IntroText = styled.div`
  margin-top: 8px;
  line-height: 1.7;
  font-size: 16px;
  ${media.tablet`
    font-size: 18px;
    text-align: center;
  `};
`;

const FuturiceLink = styled.a`
  color: green;
`;

const IntroTextWrapper = styled.div`
  padding: 0 24px;
  margin-top: 32px;
  max-width: 500px;
  margin: 32px auto 0;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  transition: transform 0.2s;
  max-width: 500px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.03);
  }
`;
const ContactItem = styled.a`
  padding: 24px;
  transition: all 0.2s;
  flex-basis: 100%;

  ${media.tablet`flex-basis: 50%;`};

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transform: scale(1.01);
  }
`;
const ContactTitle = styled.h3`
  font-size: 16px;
  font-weight: 400;
  color: white;
  margin: 0;
  margin-bottom: 4px;
`;
const ContactSubtitle = styled.p`
  font-size: 14px;
  margin: 0;
  color: ${theme.colors.text};
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
    const { className, children } = this.props;
    return (
      <IntroWrapper className={className}>
        <FaceWrapper
          active={this.state.hasClickedFace}
          onClick={() =>
            this.setState({ hasClickedFace: !this.state.hasClickedFace })
          }
        >
          <img
            ref={this.faceRef}
            src={faces[this.state.mousePosition]}
            alt="Avatar face"
          />
        </FaceWrapper>
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
        </IntroTextWrapper>
        <Divider />
        <ContactWrapper>
          <ContactItem href="mailto:robin.andeer@gmail.com?subject=Hello">
            <ContactTitle>robin.andeer@gmail.com</ContactTitle>
            <ContactSubtitle>Say hello</ContactSubtitle>
          </ContactItem>
          <ContactItem href="https://twitter.com/robinandeer">
            <ContactTitle>@robinandeer</ContactTitle>
            <ContactSubtitle>Ask me anything</ContactSubtitle>
          </ContactItem>
        </ContactWrapper>
        {children}
      </IntroWrapper>
    );
  }
}
