import { useAuth } from "@/context/AuthContext";
import { Link,useNavigate} from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
//import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/api/auth";
//import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const {user,setUser,setAccessToken} =useAuth()
  const navigate=useNavigate()
  const handleLogout=async()=>{
    try {
      await logoutUser()
      setUser(null)
      setAccessToken(null)
      navigate({to:"/"})
    } catch (error) {
      console.error("logout failed",error)
    }
  }
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-800">
          <Link to="/" className="flex items-center space-x-2 text-gray-800">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h1 className="text-2xl font-bold">IdeaDrop</h1>
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            to="/ideas"
            className="text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none"
          >
            Ideas
          </Link>
          {user && (
            <Link
              to="/ideas/new"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition px-4 py-2 rounded-md leading-none"
            >
              + New Idea
            </Link>
          )}
        </nav>
        {/**Auth Buttons */}
        <div className="flex items-center space-x-2">
          {!user?(<> <Link
            to="/login"
            className="text-gray-600 hovew:text-gray-700
          font-medium transition px-3 py-2 leading-none
          "
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-600 hovew:text-gray-700
          font-medium transition px-4 py-2 leading-none rounded"
          >
            Register
          </Link></>):(
            <>
            <span className="text-gray-700 font-medium px-2">
              welcome ,{user.name}
            </span>
            <button 
            onClick={handleLogout}
            className="text-red-600  
            hover:text-red-900  font-medium px-3 py-2 
            leading-none">Logout</button>
            </>
          )}
         
        </div>
      </div>
    </header>
  );
};

export default Header;
