import React from 'react';
import clubImage from '../../assets/AboutImages/2.png';
import presidentImage from '../../assets/AboutImages/president.png';

const About = () => {
  const executiveMembers = [
    { name: 'Leo Jane Smith', role: 'Vice President', image: presidentImage },
    { name: 'Leo Mike Johnson', role: 'Secretary', image: presidentImage },
    { name: 'Leo Sarah Wilson', role: 'Treasurer', image: presidentImage },
    { name: 'Leo David Brown', role: 'Membership Director', image: presidentImage },
    { name: 'Leo Emily Davis', role: 'Service Director', image: presidentImage },
    { name: 'Leo Chris Miller', role: 'Marketing Director', image: presidentImage },
    { name: 'Leo Lisa Anderson', role: 'Events Coordinator', image: presidentImage },
    { name: 'Leo Tom Garcia', role: 'Public Relations', image: presidentImage },
    { name: 'Leo Anna Martinez', role: 'IT Director', image: presidentImage },
    { name: 'Leo Kevin Lee', role: 'Fundraising Director', image: presidentImage },
    { name: 'Leo Rachel Taylor', role: 'Youth Coordinator', image: presidentImage },
    { name: 'Leo Alex Johnson', role: 'Social Media Manager', image: presidentImage },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <section className="bg-white/90 backdrop-blur-md p-8 lg:p-12 my-8 lg:my-12 rounded-xl shadow-lg border border-gray-200">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 mb-10 lg:mb-16">
            <div className="w-full lg:w-[350px] h-[350px] relative -ml-4 -mt-6 flex-shrink-0">
              <img
                src={clubImage}
                alt="Leo Club"
                className="w-full h-full rounded-lg shadow-md border-2 border-white transition-transform duration-300 hover:-translate-y-2 hover:scale-105 object-cover"
              />
            </div>
            <div className="lg:ml-2">
              <p className="text-lg text-gray-700 mb-4 [text-align:justify]" >
                Leo clubs are a youth organization of Lions Clubs International. Leo club members are young people ages 12-30 who want to help their community and the world. Through dedicated service and leadership development, we strive to make meaningful contributions to our local and global communities.
              </p>
              <p className="text-lg text-gray-700 mb-4 [text-align:justify]">
                The Leo Club of Uva Wellassa University is dedicated to developing leadership skills while serving our community. Through various service projects and activities, we aim to make a positive impact on society while fostering personal growth and building lasting friendships. Our members engage in diverse initiatives that address social, environmental, and educational challenges. Our club provides opportunities for young leaders to develop their skills, engage in meaningful community service, and connect with like-minded individuals who share a passion for making a difference. We believe in empowering youth to become responsible citizens and future leaders who will continue to serve their communities with dedication and integrity.
              </p>
            </div>
          </div>

          <h2 className="text-center text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent mb-8 lg:mb-12">
            Our Executive Committee
          </h2>
          <div className="flex justify-center mb-10 lg:mb-12 px-4">
            <div className="flex bg-white rounded-lg shadow-md w-[450px] lg:w-[500px] h-[280px] overflow-hidden">
              <div className="w-3/5 h-full overflow-hidden">
                <img
                  src={presidentImage}
                  alt="President"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/5 p-4 lg:p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Leo John Doe</h3>
                <p className="text-sm font-medium text-gray-600 uppercase">President</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
            {executiveMembers.map((member, index) => (
              <div key={index} className="relative w-full max-w-[220px] mx-auto mb-8 lg:mb-12">
                <div className="w-full h-[300px] bg-white flex items-center justify-center rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                  <img
                    src={member.image}
                    alt={member.role}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-[180px] h-[90px] p-3 bg-white rounded-lg shadow-md flex flex-col items-center justify-start transition-all hover:-translate-y-2 hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-gray-600 uppercase">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;