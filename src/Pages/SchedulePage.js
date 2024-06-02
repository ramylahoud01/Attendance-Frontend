import React from 'react'
import MapEntireSchedule from '../Components/Schedule/EntireSchedule/MapEntireSchedule'
import authHeader from '../Services/isAuth.service'
import { redirect } from 'react-router-dom'

function SchedulePage() {
    return (
        <div>
            <MapEntireSchedule />
        </div>
    )
}

export default SchedulePage

export const loader = ({ req, params }) => {
    const token = authHeader()
    if (!token) {
        return redirect('/')
    }
    return null
}