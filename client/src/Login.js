import React, { useState } from 'react'
import { Button, Form, Grid, Message, Header, Segment, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

const Login = ({ loginUser }) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault(e)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password
            })

        })
            .then(r => r.json())
            .then(data => {
                if (data.errors) {
                    setError(data.errors[0])
                } else {

                    loginUser(data)
                    setError("")
                }

            })
    }

    return (
        <div style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('/gym_login_background.jpg')`
        }}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>


                <Grid.Column style={{ maxWidth: 450 }} textAlign='left'>
               
                    <Header as='h2' color='yellow' textAlign='center'>
                        Welcome to Gym Central
                    </Header>
                    <Form onSubmit={handleSubmit} error={error !== ""}>
                        <Segment stacked>

                            <Form.Input fluid icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button color='blue' fluid size='large' type='submit'>Submit</Button>
                            <Message
                                error
                                header='Authentication Failed'
                                content={error}
                            />

                        </Segment>

                    </Form>
                    <Message>
                        New to us?  <NavLink to="/signup">
                            Sign up
                        </NavLink>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>

    )
}

export default Login