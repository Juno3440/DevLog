import React, { useState } from 'react';
import ProjectsView from './components/ProjectsView.js';
import NodeView from './components/NodeView.js';
import styles from './App.module.css';
import './styles/theme.css';
import './styles/global.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentView, setCurrentView] = useState('projects'); // 'projects', 'nodes', etc.

  // Fetch selected project
  const handleSelectProject = async (projectId) => {
    console.log('Attempting to select project with ID:', projectId);
    try {
      const project = await window.electron.getProject(projectId);
      console.log('Selected project:', project);
      setSelectedProject(project);
      setCurrentView('nodes');
    } catch (error) {
      console.error('Error selecting project:', error);
      alert('Failed to select project.');
    }
  };

  // Handle project update
  const handleProjectUpdate = async () => {
    if (selectedProject && selectedProject.id) {
      try {
        console.log('Updating project with ID:', selectedProject.id);
        const updatedProject = await window.electron.getProject(selectedProject.id);
        console.log('Updated project:', updatedProject);
        setSelectedProject(updatedProject);
      } catch (error) {
        console.error('Error updating project:', error);
        alert('Failed to update project.');
      }
    }
  };

  // Handler to return to projects
  const handleReturnToProjects = () => {
    setCurrentView('projects');
    setSelectedProject(null); // Optionally, clear the selected project
  };

  return (
    <div className={styles.app}>
      {currentView === 'projects' && <ProjectsView onSelectProject={handleSelectProject} />}
      {currentView === 'nodes' && selectedProject && (
        <NodeView
          project={selectedProject}
          onBack={() => setCurrentView('projects')}
          onReturnToProjects={handleReturnToProjects}
        />
      )}
    </div>
  );
}

export default App;