import React,{ useState } from 'react'
import {Form,Container} from 'semantic-ui-react'

const EditForm = (props) => {
    
    const [name,setName] = useState(props.t.name)
    const [password,setPassword] = useState(props.t.password)
    const [passwordConfirmation,setPasswordConfirmation] = useState(props.t.passwordConfirmation)

const handleSubmit = (e) => {
    e.preventDefault(e)
    props.editAForm({
        name: name,
        password: password,
        passwordConfirmation: passwordConfirmation
    })
  
 }

    return (
        <Container>
        <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='User' placeholder='User' 
           type="text"
           id="name"
           value={name}
           onChange={(e) => setName(e.target.value)}/>
          <Form.Input fluid label='Password' placeholder='Password' 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          <Form.Input fluid label='Password Confirmation' placeholder='Password Confirmation'
           type="password"
           id="passwordConfirmation"
           value={passwordConfirmation}
           onChange={(e) => setPasswordConfirmation(e.target.value)} />
      
        </Form.Group>
     
        
        <Form.Button>Submit</Form.Button>
      </Form>
      </Container>
    )
}

export default EditForm

//{isOwner?<Form.Checkbox label='Is Admin' toggle onChange={()=>setIsAdmin(!isAdmin)}
//checked={isAdmin} />
//:
//null}