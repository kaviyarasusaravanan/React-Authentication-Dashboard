import { useState } from 'react';
import './LoginPage.css';
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAunthanticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function LoginPage() {
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null
    };


    const [errors, setErrors] = useState(initialStateErrors);
    let hasError = false;

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {

        event.preventDefault();
        let errors = initialStateErrors;

        if (inputs.email == "") {
            errors.email.required = true;
            hasError = true;

        }

        if (inputs.password == "") {
            errors.password.required = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true)
            LoginApi(inputs).then((response) => {
                console.log(inputs)
                storeUserData(response.data.idToken);
            }).catch((er) => {
                if (er.code = "ERR_BAD_REQUEST") {
                    setErrors({ ...errors, custom_error: "Invalid Credentials." })
                }
            }).finally(() => {
                setLoading(false);
            })

        }

        setErrors({ ...errors });
    }


    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    if (isAunthanticated()) {
        return <Navigate to="/dashboard" />
    }


    return (
        <div>
        <Navbar />
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="c ol login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form onSubmit={handleSubmit} className="login-form" action="">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                <input type="email" className="form-control" name="email" onChange={handleInput} id="" placeholder="email" />
                                {errors.email.required ?
                                    (<span className="text-danger" >
                                        Email is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                <input className="form-control" type="password" onChange={handleInput} name="password" placeholder="password" id="" />
                                {errors.password.required ?
                                    (<span className="text-danger" >
                                        Password is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="form-group">
                                {loading ?
                                    <div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div> : null
                                }
                                <span className="text-danger" >

                                    {errors.custom_error ?
                                        (<p>{errors.custom_error}</p>) : null
                                    }
                                </span>
                                <input type="submit" className="btn btn-login float-right" disabled={loading} value="Login" />
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-group">
                                Create new account ? Please <Link to="/register" >Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}