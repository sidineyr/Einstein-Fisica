import type { Metadata } from 'next';
import { IBM_Plex_Mono, Manrope } from 'next/font/google';
import './globals.css';
const sans = Manrope({ variable: '--font-sans', subsets: ['latin'] });
const mono = IBM_Plex_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '600'] });
export const metadata: Metadata = {
  metadataBase: new URL('https://sidineyr.github.io/Einstein-Fisica/'),
  title: { default: 'Einstein — Física em Movimento', template: '%s | Einstein — Física em Movimento' },
  description: 'Estúdio aberto e gratuito de Física para o Ensino Médio, com percurso investigativo, quiz, laboratórios digitais e alinhamento à BNCC.',
  authors: [{ name: 'Sidiney Rodrigues', url: 'https://github.com/sidineyr' }],
  creator: 'Sidiney Rodrigues',
  keywords: ['Física', 'Ensino Médio', 'BNCC', 'experimentos de Física', 'simulações de Física', 'educação científica'],
  alternates: { canonical: 'https://sidineyr.github.io/Einstein-Fisica/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { title: 'Einstein — Física em Movimento', description: 'Aprenda Física investigando: observe, meça, modele, teste e argumente.', url: 'https://sidineyr.github.io/Einstein-Fisica/', siteName: 'Einstein — Física em Movimento', type: 'website', locale: 'pt_BR', images: [{ url: 'og.png', width: 1200, height: 630, alt: 'Einstein — Física em Movimento' }] },
  twitter: { card: 'summary_large_image', title: 'Einstein — Física em Movimento', description: 'Aprenda Física investigando: observe, meça, modele, teste e argumente.', images: ['og.png'] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="pt-BR"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>; }
