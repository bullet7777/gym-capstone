import React, { useState, useEffect } from 'react'
import EditClass from './EditClass'
import { Container, Table, Header, Icon, Button } from 'semantic-ui-react';

const ClassPackage = (props) => {
   const [packages, setPackages] = useState("")
   const [formFlag, setFormFlag] = useState(false)

   useEffect(() => {
      console.log("hi")
      console.log(props.match.params.id)
      fetch(`/packages/${props.match.params.id}`)
         .then(r => r.json())
         .then(data => {
            if (data.errors) {
               props.setError(data)
            } else {
               console.log(data)
               setPackages(data)
            }

         })
   }, [])
   const editClass = (updatedClass) => {

      fetch(`/packages/${props.match.params.id}`, {
         method: "PATCH",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(updatedClass)

      })
         .then(r => r.json())
         .then(data => {
            if (data.errors) {
               props.setError(data)
            }
            else {
               setFormFlag(false)
               setPackages(data)
            }
         })
   }

   return (

      <Container style={{ paddingTop: '5em' }}>
         <Header as='h2'>
            <Icon name='box' />
            <Header.Content>
               Class Specifications
               <Header.Subheader></Header.Subheader>
            </Header.Content>

         </Header>
         <Table celled structured>
            <Table.Header>
               <Table.Row>
                  <Table.HeaderCell rowSpan='2'>Class Name</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Price</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Class Limit</Table.HeaderCell>
               </Table.Row>
            </Table.Header>
            <Table.Body>
               <Table.Row>
                  <Table.Cell>{packages.name}</Table.Cell>
                  <Table.Cell>{packages.price}</Table.Cell>
                  <Table.Cell textAlign='right'>{packages.class_limit}</Table.Cell>
               </Table.Row>
            </Table.Body>
         </Table>
         {formFlag ?
            <div>
               <EditClass t={packages} editAClass={editClass} />

            </div> : <Button onClick={() => setFormFlag(true)}>Edit Class</Button>}
      </Container >
   )

}

export default ClassPackage