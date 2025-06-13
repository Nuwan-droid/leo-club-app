import Stat from "./Stat";
import { User, FolderKanban, Newspaper, Award } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="relative -top-[100px] bg-white rounded-3xl shadow-2xl p-8 w-full max-w-6xl mx-auto mt-10 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat end={1200} label="Members" Icon={User} />
        <Stat end={320} label="Projects" Icon={FolderKanban} />
        <Stat end={850} label="Newsletters" Icon={Newspaper} />
        <Stat end={45} label="Awards" Icon={Award} />
      </div>
    </div>
  );
};

export default StatsSection;
