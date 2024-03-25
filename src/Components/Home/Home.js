import { Outlet } from 'react-router-dom'
import Layout from '../Layout/Layout'


const Home = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default Home
