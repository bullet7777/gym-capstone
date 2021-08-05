import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Header, Icon, Item, Button, Table } from 'semantic-ui-react';



const Dashboard = ({ loggedIn, setError, user }) => {
    const history = useHistory()
    const [packages, setPackages] = useState([])
    const [userPackages, setUserPackages] = useState([])


    if (!loggedIn) {
        history.push('/login')
    }

    const updatePackages = () => {
        fetch(`/users/packages`)
            .then(r => r.json())
            .then(r => {
                console.log(r)
                if (r.errors) {
                    setError(r)
                } else {
                    setUserPackages(r)
                }
            })

        fetch(`/packages`)
            .then(r => r.json())
            .then(r => {
                if (r.errors) {
                    setError(r)
                } else {
                    setPackages(r)
                }
            })
    }
    useEffect(() => {
        updatePackages()
    }, [])

    const enroll = (package_id) => {
        fetch('/payments', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ package_id: package_id })
        })
            .then(r => r.json())
            .then(r => {
                if (r.errors) {
                    setError(r)

                } else {
                    updatePackages()

                }
            })

    }
    return (<Container style={{ paddingTop: '5em' }}>
        {user.is_owner || user.is_admin ? null
            :
            <div>
                <Header as='h2'>
                    <Icon name='calendar check outline' />
                    <Header.Content>
                        Enrolled Classes
                        <Header.Subheader></Header.Subheader>
                    </Header.Content>

                </Header>
                {userPackages.length === 0 ? "No Classes Enrolled" :
                    <Table celled structured>

                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell rowSpan='2'>Class Name</Table.HeaderCell>
                                <Table.HeaderCell rowSpan='2'>Price</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        {userPackages.map(p => <Table.Body>
                            <Table.Row>

                                <Table.Cell>{p.name}</Table.Cell>


                                <Table.Cell>$ {p.price}</Table.Cell>

                            </Table.Row>
                        </Table.Body>
                        )}</Table>
                }</div>}

        <Header as='h2'>
            <Icon name='calendar check' />
            <Header.Content>
                Available classes
                <Header.Subheader>Signup to any of the classes below</Header.Subheader>
            </Header.Content>

        </Header>
        <div>
            {packages.length === 0 ? "No Classes to Enroll in" :
                <Item.Group>
                    <Table celled structured>

                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell rowSpan='2'>Class Name</Table.HeaderCell>
                                <Table.HeaderCell rowSpan='2'>Price</Table.HeaderCell>
                                <Table.HeaderCell rowSpan='2'>Class Limit</Table.HeaderCell>
                                <Table.HeaderCell rowSpan='2'>Buy Class</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        {
                            packages.map(p => {

                                const isEnrolled = userPackages.find(up => up.id === p.id) !== undefined
                                const isFullClass = p.users.length === p.class_limit
                                console.log(isEnrolled)
                                return (
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>{p.name}</Table.Cell>
                                            <Table.Cell>$ {p.price}</Table.Cell>
                                            <Table.Cell> <span className='stay'>{p.users.length}</span> / <span className='stay'>{p.class_limit}</span></Table.Cell>
                                            <Table.Cell> <Button disabled={isEnrolled || isFullClass} onClick={() => enroll(p.id)} animated='vertical'>
                                                <Button.Content hidden>Enroll</Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='shop' />
                                                </Button.Content>
                                            </Button></Table.Cell>
                                        </Table.Row>
                                    </Table.Body>


                                )
                            })
                        }</Table>


                </Item.Group>

            }

        </div>
        {user.is_owner || user.is_admin ?
            <Header as='h2'>
                <Icon name='dollar sign' />
                <Header.Content>
                    Total Earnings: {packages.reduce((acc, p) => {
                        return acc += p.price * p.users.length
                    }, 0)}

                </Header.Content>

            </Header>

            : null}
    </Container>)
}

export default Dashboard;