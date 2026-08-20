export type TechItem = {
  name: string
  icon: string
}

export const profile = {
  name: 'Aiden Tran',
  role: 'Software Engineer',
  bioLine1: "I'm a Computer Science student at UC Berkeley.",
  bioLine2: 'I specialize in full-stack and machine learning. I do game dev and computer graphics on the side.',
  location: 'Berkeley, CA',
  resumeUrl: '/resume.pdf',
  github: 'https://github.com/AidenTran900',
  linkedin: 'https://www.linkedin.com/in/aidentran900/',
  heroImage: '/images/hero-clouds.jpg',
}

export const languages: TechItem[] = [
  { name: 'C++', icon: '/tech/c++.svg' },
  { name: 'Python', icon: '/tech/python.svg' },
  { name: 'Java', icon: '/tech/java.svg' },
  { name: 'Lua', icon: '/tech/lua.svg' },
  { name: 'TypeScript', icon: '/tech/typescript.svg' },
  { name: 'C#', icon: '/tech/csharp.svg' },
]

export const technologies: TechItem[] = [
  { name: 'React', icon: '/tech/react.svg' },
  { name: 'PostgreSQL', icon: '/tech/postgresql.svg' },
  { name: 'Godot', icon: '/tech/godot.svg' },
  { name: 'Unity', icon: '/tech/unity.svg' },
  { name: 'CMake', icon: '/tech/cmake.svg' },
  { name: 'Node.js', icon: '/tech/nodejs.svg' },
  // { name: 'Svelte', icon: '/tech/svelte.svg' },
]
