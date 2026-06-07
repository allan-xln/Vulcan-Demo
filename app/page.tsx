"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  CheckCircle2,
  MessageCircle,
  Play,
  RefreshCcw,
  ShieldCheck,
  SkipForward,
  Sparkles,
  Zap
} from "lucide-react";
import { agentGrid, hierarchy, insights, metrics, pages, timeline, tourSteps, valuePillars } from "@/data/demo";
import { cn } from "@/lib/format";

const contactWhatsApp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "5541984166423";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [tourActive, setTourActive] = useState(true);
  const step = tourSteps[currentStep];
  const activeTarget = tourActive ? step.target : "";
  const progress = Math.round(((currentStep + 1) / tourSteps.length) * 100);

  const nextStep = () => setCurrentStep((value) => Math.min(tourSteps.length - 1, value + 1));
  const previousStep = () => setCurrentStep((value) => Math.max(0, value - 1));
  const restartTour = () => {
    setCurrentStep(0);
    setTourActive(true);
  };

  const ctaHref = useMemo(() => `https://wa.me/${contactWhatsApp}?text=${encodeURIComponent("Quero conhecer o Vulcan e agendar uma demonstração.")}`, []);

  return (
    <main className="min-h-screen overflow-hidden bg-vulcan-ink text-zinc-100">
      <AnimatedBackdrop />
      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1800px] flex-col px-4 py-4 md:px-6">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-orange-400/15 bg-black/45 px-4 py-3 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/vulcan-logo.svg" alt="Vulcan" width={54} height={54} className="h-12 w-12" priority />
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-orange-300">Vulcan Demo</p>
              <p className="text-sm text-zinc-400">Tour comercial interativo</p>
            </div>
          </Link>
          <nav className="flex flex-wrap gap-2">
            {pages.slice(0, 6).map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="border border-zinc-800 bg-black/35 px-3 py-2 text-xs text-zinc-300 transition hover:border-orange-400/45 hover:text-orange-200"
              >
                {page.title}
              </Link>
            ))}
          </nav>
        </header>

        <div className="grid flex-1 gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.section
            id="hero"
            className={cn("relative overflow-hidden border border-zinc-800 bg-zinc-950/70 p-5 md:p-8", activeTarget === "hero" && "focus-ring")}
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
          >
            <ScanLine />
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 border border-orange-400/20 bg-orange-950/15 px-4 py-2 text-sm text-orange-100">
                <Sparkles className="h-4 w-4" />
                Vulcan — Transformando operações em inteligência
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                Uma central viva para entender gargalos, produtividade e automação.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
                Esta demo mostra como o Vulcan transforma dados operacionais simulados em métricas, insights, alertas e decisões para gestores.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={restartTour}
                  className="inline-flex h-12 items-center gap-2 bg-orange-500 px-5 font-semibold text-black transition hover:bg-orange-400"
                >
                  <Play className="h-4 w-4" />
                  Iniciar tour guiado
                </button>
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 border border-orange-400/25 bg-black/45 px-5 text-orange-100 transition hover:border-orange-300/60"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar pelo WhatsApp
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {valuePillars.map((pillar, index) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.article
                      key={pillar.title}
                      className="border border-orange-400/15 bg-black/35 p-4"
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + index * 0.08 }}
                    >
                      <Icon className="mb-4 h-5 w-5 text-orange-300" />
                      <h3 className="font-semibold">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">{pillar.description}</p>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.section>

          <section className="grid gap-4">
            <StatusPanel activeTarget={activeTarget} />
            <TourPanel
              active={tourActive}
              progress={progress}
              currentStep={currentStep}
              totalSteps={tourSteps.length}
              onNext={nextStep}
              onPrevious={previousStep}
              onSkip={() => setTourActive(false)}
              onRestart={restartTour}
            />
          </section>
        </div>

        <section id="metricas" className={cn("mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4", activeTarget === "metricas" && "focus-ring")}>
          {metrics.map((metric, index) => (
            <KpiCard key={metric.label} metric={metric} index={index} />
          ))}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <OperationalMap activeTarget={activeTarget} />
          <AgentPanel activeTarget={activeTarget} />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-3">
          <InsightsPanel activeTarget={activeTarget} />
          <HierarchyPanel activeTarget={activeTarget} />
          <NotificationsPanel activeTarget={activeTarget} />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <PrivacyPanel activeTarget={activeTarget} />
          <AutomationPanel activeTarget={activeTarget} />
        </section>

        <section id="cta" className={cn("my-4 border border-orange-400/20 bg-orange-950/10 p-6 md:p-8", activeTarget === "cta" && "focus-ring")}>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-orange-300">Resumo final</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Mostre o Vulcan em uma reunião sem precisar explicar tudo do zero.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
                O cliente entra, faz o tour, entende agentes, métricas, IA, hierarquia, privacidade e notificações. Depois disso, a conversa vira diagnóstico operacional.
              </p>
            </div>
            <a href={ctaHref} target="_blank" rel="noreferrer" className="inline-flex h-14 items-center justify-center gap-3 bg-orange-500 px-6 font-semibold text-black transition hover:bg-orange-400">
              <MessageCircle className="h-5 w-5" />
              Agendar conversa
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}

