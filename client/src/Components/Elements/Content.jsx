import image from "../../assets/image.jpeg";
import book from "../../assets/book.jpg";

function Content() {
  return (
    <div className="bg-[#E0ECFF] py-10 px-4 md:px-16 transition-all duration-500 ease-in-out">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-4 transition-all duration-500 ease-in-out">
        WHO ARE WE?
      </h1>

      {/* Paragraph under the heading */}
      <p className="text-black text-lg leading-relaxed text-justify pt-8 mb-16 transition-all duration-500 ease-in-out">
        We are a passionate group committed to creating positive change in our
        community. Through service, leadership, and teamwork, we aim to inspire
        and empower individuals to make a lasting impact. Lorem ipsum dolor sit
        amet consectetur adipisicing elit...
      </p>

      {/* Image and second paragraph in styled card */}
      <div className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-10 transition-all duration-700 ease-in-out hover:scale-[1.01]">
        {/* Image */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={image}
            alt="Who we are"
            className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Paragraph beside image */}
        <div className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify">
          <h1 className="uppercase text-2xl font-bold text-left mb-8">
            Team Work
          </h1>
          <p>
            Our team works tirelessly on a range of community projects — from
            education to environmental sustainability — driven by our shared
            values...
          </p>
        </div>
      </div>

      {/* Inverted image section */}
      <div className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-10 mt-10 transition-all duration-700 ease-in-out hover:scale-[1.01]">
        {/* Paragraph beside image */}
        <div className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify">
          <h1 className="uppercase text-2xl font-bold text-left mb-8">
            Team Work
          </h1>
          <p>
            Our team works tirelessly on a range of community projects — from
            education to environmental sustainability — driven by our shared
            values...
          </p>
        </div>

        {/* Image on the right */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={image}
            alt="Who we are"
            className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Awards Section */}
      <div className="px-4 sm:px-6 lg:px-20 xl:px-32 py-10 transition-all duration-700 ease-in-out">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[black]">
          Awards
        </h1>

        <div className="mt-8 flex justify-center">
          <img
            src={book}
            alt="image book"
            className="w-full  h-auto rounded-xl shadow-md object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default Content;
