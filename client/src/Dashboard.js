import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
const Dashboard = ({ loggedIn }) => {
    const history = useHistory()
    if (!loggedIn) {
        history.push('/login')
    }

    return (<div>Dashboard</div>)
}

export default Dashboard;