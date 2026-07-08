import { createClient } from '@supabase/supabase-js'

// Wir greifen exakt die Namen ab, die in deiner .env.local stehen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// service_role statt anon-Key: die "jobs"-Tabelle hat RLS aktiv und nur eine
// SELECT-Policy für anon. Schreibvorgänge brauchen den privilegierten Key.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

// Konfiguration der Fokus-Städte
const TARGET_LOCATIONS = [
  { city: 'San Francisco', country: 'us' }
];

// Adzuna-Plan: 25 Hits/Minute, 250 Hits/Tag. Wir bleiben mit großem Sicherheitsabstand
// darunter, da ein Sync-Lauf ruhig nur alle paar Tage stattfinden muss.
const RESULTS_PER_PAGE = 50; // Adzuna-Maximum pro Seite
const MAX_PAGES = 10; // Deckel: max. 10 Hits pro Stadt und Lauf (4% des Tagesbudgets)
const REQUEST_DELAY_MS = 5000; // 12 Hits/Minute max. -> weit unter dem 25er-Limit

export async function syncGlobalJobs() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ Fehler: Umgebungsvariablen nicht gefunden!");
    console.error("URL:", supabaseUrl ? "Vorhanden" : "FEHLT");
    console.error("Service Role Key:", supabaseServiceKey ? "Vorhanden" : "FEHLT");
    throw new Error("Supabase Umgebungsvariablen fehlen");
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  for (const loc of TARGET_LOCATIONS) {
    console.log(`Starte Sync für ${loc.city}...`);
    let synced = 0;

    for (let page = 1; page <= MAX_PAGES; page++) {
      // 1. API Abfrage (Trade & Construction Kategorie statt Keyword-Suche -
      // Keywords lassen zu viel Bürojobs durch, die Kategorie ist verlässlicher.)
      const url = `https://api.adzuna.com/v1/api/jobs/${loc.country}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=${RESULTS_PER_PAGE}&category=trade-construction-jobs&where=${loc.city}`;

      const res = await fetch(url);

      if (res.status === 429) {
        console.error(`  Adzuna Rate-Limit erreicht (429) bei Seite ${page}, breche Sync für ${loc.city} ab.`);
        break;
      }

      const data = await res.json();

      if (!data.results || data.results.length === 0) break;

      for (const job of data.results) {
        // 2. Daten für unser neues Schema transformieren
        const { error } = await supabase.from('jobs').upsert({
          title: job.title,
          company: job.company.display_name,
          location: job.location.display_name,
          category: job.category?.label || null,
          description: job.description,
          source_url: job.redirect_url,
          city: loc.city,
          country_code: loc.country,
          currency: job.salary_currency || (loc.country === 'us' ? 'USD' : loc.country === 'gb' ? 'GBP' : 'EUR'),
          original_source: 'adzuna',
          is_processed: true, // Veredler-Agent deaktiviert fürs Launch - Jobs gehen ungeveredelt live
          is_published: true
        }, { onConflict: 'source_url' }); // Verhindert Dubletten

        if (error) console.error(`Fehler bei Job ${job.title}:`, error.message);
        else synced++;
      }

      console.log(`  Seite ${page}: ${data.results.length} Jobs`);

      if (data.results.length < RESULTS_PER_PAGE) break; // letzte Seite erreicht

      await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS)); // Rate-Limit schonen
    }

    console.log(`${loc.city}: ${synced} Jobs synchronisiert.`);
  }
  return { status: 'Sync abgeschlossen' };
}

// Nur beim direkten Ausführen dieser Datei laufen lassen (z.B. `tsx lib/syncJobs.ts`),
// nicht beim Import durch die Cron-Route.
if (require.main === module) {
  (async () => {
    console.log("🚀 Starte Sync-Prozess...");
    try {
      await syncGlobalJobs();
      console.log("✅ Sync erfolgreich beendet.");
    } catch (err) {
      console.error("❌ Schwerwiegender Fehler beim Sync:", err);
    }
  })();
}