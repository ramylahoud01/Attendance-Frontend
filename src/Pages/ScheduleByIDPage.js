import React from 'react'
import MapSchedule from '../Components/Schedule/MapSchedule/MapSchedule'
import authHeader from '../Services/isAuth.service'
import { redirect } from 'react-router-dom'

function ScheduleByIDPage() {
    return (
        <div>
            <MapSchedule />
        </div>
    )
}

export default ScheduleByIDPage


export const loader = ({ req, params }) => {
    const token = authHeader()
    if (!token) {
        return redirect('/')
    }
    return null
}