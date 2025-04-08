import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobInterviewWidget = () => {
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [topics, setTopics] = useState("");
  const [resume, setResume] = useState(null);
  const [profile, setProfile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setResume(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to send to the API
    const formData = new FormData();
    formData.append("jobRole", jobRole);
    formData.append("experience", experience);
    formData.append("topics", topics);
    if (resume) {
      formData.append("file", resume);
    }

    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:8080/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setProfile(data.data.candidate_profile);
        setQuestions(data.data.interview_questions);
      } else {
        alert("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

        {/* Special Topics (Optional) */}
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

      {/* Display Candidate Profile */}
      {profile && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Candidate Profile</h3>
          <p>Experience Level: {profile.experience_level}</p>
          <p>Key Skills: {profile.key_skills.join(", ")}</p>
          <p>Primary Domain: {profile.primary_domain}</p>
          <p>Years of Experience: {profile.years_of_experience}</p>
        </div>
      )}

      {/* Display Interview Questions */}
      {questions.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => navigate("/interview-questions", { state: { questions } })
          }
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
          >
            View Interview Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default JobInterviewWidget;
