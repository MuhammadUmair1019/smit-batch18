import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ReactHooks() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    console.log(navigate)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false)
            });
    }, []);

    if (loading) {
        return <h1 className="text-4xl font-bold text-center">Loading users...</h1>
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                    React Hooks
                </h1>


                <div className="grid gap-6 md:grid-cols-2">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => {
                                console.log("You click ")
                                navigate(`${user.id}`)
                            }}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {user.name}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                <span className="font-medium">Username:</span>{" "}
                                {user.username}
                            </p>

                            <p className="text-gray-600">
                                <span className="font-medium">Email:</span>{" "}
                                {user.email}
                            </p>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default ReactHooks;