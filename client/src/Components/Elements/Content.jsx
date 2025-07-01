import image from "../../assets/LandingImage/image.jpeg";
import book from "../../assets/LandingImage/book.jpg";

function Content() {
  return (
    <div className="bg-[#E0ECFF] py-10 px-4 md:px-16 transition-all duration-500 ease-in-out">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-4 mt-8 transition-all duration-500 ease-in-out">
        WHO ARE WE?
      </h1>

      {/* Paragraph under the heading */}
      <p className="text-black text-lg leading-relaxed text-justify pt-8 mb-16 transition-all duration-500 ease-in-out">
        The Leo Club of Uva Wellassa University is a dynamic and inclusive community of young, passionate individuals who are dedicated to the principles of service, leadership, and personal development. As an officially recognized youth movement under the guidance of Lions Clubs International the world’s largest service organization we proudly carry forward the global Leo motto <span class="font-bold">"Leadership, Experience, Opportunity"</span>  Our club was established with the vision of inspiring positive change both within the university environment and in the wider society. We strongly believe that leadership is not just about holding titles, but about taking action and being a catalyst for change. Through a variety of structured activities, volunteer opportunities, and service initiatives, we empower university students to take on real-world challenges, build impactful solutions, and develop their confidence, teamwork, and communication skills.As a student-led club, we unite undergraduates from various academic disciplines ranging from science and technology to business and the arts who share a common passion: serving humanity with compassion, integrity, and dedication. The diversity of our members fuels creativity and innovation, enabling us to design meaningful programs that address real community needs.

We are more than just a club we are a movement, a network, and a family of future changemakers. At the heart of everything we do is a deep commitment to leaving a positive impact on society. Together, we strive to uplift our communities, strengthen our bonds, and create a future where service is a way of life and leadership is guided by purpose.
      </p>

      {/* Image and second paragraph in styled card */}
      <div className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-2 transition-all duration-700 ease-in-out hover:scale-[1.01]">
        {/* Image */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={image}
            alt="Who we are"
            className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md "
          />
        </div>

        {/* Paragraph beside image */}
        <div className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify">
          <h1 className="uppercase text-2xl font-bold text-left mb-6">
            Vision
          </h1>
          <p>
           <span class="font-bold">“Let’s build a team, Let’s build a vision, Let’s build a plan, Let’s build success.” </span> This reflects the club’s dedication to serving society and staying committed to a purposeful path of positive community impact and youth empowerment.

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
        <div className="md:w-1/3 flex justify-center">
          <img
            src={image}
            alt="Who we are"
            className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md "
          />
        </div>
      </div>

      {/* Awards Section */}
      <div className="px-4 sm:px-6 lg:px-20 xl:px-32 py-10 transition-all duration-700 ease-in-out mt-10 ">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[black]">
          Awards
        </h1>

        <div className="mt-8 flex justify-center ">
          <img
            src={book}
            alt="image book"
            className="w-full  h-auto rounded-xl shadow-md object-cover transition-all duration-700 ease-in-out hover:scale-[1.01]"
          />
        </div>
      </div>
    </div>
  );
}

export default Content;
