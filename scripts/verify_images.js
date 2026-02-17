const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Load env vars
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Reading env from:', envPath);

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    const lines = envContent.split(/\r?\n/);

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            env[key] = value;
        }
    });

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase credentials');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    async function verifyParamsAndImages() {
        console.log('--- Verifying Director Image Matching ---');

        // Get all directors
        const { data: directors } = await supabase
            .from('committee_directors')
            .select('*');

        // Get all team members
        const { data: members } = await supabase
            .from('team_members')
            .select('name, image_url');

        const memberImages = new Map(
            members?.map(m => [m.name.toLowerCase().trim(), m.image_url]) || []
        );

        let fixedCount = 0;
        let missingCount = 0;

        console.log(`Checking ${directors.length} directors...`);

        directors.forEach(dir => {
            if (!dir.image_url) {
                const foundImage = memberImages.get(dir.name.toLowerCase().trim());
                if (foundImage) {
                    console.log(`[FIXED] ${dir.name} (${dir.committee}) -> Found image in team_members: ${foundImage}`);
                    fixedCount++;
                } else {
                    console.log(`[MISSING] ${dir.name} (${dir.committee}) -> No image found in team_members either.`);
                    missingCount++;
                }
            } else {
                // console.log(`[OK] ${dir.name} already has image.`);
            }
        });

        console.log(`\nSummary:`);
        console.log(`- Automatically Fixed: ${fixedCount}`);
        console.log(`- Still Missing: ${missingCount}`);
    }

    verifyParamsAndImages();

} catch (err) {
    console.error('Error:', err.message);
}
