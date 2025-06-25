import React from 'react';
import ProfileSection from './profile_section';
import ContributionSection from './contribution';
import EventVolunteeringSection from './eventVolunteering';
import QuickLinks from './quicklinks';
import MemberPortalNav from './memberportalnav';

const MemberPortal = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MemberPortalNav/>
        <ProfileSection />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3">
            <ContributionSection />
            <EventVolunteeringSection />
          </div>
          <div className="lg:col-span-1">
            <QuickLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPortal;

