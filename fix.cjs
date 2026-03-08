const fs = require('fs');

let file = fs.readFileSync('components/StudentDashboard.tsx', 'utf8');

// I need to make sure to remove the incorrect definition first at line 104
let target1 = `    const isStudyMode = activeTab === 'VIDEO' || activeTab === 'PDF' || activeTab === 'MCQ' || activeTab === 'AUDIO' || (contentViewStep === 'PLAYER' && activeTab !== 'HOME') || activeTab === 'WEEKLY_TEST' || activeTab === 'CHALLENGE_20';`;
file = file.replace(target1, '');

// Then add it to the main StudentDashboard component scope
let target2 = `  const checkCreditBalance = (amount: number) => {`;
let replacement2 = `  const isStudyMode = activeTab === 'VIDEO' || activeTab === 'PDF' || activeTab === 'MCQ' || activeTab === 'AUDIO' || (contentViewStep === 'PLAYER' && activeTab !== 'HOME') || activeTab === 'WEEKLY_TEST' || activeTab === 'CHALLENGE_20';

  const checkCreditBalance = (amount: number) => {`;

file = file.replace(target2, replacement2);

fs.writeFileSync('components/StudentDashboard.tsx', file);
