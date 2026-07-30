import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    { icon: "🚀", title: "Personalized Roadmap", desc: "Tailored learning paths based on your dream career." },
    { icon: "📊", title: "Skill Gap Analysis", desc: "Identify exactly what you're missing to be industry-ready." },
    { icon: "📅", title: "Weekly Study Planner", desc: "Structured schedules to keep your learning consistent." },
    { icon: "💼", title: "Portfolio Projects", desc: "High-impact project ideas to showcase your expertise." },
  ];

  return (
    <div style={{ 
      margin: 0, 
      padding: 0, 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden', 
      position: 'relative',
      fontFamily: "'Inter', sans-serif",
      background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite'
    }}>
      {/* Injecting keyframes for the animated background since inline styles don't support them */}
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={{ 
        backdropFilter: 'blur(20px)', 
        backgroundColor: 'rgba(255, 255, 255, 0.15)', 
        border: '1px solid rgba(255, 255, 255, 0.3)', 
        borderRadius: '40px', 
        padding: '4rem 2rem', 
        width: '90%', 
        maxWidth: '1000px', 
        textAlign: 'center', 
        color: 'white', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'fadeInUp 0.8s ease-out'
      }}>
        <h1 style={{ 
          fontSize: '4.5rem', 
          fontWeight: '900', 
          marginBottom: '1rem', 
          letterSpacing: '-2px',
          textShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          SkillSprint AI
        </h1>
        
        <h2 style={{ 
          fontSize: '1.8rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem', 
          opacity: '0.9' 
        }}>
          AI-Powered Career Roadmap Generator
        </h2>
        
        <p style={{ 
          fontSize: '1.1rem', 
          maxWidth: '700px', 
          margin: '0 auto 3rem auto', 
          lineHeight: '1.6', 
          opacity: '0.8' 
        }}>
          Stop guessing your career path. Get a professional, personalized learning roadmap, 
          detailed skill-gap analysis, structured study plans, and curated portfolio projects 
          all powered by Google Gemma AI.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '3.5rem' 
        }}>
          {features.map((f, i) => (
            <div key={i} style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              padding: '1.5rem', 
              borderRadius: '24px', 
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: '0.7', lineHeight: '1.4' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/form')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            padding: '1.2rem 3.5rem', 
            fontSize: '1.3rem', 
            fontWeight: '700', 
            color: '#4f46e5', 
            background: 'white', 
            border: 'none', 
            borderRadius: '50px', 
            cursor: 'pointer', 
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: isHovered ? '0 15px 30px rgba(0,0,0,0.2)' : '0 10px 20px rgba(0,0,0,0.1)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          Get Started ✨
        </button>
      </div>
    </div>
  );
};

export default Landing;