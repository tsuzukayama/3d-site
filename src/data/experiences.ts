export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  color: string;
};

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'TechCorp',
    role: 'Senior Frontend Developer',
    period: '2022 - Present',
    description: 'Led the development of a modern React-based dashboard serving 50k+ users. Implemented micro-frontend architecture and improved performance by 40%.',
    technologies: ['React', 'TypeScript', 'Three.js', 'GraphQL'],
    color: '#00ffff',
  },
  {
    id: 'exp-2',
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    period: '2020 - 2022',
    description: 'Built scalable web applications from scratch. Designed and implemented RESTful APIs and real-time features using WebSockets.',
    technologies: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
    color: '#ff6b35',
  },
  {
    id: 'exp-3',
    company: 'DigitalAgency',
    role: 'Frontend Developer',
    period: '2018 - 2020',
    description: 'Created responsive and accessible web experiences for Fortune 500 clients. Mentored junior developers and established coding standards.',
    technologies: ['Vue.js', 'SASS', 'JavaScript', 'Webpack'],
    color: '#b347ea',
  },
  {
    id: 'exp-4',
    company: 'GameStudio',
    role: 'Junior Developer',
    period: '2016 - 2018',
    description: 'Developed interactive web games and educational applications. First experience with WebGL and canvas-based animations.',
    technologies: ['JavaScript', 'Canvas API', 'Phaser.js', 'HTML5'],
    color: '#39ff14',
  },
];

