export default function Pass({ name = "unkown", marks, color = "green" }) {
  if (marks === undefined) {
    return <h1> Marks are not uploaded yet !</h1>;
  }

  return (
    <div>
      <h3 style={{ color: color }}>Pass</h3>
      <p>
        Mr {name} your marks is {marks}
      </p>
    </div>
  );
}

// export default function Pass(props) {
//   console.log(props);
//   let { name = "unkown", marks, color = "green" } = props;

//   if (marks === undefined) {
//     return <h1> Marks are not uploaded yet !</h1>;
//   }

//   return (
//     <div>
//       <h3 style={{ color: color }}>Pass</h3>
//       <p>
//         Mr {name} your marks is {marks}
//       </p>
//     </div>
//   );
// }

// export default function Pass(props) {
//   console.log(props);

//   if (props.marks === undefined) {
//     return <h1> Marks are not uploaded yet !</h1>;
//   }

//   return (
//     <div>
//       <h3 style={{ color: "green" }}>Pass</h3>
//       <p>
//         Mr {props.name ? props.name : "unkown"} your marks is {props.marks}
//       </p>
//     </div>
//   );
// }
