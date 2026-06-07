# Vulcan Demo

Vulcan Demo é a vitrine comercial interativa do Vulcan. Ela não depende do backend real, não usa credenciais e não acessa dados de clientes.

O objetivo é permitir que um potencial cliente entenda rapidamente como o Vulcan funciona:

- agentes em tempo real;
- métricas operacionais;
- gargalos detectados;
- insights de IA;
- hierarquia de permissões;
- notificações por WhatsApp, e-mail e agente;
- segurança e privacidade;
- oportunidades de automação.

## Como Rodar Localmente

```bash
cd /home/allan/Dev/Vulcan-Demo
corepack pnpm install
corepack pnpm dev
```

Acesse:

```text
http://localhost:3000
```

Se a porta estiver ocupada:

```bash
corepack pnpm dev -- --port 3005
```

## Build

```bash
corepack pnpm lint
corepack pnpm build
```

## Como Subir Na Vercel

1. Envie este repositório para `https://github.com/allan-xln/Vulcan-Demo.git`.
2. Na Vercel, clique em `Add New Project`.
3. Importe o repositório `Vulcan-Demo`.
4. Framework: `Next.js`.
5. Build command: `corepack pnpm build`.
6. Install command: `corepack pnpm install`.
7. Output: padrão do Next.js.
8. Deploy.

Variáveis opcionais:

```env
NEXT_PUBLIC_CONTACT_WHATSAPP=5541984166423
NEXT_PUBLIC_CONTACT_LABEL=Falar com o time Vulcan
```

## Dados Simulados

Todos os dados ficam em:

```text
data/demo.ts
```

Edite ali:

- métricas principais;
- insights;
- dispositivos/agentes;
- hierarquia;
- timeline;
- páginas comerciais;
- pilares de valor;
- passos do tour.

## Editar O Tour

Os passos ficam em `tourSteps`, dentro de `data/demo.ts`.

Cada passo possui:

- `id`;
- `target`;
- `title`;
- `body`;
- `icon`.

O `target` controla qual área da tela recebe highlight. Exemplos:

```text
command-button
command-center
tempo-real
agentes
metricas
gargalos
insights
hierarquia
whatsapp
email
privacidade
automacao
cta
```

## Editar CTA E WhatsApp

Use `.env.local` apenas localmente:

```env
NEXT_PUBLIC_CONTACT_WHATSAPP=5541984166423
```

Não commitar `.env.local`.

## Identidade Visual

Logo:

```text
public/vulcan-logo.svg
```

Cores e estilos principais:

```text
app/globals.css
tailwind.config.ts
```

## Separação Do Produto Real

Este repositório é separado do Vulcan real.

Ele não deve:

- importar código sensível do Vulcan;
- depender do backend real;
- usar `.env` do produto principal;
- conter service role key;
- conter OpenAI key;
- conter credenciais Supabase;
- conter dados reais de clientes.
