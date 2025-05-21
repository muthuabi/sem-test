import { useState, useEffect } from "react";
import axos from "../axos";
import { toast } from "react-toastify";

// Add Modal for Travel
const TravelAddModal = ({ fetchTravels }) => {
    const [form, setForm] = useState({
        place: "",
        city: "",
        name: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axos.post("api/travel/", { ...form });
            fetchTravels();
            setForm({ place: "", city: "", name: "" });
            toast.success("Added Successfully");
            // Close modal
            window.bootstrap.Modal.getOrCreateInstance(document.getElementById("travelAddModalId")).hide();
        } catch (err) {
            toast.error("Add Failure " + (err?.response?.data?.message || err?.message));
        }
    };

    return (
        <div
            className="modal fade"
            id="travelAddModalId"
            tabIndex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            role="dialog"
            aria-labelledby="travelAddModalTitleId"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="travelAddModalTitleId">
                            Add Travel Entry
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAdd}>
                            <div className="form-group">
                                <label htmlFor="add-place">Place</label>
                                <input
                                    type="text"
                                    value={form.place}
                                    id="add-place"
                                    name="place"
                                    className="form-control"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="add-city">City</label>
                                <input
                                    type="text"
                                    value={form.city}
                                    id="add-city"
                                    name="city"
                                    className="form-control"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="add-name">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    id="add-name"
                                    name="name"
                                    className="form-control"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-success mt-2">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TravelEditModal = ({ travel, fetchTravels }) => {
    const [form, setForm] = useState({
        place: "",
        city: "",
        name: ""
    });

    useEffect(() => {
        if (travel) {
            setForm({
                place: travel.place || "",
                city: travel.city || "",
                name: travel.name || ""
            });
        }
    }, [travel]);

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
            await axos.put(`api/travel/${travel._id}`, { ...form });
            fetchTravels();
            toast.success("Updated Successfully");
        } catch (err) {
            toast.error("Update Failure " + (err?.response?.data?.message || err?.message));
        }
    };

    return (
        <div
            className="modal fade"
            id="travelModalId"
            tabIndex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            role="dialog"
            aria-labelledby="travelModalTitleId"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="travelModalTitleId">
                            Edit Travel Entry
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleEdit}>
                            <div className="form-group">
                                <label htmlFor="place">Place</label>
                                <input
                                    type="text"
                                    value={form.place}
                                    id="place"
                                    name="place"
                                    className="form-control"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    value={form.city}
                                    id="city"
                                    name="city"
                                    className="form-control"
                                    required
                                    onChange={handleChange}
                                />
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
                            <button type="submit" className="btn btn-primary mt-2">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function TravelList() {
    const [travels, setTravels] = useState([]);
    const [editTravel, setEditTravel] = useState(null);

    const fetchTravels = async () => {
        try {
            const res = await axos.get("api/travel/");
            setTravels(res?.data?.data);
        } catch (err) {
            toast.error("Fetch Failure " + (err?.response?.data?.message || err?.message));
        }
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    const handleDelete = async (travel) => {
        try {
            await axos.delete(`api/travel/${travel._id}`);
            toast.success("Deleted Successfully");
            fetchTravels();
        } catch (err) {
            toast.error("Deletion Failure " + (err?.response?.data?.message || err?.message));
        }
    };

    return (
        <div className="container">
            <TravelAddModal fetchTravels={fetchTravels} />
            <TravelEditModal travel={editTravel} fetchTravels={fetchTravels} />
            <div className="mb-3">
                <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#travelAddModalId"
                >
                    Add New Travel
                </button>
            </div>
            {(!travels || travels.length === 0) ? (
                <div className="alert alert-info">No Data Available</div>
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                {Object.keys(travels[0]).filter(key => key !== '__v' && key !== '_id').map((key, idx) => (
                                    <th key={idx}>{key}</th>
                                ))}
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {travels.map((travel, idx) => (
                                <tr key={idx}>
                                    {Object.keys(travel).filter(key => key !== '__v' && key !== '_id').map((key, idk) => (
                                        <td key={idk}>{travel[key]}</td>
                                    ))}
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#travelModalId"
                                            onClick={() => setEditTravel(travel)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(travel)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <iframe src={"https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d125779.87477199797!2d77.9991509938394!3d9.88212208150392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3b00c58f98cfb84d%3A0x29f51efea3e84bf2!2sV3JJ%2BVJ3%2C%20Thiruparankundram%2C%20Tamil%20Nadu%20625015!3m2!1d9.8821321!2d78.08155289999999!5e0!3m2!1sen!2sin!4v1747811531733!5m2!1sen!2sin"} width={"100%"} height={500} style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    );
}