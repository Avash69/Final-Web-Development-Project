// import {Link, useNavigate, useParams} from "react-router-dom";
// import "../assets/css/AddCategory.css";
// import {useForm} from "react-hook-form";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {useMutation,useQuery} from "@tanstack/react-query";

// function AddCategory() {
//     const { id_p } = useParams();
//     console.log(id_p)
//     const { data: dataById } = useQuery({
//         queryKey: ['GETBYID'],
//         queryFn() {
//             return axios.get(`http://localhost:8082/brand/getById/${id_p}`, {
//                 headers: { Authorization: "Bearer " + localStorage.getItem("token") }
//             });
//         },
//         enabled: !!id_p,
//     });

//     const navigate = useNavigate();
//     const apiCall = useMutation({
//         mutationKey: ["POST_ITEM"],
//         mutationFn: (payload) => {
//             console.log(payload);
//             return axios.post("http://localhost:8082/brand/save", payload, {
//                 headers: { Authorization: "Bearer " + localStorage.getItem("token") }
//             });
//         },
//         onSuccess: () => {
//             toast.success("Brand added successfully!", { autoClose: 4000 });
//             resetForm();
//         },
//         onError: (error) => {
//             setTimeout(() => {
//                 toast.error('Please fill all the fields!');
//             }, 0); // Set the timeout to 4000 milliseconds (4 seconds)
//         },
//     });

//     const { register, handleSubmit, reset: resetForm } = useForm({
//         values: id_p ? dataById?.data : {},
//     });

//     const onSubmit = (values) => {
//         apiCall.mutate(values);
//     };

//     return (
//         <div className={"ab-container"}>
//             <div className={"ab-buttons"}>
//                 <div className={"ab-top"}>
//                     <img src={"../images/Logo.png"}
//                          width={100}
//                          alt={"logo"}
//                     />
//                     <span>E-commerce</span>
//                     <i className="fa-solid fa-bars"></i>
//                 </div>
//                 <div className={"ab-btn"}>
//                     <div className="ap-dropdown">
//                         <button className="ap-dropbtn"><i className="fa-solid fa-clipboard"></i>Products<i className="fa-solid fa-caret-down" style={{ marginLeft: '57px' }}></i></button>
//                         <div className="ap-dropdown-content">
//                             <a href="/admin/products">View Product</a>
//                             <a href="/admin/addproduct">Add Product</a>

//                         </div>
//                     </div>
//                     <div className="cgr-dropdown">
//                         <button className="cgr-dropbtn"><i className="fa-solid fa-list"></i>Categories<i className="fa-solid fa-caret-down" style={{ marginLeft: '40px' }}></i></button>
//                         <div className="cgr-dropdown-content">
//                             <a href="/admin/viewcategory">View Category</a>
//                             <a href="/admin/addcategory">Add Category</a>
//                         </div>
//                     </div>
//                     <div className="brd-dropdown">
//                         <button className="brd-dropbtn"><i className="fa-solid fa-tag"></i>Brands<i className="fa-solid fa-caret-down" style={{ marginLeft: '69px' }}></i></button>
//                         <div className="brd-dropdown-content">
//                             <a href="/admin/viewbrand">View Brand</a>
//                             <a href="/admin/addbrand">Add Brand</a>
//                         </div>
//                     </div>
//                     <Link to={"/admin/totalorders"}><button className={"products"}><i className="fa-solid fa-cart-shopping"></i>Total Orders</button></Link>
//                     <Link to={"/admin/users"}><button className={"products"}><i className="fa-solid fa-users"></i>Users</button></Link>
//                     <div className="pr-dropdown">
//                         <button className="pr-dropbtn"><i className="fa-solid fa-user"></i>Profile<i className="fa-solid fa-caret-down" style={{ marginLeft: '70px' }}></i></button>
//                         <div className="pr-dropdown-content">
//                             {/*<a href="/admin/profile">View Profile</a>*/}
//                             <a href="/admin/editprofile">Edit Profile</a>
//                             <a href="/admin/changepassword">Change Password</a>
//                         </div>
//                     </div>
//                     {/*<Link to={"/admin/aboutus"}><button className={"products"}><i className="fa-regular fa-address-card"></i>About Us</button></Link>*/}
//                     <Link to={"/login"}><button onClick={()=>{
//                         localStorage.clear();
//                         window.location.href="/login"
//                     }} className={"products"}><i className="fa-solid fa-arrow-right"></i>Log Out</button></Link>
//                 </div>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)}>
//             <div className={"ab-display"}>
//                 <h2>Add Brand</h2>
//                 <input type={"text"} placeholder={"Enter Brand Name"}  {...register("brandName")} />
//                 <input className={"ab-desc"} type={"text"} placeholder={"Enter Brand Description"}  {...register("brandDescription")}/>
//                 <button type={"submit"}>Add Brand</button>
//             </div>
//             </form>
//             <ToastContainer/>
//         </div>
//     )
// }

