import { useEffect, useState } from "react";
import { useParams } from "react-router";

function UserDetail() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
                setLoading(false)
            })
    }, [])

    // Replace this with your fetched user later
    // const user = {
    //     id: 1,
    //     name: "Leanne Graham",
    //     username: "Bret",
    //     email: "Sincere@april.biz",
    //     address: {
    //         street: "Kulas Light",
    //         suite: "Apt. 556",
    //         city: "Gwenborough",
    //         zipcode: "92998-3874",
    //         geo: {
    //             lat: "-37.3159",
    //             lng: "81.1496",
    //         },
    //     },
    //     phone: "1-770-736-8031 x56442",
    //     website: "hildegard.org",
    //     company: {
    //         name: "Romaguera-Crona",
    //         catchPhrase: "Multi-layered client-server neural-net",
    //         bs: "harness real-time e-markets",
    //     },
    // };

    if (loading) {
        return <h1 className="text-4xl font-bold text-center">Loading...</h1>
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 p-8 text-white">
                    <div className="flex items-center gap-5">
                        <div className="h-20 w-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold">
                            {user.name.charAt(0)}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-blue-100">@{user.username}</p>
                            <p className="text-sm mt-1">
                                User ID: {id}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-6 p-8">

                    {/* Contact */}
                    <div className="bg-gray-50 rounded-xl p-5">
                        <h2 className="text-xl font-semibold mb-4">
                            Contact Information
                        </h2>

                        <div className="space-y-3">
                            <p>
                                <span className="font-semibold">Email:</span>{" "}
                                {user.email}
                            </p>

                            <p>
                                <span className="font-semibold">Phone:</span>{" "}
                                {user.phone}
                            </p>

                            <p>
                                <span className="font-semibold">Website:</span>{" "}
                                <a
                                    href={`https://${user.website}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {user.website}
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-gray-50 rounded-xl p-5">
                        <h2 className="text-xl font-semibold mb-4">
                            Address
                        </h2>

                        <div className="space-y-2">
                            <p>{user.address.street}</p>
                            <p>{user.address.suite}</p>
                            <p>{user.address.city}</p>
                            <p>{user.address.zipcode}</p>

                            <div className="mt-4 text-sm text-gray-500">
                                <p>Latitude: {user.address.geo.lat}</p>
                                <p>Longitude: {user.address.geo.lng}</p>
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="bg-gray-50 rounded-xl p-5 md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">
                            Company
                        </h2>

                        <h3 className="text-lg font-bold text-blue-600">
                            {user.company.name}
                        </h3>

                        <p className="italic text-gray-600 mt-2">
                            "{user.company.catchPhrase}"
                        </p>

                        <p className="mt-3 text-gray-700">
                            {user.company.bs}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;