import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const AddProject = () => {
  const [image, setImage] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    subtitle: '',
    description: '',
    date: '',
    location: '',
    image: '',
    sliderImages: [],
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const sliderImageHandler = (e) => {
    setSliderImages([...e.target.files]);
  };

  const changeHandler = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  const uploadImages = async () => {
    const formData = new FormData();
    if (image) {
      formData.append('mainImage', image);
    }

    sliderImages.forEach((img) => {
      formData.append('sliderImages', img);
    });

    try {
      console.log('Uploading images...');
      const res = await fetch('http://localhost:5001/api/projects/upload', {
        method: 'POST',
        body: formData,
      });

      // Check if the response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned HTML instead of JSON. Status: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.success) {
        console.log('Upload successful:', data);
        return {
          imageUrl: data.imageUrl,
          slider_image_urls: data.slider_image_urls || [],
        };
      } else {
        alert(`Image upload failed: ${data.message}`);
        return null;
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert(`Something went wrong during image upload: ${err.message}`);
      return null;
    }
  };

  const Add_Project = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let project = { ...projectDetails };

      // Extract year
      if (project.date) {
        const selectedDate = new Date(project.date);
        project.year = selectedDate.getFullYear();
      }

      const uploaded = await uploadImages();
      if (!uploaded) {
        setIsUploading(false);
        return;
      }

      project.image = uploaded.imageUrl;
      project.sliderImages = uploaded.slider_image_urls;

      console.log('Saving project:', project);

      const res = await fetch('http://localhost:5001/api/projects/addproject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      const result = await res.json();
      if (result.success) {
        alert('Project Added Successfully!');
        // Reset form
        setProjectDetails({
          title: '',
          subtitle: '',
          description: '',
          date: '',
          location: '',
          image: '',
          sliderImages: [],
        });
        setImage(null);
        setSliderImages([]);
      } else {
        alert(`Failed to add project: ${result.message}`);
      }
    } catch (err) {
      console.error('Project save error:', err);
      alert('Something went wrong while saving the project.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl mx-auto p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Add New Project</h2>
        <form className="space-y-6" onSubmit={Add_Project}>
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Project Title</label>
            <input
              value={projectDetails.title}
              onChange={changeHandler}
              type="text"
              name="title"
              required
              disabled={isUploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
            <input
              value={projectDetails.subtitle}
              onChange={changeHandler}
              type="text"
              name="subtitle"
              required
              disabled={isUploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
            <input
              value={projectDetails.date}
              onChange={changeHandler}
              type="date"
              name="date"
              max={new Date().toISOString().split('T')[0]}
              required
              disabled={isUploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
            <input
              value={projectDetails.location}
              onChange={changeHandler}
              type="text"
              name="location"
              required
              disabled={isUploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {projectDetails.date && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Year will be set to:</span> {new Date(projectDetails.date).getFullYear()}
              </p>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={projectDetails.description}
              onChange={changeHandler}
              name="description"
              required
              disabled={isUploading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            ></textarea>
          </div>

          {/* Main Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Main Image</label>
            <div className="flex items-center gap-4">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Upload Preview"
                  className="w-20 h-20 rounded-lg object-cover border border-gray-300"
                />
              ) : (
                <Upload className="w-10 h-10 text-gray-400" />
              )}
              <input
                onChange={imageHandler}
                type="file"
                name="mainImage"
                accept="image/*"
                required
                disabled={isUploading}
                className="block w-full text-sm text-gray-700
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700 transition
                  disabled:opacity-50"
              />
            </div>
          </div>

          {/* Slider Images Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slider Images (Optional)</label>
            <input
              onChange={sliderImageHandler}
              type="file"
              name="sliderImages"
              accept="image/*"
              multiple
              disabled={isUploading}
              className="block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700 transition
                disabled:opacity-50"
            />
            {sliderImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {sliderImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`slider-${idx}`}
                    className="w-16 h-16 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isUploading ? 'Adding Project...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;