"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DeblurringProject() {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sliderPos, setSliderPos] = useState(50);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setSelectedFile(file);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setResult(null);
      setOcrText(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleProcess = async () => {
    if (!preview || !selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch("/api/deblur", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur serveur");
      }

      const { resultUrl } = await res.json();
      setResult(resultUrl);
      setOcrText(null); // OCR not yet implemented server-side
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/projets"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Projets
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-3 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="font-mono text-[10px]">
            PyTorch
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            Computer Vision
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            GAN
          </Badge>
          <Badge variant="secondary" className="font-mono text-[10px]">
            OCR
          </Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Deblurring de plaques d&apos;immatriculation
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Pipeline de restauration d&apos;images de plaques floues par deep
          learning. Detection YOLO + deblurring (NAFNet/LPDGAN) + OCR.
        </p>
      </header>

      {/* Pipeline diagram */}
      <Card className="mb-10 overflow-hidden bg-zinc-950 p-6">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Pipeline
        </p>
        <div className="flex items-center justify-center gap-3 font-mono text-sm text-zinc-400 flex-wrap">
          <span className="rounded border border-border/40 px-3 py-1.5">
            Image floue
          </span>
          <span className="text-zinc-600">&rarr;</span>
          <span className="rounded border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-blue-400">
            YOLO v8
          </span>
          <span className="text-zinc-600">&rarr;</span>
          <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-400">
            NAFNet / LPDGAN
          </span>
          <span className="text-zinc-600">&rarr;</span>
          <span className="rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-400">
            EasyOCR
          </span>
          <span className="text-zinc-600">&rarr;</span>
          <span className="rounded border border-border/40 px-3 py-1.5">
            Resultat
          </span>
        </div>
      </Card>

      <Separator className="mb-10" />

      {/* Demo area */}
      <section className="mb-12">
        <h2 className="mb-6 text-xl font-semibold">Demo</h2>

        {!preview ? (
          /* Drop zone */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              dragOver
                ? "border-emerald-500 bg-emerald-500/5"
                : "border-border/40 hover:border-foreground/20"
            }`}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleFile(file);
              };
              input.click();
            }}
          >
            <div className="text-center">
              <p className="mb-1 text-lg font-medium text-muted-foreground">
                Glisse une image ici
              </p>
              <p className="text-sm text-muted-foreground/60">
                ou clique pour selectionner — PNG, JPG, WebP
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image display */}
            {result ? (
              /* Before/After slider */
              <div className="relative overflow-hidden rounded-lg border border-border/40">
                <div className="relative h-80">
                  {/* After (full width behind) */}
                  <img
                    src={result}
                    alt="Resultat"
                    className="absolute inset-0 h-full w-full object-contain bg-zinc-950"
                  />
                  {/* Before (clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={preview}
                      alt="Original"
                      className="h-full w-full object-contain bg-zinc-900"
                      style={{ filter: "blur(1.5px)" }}
                    />
                  </div>
                  {/* Slider line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white/80"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-zinc-900 text-xs text-white">
                      &harr;
                    </div>
                  </div>
                  {/* Labels */}
                  <span className="absolute top-3 left-3 rounded bg-zinc-900/80 px-2 py-0.5 text-xs text-zinc-400">
                    Avant
                  </span>
                  <span className="absolute top-3 right-3 rounded bg-zinc-900/80 px-2 py-0.5 text-xs text-emerald-400">
                    Apres
                  </span>
                  {/* Range input */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                  />
                </div>
              </div>
            ) : (
              /* Preview only */
              <div className="overflow-hidden rounded-lg border border-border/40">
                <img
                  src={preview}
                  alt="Apercu"
                  className="h-80 w-full object-contain bg-zinc-950"
                />
              </div>
            )}

            {/* OCR result */}
            {ocrText && (
              <Card className="border-emerald-500/20 bg-emerald-500/5 p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-500">
                  Caracteres detectes (OCR)
                </p>
                <p className="font-mono text-2xl font-bold tracking-widest">
                  {ocrText}
                </p>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!result && (
                <Button onClick={handleProcess} disabled={loading}>
                  {loading ? "Traitement en cours..." : "Defloutir"}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setPreview(null);
                  setResult(null);
                  setOcrText(null);
                }}
              >
                Nouvelle image
              </Button>
            </div>

            {loading && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Super-resolution en cours (Real-ESRGAN x4)...
              </p>
            )}
            {error && (
              <p className="text-sm text-red-400">
                Erreur : {error}
              </p>
            )}
          </div>
        )}
      </section>

      <Separator className="mb-10" />

      {/* Technical details */}
      <section className="mb-12">
        <h2 className="mb-6 text-xl font-semibold">Comment ca marche</h2>

        <div className="space-y-8">
          <div>
            <h3 className="mb-2 font-semibold">
              <span className="mr-2 font-mono text-blue-400">01</span>
              Detection de plaque — YOLO v8
            </h3>
            <p className="text-sm text-muted-foreground">
              Un modele YOLO detecte et isole la plaque d&apos;immatriculation
              dans l&apos;image. Ca permet de concentrer le deblurring sur la
              zone utile plutot que sur l&apos;image entiere — meilleure qualite,
              plus rapide.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              <span className="mr-2 font-mono text-emerald-400">02</span>
              Deblurring — NAFNet / LPDGAN
            </h3>
            <p className="text-sm text-muted-foreground">
              <strong>NAFNet</strong> (ECCV 2022) est le meilleur compromis
              vitesse/qualite pour le deblurring generique (33.69 dB PSNR sur
              GoPro). <strong>LPDGAN</strong> (IJCAI 2024) est specialise pour
              les plaques : il utilise un module de reconstruction textuelle et
              un discriminateur par caractere, ce qui ameliore la reconnaissance
              de +21% par rapport aux modeles generiques.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              <span className="mr-2 font-mono text-amber-400">03</span>
              OCR — EasyOCR
            </h3>
            <p className="text-sm text-muted-foreground">
              Les caracteres de la plaque restauree sont lus par un moteur OCR.
              EasyOCR ou PaddleOCR gèrent le format europeen (AA-123-BB) et
              sont robustes aux imperfections residuelles.
            </p>
          </div>
        </div>
      </section>

      {/* State of the art */}
      <section className="mb-12">
        <h2 className="mb-6 text-xl font-semibold">Etat de l&apos;art</h2>

        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-zinc-950">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Modele
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Performance
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Paper
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["LPDGAN", "Specialise plaques", "+21% reco vs SOTA", "IJCAI 2024"],
                ["NAFNet", "Deblurring generique", "33.69 dB (GoPro)", "ECCV 2022"],
                ["SwinIR", "Super-resolution", "SOTA SR, bon texte", "ICCVW 2021"],
                ["Real-ESRGAN", "Super-resolution", "24.97 dB, rapide", "ICCVW 2021"],
                ["SUPIR", "Blind restoration", "Best perceptuel", "arXiv 2024"],
              ].map(([model, type, perf, paper]) => (
                <tr key={model} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3 font-medium">{model}</td>
                  <td className="px-4 py-3 text-muted-foreground">{type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{perf}</td>
                  <td className="px-4 py-3 text-muted-foreground">{paper}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notebook */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Notebook</h2>
        <p className="text-sm text-muted-foreground">
          Le benchmark complet des modeles est disponible sur Google Colab.
          Il compare NAFNet, SwinIR, Real-ESRGAN et LPDGAN sur des images de
          plaques floues avec mesures PSNR/SSIM.
        </p>
      </section>
    </div>
  );
}
