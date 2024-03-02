import { useState, useEffect } from "react";
function Dashboard() {
  const [post, setPost] = useState("");
  useEffect(() => {
    const fetchpost = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("https://workingout.vercel.app/auth/posts", {
        method: "get",
        header: { "auth-token": token },
      });
      setPost(response.data);
      console.log(response.data);
    };
    fetchpost();
  }, []);
  return (
    <div>
      <h2>Protected Posts</h2>
      {post}
    </div>
  );
}

export default Dashboard;
