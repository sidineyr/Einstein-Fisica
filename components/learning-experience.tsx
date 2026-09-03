'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  RotateCcw,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Measure = { force: number; mass: number; acceleration: number };
type Answer = { value: string; correct: boolean };
type Question = {
  topic: string;
  prompt: string;
  type: 'choice' | 'number';
  options?: string[];
  answer: string;
  tolerance?: number;
  unit?: string;
  explanation: string;
  misconception: string;
};

const steps = [
  ['Observar', 'Explore o que muda quando força e massa são alteradas.'],
  ['Definir', 'Registre uma previsão que possa ser comparada com medidas.'],
  ['Coletar', 'Produza pelo menos três medições controladas.'],
  ['Modelar', 'Compare a tabela e o gráfico com a relação ΣF = m·a.'],
  ['Concluir', 'Escreva uma conclusão proporcional às evidências.'],
];

const questions: Question[] = [
  {
    topic: 'Movimento e forças',
    prompt:
      'Um carrinho mantém velocidade constante em linha reta. Qual é a força resultante sobre ele?',
    type: 'choice',
    options: [
      'Zero',
      'Igual ao peso',
      'No sentido do movimento',
      'Cresce com a velocidade',
    ],
    answer: 'Zero',
    explanation:
      'Velocidade constante significa aceleração nula; pela 2ª lei, a força resultante é zero.',
    misconception:
      'Confundir movimento com necessidade de uma força resultante contínua.',
  },
  {
    topic: 'Movimento e forças',
    prompt:
      'Uma força resultante de 18 N atua em uma massa de 6 kg. Qual é a aceleração?',
    type: 'number',
    answer: '3',
    tolerance: 0.01,
    unit: 'm/s²',
    explanation: 'a = F/m = 18/6 = 3 m/s².',
    misconception: 'Multiplicar força e massa em vez de dividir.',
  },
  {
    topic: 'Energia',
    prompt: 'Ao elevar lentamente um objeto, qual grandeza aumenta?',
    type: 'choice',
    options: [
      'Energia potencial gravitacional',
      'Massa',
      'Velocidade da luz',
      'Carga elétrica',
    ],
    answer: 'Energia potencial gravitacional',
    explanation:
      'A energia potencial gravitacional aumenta com a altura no modelo próximo à superfície terrestre.',
    misconception:
      'Tratar energia como uma substância material armazenada no objeto.',
  },
  {
    topic: 'Energia',
    prompt:
      'Uma máquina realiza 600 J de trabalho em 3 s. Qual é sua potência média?',
    type: 'number',
    answer: '200',
    tolerance: 0.01,
    unit: 'W',
    explanation:
      'Potência média é trabalho dividido pelo intervalo de tempo: 600/3 = 200 W.',
    misconception: 'Confundir potência com a quantidade total de energia.',
  },
  {
    topic: 'Ondas e óptica',
    prompt:
      'Em um mesmo meio, a frequência de uma onda dobra e sua velocidade permanece constante. O comprimento de onda:',
    type: 'choice',
    options: ['Cai pela metade', 'Dobra', 'Não muda', 'Torna-se zero'],
    answer: 'Cai pela metade',
    explanation: 'Como v = λf, com v constante, dobrar f reduz λ à metade.',
    misconception:
      'Supor que frequência e comprimento de onda sempre crescem juntos.',
  },
  {
    topic: 'Ondas e óptica',
    prompt:
      'Um gráfico posição × tempo é uma reta com inclinação constante e positiva. O movimento tem:',
    type: 'choice',
    options: [
      'Velocidade constante e positiva',
      'Aceleração crescente',
      'Velocidade zero',
      'Posição constante',
    ],
    answer: 'Velocidade constante e positiva',
    explanation:
      'A inclinação do gráfico posição × tempo representa a velocidade.',
    misconception:
      'Interpretar a altura da linha como velocidade, em vez de sua inclinação.',
  },
  {
    topic: 'Eletricidade',
    prompt: 'Em um circuito em série sem ramificações, a corrente elétrica:',
    type: 'choice',
    options: [
      'É a mesma em todos os componentes',
      'É consumida pela primeira lâmpada',
      'Aumenta após cada resistor',
      'Existe apenas na bateria',
    ],
    answer: 'É a mesma em todos os componentes',
    explanation:
      'Em regime estacionário, a taxa de fluxo de carga é a mesma ao longo do ramo em série.',
    misconception:
      'Imaginar que os componentes consomem corrente, e não transferem energia.',
  },
  {
    topic: 'Eletricidade',
    prompt: 'Um resistor de 4 Ω submetido a 12 V conduz qual corrente?',
    type: 'number',
    answer: '3',
    tolerance: 0.01,
    unit: 'A',
    explanation: 'Pela relação V = RI, I = 12/4 = 3 A.',
    misconception: 'Dividir resistência por tensão.',
  },
  {
    topic: 'Gravitação',
    prompt: 'Um satélite permanece em órbita porque:',
    type: 'choice',
    options: [
      'Está em queda contínua ao redor da Terra',
      'Não sofre gravidade',
      'Está fora da atmosfera',
      'Sua massa é zero',
    ],
    answer: 'Está em queda contínua ao redor da Terra',
    explanation:
      'A gravidade fornece a aceleração centrípeta; a velocidade tangencial impede a colisão imediata.',
    misconception:
      'Acreditar que não existe gravidade no espaço próximo à Terra.',
  },
  {
    topic: 'Termodinâmica',
    prompt: 'Calor é melhor definido como:',
    type: 'choice',
    options: [
      'Energia transferida por diferença de temperatura',
      'Temperatura armazenada',
      'Quantidade de matéria quente',
      'Energia que só existe em gases',
    ],
    answer: 'Energia transferida por diferença de temperatura',
    explanation:
      'Calor descreve transferência de energia motivada por diferença de temperatura.',
    misconception: 'Usar calor e temperatura como sinônimos.',
  },
  {
    topic: 'Física moderna',
    prompt:
      'No efeito fotoelétrico, aumentar apenas a intensidade de uma luz abaixo da frequência de corte:',
    type: 'choice',
    options: [
      'Não ejeta elétrons',
      'Ejeta elétrons mais energéticos',
      'Muda a carga do elétron',
      'Produz qualquer frequência desejada',
    ],
    answer: 'Não ejeta elétrons',
    explanation:
      'Cada fóton precisa ter energia mínima hf; intensidade maior não compensa frequência insuficiente.',
    misconception:
      'Aplicar apenas uma descrição clássica de energia contínua da luz.',
  },
  {
    topic: 'Física moderna',
    prompt:
      'Segundo a relatividade especial, qual grandeza tem o mesmo valor no vácuo para todos os referenciais inerciais?',
    type: 'choice',
    options: [
      'Velocidade da luz',
      'Tempo entre quaisquer eventos',
      'Comprimento de qualquer objeto',
      'Energia cinética',
    ],
    answer: 'Velocidade da luz',
    explanation:
      'A invariância da velocidade da luz no vácuo é um postulado da relatividade especial.',
    misconception: 'Supor que velocidades sempre se somam pela regra clássica.',
  },
];

