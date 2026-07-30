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

  // NEW: Trust Section Data
  const steps = [
    { 
      number: "01", 
      title: "Create Your Profile", 
      desc: "Tell us about your college, branch, and the career you've always dreamed of." 
    },
    { 
      number: "02", 
      title: "Gemma AI Analysis", 
      desc: "Our AI analyzes current industry trends and compares them with your existing skill set." 
    },
    { 
      number: "03", 
      title: "Get Your Blueprint", 
      desc: "Receive a detailed 3-month roadmap, weekly plan, and project ideas to start building." 
    },
  ];

  return (
    <div style={{ 
      margin: 0, 
      padding: 0, 
      width: '100vw', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflowX: 'hidden', 
      position: 'relative',
      fontFamily: "'Inter', sans-serif",
      background: 'linear-gradient(-45deg, #fdf2ff, #eef2ff, #f5f7ff, #fdf2ff)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite'
    }}>
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

      {/* Hero Section */}
      <section className="container center-flex" style={{ padding: '6rem 2rem 4rem 2rem' }}>
        <h1 className="animate-fade-in" style={{ 
          fontSize: '4.5rem', 
          fontWeight: '900', 
          marginBottom: '1rem', 
          letterSpacing: '-2px',
          background: 'var(--primary-gradient)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          SkillSprint AI
        </h1>
        
        <h2 className="animate-fade-in" style={{ 
          fontSize: '1.8rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem', 
          opacity: '0.9',
          textAlign: 'center'
        }}>
          AI-Powered Career Roadmap Generator
        </h2>
        
        <p className="animate-fade-in" style={{ 
          fontSize: '1.1rem', 
          maxWidth: '700px', 
          margin: '0 auto 3rem auto', 
          lineHeight: '1.6', 
          opacity: '0.8',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          Stop guessing your career path. Get a professional, personalized learning roadmap, 
          detailed skill-gap analysis, structured study plans, and curated portfolio projects 
          all powered by Google Gemma AI.
        </p>

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
      </section>

      {/* NEW: Trust/Process Section */}
      <section className="container" style={{ padding: '4rem 2rem' }}>
        <div className="center-flex" style={{ marginBottom: '3rem' }}>
          <h2 className="animate-fade-in" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>
            How it Works
          </h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem',
          justifyItems: 'center' 
        }}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card animate-fade-in" 
              style={{ 
                animationDelay: `${index * 0.2}s`, 
                textAlign: 'center', 
                width: '100%', 
                maxWidth: '320px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '10px', 
                fontSize: '5rem', 
                fontWeight: '900', 
                color: 'rgba(99, 102, 241, 0.1)', 
                zIndex: 0 
              }}>
                {step.number}
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)', position: 'relative', zIndex: 1 }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', position: 'relative', zIndex: 1 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="container" style={{ padding: '4rem 2rem 8rem 2rem' }}>
        <div className="center-flex" style={{ marginBottom: '3rem' }}>
          <h2 className="animate-fade-in" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>
            Key Features
          </h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--primary-gradient)', borderRadius: '2px' }}></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          justifyItems: 'center' 
        }}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card animate-fade-in" 
              style={{ 
                animationDelay: `${index * 0.2}s`, 
                textAlign: 'center', 
                width: '100%', 
                maxWidth: '300px' 
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{feature.description || feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;