import { BlogPostMetadata, EncodableBlogPostMetadata } from 'types'

const BlogPost = {
  jsonify(data: BlogPostMetadata): EncodableBlogPostMetadata {
    return { ...data, date: data.date.toString() }
  },

  parse(data: EncodableBlogPostMetadata): BlogPostMetadata {
    return { ...data, date: new Date(data.date) }
  },
}

export default BlogPost
