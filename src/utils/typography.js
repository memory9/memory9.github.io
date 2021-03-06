import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

import './global.css'

Wordpress2016.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      color: 'var(--textLink)',
    },
    hr: {
      background: 'var(--hr)',
    },
    'p code': {
      fontSize: '1.1rem',
    },
    'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
      fontSize: 'inherit',
    },
    'li code': {
      fontSize: '1.1rem',
    },
    blockquote: {
      color: 'inherit',
      borderLeftColor: 'inherit',
      opacity: '0.8',
      fontSize: '1.1rem',
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
