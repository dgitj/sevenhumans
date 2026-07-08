export const metadata = {
  title: 'Impressum - Offline Careers',
}

export default function Impressum() {
  return (
    <div className="min-h-screen bg-[#020408] text-slate-300 font-sans px-8 py-20">
      <div className="max-w-2xl mx-auto space-y-16">

        <div className="space-y-6">
          <h1 className="font-serif text-3xl text-white mb-8">Impressum</h1>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
            <p>
              David Jin<br />
              Belfortstraße 4<br />
              60316 Karlsruhe, Deutschland
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">Kontakt</h2>
            <p>E-Mail: [E-Mail-Adresse folgt]</p>
          </section>

          <section className="space-y-2">
            <p className="text-sm text-slate-500">
              Ein Datenschutzbeauftragter ist für diesen Betrieb aufgrund seiner geringen Größe gesetzlich
              nicht zu benennen (§ 38 BDSG i.V.m. Art. 37 DS-GVO).
            </p>
          </section>
        </div>

        <div className="space-y-6 pt-8 border-t border-white/5">
          <h2 className="font-serif text-2xl text-white mb-8">Imprint (English)</h2>

          <section className="space-y-2">
            <h3 className="text-white font-semibold">Information according to § 5 DDG (German Digital Services Act)</h3>
            <p>
              David Jin<br />
              Belfortstraße 4<br />
              60316 Karlsruhe, Germany
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-white font-semibold">Contact</h3>
            <p>Email: [email address pending]</p>
          </section>

          <section className="space-y-2">
            <p className="text-sm text-slate-500">
              A Data Protection Officer is not legally required for this operation due to its small size
              (§ 38 BDSG in conjunction with Art. 37 GDPR).
            </p>
          </section>
        </div>

      </div>
    </div>
  )
}
