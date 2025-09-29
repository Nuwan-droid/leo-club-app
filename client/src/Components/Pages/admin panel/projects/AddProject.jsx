import React, { useState } from 'react';
import { Upload, FileText, MapPin, Calendar, Image as ImageIcon, Images } from 'lucide-react';

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
    if (image) formData.append('mainImage', image);
    sliderImages.forEach((img) => formData.append('sliderImages', img));

    try {
      const res = await fetch('http://localhost:5001/api/projects/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
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

      const res = await fetch('http://localhost:5001/api/projects/addproject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      const result = await res.json();
      if (result.success) {
        alert('Project Added Successfully!');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl mx-auto p-8 transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 flex items-center justify-center gap-3">
          <Upload className="h-8 w-8" />
          Add New Project
        </h2>

        <form className="space-y-6" onSubmit={Add_Project}>

          {/* Project Title */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
            <input
              value={projectDetails.title}
              onChange={changeHandler}
              type="text"
              name="title"
              required
              disabled={isUploading}
              placeholder="Enter project title"
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Subtitle */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
            <input
              value={projectDetails.subtitle}
              onChange={changeHandler}
              type="text"
              name="subtitle"
              required
              disabled={isUploading}
              placeholder="Enter subtitle"
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Date */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                value={projectDetails.date}
                onChange={changeHandler}
                type="date"
                name="date"
                max={new Date().toISOString().split('T')[0]}
                required
                disabled={isUploading}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>

          {/* Location */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                value={projectDetails.location}
                onChange={changeHandler}
                type="text"
                name="location"
                required
                disabled={isUploading}
                placeholder="Enter location"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              />
            </div>
          </div>

          {/* Year Preview */}
          {projectDetails.date && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Year will be set to:</span> {new Date(projectDetails.date).getFullYear()}
              </p>
            </div>
          )}

          {/* Description */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                value={projectDetails.description}
                onChange={changeHandler}
                name="description"
                required
                disabled={isUploading}
                placeholder="Enter project description"
                rows="4"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 resize-none"
              />
            </div>
          </div>

          {/* Main Image */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Main Image</label>
            <div className="relative flex items-center gap-4 border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-blue-500 transition">
              <ImageIcon className="h-6 w-6 text-gray-400" />
              <input
                onChange={imageHandler}
                type="file"
                name="mainImage"
                accept="image/*"
                required
                disabled={isUploading}
                className="block w-full text-sm text-gray-700"
              />
            </div>
            {image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Main Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Slider Images */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slider Images (Optional)</label>
            <div className="relative flex items-center gap-4 border-2 border-dashed border-gray-300 rounded-lg p-3 hover:border-blue-500 transition">
              <Images className="h-6 w-6 text-gray-400" />
              <input
                onChange={sliderImageHandler}
                type="file"
                name="sliderImages"
                accept="image/*"
                multiple
                disabled={isUploading}
                className="block w-full text-sm text-gray-700"
              />
            </div>
            {sliderImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {sliderImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`slider-${idx}`}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Adding Project...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
