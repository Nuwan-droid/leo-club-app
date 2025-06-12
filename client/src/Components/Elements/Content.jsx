import image from '../../assets/image.jpeg';

function Content() {
  return (
    <div className="bg-[#E0ECFF] py-10 px-4 md:px-16">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-4">
        WHO ARE WE?
      </h1>

      {/* Paragraph under the heading */}
      <p className="text-black text-lg leading-relaxed text-justify pt-8 mb-16">
        We are a passionate group committed to creating positive change in our community. Through service, leadership, and teamwork, we aim to inspire and empower individuals to make a lasting impact.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos eaque eos, vel vero cum, maiores commodi voluptatibus eligendi a repellat aperiam iste! Eaque labore consequuntur minima ducimus odio veritatis, adipisci suscipit ut pariatur asperiores officia modi excepturi, amet illo assumenda tempora enim est soluta repellat distinctio quas delectus doloremque exercitationem! Soluta, a. Omnis reprehenderit, libero veniam ratione aspernatur alias animi minima doloribus sapiente voluptatum. Voluptates asperiores illum esse a dolore excepturi? Reiciendis libero, adipisci maxime expedita ratione reprehenderit quisquam quibusdam magni omnis at laborum quae illo maiores sunt unde, repellat totam a cupiditate? Ab quos veniam ipsum itaque voluptatum!
         We are a passionate group committed to creating positive change in our community. Through service, leadership, and teamwork, we aim to inspire and empower individuals to make a lasting impact.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos eaque eos, vel vero cum, maiores commodi voluptatibus eligendi a repellat aperiam iste! Eaque labore consequuntur minima ducimus odio veritatis, adipisci suscipit ut pariatur asperiores officia modi excepturi, amet illo assumenda tempora enim est soluta repellat distinctio quas delectus doloremque exercitationem! Soluta, a. Omnis reprehenderit, libero veniam ratione aspernatur alias animi minima doloribus sapiente voluptatum. Voluptates asperiores illum esse a dolore excepturi? Reiciendis libero, adipisci maxime expedita ratione reprehenderit quisquam quibusdam magni omnis at laborum quae illo maiores sunt unde, repellat totam a cupiditate? Ab quos veniam ipsum itaque voluptatum!
      </p>

      {/* Image and second paragraph in styled card */}
      <div className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-10">
  {/* Image */}
  <div className="md:w-1/3 flex justify-center">
    <img
      src={image}
      alt="Who we are"
      className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md"
    />
  </div>


        {/* Paragraph beside image */}
        <div className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify">
        <h1 className="uppercase text-2xl font-bold text-letf  mb-8"> Team Work </h1>
          <p>
            Our team works tirelessly on a range of community projects — from education to environmental sustainability — driven by our shared values of compassion and innovation. We believe in the power of collective action and strive to uplift those around us through meaningful service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Content;
