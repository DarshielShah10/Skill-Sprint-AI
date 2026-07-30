import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// --- ZERO-RISK FLOATING CHATBOT COMPONENT ---
const GemmaMentorBot = ({ student }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { text: `Hi ${student?.name || 'Student'}! I'm your Gemma AI Mentor. Ask me anything about your ${student?.dreamCareer || 'career'} roadmap!`, sender: 'bot' }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated AI Response (Safe & Fast)
    setTimeout(() => {
      let botResponse = "That's a great question! As an aspiring " + (student?.dreamCareer || "professional") + ", I suggest focusing on consistent daily practice and building a strong portfolio.";
      if (input.toLowerCase().includes("project")) botResponse = "I recommend starting with a small project that solves a real problem. Check the 'Portfolio Projects' section of your roadmap for ideas!";
      if (input.toLowerCase().includes("study")) botResponse = "Consistency is key! Try to dedicate at least 2 hours a day to your roadmap for the best results.";
      
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, fontFamily: 'Inter, sans-serif' }}>
      {/* Floating Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '60px', height: '60px', borderRadius: '30px', 
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
          color: 'white', border: 'none', cursor: 'pointer', 
          fontSize: '1.5rem', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)',
          transition: 'transform 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? '✖' : '🤖'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{ 
          position: 'absolute', bottom: '80px', right: 0, 
          width: '320px', height: '450px', 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(15px)', borderRadius: '20px', 
          boxShadow: '0 15px 35px rgba(0,0,0,0.2)', 
          display: 'flex', flexDirection: 'column', 
          border: '1px solid rgba(255, 255, 255, 0.5)',
          overflow: 'hidden', animation: 'fadeInUp 0.3s ease-out'
        }}>
          <div style={{ padding: '15px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: 'white', fontWeight: '700' }}>
            🤖 Gemma AI Mentor
          </div>
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                padding: '8px 12px', borderRadius: '12px', 
                background: msg.sender === 'user' ? '#6366f1' : '#f1f5f9',
                color: msg.sender === 'user' ? 'white' : '#1e293b',
                fontSize: '0.85rem', maxWidth: '80%'
              }}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Gemma is thinking...</div>}
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid #eee', display: 'flex', gap: '5px' }}>
            <input 
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..." 
              style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }}
            />
            <button onClick={handleSend} style={{ padding: '8px', borderRadius: '8px', background: '#6366f1', color: 'white', border: 'none', cursor: 'pointer' }}>➔</button>
          </div>
        </div>
      )}
    </div>
  );
};
// --- Typewriter Component for AI Streaming Effect ---
const Typewriter = ({ text, delay = 20 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{currentText}</span>;
};

const CAREER_DATA = {
  "AI Engineer": {
    score: 75,
    gap: ["Advanced Linear Algebra", "Transformer Architectures", "CUDA Programming", "LLM Fine-tuning"],
    tech: ["PyTorch", "TensorFlow", "HuggingFace", "LangChain", "Python"],
    roadmap: [
      { month: "Month 1", focus: "Deep Learning Foundations", tasks: ["Neural Networks", "Backpropagation", "CNNs & RNNs"] },
      { month: "Month 2", focus: "Modern NLP & Transformers", tasks: ["Attention Mechanism", "BERT/GPT Architecture", "Tokenization"] },
      { month: "Month 3", focus: "Deployment & Scaling", tasks: ["ONNX Runtime", "Triton Inference Server", "Quantization"] },
    ],
    weekly: ["Mon: Research Papers", "Tue: Math/Theory", "Wed: Implementation", "Thu: Debugging", "Fri: Optimization", "Sat: Project", "Sun: Review"],
    projects: [
      { name: "Custom LLM Chatbot", desc: "Fine-tune a Llama-3 model on a specific niche dataset.", skills: "PyTorch, HuggingFace" },
      { name: "AI Image Generator", desc: "Implement a Stable Diffusion based image generator.", skills: "Diffusers, Python" },
      { name: "Real-time Object Detection", desc: "YOLOv8 implementation for industrial safety.", skills: "OpenCV, PyTorch" },
    ],
    certs: ["DeepLearning.AI Specialization", "Google AI Professional Certificate", "NVIDIA Deep Learning Institute"],
    resume: "Highlight your math proficiency and link to a GitHub repo with a custom model implementation.",
    interview: "Be prepared to derive the Attention formula and explain Gradient Vanishing/Exploding.",
    advice: "Don't just use libraries; understand the calculus behind the gradients. That's what separates engineers from users."
  },
  "Data Scientist": {
    score: 70,
    gap: ["Bayesian Statistics", "A/B Testing", "Big Data Processing", "Advanced SQL"],
    tech: ["Pandas", "Scikit-Learn", "Tableau", "Apache Spark", "SQL"],
    roadmap: [
      { month: "Month 1", focus: "Statistical Analysis", tasks: ["Hypothesis Testing", "Probability Distributions", "Regression"] },
      { month: "Month 2", focus: "Machine Learning Pipeline", tasks: ["Feature Engineering", "Cross-Validation", "Hyperparameter Tuning"] },
      { month: "Month 3", focus: "Big Data & Visualization", tasks: ["PySpark", "Dashboarding", "Storytelling with Data"] },
    ],
    weekly: ["Mon: Statistics", "Tue: SQL Queries", "Wed: ML Modeling", "Thu: Data Cleaning", "Fri: Visualization", "Sat: Kaggle", "Sun: Review"],
    projects: [
      { name: "Stock Market Predictor", desc: "Time-series analysis of S&P 500 using LSTM.", skills: "Keras, Pandas" },
      { name: "Customer Churn Analysis", desc: "Predicting user attrition for a SaaS company.", skills: "Scikit-Learn, SQL" },
      { name: "Sentiment Analysis Engine", desc: "Analyzing Twitter trends for brand sentiment.", skills: "NLTK, TextBlob" },
    ],
    certs: ["IBM Data Science Professional", "Google Data Analytics", "Microsoft Certified: Azure Data Scientist"],
    resume: "Focus on 'Impact'—use numbers (e.g., 'Increased accuracy by 15%').",
    interview: "Practice explaining complex models to non-technical stakeholders.",
    advice: "The best data scientists are those who can ask the right business questions before touching the data."
  },
  "Full Stack Developer": {
    score: 80,
    gap: ["System Design", "Redis Caching", "CI/CD Pipelines", "Advanced TypeScript"],
    tech: ["React", "Node.js", "PostgreSQL", "Docker", "TypeScript"],
    roadmap: [
      { month: "Month 1", focus: "Advanced Frontend", tasks: ["State Management", "Performance Optimization", "Next.js"] },
      { month: "Month 2", focus: "Robust Backend", tasks: ["REST/GraphQL", "Auth (JWT/OAuth)", "Database Indexing"] },
      { month: "Month 3", focus: "DevOps & Deployment", tasks: ["Dockerization", "AWS/Vercel", "GitHub Actions"] },
    ],
    weekly: ["Mon: Frontend UI", "Tue: API Design", "Wed: DB Schema", "Thu: Integration", "Fri: Testing", "Sat: Project", "Sun: Review"],
    projects: [
      { name: "E-commerce Ecosystem", desc: "Full-scale store with payment gateway and admin panel.", skills: "MERN Stack, Stripe" },
      { name: "Collaborative Doc Editor", desc: "Real-time editor using WebSockets.", skills: "Socket.io, React" },
      { name: "SaaS Project Manager", desc: "Kanban board with drag-and-drop and team roles.", skills: "Next.js, Prisma" },
    ],
    certs: ["Meta Front-End/Back-End Cert", "FreeCodeCamp Full Stack", "AWS Certified Developer"],
    resume: "Showcase a live URL for every project. A working link is better than a thousand words.",
    interview: "Master the 'JavaScript Event Loop' and 'Database Normalization' concepts.",
    advice: "Don't get stuck in tutorial hell. Build a feature, break it, and fix it. That's how you learn."
  },
  "Cyber Security Engineer": {
    score: 65,
    gap: ["Network Forensics", "Penetration Testing", "Reverse Engineering", "Cryptography"],
    tech: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Python"],
    roadmap: [
      { month: "Month 1", focus: "Networking & Linux", tasks: ["TCP/IP Suite", "Bash Scripting", "SSH/FTP Protocols"] },
      { month: "Month 2", focus: "Offensive Security", tasks: ["OWASP Top 10", "SQL Injection", "XSS Attacks"] },
      { month: "Month 3", focus: "Defensive Security", tasks: ["Firewall Config", "IDS/IPS", "SIEM Tools"] },
    ],
    weekly: ["Mon: Networking", "Tue: Linux Hardening", "Wed: CTF Challenges", "Thu: Tooling", "Fri: Scripting", "Sat: Lab Work", "Sun: Review"],
    projects: [
      { name: "Packet Sniffer", desc: "Custom tool to analyze network traffic in real-time.", skills: "Python, Scapy" },
      { name: "Password Vault", desc: "Encrypted storage using AES-256 encryption.", skills: "Cryptography, Java" },
      { name: "Vulnerability Scanner", desc: "Automated tool to check for open ports and services.", skills: "Python, Nmap" },
    ],
    certs: ["CompTIA Security+", "CEH (Certified Ethical Hacker)", "OSCP"],
    resume: "List your CTF rankings and any bug bounty acknowledgments.",
    interview: "Be ready to explain the 3-way handshake and the difference between symmetric/asymmetric encryption.",
    advice: "Ethics first. The line between a security engineer and a hacker is the permission slip."
  },
  "Cloud Engineer": {
    score: 70,
    gap: ["Kubernetes Orchestration", "Infrastructure as Code", "Serverless Architectures", "Cloud Security"],
    tech: ["AWS", "Terraform", "Kubernetes", "Docker", "Ansible"],
    roadmap: [
      { month: "Month 1", focus: "Virtualization & Containers", tasks: ["Docker Basics", "Container Networking", "Image Optimization"] },
      { month: "Month 2", focus: "Cloud Platforms", tasks: ["EC2/S3/Lambda", "VPC Configuration", "IAM Roles"] },
      { month: "Month 3", focus: "Orchestration & IaC", tasks: ["K8s Pods/Services", "Terraform Scripts", "CI/CD Pipelines"] },
    ],
    weekly: ["Mon: Cloud Theory", "Tue: Docker Labs", "Wed: AWS Console", "Thu: Terraform", "Fri: K8s", "Sat: Architecture", "Sun: Review"],
    projects: [
      { name: "Auto-scaling Web App", desc: "App that scales based on traffic using AWS Auto Scaling.", skills: "AWS, Docker" },
      { name: "Serverless API", desc: "Event-driven API using AWS Lambda and API Gateway.", skills: "Node.js, AWS" },
      { name: "Multi-Cloud Deployer", desc: "Script to deploy a site to both AWS and Azure.", skills: "Terraform, Bash" },
    ],
    certs: ["AWS Solutions Architect", "Google Professional Cloud Architect", "Azure Administrator"],
    resume: "Focus on 'Availability' and 'Scalability' metrics in your project descriptions.",
    interview: "Understand the CAP Theorem and the difference between Vertical and Horizontal scaling.",
    advice: "Cloud is about cost-optimization. A great engineer builds a system that is both powerful and cheap."
  }
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef(); // Ref for PDF capture
  const student = location.state || { name: 'Student', dreamCareer: 'Full Stack Developer', skills: [] };
  
  const data = CAREER_DATA[student.dreamCareer] || CAREER_DATA["Full Stack Developer"];

  const calculateScore = () => {
    const baseScore = data.score;
    const skillBonus = student.skills ? student.skills.length * 2 : 0;
    return Math.min(100, baseScore + skillBonus);
  };

  const score = calculateScore();

  // --- PDF Export Function ---
  const downloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { 
      scale: 2, 
      useCORS: true, 
      backgroundColor: '#f5f7ff' 
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${student.name}-Career-Roadmap.pdf`);
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(15px)',
    borderRadius: '24px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    height: '100%'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7ff 0%, #fdf2ff 100%)', 
      padding: '3rem 1rem' 
    }}>
      <div className="container" ref={pdfRef}>
        {/* Hero Section */}
        <div className="glass-card animate-fade-in" style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          marginBottom: '3rem', 
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
          border: 'none'
        }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>
            Hello, {student.name}! 👋
          </h1>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your AI-powered path to becoming a <span style={{ color: '#6366f1', fontWeight: '700' }}>{student.dreamCareer}</span> is ready.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                background: 'var(--primary-gradient)', 
                color: 'white', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                fontSize: '1.5rem', 
                fontWeight: '800', 
                boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)',
                margin: '0 auto'
              }}>
                {score}%
                <span style={{ fontSize: '0.7rem', fontWeight: '400' }}>Readiness</span>
              </div>
            </div>
            <div style={{ maxWidth: '400px', textAlign: 'left' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Career Readiness Analysis</h3>
              <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${score}%`, height: '100%', background: 'var(--primary-gradient)', transition: 'width 1s ease-in-out' }}></div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                You have a strong foundation! Focus on the skill gaps below to reach 100%.
              </p>
            </div>
            <div>
             <GemmaMentorBot student={student} /> 
    </div>
          </div>
          
          {/* PDF Download Button - Hidden during PDF capture to avoid recursion */}
          <button 
            onClick={downloadPDF} 
            className="btn-primary" 
            style={{ marginTop: '2rem', background: '#1e293b', color: 'white', fontSize: '0.9rem' }}
          >
            📥 Download My Roadmap (PDF)
          </button>
        </div>

        {/* Top Grid: Skills & Tech */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={cardStyle} className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><span>⚠️</span> Skill Gap Analysis</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.gap.map((item, i) => (
                <div key={i} style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '10px', borderLeft: '4px solid #ef4444', color: '#b91c1c', fontWeight: '500' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={cardStyle} className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><span>🛠️</span> Recommended Tech Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.tech.map((item, i) => (
                <span key={i} style={{ padding: '8px 16px', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', fontWeight: '600', color: '#6366f1' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Career Summary with Typewriter Effect */}
        <div className="glass-card animate-fade-in" style={{ marginBottom: '3rem', borderLeft: '6px solid #6366f1' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>🚀 AI Career Summary</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <Typewriter text={`Based on your background in ${student.branch}, transitioning into a ${student.dreamCareer} is a strategic move. The industry currently demands a blend of core theoretical knowledge and hands-on implementation. Your path will focus on bridging the gap between academic learning and production-ready skills.`} />
          </p>
        </div>

        {/* Timeline Section */}
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: '800' }}>📅 3-Month Mastery Roadmap</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {data.roadmap.map((item, i) => (
            <div key={i} style={cardStyle} className="animate-fade-in">
              <div style={{ background: 'var(--primary-gradient)', color: 'white', padding: '5px 15px', borderRadius: '10px', display: 'inline-block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '1rem' }}>
                {item.month}
              </div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{item.focus}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {item.tasks.map((task, j) => (
                  <li key={j} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                    <span style={{ color: '#a855f7' }}>●</span> {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Weekly Plan & Projects */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={cardStyle} className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><span>⏰</span> Weekly Study Rhythm</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.weekly.map((day, i) => (
                <div key={i} style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', borderLeft: '4px solid #6366f1', fontSize: '0.9rem' }}>
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div style={cardStyle} className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><span>💻</span> Portfolio Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '15px', background: 'white' }}>
                  <h4 style={{ color: '#6366f1', marginBottom: '0.3rem' }}>{proj.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{proj.desc}</p>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#a855f7' }}>Skills: {proj.skills}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Certs, Tips & Advice */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={cardStyle} className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><span>🎖️</span> Free Certifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.certs.map((cert, i) => (
                <div key={i} style={{ padding: '10px', background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>
                  {cert}
                </div>
              ))}
            </div>
          </div>
          <div style={cardStyle} className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><span>📝</span> Pro Tips</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#6366f1' }}>Resume Tip:</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{data.resume}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#6366f1' }}>Interview Tip:</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{data.interview}</p>
            </div>
          </div>
        </div>

        {/* AI Mentor Final Advice with Typewriter Effect */}
        <div className="glass-card animate-fade-in" style={{ 
          background: 'var(--primary-gradient)', 
          color: 'white', 
          textAlign: 'center', 
          padding: '3rem 2rem',
          border: 'none'
        }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>🤖 AI Mentor's Final Word</h3>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: '0.9', maxWidth: '800px', margin: '0 auto' }}>
            "<Typewriter text={data.advice} delay={40} />"
          </p>
          <button onClick={() => navigate('/form')} className="btn-primary" style={{ 
            marginTop: '2rem', 
            background: 'white', 
            color: '#6366f1', 
            fontWeight: '800' 
          }}>
            Restart Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;