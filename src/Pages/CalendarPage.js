import React from 'react'
import authHeader from '../Services/isAuth.service'
import { redirect } from 'react-router-dom'

function CalendarPage() {

    return (
        <div>CalendarPage</div>
    )
}

export default CalendarPage


export const loader = ({ req, params }) => {
    const token = authHeader()
    if (!token) {
        return redirect('/')
    }
    return null
}