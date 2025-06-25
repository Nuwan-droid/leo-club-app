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
import image6 from "../../../src/assets/ProjectShowcase/thuthi aranalu.jpg";
import image7 from "../../../src/assets/ProjectShowcase/sparsha1.jpg";
import image8 from "../../../src/assets/ProjectShowcase/zephyra1.jpg";
import image9 from "../../../src/assets/ProjectShowcase/hopefortommorrow1.jpg";
import image10 from "../../../src/assets/ProjectShowcase/alokayathra1.jpg";
import image11 from "../../../src/assets/ProjectShowcase/mangomates1.jpg";

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


//thuthi arunalu images
import ThuthiImage1 from "../../../src/assets/ProjectShowcase/thuthi aranalu2.jpg";
import ThuthiImage2 from "../../../src/assets/ProjectShowcase/thuthi aranalu3.jpg";
import ThuthiImage3 from "../../../src/assets/ProjectShowcase/thuthi aranalu4.jpg";
import ThuthiImage4 from "../../../src/assets/ProjectShowcase/thuthi aranalu5.jpg";

// Sparsha images
import SparshaImage1 from "../../../src/assets/ProjectShowcase/sparsha2.jpg"; 
import SparshaImage2 from "../../../src/assets/ProjectShowcase/sparsha3.jpg";
import SparshaImage3 from "../../../src/assets/ProjectShowcase/sparsha4.jpg";
import SparshaImage4 from "../../../src/assets/ProjectShowcase/sparsha5.jpg";

// Zephyra images
import ZephyraImage1 from "../../../src/assets/ProjectShowcase/zephyra2.jpg";
import ZephyraImage2 from "../../../src/assets/ProjectShowcase/zephyra3.jpg";
import ZephyraImage3 from "../../../src/assets/ProjectShowcase/zephyra4.jpg"; 
import ZephyraImage4 from "../../../src/assets/ProjectShowcase/zephyra5.jpg";

// Hope for Tomorrow images
import HopeTomorrowImage1 from "../../../src/assets/ProjectShowcase/hopefortommorrow2.jpg";
import HopeTomorrowImage2 from "../../../src/assets/ProjectShowcase/hopefortommorrow3.jpg";
import HopeTomorrowImage3 from "../../../src/assets/ProjectShowcase/hopefortommorrow4.jpg";
import HopeTomorrowImage4 from "../../../src/assets/ProjectShowcase/hopefortommorrow5.jpg";

// Alokayathra images
import AlokayathraImage1 from "../../../src/assets/ProjectShowcase/alokayathra2.jpg";
import AlokayathraImage2 from "../../../src/assets/ProjectShowcase/alokayathra3.jpg";
import AlokayathraImage3 from "../../../src/assets/ProjectShowcase/alokayathra4.jpg";
import AlokayathraImage4 from "../../../src/assets/ProjectShowcase/alokayathra5.jpg";

