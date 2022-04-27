const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const firstname = CreateUser.querySelector('.firstname').value
  const lastname = CreateUser.querySelector('.lastname').value
  const email = CreateUser.querySelector('.email').value
  const password = CreateUser.querySelector('.password').value
  post('/createUser', { firstname, lastname, email, password })
})
function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}