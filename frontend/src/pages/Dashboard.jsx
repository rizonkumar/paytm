import { Appbar } from "../components/AppBar"
import { Balance } from "../components/Balance"

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard