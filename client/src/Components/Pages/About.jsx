import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clubImage from '../../assets/AboutImages/2.png';


const About = () => {
  console.log('About component is loading...');
  
  const [executiveMembers, setExecutiveMembers] = useState([]);
  const [president, setPresident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchExecutiveMembers = async () => {
      try {
        setLoading(true);
        console.log('Fetching executive members from API...');
        const response = await axios.get('/api/executive-members');
        console.log('API Response:', response.data);
        
        if (response.data.success) {
          const members = response.data.data;
          console.log('Members found:', members.length);
          
          // Separate president from other members
          const presidentMember = members.find(member => 
            member.position.toLowerCase().includes('president') && 
            !member.position.toLowerCase().includes('vice')
          );
          console.log('President found:', presidentMember);
          
          const otherMembers = members.filter(member => 
            !(member.position.toLowerCase().includes('president') && 
            !member.position.toLowerCase().includes('vice'))
          );
          console.log('Other members found:', otherMembers.length);
          
          setPresident(presidentMember);
          setExecutiveMembers(otherMembers);
        }
      } catch (err) {
        setError('Failed to fetch executive members');
        console.error('Error fetching executive members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExecutiveMembers();
  }, []);

 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading executive members...</p>
        </div>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
          
          {/* President Section */}
          {president && (
            <div className="flex justify-center mb-10 lg:mb-12 px-4">
              <div className="flex bg-white rounded-lg shadow-md w-[450px] lg:w-[500px] h-[280px] overflow-hidden">
                <div className="w-3/5 h-full overflow-hidden">
                  <img
                    src={president.image_path}
                    alt="President"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = clubImage; // Fallback image
                    }}
                  />
                </div>
                <div className="w-2/5 p-4 lg:p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    {president.first_name} {president.last_name}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 uppercase">{president.position}</p>
                </div>
              </div>
            </div>
          )}

          {/* Other Executive Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
            {executiveMembers.map((member, index) => (
              <div key={member._id || index} className="relative w-full max-w-[220px] mx-auto mb-8 lg:mb-12">
                <div className="w-full h-[300px] bg-white flex items-center justify-center rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                  <img
                    src={member.image_path}
                    alt={member.position}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.src = clubImage; // Fallback image
                    }}
                  />
                </div>
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-[180px] h-[90px] p-3 bg-white rounded-lg shadow-md flex flex-col items-center justify-start transition-all hover:-translate-y-2 hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-1 text-center">
                    {member.first_name} {member.last_name}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 uppercase text-center">{member.position}</p>
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