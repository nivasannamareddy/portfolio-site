const config = {
  meta: {
    title: 'Nivas Annamareddy | Portfolio',
    description:
      'Data analyst and machine learning graduate student turning data into clear, actionable stories.',
  },
  personal: {
    name: 'Nivas Annamareddy',
    headline: 'Transforming complex data into confident decisions.',
    typed: ['Data Analyst', 'Machine Learning Engineer', 'Visualization Strategist'],
    title: 'Aspiring Data Scientist | Data Analyst / ML Engineer',
    location: 'Richardson, TX 75080',
    email: 'Nivasannamareddy@gmail.com',
    phone: '+1 (945) 713-3085',
    resumeUrl: '/resume.pdf',
    avatar: '/assets/profile.png',
    status: 'Actively seeking full-time roles (May 2026)',
    bio: 'Aspiring Data Scientist with a strong foundation in machine learning, statistical analysis, and predictive modeling. Experienced in Python, SQL, and end-to-end data workflows through internships and academic projects, including regression, classification, time-series forecasting, and NLP. Focused on extracting insights from data, building reliable models, and supporting data-driven decision-making.',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/nivas-annamareddy',
    github: 'https://github.com/nivasannamareddy',
    email: 'mailto:Nivasannamareddy@gmail.com',
  },
  highlights: [
    { label: 'Workflow', value: '30%', description: 'Exit processing time reduced.' },
    { label: 'Dashboards', value: '40%', description: 'Analysis time reduction via Power BI.' },
    { label: 'Forecasting', value: '35%', description: 'Revenue optimization improvement.' },
  ],
  skills: [
    {
      category: 'Languages',
      items: [
        { name: 'Python', level: 95 },
        { name: 'R', level: 78 },
        { name: 'SQL', level: 92 },
        { name: 'Java', level: 72 },
        { name: 'C/C++', level: 65 },
        { name: 'JavaScript', level: 70 },
      ],
    },
    {
      category: 'Data & ML',
      items: [
        { name: 'Pandas / NumPy', level: 94 },
        { name: 'Scikit-learn', level: 92 },
        { name: 'TensorFlow', level: 82 },
        { name: 'Seaborn / Matplotlib', level: 88 },
        { name: 'Forecasting (ARIMA, Prophet)', level: 80 },
        { name: 'Regression / Classification / Clustering', level: 86 },
        { name: 'NLP', level: 78 },
      ],
    },
    {
      category: 'Visualization & BI',
      items: [
        { name: 'Tableau', level: 90 },
        { name: 'Power BI', level: 92 },
        { name: 'Excel (Pivot, Charts)', level: 85 },
      ],
    },
    {
      category: 'Databases',
      items: [
        { name: 'MySQL', level: 88 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Oracle', level: 78 },
        { name: 'SQLite', level: 76 },
      ],
    },
    {
      category: 'Tools & Platforms',
      items: [
        { name: 'Git', level: 86 },
        { name: 'Jupyter Notebook', level: 90 },
        { name: 'Google Colab', level: 88 },
        { name: 'Node.js / Express', level: 70 },
        { name: 'JWT', level: 68 },
        { name: 'React', level: 70 },
        { name: 'Vite / Tailwind CSS', level: 70 },
        { name: 'Agile / Scrum', level: 84 },
      ],
    },
  ],
  certifications: [
    'AWS Certified – Cloud Practitioner & Developer (Associate)',
    'Red Hat Certified – Enterprise Application Developer',
    'Microsoft Certified: Azure Fundamentals & DevOps Engineer Expert',
  ],
  projects: [
    {
      title: 'Airline Reservation Forecasting',
      period: 'Feb 2025 – May 2025',
      description:
        'Implemented time-series forecasting (Prophet, ARIMA) to predict flight pricing trends and cancellations.',
      tech: ['Python', 'Prophet', 'ARIMA', 'Power BI'],
      impact: 'Improved revenue optimization by 35%.',
      links: { demo: '#', repo: '#' },
      images: ['/images/airline.svg'],
      category: 'Machine Learning',
    },
    {
      title: 'Artistry Archive – Gallery Data Platform',
      period: 'Aug 2025 – Dec 2025',
      description:
        'Designed and analyzed a 17-table SQL schema with analytical queries and performance dashboards.',
      tech: ['PostgreSQL', 'SQL', 'Tableau', 'Python'],
      impact: 'Improved operational transparency by 30%.',
      links: { demo: '#', repo: '#' },
      images: ['/images/artistry.svg'],
      category: 'Data Engineering',
    },
    {
      title: 'Bike Rental Demand Intelligence',
      period: 'Feb 2023 – May 2023',
      description:
        'Applied regression and clustering to forecast rental demand and designed KPI dashboards.',
      tech: ['Python', 'Scikit-learn', 'Power BI'],
      impact: 'Optimized fleet allocation by 25%.',
      links: { demo: '#', repo: '#' },
      images: ['/images/bike.svg'],
      category: 'Analytics',
    },
    {
      title: 'Multilingual Communication System',
      period: 'Jan 2024 – May 2024',
      description:
        'Built a real-time ML-based translation system to speed conversations and reduce response time.',
      tech: ['Python', 'NLP'],
      impact: 'Increased translation accuracy by 35% and reduced response time by 40%.',
      links: { demo: '#', repo: '#' },
      images: ['/images/multilingual.svg'],
      category: 'Publications',
    },
    {
      title: 'Face Recognition Benchmarking',
      period: 'Jul 2023 – Dec 2023',
      description:
        'Evaluated classification algorithms and improved recognition accuracy using deep learning and feature extraction.',
      tech: ['TensorFlow', 'Python', 'OpenCV'],
      impact: 'Improved recognition accuracy by 20%.',
      links: { demo: '#', repo: '#' },
      images: ['/images/faceid.svg'],
      category: 'Publications',
    },
  ],
  timeline: [
    {
      type: 'experience',
      title: 'Data Scientist',
      org: 'CITM(JSOM)',
      period: 'Oct 2025 – Dec 2025',
      location: 'Dallas, TX',
      bullets: [
        'Built analytics around a 22-step offboarding workflow and role-based access to reduce exit processing time by 30%.',
        'Delivered case tracking, docs, notes, timeline, and exports to improve compliance completeness by 25%.',
      ],
      tech: ['Python', 'Analytics', 'Workflow Automation'],
    },
    {
      type: 'experience',
      title: 'Data Analyst Intern',
      org: 'AICTE, India',
      period: 'Dec 2022 – Feb 2023',
      location: 'Remote',
      bullets: [
        'Performed regression and clustering in Python to identify key business patterns.',
        'Built interactive Power BI dashboards, reducing analysis time by 40% and improving insight delivery.',
      ],
      tech: ['Python', 'Power BI', 'SQL'],
    },
    {
      type: 'experience',
      title: 'AI-ML Intern',
      org: 'AICTE, India',
      period: 'May 2022 – Dec 2022',
      location: 'Remote',
      bullets: [
        'Developed supervised learning models using scikit-learn and TensorFlow, improving accuracy by 30%.',
        'Conducted EDA and feature selection, enhancing model input quality and reliability.',
      ],
      tech: ['Python', 'TensorFlow', 'EDA'],
    },
    {
      type: 'education',
      title: 'M.S. Information Technology & Management',
      org: 'The University of Texas at Dallas',
      period: 'May 2026',
      location: 'Dallas, TX',
      bullets: ['Awarded Dean’s Excellence Scholarship', 'Focus: analytics, data engineering, ML'],
    },
    {
      type: 'education',
      title: 'B.Tech Computer Science and Engineering',
      org: 'Koneru Lakshmaiah Education Foundation',
      period: 'May 2024',
      location: 'Vaddeswaram, India',
      bullets: ['Graduated with strong foundation in software engineering and data systems'],
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
    email: 'Nivasannamareddy@gmail.com',
    phone: '+1 (945) 713-3085',
    location: 'Richardson, TX',
    availability: '',
    webhook: '',
    emailProvider: {
      serviceId: '',
      templateId: '',
      replyTemplateId: '',
      publicKey: '',
      toEmail: 'Nivasannamareddy@gmail.com',
    },
  },
  theme: {
    accent: '#ff7b54',
    secondary: '#0f2f53',
  },
}

export default config
