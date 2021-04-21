import fs from 'fs'
import path from 'path'

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts')
export const RECIPES_PATH = path.join(process.cwd(), 'recipes')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((fileName) => /\.mdx?$/.test(fileName))
  .map((fileName) => path.join(POSTS_PATH, fileName))

export const recipeFilePaths = fs
  .readdirSync(RECIPES_PATH)
  // Only include md(x) files
  .filter((fileName) => /\.mdx?$/.test(fileName))
  .map((fileName) => path.join(RECIPES_PATH, fileName))