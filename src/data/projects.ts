export type Project = {
  slug: string
  title: string
  problem: string // one-line problem statement (for cards)
  summary: string // longer description for detail page intro
  year: number
  role: string
  team: number
  type: string
  stack: string[]
  videoCDN?: string
  videoSrc?: string
  url?: string
  featured?: boolean
  highlights?: string[]
  body?: { heading: string; paragraphs: string[] }[]
}

export const projects: Project[] = [
  {
    slug: 'ml-library',
    title: 'LLM + ML\nLibrary',
    problem: 'A from-scratch C++ machine learning library — built an LLM and most classical models.',
    summary:
      'A C++ ML library built end-to-end without external ML frameworks: tensors, autograd, optimizers, and a working transformer with multi-head attention, plus Python bindings.',
    year: 2025,
    role: 'Solo build',
    team: 1,
    type: 'Machine Learning · Systems',
    stack: ['C++', 'Python', 'CMake'],
    url: 'https://github.com/AidenTran900/CPPyML',
    videoCDN: 'https://assets.aidentran.dev/Videos/LLMDemoShort.v1.webm',
    featured: true,
    highlights: [
      'Custom n-d tensor + reverse-mode autograd',
      'SGD, Adam, learning-rate schedules',
      'Transformer with multi-head attention from primitives',
    ],
    body: [
      {
        heading: 'Why build it from scratch',
        paragraphs: [
          'Frameworks make ML easy, but they make systems thinking optional. I wanted to internalize how a tensor library actually works under the hood — memory layout, broadcasting rules, computational graphs — by writing every layer myself in C++.',
        ],
      },
      {
        heading: 'What\'s inside',
        paragraphs: [
          'A header-light tensor type with shape, strides, and broadcasting. A reverse-mode autograd engine that records ops into a graph and walks it backward. Optimizers (SGD, Adam) and modules (Linear, Embedding, MultiHeadAttention) composed into a working transformer block.',
          'Python bindings expose the C++ core so I can iterate on training loops without leaving the comfort of a notebook.',
        ],
      },
    ],
  },
  {
    slug: 'chromaclash',
    title: 'ChromaClash',
    problem: 'A competitive 1v1 fighter with rollback netcode for low-latency online play.',
    summary:
      'A deterministic 1v1 fighting game with rollback networking, frame-perfect input handling, and reactive UI built on React-Lua.',
    year: 2024,
    role: 'Creator',
    team: 2,
    type: 'Game Development · Realtime Networking',
    stack: ['Roblox', 'Lua', 'Rojo', 'React-Lua'],
    videoCDN: 'https://assets.aidentran.dev/Videos/ChromaClash.v1.webm',
    featured: true,
    highlights: [
      'Deterministic simulation with frame-accurate state',
      'Rollback netcode with prediction + resimulation',
      'React-Lua reactive HUD',
    ],
    body: [
      {
        heading: 'The challenge',
        paragraphs: [
          'Fighting games live and die on input latency. The standard delay-based approach in most online platforms breaks competitive play. Rollback netcode hides latency by predicting the opponent\'s inputs locally, then resimulating the last few frames the moment real inputs arrive.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'I rewrote the simulation to be fully deterministic — fixed timestep, no float drift, no engine RNG. Every gameplay system reads from a single authoritative state object that can be snapshotted, advanced, and rewound.',
          'On top of that sits the rollback layer: predict, simulate forward, reconcile when the real input lands, replay the affected frames. The UI runs on React-Lua so HUD updates piggyback on the same reactive state.',
        ],
      },
    ],
  },
  {
    slug: 'spectrum-analyzer',
    title: 'Spectrum\nAnalyzer',
    problem: 'A real-time C++ audio frequency analyzer using a hand-rolled Cooley–Tukey FFT.',
    summary:
      'A C++ desktop app that captures live microphone input and renders a real-time frequency spectrum using a from-scratch Cooley–Tukey FFT implementation.',
    year: 2025,
    role: 'Solo build',
    team: 1,
    type: 'Systems · Simulation',
    stack: ['C++', 'ImGui', 'PortAudio'],
    url: 'https://github.com/AidenTran900/NoteDetector',
    videoCDN: 'https://assets.aidentran.dev/Videos/SpectrumAnalyzer.v1.webm',
    featured: true,
    highlights: [
      'Hand-rolled radix-2 Cooley–Tukey FFT',
      'Live audio capture with windowing',
      'ImGui visualization at 60+ FPS',
    ],
    body: [
      {
        heading: 'From signal to spectrum',
        paragraphs: [
          'The DFT is intuitive but O(N²). The Cooley–Tukey FFT reduces it to O(N log N) by recursively splitting even and odd indices. I implemented the iterative bit-reversal variant to avoid recursion overhead on the audio thread.',
        ],
      },
      {
        heading: 'Real-time constraints',
        paragraphs: [
          'Audio capture runs on a separate thread feeding a ring buffer. The visualization thread reads, applies a Hann window to reduce spectral leakage, runs the FFT, and pushes magnitudes into ImGui — all in under a frame budget.',
        ],
      },
    ],
  },
  {
    slug: 'black-hole-analyzer',
    title: 'Black Hole\nAnalyzer',
    problem: 'A physics simulation that visualizes time dilation, spacetime curvature, and redshift.',
    summary:
      'An interactive simulation that renders gravitational time dilation, spacetime curvature, and gravitational redshift near a Schwarzschild black hole.',
    year: 2025,
    role: 'Time Dilation, Spacetime Curvature',
    team: 6,
    type: 'Simulation · Scientific',
    stack: ['Python', 'Matplotlib', 'Pandas'],
    url: 'https://github.com/AidenTran900/Black-Hole-Analyzer',
    videoCDN: 'https://assets.aidentran.dev/Videos/BlackHoleAnalyzer.v1.webm',
    featured: true,
    highlights: [
      'Schwarzschild metric for time dilation',
      'Embedding-diagram curvature plots',
      'Frequency shift across a radial geodesic',
    ],
    body: [
      {
        heading: 'What the simulation shows',
        paragraphs: [
          'Three perspectives on the same geometry: how a clock\'s tick rate changes with depth in the gravitational well, how the spatial geometry curves visualized as an embedding diagram, and how a photon\'s frequency shifts as it climbs out of the well.',
        ],
      },
    ],
  },
  {
    slug: 'pwnage',
    title: 'PWNAGE',
    problem: 'A fast-paced FPS with extreme movement and a unique weapon arsenal.',
    summary:
      'A movement-shooter built solo: bunny-hopping, wall-running, and an arsenal of mechanically distinct weapons.',
    year: 2023,
    role: 'Solo build',
    team: 1,
    type: 'Game Development',
    stack: ['Roblox', 'Lua'],
    videoCDN: 'https://assets.aidentran.dev/Videos/Pwnage.v1.webm',
  },
  {
    slug: 'those-who-chop',
    title: 'Those Who\nChop',
    problem: 'A roguelike FPS shipped in 3 days for the Roblox Developer Challenge hackathon.',
    summary:
      'A 3-day hackathon roguelike FPS built for the Roblox Developer Challenge. Overpowered by design.',
    year: 2025,
    role: 'Solo build',
    team: 1,
    type: 'Game Development · Hackathon',
    stack: ['Roblox', 'Lua'],
    videoCDN: 'https://assets.aidentran.dev/Videos/ThoseWhoChop.v1.webm',
  },
  {
    slug: 'forums',
    title: 'Forums',
    problem: 'A full-stack forum platform with topics, threads, and discussions.',
    summary:
      'A full-stack forum website built from scratch: PostgreSQL-backed threads, real-time-ish discussion, clean responsive UI.',
    year: 2025,
    role: 'Co-builder · Full-stack',
    team: 2,
    type: 'Web Development',
    stack: ['React', 'TypeScript', 'Tailwind', 'PostgreSQL'],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
