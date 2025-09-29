import image from "../../assets/LandingImage/image.jpeg";
import book from "../../assets/LandingImage/book.jpg";
import AwardImage from "../../assets/LandingImage/AwardImage.png"; 
import vision from "../../assets/LandingImage/vision.png"; 
import mission from "../../assets/LandingImage/mission.png";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

function Content() {
  const [hovered, setHovered] = useState(null);
  const [awards, setAwards] = useState([]);
  
  // Refs for scroll animations
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const awardsRef = useRef(null);
  
  // Use scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Check if elements are in view
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
  const isIntroInView = useInView(introRef, { once: true, margin: "-100px" });
  const isVisionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isAwardsInView = useInView(awardsRef, { once: true, margin: "-100px" });
  
  // Transform values based on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Fetch awards from backend
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/awards");
        const data = await res.json();
        setAwards(data);
      } catch (error) {
        console.error("Error fetching awards:", error);
      }
    };
    fetchAwards();
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideInLeft = {
    hidden: { 
      opacity: 0, 
      x: -100,
      rotate: -5
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideInRight = {
    hidden: { 
      opacity: 0, 
      x: 100,
      rotate: 5
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="bg-[#E0ECFF] py-10 px-4 md:px-16 transition-all duration-500 ease-in-out relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated Background Element */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 pointer-events-none"
        style={{ y: backgroundY }}
      />
      
      {/* Heading */}
      <motion.div
        ref={headingRef}
        initial="hidden"
        animate={isHeadingInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <h1 className="text-4xl font-extrabold text-center text-black mb-4 mt-8 transition-all duration-500 ease-in-out relative z-10">
          WHO ARE WE?
        </h1>
      </motion.div>

      {/* Intro Paragraph */}
      <motion.div
        ref={introRef}
        initial="hidden"
        animate={isIntroInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <p className="text-black text-lg leading-relaxed text-justify pt-8 mb-16 transition-all duration-500 ease-in-out relative z-10">
          The Leo Club of Uva Wellassa University is a dynamic and inclusive community of young, passionate individuals who are dedicated to the principles of service, leadership, and personal development. As an officially recognized youth movement under the guidance of Lions Clubs International the world's largest service organization we proudly carry forward the global Leo motto <span className="font-bold">"Leadership, Experience, Opportunity"</span>  Our club was established with the vision of inspiring positive change both within the university environment and in the wider society. We strongly believe that leadership is not just about holding titles, but about taking action and being a catalyst for change. Through a variety of structured activities, volunteer opportunities, and service initiatives, we empower university students to take on real-world challenges, build impactful solutions, and develop their confidence, teamwork, and communication skills.As a student-led club, we unite undergraduates from various academic disciplines ranging from science and technology to business and the arts who share a common passion: serving humanity with compassion, integrity, and dedication. The diversity of our members fuels creativity and innovation, enabling us to design meaningful programs that address real community needs.

          We are more than just a club we are a movement, a network, and a family of future changemakers. At the heart of everything we do is a deep commitment to leaving a positive impact on society. Together, we strive to uplift our communities, strengthen our bonds, and create a future where service is a way of life and leadership is guided by purpose.
        </p>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        ref={visionRef}
        initial="hidden"
        animate={isVisionInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.div 
          className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-2 transition-all duration-700 ease-in-out hover:scale-[1.01]"
          variants={fadeInUp}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Image */}
          <motion.div 
            className="md:w-1/3 flex justify-center items-center"
            variants={slideInLeft}
          >
            <motion.img
              src={vision}
              alt="Vision"
              className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div 
            className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify"
            variants={slideInRight}
          >
            <motion.h1 
              className="uppercase text-2xl font-bold text-left mb-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Vision
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="font-bold">"Let's build a team, Let's build a vision, Let's build a plan, Let's build success." </span> This reflects the club's dedication to serving society and staying committed to a purposeful path of positive community impact and youth empowerment.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        ref={missionRef}
        initial="hidden"
        animate={isMissionInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="mt-10 relative z-10"
      >
        <motion.div 
          className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-10 transition-all duration-700 ease-in-out hover:scale-[1.01]"
          variants={fadeInUp}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Text */}
          <motion.div 
            className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify"
            variants={slideInLeft}
          >
            <motion.h1 
              className="uppercase text-2xl font-bold text-left mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Mission
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              To provide a unique platform for undergraduates of Uva Wellassa University to develop leadership skills, nurture their personalities, and foster meaningful changes within their communities through impactful service initiatives.To create a friendly environment that offers infinite leadership experiences and opportunities for young people, forming new bonds within the global Leo and Lions network while focusing on community service.

              In essence, the Leo Club of Uva Wellassa University aims to cultivate future leaders who are passionate about service, teamwork, and societal betterment, aligning with the broader Leo Club principles of leadership, experience, and opportunity.
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="md:w-1/3 flex justify-center items-center"
            variants={slideInRight}
          >
            <motion.img
              src={mission}
              alt="Mission"
              className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md"
              style={{
                clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: -1,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Awards Section */}
      <motion.div
        ref={awardsRef}
        initial="hidden"
        animate={isAwardsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative flex justify-center mt-16 z-10"
      >
        <motion.div 
          className="w-full max-w-5xl bg-blue-800 rounded-[40px] shadow-lg px-6 py-10 flex flex-col items-center"
          variants={scaleIn}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 80px rgba(37, 99, 235, 0.3)",
            transition: { duration: 0.4 }
          }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-white mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={isAwardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Awards
          </motion.h2>

          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center gap-7 md:gap-16 transition-all duration-500"
            variants={staggerContainer}
          >
            {awards.map((award, i) => (
              <motion.div
                key={award._id || i}
                className="flex flex-col items-center text-center mx-4"
                variants={scaleIn}
                custom={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                layout
                transition={{ 
                  layout: { duration: 0.5, type: "spring" },
                  delay: i * 0.1
                }}
                animate={
                  hovered === i
                    ? { 
                        scale: 1.2, 
                        zIndex: 10, 
                        y: -20, 
                        boxShadow: "0 8px 32px 4px rgba(0,0,0,0.2)",
                        rotate: [0, 2, -2, 0]
                      }
                    : { 
                        scale: 1, 
                        zIndex: 1, 
                        y: 0, 
                        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                        rotate: 0
                      }
                }
                style={{ 
                  cursor: "pointer", 
                  position: hovered === i ? "relative" : "static" 
                }}
                whileHover={{ 
                  filter: "brightness(1.1)"
                }}
              >
                <motion.img
                  src={AwardImage}
                  alt="Award Icon"
                  className="w-28 h-28 md:w-32 md:h-32 mb-2 drop-shadow-lg rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 300 }}
                  animate={hovered === i ? { 
                    scale: 1.13, 
                   
                    filter: "drop-shadow(0 10px 20px rgba(255,215,0,0.3))"
                  } : { 
                    scale: 1, 
                    rotate: 0,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                  }}
                />
                <div className="flex flex-col items-center justify-center px-2 -mt-2">
                  <motion.div 
                    className="text-[0.9rem] md:text-base font-semibold text-[#FFD700] tracking-wide drop-shadow" 
                    style={{ letterSpacing: 1 }}
                    animate={hovered === i ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {award.title}
                  </motion.div>
                  <motion.div 
                    className="text-xs md:text-sm text-[#FFD700] mt-2 font-light tracking-wider" 
                    style={{ letterSpacing: 1 }}
                    animate={hovered === i ? { scale: 1.05 } : { scale: 1 }}
                  >
                    {award.winner}
                  </motion.div>
                  <motion.div 
                    className="text-lg md:text-xl font-bold text-[#FFD700] mt-1 drop-shadow"
                    animate={hovered === i ? { 
                      scale: 1.2, 
                      textShadow: "0 0 20px rgba(255,215,0,0.8)"
                    } : { 
                      scale: 1,
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                    }}
                  >
                    {award.year}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Content;