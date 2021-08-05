import React,{ useState } from 'react'
import {Form,Container} from 'semantic-ui-react'

const EditClass = (props) => {
    
    const [name,setName] = useState(props.t.name)
    const [price,setPrice] = useState(props.t.price)
    const [classLimit, setClassLimit] = useState(props.t.class_limit)

const handleSubmit = (e) => {
    e.preventDefault(e)
    props.editAClass({
        name: name,
        price: price,
        class_limit: classLimit
    })
  
 }

    return (
        <Container>
        <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Class Name' placeholder='Class Name' 
           type="text"
           id="name"
           value={name}
           onChange={(e) => setName(e.target.value)}/>
          <Form.Input fluid label='Price' placeholder='Price' 
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}/>
          <Form.Input fluid label='Class Limit' placeholder='Class Limit'
           type="text"
           id="classLimit"
           value={classLimit}
           onChange={(e) => setClassLimit(e.target.value)} />
      
        </Form.Group>
     
        
        <Form.Button>Submit</Form.Button>
      </Form>
      </Container>
    )
}

export default EditClass