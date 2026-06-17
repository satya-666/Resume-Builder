import { useState, useCallback } from 'react';

const initialPersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
};

const initialEducation = {
  degree: '',
  institution: '',
  year: '',
  cgpa: '',
};

const initialExperience = {
  company: '',
  role: '',
  duration: '',
  description: '',
};

const initialProject = {
  name: '',
  technologies: '',
  description: '',
  githubLink: '',
};

export function useResumeData() {
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [education, setEducation] = useState({ ...initialEducation });
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([{ ...initialExperience }]);
  const [projects, setProjects] = useState([{ ...initialProject }]);

  const updatePersonalInfo = useCallback((field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateEducation = useCallback((field, value) => {
    setEducation((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addSkill = useCallback((skill) => {
    setSkills((prev) => [...prev, skill]);
  }, []);

  const removeSkill = useCallback((index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateExperience = useCallback((index, field, value) => {
    setExperiences((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const addExperience = useCallback(() => {
    setExperiences((prev) => [...prev, { ...initialExperience }]);
  }, []);

  const removeExperience = useCallback((index) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateProject = useCallback((index, field, value) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const addProject = useCallback(() => {
    setProjects((prev) => [...prev, { ...initialProject }]);
  }, []);

  const removeProject = useCallback((index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return {
    personalInfo,
    updatePersonalInfo,
    education,
    updateEducation,
    skills,
    addSkill,
    removeSkill,
    experiences,
    updateExperience,
    addExperience,
    removeExperience,
    projects,
    updateProject,
    addProject,
    removeProject,
  };
}
