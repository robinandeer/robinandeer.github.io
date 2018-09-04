import React from "react";
import { withRouteData, Link } from "react-static";

import PostList from "../components/PostList";
import PostPreview from "../components/PostPreview";

export default withRouteData(({ years }) => {
	const groups = years.map(year => ({
		title: year.year,
		items: year.posts
	}));

	return (
		<PostList
			groups={groups}
			renderHeader={title => <PostList.Header>{title}</PostList.Header>}
			renderItem={(item, index) => (
				<Link key={index} to={`/blog${item.link}/`}>
					<PostList.Item>
						<PostPreview {...item} />
					</PostList.Item>
				</Link>
			)}
		/>
	);
});
