const activeUsersContainer = document.querySelector('#active-users')

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

    socket.on('active-users', (users) => {
      let content = ''

      users.forEach((user) => {
        content += `
          <li class="list-disc text-green-300 text-md font-bold">${user.name}
          <br>
          <small class="text-slate-100 text-xs font-light">${user.uid}</small></li>
          `
      })

      activeUsersContainer.innerHTML = content
    })
  }
}

window.addEventListener('load', async function () {
  await checkToken()
})