// Mangomate images
import MangomateImage1 from "../../../src/assets/ProjectShowcase/mangomates2.jpg";
import MangomateImage2 from "../../../src/assets/ProjectShowcase/mangomates3.jpg";
import MangomateImage3 from "../../../src/assets/ProjectShowcase/mangomates4.jpg";

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
    {
      title: "තුති අරුණලු ",
      subtitle: "Honoring unsung heroes through gratitude, wellness, and meaningful connection with the university community.",
      description:
        "The Leo Club of Uva Wellassa University started Thuthi Arunalu as a community initiative to express gratitude toward essential university personnel consisting of maintenance workers and cleaning staff. The daily operations of the institution heavily depend on these important personnel who face demanding work while dealing with stress and lacking recognition. As part of the project, the organization established recreational activities together with wellness programs and appreciation events for stress reduction and belonging development. The Leo Club managed to coordinate volunteers and secure necessary resources by partnering with members of the community even though they faced collection and coordination obstacles. Thuthi Arunalu allows the Leo Club to show its dedication toward building leadership skills as it promotes appreciation alongside social responsibility and meaningful community connections among university students.",
      date: "01/02/2025",
      location: "Uva Wellassa University E2 lecture hall ",
      year: "2025",
      image: image6,
      sliderImages: [ThuthiImage1, ThuthiImage2, ThuthiImage3, ThuthiImage4 ]
    },

    {
      title: "ස්පර්ශ 💞 ",
      subtitle: "A celebration of love, talent, and togetherness through music, dance, and heartfelt connection.",
      description:
        "The “Sparsha” Valentine Concert, organized by the Leo Club of Uva Wellassa University, is a vibrant music, dance, and drama event scheduled for January 29, 2025, at the E-Lecture Hall. Designed to benefit over 500 university students, the concert offers a platform for young artists to showcase their talents while fostering unity, enhancing emotional well-being, and providing leadership and event management opportunities for Leo members. More than just a musical celebration, “Sparsha” is a tribute to all forms of love, romantic, platonic, and self-love, bringing together students from diverse backgrounds in an atmosphere filled with warmth, connection, and memorable experiences. ",
      date: "29/01/2025",
      location: "Uva Wellassa University E1 lecture hall ",
      year: "2025",
      image: image7,
      sliderImages: [SparshaImage1, SparshaImage2, SparshaImage4, SparshaImage3 ]
    },
        {
      title: "Zephyra ",
      subtitle: "Honoring leadership, unity, and service through a memorable and inspiring Third Installation Ceremony.",
      description:
        "The Third Installation Ceremony was a grand event where new Leo Club members were officially assigned their roles, showing their dedication to leadership and readiness for guiding and community service. The ceremony comprised of badge presentations, speeches and a feeling of fellowship amongst the members. This project helped to achieve its main focus of acknowledging leadership and also fostered the feeling of unity and loyalty among members in Leo Club. And the success of event has been mirrored by kind words and continued already existing enthusiastic from Leo community side. ",
      date: "12/08/2024",
      location: "Uva Wellassa University  ",
      year: "2024",
      image: image8,
      sliderImages: [ZephyraImage1, ZephyraImage2, ZephyraImage3, ZephyraImage4 ]
    },
      {
      title: "𝐇𝐎𝐏𝐄 𝐅𝐎𝐑 𝐓𝐎𝐌𝐎𝐑𝐑𝐎𝐖  ",
      subtitle: "Empowering underprivileged students with essential school supplies to foster learning, hope, and community support.",
      description:
        "This project focuses on supporting underprivileged school children at CP/KOT/Sri Maliyadewa Maha Vidyalaya, Vijayabahukanda, and a rural school near Kothmale. Many students face financial hardship, limiting their access to essential educational materials and leading to high dropout rates. To support these students, we provided school supplies, such as books, pens, and erasers. Through these efforts, the project aims to encourage students to  and  create a more supportive learning environment, promote volunteerism, and engage the local community in advancing educational opportunities for children in need.  ",
      date: "26/10/2024",
      location: "Uva Wellassa University  ",
      year: "2024",
      image: image9,
      sliderImages: [HopeTomorrowImage1, HopeTomorrowImage2, HopeTomorrowImage3, HopeTomorrowImage4]
    },
      {
      title: " ආලෝක යාත්‍රා 🪔☸️",
      subtitle: "Aloka Yathra — Illuminating unity and creativity through inter-university Poson Poya celebration and digital expression",
      description:
        "Aloka Yathra is an inter-university Poson Poya themed digital competition organized by the Leo Club of Uva Wellassa University to promote unity, innovation, and healthy competition among students from various universities. The event aims to provide students with a platform to showcase themselves and their universities while fostering a sense of unity among Leo clubs. With over 40 participants expected, supported by esteemed judges, the competition promises to be lively and impactful, enhancing the experience for all involved.  ",
      date: "29/07/2024",
      location: "online ",
      year: "2024",
      image: image10,
      sliderImages: [AlokayathraImage1, AlokayathraImage2,AlokayathraImage3, AlokayathraImage4]
    },
    {
      title: " Mangomate🥭",
      subtitle: "Celebrating friendship and creativity through shared memories and meaningful connections.",
      description:
        "The Mangomate Friendship Day program, organized by the Leo Club of Uva Wellassa University, provided a platform for students to celebrate Friendship Day by sharing creative content, such as videos, poems, and art, which reflected their bonds with friends. Held online, the event aimed to strengthen cooperation among students while showcasing their creativity and memories.",
      date: "20/08/2024",
      location: "online ",
      year: "2024",
      image: image11,
      sliderImages: [MangomateImage1,MangomateImage2,MangomateImage3]
    },

  ]);

  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedProject, setSelectedProject] = useState(null);

  
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

  // Sort projects by date in descending order (newest first)
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB - dateA;
  });

  const filteredProjects = sortedProjects.filter((p) => p.year === selectedYear);
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