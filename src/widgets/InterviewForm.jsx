import { useState } from "react";

const JobInterviewWidget = () => {
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [topics, setTopics] = useState("");
  const [resume, setResume] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setResume(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ jobRole, experience, topics, resume });
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 border">
      <h2 className="text-xl font-bold text-center">Generate Interview Questions</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Role Dropdown */}
        <div>
          <label className="block font-medium">Job Role</label>
          <select
            className="w-full border p-2 rounded-md"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            required
          >
            <option value="">Select a role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block font-medium">Experience Level</label>
          <div className="flex space-x-3">
            {["Junior", "Mid", "Senior"].map((level) => (
              <button
                key={level}
                type="button"
                className={`px-4 py-2 border rounded-md ${
                  experience === level ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => setExperience(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Topics Input */}
        <div>
          <label className="block font-medium">Special Topics (Optional)</label>
          <input
            type="text"
            placeholder="e.g. React, GraphQL"
            className="w-full border p-2 rounded-md"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block font-medium">Upload Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md"
          />
          {resume && <p className="text-sm text-gray-500">Uploaded: {resume.name}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobInterviewWidget;
