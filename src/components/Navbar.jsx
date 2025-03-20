import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const links = ["Docs", "About", "Contact"];
  const navigate = useNavigate();
  
  // Ensure token is retrieved safely
  const token = localStorage.getItem("token");

  return (
    <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg hover:bg-white/20 border-b border-gray-300/30 shadow-sm max-w-screen-xl mx-auto py-6 px-10 flex items-center rounded-full">
      <h1 className="font-base text-2xl font-bold flex-1 mr-24">Atlas</h1>

      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-10">
          {links.map((text, index) => (
            <Link
              key={index}
              className="relative font-base flex items-center gap-2"
              to={`/${text.toLowerCase()}`}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={`absolute -left-3 transition-all duration-300 ease-out transform ${
                  activeIndex === index ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
              </span>
              <span className="pl-1">{text}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Conditional rendering based on authentication */}
      <div className="flex-1 flex justify-end gap-5">
        {!token ? (
          <>
            <Button onClick={() => navigate("/auth/signin")} text="Login" />
            <Button onClick={() => navigate("/auth/signup")} text="Register" />
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/user/profile")} text="Dashboard" />
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth/signin");
              }}
              text="Logout"
            />
          </>
        )}
      </div>
    </div>
  );
}
