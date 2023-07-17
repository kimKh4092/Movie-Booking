import PocketBase from "pocketbase";
import jwtDecode from 'jwt-decode'

const pb = new PocketBase("http://212.129.63.142:8090");

//get user from api
export async function readUser(user) {
    // authenticate with a user
    try {
        const userData = await pb
            .collection("users")
            .authWithPassword(user.email, user.password);
        console.log("Result from auth:", userData);
        return userData;

    } catch (error) {
        console.error("Error authenticating:", error);
    }

}

//get current user
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    }
    catch (error) {

    }
}