"use client";

import {
  Section, Code, KeyConcept, Warning, Analogy, Quiz,
  Diagram, Term, Steps, Step, ComparisonTable,
} from "@/components/course-elements";
import { Def, Theorem, Proof, Remark } from "@/components/math-elements";

/* ── Math helpers (pure HTML/CSS) ────────────────────────── */

function F({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic text-[1.05em]">{children}</span>;
}
function Eq({ children }: { children: React.ReactNode }) {
  return <div className="my-5 text-center text-lg font-serif italic leading-relaxed">{children}</div>;
}
function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center mx-1 align-middle text-[0.85em]">
      <span className="border-b border-current px-1 pb-0.5">{n}</span>
      <span className="px-1 pt-0.5">{d}</span>
    </span>
  );
}
function Sub({ children, sub }: { children: React.ReactNode; sub: React.ReactNode }) {
  return <span>{children}<sub className="text-[0.7em]">{sub}</sub></span>;
}
function Sup({ children, sup }: { children: React.ReactNode; sup: React.ReactNode }) {
  return <span>{children}<sup className="text-[0.7em]">{sup}</sup></span>;
}

export function DiffusionModels() {
  return (
    <>
      {/* ===== 1. POURQUOI LES MODELES DE DIFFUSION ===== */}
      <Section id="pourquoi" number="01" title="Pourquoi les modeles de diffusion">
        <p>
          Les modeles de diffusion sont devenus la methode dominante en generation
          d&apos;images depuis 2020, detronant les GANs. L&apos;intuition est simple :
          on detruit progressivement une image avec du bruit gaussien, puis on
          entraine un reseau a inverser ce processus — a debruiter pas a pas.
        </p>
        <Analogy>
          <p>
            Imaginez un restaurateur face a un tableau recouvert de couches de
            crasse. Il retire une fine couche a la fois, revelant progressivement
            l&apos;oeuvre originale. Les modeles de diffusion fonctionnent ainsi :
            a chaque etape, le reseau retire un peu de bruit.
          </p>
        </Analogy>
        <p>Pourquoi les diffusion models ont depasse les GANs :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Stabilite</strong> — pas de mode collapse ni d&apos;equilibre adversarial fragile</li>
          <li><strong>Couverture</strong> — les GANs ignorent des modes, les diffusion models couvrent toute la distribution</li>
          <li><strong>Qualite</strong> — FID meilleurs sur ImageNet des 2021 (Dhariwal &amp; Nichol)</li>
          <li><strong>Flexibilite</strong> — conditionnement facile (texte, classe, image), inpainting, super-resolution</li>
        </ul>
        <KeyConcept title="L'idee centrale">
          <p>
            Detruire est facile (ajouter du bruit), reconstruire est dur (debruiter).
            On entraine un reseau a faire la partie difficile. Apres entrainement,
            on part de bruit pur <F>x_T ~ N(0, I)</F> et on debruite iterativement
            pour obtenir une image realiste <F>x_0</F>.
          </p>
        </KeyConcept>
      </Section>

      {/* ===== 2. DDPM — FORWARD PROCESS ===== */}
      <Section id="forward" number="02" title="DDPM — Forward process">
        <p>
          Le <Term def="Denoising Diffusion Probabilistic Model (Ho et al., 2020) — le papier fondateur des diffusion models modernes.">DDPM</Term>{" "}
          definit un processus de Markov qui ajoute progressivement du bruit
          gaussien a une image <F>x_0</F> sur <F>T = 1000</F> etapes.
        </p>
        <Def title="Forward process q(x_t | x_{t-1})">
          <p>A chaque etape <F>t</F>, on ajoute du bruit selon un schedule <Sub sub="t"><F>beta</F></Sub> :</p>
          <Eq>
            q(<Sub sub="t"><F>x</F></Sub> | <Sub sub="t-1"><F>x</F></Sub>) = N(<Sub sub="t"><F>x</F></Sub> ;{" "}
            <F>sqrt(1 - <Sub sub="t"><F>beta</F></Sub>)</F> · <Sub sub="t-1"><F>x</F></Sub>,{" "}
            <Sub sub="t"><F>beta</F></Sub> · <F>I</F>)
          </Eq>
          <p>Le schedule croit de <Sup sup="-4"><F>10</F></Sup> a 0.02 (lineaire).</p>
        </Def>
        <Theorem title="Forme fermee pour q(x_t | x_0)">
          <p>
            En posant <Sub sub="t"><F>alpha</F></Sub> = 1 - <Sub sub="t"><F>beta</F></Sub> et{" "}
            <F>alpha_barre_t</F> = <Sub sub="1"><F>alpha</F></Sub> · ... · <Sub sub="t"><F>alpha</F></Sub>,
            on echantillonne directement <Sub sub="t"><F>x</F></Sub> depuis <Sub sub="0"><F>x</F></Sub> :
          </p>
          <Eq>
            q(<Sub sub="t"><F>x</F></Sub> | <Sub sub="0"><F>x</F></Sub>) = N(<Sub sub="t"><F>x</F></Sub> ;{" "}
            <F>sqrt(alpha_barre_t)</F> · <Sub sub="0"><F>x</F></Sub>,{" "}
            <F>(1 - alpha_barre_t)</F> · <F>I</F>)
          </Eq>
        </Theorem>
        <Proof title="Derivation (recurrence telescopique)">
          <p>
            La somme de gaussiennes independantes est gaussienne. En substituant
            recursivement <Sub sub="t"><F>x</F></Sub> = <F>sqrt(alpha_t)</F> · <Sub sub="t-1"><F>x</F></Sub> + <F>sqrt(1 - alpha_t)</F> · <F>epsilon</F>,
            les coefficients se multiplient : la moyenne devient <F>sqrt(alpha_barre_t)</F> · <Sub sub="0"><F>x</F></Sub>{" "}
            et la variance <F>1 - alpha_barre_t</F>.
          </p>
        </Proof>
        <p>
          Propriete cruciale : on n&apos;a pas besoin de simuler les <F>T</F> etapes.
          On echantillonne un <F>t</F> aleatoire, on calcule <Sub sub="t"><F>x</F></Sub> directement.
        </p>
        <Code language="python — Forward diffusion — ajout de bruit">{`import torch

def forward_diffusion(x0, t, alpha_bar):
    """Ajoute du bruit a x0 pour obtenir x_t directement."""
    sqrt_ab = torch.sqrt(alpha_bar[t]).view(-1, 1, 1, 1)
    sqrt_1m = torch.sqrt(1 - alpha_bar[t]).view(-1, 1, 1, 1)
    eps = torch.randn_like(x0)
    return sqrt_ab * x0 + sqrt_1m * eps, eps

T = 1000
betas = torch.linspace(1e-4, 0.02, T)
alphas = 1 - betas
alpha_bar = torch.cumprod(alphas, dim=0)`}</Code>
        <Remark>
          <p>
            Quand <F>t = T</F>, <F>alpha_barre_T ~ 0</F> donc <Sub sub="T"><F>x</F></Sub>{" "}
            est du bruit pur — toute l&apos;information est detruite.
          </p>
        </Remark>
      </Section>

      {/* ===== 3. DDPM — REVERSE PROCESS ===== */}
      <Section id="reverse" number="03" title="DDPM — Reverse process">
        <p>
          On apprend a debruiter en approximant <F>{"q(x_{t-1} | x_t)"}</F> avec
          un reseau parametre par <F>theta</F>.
        </p>
        <Def title="Reverse process p_theta">
          <Eq>
            <Sub sub="theta"><F>p</F></Sub>(<Sub sub="t-1"><F>x</F></Sub> | <Sub sub="t"><F>x</F></Sub>) = N(<Sub sub="t-1"><F>x</F></Sub> ;{" "}
            <Sub sub="theta"><F>mu</F></Sub>(<Sub sub="t"><F>x</F></Sub>, t),{" "}
            <Sub sub="t"><F>sigma</F></Sub><sup>2</sup> · <F>I</F>)
          </Eq>
          <p>Le reseau predit le bruit <Sub sub="theta"><F>epsilon</F></Sub> (plus courant que la moyenne directement).</p>
        </Def>
        <Theorem title="Loss simplifiee du DDPM">
          <p>L&apos;objectif derive de l&apos;ELBO se simplifie remarquablement :</p>
          <Eq>
            L = E [ || <F>epsilon</F> - <Sub sub="theta"><F>epsilon</F></Sub>(<Sub sub="t"><F>x</F></Sub>, t) ||<sup>2</sup> ]
          </Eq>
          <p>On echantillonne <F>epsilon ~ N(0, I)</F>, on construit <Sub sub="t"><F>x</F></Sub>, et le reseau predit le bruit ajoute.</p>
        </Theorem>
        <Proof title="Lien avec l'ELBO">
          <p>
            La log-vraisemblance se decompose en KL divergences entre
            posterieures <F>{"q(x_{t-1} | x_t, x_0)"}</F> et <Sub sub="θ"><F>p</F></Sub>.
            Les deux etant gaussiennes, la KL se reduit a une difference de
            moyennes au carre. En reparametrisant via le bruit, on obtient la loss simplifiee.
          </p>
        </Proof>
        <KeyConcept title="Connexion avec le score matching">
          <p>
            Predire <F>epsilon</F> revient a estimer le{" "}
            <Term def="Gradient du log de la densite de probabilite par rapport aux donnees.">score</Term>{" "}
            de la distribution bruitee : <Sub sub=""><F>nabla_x</F></Sub> log <F>q(x_t)</F> ={" "}
            -<Frac n={<F>epsilon</F>} d={<F>sqrt(1 - alpha_barre_t)</F>} />.
          </p>
        </KeyConcept>
        <Warning>
          <p>
            Le reseau doit recevoir <F>t</F> en entree (positional embedding
            sinusoidal) car le niveau de bruit varie enormement entre t=1 et t=T.
          </p>
        </Warning>
      </Section>

      {/* ===== 4. SAMPLING & ACCELERATION ===== */}
      <Section id="sampling" number="04" title="Sampling et acceleration">
        <p>
          Le sampling DDPM naif necessite <F>T = 1000</F> passes forward —
          beaucoup trop lent pour la production.
        </p>
        <Steps>
          <Step number="1" title="DDPM (1000 steps)">
            Partir de bruit pur, debruiter pas a pas. 1000 evaluations du reseau.
          </Step>
          <Step number="2" title="DDIM (Song et al., 2020)">
            Processus deterministe, on saute des etapes : 50 steps suffisent.
          </Step>
          <Step number="3" title="DPM-Solver (Lu et al., 2022)">
            Solveurs ODE d&apos;ordre superieur. 10-20 steps, qualite excellente.
          </Step>
        </Steps>
        <ComparisonTable
          headers={["Methode", "Steps", "Stochastique", "Qualite (FID)"]}
          rows={[
            ["DDPM", "1000", "Oui", "~3.2 (CIFAR-10)"],
            ["DDIM", "50-100", "Non", "~4.0"],
            ["DPM-Solver", "10-20", "Non", "~3.5"],
            ["DPM-Solver++", "10-15", "Non", "~3.2"],
          ]}
        />
        <Remark>
          <p>
            DDIM est deterministe : le meme bruit initial donne toujours la meme
            image. Cela permet l&apos;interpolation dans l&apos;espace latent.
          </p>
        </Remark>
      </Section>

      {/* ===== 5. SCORE MATCHING & SDE ===== */}
      <Section id="score-sde" number="05" title="Score matching et SDE">
        <p>
          Le framework SDE (Song et al., 2021) unifie diffusion models et
          score-based models via les equations differentielles stochastiques.
        </p>
        <Def title="Score function">
          <Eq><F>s(x)</F> = <Sub sub="x"><F>nabla</F></Sub> log <F>p(x)</F></Eq>
          <p>Le gradient du log de la densite — pointe vers les regions de forte probabilite.</p>
        </Def>
        <Theorem title="Forward SDE">
          <Eq>d<F>x</F> = <F>f(x, t)</F> dt + <F>g(t)</F> d<F>w</F></Eq>
          <p>
            <F>f</F> est le drift, <F>g</F> la diffusion, <F>w</F> un mouvement brownien.
            Pour le DDPM (VP-SDE) : <F>f(x, t)</F> = -<Frac n={<F>beta(t)</F>} d={<F>2</F>} /> <F>x</F>{" "}
            et <F>g(t)</F> = <F>sqrt(beta(t))</F>.
          </p>
        </Theorem>
        <Theorem title="Reverse SDE (Anderson, 1982)">
          <Eq>
            d<F>x</F> = [<F>f(x, t)</F> - <Sup sup="2"><F>g(t)</F></Sup> · <Sub sub="x"><F>nabla</F></Sub> log <Sub sub="t"><F>p</F></Sub>(<F>x</F>)] dt + <F>g(t)</F> d<F>w_barre</F>
          </Eq>
          <p>Si on connait le score, on simule le processus inverse pour generer.</p>
        </Theorem>
        <KeyConcept title="L'unification">
          <p>
            DDPM = discretisation de la VP-SDE. SMLD = discretisation de la VE-SDE.
            Les deux sont des cas particuliers du meme framework. La SDE se
            convertit en ODE (probability flow) pour un sampling deterministe — c&apos;est DDIM.
          </p>
        </KeyConcept>
      </Section>

      {/* ===== 6. CLASSIFIER-FREE GUIDANCE ===== */}
      <Section id="cfg" number="06" title="Classifier-Free Guidance">
        <p>
          Pour generer des images conditionnelles (texte, classe), il faut guider
          le debruitage. Deux approches ont ete proposees.
        </p>
        <Steps>
          <Step number="1" title="Classifier Guidance (Dhariwal & Nichol, 2021)">
            Classifieur entraine sur images bruitees. Son gradient pousse
            l&apos;echantillon vers la classe voulue. Probleme : classifieur separe necessaire.
          </Step>
          <Step number="2" title="Classifier-Free Guidance (Ho & Salimans, 2022)">
            Dropper le conditionnement aleatoirement (~10%) pendant l&apos;entrainement.
            Le modele apprend generation conditionnelle ET inconditionnelle. Au sampling, on combine.
          </Step>
        </Steps>
        <Def title="Formule du CFG">
          <Eq>
            <F>epsilon_tilde</F> = <Sub sub="uncond"><F>epsilon</F></Sub> + s · (<Sub sub="cond"><F>epsilon</F></Sub> - <Sub sub="uncond"><F>epsilon</F></Sub>)
          </Eq>
          <p>
            <F>s = 1</F> : prediction conditionnelle standard. <F>s &gt; 1</F> : on
            amplifie le conditionnement. Defaut typique : <F>s = 7.5</F>.
          </p>
        </Def>
        <KeyConcept title="Le compromis qualite/diversite">
          <p>
            Guidance scale eleve (7-15) : images plus fideles au prompt, moins diversifiees.
            Scale faible (1-3) : images variees mais moins precises.
          </p>
        </KeyConcept>
        <Warning>
          <p>
            Un scale trop eleve (s &gt; 20) produit des images saturees avec
            artefacts. &quot;Plus de guidance = mieux&quot; est un piege courant.
          </p>
        </Warning>
      </Section>

      {/* ===== 7. STABLE DIFFUSION ===== */}
      <Section id="stable-diffusion" number="07" title="Stable Diffusion">
        <p>
          Stable Diffusion (Rombach et al., 2022) a democratise la generation
          d&apos;images. Innovation cle : diffusion dans un espace latent compresse.
        </p>
        <Diagram title="Architecture de Stable Diffusion">
          {`Texte "un chat astronaute"
       |
  [CLIP Text Encoder] ──────────────────┐
                                         |  cross-attention
  Bruit z_T ──> [U-Net Denoiser] x N steps ──> z_0 debruite
                    |     ^                        |
                    |     |                   [VAE Decoder]
              timestep embedding                   |
                                              Image 512x512`}
        </Diagram>
        <Steps>
          <Step number="1" title="VAE (Variational Autoencoder)">
            Compresse 512x512x3 en latent 64x64x4 (facteur 8x spatial). La
            diffusion opere dans cet espace — gain de 48x en nombre de pixels.
          </Step>
          <Step number="2" title="U-Net (Denoiser)">
            Predit le bruit dans l&apos;espace latent. Recoit <Sub sub="t"><F>z</F></Sub>,
            le timestep <F>t</F> (embedding sinusoidal), et le texte (cross-attention).
            Architecture : ResNet + self-attention + cross-attention + skip connections.
          </Step>
          <Step number="3" title="CLIP Text Encoder">
            Encode le texte en vecteurs injectes dans le U-Net via cross-attention,
            permettant au modele de comprendre le prompt.
          </Step>
        </Steps>
        <KeyConcept title="Pourquoi l'espace latent">
          <p>
            (1) Cout reduit ~50x, (2) le VAE filtre les details imperceptibles pour
            que le U-Net se concentre sur la semantique, (3) meme framework pour
            super-resolution, inpainting, etc.
          </p>
        </KeyConcept>
      </Section>

      {/* ===== 8. ETAT DE L'ART 2024-2026 ===== */}
      <Section id="etat-art" number="08" title="L'etat de l'art (2024-2026)">
        <p>Le domaine evolue a une vitesse vertigineuse.</p>
        <ComparisonTable
          headers={["Modele", "Architecture", "Innovation cle", "Annee"]}
          rows={[
            ["DALL-E 3", "U-Net + T5", "Alignement texte-image via recaptioning", "2023"],
            ["SD 3 / SD 3.5", "MM-DiT", "Flow matching + Multi-Modal DiT", "2024"],
            ["FLUX.1", "Transformer", "Transformers purs, rectified flow", "2024"],
            ["Midjourney v6", "Proprietary", "Esthetique, coherence, upscaling natif", "2024"],
            ["Sora", "DiT (video)", "Generation video, monde 3D coherent", "2024"],
            ["Ideogram 2.0", "DiT + OCR", "Texte dans les images, typographie", "2024"],
          ]}
        />
        <KeyConcept title="Diffusion Transformers (DiT)">
          <p>
            Tendance majeure : remplacer le U-Net par des{" "}
            <Term def="Architecture transformer adaptee comme denoiser, utilisant des patchs d'image comme tokens.">DiT</Term>.
            Peebles &amp; Xie (2023) traitent les patchs du latent comme tokens
            de transformer. Les DiT scalent mieux et beneficient de Flash Attention.
          </p>
        </KeyConcept>
        <KeyConcept title="Flow Matching / Rectified Flow">
          <p>
            Le <strong>flow matching</strong> (Lipman et al., 2023) apprend un champ
            de vitesse transportant le bruit vers les donnees en ligne droite.
            Le <strong>rectified flow</strong> redresse les trajectoires pour un
            sampling en moins d&apos;etapes. FLUX et SD3 utilisent cette approche.
          </p>
        </KeyConcept>
        <Remark>
          <p>
            FLUX.1 de Black Forest Labs (createurs originaux de Stable Diffusion)
            est open-source, transformer pur + rectified flow — reference open-source 2024-2025.
          </p>
        </Remark>
      </Section>

      {/* ===== 9. SUPER-RESOLUTION & RESTAURATION ===== */}
      <Section id="super-resolution" number="09" title="Super-resolution et restauration">
        <p>
          La super-resolution augmente la resolution d&apos;une image en ajoutant des
          details realistes — un cas de generation conditionnelle.
        </p>
        <Steps>
          <Step number="1" title="ESRGAN (Wang et al., 2018)">
            Blocs RRDB comme backbone + perceptual loss (VGG) au lieu de MSE
            pixel-a-pixel. Images plus nettes et realistes.
          </Step>
          <Step number="2" title="Real-ESRGAN (Wang et al., 2021)">
            <Term def="Super-resolution ou le type de degradation est inconnu — le modele gere toutes les degradations.">Blind super-resolution</Term> :
            modele de degradation realiste (JPEG, flou camera, bruit capteur).
            Fonctionne sur de vraies photos, pas juste des downscales bicubiques.
          </Step>
          <Step number="3" title="AESRGAN et tendances 2025">
            Combiner diffusion models et super-resolution : meilleure gestion des
            textures, moins d&apos;artefacts GAN.
          </Step>
        </Steps>
        <Code language="python — Super-resolution avec Real-ESRGAN">{`from basicsr.archs.rrdbnet_arch import RRDBNet
from realesrgan import RealESRGANer
import cv2

model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64,
                num_block=23, num_grow_ch=32)
upsampler = RealESRGANer(
    scale=4, model_path="RealESRGAN_x4plus.pth",
    model=model, tile=400, half=True  # FP16, tile pour VRAM
)
img = cv2.imread("photo_basse_res.jpg", cv2.IMREAD_UNCHANGED)
output, _ = upsampler.enhance(img, outscale=4)
cv2.imwrite("photo_haute_res.jpg", output)`}</Code>
      </Section>

      {/* ===== 10. IMPLEMENTER UN DDPM SIMPLE ===== */}
      <Section id="implementation" number="10" title="Implementer un DDPM simple">
        <p>
          DDPM minimal en PyTorch : noise schedule, U-Net simplifie, entrainement
          et sampling.
        </p>
        <Code language="python — U-Net simplifie + noise schedule">{`import torch
import torch.nn as nn
import torch.nn.functional as Func

T = 1000
betas = torch.linspace(1e-4, 0.02, T)
alphas = 1.0 - betas
alpha_bar = torch.cumprod(alphas, dim=0)

class SimpleUNet(nn.Module):
    def __init__(self, ch=64):
        super().__init__()
        self.time_mlp = nn.Sequential(
            nn.Linear(1, ch), nn.SiLU(), nn.Linear(ch, ch))
        self.enc1 = nn.Conv2d(1, ch, 3, padding=1)
        self.enc2 = nn.Conv2d(ch, ch*2, 3, stride=2, padding=1)
        self.dec1 = nn.ConvTranspose2d(ch*2, ch, 4, stride=2, padding=1)
        self.dec2 = nn.Conv2d(ch*2, 1, 3, padding=1)
        self.act = nn.SiLU()

    def forward(self, x, t):
        t_emb = self.time_mlp(t.float().unsqueeze(-1) / T)
        h1 = self.act(self.enc1(x))
        h2 = self.act(self.enc2(h1)) + t_emb.view(-1, h2.shape[1], 1, 1)
        h = torch.cat([self.act(self.dec1(h2)), h1], dim=1)
        return self.dec2(h)  # predit epsilon`}</Code>
        <Code language="python — Training loop">{`model = SimpleUNet().cuda()
opt = torch.optim.Adam(model.parameters(), lr=2e-4)
ab = alpha_bar.cuda()

for epoch in range(100):
    for imgs, _ in dataloader:  # ex: MNIST [B,1,28,28] dans [-1,1]
        imgs = imgs.cuda()
        t = torch.randint(0, T, (imgs.shape[0],), device="cuda")
        sqrt_ab = torch.sqrt(ab[t]).view(-1,1,1,1)
        sqrt_1m = torch.sqrt(1 - ab[t]).view(-1,1,1,1)
        eps = torch.randn_like(imgs)
        x_t = sqrt_ab * imgs + sqrt_1m * eps
        loss = Func.mse_loss(model(x_t, t), eps)
        opt.zero_grad(); loss.backward(); opt.step()
    print(f"Epoch {epoch}, Loss: {loss.item():.4f}")`}</Code>
        <Code language="python — Sampling DDPM">{`@torch.no_grad()
def sample_ddpm(model, n=16):
    x = torch.randn(n, 1, 28, 28).cuda()
    for t in reversed(range(T)):
        tb = torch.full((n,), t, device="cuda")
        eps_pred = model(x, tb)
        x = (1/torch.sqrt(alphas[t])) * (
            x - (1-alphas[t])/torch.sqrt(1-alpha_bar[t]) * eps_pred)
        if t > 0:
            x += torch.sqrt(betas[t]) * torch.randn_like(x)
    return x.clamp(-1, 1)`}</Code>
        <Code language="python — Stable Diffusion avec diffusers">{`from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-2-1",
    torch_dtype=torch.float16).to("cuda")
image = pipe(
    prompt="un renard dans une foret automnale, peinture a l'huile",
    negative_prompt="flou, basse qualite, deformed",
    guidance_scale=7.5, num_inference_steps=30
).images[0]
image.save("renard_foret.png")`}</Code>
        <Warning>
          <p>
            Notre U-Net simplifie n&apos;a que quelques milliers de parametres.
            Les vrais modeles utilisent 800M+ parametres avec attention
            multi-echelle. L&apos;objectif ici est pedagogique.
          </p>
        </Warning>
      </Section>

      {/* ===== 11. QUIZ FINAL ===== */}
      <Section id="quiz" number="11" title="Quiz final">
        <Quiz
          question="Que predit le reseau de neurones dans un DDPM ?"
          options={[
            "L'image finale x_0 directement",
            "Le bruit epsilon ajoute a l'image",
            "La classe de l'image",
            "Le timestep t utilise pour bruiter",
          ]}
          answer={1}
          explanation="Le DDPM entraine le reseau a predire le bruit epsilon. La loss est ||epsilon - epsilon_theta(x_t, t)||^2. A partir du bruit predit, on recalcule la moyenne pour le step de debruitage."
        />
        <Quiz
          question="Pourquoi Stable Diffusion travaille dans l'espace latent ?"
          options={[
            "Pour generer des images plus grandes",
            "Pour reduire le cout computationnel (espace 48x plus petit)",
            "Pour eviter d'utiliser un U-Net",
            "Pour rendre le modele deterministe",
          ]}
          answer={1}
          explanation="Le VAE compresse 512x512x3 en 64x64x4, soit ~48x de reduction. La diffusion dans cet espace est beaucoup moins couteuse tout en preservant l'information semantique."
        />
        <Quiz
          question="Quel est l'effet d'augmenter le guidance scale s (CFG) ?"
          options={[
            "Images plus diversifiees mais moins precises",
            "Images plus fideles au prompt mais moins diversifiees",
            "Images plus rapides a generer",
            "Images avec une resolution plus elevee",
          ]}
          answer={1}
          explanation="Un guidance scale eleve amplifie la difference entre prediction conditionnelle et inconditionnelle, forcant le modele a suivre le prompt plus fidelement au detriment de la diversite."
        />
        <Quiz
          question="Quelle est la tendance architecturale majeure en 2024-2025 ?"
          options={[
            "Remplacer le VAE par un autoencoder classique",
            "Revenir aux GANs pour plus de vitesse",
            "Remplacer le U-Net par des Diffusion Transformers (DiT)",
            "Utiliser des LSTM comme denoiser",
          ]}
          answer={2}
          explanation="Les DiT remplacent le U-Net : patchs du latent traites comme tokens de transformer. FLUX, SD3 et Sora utilisent tous des DiT. Ils scalent mieux et beneficient des optimisations transformer."
        />
        <Quiz
          question="Quelle innovation de Real-ESRGAN le distingue d'ESRGAN ?"
          options={[
            "Il utilise des transformers au lieu de CNNs",
            "Il modelise des degradations realistes (JPEG, flou, bruit) a l'entrainement",
            "Il genere des images a partir de texte",
            "Il fonctionne uniquement sur des visages",
          ]}
          answer={1}
          explanation="Real-ESRGAN simule les artefacts reels (compression JPEG, flou camera, bruit capteur) pendant l'entrainement, lui permettant de fonctionner sur de vraies photos degradees."
        />
      </Section>
    </>
  );
}
