import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const Desc = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const splitWords = (text) => {
    return text.split(" ").map((word, wordIndex) => (
      <motion.span
        key={`word_${wordIndex}`}
        style={{ display: "inline-block", marginRight: "0.5rem" }}
      >
        {word.split("").map((letter, letterIndex) => (
          <motion.span
            key={`letter_${wordIndex}_${letterIndex}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: wordIndex * 0.1 + letterIndex * 0.05 }}
            style={{ display: "inline-block" }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    ));
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center font-satoshi gap-10 py-20">
      {/* Heading */}
      <motion.h1
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.2 }}
        className="text-center text-6xl md:text-8xl lg:text-9xl font-bold text-black"
      >
        What is Atlas AI
      </motion.h1>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-[90%] md:w-[80%] lg:w-[70%] text-lg md:text-2xl lg:text-3xl text-black text-justify leading-relaxed"
      >
        {splitWords(
          "Atlas AI is a cutting-edge, web-based platform designed to revolutionize the way job seekers prepare for interviews and optimize their resumes. Leveraging advanced AI technologies, Atlas AI offers a suite of powerful tools, including automatic interview question generation, ATS (Applicant Tracking System) tracking, salary estimation, and resume building. Whether you're a seasoned professional or just starting your career, Atlas AI provides personalized, data-driven insights to help you stand out in today's competitive job market."
        )}
      </motion.div>
    </div>
  );
};
