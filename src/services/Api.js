import axios from "axios"
import { getUserData } from "./Storage";


axios.defaults.baseURL="https://identitytoolkit.googleapis.com/v1";
const API_KEY="AIzaSyBmEi1uHvoOF4wyDFe6u6ZJxPam-oc8D4c";
const REGISTER_URL=`/accounts:signUp?key=${API_KEY}`;
const Login_URL=`/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL=`/accounts:lookup?key=${API_KEY}`;



export const RegisterApi=(inputs)=>{
    let data={displayName:inputs.name,email:inputs.email,password:inputs.password}
   return axios.post(REGISTER_URL,data);
}   

export const LoginApi=(inputs)=>{
    let data={email:inputs.email,password:inputs.password}
   return axios.post(Login_URL,data);
}   

export const UserDetailsApi=()=>{
    let data={idToken:getUserData()}
    return axios.post(USER_DETAILS_URL,data);

}