import React from "react";
import Stat from "./Stat";
import {
  UserCircle,
  Briefcase,
  Newspaper,
  Trophy,
} from "lucide-react";

const StatsSection = () => {
  return (
   
    <div className="pb-8 -mt-18 bg-gradient-to-br  from-white to-blue-50 flex justify-center ">
      <div className="w-4/5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow-xl rounded-2xl p-4 hover:scale-[1.03] transition duration-300">
            <Stat
              end={1200}
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
              end={345}
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
              end={78}
              label="News Leters"
              Icon={() => (
                <div className="bg-green-100 text-green-600 p-3 rounded-full">
                  <Newspaper className="w-8 h-8" />
                </div>
              )}
            />
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-4 hover:scale-[1.03] transition duration-300">
            <Stat
              end={25}
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
