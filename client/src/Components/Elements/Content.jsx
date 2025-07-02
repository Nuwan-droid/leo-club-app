import image from "../../assets/LandingImage/image.jpeg";
import book from "../../assets/LandingImage/book.jpg";
import AwardImage from "../../assets/LandingImage/AwardImage.png"; 
import vision from "../../assets/LandingImage/vision.png"; 
import mission from "../../assets/LandingImage/mission.png";
import { motion } from "framer-motion";
import React, { useState } from "react";


const awards = [
  {
    title: "Most Outstanding Zone Director",
    subtitle: " Leo Erandini Ambalampitiya",
    year: "2024"
  },
  {
    title: "Most Outstanding Bulletin Editor",
    subtitle: "Leo Abishek Haththakage",
    year: "2024"
  },
  {
    title: "Most Outstanding Bulletin Editor",
    subtitle: "Leo Abishek Haththakage",
    year: "2025"
  },
];


function Content() {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="bg-[#E0ECFF] py-10 px-4 md:px-16 transition-all duration-500 ease-in-out">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-4 mt-8 transition-all duration-500 ease-in-out">
        WHO ARE WE?
      </h1>

      {/* Paragraph under the heading */}
      <p className="text-black text-lg leading-relaxed text-justify pt-8 mb-16 transition-all duration-500 ease-in-out">
        The Leo Club of Uva Wellassa University is a dynamic and inclusive community of young, passionate individuals who are dedicated to the principles of service, leadership, and personal development. As an officially recognized youth movement under the guidance of Lions Clubs International the world’s largest service organization we proudly carry forward the global Leo motto <span className="font-bold">"Leadership, Experience, Opportunity"</span>  Our club was established with the vision of inspiring positive change both within the university environment and in the wider society. We strongly believe that leadership is not just about holding titles, but about taking action and being a catalyst for change. Through a variety of structured activities, volunteer opportunities, and service initiatives, we empower university students to take on real-world challenges, build impactful solutions, and develop their confidence, teamwork, and communication skills.As a student-led club, we unite undergraduates from various academic disciplines ranging from science and technology to business and the arts who share a common passion: serving humanity with compassion, integrity, and dedication. The diversity of our members fuels creativity and innovation, enabling us to design meaningful programs that address real community needs.

        We are more than just a club we are a movement, a network, and a family of future changemakers. At the heart of everything we do is a deep commitment to leaving a positive impact on society. Together, we strive to uplift our communities, strengthen our bonds, and create a future where service is a way of life and leadership is guided by purpose.
      </p>

      {/* Image and second paragraph in styled card */}
      <div className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-2 transition-all duration-700 ease-in-out hover:scale-[1.01]">
        {/* Image */}
<div className="md:w-1/3 flex justify-center items-center">
  <img
    src={vision} // your image variable
    alt="Who we are"
    className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md"
    style={{
      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
      // This creates the diagonal right edge
    }}
  />
</div>

        {/* Paragraph beside image */}
        <div className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify">
          <h1 className="uppercase text-2xl font-bold text-left mb-6">
            Vision
          </h1>
          <p>
            <span className="font-bold">“Let’s build a team, Let’s build a vision, Let’s build a plan, Let’s build success.” </span> This reflects the club’s dedication to serving society and staying committed to a purposeful path of positive community impact and youth empowerment.
          </p>
        </div>
      </div>

      {/* Inverted image section */}
      <div className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-10 mt-10 transition-all duration-700 ease-in-out hover:scale-[1.01]">
        {/* Paragraph beside image */}
        <div className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify">
          <h1 className="uppercase text-2xl font-bold text-left mb-8">
            Mission
          </h1>
          <p>
            To provide a unique platform for undergraduates of Uva Wellassa University to develop leadership skills, nurture their personalities, and foster meaningful changes within their communities through impactful service initiatives.To create a friendly environment that offers infinite leadership experiences and opportunities for young people, forming new bonds within the global Leo and Lions network while focusing on community service.

            In essence, the Leo Club of Uva Wellassa University aims to cultivate future leaders who are passionate about service, teamwork, and societal betterment, aligning with the broader Leo Club principles of leadership, experience, and opportunity.
          </p>
        </div>

        {/* Image on the right */}
<div className="md:w-1/3 flex justify-center items-center">
  <img
    src={mission} // Replace with your image variable
    alt="Who we are"
    className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md"
    style={{
      clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)'
    }}
  />
</div>

      </div>


{/* Awards Section */}
    <div className="relative z-10 flex justify-center mt-16">
      <div className="w-full max-w-5xl bg-blue-700 rounded-[60px] shadow-lg px-6 py-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Awards
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-7 md:gap-16 transition-all duration-500">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center mx-4"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              layout
              transition={{ layout: { duration: 0.5, type: "spring" } }}
              animate={
                hovered === i
                  ? {
                      scale: 1.2,
                      zIndex: 10,
                      y: -20,
                      boxShadow: "0 8px 32px 4px  bg-blue-700",
                    }
                  : {
                      scale: 1,
                      zIndex: 1,
                      y: 0,
                      boxShadow: "0 2px 12px  bg-blue-700",
                    }
              }
              style={{
                cursor: "pointer",
                position: hovered === i ? "relative" : "static",
              }}
            >
              <motion.img
                src={AwardImage}
                alt="Award Icon"
                className="w-28 h-28 md:w-32 md:h-32 mb-2 drop-shadow-lg rounded-full bg-white/10"
                transition={{ type: "spring", stiffness: 300 }}
                animate={
                  hovered === i
                    ? { scale: 1.13, rotate: 2 }
                    : { scale: 1, rotate: 0 }
                }
              />
              <div className="flex flex-col items-center justify-center px-2 -mt-2">
                <div className="text-[0.9rem] md:text-base font-semibold text-[#FFD700] tracking-wide drop-shadow" style={{ letterSpacing: 1 }}>
                  {award.title}
                </div>
                <div className="text-xs md:text-sm text-[#FFD700] mt-2 font-light tracking-wider" style={{ letterSpacing: 1 }}>
                  {award.subtitle}
                </div>
                <div className="text-lg md:text-xl font-bold text-[#FFD700] mt-1 drop-shadow">
                  {award.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>





    </div>
  );
}

export default Content;