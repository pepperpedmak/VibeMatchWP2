import React from "react";
import { Link } from "react-router-dom";

const BeforeLogin = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJsdXUlMjBpbWFnZXxlbnwwfHx8fDE2OTI3NzY5NTg&ixlib=rb-4.0.3&q=80&w=1080')",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/70"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Logo (optional) */}
        <div className="mb-6">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-blue-600 text-2xl font-bold">VM</span>
          </div>
        </div>

        {/* Main content card */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold mb-3 text-blue-800">VibeMatch</h1>
          <p className="text-lg text-gray-600 mb-8">Find your people. Share your interests. Connect authentically.</p>
          
          {/* Divider with icon */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="mx-4 text-blue-500">✨</div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/login" 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-all shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg text-center transition-all shadow-md hover:shadow-lg"
            >
              Create Account
            </Link>
          </div>
          
          {/* Footer text */}
          <p className="mt-8 text-center text-gray-500 text-sm">
            By joining, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
        
        {/* Floating features highlights */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium shadow-lg">
            ✓ Find like-minded people
          </div>
          <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium shadow-lg">
            ✓ Join interest groups
          </div>
          <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium shadow-lg">
            ✓ Share experiences
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeLogin;