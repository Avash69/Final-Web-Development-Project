// import "../assets/css/Register.css";
// import {Link} from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import {toast, ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
// interface FormData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
// }

// function Register() {
//     const apiCall = useMutation<void, Error, FormData>({
//         mutationKey: ['POST_USER_REGISTER'],
//         mutationFn: async (formData) => {
//             try {
//                 const response = await axios.post('http://localhost:8082/user/save', formData, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 return response.data;
//             // } catch (error) {
//             //     throw new Error(error.response?.data || error.message);
//             // }
//     //     },
//     //     onError: (error) => {
//     //         toast.error(`Error: ${error.message}`);
//       }
// });
    

//     const { register, handleSubmit } = useForm<FormData>();

//     const onSubmit = async (data: FormData) => {
//         try {
//             await apiCall.mutateAsync(data);
//             toast.success('Registration successful!');
//             console.log('Registration successful');
//             // Handle successful registration, e.g., redirect to login page
//         } catch (error) {
//             console.error('Error during registration', error);
//         }
//     };

//     return (
//         <div className={"register-container"}>
//             <div className={"r-Signup-form"}>
//                 <div className={"r-Head"}>
//                     <img
//                         src={"images/logo.png"}
//                         alt={"logo"}
//                     />
//                     <h1>Signup</h1>
//                 </div>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className={"r-Body"}>
//                     <input type={"text"} placeholder={"First Name"} {...register("firstName")} />
//                     <input type={"text"} placeholder={"Last Name"} {...register("lastName")} />
//                     <input type={"email"} placeholder={"Email"} {...register("email")} />
//                     <input type={"password"} placeholder={"Password"} {...register("password")} />
//                     <input type={"password"} placeholder={"Confirm Password"} {...register("confirmPassword")} />

//                 </div>
//                 <div className={"r-Footer"}>
//                     <div className={"r-button"}>
//                         <Link to="/Login"><button>Sign In</button></Link>
//                         <button type="submit">Sign Up</button>
//                     </div>



//                 </div>
//                 </form>


//             </div>
//             <ToastContainer/>

//         </div>

//     );
// };

// export default Register;

import "../assets/css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Register() {
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

    const apiCall = useMutation<void, Error, FormData>({
        mutationKey: ['POST_USER_REGISTER'],
        mutationFn: async (formData) => {
            const response = await axios.post('http://localhost:8082/user/save', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Registration successful!', { autoClose: 3000 });
            navigate('/login'); // Redirect to login page after successful registration
        },
        onError: (error) => {
            toast.error(`Registration failed: ${error.message}`);
        },
    });

    const onSubmit = (data: FormData) => {
        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        apiCall.mutate(data);
    };

    return (
        <div className="register-container">
            <div className="r-Signup-form">
                <div className="r-Head">
                    <img src="images/logo.png" alt="logo" />
                    <h1>Signup</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="r-Body">
                        <input
                            type="text"
                            placeholder="First Name"
                            {...register("firstName", { required: "First Name is required" })}
                        />
                        {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                        
                        <input
                            type="text"
                            placeholder="Last Name"
                            {...register("lastName", { required: "Last Name is required" })}
                        />
                        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                        
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                        
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                        
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === watch('password') || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="r-Footer">
                        <div className="r-button">
                            <Link to="/login">
                                <button type="button">Sign In</button>
                            </Link>
                            <button type="submit">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
