export type Project = {
  slug: string
  title: string
  year: number
  description: string
  stack: string[]
  url?: string
  thumbnail?: string
  video?: string // muted looping preview clip shown in place of the thumbnail
  featured?: boolean
  role?: string
  type?: string
  file?: string // path to a markdown write-up under /public/projects
}

export const projects: Project[] = [
  {
    slug: 'ml-library',
    title: 'ML + Transformer Library',
    year: 2025,
    description:
      'A C++ ML library built for learning: 10+ classical models, a transformer, and inference with pretrained GGUF weights.',
    stack: ['C++', 'Python', 'CMake'],
    url: 'https://github.com/AidenTran900/CPPyML',
    video: 'https://assets.aidentran.dev/Videos/LLMDemoShort.v1.webm',
    featured: true,
    role: 'Solo',
    file: '/projects/ml-library.md',
  },
  {
    slug: 'chromaclash',
    title: 'ChromaClash',
    year: 2024,
    description:
      'A deterministic 1v1 fighting game, 3 complete characters, and custom built rollback networking.',
    stack: ['Roblox', 'Lua', 'React-Lua'],
    video: 'https://assets.aidentran.dev/Videos/ChromaClash.v1.webm',
    featured: true,
    role: 'Solo',
    file: '/projects/chromaclash.md',
  },
  {
    slug: 'markov-luau',
    title: 'Markov Luau',
    year: 2026,
    description:
      'A luau port of MarkovJunior. Allows for procedural generation through Markov rewriting and Wave Function Collapse.',
    stack: ['Lua'],
    url: 'https://github.com/AidenTran900/markov-luau',
    video: 'https://assets.aidentran.dev/Videos/MarkovJunior.v1.mp4',
    featured: true,
    role: 'Solo',
    file: '/projects/markov-luau.md',
  },
  {
    slug: 'spectrum-analyzer',
    title: 'Spectrum Analyzer',
    year: 2025,
    description:
      'A C++ desktop app that captures live microphone input and renders frequency spectrum using Cooley–Tukey FFT algorithm.',
    stack: ['C++', 'ImGui', 'PortAudio'],
    url: 'https://github.com/AidenTran900/NoteDetector',
    video: 'https://assets.aidentran.dev/Videos/SpectrumAnalyzer.v1.webm',
    featured: true,
    role: 'Solo',
    file: '/projects/spectrum-analyzer.md',
  },
  {
    slug: 'black-hole-analyzer',
    title: 'Black Hole Analyzer',
    year: 2025,
    description:
      'An interactive simulation that renders gravitational time dilation, spacetime curvature, and gravitational redshift near a Schwarzschild black hole.',
    stack: ['Python', 'Matplotlib', 'Pandas'],
    url: 'https://github.com/AidenTran900/Black-Hole-Analyzer',
    video: 'https://assets.aidentran.dev/Videos/BlackHoleAnalyzer.v1.mp4',
    featured: true,
    role: 'Team',
    file: '/projects/black-hole-analyzer.md',
  },
  {
    slug: 'pwnage',
    title: 'PWNAGE',
    year: 2023,
    description: 'A fast paced movement shooter with an arsenal of mechanically distinct weapons and abilities.',
    stack: ['Roblox', 'Lua'],
    video: 'https://assets.aidentran.dev/Videos/Pwnage.v1.webm',
    role: 'Solo',
  },
  // {
  //   slug: 'those-who-chop',
  //   title: 'Those Who Chop',
  //   year: 2025,
  //   description: 'A 3-day hackathon roguelike FPS built for the Roblox Developer Challenge. Overpowered by design.',
  //   stack: ['Roblox', 'Lua'],
  //   video: 'https://assets.aidentran.dev/Videos/ThoseWhoChop.v1.webm',
  //   role: 'Solo build',
  // },
  // {
  //   slug: 'forums',
  //   title: 'Forums',
  //   year: 2025,
  //   description: 'A full-stack forum website built from scratch: PostgreSQL-backed threads, real-time-ish discussion, clean responsive UI.',
  //   stack: ['React', 'TypeScript', 'PostgreSQL'],
  //   role: 'Co-builder',
  // },
]

export const featuredProjects = projects.filter((project) => project.featured)
