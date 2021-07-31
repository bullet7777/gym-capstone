import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Container,
    Dropdown,
    Image,
    Menu,
} from 'semantic-ui-react'
const Navbar = (props) => {

    if (props.loggedIn) {
        const nameText = "Hello " + props.user.name
        return (

            <Menu fixed='top' inverted color='blue' size='large'>
                <Container>
                    <Menu.Item as='a' header fitted='vertically'>
                        <Image size='mini' src='/gym_logo.png' style={{ marginRight: '1.5em' }} />
                        Gym Central
                    </Menu.Item>
                    <NavLink to="/">
                        <Menu.Item as='a'>Home</Menu.Item>
                    </NavLink>
                    <NavLink to="/payments">
                        <Menu.Item as='a'>Payments</Menu.Item>
                    </NavLink>
                    {
                        props.user.is_admin || props.user.is_owner ?
                            <NavLink to="/packages">
                                <Menu.Item as='a'>Packages</Menu.Item>
                            </NavLink> 
                            : null
                    }
                    {
                        props.user.is_admin || props.user.is_owner ?
                            <NavLink to="/users">
                                <Menu.Item as='a'>Users</Menu.Item>
                            </NavLink> 
                            : null
                    }
                    <Menu.Item position='right' fitted='false'>
                        <Dropdown item simple text={nameText} position='right'>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={props.logoutUser}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Container>
            </Menu>
        )

    } else {
        return (
            <div></div>
        )

    }

}

export default Navbar
