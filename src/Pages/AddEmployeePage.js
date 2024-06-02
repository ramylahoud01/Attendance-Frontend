import React from 'react'
import AddEmployee from '../Components/Employee/AddEmployee/AddEmployee'
import authHeader from '../Services/isAuth.service'
import { redirect } from 'react-router-dom'


function AddEmployeePage() {
    return (
        <div>
            <AddEmployee />
        </div>
    )
}

export default AddEmployeePage

export const loader = ({ req, params }) => {
    const token = authHeader()
    if (!token) {
        return redirect('/')
    }
    return null
}