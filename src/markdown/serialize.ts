import { MarkdownMetadata, EncodableMarkdownMetadata } from 'types'

const MarkdownSerializer = {
  jsonify(data: MarkdownMetadata): EncodableMarkdownMetadata {
    return { ...data, date: data.date.toString() }
  },

  parse(data: EncodableMarkdownMetadata): MarkdownMetadata {
    return { ...data, date: new Date(data.date) }
  },
}

export default MarkdownSerializer