// export default AddCategory;

// import { Link, useNavigate, useParams } from "react-router-dom";
// import "../assets/css/AddCategory.css";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";

// function AddCategory() {
//     const { id_p } = useParams();
//     const navigate = useNavigate();

//     // Fetch data by ID if `id_p` exists
//     const { data: dataById, isLoading, isError } = useQuery({
//         queryKey: ['GETBYID', id_p],
//         queryFn: () => axios.get(`http://localhost:8082/brand/getById/${id_p}`, {
//             headers: { Authorization: "Bearer " + localStorage.getItem("token") }
//         }),
//         enabled: !!id_p,
//     });

//     const { register, handleSubmit, reset: resetForm } = useForm({
//         defaultValues: {
//             brandName: '',
//             brandDescription: ''
//         },
//     });

//     // Reset form when dataById is fetched successfully
//     useEffect(() => {
//         if (dataById && dataById.data) {
//             resetForm(dataById.data);
//         }
//     }, [dataById, resetForm]);

//     const apiCall = useMutation({
//         mutationKey: ["POST_ITEM"],
//         mutationFn: (payload) => {
//             return axios.post("http://localhost:8082/brand/save", payload, {
//                 headers: { Authorization: "Bearer " + localStorage.getItem("token") }
//             });
//         },
//         onSuccess: () => {
//             toast.success("Brand added successfully!", { autoClose: 4000 });
//             resetForm();
//             navigate('/admin/viewbrand');
//         },
//         onError: () => {
//             toast.error('Please fill all the fields!', { autoClose: 4000 });
//         },
//     });

//     const onSubmit = (values) => {
//         apiCall.mutate(values);
//     };

//     // Handle loading and error states
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error loading data</div>;
//     }

//     return (
//         <div className="ab-container">
//             <div className="ab-buttons">
//                 <div className="ab-top">
//                     <img src="../images/Logo.png" width={100} alt="logo" />
//                     <span>E-commerce</span>
//                     <i className="fa-solid fa-bars"></i>
//                 </div>
//                 <div className="ab-btn">
//                     <div className="ap-dropdown">
//                         <button className="ap-dropbtn"><i className="fa-solid fa-clipboard"></i>Products<i className="fa-solid fa-caret-down" style={{ marginLeft: '57px' }}></i></button>
//                         <div className="ap-dropdown-content">
//                             <Link to="/admin/products">View Product</Link>
//                             <Link to="/admin/addproduct">Add Product</Link>
//                         </div>
//                     </div>
//                     <div className="cgr-dropdown">
//                         <button className="cgr-dropbtn"><i className="fa-solid fa-list"></i>Categories<i className="fa-solid fa-caret-down" style={{ marginLeft: '40px' }}></i></button>
//                         <div className="cgr-dropdown-content">
//                             <Link to="/admin/viewcategory">View Category</Link>
//                             <Link to="/admin/addcategory">Add Category</Link>
//                         </div>
//                     </div>
//                     <div className="brd-dropdown">
//                         <button className="brd-dropbtn"><i className="fa-solid fa-tag"></i>Brands<i className="fa-solid fa-caret-down" style={{ marginLeft: '69px' }}></i></button>
//                         <div className="brd-dropdown-content">
//                             <Link to="/admin/viewbrand">View Brand</Link>
//                             <Link to="/admin/addbrand">Add Brand</Link>
//                         </div>
//                     </div>
//                     <Link to="/admin/totalorders">
//                         <button className="products"><i className="fa-solid fa-cart-shopping"></i>Total Orders</button>
//                     </Link>
//                     <Link to="/admin/users">
//                         <button className="products"><i className="fa-solid fa-users"></i>Users</button>
//                     </Link>
//                     <div className="pr-dropdown">
//                         <button className="pr-dropbtn"><i className="fa-solid fa-user"></i>Profile<i className="fa-solid fa-caret-down" style={{ marginLeft: '70px' }}></i></button>
//                         <div className="pr-dropdown-content">
//                             <Link to="/admin/editprofile">Edit Profile</Link>
//                             <Link to="/admin/changepassword">Change Password</Link>
//                         </div>
//                     </div>
//                     <Link to="/login">
//                         <button onClick={() => {
//                             localStorage.clear();
//                             window.location.href = "/login";
//                         }} className="products"><i className="fa-solid fa-arrow-right"></i>Log Out</button>
//                     </Link>
//                 </div>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="ab-display">
//                     <h2>Add Brand</h2>
//                     <input type="text" placeholder="Enter Brand Name" {...register("brandName")} />
//                     <input className="ab-desc" type="text" placeholder="Enter Brand Description" {...register("brandDescription")} />
//                     <button type="submit">Add Brand</button>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default AddCategory;


