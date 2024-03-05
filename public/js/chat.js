const checkToken = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/'
  }

  const { success, data } = await fetch('/api/auth', {
    method: 'GET',
    headers: {
      'x-token': token
    }
  })
    .then((resp) => resp.json())
    .catch(console.error)

  if (success) {
    const { token } = data

    const socket = io({
      extraHeaders: {
        'x-token': token
      }
    })
  }
}

window.addEventListener('load', async function () {
  await checkToken()
})
