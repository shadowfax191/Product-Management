import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProdiver";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc';
const Login = () => {
    window.scrollTo(0, 0)
    const { signIn, signInWithGoogle } = useContext(AuthContext)
    const [error, setError] = useState(null)
    console.log(error);

    const navigate = useNavigate()
    const location = useLocation()


    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        signIn(email, password)
            .then(res => {
                if(res.user.uid){
                    toast.success('Successfully Registration Complete ',
                    {
                      style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      },
                    })
                   }
              setTimeout(()=>navigate(location?.state ? location.state : '/'),1200)  

            })
            .catch(err => {
                setError(err.message)
                toast.error(err.message,
                    {

                        style: {
                            borderRadius: '10px',
                            background: '#FF0',
                            color: '#333',
                        },
                    })
            })
    }

    const handleGoogle = () => {
        signInWithGoogle()
        .then(res => {
            if(res.user.uid){
                toast.success('Successfully Registration Complete ',
                {
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                })
               }
          setTimeout(()=>navigate(location?.state ? location.state : '/'),1200)  

        })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <div className="hero max-w-5xl mx-auto  md:py-10">
                <div className="hero-content w-full">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="text-center ">
                            <h1 className="text-5xl font-bold md:py-5">Log in now!</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>

                        </form>
                        <div className="px-8">
                            <p>Do not have an account? <Link to='/register' className="text-purple-700 text-center font-medium">Register here</Link> </p>
                            <p className="text-xl text-purple-700 text-center font-semibold">OR</p>
                            <div className="form-control my-4 ">
                                <button onClick={handleGoogle} className="btn btn-primary text-2xl"> <FcGoogle></FcGoogle> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </div>

    );
};

export default Login;