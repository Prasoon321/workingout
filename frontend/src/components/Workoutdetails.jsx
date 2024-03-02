import Workoutcontexthook from "../hook/Workoutcontexthook";
import FormatDistanceToNow from "date-fns/formatDistanceToNow";
import Authcontexthook from "../hook/Authcontexthook";

const workoutdetail = ({ workout }) => {
  const { user } = Authcontexthook();

  const { dispatch } = Workoutcontexthook();
  const handleclick = async () => {
    if (!user) {
      return Error("Must be lgged in to see workut");
    }
    const response = await fetch(
      "https://workingout.vercel.app/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      console.log(json);
    }
  };
  return (
    <>
      <div className="card">
        <h3> Exercise :{workout.title}</h3>
        <p>Reps : {workout.reps}</p>
        <p> Weight :{workout.load} Kg</p>
        <p>
          {" "}
          time :
          {FormatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <button onClick={handleclick}>Delete</button>
      </div>
    </>
  );
};
export default workoutdetail;
