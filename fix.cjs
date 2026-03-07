const fs = require('fs');

let file = fs.readFileSync('components/StudentDashboard.tsx', 'utf8');
let fixed = file.replace(/    <div className="min-h-screen bg-slate-50 pb-\[100px\] pt-\[80px\]">/, '');

fs.writeFileSync('components/StudentDashboard.tsx', fixed);
