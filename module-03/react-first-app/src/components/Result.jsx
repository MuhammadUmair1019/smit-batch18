import Fail from "./Fail";
import Pass from "./Pass";

export default function Result(props) {
  if (props.marks > 50) {
    return <Pass marks={props.marks} name={props.name} color={props.color} />;
  } else {
    return <Fail marks={props.marks} name={props.name} color={props.color} />;
  }
}
