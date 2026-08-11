import { useState } from "react";
import axios from "axios";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

export const api = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 5000,
});

function User() {
    const queryClient = useQueryClient();

    // -----------------------------
    // Local UI state
    // -----------------------------
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState(null);

    // -----------------------------
    // GET USERS
    // -----------------------------
    const {
        data: users = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    // -----------------------------
    // CREATE USER
    // -----------------------------
    const createUserMutation = useMutation({
        mutationFn: createUser,

        onSuccess: () => {
            // Tell React Query that users data is outdated
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error) => {
            console.error("Create failed:", error);
        },
    });

    // -----------------------------
    // UPDATE USER
    // -----------------------------
    const updateUserMutation = useMutation({
        mutationFn: updateUser,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error) => {
            console.error("Update failed:", error);
        },
    });

    // -----------------------------
    // DELETE USER
    // -----------------------------
    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error) => {
            console.error("Delete failed:", error);
        },
    });

    // -----------------------------
    // API FUNCTIONS
    // -----------------------------

    async function fetchUsers() {
        const { data } = await api.get("/users");
        return data;
    }

    async function createUser(user) {
        const { data } = await api.post("/users", user);
        return data;
    }

    async function updateUser({ id, user }) {
        const { data } = await api.put(`/users/${id}`, {
            id,
            ...user,
        });

        return data;
    }

    async function deleteUser(id) {
        await api.delete(`/users/${id}`);
        return id;
    }

    // -----------------------------
    // FORM SUBMIT
    // -----------------------------
    function handleSubmit(e) {
        e.preventDefault();

        const user = {
            name,
            email,
        };

        if (editingId) {
            // UPDATE
            updateUserMutation.mutate({
                id: editingId,
                user,
            });
        } else {
            // CREATE
            createUserMutation.mutate(user);
        }

        // Clear form
        setName("");
        setEmail("");
        setEditingId(null);
    }

    // -----------------------------
    // EDIT
    // -----------------------------
    function handleEdit(user) {
        setEditingId(user.id);
        setName(user.name);
        setEmail(user.email);
    }

    // -----------------------------
    // DELETE
    // -----------------------------
    function handleDelete(id) {
        deleteUserMutation.mutate(id);
    }

    // -----------------------------
    // LOADING / ERROR
    // -----------------------------
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return (
            <div>
                <h1>Something went wrong</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    // -----------------------------
    // UI
    // -----------------------------
    return (
        <div style={{ padding: 30 }}>
            <h1>React CRUD with TanStack Query</h1>

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

                <button
                    type="submit"
                    disabled={
                        createUserMutation.isPending ||
                        updateUserMutation.isPending
                    }
                >
                    {createUserMutation.isPending ||
                        updateUserMutation.isPending
                        ? "Saving..."
                        : editingId
                            ? "Update User"
                            : "Add User"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setName("");
                            setEmail("");
                        }}
                        style={{ marginLeft: 10 }}
                    >
                        Cancel
                    </button>
                )}
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
                            disabled={deleteUserMutation.isPending}
                            style={{ marginLeft: "10px" }}
                        >
                            {deleteUserMutation.isPending
                                ? "Deleting..."
                                : "Delete"}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default User;