import React, { useState, useEffect } from "react";
import Stat from "./Stat";
import { UserCircle, Briefcase, Newspaper, Trophy } from "lucide-react";

const StatsSection = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [newsletterCount, setNewsletterCount] = useState(0); 
  const [awardCount, setAwardCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
       
        const resMembers = await fetch("http://localhost:5001/api/users/members/count");
        const dataMembers = await resMembers.json();
        setMemberCount(dataMembers.count);

       
        const resProjects = await fetch("http://localhost:5001/api/projects/allprojects");
        const dataProjects = await resProjects.json();
        setProjectCount(dataProjects.length);

       
        const resNewsletters = await fetch("http://localhost:5001/api/newsletters");
        const dataNewsletters = await resNewsletters.json();
        setNewsletterCount(dataNewsletters.newsletters ? dataNewsletters.newsletters.length : 0);

       
        const resAwards = await fetch("http://localhost:5001/api/awards");
        const dataAwards = await resAwards.json();
        setAwardCount(dataAwards.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="pb-8 -mt-18 bg-gradient-to-br from-white to-blue-50 flex justify-center">
      <div className="w-4/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

         
          <div className="bg-white shadow-xl rounded-2xl p-4 hover:scale-[1.03] transition duration-300">
            <Stat
              end={memberCount}
              label="Members"
              Icon={() => (
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <UserCircle className="w-8 h-8" />
                </div>
              )}
            />
          </div>

        
          <div className="bg-white shadow-xl rounded-2xl p-4 hover:scale-[1.03] transition duration-300">
            <Stat
              end={projectCount}
              label="Projects"
              Icon={() => (
                <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                  <Briefcase className="w-8 h-8" />
                </div>
              )}
            />
          </div>

         
          <div className="bg-white shadow-xl rounded-2xl p-4 hover:scale-[1.03] transition duration-300">
            <Stat
              end={newsletterCount}
              label="News Letters"
              Icon={() => (
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <Newspaper className="w-8 h-8" />
                </div>
              )}
            />
          </div>

        
          <div className="bg-white shadow-xl rounded-2xl p-4 hover:scale-[1.03] transition duration-300">
            <Stat
              end={awardCount}
              label="Awards"
              Icon={() => (
                <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
                  <Trophy className="w-8 h-8" />
                </div>
              )}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatsSection;