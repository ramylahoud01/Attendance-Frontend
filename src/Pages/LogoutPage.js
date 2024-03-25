import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export async function action({ request }) {
    Cookies.remove('token');
    return redirect('/')
}