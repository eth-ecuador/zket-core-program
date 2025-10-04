import { writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

function generateVoters(count: number) {
  const voters: string[] = [];
  for (let i = 0; i < count; i++) {
    voters.push(randomUUID());
  }
  writeFileSync('voters.json', JSON.stringify(voters, null, 2));
  console.log(`Generated ${count} voter IDs in voters.json`);
}

const count = parseInt(process.argv[2] || '0', 10);
if (!count || count < 1) {
  console.error('Please specify the number of voters to generate. Example: npm run genvoters 10');
  process.exit(1);
}
generateVoters(count);
