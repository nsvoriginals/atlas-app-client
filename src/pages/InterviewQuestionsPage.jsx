import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

const InterviewQuestionsPage = () => {
  const location = useLocation();
  const { questions } = location.state || {}; 

  const exportToPDF = () => {
    const doc = new jsPDF();

 
    doc.setFont("helvetica", "bold");
    doc.text("Interview Questions", 14, 20);

    // Add questions to PDF
    let yPosition = 30; // Initial position
    questions.forEach((question, index) => {
      doc.setFont("helvetica", "normal");
      doc.text(`${index + 1}. ${question.question}`, 14, yPosition);
      doc.text(`Expected Answer: ${question.expected_answer}`, 14, yPosition + 10);
      doc.text(`Difficulty: ${question.difficulty}`, 14, yPosition + 20);
      doc.text(`Type: ${question.type}`, 14, yPosition + 30);
      doc.text(`Skill Tested: ${question.skill_tested}`, 14, yPosition + 40);
      yPosition += 50; // Adjust space between questions
    });

    // Save the document as a PDF
    doc.save("interview_questions.pdf");
  };

  if (!questions) {
    return <p>Loading interview questions...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 border">
      <h2 className="text-xl font-bold text-center">Interview Questions</h2>
      <div>
        {questions.map((question, index) => (
          <div key={question.id} className="mt-4">
            <h4 className="font-medium">{index + 1}. {question.question}</h4>
            <p><strong>Expected Answer:</strong> {question.expected_answer}</p>
            <p><strong>Difficulty:</strong> {question.difficulty}</p>
            <p><strong>Type:</strong> {question.type}</p>
            <p><strong>Skill Tested:</strong> {question.skill_tested}</p>
          </div>
        ))}
      </div>
      <button
        onClick={exportToPDF}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default InterviewQuestionsPage;
