import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    branch: '',
    year: '',
    dreamCareer: '',
    skills: [],
    domain: '',
    studyHours: 20,
    goal: '',
  });

  const [errors, setErrors] = useState({});

  const careerOptions = [
    "AI Engineer", "Data Scientist", "Machine Learning Engineer", "Full Stack Developer",
    "Frontend Developer", "Backend Developer", "Cloud Engineer", "DevOps Engineer",
    "Cyber Security Engineer", "UI/UX Designer", "Mobile App Developer"
  ];

  const skillOptions = [
    "Python", "Java", "C++", "JavaScript", "SQL", "HTML/CSS", "Git", "Machine Learning", "Data Analysis"
  ];

  const domainOptions = [
    "AI/ML", "Web Development", "Data Science", "Cloud Computing", "Cyber Security", "Mobile Development", "DevOps", "UI/UX"
  ];

  const goalOptions = ["Internship", "Placement", "Freelancing", "Startup", "Higher Studies"];

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 30); // 3 seconds total (3000ms / 100 steps)
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (progress === 100 && isLoading) {
      setTimeout(() => {
        navigate('/results', { state: formData });
      }, 500);
    }
  }, [progress, isLoading, navigate, formData]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.college) newErrors.college = "Please enter your college";
    if (!formData.branch) newErrors.branch = "Please enter your branch";
    if (!formData.year) newErrors.year = "Please select your year";
    if (!formData.dreamCareer) newErrors.dreamCareer = "Please select your dream career";
    if (formData.skills.length === 0) newErrors.skills = "Select at least one skill";
    if (!formData.domain) newErrors.domain = "Please select a preferred domain";
    if (!formData.goal) newErrors.goal = "Please select your primary goal";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleCheckboxChange = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updatedSkills });
    if (errors.skills) setErrors({ ...errors, skills: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
    }
  };

  const sectionStyle = {
    marginBottom: '2rem',
    padding: '1.5rem',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    marginTop: '0.5rem',
    marginBottom: '0.2rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    color: '#475569',
    fontSize: '0.95rem',
    marginBottom: '0.2rem',
  };

  const errorStyle = {
    color: '#ef4444',
    fontSize: '0.8rem',
    marginBottom: '1rem',
    display: 'block',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)', 
      padding: '3rem 1rem',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          zIndex: 1000, 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(20px)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          animation: 'fadeIn 0.5s ease-in' 
        }}>
          <style>
            {`
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}
          </style>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            border: '8px solid #e2e8f0', 
            borderTop: '8px solid #6366f1', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            marginBottom: '2rem'
          }}></div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem', textAlign: 'center' }}>
            Gemma AI is building your roadmap...
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', textAlign: 'center' }}>
            Analyzing your profile, skills and career goals...
          </p>
          <div style={{ 
            width: '300px', 
            height: '12px', 
            backgroundColor: '#e2e8f0', 
            borderRadius: '10px', 
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #6366f1, #a855f7)', 
              transition: 'width 0.1s linear' 
            }}></div>
          </div>
          <span style={{ marginTop: '1rem', fontWeight: '700', color: '#6366f1' }}>{progress}%</span>
        </div>
      )}

      <div className="glass-card animate-fade-in" style={{ 
        width: '100%', 
        maxWidth: '800px', 
        padding: '3rem', 
        background: 'rgba(255, 255, 255, 0.6)', 
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="center-flex" style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Build Your Future
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Fill in the details to generate your AI-powered career roadmap</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={sectionStyle}>
            <h3 style={{ marginBottom: '1.5rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>👤</span> Personal & Academic
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" name="name" placeholder="Enter your name" style={inputStyle} onChange={handleChange} />
                {errors.name && <span style={errorStyle}>{errors.name}</span>}
              </div>
              <div>
                <label style={labelStyle}>College Name</label>
                <input type="text" name="college" placeholder="Enter college" style={inputStyle} onChange={handleChange} />
                {errors.college && <span style={errorStyle}>{errors.college}</span>}
              </div>
              <div>
                <label style={labelStyle}>Branch</label>
                <input type="text" name="branch" placeholder="e.g. CSE, ECE" style={inputStyle} onChange={handleChange} />
                {errors.branch && <span style={errorStyle}>{errors.branch}</span>}
              </div>
              <div>
                <label style={labelStyle}>Current Year</label>
                <select name="year" style={inputStyle} onChange={handleChange}>
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                {errors.year && <span style={errorStyle}>{errors.year}</span>}
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ marginBottom: '1.5rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🎯</span> Career Aspirations
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Dream Career</label>
                <select name="dreamCareer" style={inputStyle} onChange={handleChange}>
                  <option value="">Select Career</option>
                  {careerOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.dreamCareer && <span style={errorStyle}>{errors.dreamCareer}</span>}
              </div>
              <div>
                <label style={labelStyle}>Preferred Domain</label>
                <select name="domain" style={inputStyle} onChange={handleChange}>
                  <option value="">Select Domain</option>
                  {domainOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.domain && <span style={errorStyle}>{errors.domain}</span>}
              </div>
              <div>
                <label style={labelStyle}>Primary Goal</label>
                <select name="goal" style={inputStyle} onChange={handleChange}>
                  <option value="">Select Goal</option>
                  {goalOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.goal && <span style={errorStyle}>{errors.goal}</span>}
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ marginBottom: '1.5rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>⭐</span> Skills & Preferences
            </h3>
            <label style={labelStyle}>Current Skills</label>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px', 
              marginBottom: '1.5rem',
              marginTop: '0.5rem' 
            }}>
              {skillOptions.map(skill => (
                <div 
                  key={skill} 
                  onClick={() => handleCheckboxChange(skill)}
                  style={{ 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    border: '1px solid #cbd5e1',
                    backgroundColor: formData.skills.includes(skill) ? 'var(--primary-gradient)' : 'white',
                    color: formData.skills.includes(skill) ? 'white' : '#475569',
                    boxShadow: formData.skills.includes(skill) ? '0 4px 10px rgba(99, 102, 241, 0.3)' : 'none'
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
            {errors.skills && <span style={errorStyle}>{errors.skills}</span>}

            <div style={{ marginTop: '2rem' }}>
              <label style={labelStyle}>
                ⏰ Weekly Study Hours: <span style={{ color: '#6366f1', fontWeight: '800' }}>{formData.studyHours} hrs</span>
              </label>
              <input 
                type="range" 
                name="studyHours" 
                min="5" 
                max="40" 
                value={formData.studyHours} 
                style={{ width: '100%', cursor: 'pointer', accentColor: '#6366f1', marginTop: '1rem' }} 
                onChange={handleChange} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                <span>5 hrs</span>
                <span>40 hrs</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ 
            width: '100%', 
            padding: '18px', 
            fontSize: '1.2rem', 
            fontWeight: '700', 
            borderRadius: '16px',
            marginTop: '1rem',
            boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
          }}>
            Generate My AI Roadmap ✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;