import {Link} from "react-router-dom";
export default function NavBar(){
  return (
    <div>
      Navigation Bar
      <Link to="/activity">
      add new activity
      </Link>
        <Link to="/home">
          Home
        </Link>
      <div> <button>search</button> <button>filter</button></div>
    </div>
  )
}