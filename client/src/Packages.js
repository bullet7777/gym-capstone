import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Table, Header, Icon } from 'semantic-ui-react'
const Packages = ({ loggedIn, user }) => {
    const history = useHistory()
    const [packages, setPackages] = useState([])
    if (!loggedIn) {
        history.push('/login')
    }
    useEffect(() => {
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
    }, [])
    return (
        <Container style={{ paddingTop: '5em' }}>
            <Header as='h2'>
                <Icon name='calendar check outline' />
                <Header.Content>
                    Packages
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

                {packages.map(p => <Table.Body>
                    <Table.Row>

                        <Table.Cell>{p.name}</Table.Cell>


                        <Table.Cell>$ {p.price}</Table.Cell>
                        <Table.Cell> <span className='stay'>{p.users.length}</span> / <span className='stay'>{p.class_limit}</span></Table.Cell>

                    </Table.Row>
                </Table.Body>
                )}</Table>
        </Container>
    )
}

export default Packages;