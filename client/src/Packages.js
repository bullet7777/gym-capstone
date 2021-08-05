import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import AddClass from './AddClass';
import { Container, Table, Header, Icon, Button, Modal } from 'semantic-ui-react'


const Packages = ({ loggedIn, setError }) => {
    const history = useHistory()
    const [packages, setPackages] = useState([])
    const [formFlag, setFormFlag] = useState(false)


    if (!loggedIn) {
        history.push('/login')
    }
    useEffect(() => {
        fetch(`/packages`)
            .then(r => r.json())
            .then(r => {
                if (r.errors) {
                    setError(r)
                } else {
                    setPackages(r)
                }
            })
    }, [])


    const addClass = (p) => {
        fetch('/packages', {
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
                    setPackages([...packages, data])
                    setFormFlag(false)

                }

            })

    }
    const deletePackage = (u) => {
        fetch(`/packages/${u.id}`, {
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
                    const newPackage = packages.filter(t => t.id !== u.id)
                    setPackages(newPackage)
                }
            })

    }



    return (
        <Container style={{ paddingTop: '5em' }}>

            <Header as='h2'>
                <Icon name='box' />
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
                        <Table.HeaderCell rowSpan='2'>Delete Class</Table.HeaderCell>


                    </Table.Row>
                </Table.Header>

                {packages.map(p => <Table.Body>
                    <Table.Row className="pointer">

                        <Table.Cell onClick={() => { history.push(`/packages/${p.id}`) }}>{p.name}</Table.Cell>


                        <Table.Cell>$ {p.price}</Table.Cell>
                        <Table.Cell> <span className='stay'>{p.class_limit}</span></Table.Cell>
                        <Table.Cell onClick={() => deletePackage(p)}><Button basic color='red'>DELETE</Button></Table.Cell>

                    </Table.Row>
                </Table.Body>
                )}</Table>
            {formFlag ?
                <div>
                    <AddClass addAClass={addClass} />


                </div>
                :
                <Button onClick={() => setFormFlag(true)}>Add New Class</Button>
            }

        </Container>
    )
}


export default Packages;