# Skill-Sprint-AI
An AI-powered personalized career roadmap generator for students built using Google's Gemma model during the Build with Gemma Hackathon.
Skill-Sprint-AI

An AI-powered career roadmap generator for students, built during the Build with Gemma Hackathon. It uses Google's Gemma model to turn a student's goals and background into a personalized, step-by-step learning roadmap.

Built as a first-year CS student learning to work with AI APIs and React. This project is a hackathon build, not a production application — see Future Improvements for what's next.

🧩 The Problem

Students exploring a new field (like AI, web development, or data science) often don't know where to start or what order to learn things in. Generic online roadmaps aren't personalized to a person's current level, goals, or timeline, which makes it easy to feel overwhelmed or waste time on the wrong resources first.

💡 What It Does

SkillSprint AI takes basic input from a student — [e.g. their goal, current skill level, and time available — fill in the exact inputs your form collects] — and generates a personalized learning roadmap using Google's Gemma model.
✨ Main Features
AI-generated, personalized learning roadmap based on user input
[Add/remove based on what's actually built — e.g. "Export roadmap as PDF" if jspdf/html2canvas are wired up to a working export button]
[Multi-page navigation via react-router-dom — describe what the pages are, e.g. input form → results page]
🛠 Technologies Used
React (v18) — front-end UI
Vite — build tool and dev server
Google Generative AI SDK (@google/generative-ai) — calls Google's Gemma model to generate roadmaps
React Router — page navigation
html2canvas + jsPDF — [used for exporting/downloading the roadmap, if implemented]
🤖 How AI Was Used

The app sends the student's input to Google's Gemma model through the Generative AI SDK, and the model returns a personalized roadmap that's then displayed in the UI. [Add a sentence on how the prompt is structured, if you want to show your prompt design work — this is a good thing to be specific about since it's the technical core of the project.]

⚙️ How It Was Built

Built with React and Vite for the front end, with Gemma integration handled through Google's Generative AI SDK. Developed during the Build with Gemma Hackathon within the event's time constraints.

🚀 Running Locally
bash
git clone https://github.com/DarshielShah10/Skill-Sprint-AI.git
cd Skill-Sprint-AI
npm install
npm run dev

You'll need a Google Generative AI API key — [add instructions here for where to set it, e.g. a .env file with VITE_GEMINI_API_KEY=your_key_here].

📚 What I Learned
Working with an external AI API (Google's Generative AI SDK) in a real project
Structuring a multi-page React application
Building under hackathon time constraints
[Add anything specific — prompt design, handling API responses, state management, etc.]
🔮 Future Improvements
Add input validation and error handling for the AI API calls
Improve the UI/UX of the roadmap display
Add loading states while the AI response is being generated
[Add your own — e.g. saving roadmaps, user accounts, more input customization]
👨‍💻 Author

Darshiel Shah First Year B.Tech CSE (Data Science), VIT Chennai Built during the Build with Gemma Hackathon
