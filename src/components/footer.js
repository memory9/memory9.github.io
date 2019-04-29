import React from 'react'
import { rhythm } from '../utils/typography'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <a href="https://github.com/memory9" rel="noopener noreferrer">
          github
        </a>{' '}
        &bull;{' '}
        <a href="mailto:mamingrui9@gmail.com" rel="noopener noreferrer">
          email
        </a>{' '}
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    )
  }
}

export default Footer
