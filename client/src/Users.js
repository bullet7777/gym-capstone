import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Table, Header, Icon, Button } from 'semantic-ui-react';
import AddUser from './AddUser'



const Users = ({ loggedIn, user, setError }) => {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [formFlag, setFormFlag] = useState(false)

    if (!loggedIn) {
        history.push('/login')
    }
    useEffect(() => {
        fetch(`/users`)
        .then(r => r.json())
            .then(r => {
                if (r.errors) {
                    setError(r)
                } else {
                    setUsers(r)
                }
            })
    }, [])

    const addUser = (p, isAdmin) => {
        if (isAdmin) {
            fetch('/users/admin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(p)
            })
                .then(r => r.json())
                .then(data => {
                    if (data.errors) {
                        setError(data)
                    }
                    else {
                        setUsers([...users, data])
                        setFormFlag(false)
                    }
                })

        } else {
            fetch('/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(p)
            })
                .then(r => r.json())
                .then(data => {
                    if (data.errors) {
                        setError(data)
                    }
                    else {
                        setUsers([...users, data])
                        setFormFlag(false)
                    }
                })

        }

    }
    const deleteUser = (u) => {
        fetch(`/users/${u.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (!data.ok) {
                    data.json()
                        .then(u => {
                            setError(u)
                        })

                } else {
                    const newUser = users.filter(t => t.id !== u.id) 
                    setUsers(newUser)
                }
            }

            )

    }



    return (
        <Container style={{ paddingTop: '5em' }}>
            <Header as='h2'>
                <Icon name='user' />
                <Header.Content>
                    Users
                    <Header.Subheader></Header.Subheader>
                </Header.Content>

            </Header>
            <Table celled structured>

                <Table.Header>
                    <Table.Row>
                        {user.is_admin || user.is_owner ?
                            <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                            : null
                        }

                        <Table.HeaderCell rowSpan='2'>Package Enrolled</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Date</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Delete User</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                {users.map(p => <Table.Body>




                    <Table.Row >
                        <Table.Cell className="mouse" selectable onClick={() => { history.push(`/users/${p.id}`) }}>{p.name}{user.is_owner ? p.is_admin ? ' (admin)' : null : null}</Table.Cell>
                        <Table.Cell>{p.packages.length}</Table.Cell>
                        <Table.Cell>{p.join_date}</Table.Cell>
                        <Table.Cell onClick={() => deleteUser(p)}><Button basic color='red'>DELETE</Button></Table.Cell>
                    </Table.Row>
                </Table.Body>
                )}</Table>

            {formFlag ?
                <div>
                    <AddUser isOwner={user.is_owner} addAUser={addUser} />


                </div>
                :
                <Button onClick={() => setFormFlag(true)}>Add New User</Button>
            }
        </Container>
    )
}

export default Users;
