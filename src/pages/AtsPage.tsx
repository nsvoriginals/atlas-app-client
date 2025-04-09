import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MissingSkill } from "../components/MissingSkill";
import { motion } from "framer-motion";

const FormComponent = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobDescription) {
      alert("Please fill out both the job description and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post("http://localhost:8080/ats/ats-details", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        onSubmit(response.data.data);
      } else {
        alert("Failed to process the data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-4 mt-8 p-6 bg-gray-100 rounded-lg shadow-md justify-center" 
    >
      <h2 className="text-3xl font-semibold">Job Description and Resume</h2>
      <textarea
        placeholder="Enter the job description here..."
        value={jobDescription}
        onChange={handleJobDescriptionChange}
        rows={4}
        className="w-full p-4 mt-4 border rounded-lg"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full mt-4 p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

const AtsPage = ({ atsData }) => {
  const [percentage, setPercentage] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!atsData?.ats_score) return;

    const duration = 3000;
    const increment = 1;
    const intervalTime = duration / (atsData.ats_score / increment);

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= atsData.ats_score) {
          clearInterval(interval);
          return atsData.ats_score;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [atsData]);

  const lightColors = [
    "bg-pink-200", "bg-blue-200", "bg-green-200", "bg-yellow-200",
    "bg-purple-200", "bg-indigo-200", "bg-teal-200", "bg-orange-200",
    "bg-lime-200", "bg-red-200"
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * lightColors.length);
    return lightColors[randomIndex];
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-10 my-20">
      <motion.div
        className="flex items-center flex-col justify-between gap-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl">ATS Metrics</h1>
        <CircularProgressbar value={atsData.ats_score} text={`${atsData.ats_score}/100`} />
        <h1 className="text-3xl">Score</h1>
      </motion.div>

      <div className="flex items-center justify-center gap-5 h-3/4 w-screen mx-20 mt-24">
        <div className="flex flex-col items-center justify-between gap-2 w-1/2 h-full ml-20">
          <motion.div
            id="1"
            className="w-full border-2 border-black h-full rounded-4xl bg-pink-200 p-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl">Improvements</h1>
            <ul className="list-disc pl-6 mt-4 text-lg text-left">
              {atsData.improvements && atsData.improvements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            id="2"
            className="w-full h-full flex flex-col items-center justify-center gap-2 rounded-4xl bg-blue-200 border-2 border-black"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl">Resume Summary</h1>
            <p className="text-lg text-center px-4">{atsData.resume_summary}</p>
          </motion.div>
        </div>

        <motion.div
          className="h-full w-90% border-2 border-black w-1/2 mr-20 rounded-4xl bg-red-300"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl my-5">Missing Words</h1>
          {atsData.missing_keywords && atsData.missing_keywords.map((skill, idx) => (
            <MissingSkill key={idx} skill={skill} color={getRandomColor()} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const AtsFormPage = () => {
  const [atsData, setAtsData] = useState(null);

  const handleFormSubmit = (data) => {
    setAtsData(data);
  };

  return (
    <div>
      {atsData ? (
        <AtsPage atsData={atsData} />
      ) : (
        <FormComponent onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default AtsFormPage;