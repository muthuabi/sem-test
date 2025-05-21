import { useAuth } from "../contexts/AuthContext";
import axos from "../axos";
import { useState, useEffect } from "react";
import {toast} from "react-toastify"
const EditModal = ({ user,fetchUsers }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                password: user.password || "",
                role: user.role || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axos.put(`api/user/${form.email}`, { ...form });
            fetchUsers();
            toast.success("Updated Successfully");
        } catch (err) {
            toast.error("Update Failure " + (err?.response?.data?.message || err?.message));
        }
    };

    return (
        <div
            className="modal fade"
            id="modalId"
            tabIndex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-scrollable modal-dialog-centered "
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId">
                            Modal title
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="login-container">
                            <form onSubmit={handleEdit} id="login" className="login-form">
                                <div className="login-header">
                                    <h2>Register Form</h2>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        readOnly
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        required
                                        onChange={handleChange}
                                    />
                                    <small>Password should contain one letter,one number</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="role"
                                        id="role"
                                        value={form.role}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [editUser,setEditUser]=useState(null);
    const fetchUsers = async () => {
        try {
            const res = await axos.get("api/user/");
            setUsers(res?.data?.data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            console.log("Fetch Complete");
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);
    const handleDelete = async(user) => {
        
        try{

        await axos.delete(`api/user/${user.email}`);
        toast.success("Deleted Successfully");
        fetchUsers();
        }
        catch(err)
        {
            toast.error("Deletion Failure "+(err?.response?.data?.message || err?.message));
        }
}
    if (!users || users.length == 0)
        return (<div className="container"><div className="alert alert-info">No Data Available</div></div>);
    return (
        <div className="container">
            <EditModal user={editUser} fetchUsers={fetchUsers} />

            <div className="table-responive">
                <table className="table">
                    <thead>
                        <tr>{
                            Object.keys(users[0]).filter(item => (item != '__v' && item != '_id')).map((key, idx) => {
                                return (<th key={idx}>{key}</th>)
                            })
                        }
                        <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, id) => {
                                return (
                                    <tr key={id}>
                                        {
                                            Object.keys(user).filter(item => (item != '__v' && item != '_id')).map((key, idk) => {
                                                return <td key={idk}>{user[key]}</td>;
                                            })
                                        }
                                        <button type="button"
                                            className="btn btn-primary btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalId"
                                            onClick={()=>{setEditUser(user)}}
                                            >Edit</button>
                                        <button type="button" className="btn btn-danger" onClick={()=>{handleDelete(user)}}>
                                            Delete
                                        </button>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}