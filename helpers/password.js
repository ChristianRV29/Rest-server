const generateRandomPassword = () => {
  let password = ''
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (let i = 0; i < 8; i++) {
    const random = Math.floor(Math.random() * str.length)

    password += str[random]
  }

  return password
}

module.exports = {
  generateRandomPassword
}
