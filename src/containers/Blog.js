import React from 'react'
import { withRouteData, Link } from 'react-static'
//
import PostPreview from '../components/organisms/PostPreview'

export default withRouteData(({ posts }) => (
  <div>
    {posts.map(post => (
      <PostPreview key={post.slug} category={post.category}>
        <Link to={`/blog/${post.slug}/`}>{post.title}</Link>
      </PostPreview>
    ))}
  </div>
))
