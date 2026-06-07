import {
  Activity,
  BellRing,
  Bot,
  Brain,
  Building2,
  Gauge,
  Laptop,
  Lock,
  MessageCircle,
  Network,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

export const metrics = [
  { label: "Usuários acompanhados", value: "42", detail: "equipes em operação", tone: "ok" },
  { label: "Agentes online", value: "38", detail: "4 exigem atenção", tone: "ok" },
  { label: "Eventos hoje", value: "12.840", detail: "processados em tempo real", tone: "ok" },
  { label: "Horas analisadas", value: "316h", detail: "últimas 24 horas", tone: "neutral" },
  { label: "Gargalos detectados", value: "27", detail: "7 de alto impacto", tone: "warn" },
  { label: "Automação", value: "18", detail: "oportunidades mapeadas", tone: "ok" },
  { label: "Economia mensal", value: "74h", detail: "R$ 8.900 estimados", tone: "ok" },
  { label: "Foco operacional", value: "86%", detail: "troca de contexto -21%", tone: "ok" }
];

export const tourSteps = [
  {
    id: "welcome",
    target: "hero",
    title: "Bem-vindo ao Vulcan",
    body: "Esta demo mostra como o Vulcan transforma sinais operacionais em decisões claras para gestores.",
    icon: Sparkles
  },
  {
    id: "realtime",
    target: "tempo-real",
    title: "Tempo real",
    body: "Aqui você vê agentes sincronizando, eventos chegando e a última atualização da operação.",
    icon: Activity
  },
  {
    id: "agents",
    target: "agentes",
    title: "Agentes conectados",
    body: "Windows, Linux e macOS enviam sinais operacionais permitidos por política, sem capturar senhas ou conteúdo privado.",
    icon: Laptop
  },
  {
    id: "metrics",
    target: "metricas",
    title: "Métricas principais",
    body: "Tempo ativo, ociosidade, fragmentação e estabilidade aparecem em uma camada executiva simples de ler.",
    icon: Gauge
  },
  {
    id: "bottlenecks",
    target: "gargalos",
    title: "Gargalos detectados",
    body: "O Vulcan aponta onde processos estão travando, como excesso de planilhas, alternância de sistemas ou agentes offline.",
    icon: Zap
  },
  {
    id: "ai",
    target: "insights",
    title: "Insights de IA",
    body: "A IA transforma métricas em recomendações práticas: priorizar automações, reorganizar filas e reduzir retrabalho.",
    icon: Brain
  },
  {
    id: "hierarchy",
    target: "hierarquia",
    title: "Hierarquia de permissões",
    body: "Supervisor vê sua equipe, gerente vê a árvore abaixo, diretor vê toda a operação e operador vê apenas seus próprios dados.",
    icon: Network
  },
  {
    id: "whatsapp",
    target: "whatsapp",
    title: "Notificações por WhatsApp",
    body: "Alertas e relatórios podem sair pelo Canal Oficial Vulcan para os responsáveis configurados pelo cliente.",
    icon: MessageCircle
  },
  {
    id: "email",
    target: "email",
    title: "Notificações por e-mail",
    body: "Relatórios diários, semanais e mensais podem ser enviados por SMTP, Gmail ou Outlook.",
    icon: BellRing
  },
  {
    id: "privacy",
    target: "privacidade",
    title: "Privacidade",
    body: "O Vulcan mede fluxo operacional. Não é spyware, não registra teclas, não coleta senhas e não lê conteúdo privado.",
    icon: ShieldCheck
  },
  {
    id: "automation",
    target: "automacao",
    title: "Oportunidades de automação",
    body: "A plataforma estima horas economizadas e ajuda a priorizar o que automatizar primeiro.",
    icon: Bot
  },
  {
    id: "summary",
    target: "cta",
    title: "Resumo final",
    body: "Em poucos minutos, um cliente entende agentes, métricas, IA, permissões, notificações e valor financeiro.",
    icon: Lock
  }
];

export const insights = [
  {
    title: "Financeiro concentrado em planilhas",
    body: "O setor financeiro concentrou 41% do tempo analisado em planilhas e conciliações manuais.",
    impact: "alto impacto",
    action: "Automatizar validação de notas e fechamento diário."
  },
  {
    title: "Troca intensa entre ERP e WhatsApp Web",
    body: "A operação alternou 1.240 vezes entre ERP e WhatsApp Web nesta semana.",
    impact: "médio impacto",
    action: "Criar fila única de exceções operacionais."
  },
  {
    title: "Agentes offline",
    body: "Dois agentes estão offline há mais de 30 minutos e podem comprometer a visão em tempo real.",
    impact: "atenção",
    action: "Acionar responsável local ou reiniciar serviço do agente."
  },
  {
    title: "Faturamento repetitivo",
    body: "Há potencial de automação em tarefas repetitivas no faturamento.",
    impact: "alto impacto",
    action: "Priorizar automação de campos recorrentes."
  }
];

export const agentGrid = [
  { name: "WIN-FIN-002", os: "Windows 11", owner: "Gerente financeiro", status: "online", quality: "alta" },
  { name: "LINUX-ALLAN-NB", os: "Linux", owner: "Diretoria demo", status: "online", quality: "alta" },
  { name: "MACBOOK-DIR-001", os: "macOS", owner: "Diretoria", status: "online", quality: "média" },
  { name: "WIN-OPER-003", os: "Windows 11", owner: "Operador 1", status: "sincronizando", quality: "média" },
  { name: "LINUX-SUPORTE-001", os: "Ubuntu", owner: "Suporte", status: "offline", quality: "baixa" },
  { name: "WIN-FAT-004", os: "Windows 11", owner: "Supervisor", status: "offline", quality: "média" }
];

export const hierarchy = [
  { role: "Diretor", people: 1, scope: "vê toda a operação" },
  { role: "Gerente", people: 3, scope: "vê supervisores e operadores abaixo" },
  { role: "Supervisor", people: 8, scope: "vê sua equipe direta" },
  { role: "Líder", people: 6, scope: "acompanha operadores" },
  { role: "Operadores", people: 24, scope: "veem apenas seus dados" }
];

export const timeline = [
  { hour: "08h", active: 78, idle: 12 },
  { hour: "09h", active: 88, idle: 8 },
  { hour: "10h", active: 82, idle: 14 },
  { hour: "11h", active: 74, idle: 20 },
  { hour: "12h", active: 35, idle: 52 },
  { hour: "13h", active: 69, idle: 18 },
  { hour: "14h", active: 91, idle: 5 },
  { hour: "15h", active: 84, idle: 10 },
  { hour: "16h", active: 76, idle: 16 },
  { hour: "17h", active: 64, idle: 24 }
];

export const pages = [
  {
    slug: "demo",
    title: "Demo Interativa",
    eyebrow: "central operacional",
    description: "Veja o Vulcan simulando uma operação real com agentes, IA, métricas, hierarquia e notificações.",
    icon: Activity
  },
  {
    slug: "tour",
    title: "Tour Guiado",
    eyebrow: "onboarding premium",
    description: "Um tutorial passo a passo mostra cada parte do produto para clientes e decisores.",
    icon: Sparkles
  },
  {
    slug: "metricas",
    title: "Métricas",
    eyebrow: "indicadores executivos",
    description: "Tempo ativo, ociosidade, foco, fragmentação, aplicativos e estabilidade de agentes.",
    icon: Gauge
  },
  {
    slug: "hierarquia",
    title: "Hierarquia",
    eyebrow: "permissões por árvore",
    description: "Cada gestor enxerga apenas o próprio escopo e os subordinados autorizados.",
    icon: Network
  },
  {
    slug: "agentes",
    title: "Agentes",
    eyebrow: "Windows, Linux e macOS",
    description: "Agentes coletam sinais operacionais permitidos, operam offline e sincronizam quando a rede volta.",
    icon: Laptop
  },
  {
    slug: "ia",
    title: "IA e Insights",
    eyebrow: "GPT + Llama",
    description: "Llama pré-analisa sinais operacionais e GPT gera insights executivos de alto impacto.",
    icon: Brain
  },
  {
    slug: "notificacoes",
    title: "Notificações",
    eyebrow: "WhatsApp, e-mail e agente",
    description: "Alertas, relatórios e insights chegam aos responsáveis certos no canal certo.",
    icon: BellRing
  },
  {
    slug: "seguranca",
    title: "Segurança e Privacidade",
    eyebrow: "LGPD-friendly",
    description: "O Vulcan mede fluxo de trabalho, não conteúdo pessoal. Políticas controlam o que é coletado.",
    icon: ShieldCheck
  },
  {
    slug: "contato",
    title: "CTA Final",
    eyebrow: "próximo passo",
    description: "Direcione o cliente para WhatsApp, formulário ou reunião de diagnóstico operacional.",
    icon: MessageCircle
  }
];

export const valuePillars = [
  { title: "Descobrir gargalos", description: "Identifique onde processos travam antes que virem custo invisível.", icon: Zap },
  { title: "Medir fluxo real", description: "Acompanhe tempo por sistema, setor, equipe e dispositivo sem invadir conteúdo.", icon: Activity },
  { title: "Priorizar automação", description: "Transforme tarefas repetitivas em oportunidades com impacto financeiro.", icon: Bot },
  { title: "Governar com hierarquia", description: "Permissões respeitam a árvore da empresa e reduzem risco de vazamento.", icon: Building2 }
];
