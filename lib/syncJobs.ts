import { createClient } from '@supabase/supabase-js'

// Wir greifen exakt die Namen ab, die in deiner .env.local stehen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Fehler: Umgebungsvariablen nicht gefunden!");
  console.error("URL:", supabaseUrl ? "Vorhanden" : "FEHLT");
  console.error("Key:", supabaseKey ? "Vorhanden" : "FEHLT");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey)
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

// Konfiguration der Fokus-Städte
const TARGET_LOCATIONS = [
  { city: 'Berlin', country: 'de' },
  { city: 'London', country: 'gb' },
  { city: 'New York', country: 'us' }
];

export async function syncGlobalJobs() {
  for (const loc of TARGET_LOCATIONS) {
    console.log(`Starte Sync für ${loc.city}...`);
    
    // 1. API Abfrage (Suche nach Handwerk/Outdoor für Techie-Aussteiger)
    const url = `https://api.adzuna.com/v1/api/jobs/${loc.country}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=20&what=handwerk%20outdoor%20schreiner%20garten&where=${loc.city}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.results) continue;

    for (const job of data.results) {
      // 2. Daten für unser neues Schema transformieren
      const { error } = await supabase.from('jobs').upsert({
        title: job.title,
        company: job.company.display_name,
        location: job.location.display_name,
        description: job.description,
        source_url: job.redirect_url,
        city: loc.city,
        country_code: loc.country,
        currency: job.salary_currency || (loc.country === 'us' ? 'USD' : loc.country === 'gb' ? 'GBP' : 'EUR'),
        original_source: 'adzuna',
        is_processed: false, // Wichtig: Damit der Veredler-Agent weiß, dass er hier ran muss
        is_published: true
      }, { onConflict: 'source_url' }); // Verhindert Dubletten

      if (error) console.error(`Fehler bei Job ${job.title}:`, error.message);
    }
  }
  return { status: 'Sync abgeschlossen' };
}

// Am Ende von lib/syncJobs.ts
(async () => {
  console.log("🚀 Starte Sync-Prozess...");
  try {
    await syncGlobalJobs(); // Ersetze dies durch den Namen deiner Hauptfunktion
    console.log("✅ Sync erfolgreich beendet.");
  } catch (err) {
    console.error("❌ Schwerwiegender Fehler beim Sync:", err);
  }
})();