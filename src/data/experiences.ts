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
    company: 'Wildlife Studios',
    role: 'Senior Software Engineer',
    period: 'Apr 2025 - Present',
    description: 'Working on reducing logs ingestion for internal services going from 100GB/day to 5GB/day, reducing costs. Working on PoCs on integration of our internal offers service with external stores. Implementing devx improvements for internal purchase testing.',
    technologies: ['Golang', 'Kubernetes', 'AWS', 'Terraform'],
    color: '#00ffff',
  },
  {
    id: 'exp-2',
    company: 'Wildlife Studios',
    role: 'Associate Engineering Manager',
    period: 'Sep 2023 - Apr 2025',
    description: 'Coordinated load tests and launch preparation for Puzzle Society and Time Blast. Directed the team\'s re-architecture of the authentication service for improved availability and scalability. Mentored and developed engineers through quarterly career development.',
    technologies: ['Leadership', 'System Design', 'Agile', 'Mentoring'],
    color: '#ff6b35',
  },
  {
    id: 'exp-3',
    company: 'Wildlife Studios',
    role: 'Senior Software Engineer',
    period: 'Oct 2020 - Sep 2023',
    description: 'Created a micro frontend architecture for the liveops portal improving performance and scalability. Introduced testing culture ensuring 80% test coverage. Led the frontend chapter and wrote frontend guidelines for consistency across the area.',
    technologies: ['React', 'TypeScript', 'Micro Frontends', 'Feature Flags'],
    color: '#b347ea',
  },
  {
    id: 'exp-4',
    company: 'Gympass',
    role: 'Frontend Software Engineer',
    period: 'Jul 2019 - Oct 2020',
    description: 'Worked on B2B products for HR to manage employees eligible for Gympass benefit. Designed and implemented architecture for new HR Portal and Backend For Frontend using Next.JS and GraphQL.',
    technologies: ['Next.js', 'GraphQL', 'React', 'TypeScript'],
    color: '#39ff14',
  },
  {
    id: 'exp-5',
    company: 'Tripletech',
    role: 'Software Analyst',
    period: 'Jan 2017 - Jul 2019',
    description: 'Responsible for the development and architecture of frontend/backend applications for clients. Built solutions using modern frameworks and established development patterns.',
    technologies: ['React', 'Angular', 'ASP.NET Core', 'AngularJS'],
    color: '#ff1493',
  },
];
