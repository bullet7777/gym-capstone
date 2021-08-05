import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

const AddClass = ({ addAClass }) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [classLimit, setClassLimit] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault(e)
        addAClass({
            name: name,
            price: price,
            class_limit: classLimit
        })
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Class Name' placeholder='Class Name'
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <Form.Input fluid label='Price' placeholder='Price'
                    type="text"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <Form.Input fluid label='Class Limit' placeholder='Class Limit'
                    type="text"
                    id="classLimit"
                    value={classLimit}
                    onChange={(e) => setClassLimit(e.target.value)} />

            </Form.Group>

            <Form.Button>Submit</Form.Button>
        </Form>
    )
}

export default AddClass