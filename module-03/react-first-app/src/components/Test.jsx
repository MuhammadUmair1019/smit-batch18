export default function Test() {
    return (
        <button
            type="button"
            className="border"
            onClick={async () => {
                console.log("before");

                await fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: "John",
                        email: "john@test.com",
                    }),
                });

                console.log("after");
            }}
        >
            Test POST
        </button>
    );
}