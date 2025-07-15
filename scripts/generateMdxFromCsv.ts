import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface QuizRow {
  [key: string]: string;
}

// Entry: npx tsx scripts/generateMdxFromCsv.ts data/your-quiz.csv
const csvFilePath = process.argv[2];
if (!csvFilePath) {
  console.error('❌ Please provide a path to a CSV file.');
  process.exit(1);
}

const csv = fs.readFileSync(csvFilePath, 'utf-8');
const records: QuizRow[] = parse(csv, {
  columns: true,
  skip_empty_lines: true,
});

const baseName = path.basename(csvFilePath, '.csv');
const outputMdxPath = path.join('src/content/docs/', `${baseName}.mdx`);
const title = toTitleCase(baseName.replace(/-/g, ' '));

const header = `---
title: ${title}
description: ${title}
---

import QuestionBlock from '../../components/QuestionBlock.tsx';
import "../../styles/tailwind.css";
import BmcPopup from '../../components/BmcPopup';

<div className="space-y-1 max-w-none">
`;

const footer = `</div>

---

<BmcPopup client:only="react" />
`;

const questionBlocks = records.map((row) => {
  const options = Object.entries(row)
    .filter(([key]) => /^Option\d+$/.test(key))
    .sort(([a], [b]) => Number(a.replace('Option', '')) - Number(b.replace('Option', '')))
    .map(([, val]) => val.trim())
    .filter(Boolean);

  const formattedOptions = options.map((opt) => `      ${JSON.stringify(opt)}`).join(',\n');
  const questionText = JSON.stringify(row.Question || '');

  const correctIndexes = (row.CorrectIndex || '')
    .split(',')
    .map((index) => index.trim())
    .filter((val) => /^\d+$/.test(val))
    .map(Number)
    .join(', ');

  return `  <QuestionBlock
    client:load
    id="${row.ID}"
    question=${questionText}
    options={
      [
${formattedOptions}
      ]
    }
    correctIndexes={[${correctIndexes}]}
  />
  <br />`;
});

const content = header + questionBlocks.join('\n') + '\n' + footer;
fs.writeFileSync(outputMdxPath, content);
console.log(`✅ MDX generated: ${outputMdxPath}`);

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1));
}
