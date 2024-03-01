const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client()

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''

async function verify(token = '') {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  })

  const { email, name, img } = ticket.getPayload()

  return {
    email,
    img,
    name
  }
}

// verify().catch(console.error)

module.exports = {
  verify
}
