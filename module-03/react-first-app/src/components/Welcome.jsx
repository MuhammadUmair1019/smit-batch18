

function Welcome(props) {
    console.log(props)

    return (
        <h1 className="text-4xl font-bold">Welcome, {props.name}</h1>
    )
}


export default Welcome