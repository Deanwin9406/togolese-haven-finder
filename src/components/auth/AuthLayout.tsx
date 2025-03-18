
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const AuthLayout: React.FC = () => {
  const { session } = useAuth();

  // Redirect if user is already logged in
  if (session.user && !session.isLoading) {
    return <Navigate to="/" />;
  }

  // Show loading state if checking authentication
  if (session.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-green-50 to-teal-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Outlet />
    </motion.div>
  );
};

export default AuthLayout;
