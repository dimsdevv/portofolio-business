import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, url = 'https://portofolio-busines.netlify.app' }) {
  const siteTitle = title ? `${title} · origindevv` : 'origindevv · We build websites that work. hard.'
  const siteDescription = description || 'Jasa pembuatan website dan aplikasi web profesional untuk bisnis Anda. Transformasi digital yang mendominasi pasar.'
  const image = `${url}/favicon.png` // Using the logo as default OG Image

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={siteDescription} />
      
      {/* OpenGraph tags (Facebook, LinkedIn, WhatsApp) */}
      <meta property='og:title' content={siteTitle} />
      <meta property='og:description' content={siteDescription} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      
      {/* Twitter tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={siteTitle} />
      <meta name='twitter:description' content={siteDescription} />
      <meta name='twitter:image' content={image} />
    </Helmet>
  )
}
