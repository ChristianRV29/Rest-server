const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => response.json())
    .then(({ message, success, data }) => {
      alert(message)

      if (success) {
        const { token } = data

        localStorage.setItem('token', token)

        window.location = '/chat.html'
      }
    })
    .catch(console.error)
})
