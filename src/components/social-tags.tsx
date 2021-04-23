import { SITE_BANNER } from 'config'

interface Props {
  title: string
  description: string
  image?: string
  url: string
  type: 'article' | 'website'
}

export default function SocialTags(props: Props): JSX.Element {
  const { title, description, image = SITE_BANNER, url, type } = props

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
