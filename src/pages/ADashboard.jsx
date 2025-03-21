import { useState } from "react";
import { Footer } from "../components/Footer";
import JobInterviewWidget from "../widgets/InterviewForm";
import { Menu, X } from "lucide-react"; // Icons for sidebar toggle
import { useAtom } from "jotai";
import userAtom from "../store/userStore";

export const Dashboard = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  return (
    <div className="w-screen min-h-screen flex  " >
      
      <div className={`fixed top-0 left-0 h-full bg-white text-black w-64 shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
  <div className="p-4 flex justify-between items-center border-b border-gray-200">
    <h2 className="text-2xl font-bold text-sky-400">Dashboard</h2>
    <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
      <X className="text-black w-6 h-6" />
    </button>
  </div>
  <nav className="mt-6 flex flex-col space-y-2">
    {["Home", "Services", "Profile", "Settings", "Logout"].map((item) => (
      <a 
        key={item} 
        href="#" 
        className="block px-6 py-3 text-black font-medium hover:bg-sky-400 hover:text-white rounded-md transition"
      >
        {item}
      </a>
    ))}
  </nav>
</div>


   
      <div className="flex-1 flex flex-col items-center justify-start ml-0 md:ml-64">
        
        <button className="md:hidden mt-4 ml-4 p-2 bg-gray-900 text-white rounded-full" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>

     
        <div className="flex justify-around items-center w-full px-10 mt-10">
          <h1 className="text-7xl font-bold">Welcome {user.username}</h1>
          <div className="w-14 h-14 bg-black rounded-full text-center"></div>
        </div>

        
        <h1 className="text-5xl mt-10 font-semibold">Services</h1>

        <div className="w-full flex flex-wrap justify-center gap-8 mt-8 px-8">
          {["Interview Questions Generator", "ATS Tracker", "Resume Builder", "Jobs Finder"].map((service, index) => (
            <div
              key={index}
              className="md:w-[45%] w-[90%] h-[40vh] bg-red-300 rounded-lg flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all"
              onClick={() => service === "Interview Questions Generator" && setIsWidgetOpen(true)}
            >
              <h1 className="text-2xl font-bold">{service}</h1>
            </div>
          ))}
        </div>

  
        {isWidgetOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="relative bg-white p-6 rounded-lg shadow-lg pointer-events-auto">
              <button
                className="absolute top-2 right-2 text-gray-700"
                onClick={() => setIsWidgetOpen(false)}
              >
                ✖
              </button>
              <JobInterviewWidget />
            </div>
          </div>
        )}

      
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
