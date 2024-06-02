
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Main from "./Components/Home/Main";
import LoginPage from "./Pages/LoginPage";
import { action as LogoutAction } from "./Pages/LogoutPage"
import TimeTrackerPage, { loader as timetrackLoader } from "./Pages/TimeTrackerPage";
import AddEmployeePage, { loader as newemployeeLoader } from "./Pages/AddEmployeePage";
import MapEmployeePage, { loader as employeeLoader } from "./Pages/MapEmployeePage";
import SchedulePage, { loader as allscheduleLoader } from "./Pages/SchedulePage";
import ScheduleByIDPage, { loader as scheduleLoader } from "./Pages/ScheduleByIDPage";
import CalendarPage, { loader as calenderLoader } from "./Pages/CalendarPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    id: "root",
    // errorElement: <Error />,  
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/logout",
        action: LogoutAction
      },
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/timetrack',
        element: <TimeTrackerPage />,
        loader: timetrackLoader
      },
      {
        path: '/newEmployee',
        element: <AddEmployeePage />,
        loader: newemployeeLoader
      },
      {
        path: "/employees/details",
        element: <MapEmployeePage />,
        loader: employeeLoader
      },
      {
        path: "/schedule/:EmployeeId",
        element: <ScheduleByIDPage />,
        loader: scheduleLoader
      },
      {
        path: '/entire/schedule',
        element: <SchedulePage />,
        loader: allscheduleLoader
      },
      {
        path: '/entire/calendar',
        element: <CalendarPage />,
        loader: calenderLoader
      }
    ]
  }
])
function App() {
  return (
    <div style={{ backgroundColor: '#F8F8F8', minHeight: '100vh' }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
