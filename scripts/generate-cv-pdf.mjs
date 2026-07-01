import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const outputPath = join(process.cwd(), 'public', 'vinod-kumar-cv.pdf');

const cvSections = [
  {
    title: 'Personal Details',
    lines: [
      'Name: Vinod Kumar',
      "Father's Name: Sh. Shyam Babu",
      'Date of Birth: 1st July 1969',
      'Address: 6/146, Dakshinpuri Extn., New Delhi - 110062',
      'Contact: 9312612071, 8826301570',
      'Current Role: Assistant Professor, Tecnia Institute of Advanced Studies',
      '(Affiliated to GGSIP University, Delhi)'
    ]
  },
  {
    title: 'Work Experience',
    lines: [
      '1. 1988 - 1991 | Quality Control Inspector | KONARK TV, Noida | Production',
      '2. 1991 | In-Charge, Audio Visual Section | PRIA (Participatory Research in Asia) | Freelance/NGO',
      '3. 1993 | Technical Incharge | Angel Audio Visual Studio (TV Production Company) | Production',
      '4. 2004 | Camera Person | TEZ Television (Haryana-based TV News Network), Delhi | Production',
      '5. 2004 | Production Assistant | RYAN TV, Ryan International School, Rohini | Production',
      '6. 2005 - 2006 | Studio Assistant & Camera Person | AV Production Centre, I.P. College for Women, DU | Academic',
      '7. 2006 - 2013 | Studio Incharge | Jagan Institute of Management & Sciences (JIMS), Rohini | Academic',
      '8. 2013 | Production Manager | Hindi feature film "Chooda Ek Paratha" | Production',
      "9. 2014 | Studio Incharge | Lingaya's Lalita Devi Institute (IP University) | Academic",
      '10. 2014 - March 2020 | Assistant Professor | Madhu Bala Institute of Comm. & Electronic Media (IP University) | Academic',
      '11. 30 Jan 2022 - April 2022 | Assistant Lecturer | Subharti University, Meerut | Academic',
      '12. 6 June 2022 - Till Date | Assistant Professor | Tecnia Institute of Advanced Studies (GGSIP University) | Academic'
    ]
  },
  {
    title: 'Professional Skills',
    lines: [
      '1. Operating all kinds of professional video cameras - BETA CAM, DVCAM, etc.',
      '2. Still photography - Digital & Analog',
      '3. Complete darkroom work (analog photography)',
      '4. Video editing - Final Cut Pro, Adobe Premiere (Non-Linear Editing)',
      '5. Cable making & repair for TV production use',
      '6. Repair, maintenance & servicing of electronic equipment - TV sets, VTRs, cameras',
      '7. Studio operations - lighting design & set designing',
      '8. Equipment range across career: BETA CAM, Canon XL1, U-matic High Band, Mini DV'
    ]
  },
  {
    title: 'Freelance / Project Work',
    lines: [
      '1. 3M-Unitech - seminars & training programmes, Mini DV',
      '2. Moda Cocktail company - fashion shows, Mini DV, Canon XL1',
      '3. Miss Polytechnic show - fashion show, Mini DV, Canon XL1',
      '4. GE BPO - seminars, Canon XL1',
      '5. Project Concern International (NGO) - documentaries on AIDS, Polio, Rag Pickers',
      '6. Nav Srishti (NGO) - documentaries',
      '7. UNIFEM - Girl Child Trafficking programme, BETA CAM',
      '8. Kendriya Vidyalaya Sangathan - Primary Education film',
      '9. Hinduja IN Delhi channel - 26-episode "Bollywood Top 10", U-matic High Band',
      '10. "Nirmal Katha" - documentary film, BETA CAM',
      '11. "Shreniyon Ka Sangathan" (Nainital NGO) - documentary film',
      '12. Teacher Training Programmes/seminars: CRY, Smile Foundation, Action India, Nav Srishti, JWP, Udyogini, NEISBUD, Mahila Dairy Udyog, Madhyam'
    ]
  },
  {
    title: 'Educational Qualifications',
    lines: [
      'M.A. Mass Communication - Guru Jambheshwar University, Hissar',
      'B.A. Social Work - Indira Gandhi National Open University (IGNOU)',
      'Two-Year Diploma in Video Production - Home Entertainment, New Delhi',
      'Diploma in Electronics - Mathur Technical Training Centre, Hauz Khas, New Delhi'
    ]
  },
  {
    title: 'Calculated Stats',
    lines: [
      '35+ Years in production / education (1988 - present)',
      '12 Career roles / production engagements',
      '4 Academic institutions taught at',
      '20+ Freelance & NGO projects delivered'
    ]
  }
];

function escapePdf(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrapLine(line, maxLength = 88) {
  if (line.length <= maxLength) return [line];

  const words = line.split(' ');
  const wrapped = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      wrapped.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) wrapped.push(current);
  return wrapped;
}

function paginate() {
  const pages = [];
  let lines = [];

  const pushPage = () => {
    pages.push(lines);
    lines = [];
  };

  lines.push({ text: 'VINOD KUMAR', size: 22, leading: 30 });
  lines.push({ text: 'Cinematic Portfolio CV', size: 12, leading: 28 });

  cvSections.forEach((section) => {
    if (lines.length > 42) pushPage();
    lines.push({ text: section.title.toUpperCase(), size: 14, leading: 24 });

    section.lines.forEach((line) => {
      wrapLine(line).forEach((wrapped, index) => {
        if (lines.length > 46) pushPage();
        lines.push({ text: index === 0 ? wrapped : `   ${wrapped}`, size: 9.6, leading: 15 });
      });
    });

    lines.push({ text: '', size: 9.6, leading: 10 });
  });

  if (lines.length) pushPage();
  return pages;
}

function createPdf() {
  const pages = paginate();
  const objects = [];
  const addObject = (body) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = addObject('<< /Type /Catalog /Pages 2 0 R >>');
  const pagesId = addObject('');
  const fontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const contentIds = [];
  const pageIds = [];

  pages.forEach((pageLines, pageIndex) => {
    let y = 760;
    const content = ['BT'];

    pageLines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        y -= line.leading;
      }
      content.push(`1 0 0 1 54 ${y} Tm`);
      content.push(`/F1 ${line.size} Tf (${escapePdf(line.text)}) Tj`);
    });

    content.push('ET');
    const stream = content.join('\n');
    const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`);
    const pageId = addObject(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`
    );

    contentIds.push(contentId);
    pageIds.push(pageId);
  });

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return pdf;
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, createPdf(), 'binary');
console.log(`Generated ${outputPath}`);
