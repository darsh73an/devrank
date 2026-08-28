const ROLE_CONFIG = {
  FRONTEND: {
    color: "#ec4899",
    weights: { github: 0.40, leetcode: 0.20, codeforces: 0.15, resume: 0.25 },
    signals: ["javascript", "typescript", "css", "html", "react", "vue", "angular", "nextjs", "svelte", "webpack", "vite", "tailwind", "sass"],
    focusAreas: ["UI development", "responsive design", "component architecture", "frontend frameworks", "performance", "accessibility", "state management", "animations"],
    interviewTopics: ["JavaScript", "TypeScript", "React", "Browser fundamentals", "DOM", "State management", "Performance", "Accessibility", "CSS", "Web security"]
  },
  BACKEND: {
    color: "#3b82f6",
    weights: { github: 0.35, leetcode: 0.30, codeforces: 0.15, hackerrank: 0.10, resume: 0.10 },
    signals: ["python", "java", "go", "rust", "php", "nodejs", "express", "django", "fastapi", "spring", "postgresql", "mongodb", "mysql", "redis", "kafka", "grpc"],
    focusAreas: ["APIs", "Databases", "Authentication", "Caching", "Microservices", "Backend architecture", "Scalability"],
    interviewTopics: ["HTTP", "REST APIs", "Authentication", "Databases", "SQL", "Indexes", "Transactions", "Caching", "Redis", "Message Queues", "Microservices", "System Design", "Concurrency"]
  },
  FULLSTACK: {
    color: "#8b5cf6",
    weights: { github: 0.35, leetcode: 0.25, codeforces: 0.20, hackerrank: 0.10, resume: 0.10 },
    signals: ["javascript", "typescript", "react", "nextjs", "vue", "angular", "css", "html", "tailwind", "nodejs", "express", "python", "java", "django", "fastapi", "postgresql", "mongodb", "mysql", "redis"],
    focusAreas: ["End-to-end applications", "Frontend + backend integration", "APIs", "Databases", "Authentication", "Deployment", "Architecture"],
    interviewTopics: ["System Architecture", "REST APIs", "React/Frontend", "Database Design", "Authentication", "Deployment", "Web Security"]
  },
  DEVOPS: {
    color: "#f59e0b",
    weights: { github: 0.40, resume: 0.25, leetcode: 0.15, codeforces: 0.10, hackerrank: 0.10 },
    signals: ["docker", "kubernetes", "terraform", "ansible", "helm", "github actions", "jenkins", "aws", "gcp", "azure", "ci/cd", "yaml", "bash", "shell", "pulumi"],
    focusAreas: ["Infrastructure", "CI/CD", "Cloud", "Containers", "Infrastructure as Code", "Monitoring", "Deployment", "Cloud architecture"],
    interviewTopics: ["Linux", "Networking", "Docker", "Kubernetes", "CI/CD Pipelines", "AWS/GCP/Azure", "Infrastructure as Code", "Monitoring"]
  },
  SDE: {
    color: "#10b981",
    weights: { leetcode: 0.35, github: 0.30, codeforces: 0.20, hackerrank: 0.10, resume: 0.05 },
    signals: ["c++", "java", "python", "dsa", "algorithms", "data structures", "dynamic programming", "competitive programming"],
    focusAreas: ["Algorithmic thinking", "Problem solving", "Data structures", "Algorithms", "Software engineering", "System design fundamentals", "OOP"],
    interviewTopics: ["Arrays", "Strings", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Greedy", "Backtracking", "Algorithms", "OOP", "System Design"]
  },
  MOBILE: {
    color: "#06b6d4",
    weights: { github: 0.45, resume: 0.30, leetcode: 0.15, hackerrank: 0.10 },
    signals: ["swift", "kotlin", "dart", "flutter", "react native", "expo", "android", "ios", "xcode", "firebase"],
    focusAreas: ["Mobile applications", "Cross-platform development", "App architecture", "Deployment", "Play Store", "App Store"],
    interviewTopics: ["Mobile UI", "State Management", "Local Storage", "APIs in Mobile", "App Lifecycle", "Memory Management", "Publishing"]
  },
  AI_ML: {
    color: "#ef4444",
    weights: { github: 0.40, kaggle: 0.25, papers: 0.20, leetcode: 0.15 },
    signals: ["python", "tensorflow", "pytorch", "keras", "scikit-learn", "jupyter", "hugging face", "transformers", "langchain", "opencv", "pandas", "numpy", "machine learning", "deep learning", "llm", "nlp"],
    focusAreas: ["Machine learning", "Model training", "NLP", "Computer vision", "LLMs", "Research", "Kaggle competitions", "Experimentation"],
    interviewTopics: ["Linear Algebra", "Probability", "Model Training", "Neural Networks", "NLP", "Computer Vision", "Model Deployment", "PyTorch/TensorFlow"]
  },
  CYBERSEC: {
    color: "#dc2626",
    weights: { hackthebox: 0.30, tryhackme: 0.25, papers: 0.20, resume: 0.25 },
    signals: ["ctf", "exploit", "penetration testing", "pentest", "burp suite", "nmap", "metasploit", "owasp", "security", "cryptography", "reverse engineering", "malware analysis", "forensics"],
    focusAreas: ["CTFs", "Penetration testing", "Security research", "Vulnerability analysis", "Defensive security", "Certifications"],
    interviewTopics: ["Networking", "OWASP Top 10", "Cryptography", "Penetration Testing", "Vulnerability Assessment", "Incident Response", "Operating Systems"]
  },
  COMPETITIVE: {
    color: "#6366f1",
    weights: { codeforces: 0.40, leetcode: 0.35, hackerrank: 0.10, github: 0.15 },
    signals: ["competitive programming", "icpc", "codechef", "atcoder", "topcoder", "olympiad", "cp algorithms", "dsa", "algorithms"],
    focusAreas: ["Algorithmic performance", "Contest rating", "Problem solving", "Competitive programming"],
    interviewTopics: ["Advanced Data Structures", "Graph Theory", "Dynamic Programming", "Number Theory", "Combinatorics", "Geometry"]
  }
};

const ROLES = Object.keys(ROLE_CONFIG).concat(['ANY']);

module.exports = { ROLE_CONFIG, ROLES };