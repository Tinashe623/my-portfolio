import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa'

export const RESUME_DATA = {
  header: {
    name: 'Tinashe Mundieta',
    title: 'Front-End Web Developer',
    location: 'Harare, Zimbabwe',
    email: 'tinashemundieta36@gmail.com',
    phone: '+263 714 224 383 / +263 779 941 427',
    links: [
      { label: 'Portfolio', icon: FaGlobe, url: 'https://tinashe-portfolio.netlify.app' },
      { label: 'GitHub', icon: FaGithub, url: 'https://github.com/Tinashe623' },
      { label: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/tinashe-mundieta-041715302/' },
    ],
  },
  summary:
    'Motivated and detail-oriented Front-End Web Developer with hands-on experience in building responsive, user-friendly interfaces using React, Vite, and Chakra UI. Skilled in translating design concepts into functional web applications with clean, maintainable code. Certified in HTML, CSS, JavaScript, and Front-End Development from W3Schools. Passionate about crafting seamless web experiences and eager to contribute to innovative projects.',
  skills: {
    technical: [
      'Frontend: React.js, Vite, Chakra UI, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS',
      'Version Control: Git, GitHub',
      'Tools: VS Code, npm, Chrome DevTools, Jira',
      'Core Concepts: Responsive Design, SEO Basics, Web Accessibility (WCAG), UI Optimization',
    ],
    soft: [
      'Strong attention to detail and creativity',
      'Excellent problem-solving and debugging skills',
      'Ability to meet deadlines and work independently',
      'Effective collaboration and communication skills',
    ],
  },
  experience: [
    {
      role: 'Front-End Developer',
      company: 'Freelance / Self-Employed',
      period: '2023 - Present',
      description:
        'Developing professional web applications and portfolios for clients. key achievements include building high-performance React applications, optimizing load times, and implementing modern UI/UX design principles.',
    },
  ],
  education: [
    {
      degree: 'Certified Front-End Developer',
      institution: 'W3Schools',
      year: '2024',
      details: 'Includes individual certifications in HTML, CSS, and JavaScript.',
    },
    {
      degree: 'Self-Taught Front-End Developer',
      institution: 'Continuous Learning',
      year: 'Ongoing',
      details:
        'Continuously learning through online courses, project-based tutorials, and real-world application development.',
    },
  ],
  projects: {
    note: 'For a detailed showcase of my projects, code repositories, and live demos, please visit my interactive portfolio.',
    action: 'View Full Portfolio',
    link: '/portfolio',
  },
  availability: 'Immediately available for on-site work in Harare, Zimbabwe or remote opportunities.',
}
