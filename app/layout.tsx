import type { Metadata } from 'next';
import { IBM_Plex_Mono, Manrope } from 'next/font/google';
import './globals.css';
const sans = Manrope({ variable: '--font-sans', subsets: ['latin'] });
const mono = IBM_Plex_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400','600'] });
export const metadata: Metadata = { metadataBase:new URL('https://sidineyr.github.io/Einstein-Fisica/'), title:'Einstein — Física em Movimento', description:'Estúdio aberto de investigação em Física para o Ensino Médio, alinhado à BNCC.', openGraph:{title:'Einstein — Física em Movimento',description:'Observe, meça, modele e argumente.',type:'website',locale:'pt_BR',images:[{url:'og.png',width:1200,height:630,alt:'Einstein — Física em Movimento'}]}, twitter:{card:'summary_large_image',title:'Einstein — Física em Movimento',description:'Observe, meça, modele e argumente.',images:['og.png']} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>; }
