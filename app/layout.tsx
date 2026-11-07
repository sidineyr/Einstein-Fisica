import type { Metadata } from 'next';
import { IBM_Plex_Mono, Manrope } from 'next/font/google';
import './globals.css';
import { LanguageSelector } from '@/components/language-selector';
const sans = Manrope({ variable: '--font-sans', subsets: ['latin'] });
const mono = IBM_Plex_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '600'] });
export const metadata: Metadata = {
  other: { 'google-adsense-account': 'ca-pub-4924241177850142' },
  other: { 'google-adsense-account': 'ca-pub-4924241177850142' },
  metadataBase: new URL('https://sidineyr.github.io/Einstein-Fisica/'),
  title: { default: 'Einstein â€” FÃ­sica em Movimento', template: '%s | Einstein â€” FÃ­sica em Movimento' },
  description: 'Aprenda FÃ­sica para o Ensino MÃ©dio gratuitamente com experimentos, simulaÃ§Ãµes, quiz, laboratÃ³rios digitais e conteÃºdos alinhados Ã  BNCC.',
  authors: [{ name: 'Sidiney Rodrigues', url: 'https://github.com/sidineyr' }],
  creator: 'Sidiney Rodrigues',
  keywords: ['FÃ­sica para o Ensino MÃ©dio', 'aprender FÃ­sica', 'experimentos de FÃ­sica', 'simulaÃ§Ãµes de FÃ­sica', 'laboratÃ³rio virtual de FÃ­sica', 'high school physics', 'physics simulations', 'virtual physics lab', 'FÃ­sica BNCC'],
  alternates: { canonical: 'https://sidineyr.github.io/Einstein-Fisica/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { title: 'Einstein â€” FÃ­sica em Movimento', description: 'Aprenda FÃ­sica investigando: observe, meÃ§a, modele, teste e argumente.', url: 'https://sidineyr.github.io/Einstein-Fisica/', siteName: 'Einstein â€” FÃ­sica em Movimento', type: 'website', locale: 'pt_BR', alternateLocale: ['en_US'], images: [{ url: 'og.png', width: 1200, height: 630, alt: 'Einstein â€” FÃ­sica em Movimento' }] },
  twitter: { card: 'summary_large_image', title: 'Einstein â€” FÃ­sica em Movimento', description: 'Aprenda FÃ­sica investigando: observe, meÃ§a, modele, teste e argumente.', images: ['og.png'] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="pt-BR"><body className={`${sans.variable} ${mono.variable}`}><LanguageSelector />{children}<p data-independent-donation="true"><a href="https://pequenoprincipe.org.br/doadores/apoie-o-pequeno-principe/" target="_blank" rel="noopener noreferrer">Se desejar, doe diretamente ao Hospital Pequeno Príncipe.</a> Iniciativa independente, sem vínculo institucional com o hospital e sem intermediação de doações.</p></body></html>; }
