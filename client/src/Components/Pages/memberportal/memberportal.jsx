import React from 'react';
import ProfileSection from './profile_section';
import ContributionSection from './contribution';
import EventVolunteeringSection from './eventVolunteering';
import QuickLinks from './quicklinks';
import MemberPortalNav from './memberportalnav';

const MemberPortal = () => {
  return (
   
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      
      <MemberPortalNav />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        
        {/* ProfileSection with staggered animation */}
        <div className="w-full animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <ProfileSection />
        </div>
        
        {/* Main content grid */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-8 mt-8">
          
          <div className="xl:col-span-3 lg:col-span-2 space-y-8">
            {/* ContributionSection with staggered animation */}
            <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              <ContributionSection />
            </div>
            {/* EventVolunteeringSection with staggered animation */}
            <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              <EventVolunteeringSection />
            </div>
          </div>
          
          <div className="xl:col-span-1 lg:col-span-1 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <QuickLinks />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberPortal;

