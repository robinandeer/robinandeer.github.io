import { getMarkdownFile, getMarkdownFiles } from './files'
import { convertMarkdown } from './jsx'

const Markdown = {
  getFiles: getMarkdownFiles,
  getFile: getMarkdownFile,
  convert: convertMarkdown,
}

export default Markdown
