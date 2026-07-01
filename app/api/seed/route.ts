import dbConnect from '@/lib/mongodb';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Seed endpoint is only available in development.' }, { status: 403 });
  }

  await dbConnect();

  const experienceSeed = [
    {
      title: 'Quality Control Inspector',
      organization: 'KONARK TV, Noida',
      yearRange: '1988 – 1991',
      category: 'Production',
      description:
        'In the early years of his career, Vinod ensured broadcast-quality footage and reliable equipment performance for KONARK TV in Noida. He audited tapes, monitored signals, and coordinated technical handoffs to maintain daily television production standards.',
      thumbnail: '',
      media: [],
      order: 1
    },
    {
      title: 'In-Charge, Audio Visual Section',
      organization: 'PRIA (Participatory Research in Asia)',
      yearRange: '1991',
      category: 'Freelance',
      description:
        'At PRIA, Vinod led the audio-visual section for participatory development programmes, producing educational content and helping teams document community workshops with professional video and still photography.',
      thumbnail: '',
      media: [],
      order: 2
    },
    {
      title: 'Technical Incharge',
      organization: 'Angel Audio Visual Studio (TV Production Company)',
      yearRange: '1993',
      category: 'Production',
      description:
        'As Technical Incharge at Angel Audio Visual Studio, he managed studio operations, camera setups, and maintenance while supporting television production workflows across shoots and editing sessions.',
      thumbnail: '',
      media: [],
      order: 3
    },
    {
      title: 'Camera Person',
      organization: 'TEZ Television (Haryana-based TV News Network), Delhi',
      yearRange: '2004',
      category: 'Production',
      description:
        'For TEZ Television, Vinod captured news coverage and field stories as a camera person, ensuring footage was technically strong and visually composed for broadcast delivery.',
      thumbnail: '',
      media: [],
      order: 4
    },
    {
      title: 'Production Assistant',
      organization: 'RYAN TV, Ryan International School, Rohini',
      yearRange: '2004',
      category: 'Production',
      description:
        'At RYAN TV, he supported school-based broadcast projects and educational media initiatives, coordinating production logistics and assisting with camera, lighting, and audio setup.',
      thumbnail: '',
      media: [],
      order: 5
    },
    {
      title: 'Studio Assistant & Camera Person',
      organization: 'AV Production Centre, I.P. College for Women, DU',
      yearRange: '2005 – 2006',
      category: 'Academic',
      description:
        'In this academic production role, Vinod combined studio support with camera operation duties, helping students and faculty create video content while maintaining studio equipment and workflows.',
      thumbnail: '',
      media: [],
      order: 6
    },
    {
      title: 'Studio Incharge',
      organization: 'Jagan Institute of Management & Sciences (JIMS), Rohini',
      yearRange: '2006 – 2013',
      category: 'Academic',
      description:
        'As Studio Incharge at JIMS, he supervised studio production, trained students in television and film technology, and ensured the learning environment stayed aligned with professional broadcast standards.',
      thumbnail: '',
      media: [],
      order: 7
    },
    {
      title: 'Production Manager',
      organization: 'Hindi feature film "Chooda Ek Paratha"',
      yearRange: '2013',
      category: 'Production',
      description:
        'Vinod managed logistics and production coordination for the Hindi feature film "Chooda Ek Paratha," overseeing schedules, equipment, and crew support during filming.',
      thumbnail: '',
      media: [],
      order: 8
    },
    {
      title: 'Studio Incharge',
      organization: "Lingaya's Lalita Devi Institute (IP University)",
      yearRange: '2014',
      category: 'Academic',
      description:
        'At Lingaya’s Lalita Devi Institute, he maintained studio operations and guided media students in practical production exercises and technical studio training.',
      thumbnail: '',
      media: [],
      order: 9
    },
    {
      title: 'Assistant Professor',
      organization: 'Madhu Bala Institute of Comm. & Electronic Media (IP University)',
      yearRange: '2014 – March 2020',
      category: 'Academic',
      description:
        'As Assistant Professor, Vinod taught media production and television technology courses while mentoring students on camera, editing, and studio craft at Madhu Bala Institute.',
      thumbnail: '',
      media: [],
      order: 10
    },
    {
      title: 'Assistant Lecturer',
      organization: 'Subharti University, Meerut',
      yearRange: '30 Jan 2022 – April 2022',
      category: 'Academic',
      description:
        'During his tenure at Subharti University, he taught audiovisual production and provided practical training in media equipment handling and content creation.',
      thumbnail: '',
      media: [],
      order: 11
    },
    {
      title: 'Assistant Professor',
      organization: 'Tecnia Institute of Advanced Studies (GGSIP University)',
      yearRange: '6 June 2022 – Till Date',
      category: 'Academic',
      description:
        'Currently serving as Assistant Professor at Tecnia Institute of Advanced Studies, Vinod continues to educate students in film, television, and multimedia production.',
      thumbnail: '',
      media: [],
      order: 12
    }
  ];

  const skillSeed = [
    {
      name: 'Operating all kinds of professional video cameras — BETA CAM, DVCAM, etc.',
      category: 'Video Capture',
      icon: 'camera',
      description:
        'Vinod is experienced operating professional video cameras across formats such as BETA CAM and DVCAM, handling complex setups for studio and location shoots.',
      media: []
    },
    {
      name: 'Still photography — Digital & Analog',
      category: 'Photography',
      icon: 'image',
      description:
        'He works with both digital and analog still photography, creating high-quality imagery and managing lighting, composition, and exposure.',
      media: []
    },
    {
      name: 'Complete darkroom work (analog photography)',
      category: 'Photography',
      icon: 'film',
      description:
        'Vinod has hands-on expertise in complete darkroom processing, developing and printing analog photographs from start to finish.',
      media: []
    },
    {
      name: 'Video editing — Final Cut Pro, Adobe Premiere (Non-Linear Editing)',
      category: 'Post Production',
      icon: 'edit-3',
      description:
        'He is proficient in non-linear video editing with Final Cut Pro and Adobe Premiere, shaping footage into polished narratives and broadcast-ready edits.',
      media: []
    },
    {
      name: 'Cable making & repair for TV production use',
      category: 'Technical Support',
      icon: 'plug',
      description:
        'Vinod builds and repairs cables used in television production, ensuring reliable signal paths and minimizing technical interruptions on set.',
      media: []
    },
    {
      name: 'Repair, maintenance & servicing of electronic equipment — TV sets, VTRs, cameras',
      category: 'Technical Support',
      icon: 'tool',
      description:
        'He maintains and services electronic equipment including TV sets, VTRs, and cameras, keeping production gear operational and calibrated.',
      media: []
    },
    {
      name: 'Studio operations — lighting design & set designing',
      category: 'Studio Craft',
      icon: 'layout',
      description:
        'Vinod manages studio operations with lighting design and set planning, creating production-ready environments for recording and broadcast work.',
      media: []
    },
    {
      name: 'Equipment range across career: BETA CAM, Canon XL1, U-matic High Band, Mini DV',
      category: 'Equipment',
      icon: 'film',
      description:
        'Across his career, he has worked with a broad equipment range including BETA CAM, Canon XL1, U-matic High Band, and Mini DV systems.',
      media: []
    }
  ];

  await Experience.deleteMany({});
  await Skill.deleteMany({});
  await Experience.create(experienceSeed);
  await Skill.create(skillSeed);

  return NextResponse.json({ message: 'Seeded successfully', experienceCount: experienceSeed.length, skillCount: skillSeed.length });
}
