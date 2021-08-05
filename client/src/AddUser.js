import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

const AddUser = ({ addAUser, isOwner }) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault(e)
    addAUser({
      name: name,
      password: password,
      passwordConfirmation: passwordConfirmation
    }, isAdmin)
  }

  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input fluid label='User' placeholder='User'
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <Form.Input fluid label='Password' placeholder='Password'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Form.Input fluid label='Password Confirmation' placeholder='Password Confirmation'
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)} />

      </Form.Group>
      {isOwner ? <Form.Checkbox label='Is Admin' toggle onChange={() => setIsAdmin(!isAdmin)}
        checked={isAdmin} />
        :
        null}

      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

export default AddUser