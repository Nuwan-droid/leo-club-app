import LeoTimesImage from "../../../assets/LandingImage/image.jpeg";

function Whatsapp() {
  return (
    <>
      <div className="bg-gray-100 h-150 mt-10 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-semibold mb-6 text-center text-[black]">
          Welcome to our News Letter Journey
        </h1>

        <div className="relative w-full max-w-4xl bg-white overflow-hidden rounded-lg shadow-lg flex flex-col sm:flex-row">
          {/* Left side: Image */}
          <div className="w-full sm:w-1/2 ">
            <img
              src={LeoTimesImage}
              alt="Leo Times"
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Right side: Diagonal with text and button */}
          <div className="w-full sm:w-1/2 flex flex-col items-center justify-center p-6 relative bg-white">
            {/* Optional diagonal overlay */}
            <div className="hidden sm:block absolute -left-10 top-0 h-full w-20 bg-white transform -skew-x-12 z-10" />

            <div className="z-20 text-center">
              <p className="text-lg font-medium mb-4">
                Join and submit your ideas
              </p>
              <a
                href="https://wa.me/XXXXXXXXXXX" // Replace with your WhatsApp link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.52 3.48a12 12 0 0 0-20.3 12.8l-1.32 4.8a1 1 0 0 0 1.23 1.23l4.8-1.32a12 12 0 0 0 12.8-20.3zm-9.54 15.2a9 9 0 0 1-4.59-1.26l-.33-.2-2.73.75.75-2.73-.2-.33a9 9 0 1 1 7.1 3.77zm5.44-6.14c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15s-.76.98-.93 1.18c-.17.2-.34.22-.63.07s-1.23-.45-2.34-1.43c-.86-.77-1.44-1.72-1.6-2s-.02-.45.13-.6c.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.57-.49-.5-.67-.5h-.57a1.1 1.1 0 0 0-.8.38c-.27.3-1.04 1.02-1.04 2.5s1.06 2.9 1.21 3.1c.15.2 2.1 3.23 5.1 4.52.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.09-.13-.27-.2-.57-.35z" />
                </svg>
                Whatsaap
              </a>
              <p className="text-sm text-gray-500 mt-1">Click to Join</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Whatsapp;
