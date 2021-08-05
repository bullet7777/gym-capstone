import React, { useState } from 'react'
import { Button, Form, Grid, Message, Header, Segment, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
const Signup = ({ loginUser }) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errorsList, setErrorsList] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault(e)

        if (password !== passwordConfirmation) {
            setErrorsList(["The password does not match"])
        } else {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    passwordConfirmation: passwordConfirmation
                })

            })
                .then(r => r.json())
                .then(data => {
                    if (data.errors) {
                        setPassword("")
                        setPasswordConfirmation("")
                        const errorLis = data.errors.map(e => <li>{e}</li>)
                        setErrorsList(errorLis)
                    } else {
                        loginUser(data) 
                    }
                })
        }



    }

    return ( <div style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url('/gym_login_background.jpg')`
    }}>

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }} textAlign='left' >
                <Header as='h2' color='yellow' textAlign='center'>
                    Sign up to a new account
                </Header>
                <Form onSubmit={handleSubmit} error={errorsList.length !== 0} >
                    <Segment stacked>
                        <Form.Input fluid icon='user'
                            iconPosition='left'
                            placeholder='Create a username'
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Create a password'
                            type='password'
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Comfirm password'
                            type='password'
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        <Button color='blue' fluid size='large' type='submit'>Submit</Button>
                    </Segment>
                    <Message

                        error
                        header='Please check errors below'
                        content={errorsList.map(s => s)}
                    />
                </Form>

                <Message>
                    <NavLink to="/login">
                        <Icon name="arrow left" />
                        Return to login
                    </NavLink>
                </Message>
            </Grid.Column>
        </Grid>
        </div>
    )
}

export default Signup