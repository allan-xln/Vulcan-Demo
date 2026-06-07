"use client";

import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BellRing,
  Brain,
  Command,
  DatabaseZap,
  Flame,
  Gauge,
  Layers3,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  Network,
  RadioTower,
  RefreshCcw,
  ShieldCheck,
  UserRound,
  X
} from "lucide-react";
import { agentGrid, hierarchy, insights, metrics, timeline, tourSteps } from "@/data/demo";
import { cn } from "@/lib/format";

type ViewKey = "dashboard" | "hierarchy" | "metrics" | "insights" | "notifications" | "settings";

const commands: { key: ViewKey; label: string; icon: typeof Gauge; summary: string }[] = [
  { key: "dashboard", label: "Comando", icon: Gauge, summary: "Pulso executivo, agentes, IA e saúde operacional." },
  { key: "hierarchy", label: "Hierarquia", icon: Network, summary: "Permissões por árvore organizacional." },
  { key: "metrics", label: "Métricas", icon: Activity, summary: "Tempo ativo, ociosidade, apps e foco." },
  { key: "insights", label: "Insights", icon: Brain, summary: "Recomendações executivas simuladas por IA." },
  { key: "notifications", label: "Notificações", icon: BellRing, summary: "WhatsApp, e-mail e agente local." },
  { key: "settings", label: "Configurações", icon: Layers3, summary: "IA, integrações, segurança e tenant." }
];

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");
  const [commandOpen, setCommandOpen] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const step = tourSteps[currentStep];
  const activeTarget = tourActive ? step.target : "";
  const currentCommand = commands.find((item) => item.key === activeView) ?? commands[0];
  const progress = Math.round(((currentStep + 1) / tourSteps.length) * 100);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoggedIn(true);
    setTourActive(true);
    setCurrentStep(0);
  }

  function nextStep() {
    if (currentStep === tourSteps.length - 1) {
      setTourActive(false);
      return;
    }
    setCurrentStep((value) => value + 1);
  }

  function previousStep() {
    setCurrentStep((value) => Math.max(0, value - 1));
  }

  function restartTour() {
    setCurrentStep(0);
    setTourActive(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-vulcan-ink text-zinc-100">
      <AnimatedAtmosphere />
      <AnimatePresence mode="wait">
        {!loggedIn ? (
          <LoginExperience key="login" onLogin={handleLogin} />
        ) : (
          <motion.section key="portal" className="relative z-10 min-h-screen px-4 py-4 md:px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mx-auto min-h-[calc(100vh-2rem)] w-full max-w-[1920px]">
              <Header
                activeView={activeView}
                currentCommand={currentCommand}
                onOpenCommand={() => setCommandOpen(true)}
                onLogout={() => setLoggedIn(false)}
                activeTarget={activeTarget}
              />

              <AnimatePresence mode="wait">
                {activeView === "dashboard" && <DashboardView key="dashboard" activeTarget={activeTarget} />}
                {activeView === "hierarchy" && <HierarchyView key="hierarchy" activeTarget={activeTarget} />}
                {activeView === "metrics" && <MetricsView key="metrics" activeTarget={activeTarget} />}
                {activeView === "insights" && <InsightsView key="insights" activeTarget={activeTarget} />}
                {activeView === "notifications" && <NotificationsView key="notifications" activeTarget={activeTarget} />}
                {activeView === "settings" && <SettingsView key="settings" activeTarget={activeTarget} />}
              </AnimatePresence>
            </div>

            <CommandOverlay
              open={commandOpen}
              activeView={activeView}
              setView={(view) => {
                setActiveView(view);
                setCommandOpen(false);
              }}
              onClose={() => setCommandOpen(false)}
            />

            <TourBubble
              active={tourActive}
              step={step}
              currentStep={currentStep}
              totalSteps={tourSteps.length}
              progress={progress}
              onNext={nextStep}
              onPrevious={previousStep}
              onRestart={restartTour}
              onSkip={() => setTourActive(false)}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function LoginExperience({ onLogin }: { onLogin: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <motion.section className="relative z-10 grid min-h-screen place-items-center px-6 py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ x: -70, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="mb-8 flex items-center gap-4">
            <BrandMark size={76} />
            <div>
              <p className="text-sm uppercase tracking-[0.48em] text-orange-300">Vulcan</p>
              <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">Central de inteligência operacional</h1>
            </div>
          </div>
          <p className="max-w-2xl text-xl leading-9 text-zinc-300">
            Transformando operações em inteligência com agentes, métricas, hierarquia, IA e notificações executivas.
          </p>
          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              ["12.840", "eventos hoje"],
              ["27", "gargalos detectados"],
              ["74h", "economia mensal"]
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                className="border border-orange-400/20 bg-zinc-950/70 p-5 shadow-[0_0_24px_rgba(249,115,22,0.08)] backdrop-blur"
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: [0, -5, 0], opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.12, duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-3xl font-semibold text-orange-300">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-zinc-500">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={onLogin}
          className="relative overflow-visible border border-orange-400/20 bg-zinc-950/85 p-8 shadow-[0_0_42px_rgba(249,115,22,0.10)] backdrop-blur-md"
          initial={{ x: 70, opacity: 0, scale: 0.96 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <ScanLine />
          <div className="relative">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-400/30 px-4 py-2 text-sm text-orange-200">
              <Lock className="h-4 w-4" />
              Acesso demonstrativo
            </div>
            <h2 className="text-3xl font-semibold">Entrar no Vulcan</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Login falso para apresentação. Nenhuma credencial real é usada nesta demo.
            </p>
            <div className="mt-8 grid gap-4">
              <input
                name="username"
                defaultValue="demo@vulcan.local"
                className="h-14 border border-zinc-800 bg-black/70 px-5 text-zinc-100 outline-none transition focus:border-orange-400 focus:shadow-[0_0_16px_rgba(249,115,22,0.12)]"
                placeholder="E-mail ou usuário"
              />
              <input
                name="password"
                type="password"
                defaultValue="demo"
                className="h-14 border border-zinc-800 bg-black/70 px-5 text-zinc-100 outline-none transition focus:border-orange-400 focus:shadow-[0_0_16px_rgba(249,115,22,0.12)]"
                placeholder="Senha"
              />
            </div>
            <div className="relative mt-8">
              <motion.div
                className="absolute -top-20 left-1/2 z-20 w-72 -translate-x-1/2 border border-orange-400/40 bg-black px-4 py-3 text-sm text-orange-100 shadow-[0_0_26px_rgba(249,115,22,0.16)]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                acesse o portal e inicie o tour
                <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-orange-400/40 bg-black" />
              </motion.div>
              <motion.button
                id="entrar"
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-3 bg-orange-500 font-semibold text-black shadow-[0_0_22px_rgba(249,115,22,0.20)]"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
              >
                Entrar na central
                <Flame className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
}

function Header({
  activeView,
  currentCommand,
  onOpenCommand,
  onLogout,
  activeTarget
}: {
  activeView: ViewKey;
  currentCommand: { key: ViewKey; label: string; icon: typeof Gauge; summary: string };
  onOpenCommand: () => void;
  onLogout: () => void;
  activeTarget: string;
}) {
  return (
    <motion.header
      id="command-center"
      className={cn("relative mb-4 grid gap-4 overflow-visible border border-zinc-800 bg-zinc-950/65 p-4 backdrop-blur-xl lg:grid-cols-[1fr_auto]", activeTarget === "command-center" && "focus-ring")}
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <ScanLine />
      <div className="flex min-w-0 gap-4">
        <div className="hidden h-16 w-16 shrink-0 place-items-center border border-orange-400/25 bg-black/60 md:grid">
          <BrandMark size={42} />
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.36em] text-orange-300">Central de Inteligência Operacional</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">Transformando operações em inteligência.</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <LiveBadge label="Tempo real ativo" detail="Última sincronização: agora" />
            <LiveBadge label="38 agentes online" detail="Atualizando métricas operacionais" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-start gap-3 lg:justify-end">
        <motion.button
          id="command-button"
          type="button"
          onClick={onOpenCommand}
          className={cn(
            "flex h-12 items-center gap-3 border border-orange-400/35 bg-orange-500 px-4 font-semibold text-black shadow-[0_0_18px_rgba(249,115,22,0.14)] transition hover:bg-orange-400",
            activeTarget === "command-button" && "focus-ring"
          )}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Command className="h-4 w-4" />
          {currentCommand.label}
        </motion.button>
        <StatusPill icon={ShieldCheck} label="empresa isolada" />
        <StatusPill icon={Brain} label="7 alto impacto" />
        <StatusPill icon={DatabaseZap} label="dados simulados" />
        <StatusPill icon={UserRound} label={`demo: ${activeView}`} />
        <motion.button
          type="button"
          onClick={onLogout}
          className="grid h-12 w-12 place-items-center border border-zinc-800 bg-black/50 text-zinc-400 transition hover:border-orange-400/60 hover:text-orange-200"
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Sair"
          title="Sair"
        >
          <LogOut className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.header>
  );
}

function DashboardView({ activeTarget }: { activeTarget: string }) {
  return (
    <ViewFrame>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <LiveBadge label="Tempo real ativo" detail="38 agentes sincronizando | última atualização agora" />
        <span className="border border-orange-400/25 bg-orange-950/15 px-3 py-2 text-xs uppercase tracking-[0.2em] text-orange-200">Ambiente demonstrativo</span>
      </div>

      <section id="metricas" className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-4", activeTarget === "metricas" && "focus-ring")}>
        {metrics.map((metric, index) => (
          <MetricTile key={metric.label} metric={metric} index={index} />
        ))}
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel id="tempo-real" active={activeTarget === "tempo-real"} title="Pulso executivo da operação" icon={Command}>
          <div className="grid gap-4">
            <div className="border border-orange-400/20 bg-black/45 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-orange-300">O que está acontecendo agora</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-50">ERP, WhatsApp Web e planilhas concentram o fluxo da operação.</p>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                A demo simula 316 horas analisadas, 12.840 eventos e recomendações executivas para reduzir retrabalho.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <ConnectionSummary label="Produtivo" value="272h" tone="ok" />
              <ConnectionSummary label="Ocioso" value="44h" tone="warn" />
              <ConnectionSummary label="Trocas/hora" value="18,4/h" tone="ok" />
            </div>
          </div>
        </Panel>

        <Panel id="gargalos" active={activeTarget === "gargalos"} title="Fluxo operacional" icon={Activity}>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
            {timeline.map((point, index) => (
              <motion.div
                key={point.hour}
                className="min-h-24 border border-zinc-800 p-3"
                style={{ backgroundColor: `rgba(249,115,22,${0.08 + point.active / 280})` }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
              >
                <p className="font-semibold">{point.hour}</p>
                <p className="mt-2 text-sm text-zinc-300">{point.active}% ativo</p>
                <p className="text-xs text-zinc-500">{point.idle}% ocioso</p>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <AgentPanel active={activeTarget === "agentes"} />
        <InsightsView activeTarget={activeTarget} compact />
        <NotificationsPanel active={activeTarget === "notificacoes" || activeTarget === "whatsapp" || activeTarget === "email"} compact />
      </div>
    </ViewFrame>
  );
}

function MetricsView({ activeTarget }: { activeTarget: string }) {
  return (
    <ViewFrame>
      <Panel id="metricas" active={activeTarget === "metricas"} title="Métricas profundas" icon={Gauge}>
        <div className="grid gap-4 md:grid-cols-4">
          <ConnectionSummary label="Tempo ativo" value="272h" tone="ok" />
          <ConnectionSummary label="Tempo ocioso" value="44h" tone="warn" />
          <ConnectionSummary label="Foco operacional" value="86%" tone="ok" />
          <ConnectionSummary label="Fragmentação" value="21% menor" tone="ok" />
        </div>
        <div className="mt-5 grid gap-3">
          {["ERP Billing", "WhatsApp Web", "Excel", "Outlook", "Sistema interno"].map((app, index) => (
            <BarRow key={app} label={app} value={86 - index * 11} />
          ))}
        </div>
      </Panel>
    </ViewFrame>
  );
}

function HierarchyView({ activeTarget }: { activeTarget: string }) {
  return (
    <ViewFrame>
      <Panel id="hierarquia" active={activeTarget === "hierarquia"} title="Organograma de autoridade" icon={Network}>
        <div className="grid gap-3">
          {hierarchy.map((item, index) => (
            <motion.div
              key={item.role}
              className="border border-zinc-800 bg-black/45 p-4"
              style={{ marginLeft: `${Math.min(index, 5) * 22}px` }}
              initial={{ x: -18, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{item.role}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.scope}</p>
                </div>
                <span className="text-3xl font-semibold text-orange-300">{item.people}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Panel>
    </ViewFrame>
  );
}

function InsightsView({ activeTarget, compact = false }: { activeTarget: string; compact?: boolean }) {
  return (
    <ViewFrame compact={compact}>
      <Panel id="insights" active={activeTarget === "insights"} title="Fluxo de insights de IA" icon={Brain}>
        <div className="grid gap-4">
          {insights.map((insight, index) => (
            <motion.article
              key={insight.title}
              className="border border-orange-400/15 bg-black/45 p-5 transition hover:border-orange-300/50 hover:shadow-[0_0_24px_rgba(249,115,22,0.08)]"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{insight.title}</h3>
                <span className="border border-orange-400/25 px-3 py-1 text-xs uppercase tracking-[0.18em] text-orange-300">{insight.impact}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{insight.body}</p>
              <p className="mt-4 text-sm leading-6 text-zinc-200">{insight.action}</p>
            </motion.article>
          ))}
        </div>
      </Panel>
    </ViewFrame>
  );
}

function NotificationsView({ activeTarget, compact = false }: { activeTarget: string; compact?: boolean }) {
  return (
    <ViewFrame compact={compact}>
      <NotificationsPanel active={activeTarget === "notificacoes" || activeTarget === "whatsapp" || activeTarget === "email"} compact={false} />
    </ViewFrame>
  );
}

function SettingsView({ activeTarget }: { activeTarget: string }) {
  return (
    <ViewFrame>
      <Panel id="privacidade" active={activeTarget === "privacidade"} title="Configurações guiadas" icon={ShieldCheck}>
        <div className="grid gap-4 md:grid-cols-3">
          <ConnectionSummary label="Supabase" value="simulado" tone="ok" />
          <ConnectionSummary label="IA híbrida" value="preparada" tone="ok" />
          <ConnectionSummary label="Privacidade" value="LGPD-friendly" tone="ok" />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {["Empresa", "Usuários e hierarquia", "Agentes", "WhatsApp", "E-mail", "Segurança"].map((item) => (
            <div key={item} className="border border-zinc-800 bg-black/35 p-4">
              <p className="font-semibold text-zinc-100">{item}</p>
              <p className="mt-2 text-sm text-zinc-500">Seção demonstrativa configurável sem credenciais reais.</p>
            </div>
          ))}
        </div>
      </Panel>
    </ViewFrame>
  );
}

function AgentPanel({ active }: { active: boolean }) {
  return (
    <Panel id="agentes" active={active} title="Agentes conectados em tempo real" icon={RadioTower}>
      <div className="space-y-3">
        {agentGrid.map((device, index) => (
          <motion.div key={device.name} className="border border-zinc-800 bg-black/45 p-4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.06 }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-zinc-100">{device.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{device.owner} | {device.os}</p>
                <p className="mt-1 text-xs text-zinc-600">Qualidade de coleta: {device.quality}</p>
              </div>
              <span className={cn("text-xs uppercase tracking-[0.18em]", device.status === "offline" ? "text-orange-300" : "text-emerald-300")}>{device.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function NotificationsPanel({ active, compact = true }: { active: boolean; compact?: boolean }) {
  const channels: Array<{ label: string; description: string; icon: typeof BellRing }> = [
    { label: "WhatsApp", description: "Alertas e relatórios pelo Canal Oficial Vulcan.", icon: MessageCircle },
    { label: "E-mail", description: "Resumos executivos diários, semanais e mensais.", icon: Mail },
    { label: "Windows/agente", description: "Avisos locais quando houver falha ou gargalo.", icon: BellRing }
  ];

  return (
    <Panel id="notificacoes" active={active} title="Canais de notificação" icon={BellRing}>
      <div className={cn("grid gap-3", !compact && "md:grid-cols-3")}>
        {channels.map((channel) => {
          const IconComponent = channel.icon;
          return (
            <div key={channel.label} className="border border-zinc-800 bg-black/35 p-4">
              <IconComponent className="mb-3 h-5 w-5 text-orange-300" />
              <p className="font-semibold text-zinc-100">{channel.label}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{channel.description}</p>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function CommandOverlay({
  open,
  activeView,
  setView,
  onClose
}: {
  open: boolean;
  activeView: ViewKey;
  setView: (view: ViewKey) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 bg-black/78 p-4 backdrop-blur-xl md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="mx-auto flex h-full max-w-6xl flex-col border border-orange-400/20 bg-zinc-950/88 p-4 shadow-[0_0_48px_rgba(249,115,22,0.10)] md:p-6"
            initial={{ scale: 0.96, y: 20, filter: "blur(10px)" }}
            animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ scale: 0.98, y: 18, filter: "blur(8px)" }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <BrandMark size={48} />
                <div>
                  <p className="text-xs uppercase tracking-[0.34em] text-orange-300">Camada de comando Vulcan</p>
                  <h3 className="mt-2 text-2xl font-semibold md:text-4xl">Visões operacionais</h3>
                </div>
              </div>
              <button type="button" onClick={onClose} className="grid h-12 w-12 shrink-0 place-items-center border border-zinc-800 bg-black/60 text-zinc-300 transition hover:border-orange-400/60 hover:text-orange-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid flex-1 auto-rows-fr gap-3 overflow-y-auto md:grid-cols-2 xl:grid-cols-3">
              {commands.map((command, index) => {
                const Icon = command.icon;
                const active = activeView === command.key;
                return (
                  <motion.button
                    key={command.key}
                    type="button"
                    onClick={() => setView(command.key)}
                    className={cn("group relative min-h-40 overflow-hidden border p-5 text-left transition", active ? "border-orange-300 bg-orange-500 text-black" : "border-zinc-800 bg-black/48 text-zinc-100 hover:border-orange-400/60")}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.045 }}
                  >
                    <div className={cn("mb-8 grid h-12 w-12 place-items-center", active ? "bg-black text-orange-300" : "bg-orange-500 text-black")}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-xl font-semibold">{command.label}</p>
                    <p className={cn("mt-3 text-sm leading-6", active ? "text-black/70" : "text-zinc-500")}>{command.summary}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TourBubble({
  active,
  step,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrevious,
  onRestart,
  onSkip
}: {
  active: boolean;
  step: (typeof tourSteps)[number];
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrevious: () => void;
  onRestart: () => void;
  onSkip: () => void;
}) {
  const Icon = step.icon;
  return (
    <AnimatePresence>
      {active ? (
        <motion.aside
          className="fixed right-4 top-28 z-40 w-[min(390px,calc(100vw-2rem))] border border-orange-400/35 bg-black/92 p-5 shadow-[0_0_34px_rgba(249,115,22,0.20)] backdrop-blur-xl"
          initial={{ opacity: 0, y: -18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
        >
          <span className="absolute -top-2 right-16 h-4 w-4 rotate-45 border-l border-t border-orange-400/35 bg-black" />
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center bg-orange-500 text-black">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Passo {currentStep + 1} de {totalSteps}</p>
              <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-zinc-300">{step.body}</p>
          <div className="mt-4 h-2 bg-zinc-900">
            <motion.div className="h-full bg-gradient-to-r from-orange-700 via-orange-400 to-yellow-300" animate={{ width: `${progress}%` }} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={onPrevious} disabled={currentStep === 0} className="inline-flex h-10 items-center gap-2 border border-zinc-800 px-3 text-sm text-zinc-200 transition hover:border-orange-400/50 disabled:opacity-35">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
            <button type="button" onClick={onNext} className="inline-flex h-10 items-center gap-2 bg-orange-500 px-3 text-sm font-semibold text-black transition hover:bg-orange-400">
              {currentStep === totalSteps - 1 ? "Entendi" : "Próximo"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={onSkip} className="inline-flex h-10 items-center border border-zinc-800 px-3 text-sm text-zinc-400 transition hover:border-orange-400/50 hover:text-orange-200">
              Pular
            </button>
            <button type="button" onClick={onRestart} className="grid h-10 w-10 place-items-center border border-zinc-800 text-zinc-400 transition hover:border-orange-400/50 hover:text-orange-200">
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function MetricTile({ metric, index }: { metric: (typeof metrics)[number]; index: number }) {
  return (
    <motion.div className="relative overflow-hidden border border-orange-400/15 bg-zinc-950/70 p-5 shadow-[0_0_26px_rgba(249,115,22,0.05)]" initial={{ y: 28, opacity: 0 }} animate={{ y: [0, -2, 0], opacity: 1 }} transition={{ delay: index * 0.07 }}>
      <ScanLine />
      <div className="relative z-10">
        <p className="text-sm text-zinc-500">{metric.label}</p>
        <p className="mt-3 text-4xl font-semibold text-zinc-50">{metric.value}</p>
        <p className="mt-3 text-sm text-orange-300">{metric.detail}</p>
      </div>
    </motion.div>
  );
}

function Panel({ id, active, title, icon: Icon, children }: { id: string; active: boolean; title: string; icon: typeof Gauge; children: ReactNode }) {
  return (
    <motion.section id={id} className={cn("relative overflow-visible border border-zinc-800 bg-zinc-950/78 p-5 shadow-[0_0_36px_rgba(0,0,0,0.22)] backdrop-blur-md", active && "focus-ring")} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <ScanLine />
      <div className="relative z-10 mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center bg-orange-500 text-black">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}

function ConnectionSummary({ label, value, tone }: { label: string; value: string; tone: "ok" | "warn" }) {
  return (
    <div className="border border-zinc-800 bg-black/35 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full", tone === "ok" ? "bg-emerald-400" : "bg-orange-400")} />
        <p className={tone === "ok" ? "truncate text-sm text-emerald-200" : "truncate text-sm text-orange-200"}>{value}</p>
      </div>
    </div>
  );
}

function BarRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-orange-300">{value}%</span>
      </div>
      <div className="h-3 bg-zinc-900">
        <motion.div className="h-full bg-gradient-to-r from-orange-700 via-orange-400 to-yellow-300" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8 }} />
      </div>
    </div>
  );
}

function LiveBadge({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="inline-flex items-center gap-3 border border-emerald-400/20 bg-emerald-950/20 px-3 py-2 text-xs text-emerald-100">
      <motion.span className="h-2 w-2 rounded-full bg-emerald-400" animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.12, 0.9] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      <span className="font-medium">{label}</span>
      <span className="text-emerald-200/70">{detail}</span>
    </div>
  );
}

function StatusPill({ icon: Icon, label }: { icon: typeof Gauge; label: string }) {
  return (
    <div className="relative flex h-12 items-center gap-2 overflow-hidden border border-orange-400/20 bg-black/50 px-4 text-sm text-zinc-300">
      <Icon className="h-4 w-4 text-orange-300" />
      <span>{label}</span>
    </div>
  );
}

function BrandMark({ size, className = "" }: { size: number; className?: string }) {
  return (
    <motion.div className={cn("relative grid shrink-0 place-items-center", className)} style={{ width: size, height: size }} animate={{ filter: ["drop-shadow(0 0 6px rgba(249,115,22,0.18))", "drop-shadow(0 0 14px rgba(249,115,22,0.30))", "drop-shadow(0 0 6px rgba(249,115,22,0.18))"] }} transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut" }}>
      <motion.div className="absolute inset-0 border border-orange-300/35" animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.08, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute inset-1 border border-orange-500/25" animate={{ rotate: [360, 270, 180, 90, 0], opacity: [0.25, 0.75, 0.25] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
      <Image src="/vulcan-logo.svg" alt="Vulcan" width={size} height={size} className="relative z-10 h-full w-full object-contain" />
    </motion.div>
  );
}

function AnimatedAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 opacity-35" style={{ background: "repeating-linear-gradient(115deg, rgba(249,115,22,0.025) 0px, rgba(249,115,22,0.025) 1px, transparent 1px, transparent 32px)" }} animate={{ x: [-40, 40, -40], y: [-18, 18, -18] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(110deg,transparent,rgba(249,115,22,0.055),rgba(250,204,21,0.025),transparent)] blur-lg" animate={{ x: ["-35%", "35%", "-35%"], opacity: [0.12, 0.28, 0.12] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-22" />
      <motion.div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.035),transparent)]" animate={{ x: ["-115%", "115%"], opacity: [0, 0.32, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent" animate={{ x: ["-100%", "100%"], opacity: [0, 0.85, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }} />
  );
}

function ViewFrame({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <motion.div className={compact ? "" : "pb-8"} initial={{ opacity: 0, y: 24, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -18, filter: "blur(10px)" }} transition={{ duration: 0.45 }}>
      {children}
    </motion.div>
  );
}
