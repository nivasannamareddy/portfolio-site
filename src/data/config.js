const config = {
  meta: {
    title: 'Nivas Annamareddy | Portfolio',
    description:
      'Software Engineer & AI/ML Engineer building multi-agent systems, ML pipelines, and data platforms. MS @ UT Dallas.',
  },
  personal: {
    name: 'Nivas Annamareddy',
    headline: 'Building intelligent systems that work under real constraints.',
    typed: ['Software Engineer', 'AI/ML Engineer', 'Data Engineer'],
    title: 'Software Engineer | AI/ML Engineer',
    location: 'United States',
    email: 'nivasannamareddy@gmail.com',
    phone: '+1 (945) 713-3085',
    resumeUrl: '/resume.pdf',
    avatar: '/assets/profile.png',
    status: 'Available for Full-Time, Internship & Contract Roles',
    bio: "I'm a software engineer who's spent most of my recent time deep in ML systems, building pipelines, compliance frameworks, and data platforms that actually have to work under real constraints. Most recently I worked on a compliance framework for multi-agent LLM systems — when AI agents share memory across healthcare, finance, and HR workflows, what stops them from leaking sensitive data or holding records past their retention window? We built a benchmark with 274 test scenarios to find exactly where things break, then built a middleware system to fix it. PII leak rate dropped from 89% to 25%. Compliance went from 41% to 73%. Before that I automated a client data pipeline through UT Dallas that cut processing time by 30%, built demand forecasting models at AICTE that reduced manual reporting by 40%, and shipped full-stack systems in Java, Spring Boot, Python, and React across different projects.",
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/nivasannamareddy',
    github: 'https://github.com/nivasannamareddy',
    email: 'mailto:nivasannamareddy@gmail.com',
  },
  highlights: [
    {
      label: 'PII Leak Rate',
      value: '25%',
      description: 'Down from 89% — multi-agent compliance middleware across healthcare, finance, and HR workflows.',
    },
    {
      label: 'Compliance Score',
      value: '73%',
      description: 'Up from 41% — 274-scenario benchmark and middleware for multi-agent LLM pipelines.',
    },
    {
      label: 'Pipeline Speed',
      value: '30%',
      description: 'Faster processing — automated client data pipeline at UT Dallas.',
    },
    {
      label: 'Manual Reporting',
      value: '40%',
      description: 'Reduction in manual work — Power BI dashboards for demand forecasting at AICTE.',
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: [
        { name: 'Python', level: 95 },
        { name: 'Java', level: 78 },
        { name: 'SQL', level: 92 },
        { name: 'JavaScript', level: 72 },
        { name: 'C/C++', level: 65 },
      ],
    },
    {
      category: 'DSA & CS Fundamentals',
      items: [
        { name: 'Arrays & Strings', level: 90 },
        { name: 'Trees & Graphs', level: 85 },
        { name: 'Dynamic Programming', level: 82 },
        { name: 'BFS / DFS', level: 88 },
        { name: 'Binary Search', level: 90 },
        { name: 'Hash Maps & Sets', level: 92 },
        { name: 'OOP & Design Patterns', level: 84 },
        { name: 'SOLID Principles', level: 80 },
      ],
    },
    {
      category: 'AI / ML',
      items: [
        { name: 'PyTorch', level: 88 },
        { name: 'Scikit-learn', level: 92 },
        { name: 'TensorFlow', level: 82 },
        { name: 'LangGraph', level: 85 },
        { name: 'HuggingFace', level: 84 },
        { name: 'Pandas / NumPy', level: 94 },
        { name: 'NLP', level: 80 },
        { name: 'ARIMA / Prophet', level: 80 },
      ],
    },
    {
      category: 'Backend & System Design',
      items: [
        { name: 'Spring Boot', level: 78 },
        { name: 'REST APIs', level: 88 },
        { name: 'Microservices', level: 78 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 84 },
        { name: 'React', level: 72 },
      ],
    },
    {
      category: 'Databases',
      items: [
        { name: 'PostgreSQL', level: 88 },
        { name: 'MySQL', level: 88 },
        { name: 'SQLite', level: 76 },
      ],
    },
    {
      category: 'Visualization & Tools',
      items: [
        { name: 'Power BI', level: 90 },
        { name: 'Tableau', level: 88 },
        { name: 'Git', level: 90 },
        { name: 'Jupyter / Colab', level: 90 },
        { name: 'Agile / Scrum', level: 84 },
      ],
    },
  ],
  certifications: [
    'AZ-400: Designing and Implementing Microsoft DevOps Solutions',
    'Salesforce Certified Administrator (SCA)',
    'AWS Certified Developer – Associate',
    'AWS Certified Cloud Practitioner',
    'Red Hat Certified Enterprise Application Developer',
    'Microsoft Certified: Azure Fundamentals',
    'Programming Foundations: Software Testing/QA',
    'Requirements Elicitation and Analysis',
  ],
  projects: [
    {
      title: 'Multi-Agent LLM Compliance Framework',
      period: 'Jan 2025 – May 2025',
      description:
        'Built a middleware compliance system for multi-agent LLM pipelines operating across healthcare, finance, and HR workflows. Designed a 274-scenario benchmark to identify PII leakage and retention violations, then engineered middleware to fix them.',
      tech: ['Python', 'LangGraph', 'PyTorch', 'HuggingFace', 'PostgreSQL'],
      impact: 'PII leak rate dropped 89%→25%. Compliance score improved 41%→73%.',
      links: { demo: '#', repo: 'https://github.com/nivasannamareddy' },
      images: ['/images/airline.svg'],
      category: 'AI / ML',
    },
    {
      title: 'Airline Reservation System',
      period: 'Feb 2025 – May 2025',
      description:
        'Implemented time-series forecasting (Prophet, ARIMA) to predict flight pricing trends and cancellations. Full-stack reservation platform built in Java and Spring Boot.',
      tech: ['Java', 'Spring Boot', 'Python', 'Prophet', 'ARIMA', 'Power BI'],
      impact: 'Improved revenue optimization by 35%.',
      links: { demo: '#', repo: 'https://github.com/nivasannamareddy/AIRLINE-RESERVATION-SYSTEM' },
      images: ['/images/airline.svg'],
      category: 'Full-Stack',
    },
    {
      title: 'Artistry Archive – Art Gallery Database',
      period: 'Aug 2024 – Dec 2024',
      description:
        'Designed and analyzed a 17-table SQL schema with complex analytical queries and performance dashboards for art gallery management.',
      tech: ['PostgreSQL', 'SQL', 'Tableau', 'Python'],
      impact: 'Improved operational transparency by 30%.',
      links: { demo: '#', repo: 'https://github.com/nivasannamareddy/Artistry-Archive-Database-for-Art-Gallery-Management' },
      images: ['/images/artistry.svg'],
      category: 'Data Engineering',
    },
    {
      title: 'Bike Rental Demand Intelligence',
      period: 'Feb 2023 – May 2023',
      description:
        'Applied regression and clustering to forecast rental demand and designed KPI dashboards for fleet allocation decisions.',
      tech: ['Python', 'Scikit-learn', 'Power BI'],
      impact: 'Optimized fleet allocation by 25%.',
      links: { demo: '#', repo: '#' },
      images: ['/images/bike.svg'],
      category: 'Analytics',
    },
  ],
  publications: [
    {
      title:
        'Advancing Multilingual Communication: Real-Time Language Translation in Social Media Platforms Leveraging Advanced Machine Learning Models',
      description:
        'Research on real-time multilingual translation pipelines for social media, emphasizing accuracy and response-time improvements with advanced ML models.',
      link: 'https://jchr.org/index.php/JCHR/article/view/4319',
    },
    {
      title: 'Comparison of Various Face Recognition Algorithms in ML/DS',
      description:
        'Comparative study of face recognition algorithms, evaluating accuracy and performance across ML/DL approaches.',
      link: 'https://ieeexplore.ieee.org/document/10104690',
    },
  ],
  timeline: [
    {
      type: 'experience',
      title: 'Data Engineer',
      org: 'Compass Group USA',
      period: 'Sep 2024 – May 2026',
      location: 'Richardson, TX',
      bullets: [
        'Managed high-volume transaction data and operational workflows to maintain efficient daily operations.',
        'Monitored operational performance and resolved workflow bottlenecks during peak periods.',
        'Assisted with inventory tracking, stock reconciliation, and operational reporting to reduce waste.',
        'Trained 3–5 new team members on system processes, transaction handling, and compliance standards.',
        'Maintained accurate operational records and transaction logs to improve data accuracy across daily workflows.',
      ],
      tech: ['Data Management', 'Operational Reporting', 'Process Optimization'],
    },
    {
      type: 'experience',
      title: 'Data Analyst Intern',
      org: 'AICTE, India',
      period: 'Dec 2022 – Feb 2023',
      location: 'Remote',
      bullets: [
        'Built regression and clustering models in Python to identify key business patterns and trends.',
        'Developed Power BI dashboards to track KPIs, reducing manual analysis work by 40%.',
        'Pulled and cleaned data from MySQL databases; built Pandas pipelines for preprocessing.',
        'Worked on weekly demand forecasting using statistical methods to support marketing decisions.',
      ],
      tech: ['Python', 'Power BI', 'SQL', 'Pandas', 'Scikit-learn'],
    },
    {
      type: 'experience',
      title: 'AI-ML Intern',
      org: 'AICTE, India',
      period: 'May 2022 – Dec 2022',
      location: 'Remote',
      bullets: [
        'Built supervised ML models using Scikit-learn and TensorFlow, improving performance by ~30%.',
        'Applied feature engineering and resampling methods to fix data imbalance and overfitting.',
        'Built end-to-end ML pipelines with Python, Pandas, NumPy, reducing preprocessing time by ~25%.',
        'Worked with a team of 5 interns to refine ML workflows and deliver predictive insights.',
      ],
      tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
    },
    {
      type: 'education',
      title: 'M.S. Information Technology & Management',
      org: 'The University of Texas at Dallas',
      period: 'May 2026',
      location: 'Dallas, TX',
      bullets: [
        "Awarded Dean's Excellence Scholarship",
        'Focus: ML systems, multi-agent AI, data engineering, analytics',
      ],
    },
    {
      type: 'education',
      title: 'B.E. Computer Science and Engineering',
      org: 'KL University',
      period: 'May 2023',
      location: 'India',
      bullets: ['Strong foundation in software engineering, data systems, and ML'],
    },
  ],
  testimonials: [
    {
      quote:
        'Nivas quickly translates ambiguous business questions into clean analyses and dashboards the team can act on.',
      name: 'Mentor, AICTE Internship Program',
      role: 'Data Science Lead',
    },
  ],
  contact: {
    email: 'nivasannamareddy@gmail.com',
    phone: '+1 (945) 713-3085',
    location: 'United States',
    availability: '',
    webhook: '',
    emailProvider: {
      serviceId: '',
      templateId: '',
      replyTemplateId: '',
      publicKey: '',
      toEmail: 'nivasannamareddy@gmail.com',
    },
  },
  theme: {
    accent: '#7cc7ff',
    secondary: '#121926',
  },
}

export default config
