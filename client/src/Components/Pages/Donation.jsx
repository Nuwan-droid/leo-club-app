import React, { useState } from 'react';
import lionImage from '../../assets/DonateImages/Lion.png';
import project1Image from '../../assets/DonateImages/project2.jpg';
import project2Image from '../../assets/DonateImages/project1.jpg';
import { useNavigate } from 'react-router-dom';

const Donation = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('schedule');
  const [donations, setDonations] = useState({
    1: { books: 20, pens: 60 },
    2: { books: 20, pens: 0, tablet: 0 },
  });
  const [clubFund, setClubFund] = useState(54450);
  const [detailsVisible, setDetailsVisible] = useState({ 1: false, 2: false });

  const handleDonate = (type, projectId) => {
    if (projectId === 'club') {
      const amount = Math.floor(Math.random() * 100) + 50;
      setClubFund((prev) => prev + amount);
      alert(`Thank you for donating Rs.${amount} to the club fund!`);
      return;
    }

    setDonations((prev) => {
      const newDonations = { ...prev };
      if (type === 'books') {
        newDonations[projectId].books += 1;
        if (projectId === 2) newDonations[2].tablet += 1;
      } else if (type === 'pens') {
        newDonations[projectId].pens += 1;
      }
      return newDonations;
    });

    if (type === 'books') {
      alert('Thank you for donating books!');
    } else if (type === 'pens') {
      alert('Thank you for donating pens!');
    } else if (type === 'money') {
      const amount = Math.floor(Math.random() * 200) + 25;
      alert(`Thank you for your monetary donation of Rs.${amount}!`);
    }
  };

  const toggleDetails = (projectId) => {
    setDetailsVisible((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

        <div className="h-[100px]"></div>  

      <div className="container mx-auto p-6 lg:p-8">
        {/* Header */}
        <header className="header mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
            Make a Donation
          </h1>
          <p className="description text-sm lg:text-base text-gray-600 text-justify">
            The Leo Club of Uva Wellassa University is committed to creating
            lasting, positive change in our communities. From empowering youth
            and supporting education to helping families in need, protecting the
            environment, and bringing smiles to those who are often forgotten,
            our journey of service continues with passion and purpose. Your kind
            donation helps us extend our reach and deepen our impact. Whether
            it's providing school supplies to underprivileged children,
            organizing blood donation campaigns, or responding to urgent
            community needs, your support plays a vital role in making these
            initiatives a reality.
          </p>
        </header>

        {/* Top Cards - Centered */}
        <div className="top-cards flex flex-col lg:flex-row justify-center gap-5 mb-8 lg:mb-12">
          <div
            className={`top-card w-[200px] h-[220px] rounded-lg flex flex-col items-center justify-start text-center cursor-pointer transition-all duration-300 ${
              activeSection === 'schedule'
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-800 shadow-lg'
                : 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-md'
            } hover:-translate-y-2 hover:shadow-lg p-4`}
            onClick={() => setActiveSection('schedule')}
          >
            <div
              className="top-card-image w-full h-[110px] rounded-md bg-cover bg-center mb-4 border-2"
              style={{ backgroundImage: `url(${lionImage})`, borderColor: activeSection === 'schedule' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)' }}
            ></div>
            <div className="top-card-content flex-1 flex items-center">
              <h3 className="text-sm font-semibold">Donate for Schedule Projects</h3>
            </div>
          </div>
          <div
            className={`top-card w-[200px] h-[220px] rounded-lg flex flex-col items-center justify-start text-center cursor-pointer transition-all duration-300 ${
              activeSection === 'club'
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-800 shadow-lg'
                : 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-md'
            } hover:-translate-y-2 hover:shadow-lg p-4`}
            onClick={() => setActiveSection('club')}
          >
            <div
              className="top-card-image w-full h-[110px] rounded-md bg-cover bg-center mb-4 border-2"
              style={{ backgroundImage: `url(${lionImage})`, borderColor: activeSection === 'club' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)' }}
            ></div>
            <div className="top-card-content flex-1 flex items-center">
              <h3 className="text-sm font-semibold">Donate Club Funds</h3>
            </div>
          </div>
        </div>

        {/* Schedule Projects Section */}
        <div
          id="schedule-section"
          className={`content-section ${activeSection === 'schedule' ? 'block' : 'hidden'}`}
        >
          <div className="project-cards flex flex-col lg:flex-row gap-5 justify-start">
            {/* Project 1 */}
            <div className="project-card w-[200px] bg-white rounded-lg shadow-md overflow-hidden">
              <div className="project-header bg-blue-100 p-2 flex items-center gap-2">
                <div className="project-icon w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                  📚
                </div>
                <h3 className="text-xs font-semibold text-gray-800">Seeds for Hope</h3>
              </div>
              <div
                className="project-image h-[150px] bg-cover bg-center"
                style={{ backgroundImage: `url(${project1Image})` }}
              ></div>
              <div className="project-content p-3">
                <div className="funding-item mb-2">
                  <div className="funding-label text-xs font-semibold text-gray-800 mb-1">
                    Books
                  </div>
                  <div className="funding-bar flex justify-between items-center bg-gray-200 p-1 rounded text-xs">
                    <span className="required-text text-orange-500 font-medium">
                      Required: 50
                    </span>
                    <span className="received-text text-green-600 font-medium">
                      Received: {donations[1].books}
                    </span>
                  </div>
                </div>
                <div className="funding-item mb-2">
                  <div className="funding-label text-xs font-semibold text-gray-800 mb-1">
                    Pens
                  </div>
                  <div className="funding-bar flex justify-between items-center bg-gray-200 p-1 rounded text-xs">
                    <span className="required-text text-orange-500 font-medium">
                      Required: 100
                    </span>
                    <span className="received-text text-green-600 font-medium">
                      Received: {donations[1].pens}
                    </span>
                  </div>
                </div>
                <button
                  className="see-more-btn text-xs text-blue-500 underline mb-2"
                  onClick={() => toggleDetails(1)}
                >
                  {detailsVisible[1] ? 'See less' : 'See more'}
                </button>
                <div
                  className={`project-details text-xs ${detailsVisible[1] ? 'block' : 'hidden'} bg-gray-50 p-2 rounded mb-2`}
                >
                  <div className="detail-row mb-1">
                    <span className="detail-label font-semibold text-gray-800">
                      Date:  July 30, 2025

                    </span>
                     July 30, 2025
                   
                  </div>
                  <div className="detail-row mb-1">
                    <span className="detail-label font-semibold text-gray-800">
                      Venue:  Kurukulava Maha Vidyalaya

                    </span>
                     Kurukulava Maha Vidyalaya

                  </div>
                  <div className="detail-row">
                    <span className="detail-label font-semibold text-gray-800">
                      Description: Educational support program for underprivileged children.

                    </span>
                    Description:  Educational support program for underprivileged children.
                    
                  </div>
                </div>
                <div className="action-buttons flex gap-1 mb-2">
                  <button
                    className="btn btn-blue btn-small text-xs p-1.5 flex-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() =>navigate('/donatebook')}
                  >
                    Donate Book
                  </button>
                  <button
                    className="btn btn-blue btn-small text-xs p-1.5 flex-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate('/donatebook')}
                  >
                    Donate Pens
                  </button>
                </div>
                <button
                  className="btn btn-yellow text-xs p-2 w-full bg-yellow-400 text-gray-800 rounded hover:bg-yellow-500"
                  onClick={() => navigate('/donatemoney')}
                >
                  Donate Money
                </button>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card w-[200px] bg-white rounded-lg shadow-md overflow-hidden">
              <div className="project-header bg-blue-100 p-2 flex items-center gap-2">
                <div className="project-icon w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                  📚
                </div>
                <h3 className="text-xs font-semibold text-gray-800">Sith Ruu</h3>
              </div>
              <div
                className="project-image h-[150px] bg-cover bg-center"
                style={{ backgroundImage: `url(${project2Image})` }}
              ></div>
              <div className="project-content p-3">
                <div className="funding-item mb-2">
                  <div className="funding-label text-xs font-semibold text-gray-800 mb-1">
                    Books
                  </div>
                  <div className="funding-bar flex justify-between items-center bg-gray-200 p-1 rounded text-xs">
                    <span className="required-text text-orange-500 font-medium">
                      Required: 50
                    </span>
                    <span className="received-text text-green-600 font-medium">
                      Received: {donations[2].books}
                    </span>
                  </div>
                </div>
                <div className="project-description text-xs text-gray-600 mb-2">
                  Help children access digital learning tools and educational
                  content.
                </div>
                <button
                  className="see-more-btn text-xs text-blue-500 underline mb-2"
                  onClick={() => toggleDetails(2)}
                >
                  {detailsVisible[2] ? 'See less' : 'See more'}
                </button>
                <div
                  className={`project-details text-xs ${detailsVisible[2] ? 'block' : 'hidden'} bg-gray-50 p-2 rounded mb-2`}
                >
                  <div className="detail-row mb-1">
                    <span className="detail-label font-semibold text-gray-800">
                      Date:    August 31, 2025
                    </span>
                    August 31, 2025
                  </div>
                  <div className="detail-row mb-1">
                    <span className="detail-label font-semibold text-gray-800">
                      Venue:   Ibbagamuva Maha Vidyalaya
                    </span>
                    Ibbagamuva Maha Vidyalaya
                  </div>
                  <div className="detail-row">
                    <span className="detail-label font-semibold text-gray-800">
                      Description: Digital learning initiative to bridge the technology gap for children.
                    </span>
                    Digital learning initiative to bridge the technology gap.
                  </div>
                </div>
                <div className="action-buttons flex gap-1 mb-2">
                  <button
                    className="btn btn-blue btn-small text-xs p-1.5 flex-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate('/donatebook')}
                  >
                    Donate Book
                  </button>
                  <button
                    className="btn btn-blue btn-small text-xs p-1.5 flex-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() =>navigate('/donatebook')}
                  >
                    Donate Pens
                  </button>
                </div>
                <button
                  className="btn btn-yellow text-xs p-2 w-full bg-yellow-400 text-gray-800 rounded hover:bg-yellow-500"
                  onClick={() => navigate('/donatemoney')}
                >
                  Donate Money
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Club Funds Section - Centered */}
        <div
          id="club-section"
          className={`content-section ${activeSection === 'club' ? 'block' : 'hidden'}`}
        >
          <div className="club-funds-container flex justify-center w-full">
            <div className="club-funds bg-white rounded-lg p-6 lg:p-8 text-center shadow-md max-w-md w-full">
              <h2 className="text-xl lg:text-2xl text-gray-800 mb-4">
                Club General Fund
              </h2>
              <p className="text-sm lg:text-base text-gray-600 mb-5">
                Your contributions to our general fund help us respond quickly to
                community needs and support various ongoing initiatives.
              </p>
              <div className="club-amount text-3xl lg:text-4xl text-green-600 font-bold mb-4">
                Rs.{clubFund.toLocaleString()}
              </div>
              <p className="text-sm lg:text-base text-gray-600 mb-5">
                Total funds raised this year
              </p>

              {/* Banking Information */}
              <div className="banking-info bg-gray-50 border border-gray-200 rounded-lg p-5 mb-5 text-left">
                <div className="bank-detail mb-3 text-sm lg:text-base">
                  <span className="bank-label font-semibold text-gray-800 w-1/3 inline-block">
                    Account Name:
                  </span>
                  <span className="bank-value text-gray-700">Leo Club Fund</span>
                </div>
                <div className="bank-detail mb-3 text-sm lg:text-base">
                  <span className="bank-label font-semibold text-gray-800 w-1/3 inline-block">
                    Account No:
                  </span>
                  <span className="bank-value text-gray-700">87456382</span>
                </div>
                <div className="bank-detail mb-3 text-sm lg:text-base">
                  <span className="bank-label font-semibold text-gray-800 w-1/3 inline-block">
                    Bank Name:
                  </span>
                  <span className="bank-value text-gray-700">BOC Bank</span>
                </div>
                <div className="bank-detail text-sm lg:text-base">
                  <span className="bank-label font-semibold text-gray-800 w-1/3 inline-block">
                    Branch Name:
                  </span>
                  <span className="bank-value text-gray-700">Badulla Branch</span>
                </div>
              </div>

              <button
                className="btn btn-yellow text-xs lg:text-sm p-2 w-full max-w-xs mx-auto bg-yellow-400 text-gray-800 rounded hover:bg-yellow-500"
                onClick={() => navigate('/donatemoney')}
              >
                Donate to Club Fund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;