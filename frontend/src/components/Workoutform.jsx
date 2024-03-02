import { useState } from "react";
import Workoutcontexthook from "../hook/Workoutcontexthook";
import Authcontexthook from "../hook/Authcontexthook";
function Workoutform() {
  const { user } = Authcontexthook();
  const { dispatch } = Workoutcontexthook();
  const [title, Settitle] = useState("");
  const [reps, Setreps] = useState("");
  const [load, Setload] = useState("");
  const [error, Seterror] = useState(null);
  const [emptyfield, Setemptyfield] = useState([]);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Seterror("You must be logged in to fill workouts ");
      return;
    }
    const workout = { title, reps, load };
    const response = await fetch("https://workingout.vercel.app/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      Seterror(json.error);
      Setemptyfield(json.emptyfield);
      console.log(json);
    }
    if (response.ok) {
      Settitle("");
      Setload("");
      Setreps("");
      Seterror(null);
      Setemptyfield([]);
      console.log("new workout added ", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <label>Excersize Title</label>
        <input
          type="text"
          value={title}
          className={emptyfield.includes("title") ? "errorborder" : ""}
          onChange={(e) => {
            Settitle(e.target.value);
          }}
        />
        <label>No Of Reps</label>
        <input
          type="text"
          value={reps}
          className={emptyfield.includes("reps") ? "errorborder" : ""}
          onChange={(e) => {
            Setreps(e.target.value);
          }}
        />
        <label>Weight in Kg</label>
        <input
          type="text"
          value={load}
          className={emptyfield.includes("load") ? "errorborder" : ""}
          onChange={(e) => {
            Setload(e.target.value);
          }}
        />
        <button>Add Workout</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </>
  );
}

export default Workoutform;
