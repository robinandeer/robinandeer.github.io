import React from "react";

import Intro from "../components/Intro";
import PostListContainer from "../containers/PostListContainer";

const HomePage = () => (
	<React.Fragment>
		<Intro />
		<PostListContainer />
	</React.Fragment>
);

export default HomePage;
