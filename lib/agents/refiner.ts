import { createClient } from '@supabase/supabase-js';
import ollama from 'ollama';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function refineJobsLocal() {
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('id, title, description, country_code')
    .eq('is_processed', false)
    .limit(10);

  if (error || !jobs || jobs.length === 0) return;

  // Erweitertes Mapping für internationale Flexibilität
  const languageMap: Record<string, string> = {
    'DE': 'German', 'AT': 'German', 'CH': 'German',
    'US': 'English', 'GB': 'English', 'CA': 'English', 'AU': 'English',
    'FR': 'French',
    'ES': 'Spanish',
    'IT': 'Italian',
    'NL': 'Dutch',
    'PL': 'Polish',
    'PT': 'Portuguese'
  };

  for (const job of jobs) {
    try {
      const code = job.country_code?.toUpperCase() || 'DE';
      // Falls das Land nicht in der Liste ist, nehmen wir Englisch als Weltsprache
      const targetLang = languageMap[code] || 'English';
      
      const prompt = `
        TASK: Analyze this job for tech-leavers.
        CRITICAL: The entire response must be in ${targetLang}.
        FORMAT: Strictly JSON.

        SCORING LOGIC:
        - ai_resistance: 1 (digital/AI-vulnerable) to 10 (physical/AI-resistant).
        - nature: 1 (office) to 10 (pure nature/outdoor).

        STRUCTURE (Ensure all text values are in ${targetLang}):
        {
          "ai_resistance": number,
          "ai_reasoning": "Detailed reasoning in ${targetLang}",
          "nature": number,
          "nature_reasoning": "Nature factor explanation in ${targetLang}",
          "summary": "Short emotional hook for tech-leavers in ${targetLang}"
        }

        JOB DATA:
        Title: ${job.title}
        Location Code: ${code}
        Description: ${job.description}
      `;

      console.log(`🌍 M4 Global Mode [${code} -> ${targetLang}]: "${job.title}"`);

      const response = await ollama.generate({
        model: 'qwen2.5-coder:7b',
        prompt: prompt,
        format: 'json',
        stream: false,
        options: { temperature: 0.3 }
      });

      const aiResult = JSON.parse(response.response);

      await supabase.from('jobs').update({
        ai_resistance_score: aiResult.ai_resistance,
        ai_reasoning: aiResult.ai_reasoning,
        nature_score: aiResult.nature,
        nature_reasoning: aiResult.nature_reasoning,
        techie_summary: aiResult.summary,
        is_processed: true
      }).eq('id', job.id);

      console.log(`✅ Completed in ${targetLang}`);

    } catch (err) {
      console.error(`❌ Error:`, err);
    }
  }
}

if (require.main === module) {
  refineJobsLocal();
}