
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Main from "./Components/Home/Main";
import AboutUs from "./Components/AboutUs";
import LoginPage from "./Pages/LoginPage";
import { action as LogoutAction } from "./Pages/LogoutPage"
import TimeTrackerPage from "./Pages/TimeTrackerPage";
import AddEmployeePage from "./Pages/AddEmployeePage";
import MapEmployeePage from "./Pages/MapEmployeePage";
import AttendancePage from "./Pages/AttendancePage";
import SchedulePage from "./Pages/SchedulePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    id: "root",
    //errorElement: <Error />,  
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
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: '/timetrack',
        element: <TimeTrackerPage />
      },
      {
        path: '/newEmployee',
        element: <AddEmployeePage />
      },
      {
        path: "/employees/details",
        element: <MapEmployeePage />
      },
      {
        path: "/schedule/:EmployeeId",
        element: <SchedulePage />
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
