import React, { useState } from "react";
import ProjectHeader from "../Elements/ProjectShowcase/ProjectHeader";
import ProjectFilter from "../Elements/ProjectShowcase/ProjectFilter";
import ProjectGrid from "../Elements/ProjectShowcase/ProjectGrid";
import ProjectDialog from "../Elements/ProjectShowcase/ProjectDialog";

// Main project images
import image1 from "../../../src/assets/ProjectShowcase/seedforhope.jpg";
import image2 from "../../../src/assets/ProjectShowcase/hope1.jpg";
import image3 from "../../../src/assets/ProjectShowcase/senehase1.jpg";
import image4 from "../../../src/assets/ProjectShowcase/sahasra1.jpg";
import image5 from "../../../src/assets/ProjectShowcase/poddonta_dawasak2.jpg";

// Seeds for Hope project images
import seedsImage1 from "../../../src/assets/ProjectShowcase/seed2.jpg";
import seedsImage2 from "../../../src/assets/ProjectShowcase/seed3.jpg";
import seedsImage3 from "../../../src/assets/ProjectShowcase/seed4.jpg";
import seedsImage4 from "../../../src/assets/ProjectShowcase/seed5.jpg";
 
// Hope for paws project images
import HopeImage1 from "../../../src/assets/ProjectShowcase/hope2.jpg";
import HopeImage2 from "../../../src/assets/ProjectShowcase/hope3.jpg";
import HopeImage3 from "../../../src/assets/ProjectShowcase/hope4.jpg";
import HopeImage4 from "../../../src/assets/ProjectShowcase/hope5.jpg";

// Senehase arunalu project images
import SenehaseImage1 from "../../../src/assets/ProjectShowcase/senehase5.jpg";
import SenehaseImage2 from "../../../src/assets/ProjectShowcase/senehase2.jpg";
import SenehaseImage3 from "../../../src/assets/ProjectShowcase/senehase3.jpg";
import SenehaseImage4 from "../../../src/assets/ProjectShowcase/senehase4.jpg";

// Sahasra images
import SahasraImage1 from "../../../src/assets/ProjectShowcase/sahasra2.jpg";
import SahasraImage2 from "../../../src/assets/ProjectShowcase/sahasra3.jpg";
import SahasraImage3 from "../../../src/assets/ProjectShowcase/sahasra4.jpg";
import SahasraImage4 from "../../../src/assets/ProjectShowcase/sahasra5.jpg";

// Poddonta dawasak images
import PoddontaImage1 from "../../../src/assets/ProjectShowcase/poddonta_dawasak2.jpg";
import PoddontaImage2 from "../../../src/assets/ProjectShowcase/poddonta_dawasak3.jpg";
import PoddontaImage3 from "../../../src/assets/ProjectShowcase/poddonta_dawasak4.jpg";
import PoddontaImage4 from "../../../src/assets/ProjectShowcase/poddonta_dawasak5.jpg";

