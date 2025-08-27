import React, { useState, useEffect, useContext } from "react";
import ProjectHeader from "../Elements/ProjectShowcase/ProjectHeader";
import ProjectFilter from "../Elements/ProjectShowcase/ProjectFilter";
import ProjectGrid from "../Elements/ProjectShowcase/ProjectGrid";
import ProjectDialog from "../Elements/ProjectShowcase/ProjectDialog";
// Import your AuthContext or wherever you store user authentication state
// import { AuthContext } from "../context/AuthContext";

export default function ProjectShowcasePage() {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviews, setReviews] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Get user authentication state - adjust this based on your auth implementation
  // const { user, token } = useContext(AuthContext);
  // For now, you can get this from localStorage or your auth context
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check authentication status on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch all projects
  useEffect(() => {
    fetch("http://localhost:5001/api/projects/allprojects")
      .then((res) => res.json())
      .then((data) => {
        setAllProjects(data);
        if (data.length > 0) {
          const years = [...new Set(data.map((p) => String(p.year)))].sort((a, b) => b - a);
          setSelectedYear(years[0]);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredProjects = allProjects
    .filter((p) => String(p.year) === selectedYear)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleAddReview = async (projectId, review) => {
    if (!token) {
      alert("Please login to add a comment");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/comments/addcomment", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          projectId, 
          comment: review.comment // Only send comment text, name will be auto-added from user
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        fetchProjectComments(projectId);
      } else {
        alert(data.message || "Failed to add comment");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Error adding comment");
    }
  };

  const fetchProjectComments = async (projectId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/comments/comments/${projectId}`);
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => ({ ...prev, [projectId]: data.comments }));
      }
    } catch (err) {
      console.error("Fetch comments error:", err);
    }
  };

  const openDialog = async (project) => {
    setSelectedProject(project);
    await fetchProjectComments(project.id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans mt-20">
      <ProjectHeader />
      <ProjectFilter
        years={[...new Set(allProjects.map((p) => String(p.year)))].sort((a, b) => b - a)}
        selectedYear={selectedYear}
        onChange={setSelectedYear}
      />
      <ProjectGrid
        projects={filteredProjects}
        onCardHover={setHoveredCard}
        hoveredCard={hoveredCard}
        onProjectClick={openDialog}
      />
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          reviews={reviews[selectedProject.id] || []}
          onClose={() => setSelectedProject(null)}
          onAddReview={handleAddReview}
          user={user}
          token={token}
        />
      )}
    </div>
  );
}