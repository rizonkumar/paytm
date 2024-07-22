import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3001/api/v1/user/bulk", {
      params: { filter },
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setUsers(response.data.users);
      console.log("users", response.data.users);
    });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between my-2 p-2 border rounded border-slate-200">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2">
          <div className="text-xl">{user.firstName[0]}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Button label={"Send Money"} onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)} />
      </div>
    </div>
  );
}