function ProjectShowcasePage() {
  const [projects] = useState([
 {
      title: "Seeds for hope",
      subtitle: "Empowering rural students through education, leadership, and life skills for a brighter, drug-free future.",
      description:
        "The Leo Club of Uva Wellassa University conducts the Seeds of Hope project to provide Nika/Wari/Ganthiriyawa Maha Vidyalaya students with educational growth together with personal advancement opportunities. The project operates under Education and Literacy while also focusing on Spotlight on Children to offer assistance to students who lack resources and guidance because of their rural setting. The project enables students to develop self-assurance through training in leadership along with motivational sessions and skills workshops that foster ambition and limitless dreaming capabilities. The program includes Drug Prevention and Rehabilitation education to teach students proper healthy choices during their developmental years. Community partnerships and local support enable Seeds of Hope to develop student belonging and self-belief which enables them to conquer obstacles while pursuing their goals.",
      date: "11/04/2025",
      location: "Nika/Wari/Ganthiriyawa Maha Vidyalaya",
      year: "2025",
      image: image1,
      sliderImages: [ seedsImage1, seedsImage2, seedsImage3, seedsImage4]
    },
    {
      title: "Hope for Paws",
      subtitle: "Nurturing compassion and responsibility through care and protection for stray dogs in our community.",
      description:
        "Hope for Paws is an initiative by the Leo Club of Uva Wellassa University, aimed at supporting approximately 150 stray dogs within the university premises and Badulla town area. The project focuses on providing nutritious meals and raising awareness about the importance of animal welfare. Conducted in collaboration with the volunteer group Happy Tail UWU, the project was carried out in two phases: a feeding program on January 18, 2025, and a planned vaccination program for dogs suffering from tick fever. Through volunteer engagement and community participation, the project successfully fostered compassion and responsibility towards stray animals.",
      date: "18/01/2025",
      location: "Uva Wellassa University and Badulla town area ",
      year: "2025",
      image: image2,
      sliderImages: [ HopeImage1, HopeImage2, HopeImage3, HopeImage4]
    },
    {
      title: "Senehase Arunelu ",
      subtitle: "Spreading joy, love, and care to elders through heartfelt connection, health support, and cherished moments.",
      description:
        "Senasuma Elders’ Home located in Bandarawela, aims to enhance the mental and physical well-being of our own mothers and fathers and provide them an unforgettable experience. We tried to highlight their singing and dancing abilities by doing fun activities. The primary mission of our project was to spend time with them, giving them joy, love and compassion they have never received before. We also inquired about their health conditions and provided them with the necessary treatment.",
      date: "19/10/2024",
      location: "Senasuma Elders’ Home - Bandarawela ",
      year: "2024",
      image: image3,
      sliderImages: [ SenehaseImage1, SenehaseImage2, SenehaseImage3, SenehaseImage4]
    },
    {
      title: " ඌව සහශ්‍රා 2022",
      subtitle: "Promoting agricultural entrepreneurship and economic resilience through the cultivation and value addition of sweet tamarind.",
      description:
        "Our main objective of implement the project Uva Sahashra is to promote exportation and value addition as the main solution for the current economic crisis in the country. Our aim is to create more entrepreneurs in the agriculture sector. Here we plant grafted sweet tamarind plants, which have high economic and medicinal values. Sweet tamarind is an underutilized fruit crop in Sri Lanka. So, we wanted to popularize the crop among the community. As a first step to achieving our objective, we started this as a model. We plant these  plants in the university premises. It will aid some research purposes of the undergraduates also. By popularizing sweet tamarind, we can reduce the importation of sweet tamarind from other countries like India and Thailand.",
      date: "26/11/2022",
      location: "Uva Wellassa University Premises",
      year: "2022",
      image: image4,
      sliderImages: [SahasraImage1, SahasraImage2, SahasraImage3, SahasraImage4]
    },
    {
      title: "Poddanta Dawasak ",
      subtitle: "Celebrating childhood and empowering young minds through joy, unity, and growth on World Children’s Day.",
      description:
        "Project PODDANTA DAWASAK, organized by the Leo Club of Uva Wellassa University, aims to provide the children of Kahataruppa Upananda Sunday School, located outside Badulla, with an exceptional and memorable experience on World Children's Day. Through a well-planned event filled with fun activities, leadership development, and creative opportunities, we seek to celebrate childhood while empowering these young minds for a brighter future. Our project's core mission is to instil joy, unity, and personal growth, leaving an indelible mark on the children's lives and the community at large.",
      date: "01/10/2023",
      location: "Kahataruppa Upananda Sunday School ",
      year: "2023",
      image: image5,
      sliderImages: [ PoddontaImage1, PoddontaImage2, PoddontaImage3, PoddontaImage4]
    },
  ]);

  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((p) => p.year === selectedYear);
  const years = [...new Set(projects.map(p => p.year))].sort().reverse();

  const openDialog = (project) => {
    setSelectedProject(project);
  };

  const closeDialog = () => {
    setSelectedProject(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans mt-20">
      <ProjectHeader />
      <ProjectFilter 
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      <ProjectGrid 
        projects={filteredProjects}
        onProjectClick={openDialog}
      />
      <ProjectDialog 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeDialog}
        sliderImages={selectedProject ? selectedProject.sliderImages : []}
      />
    </div>
  );
}

export default ProjectShowcasePage;