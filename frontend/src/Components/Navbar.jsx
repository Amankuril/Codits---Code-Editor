import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { logoutUser } from "../Api/AuthApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {

    try {
      const response = await logoutUser();
      console.log("Logout success:", response);

      toast.success("logged out", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        hideProgressBar: true,
      });

      navigate("/login");

    } catch (error) {

      console.error("Logout error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Logout failed", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: true,
      });

    }
  };
  return (
    <motion.nav
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-800  shadow-md"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <Link to="/" className="text-2xl font-bold text-blue-400">
          Codit
        </Link>

        <div className="space-x-6 text-lg font-medium">


          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 hover:shadow-lg transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <>
              <Link to="/visualizer" className="hover:text-blue-400 transition">
                Editor
              </Link>

              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-400 transition">
                Signup
              </Link>
            </>
          )}


        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;

