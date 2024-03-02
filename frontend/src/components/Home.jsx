import { useEffect } from "react";
import Workoutdetails from "../components/Workoutdetails";
import Workoutform from "../components/Workoutform";
import Workoutcontexthook from "../hook/Workoutcontexthook";
import Authcontexthook from "../hook/Authcontexthook";
function Home() {
  const { workouts, dispatch } = Workoutcontexthook();
  const { user } = Authcontexthook();
  // Fetching workout data from the server using useeffect hook
  useEffect(() => {
    const fetchworkout = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/workouts", {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_WORKOUT", payload: json });
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    if (user) {
      fetchworkout();
    }
  }, [dispatch, user]);
  return (
    <>
      <main>
        <h3>All your workouts are here.</h3>
      </main>
      <div className="container">
        {workouts &&
          workouts.map((workout) => (
            <Workoutdetails key={workout._id} workout={workout} />
          ))}
      </div>
      <Workoutform />
    </>
  );
}
export default Home;
