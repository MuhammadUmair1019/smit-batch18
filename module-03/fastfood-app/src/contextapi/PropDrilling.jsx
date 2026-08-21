import { useState } from "react";

function GrandChild(props) {
    return <h1>{props.x}</h1>;
}

function Child(props) {
    return <GrandChild x={props.x} />;
}

function Parent(props) {
    return <Child x={props.x} />;
}

function PropDrillingDemo() {
    const [x] = useState(0);

    return (
        <div>
            <Parent x={x} />
        </div>
    );
}

export default PropDrillingDemo;