const read = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function LearningExperience() {
  const [step, setStep] = useState(() => read('einstein-step', 0)),
    [prediction, setPrediction] = useState(() =>
      read('einstein-prediction', ''),
    ),
    [conclusion, setConclusion] = useState(() =>
      read('einstein-conclusion', ''),
    );
  const [force, setForce] = useState(18),
    [mass, setMass] = useState(6),
    [measures, setMeasures] = useState<Measure[]>(() =>
      read('einstein-measures', []),
    ),
    [status, setStatus] = useState('');
  const [qIndex, setQIndex] = useState(0),
    [choice, setChoice] = useState(''),
    [answers, setAnswers] = useState<Record<number, Answer>>(() =>
      read('einstein-quiz', {}),
    ),
    [quizStatus, setQuizStatus] = useState('');
  const acceleration = useMemo(() => force / mass, [force, mass]);
  useEffect(() => {
    localStorage.setItem('einstein-step', JSON.stringify(step));
    localStorage.setItem('einstein-prediction', JSON.stringify(prediction));
    localStorage.setItem('einstein-conclusion', JSON.stringify(conclusion));
    localStorage.setItem('einstein-measures', JSON.stringify(measures));
    localStorage.setItem('einstein-quiz', JSON.stringify(answers));
  }, [step, prediction, conclusion, measures, answers]);
  const current = questions[qIndex],
    answered = answers[qIndex],
    score = Object.values(answers).filter((a) => a.correct).length,
    complete = Object.keys(answers).length === questions.length;
  const confirmAnswer = () => {
    if (!choice.trim()) {
      setQuizStatus('Escolha ou digite uma resposta antes de confirmar.');
      return;
    }
    const correct =
      current.type === 'number'
        ? Math.abs(Number(choice.replace(',', '.')) - Number(current.answer)) <=
          (current.tolerance ?? 0)
        : choice === current.answer;
    setAnswers((a) => ({ ...a, [qIndex]: { value: choice, correct } }));
    setQuizStatus(
      correct
        ? 'Resposta correta. Leia a explicação antes de avançar.'
        : 'Ainda não. Leia o feedback e tente novamente.',
    );
  };
  const retry = () => {
    setAnswers((a) => {
      const n = { ...a };
      delete n[qIndex];
      return n;
    });
    setChoice('');
    setQuizStatus('Tente novamente usando a pista conceitual.');
  };
  const go = (index: number) => {
    setQIndex(index);
    setChoice(answers[index]?.value ?? '');
    setQuizStatus('');
  };
  const register = () => {
    setMeasures((m) => [
      ...m,
      { force, mass, acceleration: Number(acceleration.toFixed(2)) },
    ]);
    setStep((s) => Math.max(s, 2));
    setStatus(
      `Medida registrada: ${force} N, ${mass} kg e ${acceleration.toFixed(2)} m/s².`,
    );
  };
  const clearMeasures = () => {
    if (window.confirm('Limpar apenas as medidas registradas nesta bancada?')) {
      setMeasures([]);
      setStatus('As medidas foram removidas. Sua previsão foi preservada.');
    }
  };
  const restart = () => {
    if (
      window.confirm(
        'Recomeçar o percurso e apagar somente o progresso educacional salvo neste navegador?',
      )
    ) {
      [
        'einstein-step',
        'einstein-prediction',
        'einstein-conclusion',
        'einstein-measures',
        'einstein-quiz',
        'einstein-lab-notes',
      ].forEach((k) => localStorage.removeItem(k));
      window.dispatchEvent(new Event('einstein-reset'));
      setStep(0);
      setPrediction('');
      setConclusion('');
      setMeasures([]);
      setAnswers({});
      setChoice('');
      setQIndex(0);
      setStatus('Percurso reiniciado.');
    }
  };
  return (
    <>
      <section
        id="investigacao"
        className="border-y bg-[#081629] px-5 py-20 lg:px-10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs text-primary">
                INVESTIGAÇÃO GUIADA
              </p>
              <h2 className="mt-3 text-4xl font-black sm:text-6xl">
                Da previsão à evidência.
              </h2>
            </div>
            <Button variant="outline" onClick={restart} className="min-h-11">
              <RotateCcw /> Recomeçar percurso
            </Button>
          </div>
          <ol
            className="mt-8 grid gap-3 md:grid-cols-5"
            aria-label="Etapas da investigação"
          >
            {steps.map((item, i) => (
              <li key={item[0]}>
                <button
                  onClick={() => setStep(i)}
                  aria-current={step === i ? 'step' : undefined}
                  className={`min-h-24 w-full rounded-xl border p-4 text-left ${step === i ? 'border-primary bg-primary text-slate-950' : 'bg-card hover:border-sky-400'}`}
                >
                  <span className="font-mono text-xs">0{i + 1}</span>
                  <b className="mt-2 block">{item[0]}</b>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-2xl border bg-card p-6">
            <p className="font-mono text-xs text-sky-300">
              PASSO {step + 1} DE 5
            </p>
            <h3 className="mt-2 text-2xl font-bold">{steps[step][0]}</h3>
            <p className="mt-2 text-muted-foreground">{steps[step][1]}</p>
            {step === 1 && (
              <label className="mt-5 block font-bold">
                Sua previsão
                <textarea
                  value={prediction}
                  onChange={(e) => setPrediction(e.target.value)}
                  placeholder="Ex.: se eu dobrar a força e mantiver a massa..."
                  className="mt-2 min-h-28 w-full rounded-xl border bg-background p-3 font-normal"
                />
                <Button
                  onClick={() => {
                    if (prediction.trim()) setStep(2);
                  }}
                  className="mt-3 min-h-11 bg-primary text-slate-950"
                >
                  Salvar previsão e coletar <ChevronRight />
                </Button>
              </label>
            )}
            {step === 4 && (
              <label className="mt-5 block font-bold">
                Conclusão apoiada nos dados
                <textarea
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  placeholder="O que os dados permitem concluir? Quais são os limites?"
                  className="mt-2 min-h-28 w-full rounded-xl border bg-background p-3 font-normal"
                />
                <span className="mt-2 block text-sm font-normal text-muted-foreground">
                  Compare sua conclusão com a previsão inicial: “
                  {prediction || 'nenhuma previsão registrada'}”.
                </span>
              </label>
            )}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <article className="rounded-2xl border bg-card p-6">
              <p className="font-mono text-xs text-primary">
                BANCADA • MODELO IDEALIZADO
              </p>
              <h3 className="mt-2 text-3xl font-black">ΣF = m·a</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                O cálculo usa força resultante e massa constante,
                desconsiderando efeitos não modelados, como atrito variável e
                resistência do ar.
              </p>
              <label className="mt-6 block font-mono text-xs">
                FORÇA RESULTANTE{' '}
                <b className="float-right text-primary">{force} N</b>
                <input
                  aria-label="Força da bancada investigativa"
                  type="range"
                  min="0"
                  max="60"
                  value={force}
                  onChange={(e) => setForce(+e.target.value)}
                  className="mt-3 min-h-11 w-full accent-yellow-400"
                />
              </label>
              <label className="mt-4 block font-mono text-xs">
                MASSA <b className="float-right text-sky-300">{mass} kg</b>
                <input
                  aria-label="Massa da bancada investigativa"
                  type="range"
                  min="1"
                  max="15"
                  value={mass}
                  onChange={(e) => setMass(+e.target.value)}
                  className="mt-3 min-h-11 w-full accent-sky-400"
                />
              </label>
              <p className="mt-5 font-mono text-3xl font-bold text-primary">
                {acceleration.toFixed(2)} m/s²
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  onClick={register}
                  className="min-h-11 bg-primary text-slate-950"
                >
                  <Save /> Registrar medida
                </Button>
                <Button
                  disabled={!measures.length}
                  onClick={clearMeasures}
                  variant="outline"
                  className="min-h-11"
                >
                  <Trash2 /> Limpar dados
                </Button>
              </div>
              <p
                aria-live="polite"
                className="mt-3 min-h-6 text-sm text-sky-200"
              >
                {status}
              </p>
            </article>
            <article className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-sky-300" />
                <h3 className="text-2xl font-bold">Caderno de medidas</h3>
              </div>
              {!measures.length ? (
                <div className="mt-8 rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                  <ClipboardList className="mx-auto mb-3" />
                  Nenhuma medida registrada. Varie uma grandeza por vez.
                </div>
              ) : (
                <>
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <caption className="sr-only">
                        Medições de força, massa e aceleração
                      </caption>
                      <thead>
                        <tr className="border-b text-sky-300">
                          <th className="p-3">#</th>
                          <th className="p-3">Força (N)</th>
                          <th className="p-3">Massa (kg)</th>
                          <th className="p-3">Aceleração (m/s²)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {measures.map((m, i) => (
                          <tr
                            key={`${m.force}-${m.mass}-${i}`}
                            className="border-b border-white/10"
                          >
                            <td className="p-3">{i + 1}</td>
                            <td className="p-3">{m.force}</td>
                            <td className="p-3">{m.mass}</td>
                            <td className="p-3">{m.acceleration.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="mt-6 space-y-2"
                    aria-label="Gráfico de acelerações registradas"
                  >
                    {measures.map((m, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[2rem_1fr_5rem] items-center gap-2 text-xs"
                      >
                        <span>{i + 1}</span>
                        <span className="h-5 rounded bg-sky-950">
                          <i
                            className="block h-full rounded bg-primary"
                            style={{
                              width: `${Math.min((m.acceleration / 60) * 100, 100)}%`,
                            }}
                          />
                        </span>
                        <span>{m.acceleration.toFixed(2)} m/s²</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setStep(3)}
                    variant="outline"
                    className="mt-6 min-h-11"
                  >
                    Interpretar o modelo <ChevronRight />
                  </Button>
                </>
              )}
            </article>
          </div>
        </div>
      </section>

      <section id="desafios" className="px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-xs text-primary">DESAFIOS DE FÍSICA</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
            <h2 className="text-4xl font-black sm:text-6xl">
              Teste, explique, tente de novo.
            </h2>
            <div className="rounded-full border px-4 py-2 font-mono text-sm">
              {score} acertos • {Object.keys(answers).length}/{questions.length}{' '}
              respondidas
            </div>
          </div>
          <div
            className="mt-8 h-2 overflow-hidden rounded-full bg-muted"
            aria-label={`Progresso: ${Object.keys(answers).length} de ${questions.length}`}
          >
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${(Object.keys(answers).length / questions.length) * 100}%`,
              }}
            />
          </div>
          {complete ? (
            <div className="mt-8 rounded-3xl border bg-card p-8 text-center">
              <Check className="mx-auto size-12 text-primary" />
              <h3 className="mt-4 text-3xl font-black">Desafio concluído</h3>
              <p className="mt-3 text-muted-foreground">
                Você acertou {score} de {questions.length}. Revise as
                explicações: compreender o raciocínio importa mais que decorar a
                alternativa.
              </p>
              <Button
                onClick={() => {
                  setAnswers({});
                  setChoice('');
                  setQIndex(0);
                  setQuizStatus('Quiz reiniciado.');
                }}
                className="mt-6 min-h-11 bg-primary text-slate-950"
              >
                <RotateCcw /> Refazer quiz
              </Button>
            </div>
          ) : (
            <article className="mt-8 rounded-3xl border bg-card p-6 sm:p-8">
              <div className="flex flex-wrap justify-between gap-3">
                <span className="font-mono text-xs text-sky-300">
                  QUESTÃO {qIndex + 1} • {current.topic}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {current.type === 'number'
                    ? 'RESPOSTA NUMÉRICA'
                    : 'MÚLTIPLA ESCOLHA'}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-bold leading-9">
                {current.prompt}
              </h3>
              {current.type === 'choice' ? (
                <fieldset disabled={!!answered} className="mt-6 grid gap-3">
                  <legend className="sr-only">Escolha uma alternativa</legend>
                  {current.options!.map((option) => (
                    <label
                      key={option}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border p-3 ${choice === option ? 'border-primary' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`q-${qIndex}`}
                        value={option}
                        checked={choice === option}
                        onChange={() => setChoice(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>
              ) : (
                <label className="mt-6 block font-bold">
                  Sua resposta{' '}
                  <span className="font-normal text-muted-foreground">
                    ({current.unit})
                  </span>
                  <input
                    disabled={!!answered}
                    inputMode="decimal"
                    value={choice}
                    onChange={(e) => setChoice(e.target.value)}
                    className="mt-2 min-h-12 w-full rounded-xl border bg-background px-4 font-normal"
                    placeholder="Digite apenas o valor numérico"
                  />
                </label>
              )}
              {!answered ? (
                <Button
                  onClick={confirmAnswer}
                  className="mt-6 min-h-11 bg-primary text-slate-950"
                >
                  Confirmar resposta
                </Button>
              ) : (
                <div
                  className={`mt-6 rounded-xl border p-5 ${answered.correct ? 'border-emerald-400/50' : 'border-amber-300/50'}`}
                >
                  <p className="flex items-center gap-2 font-bold">
                    {answered.correct ? (
                      <>
                        <Check /> Correto
                      </>
                    ) : (
                      <>
                        <X /> Ainda não
                      </>
                    )}
                  </p>
                  <p className="mt-3 leading-7">{current.explanation}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <b>Erro conceitual comum:</b> {current.misconception}
                  </p>
                  {!answered.correct && (
                    <Button
                      onClick={retry}
                      variant="outline"
                      className="mt-4 min-h-11"
                    >
                      Tentar novamente
                    </Button>
                  )}
                </div>
              )}
              <p
                aria-live="polite"
                className="mt-4 min-h-6 text-sm text-sky-200"
              >
                {quizStatus}
              </p>
              <div className="mt-5 flex flex-wrap justify-between gap-3">
                <Button
                  disabled={qIndex === 0}
                  onClick={() => go(qIndex - 1)}
                  variant="outline"
                  className="min-h-11"
                >
                  <ChevronLeft /> Anterior
                </Button>
                <Button
                  disabled={!answered || qIndex === questions.length - 1}
                  onClick={() => go(qIndex + 1)}
                  variant="outline"
                  className="min-h-11"
                >
                  Próxima <ChevronRight />
                </Button>
              </div>
            </article>
          )}
        </div>
      </section>
    </>
  );
}
