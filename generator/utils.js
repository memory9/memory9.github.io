const fs = require('fs')

const pageContent = fs.readdirSync('./content/blog')

const postExists = (post) => {
  return pageContent.indexOf(post) >= 0
}

module.exports = { postExists }
