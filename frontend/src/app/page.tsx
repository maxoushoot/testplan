import Image from 'next/image';
import Link from 'next/link';
import { promises as fs } from 'node:fs';
import path from 'node:path';

type Sortie = {
  title: string;
  date: string;
  location: string;
  level: string;
  weather: string;
  summary: string;
};

const experiences = [
  {
    title: 'Nature',
    text: 'Des itinéraires choisis pour respirer profondément, écouter la forêt et ralentir naturellement.'
  },
  {
    title: 'Sport adapté',
    text: 'Une intensité progressive qui respecte vos besoins : reprendre confiance, bouger et durer.'
  },
  {
    title: 'Convivialité',
    text: 'Des sorties humaines, chaleureuses et simples, où chacun avance à son rythme.'
  }
];

const faqs = [
  {
    q: 'À qui s’adressent les sorties ?',
    a: 'Aux adultes qui veulent reprendre une activité en douceur, seuls ou entre proches.'
  },
  {
    q: 'Quel niveau faut-il avoir ?',
    a: 'Aucun niveau minimum : les parcours sont pensés pour rester accessibles et progressifs.'
  },
  {
    q: 'Combien de temps dure une sortie ?',
    a: 'En moyenne entre 1h15 et 2h selon le parcours et les pauses prévues.'
  },
  {
    q: 'Que faut-il prévoir ?',
    a: 'Chaussures confortables, eau, tenue adaptée à la météo et votre bonne humeur.'
  },
  {
    q: 'Peut-on venir pour une première séance découverte ?',
    a: 'Oui, c’est même recommandé pour sentir l’ambiance et le rythme du groupe.'
  },
  {
    q: 'Comment réserver ?',
    a: 'Par WhatsApp, email, ou via le mini-formulaire de contact en bas de page.'
  }
];

async function getSorties(): Promise<Sortie[]> {
  const filePath = path.join(process.cwd(), 'public/data/sorties.json');
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content) as Sortie[];
}

export default async function HomePage() {
  const sorties = await getSorties();

  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80"
          alt="Chemin forestier immersif"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-forest/65" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-6 py-24 text-cream fade-in">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-cream/80">Ça marche avec Lety</p>
          <h1 className="max-w-3xl font-heading text-4xl leading-tight md:text-6xl">
            Reconnectez-vous à la nature, un pas après l’autre.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/90 md:text-xl">
            Des sorties en forêt pensées pour le bien-être, le mouvement adapté et le plaisir de marcher ensemble.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="https://wa.me/33600000000"
              className="rounded-full bg-sun px-7 py-3 font-semibold text-forest transition hover:brightness-95"
            >
              WhatsApp
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-cream/40 px-7 py-3 font-semibold text-cream transition hover:bg-cream/10"
            >
              Prendre contact
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-heading text-3xl md:text-4xl">L’expérience</h2>
          <p className="max-w-xl text-moss">Une approche premium et accessible pour bouger dehors en confiance.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {experiences.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-3xl border border-border bg-white p-8 shadow-card fade-in ${index === 1 ? 'fade-delay-1' : index === 2 ? 'fade-delay-2' : ''}`}
            >
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="mt-4 text-moss">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative h-[52vh] min-h-[320px] bg-fixed">
        <Image
          src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1800&q=80"
          alt="Forêt lumineuse"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest/45" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center px-6 text-center text-cream">
          <p className="mx-auto max-w-3xl font-heading text-3xl leading-snug md:text-5xl">
            "Chaque sortie est une parenthèse pour se sentir vivant, aligné et entouré."
          </p>
        </div>
      </section>

      <section className="footsteps border-y border-border bg-white/70 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-heading text-3xl md:text-4xl">Prochaines sorties</h2>
          <p className="mt-3 max-w-2xl text-moss">Programmation figée (modifiable via /public/data/sorties.json).</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {sorties.map((sortie) => (
              <article key={sortie.title} className="rounded-3xl border border-border bg-cream p-6 shadow-card">
                <p className="text-sm uppercase tracking-wide text-moss">{sortie.date}</p>
                <h3 className="mt-2 font-heading text-2xl">{sortie.title}</h3>
                <p className="mt-2 text-sm text-night">{sortie.location}</p>
                <p className="mt-1 text-sm text-moss">{sortie.level}</p>
                <p className="mt-4">{sortie.summary}</p>
                <p className="mt-4 rounded-xl border border-border bg-white px-4 py-3 text-sm text-night">
                  <strong>Note météo :</strong> {sortie.weather}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center">
        <div className="relative h-[460px] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
            alt="Portrait de Lety"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-heading text-3xl md:text-4xl">À propos de Lety</h2>
          <p className="mt-6 leading-relaxed text-moss">
            Passionnée de nature et d’accompagnement humain, Lety crée des sorties qui allient mouvement, écoute et simplicité.
            Son objectif : rendre la marche accessible, agréable et motivante pour tous les profils.
          </p>
          <p className="mt-4 leading-relaxed text-moss">
            Chaque parcours est pensé pour vous aider à retrouver de l’énergie, à respirer mieux et à profiter d’un cadre naturel inspirant.
          </p>
        </div>
      </section>

      <section className="footsteps border-y border-border bg-white/70 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-heading text-3xl md:text-4xl">FAQ</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-border bg-cream p-6">
                <summary className="cursor-pointer list-none font-semibold text-night">
                  {faq.q}
                  <span className="float-right transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-moss">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-8 rounded-3xl border border-border bg-white p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl">Contact</h2>
            <p className="mt-4 text-moss">Un projet, une question, ou envie de rejoindre une sortie ? Écrivez à Lety.</p>
            <div className="mt-8 space-y-3 text-lg">
              <p>
                WhatsApp : <Link className="font-semibold text-forest underline" href="https://wa.me/33600000000">+33 6 00 00 00 00</Link>
              </p>
              <p>
                Email : <Link className="font-semibold text-forest underline" href="mailto:contact@camarcheaveclety.fr">contact@camarcheaveclety.fr</Link>
              </p>
            </div>
          </div>
          <form className="grid gap-4">
            <input className="rounded-xl border border-border bg-cream px-4 py-3" placeholder="Votre prénom" />
            <input className="rounded-xl border border-border bg-cream px-4 py-3" type="email" placeholder="Votre email" />
            <textarea className="min-h-32 rounded-xl border border-border bg-cream px-4 py-3" placeholder="Votre message" />
            <button type="button" className="w-fit rounded-full bg-sun px-6 py-3 font-semibold text-forest">
              Envoyer le message
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-night py-10 text-cream">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 text-sm md:flex-row">
          <p>© {new Date().getFullYear()} Ça marche avec Lety</p>
          <div className="flex gap-6 text-cream/80">
            <Link href="#">Mentions légales</Link>
            <Link href="#">Politique de confidentialité</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
