import { useEffect, useState } from "react"
import { UserDetailsApi } from '../services/Api'
import Navbar from "../components/Navbar"
import { logout,isAunthanticated } from "../services/Auth"
import { useNavigate, Navigate } from "react-router-dom"

export default function DashboardPage() {

    const navigate=useNavigate();


    const [user, setUser] = useState({ name: "", email: "", localId: "" })

    useEffect(() => {
        if(isAunthanticated()){
        UserDetailsApi().then((response) => {

            setUser({
                name: response.data.users[0].displayName,
                email: response.data.users[0].email,
                localId: response.data.users[0].localId,
            })

        })
    }
  
    }, [])


    const logoutUser = ()=>{
        logout();
        navigate('/login')

    }

    if (!isAunthanticated()) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Navbar logoutUser={logoutUser} />
            <main role="main" className="container mt-5">
                <div className="container">
                    <div className="text-center mt-5">
                        <h3>Dashboard page</h3>
                        {user.name && user.email && user.localId ?
                            (<div>
                                <p className="text-bold " >Hi {user.name}, your Firebase ID is {user.localId}</p>
                                <p>your email is {user.email}</p>
                            </div>)
                            : <p>Loading...</p>
                        }

                    </div>
                </div>
            </main>
        </div>
    )
}

