import { useEffect, useState } from "react";
import { DisplayEmployees } from "../../../Services/Employee.service";
import { Grid, Typography } from "@mui/material";
import EmployeeCard from "../../Card/EmployeeCard";

function MapEmployeeContainer({ query, retreiveTotalEmployee, rowsPerPage, page }) {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await DisplayEmployees(rowsPerPage, query, page);
                if (response.ok) {
                    const employeesData = await response.json();
                    retreiveTotalEmployee(employeesData.TotalEmployee)
                    setEmployees(employeesData.employees);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchEmployee();
    }, [query, rowsPerPage, retreiveTotalEmployee, page]);
    return (
        <>
            {employees?.length !== 0 ? (
                <Grid
                    sx={{
                        display: "grid",
                        width: "100%",
                        justifyContent: "center",
                        gridTemplateColumns: {
                            sm: "repeat(2,1fr)",
                            lg: "repeat(4,1fr)",
                            md: "repeat(3,1fr)",
                            xs: "repeat(1,1fr)",
                        },
                        gap: "10px",
                        borderRadius: "20px",
                    }}
                >
                    {employees.map((employee, index) => (
                        <div key={employee._id}>
                            <EmployeeCard
                                employee={employee}
                            />
                        </div>
                    ))}
                </Grid>
            ) : (
                <Typography
                    sx={{ display: "flex", mt: "40px", fontWeight: "bold", fontSize: "18px" }}
                    color="primary"
                    key={'1'}
                >
                    No employees found.
                </Typography>
            )}
        </>
    );
}

export default MapEmployeeContainer;