import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/css/AddCategory.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function AddCategory() {
    const { id_p } = useParams(); // Get the brand ID from URL parameters
    const navigate = useNavigate(); // Navigation hook

    // Fetch brand data by ID if `id_p` exists
    const { data: dataById, isLoading, isError } = useQuery({
        queryKey: ['GETBYID', id_p],
        queryFn: () => axios.get(`http://localhost:8082/brand/getById/${id_p}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }),
        enabled: !!id_p, // Only run this query if `id_p` is present
    });

    // Initialize the form with default values
    const { register, handleSubmit, reset: resetForm } = useForm({
        defaultValues: {
            brandName: '',
            brandDescription: ''
        },
    });

    // Populate form with fetched data if available
    useEffect(() => {
        if (dataById && dataById.data) {
            resetForm(dataById.data);
        }
    }, [dataById, resetForm]);

    // Define the mutation for adding/updating a brand
    const apiCall = useMutation({
        mutationKey: ["POST_ITEM"],
        mutationFn: (payload) => {
            return axios.post("http://localhost:8082/brand/save", payload, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
        },
        onSuccess: () => {
            toast.success("Brand added/updated successfully!", { autoClose: 4000 });
            resetForm(); // Reset the form after successful submission
            navigate('/admin/viewbrand'); // Redirect to view brands page
        },
        onError: () => {
            toast.error('Please fill all the fields!', { autoClose: 4000 });
        },
    });

    // Handle form submission
    const onSubmit = (values:any) => {
        apiCall.mutate(values);
    };

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="ab-container">
            <div className="ab-buttons">
                <div className="ab-top">
                    <img src="../images/Logo.png" width={100} alt="logo" />
                    <span>E-commerce</span>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className="ab-btn">
                    <div className="ap-dropdown">
                        <button className="ap-dropbtn">
                            <i className="fa-solid fa-clipboard"></i>Products
                            <i className="fa-solid fa-caret-down" style={{ marginLeft: '57px' }}></i>
                        </button>
                        <div className="ap-dropdown-content">
                            <Link to="/admin/products">View Product</Link>
                            <Link to="/admin/addproduct">Add Product</Link>
                        </div>
                    </div>
                    <div className="cgr-dropdown">
                        <button className="cgr-dropbtn">
                            <i className="fa-solid fa-list"></i>Categories
                            <i className="fa-solid fa-caret-down" style={{ marginLeft: '40px' }}></i>
                        </button>
                        <div className="cgr-dropdown-content">
                            <Link to="/admin/viewcategory">View Category</Link>
                            <Link to="/admin/addcategory">Add Category</Link>
                        </div>
                    </div>
                    <div className="brd-dropdown">
                        <button className="brd-dropbtn">
                            <i className="fa-solid fa-tag"></i>Brands
                            <i className="fa-solid fa-caret-down" style={{ marginLeft: '69px' }}></i>
                        </button>
                        <div className="brd-dropdown-content">
                            <Link to="/admin/viewbrand">View Brand</Link>
                            <Link to="/admin/addbrand">Add Brand</Link>
                        </div>
                    </div>
                    <Link to="/admin/totalorders">
                        <button className="products">
                            <i className="fa-solid fa-cart-shopping"></i>Total Orders
                        </button>
                    </Link>
                    <Link to="/admin/users">
                        <button className="products">
                            <i className="fa-solid fa-users"></i>Users
                        </button>
                    </Link>
                    <div className="pr-dropdown">
                        <button className="pr-dropbtn">
                            <i className="fa-solid fa-user"></i>Profile
                            <i className="fa-solid fa-caret-down" style={{ marginLeft: '70px' }}></i>
                        </button>
                        <div className="pr-dropdown-content">
                            <Link to="/admin/editprofile">Edit Profile</Link>
                            <Link to="/admin/changepassword">Change Password</Link>
                        </div>
                    </div>
                    <Link to="/login">
                        <button onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }} className="products">
                            <i className="fa-solid fa-arrow-right"></i>Log Out
                        </button>
                    </Link>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="ab-display">
                    <h2>Add Brand</h2>
                    <input 
                        type="text" 
                        placeholder="Enter Brand Name" 
                        {...register("brandName", { required: true })}
                    />
                    <input 
                        className="ab-desc" 
                        type="text" 
                        placeholder="Enter Brand Description" 
                        {...register("brandDescription", { required: true })}
                    />
                    <button type="submit">Add Brand</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddCategory;
