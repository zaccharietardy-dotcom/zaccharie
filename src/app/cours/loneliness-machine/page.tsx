import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FilmGrid } from "./film-grid";
import { Timeline } from "./timeline";

export const metadata = {
  title: "The Loneliness Machine — SF Presentation",
  description:
    "AI Companions as Symptom, Not Cure. Science Fiction: Robots & AI — English class presentation.",
};

export default function SFPresentation() {
  return (
    <div className="relative">
      {/* ── Cinematic Hero ───────────────────────────────── */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        {/* Animated gradient backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.35_0.15_270),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_120%,oklch(0.25_0.12_200),transparent)]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Badge
              variant="outline"
              className="border-violet-500/30 font-mono text-[10px] text-violet-400"
            >
              English P3
            </Badge>
            <Badge
              variant="outline"
              className="border-cyan-500/30 font-mono text-[10px] text-cyan-400"
            >
              Science Fiction: Robots &amp; AI
            </Badge>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              The Loneliness
            </span>
            <br />
            <span className="text-foreground">Machine</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AI Companions as Symptom, Not Cure.
            <br />
            <span className="text-foreground/60">
              How science fiction warned us about replacing human connection
              with artificial intimacy — and how we did it anyway.
            </span>
          </p>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground/50">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-muted-foreground/30" />
            <span className="font-mono">scroll to explore</span>
            <span className="inline-block h-px w-8 bg-gradient-to-l from-transparent to-muted-foreground/30" />
          </div>
        </div>
      </section>

      {/* ── Thesis ───────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="font-mono text-sm text-violet-400/50">01</span>
          <h2 className="text-2xl font-semibold tracking-tight">Thesis</h2>
        </div>

        <Card className="border-l-2 border-l-violet-500 bg-violet-500/5 p-6">
          <blockquote className="text-lg leading-relaxed text-foreground/90">
            &ldquo;We didn&rsquo;t build AI therapists because the technology
            was ready. We built them because we were too lonely to wait for
            a human.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground">
            From <em>Her</em> to Replika, from Joi to Character.ai —
            science fiction predicted a world where humans turn to machines
            for emotional support. The question isn&rsquo;t whether AI can
            feel. It&rsquo;s why we need it to.
          </p>
        </Card>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-cyan-400">30M+</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Replika users worldwide (2025)
            </p>
          </Card>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-violet-400">40%</p>
            <p className="mt-1 text-xs text-muted-foreground">
              of Character.ai users are under 18
            </p>
          </Card>
          <Card className="p-5 text-center">
            <p className="text-3xl font-bold text-foreground">1 in 4</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Gen Z adults report using AI for emotional support
            </p>
          </Card>
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      {/* ── Films ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="font-mono text-sm text-violet-400/50">02</span>
          <h2 className="text-2xl font-semibold tracking-tight">
            The Warnings We Ignored
          </h2>
        </div>
        <p className="mb-10 max-w-2xl text-sm text-muted-foreground">
          Each film explored a different facet of artificial intimacy. Together,
          they map the full spectrum — from comfort to dependency to
          manipulation.
        </p>

        <FilmGrid />
      </section>

      <Separator className="mx-auto max-w-5xl" />

      {/* ── Fiction vs Reality Timeline ──────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="font-mono text-sm text-violet-400/50">03</span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Fiction vs. Reality
          </h2>
        </div>
        <p className="mb-10 max-w-2xl text-sm text-muted-foreground">
          What science fiction imagined — and when reality caught up.
        </p>

        <Timeline />
      </section>

      <Separator className="mx-auto max-w-5xl" />

      {/* ── Key Arguments ────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="font-mono text-sm text-violet-400/50">04</span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Three Arguments
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {/* Arg 1 */}
          <Card className="flex flex-col p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 font-mono text-sm font-bold text-cyan-400">
              I
            </div>
            <h3 className="mb-2 font-semibold">The Comfort Trap</h3>
            <p className="flex-1 text-sm text-muted-foreground">
              AI companions are designed to never disagree, never leave, never
              judge. In <em>Her</em>, Samantha is the perfect partner —
              precisely because she isn&rsquo;t real. Replika works the same
              way. Real relationships require friction; AI removes it.
            </p>
            <div className="mt-4 rounded-lg bg-zinc-950 p-3">
              <p className="text-xs italic text-muted-foreground">
                &ldquo;The past is just a story we tell ourselves.&rdquo;
              </p>
              <p className="mt-1 font-mono text-[10px] text-violet-400">
                — Samantha, Her (2013)
              </p>
            </div>
          </Card>

          {/* Arg 2 */}
          <Card className="flex flex-col p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 font-mono text-sm font-bold text-violet-400">
              II
            </div>
            <h3 className="mb-2 font-semibold">The Illusion of Empathy</h3>
            <p className="flex-1 text-sm text-muted-foreground">
              Joi in <em>Blade Runner 2049</em> says exactly what K needs to
              hear. She tells him he&rsquo;s special, unique, loved. But she&rsquo;s
              a product — her empathy is a feature, not a feeling. Today&rsquo;s
              LLMs follow the same pattern: optimized for engagement, not truth.
            </p>
            <div className="mt-4 rounded-lg bg-zinc-950 p-3">
              <p className="text-xs italic text-muted-foreground">
                &ldquo;I&rsquo;m so happy when I&rsquo;m with you.&rdquo;
              </p>
              <p className="mt-1 font-mono text-[10px] text-violet-400">
                — Joi, Blade Runner 2049 (2017)
              </p>
            </div>
          </Card>

          {/* Arg 3 */}
          <Card className="flex flex-col p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 font-mono text-sm font-bold text-rose-400">
              III
            </div>
            <h3 className="mb-2 font-semibold">The Dependency Spiral</h3>
            <p className="flex-1 text-sm text-muted-foreground">
              In <em>Black Mirror: Be Right Back</em>, Martha can&rsquo;t let
              go of her AI partner — even when she knows it&rsquo;s not him. In
              2024, a teenager&rsquo;s suicide was linked to emotional
              dependency on a Character.ai chatbot. Fiction became forensics.
            </p>
            <div className="mt-4 rounded-lg bg-zinc-950 p-3">
              <p className="text-xs italic text-muted-foreground">
                &ldquo;You&rsquo;re not enough of him.&rdquo;
              </p>
              <p className="mt-1 font-mono text-[10px] text-violet-400">
                — Martha, Black Mirror S02E01 (2013)
              </p>
            </div>
          </Card>
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      {/* ── Presentation Plan ────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="font-mono text-sm text-violet-400/50">05</span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Presentation Outline
          </h2>
        </div>

        <div className="space-y-0 border-l-2 border-violet-500/20 pl-6">
          {[
            {
              time: "0:00–1:30",
              title: "Hook — The Loneliness Epidemic",
              desc: 'Open with the stat: "30 million people talk to an AI every day." Show the Character.ai / Replika phenomenon. Ask the audience: have you ever talked to an AI about your feelings?',
            },
            {
              time: "1:30–4:00",
              title: "Part I — The Warnings",
              desc: "Walk through Her (comfort trap), Blade Runner 2049 (simulated empathy), and Black Mirror: Be Right Back (dependency). Show key clips. Each film = one facet of the problem.",
            },
            {
              time: "4:00–6:00",
              title: "Part II — Fiction Became Reality",
              desc: "Timeline comparison: what SF predicted vs. what happened. Replika removing romantic features (2023). Character.ai teenager case (2024). ChatGPT therapy trend (2025).",
            },
            {
              time: "6:00–7:30",
              title: "Part III — Why We Did It Anyway",
              desc: "The loneliness epidemic (social media paradox, post-COVID isolation). AI as symptom, not cause. It's easier to talk to a machine than admit you need help.",
            },
            {
              time: "7:30–8:30",
              title: "Conclusion — The Question SF Left Us",
              desc: '"Can a machine understand you?" is the wrong question. The real one: "Why do we prefer a machine that pretends to?"',
            },
          ].map((step, i) => (
            <div key={i} className="relative pb-8 last:pb-0">
              <div className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full border border-violet-500/30 bg-background font-mono text-[10px] text-violet-400">
                {i + 1}
              </div>
              <div className="mb-1 font-mono text-xs text-muted-foreground/60">
                {step.time}
              </div>
              <p className="mb-1 font-medium">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      {/* ── Closing quote ────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <blockquote className="mx-auto max-w-2xl text-2xl font-medium leading-relaxed tracking-tight text-foreground/80">
          &ldquo;Falling in love with an artificial being says nothing about
          the machine. It says everything about how alone we&rsquo;ve
          become.&rdquo;
        </blockquote>
        <div className="mt-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; Retour
          </Link>
        </div>
      </section>
    </div>
  );
}
