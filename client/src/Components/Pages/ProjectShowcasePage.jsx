import React, { useState, useEffect } from "react";
import ProjectHeader from "../Elements/ProjectShowcase/ProjectHeader";
import ProjectFilter from "../Elements/ProjectShowcase/ProjectFilter";
import ProjectGrid from "../Elements/ProjectShowcase/ProjectGrid";
import ProjectDialog from "../Elements/ProjectShowcase/ProjectDialog";

export default function ProjectShowcasePage() {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviews, setReviews] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedToken = localStorage.getItem('leoToken'); // Use consistent key
        
        if (!storedToken) {
          setLoadingAuth(false);
          return;
        }

        // Verify token by fetching user profile
        const res = await fetch("http://localhost:5001/api/user/profile", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setToken(storedToken);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('leoToken');
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem('leoToken');
        setUser(null);
        setToken(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    fetchUserDetails();
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
    if (!token || !user) {
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
          comment: review.comment
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        // Update reviews immediately
        setReviews((prev) => ({
          ...prev,
          [projectId]: [data.comment, ...(prev[projectId] || [])]
        }));
        return data.comment;
      } else {
        if (res.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('leoToken');
          setUser(null);
          setToken(null);
          alert("Your session has expired. Please login again.");
        } else {
          alert(data.message || "Failed to add comment");
        }
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

  if (loadingAuth) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen font-sans mt-20 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

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