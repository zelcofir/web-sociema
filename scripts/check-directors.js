const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Load env vars
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Reading env from:', envPath);

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('File read successfully. Length:', envContent.length);

    const env = {};
    const lines = envContent.split(/\r?\n/);

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            // Remove quotes if present
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

    async function check() {
        console.log('--- Checking committee_directors ---');
        const { data: directors, error: dirError } = await supabase
            .from('committee_directors')
            .select('*')
            .limit(5);

        if (dirError) console.error('Error fetching directors:', dirError);
        else {
            fs.writeFileSync('directors.json', JSON.stringify(directors, null, 2), 'utf8');
            console.log('Wrote directors.json');
        }

        console.log('\n--- Checking team_members ---');
        const { data: members, error: memError } = await supabase
            .from('team_members')
            .select('*')
            .limit(5);

        if (memError) console.error('Error fetching members:', memError);
        else {
            fs.writeFileSync('members.json', JSON.stringify(members, null, 2), 'utf8');
            console.log('Wrote members.json');
        }
    }

    check();

} catch (err) {
    console.error('Error:', err.message);
}
