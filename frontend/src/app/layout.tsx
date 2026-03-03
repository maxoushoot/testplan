import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });

export const metadata: Metadata = {
  title: 'Ça marche avec Lety · Sorties nature et marche conviviale',
  description:
    'Découvrez les sorties nature de Ça marche avec Lety : marche douce, sport adapté et ambiance conviviale en forêt.',
  openGraph: {
    title: 'Ça marche avec Lety',
    description:
      'Un site vitrine immersif pour découvrir les prochaines sorties nature et contacter Lety facilement.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
