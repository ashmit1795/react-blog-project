import {Container, Logo, LogoutBtn} from "../index";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      endpoint: "/",
      active: true
    },
    {
      name: "Login",
      endpoint: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      endpoint: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      endpoint: "/all-posts",
      active: false,
    },
    {
      name: "Add Post",
      endpoint: "/add-post",
      active: authStatus,
    },
    {
      name: "My Profile",
      endpoint: "/my-profile",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="m-2">
            <Link>
              <Logo width="120px"/>
            </Link>
          </div>
          <ul className="flex ml-auto ">
            {navItems.map((item) => 
              item.active ? <li key={item.name}>
                <button 
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  onClick={() => navigate(item.endpoint)}
                >
                  {item.name}
                </button>
              </li> : null
            )}
            
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header