function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="vulcan-grid absolute inset-0 opacity-30"
        animate={{ x: [-24, 24, -24], y: [-12, 12, -12] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(110deg,transparent,rgba(255,107,22,0.08),transparent)] blur-xl"
        animate={{ x: ["-35%", "35%", "-35%"], opacity: [0.18, 0.38, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,107,22,0.035),transparent)]"
        animate={{ x: ["-110%", "110%"], opacity: [0, 0.45, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function StatusPanel({ activeTarget }: { activeTarget: string }) {
  return (
    <motion.div
      id="tempo-real"
      className={cn("relative overflow-hidden border border-emerald-400/20 bg-emerald-950/10 p-5", activeTarget === "tempo-real" && "focus-ring")}
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ScanLine />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-200">Tempo real ativo</p>
          <h2 className="mt-3 text-3xl font-semibold">38 agentes sincronizando</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">Última atualização: agora. Ambiente demonstrativo com dados simulados realistas.</p>
        </div>
        <motion.span
          className="mt-1 h-4 w-4 rounded-full bg-emerald-400"
          animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.18, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

function TourPanel({
  active,
  progress,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onRestart
}: {
  active: boolean;
  progress: number;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onRestart: () => void;
}) {
  const step = tourSteps[currentStep];
  const Icon = step.icon;
  return (
    <motion.aside
      id="tour"
      className="relative overflow-hidden border border-orange-400/20 bg-zinc-950/86 p-5 shadow-vulcan backdrop-blur-xl"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
    >
      <ScanLine />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center bg-orange-500 text-black">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-orange-300">Passo {currentStep + 1} de {totalSteps}</p>
              <h2 className="mt-1 text-2xl font-semibold">{active ? step.title : "Tour pausado"}</h2>
            </div>
          </div>
          <button type="button" onClick={onRestart} className="grid h-10 w-10 place-items-center border border-zinc-800 text-zinc-300 transition hover:border-orange-400/50" title="Reiniciar tour">
            <RefreshCcw className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-5 min-h-16 text-sm leading-7 text-zinc-300">
          {active ? step.body : "Clique em reiniciar para ver novamente o onboarding premium do Vulcan."}
        </p>
        <div className="mt-5 h-2 bg-zinc-900">
          <motion.div className="h-full bg-gradient-to-r from-orange-700 via-orange-400 to-yellow-300" animate={{ width: `${active ? progress : 0}%` }} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={onPrevious} className="inline-flex h-11 items-center gap-2 border border-zinc-800 px-4 text-sm text-zinc-200 transition hover:border-orange-400/50" disabled={currentStep === 0}>
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <button type="button" onClick={currentStep === totalSteps - 1 ? onSkip : onNext} className="inline-flex h-11 items-center gap-2 bg-orange-500 px-4 text-sm font-semibold text-black transition hover:bg-orange-400">
            {currentStep === totalSteps - 1 ? "Entendi" : "Próximo"}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={onSkip} className="inline-flex h-11 items-center gap-2 border border-zinc-800 px-4 text-sm text-zinc-400 transition hover:border-orange-400/50 hover:text-orange-200">
            <SkipForward className="h-4 w-4" />
            Pular tour
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

function KpiCard({ metric, index }: { metric: (typeof metrics)[number]; index: number }) {
  return (
    <motion.article
      className="relative overflow-hidden border border-orange-400/15 bg-zinc-950/72 p-5"
      initial={{ y: 26, opacity: 0 }}
      animate={{ y: [0, -2, 0], opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 3.4, repeat: Infinity, repeatDelay: 2 }}
    >
      <ScanLine />
      <p className="relative z-10 text-sm text-zinc-500">{metric.label}</p>
      <motion.p className="relative z-10 mt-3 text-4xl font-semibold text-zinc-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {metric.value}
      </motion.p>
      <p className="relative z-10 mt-3 text-sm text-orange-300">{metric.detail}</p>
    </motion.article>
  );
}

function OperationalMap({ activeTarget }: { activeTarget: string }) {
  return (
    <Panel id="gargalos" active={activeTarget === "gargalos"} title="Mapa operacional e gargalos" icon={<Zap className="h-5 w-5" />}>
      <div className="grid gap-3 md:grid-cols-5">
        {timeline.map((point, index) => (
          <motion.div
            key={point.hour}
            className="min-h-28 border border-zinc-800 p-3"
            style={{ backgroundColor: `rgba(255,107,22,${0.08 + point.active / 280})` }}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            <p className="font-semibold">{point.hour}</p>
            <p className="mt-3 text-sm text-zinc-300">{point.active}% ativo</p>
            <p className="text-xs text-zinc-500">{point.idle}% ocioso</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function AgentPanel({ activeTarget }: { activeTarget: string }) {
  return (
    <Panel id="agentes" active={activeTarget === "agentes"} title="Agentes conectados" icon={<CheckCircle2 className="h-5 w-5" />}>
      <div className="grid gap-3">
        {agentGrid.map((agent, index) => (
          <motion.div key={agent.name} className="border border-zinc-800 bg-black/35 p-4" initial={{ x: 18, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.05 }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{agent.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{agent.owner} | {agent.os} | qualidade {agent.quality}</p>
              </div>
              <span className={cn("text-xs uppercase tracking-[0.18em]", agent.status === "offline" ? "text-orange-300" : "text-emerald-300")}>{agent.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function InsightsPanel({ activeTarget }: { activeTarget: string }) {
  return (
    <Panel id="insights" active={activeTarget === "insights"} title="Insights de IA" icon={<Sparkles className="h-5 w-5" />}>
      <div className="grid gap-3">
        {insights.map((insight, index) => (
          <motion.article key={insight.title} className="border border-zinc-800 bg-black/35 p-4" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.06 }}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{insight.title}</h3>
              <span className="border border-orange-400/25 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-orange-300">{insight.impact}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{insight.body}</p>
            <p className="mt-3 text-sm text-orange-200">{insight.action}</p>
          </motion.article>
        ))}
      </div>
    </Panel>
  );
}

function HierarchyPanel({ activeTarget }: { activeTarget: string }) {
  return (
    <Panel id="hierarquia" active={activeTarget === "hierarquia"} title="Hierarquia de permissões" icon={<ShieldCheck className="h-5 w-5" />}>
      <div className="grid gap-3">
        {hierarchy.map((item, index) => (
          <motion.div key={item.role} className="border border-zinc-800 bg-black/35 p-4" style={{ marginLeft: `${index * 10}px` }} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.06 }}>
            <div className="flex justify-between gap-3">
              <p className="font-semibold">{item.role}</p>
              <span className="text-orange-300">{item.people}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{item.scope}</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function NotificationsPanel({ activeTarget }: { activeTarget: string }) {
  return (
    <Panel id="notificacoes" active={activeTarget === "whatsapp" || activeTarget === "email"} title="Notificações inteligentes" icon={<BellRing className="h-5 w-5" />}>
      <div className="grid gap-3">
        <NotificationCard id="whatsapp" active={activeTarget === "whatsapp"} title="WhatsApp" text="Alertas críticos, insights e relatórios pelo Canal Oficial Vulcan." />
        <NotificationCard id="email" active={activeTarget === "email"} title="E-mail" text="Resumo diário, semanal e mensal por SMTP, Gmail ou Outlook." />
        <NotificationCard id="windows" active={false} title="Agente Windows" text="Avisos locais quando um gargalo ou falha de sync exigir ação." />
      </div>
    </Panel>
  );
}

function NotificationCard({ id, active, title, text }: { id: string; active: boolean; title: string; text: string }) {
  return (
    <div id={id} className={cn("border border-zinc-800 bg-black/35 p-4", active && "focus-ring")}>
      <p className="font-semibold text-orange-100">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
    </div>
  );
}

function PrivacyPanel({ activeTarget }: { activeTarget: string }) {
  return (
    <Panel id="privacidade" active={activeTarget === "privacidade"} title="Segurança e privacidade" icon={<ShieldCheck className="h-5 w-5" />}>
      <div className="grid gap-3 sm:grid-cols-2">
        {["Não coleta senhas", "Não registra teclas", "Não lê conversas", "Não grava webcam ou áudio", "Não captura clipboard irrestrito", "Políticas por tenant"].map((item) => (
          <div key={item} className="flex items-center gap-3 border border-zinc-800 bg-black/35 p-4 text-sm text-zinc-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            {item}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AutomationPanel({ activeTarget }: { activeTarget: string }) {
  return (
    <Panel id="automacao" active={activeTarget === "automacao"} title="Oportunidades de automação" icon={<Zap className="h-5 w-5" />}>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["74h", "economia mensal estimada"],
          ["R$ 8.900", "potencial operacional"],
          ["18", "automações priorizadas"]
        ].map(([value, label], index) => (
          <motion.div key={label} className="border border-orange-400/15 bg-orange-950/10 p-5" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.08 }}>
            <p className="text-4xl font-semibold text-orange-200">{value}</p>
            <p className="mt-3 text-sm text-zinc-500">{label}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-7 text-zinc-400">
        A demo mostra como o Vulcan transforma tarefas repetitivas e troca de contexto em uma fila clara de automações para gestores.
      </p>
    </Panel>
  );
}

function Panel({ id, active, title, icon, children }: { id: string; active: boolean; title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <motion.section id={id} className={cn("relative overflow-hidden border border-zinc-800 bg-zinc-950/74 p-5", active && "focus-ring")} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
      <ScanLine />
      <div className="relative z-10 mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center bg-orange-500 text-black">{icon}</div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"
      animate={{ x: ["-100%", "100%"], opacity: [0, 0.8, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
