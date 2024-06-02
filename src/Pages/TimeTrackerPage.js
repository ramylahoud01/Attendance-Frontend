import React from 'react'
import TimeTracker from '../Components/TimeTracker/TimeTracker'
import { redirect } from 'react-router-dom'
import authHeader from '../Services/isAuth.service'

function TimeTrackerPage() {
    return (
        <TimeTracker />
    )
}

export default TimeTrackerPage

export const loader = ({ req, params }) => {
    const token = authHeader()
    if (!token) {
        return redirect('/')
    }
    return null
}