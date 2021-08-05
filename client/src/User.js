import React, { useState, useEffect } from 'react'
import EditForm from './EditForm'
import { Container, Table, Header, Icon, Button } from 'semantic-ui-react';

const User = (props) => {
   const [user, setUser] = useState("")
   const [formFlag, setFormFlag] = useState(false)

   useEffect(() => {
      console.log("hi")
      console.log(props.match.params.id)
      fetch(`/users/${props.match.params.id}`)
         .then(r => r.json())
         .then(data => {
            if (data.errors) {
               props.setError(data)
            } else {
               setUser(data)
            }

         })
   }, [])
   const editForm = (updatedUser) => {

      fetch(`/users/${props.match.params.id}`, {
         method: "PATCH",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(updatedUser)

      })
         .then(r => r.json())
         .then(data => {
            if (data.errors) {
               props.setError(data)
            }
            else {
               setFormFlag(false)
               setUser(data)
            }
         })
   }




   return (
     
         <Container style={{ paddingTop: '5em' }}>
         <Header as='h2'>
      <Icon name='user' />
      <Header.Content>
      {user.name}
          <Header.Subheader></Header.Subheader>
      </Header.Content>
  </Header>
          {formFlag ?
            <div>
               <EditForm t={user} editAForm={editForm} />
            </div> : <Button onClick={() => setFormFlag(true)}>Edit User</Button>}

  </Container >
   )

}

export default User