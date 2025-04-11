import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { loginUser } from "../Api/AuthApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });
            console.log("Login success:", response);

            toast.success("well Come", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
                hideProgressBar: true,
            });

            navigate("/visualizer");
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Login failed", {
                position: "bottom-center",
                autoClose: 3000,
                theme: "dark",
                hideProgressBar: true,
            });
        }


    };

    return (

        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <motion.h1
                className="text-4xl font-bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Login to Easy DSA
            </motion.h1>

            <motion.form
                onSubmit={handleLogin}
                className="mt-6 bg-gray-800 bg-opacity-30 p-8 rounded-2xl shadow-2xl w-96 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 rounded-xl bg-gray-700 bg-opacity-50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 rounded-xl bg-gray-700 bg-opacity-50 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 rounded-xl shadow-lg hover:bg-blue-500 transition"
                >
                    Login
                </button>
            </motion.form>

            <p className="mt-6 text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-400 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;

