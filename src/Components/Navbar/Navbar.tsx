import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const { userToken, setuserToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setuserToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md sticky  top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className=" flex justify-between items-center h-16">
          {/* Logo */}
          <div className=" shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Logo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {userToken ? (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Profile
                </Link>
                {/* logout btn */}
                <button
                  onClick={logOut}
                  className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setisOpen(!isOpen);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md  text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isOpen}
            >
              {/* icon with closed */}
              {!isOpen ? <FaBars /> : <IoMdClose />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t">
          <div className="flex flex-col gap-4">
            {userToken ? (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Profile
                </Link>
                {/* logout btn */}
                <button
                  onClick={logOut}
                  className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
