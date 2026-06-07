import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { pages, tourSteps } from "@/data/demo";

export function StoryPage({ slug }: { slug: string }) {
  const page = pages.find((item) => item.slug === slug) ?? pages[0];
  const Icon = page.icon;
  const relatedSteps = tourSteps.filter((step) => step.target.includes(slug) || page.title.toLowerCase().includes(step.title.split(" ")[0].toLowerCase()));
  const contactWhatsApp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "5541984166423";
  const ctaHref = `https://wa.me/${contactWhatsApp}?text=${encodeURIComponent(`Quero falar sobre ${page.title} no Vulcan.`)}`;

  return (
    <main className="min-h-screen bg-vulcan-ink text-zinc-100">
      <div className="vulcan-grid fixed inset-0 opacity-25" />
      <section className="relative z-10 mx-auto min-h-screen max-w-6xl px-5 py-6">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border border-orange-400/15 bg-black/55 p-4">
          <Link href="/" className="flex items-center gap-3 text-zinc-200 transition hover:text-orange-200">
            <ArrowLeft className="h-4 w-4" />
            Voltar para a demo
          </Link>
          <Image src="/vulcan-logo.svg" alt="Vulcan" width={46} height={46} />
        </header>

        <article className="overflow-hidden border border-zinc-800 bg-zinc-950/78">
          <div className="border-b border-orange-400/15 bg-orange-950/10 p-6 md:p-10">
            <div className="mb-6 inline-flex items-center gap-3 border border-orange-400/20 bg-black/35 px-4 py-2 text-sm text-orange-100">
              <Icon className="h-4 w-4" />
              {page.eyebrow}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{page.description}</p>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-3 md:p-10">
            {[
              ["O que o cliente entende", "Valor do Vulcan em linguagem simples, sem termos técnicos desnecessários."],
              ["Como demonstrar", "Use esta página como apoio rápido depois do tour interativo principal."],
              ["Como vender", "Conecte o módulo a redução de retrabalho, visibilidade gerencial e automação."]
            ].map(([title, text]) => (
              <section key={title} className="border border-zinc-800 bg-black/35 p-5">
                <h2 className="font-semibold text-orange-100">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
              </section>
            ))}
          </div>

          <div className="border-t border-zinc-800 p-6 md:p-10">
            <h2 className="text-2xl font-semibold">Pontos para apresentar</h2>
            <div className="mt-5 grid gap-3">
              {(relatedSteps.length ? relatedSteps : tourSteps.slice(0, 4)).map((step) => (
                <div key={step.id} className="border border-zinc-800 bg-black/35 p-4">
                  <p className="font-semibold text-zinc-100">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex h-12 items-center justify-center border border-zinc-800 px-5 text-zinc-200 transition hover:border-orange-400/50 hover:text-orange-200">
            Reiniciar demo
          </Link>
          <a href={ctaHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 bg-orange-500 px-5 font-semibold text-black transition hover:bg-orange-400">
            <MessageCircle className="h-4 w-4" />
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
