import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { userLogout } from "../../redux/action/userActions";

function Header() {
    const Style = ({ isActive }) => isActive ? { color: "grey", textDecoration: "none" } : { textDecoration: "none", color: "black" }
    const user = useSelector(state => state.userReducer)


    const dispatch = useDispatch()
    return (

        <div>
            <NavLink style={Style} to="/">Home</NavLink>

            {user.isLoggedIn ? (
                <>
                    <NavLink style={Style} to="/profile">Profile</NavLink>
                    <NavLink onClick={() => dispatch(userLogout())}>Logout</NavLink>
                </>
            ) : (
                <>
                    <NavLink style={Style} to="/login">Login</NavLink>
                    <NavLink style={Style} to="/signUp">SignUp</NavLink>
                </>
            )}



        </div>
    );
}

export default Header;