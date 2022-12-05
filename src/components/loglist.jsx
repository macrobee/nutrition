import uniqid from "uniqid";

const Log = (props) => {
  return (
    <div>
      <h3>{props.label}</h3>
      <ul>
        {props.itemList.map((item) => {
          const uniqueId = uniqid();
            if (props.label === "Food Intake"){
                return (
                    <li key={uniqueId} id={uniqueId}>
                      {item.quantity} {item.name}
                    </li>
                  );
            } else {
                return (
                    <li key={uniqueId} id={uniqueId}>
                      {item.name} {item.duration} min {item.calories} calories
                    </li>
                )
            }
          
        })}
      </ul>
    </div>
  );
};
export default Log;
