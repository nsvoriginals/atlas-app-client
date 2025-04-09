import React, { useState } from "react";
import axios from "axios"; // Import axios

import { useAtom } from "jotai";
import { atsAtom } from "../store/AtsStore"; // Import your atom for managing state

const FormComponent = ({ onSubmit }) => {
  const [atsData, setData] = useAtom(atsAtom); // State for ATS data
  const [jobDescription, setJobDescription] = useState(""); // Job description state
  const [file, setFile] = useState(null); // File state (for the resume)

  // Handle file change (on file upload)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file to state
  };

  // Handle job description change (on typing in the textarea)
  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value); // Set the job description to state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobDescription) {
      // If file or job description is missing, return without sending the request
      alert("Please fill out both the job description and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData
    formData.append("job_description", jobDescription); // Append job description

    try {
      // Make the Axios POST request to send the data to the backend
      const response = await axios.post("/ats/ats-details", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important to set content type to 'multipart/form-data' when uploading files
        },
      });

      if (response.data.success) {
        // Handle success if the backend returns success
        setData(response.data.data); // Update ATS data
        alert("ATS analysis was successful!");
      } else {
        // Handle failure case
        alert("Failed to process the data. Please try again.");
      }
    } catch (error) {
      // Handle errors in the request (e.g., network errors, server errors)
      console.error("Error submitting form:", error);
      alert("There was an error submitting your data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-4 mt-8 p-6 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-semibold">Job Description and Resume</h2>

      {/* Job Description Input */}
      <textarea
        placeholder="Enter the job description here..."
        value={jobDescription}
        onChange={handleJobDescriptionChange}
        rows={4}
        className="w-full p-4 mt-4 border rounded-lg"
      />

      {/* File Upload */}
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full mt-4 p-2 border rounded-lg"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
