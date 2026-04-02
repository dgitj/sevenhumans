import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function fetchAndSyncJobs() {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  const country = "de"; 
  
  // Deine Liste an "Offline"-Berufen
  const keywords = [
    "Gärtner", 
    "Schreiner", 
    "Elektriker", 
    "Pflegefachkraft", 
    "Forstwirt", 
    "Handwerk"
  ];

  for (const word of keywords) {
    console.log(`🔎 Suche nach: ${word}...`);
    
    // Wir encoden das Wort für die URL
    const query = encodeURIComponent(word);
    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${query}&content-type=application/json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        console.log(`⚠️ Keine Jobs für "${word}" gefunden.`);
        continue; // Springe zum nächsten Wort in der Liste
      }

      const formattedJobs = data.results.map((job: any) => ({
        title: job.title.replace(/<\/?[^>]+(>|$)/g, ""),
        company: job.company.display_name,
        location: job.location?.display_name || "Deutschland",
        description: job.description.replace(/<\/?[^>]+(>|$)/g, ""),
        redirect_url: job.redirect_url,
        salary_range: job.salary_min ? `€${job.salary_min.toLocaleString()}` : "Auf Anfrage", // Euro statt Pfund
        stability_score: 98, // In DE sind diese Berufe extrem krisensicher
        tags: [word, "Offline Karriere", "DE"]
      }));

      const { error } = await supabase
        .from('jobs')
        .insert(formattedJobs);

      if (error) {
        console.error(`❌ Supabase Fehler bei "${word}":`, error.message);
      } else {
        console.log(`✅ ${formattedJobs.length} Jobs für "${word}" gespeichert.`);
      }

    } catch (err) {
      console.error(`💥 Fehler beim Abrufen von "${word}":`, err);
    }
    
    // Kleiner "Cooldown" (0.5 Sek), damit die API uns nicht wegen zu vielen Anfragen blockt
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log("🏁 Alle Keywords verarbeitet!");
}

if (require.main === module || !require.main) {
  fetchAndSyncJobs();
}