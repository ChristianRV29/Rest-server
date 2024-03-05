const activeUsersContainer = document.querySelector('#active-users')
const allMessagesContainer = document.querySelector('#all-messages')
const form = document.querySelector('form')
const messageInput = document.querySelector('#message')

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
    const { token, user } = data

    document.title = `Welcome ${user.name}!`

    const socket = io({
      extraHeaders: {
        'x-token': token
      }
    })

    socket.on('active-users', (users) => {
      let content = ''

      users.forEach(({ name, uid }) => {
        content += `
          <li class="list-disc text-green-300 text-md font-bold">${name}
          <br>
          <small class="text-slate-100 text-xs font-light">${uid}</small></li>
          `
      })

      activeUsersContainer.innerHTML = content
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()

      socket.emit('message', { message: messageInput.value, user })
    })

    socket.on('all-messages', (messages = []) => {
      if (messages.length > 0) {
        let messagesContent = ''

        messages.forEach(({ content, sender, timestamp }) => {
          messagesContent += `<li class="list-disc text-slate-100 text-md font-bold">${content}
            <br>
            <small class="text-slate-300 text-xs font-light">${
              sender.name
            } - ${new Date(timestamp).toLocaleString()}</small>
          </li>
          `
        })

        allMessagesContainer.innerHTML = messagesContent
      }
    })
  } else {
    window.location.href = '/'
    localStorage.removeItem('token')
  }
}

window.addEventListener('load', async function () {
  await checkToken()
})
