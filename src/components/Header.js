import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Pokemon List</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
