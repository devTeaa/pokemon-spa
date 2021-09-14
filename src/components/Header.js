import styled from "@emotion/styled"
import { Link } from "react-router-dom"

const HeaderSection = styled.section`
  background-color: #A82F2F;
  padding: 0.5rem 1rem;

  > ul {
    display: flex;
    flex-direcion: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
    
    > li {
      flex: 1;

      &:not(:first-of-type) {
        margin-left: 1rem;
      }

      > a {
        color: white;
        text-decoration: none;
      }
    }
  }
`

const Header = () => {
  return (
    <HeaderSection>
      <ul>
        <li>
          <Link to="/">Pokemon List</Link>
        </li>
        <li>
          <Link to="/my-pokemon">My Pokemon</Link>
        </li>
      </ul>
    </HeaderSection>
  )
}

export default Header
