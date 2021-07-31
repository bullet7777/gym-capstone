import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Table,Header,Icon} from 'semantic-ui-react'
const Payments = ({ loggedIn, user }) => {
    const history = useHistory()
    const [payments, setPayments] = useState([])
    if (!loggedIn) {
        history.push('/login')
    }
    useEffect(() => {
        fetch(`/payments`)
            .then(r => {
                if (r.ok) {
                    r.json()
                        .then(u => {
                            setPayments(u)
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
                Payments
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

                        <Table.HeaderCell rowSpan='2'>Class</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                {payments.map(p => <Table.Body>
                    <Table.Row>
                        {
                            user.is_admin || user.is_owner ?
                                <Table.Cell>{p.user.name}</Table.Cell>
                                : null
                        }

                        <Table.Cell>{p.package.name}</Table.Cell>
                        <Table.Cell textAlign='right'>{p.payment_date}</Table.Cell>
                    </Table.Row>
                </Table.Body>
                )}</Table>
        </Container>
    )
}

export default Payments;