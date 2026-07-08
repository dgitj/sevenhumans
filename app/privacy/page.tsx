export const metadata = {
  title: 'Privacy Policy - Offline Careers',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020408] text-slate-300 font-sans px-8 py-20">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="font-serif text-3xl text-white mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500">
          Information on the processing of your data pursuant to Art. 13 of the General Data Protection Regulation (GDPR).
        </p>

        <section className="space-y-3">
          <h2 className="text-white font-semibold text-lg">1. Controller</h2>
          <p>
            The controller responsible for this website is:<br />
          </p>
          <p className="text-slate-600">
            David Jin<br />
            Belfortstraße 4, 60316 Karlsruhe, Germany<br />
            [email address pending]
          </p>
          <p className="text-sm text-slate-500">
            A Data Protection Officer is not legally required for this operation due to its small size
            (§ 38 BDSG in conjunction with Art. 37 GDPR).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-semibold text-lg">2. Data processed to provide this website and create log files</h2>
          <p>
            Each time this website is accessed, data is temporarily stored that may allow identification.
            The following data is collected:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Date and time of access</li>
            <li>IP address</li>
            <li>Hostname of the accessing device</li>
            <li>Referring and requested websites</li>
            <li>Page visited on our website</li>
            <li>Whether the request was successful</li>
            <li>Volume of data transferred</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
          </ul>
          <p>
            Temporary storage of this data is necessary to deliver the website. Further storage in log files
            ensures the functionality and security of our systems. This constitutes our legitimate interest
            in the processing.
          </p>
          <p>
            This website does not use cookies, analytics tools, contact forms, comment functions, or
            social media plugins. No user accounts are created.
          </p>

          <h3 className="text-white font-medium">Legal basis</h3>
          <p>Art. 6(1)(f) GDPR.</p>

          <h3 className="text-white font-medium">Recipients of your data</h3>
          <p>
            This website is hosted by Vercel Inc. (USA), which receives the above data as a processor.
            As Vercel is based in the United States, this involves a data transfer to a third country,
            based on the EU Standard Contractual Clauses and/or Vercel's certification under the
            EU-U.S. Data Privacy Framework, where applicable.
          </p>
          <p>
            Job listing data displayed on this site is additionally stored and processed via Supabase.
            This only concerns job listing content, not personal data of website visitors.
          </p>

          <h3 className="text-white font-medium">Retention period</h3>
          <p>
            Data is deleted once it is no longer required for the purpose of its collection. For website
            delivery, this is the case once the respective session ends. Log files are retained according
            to our hosting provider's standard retention periods.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-semibold text-lg">3. Your rights</h2>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Right of access (Art. 15 GDPR)</li>
            <li>Right to object (see section 4 below)</li>
            <li>Right to rectification (Art. 16 GDPR)</li>
            <li>Right to erasure (Art. 17 GDPR)</li>
            <li>Right to restriction of processing (Art. 18 GDPR)</li>
            <li>
              Right to lodge a complaint with a supervisory authority (Art. 77 GDPR), including the
              authority responsible for the controller: Der Landesbeauftragte für den Datenschutz und
              die Informationsfreiheit Baden-Württemberg (LfDI), Königstraße 10a, 70173 Stuttgart,
              Germany — www.baden-wuerttemberg.datenschutz.de
            </li>
            <li>
              Right to data portability (Art. 20 GDPR) — not applicable here, as this processing is not
              based on consent or a contract, but on Art. 6(1)(f) GDPR.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-semibold text-lg">4. Right to object (Art. 21(1) GDPR)</h2>
          <p>
            You have the right to object at any time, for reasons arising from your particular situation,
            to the processing of your personal data based on Art. 6(1)(f) GDPR. The controller will then no
            longer process the personal data unless compelling legitimate grounds for the processing can be
            demonstrated which override your interests, rights, and freedoms, or the processing serves the
            establishment, exercise, or defense of legal claims. Collecting data to deliver the website and
            storing log files is technically required to operate the site.
          </p>
        </section>
      </div>
    </div>
  )
}
