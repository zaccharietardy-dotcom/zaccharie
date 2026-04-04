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

export function GenerationImages() {
  return (
    <>
      {/* ===== 1. POURQUOI LA GENERATION D'IMAGES ===== */}
      <Section id="pourquoi" number="01" title="Pourquoi la generation d'images ?">
        <p>
          La generation d&apos;images par deep learning est l&apos;un des
          domaines les plus spectaculaires de l&apos;IA. En quelques annees,
          on est passe de textures floues 64x64 a des images photorealistes
          en haute resolution, indiscernables de vraies photos.
        </p>

        <p>Les applications sont immenses :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Art et creation</strong> — concept art, illustrations, textures pour jeux video</li>
          <li><strong>Medecine</strong> — IRM synthetiques pour entrainer des modeles diagnostiques sur des pathologies rares</li>
          <li><strong>Data augmentation</strong> — generer des exemples d&apos;entrainement quand les donnees reelles sont rares</li>
          <li><strong>Design</strong> — prototypage rapide, exploration de variations visuelles</li>
          <li><strong>Super-resolution</strong> — ameliorer la qualite d&apos;images degradees</li>
        </ul>

        <KeyConcept title="Generatif vs discriminatif">
          <p>
            Un modele <strong>discriminatif</strong> apprend <F>P(y|x)</F>
            (la frontiere entre classes). Un modele <strong>generatif</strong>{" "}
            apprend <F>P(x)</F> ou <F>P(x|z)</F> — la distribution des
            donnees elles-memes. Generer, c&apos;est echantillonner depuis
            cette distribution apprise.
          </p>
        </KeyConcept>

        <p>
          Evolution historique : Boltzmann Machines (2006) → Autoencoders →{" "}
          <strong>VAE</strong> (2013) → <strong>GAN</strong> (2014) →
          Diffusion (2020). Ce cours couvre les VAE et GANs — les fondations
          sur lesquelles tout le reste a ete construit.
        </p>
      </Section>

      {/* ===== 2. AUTOENCODERS ===== */}
      <Section id="autoencoders" number="02" title="Autoencoders">
        <p>
          Avant de comprendre les VAE, il faut comprendre les{" "}
          <Term def="Reseau encoder-decoder qui compresse l'entree dans un bottleneck de dimension reduite, puis la reconstruit.">
            autoencoders
          </Term>. L&apos;idee est simple : forcer un reseau a compresser
          une image dans un petit vecteur (l&apos;espace latent <F>z</F>),
          puis a la reconstruire. Si le bottleneck est suffisamment petit, le
          reseau doit apprendre une representation compacte et utile.
        </p>
        <Diagram title="Architecture d'un autoencoder">
          <div className="flex items-center gap-3">
            <div className="rounded border border-zinc-600 px-3 py-2">x (784)</div>
            <span>→</span>
            <div className="rounded border border-blue-500 px-3 py-2">Encoder</div>
            <span>→</span>
            <div className="rounded border border-amber-500 px-3 py-2 font-bold">z (32)</div>
            <span>→</span>
            <div className="rounded border border-emerald-500 px-3 py-2">Decoder</div>
            <span>→</span>
            <div className="rounded border border-zinc-600 px-3 py-2">x&apos; (784)</div>
          </div>
        </Diagram>
        <Def title="Loss de reconstruction">
          <p>
            L&apos;autoencoder minimise l&apos;erreur entre l&apos;entree
            <F> x</F> et la sortie <F>x&apos;</F> :
          </p>
          <Eq>
            <F>L</F> = ‖<F>x</F> − <F>x&apos;</F>‖<sup className="text-[0.7em]">2</sup> = ‖<F>x</F> − Dec(Enc(<F>x</F>))‖<sup className="text-[0.7em]">2</sup>
          </Eq>
          <p>
            On utilise aussi la binary cross-entropy pixel par pixel pour
            des images en noir et blanc (MNIST par exemple).
          </p>
        </Def>
        <Warning>
          <p>
            Un autoencoder classique ne peut <strong>pas generer</strong> de nouvelles images. L&apos;espace latent n&apos;est pas structure — echantillonner un point aleatoire produit du bruit, pas une image coherente.
          </p>
        </Warning>
      </Section>

      {/* ===== 3. VAE ===== */}
      <Section id="vae" number="03" title="VAE — Variational Autoencoders">
        <p>
          Le{" "}
          <Term def="Variational Autoencoder : autoencoder dont l'espace latent est contraint a suivre une distribution gaussienne, permettant la generation de nouvelles images.">
            VAE
          </Term>{" "}
          (Kingma & Welling, 2013) resout le probleme de structure en imposant
          une contrainte probabiliste a l&apos;espace latent. Au lieu
          d&apos;encoder vers un point <F>z</F>, on encode vers une{" "}
          <strong>distribution</strong> : une moyenne <F>μ</F> et un
          ecart-type <F>σ</F>.
        </p>
        <Theorem name="Evidence Lower Bound (ELBO)">
          <p>Soit <F>x</F> une donnee, <F>z</F> la variable latente. La log-vraisemblance verifie :</p>
          <Eq>
            log <F>p</F>(<F>x</F>) ≥ <Sub sub="z∼q">𝔼</Sub>[log <F>p</F>(<F>x</F>|<F>z</F>)] − <F>KL</F>(<F>q</F>(<F>z</F>|<F>x</F>) ‖ <F>p</F>(<F>z</F>))
          </Eq>
          <p>Le terme de droite est l&apos;ELBO = reconstruction + KL, qu&apos;on peut optimiser.</p>
        </Theorem>
        <Proof title="Derivation de l'ELBO">
          <p>On part de log <F>p(x)</F> = log ∫ <F>p(x,z)</F> d<F>z</F>. En introduisant <F>q(z|x)</F> et appliquant l&apos;inegalite de Jensen (log concave) :</p>
          <Eq>
            log <F>p</F>(<F>x</F>) ≥ ∫ <F>q</F>(<F>z</F>|<F>x</F>) · log <Frac n={<><F>p</F>(<F>x</F>,<F>z</F>)</>} d={<><F>q</F>(<F>z</F>|<F>x</F>)</>} /> d<F>z</F>
          </Eq>
          <p>En decomposant <F>p(x,z) = p(x|z)p(z)</F> et separant, on retrouve reconstruction + KL.</p>
        </Proof>
        <Def title="KL pour deux gaussiennes">
          <p>Quand <F>q(z|x) = N(μ, σ²)</F> et <F>p(z) = N(0,1)</F> :</p>
          <Eq>KL = −<Frac n="1" d="2" /> ∑(1 + log <F>σ²</F> − <F>μ²</F> − <F>σ²</F>)</Eq>
        </Def>
        <KeyConcept title="Reparametrization trick">
          <p>
            On ne peut pas backpropager a travers <F>z ∼ N(μ, σ²)</F>. Astuce : ecrire <F>z = μ + σ · ε</F> avec <F>ε ∼ N(0,1)</F>. L&apos;aleatoire est dans <F>ε</F> (constant pour les gradients), le gradient passe a travers <F>μ</F> et <F>σ</F>.
          </p>
        </KeyConcept>
        <Code language="python">{`import torch
import torch.nn as nn
import torch.nn.functional as F

class VAE(nn.Module):
    def __init__(self, latent_dim=32):
        super().__init__()
        self.enc = nn.Sequential(nn.Linear(784, 512), nn.ReLU(), nn.Linear(512, 256), nn.ReLU())
        self.fc_mu = nn.Linear(256, latent_dim)
        self.fc_logvar = nn.Linear(256, latent_dim)
        self.dec = nn.Sequential(
            nn.Linear(latent_dim, 256), nn.ReLU(),
            nn.Linear(256, 512), nn.ReLU(), nn.Linear(512, 784), nn.Sigmoid())

    def encode(self, x):
        h = self.enc(x.view(-1, 784))
        return self.fc_mu(h), self.fc_logvar(h)

    def reparameterize(self, mu, logvar):
        return mu + torch.exp(0.5 * logvar) * torch.randn_like(mu)

    def forward(self, x):
        mu, logvar = self.encode(x)
        return self.dec(self.reparameterize(mu, logvar)), mu, logvar

def vae_loss(recon_x, x, mu, logvar):
    bce = F.binary_cross_entropy(recon_x, x.view(-1, 784), reduction='sum')
    kl = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
    return bce + kl`}</Code>

        <Remark>
          <p>
            La loss totale est <F>L = reconstruction + β · KL</F>. Le
            poids <F>β</F> (souvent = 1) controle le compromis : un <F>β</F>{" "}
            trop grand donne des images floues mais un espace latent lisse ;
            un <F>β</F> trop petit donne des images nettes mais un espace
            desorganise. C&apos;est le <strong>beta-VAE</strong> (Higgins,
            2017).
          </p>
        </Remark>
      </Section>

      {/* ===== 4. GAN — LE JEU MIN-MAX ===== */}
      <Section id="gan" number="04" title="GAN — le jeu min-max">
        <p>
          Les{" "}
          <Term def="Generative Adversarial Network : deux reseaux (generateur et discriminateur) en competition pour produire des images realistes.">
            GANs
          </Term>{" "}
          (Goodfellow et al., 2014) adoptent une approche radicalement
          differente. Pas de loss de reconstruction explicite — a la place,
          un <strong>jeu a deux joueurs</strong> :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Le <strong>Generateur</strong> <F>G</F> prend du bruit <F>z ∼ N(0,1)</F> et produit une fausse image <F>G(z)</F></li>
          <li>Le <strong>Discriminateur</strong> <F>D</F> recoit une image et predit si elle est reelle ou generee</li>
        </ul>
        <Analogy>
          <p>Un faussaire (<F>G</F>) fabrique de faux billets, un policier (<F>D</F>) les detecte. Chacun s&apos;ameliore en reaction a l&apos;autre. A l&apos;equilibre, les faux sont indiscernables des vrais.</p>
        </Analogy>
        <Theorem name="Objectif des GANs">
          <Eq>
            <Sub sub="G">min</Sub> <Sub sub="D">max</Sub> <F>V</F>(<F>D</F>,<F>G</F>) = <Sub sub="x∼p(data)">𝔼</Sub>[log <F>D</F>(<F>x</F>)] + <Sub sub="z∼p(z)">𝔼</Sub>[log(1 − <F>D</F>(<F>G</F>(<F>z</F>)))]
          </Eq>
        </Theorem>
        <Proof title="Discriminateur optimal">
          <p>Pour <F>G</F> fixe, <F>D*(x) = </F><Frac n={<><Sub sub="data">p</Sub>(<F>x</F>)</>} d={<><Sub sub="data">p</Sub>(<F>x</F>) + <Sub sub="g">p</Sub>(<F>x</F>)</>} />. En substituant, <F>V</F> devient la divergence de Jensen-Shannon. A l&apos;equilibre <F>p(g) = p(data)</F>, on a <F>D*(x) = 1/2</F> partout.</p>
        </Proof>
        <Remark>
          <p>L&apos;equilibre de Nash est un point selle (min pour <F>G</F>, max pour <F>D</F>). En pratique, cet equilibre est extremement difficile a atteindre.</p>
        </Remark>
      </Section>

      {/* ===== 5. ENTRAINER UN GAN ===== */}
      <Section id="entrainement" number="05" title="Entrainer un GAN — instabilite et astuces">
        <Steps>
          <Step number="1" title="Mode collapse">
            <F>G</F> trouve quelques images qui trompent <F>D</F> et ne produit plus que celles-la. Diversite perdue.
          </Step>
          <Step number="2" title="Vanishing gradients">
            Si <F>D</F> est trop bon, <F>D(G(z)) ≈ 0</F> et le gradient de <F>log(1−D(G(z)))</F> est quasi-nul. On utilise <F>−log(D(G(z)))</F> (non-saturating loss).
          </Step>
          <Step number="3" title="Oscillations">
            Les deux reseaux oscillent sans converger. L&apos;entrainement peut exploser a tout moment.
          </Step>
        </Steps>
        <Warning>
          <p>Les losses d&apos;un GAN oscillent — il faut surveiller les generations visuellement. Pas de metrique simple de convergence.</p>
        </Warning>
        <p>Les astuces qui marchent en pratique :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Label smoothing</strong> — 0.9 au lieu de 1.0 pour les vrais, empeche D d&apos;etre trop confiant</li>
          <li><strong>Feature matching</strong> — aligner les features intermediaires de G(z) avec celles de x</li>
          <li><strong>Spectral normalization</strong> — contraindre D a etre Lipschitz-1, stabilise enormement</li>
          <li><strong>TTUR</strong> — learning rate plus grand pour D que pour G (ex: 4e-4 vs 1e-4)</li>
        </ul>
        <Code language="python">{`def train_gan(G, D, dataloader, epochs=100, lr_g=1e-4, lr_d=4e-4):
    opt_g = torch.optim.Adam(G.parameters(), lr=lr_g, betas=(0.5, 0.999))
    opt_d = torch.optim.Adam(D.parameters(), lr=lr_d, betas=(0.5, 0.999))
    bce = nn.BCEWithLogitsLoss()
    for epoch in range(epochs):
        for real, _ in dataloader:
            bs = real.size(0)
            real = real.cuda()
            # --- Discriminator ---
            z = torch.randn(bs, 128).cuda()
            loss_d = bce(D(real), torch.full((bs,1), 0.9).cuda()) \
                   + bce(D(G(z).detach()), torch.zeros(bs,1).cuda())
            opt_d.zero_grad(); loss_d.backward(); opt_d.step()
            # --- Generator (non-saturating) ---
            z = torch.randn(bs, 128).cuda()
            loss_g = bce(D(G(z)), torch.ones(bs,1).cuda())
            opt_g.zero_grad(); loss_g.backward(); opt_g.step()`}</Code>
      </Section>

      {/* ===== 6. DCGAN ===== */}
      <Section id="dcgan" number="06" title="DCGAN — l'architecture convolutionnelle">
        <p>
          Le{" "}
          <Term def="Deep Convolutional GAN : premiere architecture GAN a base de convolutions avec des guidelines precises.">
            DCGAN
          </Term>{" "}
          (Radford et al., 2015) a ete le premier GAN a produire des resultats
          visuellement convaincants sur des images 64x64. La cle : des
          guidelines architecturales precises qui stabilisent l&apos;entrainement.
        </p>
        <KeyConcept title="Les 4 regles du DCGAN">
          <p>1. Convolutions stridees (D) / transposees (G) au lieu du pooling. 2. BatchNorm partout sauf sortie G et entree D. 3. Pas de fully-connected. 4. ReLU dans G (Tanh en sortie), LeakyReLU dans D.</p>
        </KeyConcept>
        <Code language="python">{`class DCGANGenerator(nn.Module):
    def __init__(self, z_dim=128, ch=3):
        super().__init__()
        self.net = nn.Sequential(
            nn.ConvTranspose2d(z_dim, 512, 4, 1, 0, bias=False), nn.BatchNorm2d(512), nn.ReLU(True),
            nn.ConvTranspose2d(512, 256, 4, 2, 1, bias=False), nn.BatchNorm2d(256), nn.ReLU(True),
            nn.ConvTranspose2d(256, 128, 4, 2, 1, bias=False), nn.BatchNorm2d(128), nn.ReLU(True),
            nn.ConvTranspose2d(128, 64, 4, 2, 1, bias=False),  nn.BatchNorm2d(64),  nn.ReLU(True),
            nn.ConvTranspose2d(64, ch, 4, 2, 1, bias=False),   nn.Tanh())
    def forward(self, z): return self.net(z.view(-1, 128, 1, 1))

class DCGANDiscriminator(nn.Module):
    def __init__(self, ch=3):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(ch, 64, 4, 2, 1, bias=False),  nn.LeakyReLU(0.2, True),
            nn.Conv2d(64, 128, 4, 2, 1, bias=False),  nn.BatchNorm2d(128), nn.LeakyReLU(0.2, True),
            nn.Conv2d(128, 256, 4, 2, 1, bias=False), nn.BatchNorm2d(256), nn.LeakyReLU(0.2, True),
            nn.Conv2d(256, 512, 4, 2, 1, bias=False), nn.BatchNorm2d(512), nn.LeakyReLU(0.2, True),
            nn.Conv2d(512, 1, 4, 1, 0, bias=False))
    def forward(self, x): return self.net(x).view(-1, 1)`}</Code>
        <Remark>
          <p>DCGAN a montre que les GANs apprennent des representations semantiques : <F>homme lunettes − homme + femme = femme lunettes</F> dans l&apos;espace latent.</p>
        </Remark>
      </Section>

      {/* ===== 7. PROGAN ===== */}
      <Section id="progan" number="07" title="ProGAN — progressive growing">
        <p>
          Le probleme avec DCGAN : on est bloque a 64x64. Augmenter la
          resolution directement rend l&apos;entrainement instable.{" "}
          <Term def="Progressive Growing of GANs : on commence par generer des images 4x4, puis on ajoute progressivement des couches pour monter en resolution.">
            ProGAN
          </Term>{" "}
          (Karras et al., 2017) propose une idee elegante : commencer petit
          et grandir progressivement.
        </p>
        <Steps>
          <Step number="1" title="Debut a 4x4">Mini-GAN trivial qui converge vite.</Step>
          <Step number="2" title="Ajout avec fade-in">
            Nouvelles couches ponderees par α (0→1 lineairement). <F>sortie = α · nouvelle_couche + (1−α) · upscale_direct</F>.
          </Step>
          <Step number="3" title="Jusqu'a 1024x1024">4 → 8 → 16 → ... → 1024, chaque transition est lisse.</Step>
        </Steps>
        <Diagram title="Fade-in du progressive growing">
          <div className="flex items-center gap-2 text-xs">
            <div className="rounded border border-emerald-500 px-2 py-1">Couches (16x16)</div>
            <span>→ α ·</span>
            <div className="rounded border border-amber-500 px-2 py-1">Nouvelle (32x32)</div>
            <span>+ (1−α) ·</span>
            <div className="rounded border border-zinc-500 px-2 py-1">Upscale</div>
          </div>
        </Diagram>
        <KeyConcept title="Curriculum learning implicite">
          <p>A basse resolution, G et D apprennent la structure globale. Les details fins viennent ensuite. Chaque etape part d&apos;un GAN deja converge — un probleme &quot;facile&quot;.</p>
        </KeyConcept>
      </Section>

      {/* ===== 8. STYLEGAN ===== */}
      <Section id="stylegan" number="08" title="StyleGAN — le generateur qui a tout change">
        <p>
          <Term def="Architecture ou z est transforme en style w par un mapping network, puis injecte via AdaIN a chaque couche.">StyleGAN</Term> (Karras, 2018) : au lieu d&apos;injecter <F>z</F> directement, un <strong>mapping network</strong> (8 FC layers) transforme <F>z → w</F>.
        </p>
        <Diagram title="Architecture StyleGAN">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="rounded border border-blue-500 px-2 py-1">z ∈ ℝ⁵¹²</div>
              <span>→</span>
              <div className="rounded border border-violet-500 px-2 py-1">Mapping (8 FC)</div>
              <span>→</span>
              <div className="rounded border border-amber-500 px-2 py-1">w ∈ W</div>
            </div>
            <span className="text-xs text-zinc-500">↓ w injecte via AdaIN a chaque resolution</span>
            <div className="flex items-center gap-2 text-xs">
              <div className="rounded border border-zinc-600 px-2 py-1">Const 4x4</div>
              <span>→</span>
              <div className="rounded border border-emerald-500 px-2 py-1">Conv+AdaIN+Noise</div>
              <span>→...→</span>
              <div className="rounded border border-emerald-500 px-2 py-1">Conv+AdaIN+Noise</div>
              <span>→</span>
              <div className="rounded border border-zinc-600 px-2 py-1">1024x1024</div>
            </div>
          </div>
        </Diagram>
        <Def title="Adaptive Instance Normalization (AdaIN)">
          <p>Pour une feature map <F>x</F> et un style <F>y = (y<sub className="text-[0.7em]">s</sub>, y<sub className="text-[0.7em]">b</sub>)</F> :</p>
          <Eq>
            AdaIN(<F>x</F>, <F>y</F>) = <Sub sub="s">y</Sub> · <Frac n={<><F>x</F> − μ(<F>x</F>)</>} d={<>σ(<F>x</F>)</>} /> + <Sub sub="b">y</Sub>
          </Eq>
          <p>Couches basses = pose/forme, couches hautes = couleurs/texture.</p>
        </Def>
        <p>Les innovations cles de StyleGAN :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Style mixing</strong> — utiliser <F>w₁</F> pour les
            couches basses et <F>w₂</F> pour les hautes, combinant la
            structure d&apos;un visage avec la texture d&apos;un autre
          </li>
          <li>
            <strong>Truncation trick</strong> — a l&apos;inference,{" "}
            <F>w&apos; = w&#x0305; + ψ(w − w&#x0305;)</F>. Un <F>ψ &lt; 1</F>{" "}
            donne des images plus typiques au prix de la diversite
          </li>
          <li>
            <strong>Bruit stochastique</strong> — du bruit per-pixel a chaque
            resolution pour les micro-variations (pores, cheveux)
          </li>
        </ul>
        <ComparisonTable
          headers={["Version", "Innovation", "Resolution"]}
          rows={[
            ["StyleGAN (2018)", "Mapping network + AdaIN + style mixing", "1024x1024"],
            ["StyleGAN2 (2020)", "Weight demodulation, skip connections, plus de progressive growing", "1024x1024"],
            ["StyleGAN3 (2021)", "Alias-free : equivariance aux translations", "1024x1024"],
          ]}
        />

        <Remark>
          <p>
            StyleGAN2 a abandonne AdaIN au profit de la <strong>weight
            demodulation</strong>, qui evite les artefacts blob. Il a aussi
            elimine le progressive growing via des skip connections
            residuelles. StyleGAN3 s&apos;attaque au probleme de la
            &quot;texture collante&quot; (alias) avec des filtres continus.
          </p>
        </Remark>
      </Section>

      {/* ===== 9. METRIQUES ===== */}
      <Section id="metriques" number="09" title="Metriques d'evaluation">
        <p>
          Comment savoir si un GAN genere de bonnes images ? On ne peut pas
          juste regarder la loss — elle oscille. Il faut des metriques
          independantes qui evaluent la qualite et la diversite des generations.
        </p>
        <Def title="Frechet Inception Distance (FID)">
          <p>Features Inception-v3 des images reelles et generees, modelisees comme gaussiennes :</p>
          <Eq>
            FID = ‖<Sub sub="r">μ</Sub> − <Sub sub="g">μ</Sub>‖² + Tr(<Sub sub="r">Σ</Sub> + <Sub sub="g">Σ</Sub> − 2(<Sub sub="r">Σ</Sub><Sub sub="g">Σ</Sub>)<Sup sup="1/2">{""}</Sup>)
          </Eq>
          <p>Plus <strong>bas</strong> = mieux. FID 0 = distributions identiques.</p>
        </Def>
        <Def title="Inception Score (IS)">
          <Eq>IS = exp(<Sub sub="x">𝔼</Sub>[KL(<F>p</F>(<F>y</F>|<F>x</F>) ‖ <F>p</F>(<F>y</F>))])</Eq>
          <p>Plus <strong>haut</strong> = mieux. Mesure qualite (faible entropie <F>p(y|x)</F>) et diversite (forte entropie <F>p(y)</F>).</p>
        </Def>
        <ComparisonTable
          headers={["Modele", "FID (FFHQ)", "Annee"]}
          rows={[
            ["DCGAN", "~36", "2015"],
            ["ProGAN", "~8.0", "2017"],
            ["StyleGAN", "~4.4", "2018"],
            ["StyleGAN2", "~2.8", "2020"],
            ["Diffusion (ref)", "~2.0", "2022+"],
          ]}
        />
        <Remark>
          <p><strong>Precision</strong> = qualite (images realistes ?), <strong>recall</strong> = diversite (couvre-t-on la distribution ?). Un GAN avec mode collapse a haute precision mais faible recall.</p>
        </Remark>
      </Section>

      {/* ===== 10. LIMITATIONS & TRANSITION ===== */}
      <Section id="limitations" number="10" title="Limitations & transition vers la diffusion">
        <p>
          Malgre les avancees spectaculaires de StyleGAN, les GANs souffrent
          de problemes fondamentaux qui ont motive la transition vers les
          modeles de diffusion :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Mode collapse fondamental</strong> — le generateur n&apos;a
            aucune incitation directe a couvrir tous les modes de la
            distribution. Les variations rares sont souvent ignorees
          </li>
          <li>
            <strong>Entrainement instable</strong> — le jeu min-max est
            intrinsequement fragile. Le succes depend des hyperparametres, de
            l&apos;architecture, et parfois de la seed aleatoire
          </li>
          <li>
            <strong>Manque de diversite</strong> — les GANs excellent en nettete
            mais capturent mal la pleine diversite des donnees. Les VAE ont le
            probleme inverse (diversite OK mais images floues)
          </li>
          <li>
            <strong>Pas de vraisemblance</strong> — contrairement aux flows ou
            a la diffusion, pas de <F>p(x)</F> explicite. On ne peut pas
            evaluer la probabilite d&apos;une image donnee
          </li>
        </ul>
        <KeyConcept title="Pourquoi la diffusion a gagne">
          <p>Les modeles de diffusion (DDPM, 2020) decomposent la generation en centaines de pas de debruitage. Pas de jeu adversarial — juste une MSE a chaque etape. Entrainement stable, diversite preservee, vraisemblance exacte. Le prix : generation lente (100+ etapes vs 1 passe).</p>
        </KeyConcept>
        <ComparisonTable
          headers={["Critere", "GAN", "VAE", "Diffusion"]}
          rows={[
            ["Qualite", "Excellente", "Moyenne (floue)", "Excellente"],
            ["Diversite", "Limitee", "Bonne", "Excellente"],
            ["Stabilite", "Fragile", "Stable", "Tres stable"],
            ["Vitesse", "Tres rapide", "Rapide", "Lent (100+ steps)"],
            ["Vraisemblance", "Non", "ELBO (borne)", "ELBO exact"],
          ]}
        />
        <Remark>
          <p>Les GANs ne sont pas morts : GigaGAN (2023) garde l&apos;avantage en vitesse, et les distillations de diffusion (SDXL Turbo) reintroduisent des composants adversariaux. La frontiere entre approches se brouille.</p>
        </Remark>
      </Section>

      {/* ===== 11. QUIZ FINAL ===== */}
      <Section id="quiz" number="11" title="Quiz final">
        <Quiz
          question="Quel est le role du reparametrization trick dans un VAE ?"
          options={[
            "Accelerer l'entrainement en reduisant les parametres",
            "Permettre la backpropagation a travers l'echantillonnage stochastique",
            "Regulariser l'espace latent pour eviter le mode collapse",
            "Remplacer la KL divergence par une distance plus simple",
          ]}
          answer={1}
          explanation="On ecrit z = mu + sigma * epsilon (epsilon ~ N(0,1)). L'aleatoire est dans epsilon, constant pour les gradients — le gradient passe a travers mu et sigma."
        />
        <Quiz
          question="A l'equilibre de Nash optimal d'un GAN, que vaut D(x) ?"
          options={[
            "D(x) = 1 pour tout x",
            "D(x) = 0.5 pour tout x",
            "D(x) = 0 pour les faux, 1 pour les vrais",
            "D(x) varie selon la qualite de l'image",
          ]}
          answer={1}
          explanation="A l'equilibre, p(g) = p(data), donc D*(x) = p(data)/(p(data)+p(g)) = 1/2. Le discriminateur ne distingue plus rien."
        />
        <Quiz
          question="Quelle innovation de StyleGAN permet de controler structure et texture independamment ?"
          options={[
            "Le progressive growing",
            "La spectral normalization",
            "Le mapping network z→w avec injection AdaIN a differentes resolutions",
            "Les convolutions transposees",
          ]}
          answer={2}
          explanation="Le mapping network transforme z en w, injecte via AdaIN a chaque resolution. Couches basses = structure, couches hautes = texture. Le style mixing exploite cette separation."
        />
        <Quiz
          question="Pourquoi le FID est-il prefere a l'Inception Score ?"
          options={[
            "Le FID est plus rapide a calculer",
            "Le FID compare generees vs reelles, l'IS n'utilise que les generees",
            "Le FID ne necessite pas de reseau pre-entraine",
            "Le FID fonctionne sur toutes les resolutions",
          ]}
          answer={1}
          explanation="L'IS ne regarde que les images generees. Le FID compare explicitement les distributions de features Inception entre reelles et generees — beaucoup plus fiable."
        />
        <Quiz
          question="Principal avantage des modeles de diffusion sur les GANs ?"
          options={[
            "Generation plus rapide",
            "Moins de memoire GPU",
            "Entrainement stable (pas de jeu adversarial) et meilleure couverture de la distribution",
            "Pas besoin de donnees d'entrainement",
          ]}
          answer={2}
          explanation="Les modeles de diffusion optimisent une MSE a chaque pas — pas de min-max instable. La diversite est naturellement preservee, evitant le mode collapse."
        />
      </Section>
    </>
  );
}
