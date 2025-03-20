export const Features = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center font-satoshi gap-10">
      <h1 className="text-9xl text-center font-satoshi">Features</h1>

      {/* Authentication */}
      <div className="flex justify-between items-center w-[80%] mt-16 gap-10">
        <img
          className="w-[50%] object-contain border-2 border-blue-500 rounded-2xl"
          src="https://static.vecteezy.com/system/resources/previews/046/863/227/non_2x/a-linear-mini-illustration-of-user-authentication-vector.jpg"
          alt="User Authentication Illustration"
        />
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-7xl text-black">Authentication</h3>
          <p className="w-full text-2xl mt-5">
            Users must be authenticated to access the platform's services, ensuring security and privacy.
          </p>
        </div>
      </div>

      {/* Interview Questions Generator */}
      <div className="flex justify-between items-center w-[80%] mt-16 gap-10">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-7xl text-black">Interview Questions Generator</h3>
          <p className="w-full text-2xl mt-5">
            Users can generate and customize interview questions based on their resume and career goals.
          </p>
        </div>
        <img
          className="w-[50%] object-contain border-2 border-blue-500 rounded-2xl"
          src="https://blog.internshala.com/wp-content/uploads/2019/04/Explore-Common-Interview-Questions-to-Ace-Any-Interview.jpg"
          alt="Interview Questions Illustration"
        />
      </div>

      {/* ATS Tracking */}
      <div className="flex justify-between items-center w-[80%] mt-16 gap-10">
        <img
          className="w-[50%] object-contain border-2 border-blue-500 rounded-2xl"
          src="https://img.freepik.com/free-vector/choice-worker-concept-illustrated_52683-44076.jpg?uid=R93846244&ga=GA1.1.312657223.1728147925&semt=ais_hybrid"
          alt="ATS Tracking Illustration"
        />
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-7xl text-black">ATS Tracking</h3>
          <p className="w-full text-2xl mt-5">
            Get insights into how your resume performs against Applicant Tracking Systems (ATS).
          </p>
        </div>
      </div>

      {/* Resume Optimization */}
      <div className="flex justify-between items-center w-[80%] mt-16 gap-10">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-7xl text-black">Resume Optimization</h3>
          <p className="w-full text-2xl mt-5">
            Improve your resume with AI-driven insights to increase your chances of landing a job.
          </p>
        </div>
        <img
          className="w-[50%] object-contain border-2 border-blue-500 rounded-2xl"
          src="https://media.istockphoto.com/id/1137470880/vector/people-vector-illustration-flat-cartoon-character-landing-page-template.jpg?s=612x612&w=0&k=20&c=_HPRNiholF1vID12DPaip2xqGJYBQmQvB4wXZ4psES8="
          alt="Resume Optimization Illustration"
        />
      </div>
    </div>
  );
};
