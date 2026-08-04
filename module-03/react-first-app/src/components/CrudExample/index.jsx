import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/users";

function CrudExample() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState(null);

    // Fetch all users
    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    }

    // Add or Update user
    async function handleSubmit(e) {
        e.preventDefault();

        const user = {
            name,
            email,
        };

        try {
            if (editingId) {
                // UPDATE
                const response = await fetch(`${API_URL}/${editingId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: editingId,
                        ...user,
                    }),
                });

                const updatedUser = await response.json();

                setUsers(
                    users.map((u) => (u.id === editingId ? updatedUser : u))
                );

                setEditingId(null);
            } else {
                // CREATE
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });

                console.log(response)

                const newUser = await response.json();

                setUsers([...users, newUser]);
            }

            setName("");
            setEmail("");
        } catch (error) {
            console.error(error);
        }
    }

    // Edit user
    function handleEdit(user) {
        setEditingId(user.id);
        setName(user.name);
        setEmail(user.email);
    }

    // Delete user
    async function handleDelete(id) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ padding: 30 }}>
            <h1>React CRUD with fetch()</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">
                    {editingId ? "Update User" : "Add User"}
                </button>
            </form>

            <hr />

            <h2>Users</h2>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                users.map((user) => (
                    <div
                        key={user.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>

                        <button onClick={() => handleEdit(user)}>
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(user.id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default CrudExample;