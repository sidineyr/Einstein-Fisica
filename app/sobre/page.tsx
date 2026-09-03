/* oxlint-disable next/no-html-link-for-pages -- Shared by the Vite multi-page entry. */
import type { Metadata } from 'next';
import { ArrowLeft, Atom, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre, autoria e fontes',
  description:
    'Conheça a autoria, os créditos e as fontes internacionais verificáveis do Einstein — Física em Movimento.',
  alternates: { canonical: './sobre/' },
  openGraph: {
    title: 'Sobre, autoria e fontes | Einstein — Física em Movimento',
    description:
      'Autoria, independência editorial e referências confiáveis para estudar e ensinar Física.',
    url: './sobre/',
  },
};

const sources = [
  {
    org: 'American Physical Society',
    title: 'APS — K–12 Physics Education',
    note: 'Recursos, iniciativas e atividades para estudantes e professores de Física.',
    href: 'https://www.aps.org/initiatives/physics-education/k-12',
  },
  {
    org: 'MIT',
    title: 'MIT OpenCourseWare — Physics',
    note: 'Cursos abertos de mecânica clássica, eletricidade, magnetismo e outros temas.',
    href: 'https://ocw.mit.edu/search/?d=Physics',
  },
  {
    org: 'Rice University',
    title: 'OpenStax — Physics',
    note: 'Livro-texto aberto e gratuito, com teoria, exemplos e exercícios para o Ensino Médio.',
    href: 'https://openstax.org/details/books/physics',
  },
  {
    org: 'University of Colorado Boulder',
    title: 'PhET — Physics Simulations',
    note: 'Simulações interativas gratuitas, baseadas em pesquisa educacional.',
    href: 'https://phet.colorado.edu/en/simulations/filter?subjects=physics&type=html',
  },
  {
    org: 'CERN',
    title: 'CERN — Inspire and Educate',
    note: 'Materiais, programas e experiências sobre física de partículas e pesquisa científica.',
    href: 'https://home.cern/about/what-we-do/inspire-educate',
  },
  {
    org: 'NASA',
    title: 'NASA Learning Resources',
    note: 'Atividades, missões, vídeos e projetos STEM sobre espaço, energia e o Universo.',
    href: 'https://www.nasa.gov/learning-resources/',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-foreground">
      <header className="glass sticky top-0 z-50 border-b px-5 py-3 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <a
            href="/Einstein-Fisica/"
            className="flex items-center gap-3 font-bold"
          >
            <span className="grid size-10 place-items-center rounded-full border-2 border-primary text-primary">
              <Atom />
            </span>
            <span>
              Einstein{' '}
              <em className="not-italic text-primary">/ laboratório</em>
            </span>
          </a>
          <a
            href="/Einstein-Fisica/"
            className="inline-flex items-center gap-2 text-sm text-sky-200 hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Voltar ao laboratório
          </a>
        </div>
      </header>

      <section className="px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-xs font-bold text-primary">
            SOBRE O PROJETO
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Autoria, créditos e fontes para ir além.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            O Einstein — Física em Movimento é um projeto aberto de educação
            científica criado para aproximar observação, medida, modelagem e
            argumentação. A seleção abaixo prioriza instituições acadêmicas e
            científicas reconhecidas, materiais com autoria identificável e
            recursos que permitem verificar origem, finalidade e contexto.
          </p>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border bg-card p-7">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary font-mono text-xl font-black text-slate-950">
                SR
              </span>
              <p className="mt-7 font-mono text-xs text-sky-300">
                IDEALIZAÇÃO E DIREÇÃO
              </p>
              <h2 className="mt-2 text-3xl font-black">Sidiney Rodrigues</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Idealizou o projeto, definiu sua proposta educacional, seus
                objetivos de aprendizagem e as decisões editoriais. O conteúdo e
                a evolução do portal permanecem sob direção humana.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-bold hover:border-primary"
                  href="https://www.linkedin.com/in/sidineyrodrigues/?locale=pt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <ExternalLink className="size-4" />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-bold hover:border-primary"
                  href="https://github.com/sidineyr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <ExternalLink className="size-4" />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-bold hover:border-primary"
                  href="https://github.com/sidineyr/Einstein-Fisica"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Código-fonte <ExternalLink className="size-4" />
                </a>
              </div>
            </article>
            <article className="rounded-3xl border bg-sky-950/50 p-7">
              <span className="grid h-14 min-w-14 place-items-center rounded-2xl bg-white px-3 font-mono font-black text-slate-950">
                OpenAI
              </span>
              <p className="mt-7 font-mono text-xs text-sky-300">
                DESENVOLVIMENTO ASSISTIDO
              </p>
              <h2 className="mt-2 text-3xl font-black">OpenAI Codex</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Apoio à arquitetura, programação, experiência, acessibilidade,
                testes e documentação do portal, sempre sob orientação, revisão
                e decisão editorial de Sidiney Rodrigues.
              </p>
              <a
                className="mt-6 inline-flex items-center gap-2 font-bold text-sky-300 hover:text-primary"
                href="https://developers.openai.com/codex/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conhecer o Codex <ExternalLink className="size-4" />
              </a>
            </article>
          </div>

          <div className="mt-10 rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-5 text-sm leading-6 text-yellow-50">
            <b>Independência editorial.</b> O Einstein — Física em Movimento é
            um projeto independente. A menção a tecnologias e instituições
            reconhece suas contribuições e indica fontes públicas para consulta;
            não representa patrocínio, parceria formal nem aprovação
            institucional do conteúdo.
          </div>
        </div>
      </section>

      <section className="bg-[#eef3f8] px-5 py-20 text-slate-950 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-xs font-bold text-blue-700">
            FONTES INTERNACIONAIS VERIFICÁVEIS
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black sm:text-5xl">
            Referências para estudar, ensinar e investigar Física.
          </h2>
          <p className="mt-5 max-w-3xl leading-7 text-slate-600">
            Antes de usar qualquer material, confira autoria, data, nível de
            ensino, método e limitações. Todos os links abaixo levam ao site
            oficial da instituição e abrem em uma nova página.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {sources.map((source) => (
              <a
                key={source.title}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-56 flex-col rounded-2xl border border-slate-300 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-600 hover:shadow-lg"
              >
                <span className="font-mono text-xs font-bold text-blue-700">
                  {source.org}
                </span>
                <h3 className="mt-5 text-2xl font-black">{source.title}</h3>
                <p className="mt-3 leading-6 text-slate-600">{source.note}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-blue-800">
                  Abrir site oficial <ExternalLink className="size-4" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-7 text-sm leading-6 text-slate-500">
            As instituições acima são fontes públicas de consulta e
            aprofundamento. Seus nomes identificam os respectivos links e não
            implicam vínculo, parceria ou endosso institucional ao projeto.
          </p>
        </div>
      </section>

      <footer className="border-t px-5 py-8 text-sm text-muted-foreground lg:px-10">
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-between gap-3">
          <p>
            <b className="text-white">Einstein — Física em Movimento</b> •
            Sidiney Rodrigues.
          </p>
          <p>
            Conteúdo educacional; práticas reais exigem supervisão e análise de
            risco.
          </p>
        </div>
      </footer>
    </main>
  );
}
