import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Header, Icon, Item, Button, Modal, Table } from 'semantic-ui-react';
const Dashboard = ({ loggedIn, user }) => {
    const history = useHistory()
    const [packages, setPackages] = useState([])
    const [userPackages, setUserPackages] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')


    if (!loggedIn) {
        history.push('/login')
    }

    const updatePackages = () => {
        fetch(`/users/packages`)
            .then(r => {
                if (r.ok) {
                    r.json()
                        .then(u => {
                            setUserPackages(u)
                        })
                } else {

                }
            })

        fetch(`/packages`)
            .then(r => {
                if (r.ok) {
                    r.json()
                        .then(u => {
                            setPackages(u)
                        })
                } else {

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
                if (r.ok) {
                    updatePackages()
                } else {
                    setShowModal(true)
                    setError(r.errors.map(u => u))
                }
            })

    }
    return (<Container style={{ paddingTop: '5em' }}>
        <Modal
            open={showModal}
            header='Error'
            content={error}
            onClose={() => setShowModal(false)}
            actions={[{ key: 'done', content: 'Done' }]}
        />

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
        }

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

                    {
                        packages.map(p => {

                            const isEnrolled = userPackages.find(up => up.id === p.id) !== undefined
                            const isFullClass = p.users.length === p.class_limit
                            console.log(isEnrolled)
                            return (

                                <Table celled structured>

                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell rowSpan='2'>Class Name</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2'>Price</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2'>Class Limit</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2'>Buy Class</Table.HeaderCell>

                                        </Table.Row>
                                    </Table.Header>

                                    {packages.map(p => <Table.Body>
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
                                    )}</Table>

                            )
                        })
                    }


                </Item.Group>

            }
        </div>
    </Container>)
}

export default Dashboard;