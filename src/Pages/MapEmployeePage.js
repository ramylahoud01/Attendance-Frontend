import React from 'react'
import MapEmployee from '../Components/Employee/MapEmployee/MapEmployee'
import authHeader from '../Services/isAuth.service'
import { redirect } from 'react-router-dom'

function MapEmployeePage() {
    return (
        <div>
            <MapEmployee />
        </div>
    )
}

export default MapEmployeePage


export const loader = ({ req, params }) => {
    const token = authHeader()
    if (!token) {
        return redirect('/')
    }
    return null
}