import React, { useState } from 'react'
import StyleFormContainer from '../../Styled/StyleFormContainer'
import { Form, useNavigate } from 'react-router-dom'
import AddEmployeeHeader from './AddEmployeeHeader'
import AddEmployeeContain from './AddEmployeeContain'
import AddEmployeeButton from './AddEmployeeButton'
import { NewEmployee } from '../../../Services/Employee.service'
import AddEmployeeError from './AddEmployeeError'

function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [role, setRole] = useState('');
    const [salaryPerHour, setSalaryPerHour] = useState('');
    const [hoursPerWeek, setHoursPerWeek] = useState('');
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const retreiveRoleHandler = (role) => {
        setRole(role)
    }
    const retreiveFirstNameHandler = (value) => {
        setFirstName(value);
    }

    const retreiveLastNameHandler = (value) => {
        setLastName(value);
    }

    const retreiveEmailHandler = (value) => {
        setEmail(value);
    }

    const retreivePasswordHandler = (value) => {
        setPassword(value);
    }

    const retreiveJobTitleHandler = (value) => {
        setJobTitle(value);
    }
    const retreiveSalaryPerHourHandler = (value) => {
        setSalaryPerHour(value);
    }

    const retreiveHoursPerWeekHandler = (value) => {
        setHoursPerWeek(value);
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const response = await NewEmployee(firstName, lastName, email, password, jobTitle, role, salaryPerHour, hoursPerWeek)
        if (response.ok) {
            setIsLoading(false)
            return navigate('/employees/details')
        }
        const error = await response.json();
        setError(error)
        setIsLoading(false)
    }
    return (
        <StyleFormContainer>
            <Form onSubmit={submitHandler} method='Post'>
                <AddEmployeeHeader />
                <AddEmployeeContain retreiveRole={retreiveRoleHandler} retreiveFirstName={retreiveFirstNameHandler} retreiveLastName={retreiveLastNameHandler} retreiveEmail={retreiveEmailHandler} retreivePassword={retreivePasswordHandler} retreiveJobTitle={retreiveJobTitleHandler} retreiveSalaryPerHour={retreiveSalaryPerHourHandler} retreiveHoursPerWeek={retreiveHoursPerWeekHandler} />
                <AddEmployeeError errorMessage={error} />
                <AddEmployeeButton role={role} isLoading={isLoading} />
            </Form>
        </StyleFormContainer>
    )
}

export default AddEmployee