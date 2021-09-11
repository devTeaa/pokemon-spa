import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Pokemon List</Link>
        </li>
        <li>
          <Link to="/my-pokemon">My Pokemon</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
