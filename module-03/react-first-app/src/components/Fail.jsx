export default function Fail(props) {


    if (props.marks === undefined || props.marks < 0) {
        return <h1> Marks are not uploaded yet !</h1>
    }
    return (
        <div>
            <h3 style={{ color: 'red' }}>Fail</h3>
            <p>Mr {props.name ? props.name : 'unkown'} your marks is {props.marks}</p>
        </ div>
    )
}
