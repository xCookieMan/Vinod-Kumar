export type ExperienceCategory = 'Academic' | 'Production' | 'Freelance';

export interface MediaItem {
  type: 'image' | 'video' | 'audio';
  url: string;
  label: string;
  posterUrl?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  yearRange: string;
  category: ExperienceCategory;
  description: string;
  order: number;
  media: MediaItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  media: MediaItem[];
}

export const fallbackExperiences: ExperienceItem[] = [
  {
    id: 'experience-1',
    title: 'Quality Control Inspector',
    organization: 'KONARK TV, Noida',
    yearRange: '1988 - 1991',
    category: 'Production',
    description: 'Broadcast-quality footage checks, tape audits, signal monitoring, and technical handoffs for daily television production.',
    order: 1,
    media: []
  },
  {
    id: 'experience-2',
    title: 'In-Charge, Audio Visual Section',
    organization: 'PRIA (Participatory Research in Asia)',
    yearRange: '1991',
    category: 'Freelance',
    description: 'Led audio-visual documentation for participatory development programmes and community workshop media.',
    order: 2,
    media: []
  },
  {
    id: 'experience-3',
    title: 'Technical Incharge',
    organization: 'Angel Audio Visual Studio (TV Production Company)',
    yearRange: '1993',
    category: 'Production',
    description: 'Managed studio operations, camera setups, maintenance, and production workflows for television work.',
    order: 3,
    media: []
  },
  {
    id: 'experience-4',
    title: 'Camera Person',
    organization: 'TEZ Television (Haryana-based TV News Network), Delhi',
    yearRange: '2004',
    category: 'Production',
    description: 'Captured news coverage and field stories with technically reliable broadcast footage.',
    order: 4,
    media: []
  },
  {
    id: 'experience-5',
    title: 'Production Assistant',
    organization: 'RYAN TV, Ryan International School, Rohini',
    yearRange: '2004',
    category: 'Production',
    description: 'Supported school broadcast projects with production logistics, camera, lighting, and audio setup.',
    order: 5,
    media: []
  },
  {
    id: 'experience-6',
    title: 'Studio Assistant & Camera Person',
    organization: 'AV Production Centre, I.P. College for Women, DU',
    yearRange: '2005 - 2006',
    category: 'Academic',
    description: 'Supported academic video production while maintaining studio equipment and practical workflows.',
    order: 6,
    media: []
  },
  {
    id: 'experience-7',
    title: 'Studio Incharge',
    organization: 'Jagan Institute of Management & Sciences (JIMS), Rohini',
    yearRange: '2006 - 2013',
    category: 'Academic',
    description: 'Supervised studio production, trained students, and kept facilities aligned with broadcast standards.',
    order: 7,
    media: []
  },
  {
    id: 'experience-8',
    title: 'Production Manager',
    organization: 'Hindi feature film "Chooda Ek Paratha"',
    yearRange: '2013',
    category: 'Production',
    description: 'Managed schedules, equipment, crew support, and production coordination for the feature film.',
    order: 8,
    media: []
  },
  {
    id: 'experience-9',
    title: 'Studio Incharge',
    organization: "Lingaya's Lalita Devi Institute (IP University)",
    yearRange: '2014',
    category: 'Academic',
    description: 'Maintained studio operations and guided media students through practical technical training.',
    order: 9,
    media: []
  },
  {
    id: 'experience-10',
    title: 'Assistant Professor',
    organization: 'Madhu Bala Institute of Comm. & Electronic Media (IP University)',
    yearRange: '2014 - March 2020',
    category: 'Academic',
    description: 'Taught media production, television technology, camera, editing, and studio craft.',
    order: 10,
    media: []
  },
  {
    id: 'experience-11',
    title: 'Assistant Lecturer',
    organization: 'Subharti University, Meerut',
    yearRange: '30 Jan 2022 - April 2022',
    category: 'Academic',
    description: 'Taught audiovisual production and practical media equipment handling.',
    order: 11,
    media: []
  },
  {
    id: 'experience-12',
    title: 'Assistant Professor',
    organization: 'Tecnia Institute of Advanced Studies (GGSIP University)',
    yearRange: '6 June 2022 - Till Date',
    category: 'Academic',
    description: 'Continues to educate students in film, television, and multimedia production.',
    order: 12,
    media: []
  }
];

export const fallbackSkills: SkillItem[] = [
  {
    id: 'skill-1',
    name: 'Operating all kinds of professional video cameras - BETA CAM, DVCAM, etc.',
    category: 'Video Capture',
    icon: 'camera',
    description: 'Professional camera operation across BETA CAM, DVCAM, and complex studio or location setups.',
    media: []
  },
  {
    id: 'skill-2',
    name: 'Still photography - Digital & Analog',
    category: 'Photography',
    icon: 'image',
    description: 'Digital and analog still photography with attention to lighting, composition, and exposure.',
    media: []
  },
  {
    id: 'skill-3',
    name: 'Complete darkroom work (analog photography)',
    category: 'Photography',
    icon: 'film',
    description: 'Hands-on analog darkroom processing, developing, and printing from start to finish.',
    media: []
  },
  {
    id: 'skill-4',
    name: 'Video editing - Final Cut Pro, Adobe Premiere (Non-Linear Editing)',
    category: 'Post Production',
    icon: 'edit-3',
    description: 'Non-linear editing with Final Cut Pro and Adobe Premiere for polished narratives and broadcast-ready edits.',
    media: []
  },
  {
    id: 'skill-5',
    name: 'Cable making & repair for TV production use',
    category: 'Technical Support',
    icon: 'plug',
    description: 'Cable building and repair for reliable television production signal paths.',
    media: []
  },
  {
    id: 'skill-6',
    name: 'Repair, maintenance & servicing of electronic equipment - TV sets, VTRs, cameras',
    category: 'Technical Support',
    icon: 'tool',
    description: 'Maintenance and servicing of TV sets, VTRs, cameras, and allied production electronics.',
    media: []
  },
  {
    id: 'skill-7',
    name: 'Studio operations - lighting design & set designing',
    category: 'Studio Craft',
    icon: 'layout',
    description: 'Studio operation, lighting design, and set planning for production-ready recording environments.',
    media: []
  },
  {
    id: 'skill-8',
    name: 'Equipment range across career: BETA CAM, Canon XL1, U-matic High Band, Mini DV',
    category: 'Equipment',
    icon: 'film',
    description: 'Career-long experience across BETA CAM, Canon XL1, U-matic High Band, and Mini DV systems.',
    media: []
  }
];
