"use client";

import {
  Section,
  Code,
  KeyConcept,
  Warning,
  Analogy,
  Quiz,
  Diagram,
  Term,
  Steps,
  Step,
  ComparisonTable,
} from "@/components/course-elements";
import { Def, Remark } from "@/components/math-elements";
import { SvgDiagram, Box, Arrow, Label, GroupBox } from "@/components/svg-diagrams";

function F({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic text-[1.05em]">{children}</span>;
}
function Eq({ children }: { children: React.ReactNode }) {
  return <div className="my-5 text-center text-lg font-serif italic leading-relaxed">{children}</div>;
}
function Sub({ children, sub }: { children: React.ReactNode; sub: React.ReactNode }) {
  return <span>{children}<sub className="text-[0.7em]">{sub}</sub></span>;
}
function Sup({ children, sup }: { children: React.ReactNode; sup: React.ReactNode }) {
  return <span>{children}<sup className="text-[0.7em]">{sup}</sup></span>;
}

export function RnnLstm() {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. POURQUOI LES MODELES SEQUENTIELS                          */}
      {/* ============================================================ */}
      <Section id="sequentiel" number="01" title="Pourquoi les modeles sequentiels ?">
        <p>
          Le monde est plein de donnees ordonnees : les mots d&apos;une phrase,
          les cours d&apos;une action, les echantillons d&apos;un signal audio.
          L&apos;ordre porte du sens — un{" "}
          <Term def="Reseau feedforward : chaque couche envoie ses sorties a la suivante, sans boucle. Pas de notion de temps.">
            reseau feedforward
          </Term>{" "}
          ne le voit pas.
        </p>
        <Analogy>
          <p>
            &quot;Le chat mange la souris&quot; et &quot;la souris mange le chat&quot;
            contiennent les memes mots, mais l&apos;ordre change tout. Un feedforward
            traite les entrees comme un sac de billes — il ne voit pas l&apos;ordre.
          </p>
        </Analogy>
        <KeyConcept title="Le besoin fondamental">
          <p>
            On a besoin d&apos;un reseau qui traite les entrees <strong>une par
            une, dans l&apos;ordre</strong>, en gardant une <strong>memoire</strong> de
            ce qu&apos;il a vu avant. C&apos;est exactement ce que fait un RNN.
          </p>
        </KeyConcept>
        <p>
          Domaines concernes : NLP, series temporelles (finance, meteo),
          audio, video. Avant les Transformers (2017), les RNNs etaient
          <strong> le</strong> paradigme dominant pour toutes ces taches.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 2. RNN VANILLA                                                */}
      {/* ============================================================ */}
      <Section id="rnn-vanilla" number="02" title="Le RNN vanilla">
        <Def title="Reseau de neurones recurrent (RNN)">
          <p>
            Un RNN possede une <strong>boucle interne</strong> : a chaque pas de
            temps <F>t</F>, il recoit <Sub sub="t"><F>x</F></Sub> et l&apos;etat cache
            precedent <Sub sub="t-1"><F>h</F></Sub>, puis produit <Sub sub="t"><F>h</F></Sub>.
          </p>
        </Def>
        <SvgDiagram width={620} height={240} title="RNN deroule dans le temps (unfolding)">
          {/* Input labels x_1 .. x_4 */}
          <Label x={100} y={20} text="x_1" color="#10b981" size={13} weight="bold" />
          <Label x={240} y={20} text="x_2" color="#10b981" size={13} weight="bold" />
          <Label x={380} y={20} text="x_3" color="#10b981" size={13} weight="bold" />
          <Label x={520} y={20} text="x_4" color="#10b981" size={13} weight="bold" />

          {/* Arrows from inputs to hidden boxes */}
          <Arrow x1={100} y1={32} x2={100} y2={70} color="#10b981" />
          <Arrow x1={240} y1={32} x2={240} y2={70} color="#10b981" />
          <Arrow x1={380} y1={32} x2={380} y2={70} color="#10b981" />
          <Arrow x1={520} y1={32} x2={520} y2={70} color="#10b981" />

          {/* Hidden state boxes h_1 .. h_4 */}
          <Box x={40} y={70} w={120} h={44} label="h_1" color="violet" />
          <Box x={180} y={70} w={120} h={44} label="h_2" color="violet" />
          <Box x={320} y={70} w={120} h={44} label="h_3" color="violet" />
          <Box x={460} y={70} w={120} h={44} label="h_4" color="violet" />

          {/* Horizontal arrows between hidden states */}
          <Arrow x1={160} y1={92} x2={180} y2={92} label="W_hh" color="#8b5cf6" />
          <Arrow x1={300} y1={92} x2={320} y2={92} label="W_hh" color="#8b5cf6" />
          <Arrow x1={440} y1={92} x2={460} y2={92} label="W_hh" color="#8b5cf6" />

          {/* Arrows from hidden to outputs */}
          <Arrow x1={100} y1={114} x2={100} y2={155} color="#06b6d4" />
          <Arrow x1={240} y1={114} x2={240} y2={155} color="#06b6d4" />
          <Arrow x1={380} y1={114} x2={380} y2={155} color="#06b6d4" />
          <Arrow x1={520} y1={114} x2={520} y2={155} color="#06b6d4" />

          {/* Output labels y_1 .. y_4 */}
          <Label x={100} y={172} text="y_1" color="#06b6d4" size={13} weight="bold" />
          <Label x={240} y={172} text="y_2" color="#06b6d4" size={13} weight="bold" />
          <Label x={380} y={172} text="y_3" color="#06b6d4" size={13} weight="bold" />
          <Label x={520} y={172} text="y_4" color="#06b6d4" size={13} weight="bold" />

          {/* Caption */}
          <Label x={310} y={215} text="Meme cellule reutilisee. Poids W_hh, W_xh, W_hy partages." size={10} />
        </SvgDiagram>
        <Eq>
          <Sub sub="t"><F>h</F></Sub> = tanh(<Sub sub="hh"><F>W</F></Sub> <Sub sub="t-1"><F>h</F></Sub> + <Sub sub="xh"><F>W</F></Sub> <Sub sub="t"><F>x</F></Sub> + <Sub sub="h"><F>b</F></Sub>)
        </Eq>
        <Eq>
          <Sub sub="t"><F>y</F></Sub> = <Sub sub="hy"><F>W</F></Sub> <Sub sub="t"><F>h</F></Sub> + <Sub sub="y"><F>b</F></Sub>
        </Eq>
        <Steps>
          <Step number="1" title="Initialisation">
            <Sub sub="0"><F>h</F></Sub> est initialise a zero (ou appris).
          </Step>
          <Step number="2" title="Forward pass">
            Pour chaque <F>t = 1...T</F>, calculer <Sub sub="t"><F>h</F></Sub> puis <Sub sub="t"><F>y</F></Sub>.
          </Step>
          <Step number="3" title="Loss + BPTT">
            Calculer la perte totale, puis deroule le graphe dans le temps pour
            backpropager. Les gradients remontent de <Sub sub="T"><F>h</F></Sub> a <Sub sub="1"><F>h</F></Sub>.
          </Step>
        </Steps>
        <Code language="python">{`import torch, torch.nn as nn

class RNNFromScratch(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.hidden_size = hidden_size
        self.W_xh = nn.Linear(input_size, hidden_size, bias=False)
        self.W_hh = nn.Linear(hidden_size, hidden_size, bias=False)
        self.b_h  = nn.Parameter(torch.zeros(hidden_size))
        self.W_hy = nn.Linear(hidden_size, output_size)

    def forward(self, x):  # x: (batch, seq_len, input_size)
        batch, seq_len, _ = x.shape
        h = torch.zeros(batch, self.hidden_size, device=x.device)
        outputs = []
        for t in range(seq_len):
            h = torch.tanh(self.W_xh(x[:, t]) + self.W_hh(h) + self.b_h)
            outputs.append(self.W_hy(h))
        return torch.stack(outputs, dim=1)`}</Code>
        <Remark>
          <p>
            Le partage des poids dans le temps donne au RNN le <strong>meme nombre
            de parametres</strong> quelle que soit la longueur de la sequence.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 3. VANISHING GRADIENT                                         */}
      {/* ============================================================ */}
      <Section id="vanishing" number="03" title="Le probleme du vanishing gradient">
        <p>
          En theorie, un RNN apprend des dependances a n&apos;importe quelle
          distance. En pratique, c&apos;est un echec pour les sequences longues.
          Le coupable : le{" "}
          <Term def="Quand les gradients deviennent exponentiellement petits en remontant dans le temps, rendant l'apprentissage impossible pour les dependances lointaines.">
            vanishing gradient
          </Term>.
        </p>
        <p>
          Lors du BPTT, le gradient par rapport a <Sub sub="1"><F>h</F></Sub> traverse
          tous les pas intermediaires :
        </p>
        <Eq>
          dL/d<Sub sub="1"><F>h</F></Sub> = dL/d<Sub sub="T"><F>h</F></Sub> · <Sup sup="T-1"><Sub sub="hh"><F>W</F></Sub></Sup> · produit des derivees de tanh
        </Eq>
        <p>
          En decomposant <Sub sub="hh"><F>W</F></Sub> par ses valeurs propres :
          si elles sont {`<`} 1 en module, le gradient disparait exponentiellement ;
          si {`>`} 1, il explose.
        </p>
        <KeyConcept title="Le verdict des valeurs propres">
          <p>
            La derivee de <F>tanh</F> est toujours dans [0, 1]. Sur 100 pas, on
            multiplie 100 fois par un nombre {`<`} 1 : le gradient tend vers zero.
            Il n&apos;y a pas de juste milieu stable pour le RNN vanilla.
          </p>
        </KeyConcept>
        <Warning>
          <p>
            Consequence : un RNN ne peut pas apprendre que &quot;chats&quot; au debut
            de &quot;Les chats, que j&apos;ai adoptes au refuge l&apos;annee
            derniere, <strong>dorment</strong>&quot; determine l&apos;accord du verbe.
            Le gradient clipping resout l&apos;explosion, pas la disparition.
            Il faut changer l&apos;architecture.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 4. LSTM                                                       */}
      {/* ============================================================ */}
      <Section id="lstm" number="04" title="LSTM — Long Short-Term Memory">
        <p>
          Le LSTM (Hochreiter & Schmidhuber, 1997) ajoute un{" "}
          <Term def="Convoyeur d'information qui traverse la sequence avec des operations additives. Les gradients circulent sans s'evanouir.">
            cell state
          </Term>{" "}
          (<Sub sub="t"><F>C</F></Sub>) controle par trois portes.
        </p>
        <SvgDiagram width={700} height={370} title="Cellule LSTM">
          {/* ── Cell state highway ── */}
          <Label x={20} y={40} text="C_t-1" size={12} color="#f59e0b" anchor="start" weight="bold" />
          <Arrow x1={72} y1={40} x2={168} y2={40} color="#f59e0b" />
          {/* Forget gate multiply */}
          <Box x={168} y={20} w={64} h={40} label="x" sublabel="forget" color="rose" />
          <Arrow x1={232} y1={40} x2={348} y2={40} color="#f59e0b" />
          {/* Input gate add */}
          <Box x={348} y={20} w={64} h={40} label="+" sublabel="input" color="accent" />
          <Arrow x1={412} y1={40} x2={660} y2={40} color="#f59e0b" />
          <Label x={675} y={40} text="C_t" size={12} color="#f59e0b" anchor="start" weight="bold" />

          {/* ── Inputs label ── */}
          <GroupBox x={25} y={145} w={120} h={50} label="inputs" color="default" />
          <Label x={85} y={163} text="x_t" size={11} color="#e4e4e7" />
          <Label x={85} y={180} text="h_t-1" size={11} color="#e4e4e7" />

          {/* ── Forget gate ── */}
          <Box x={168} y={120} w={64} h={36} label="f_t" sublabel="sig" color="rose" />
          <Arrow x1={85} y1={195} x2={185} y2={156} color="#a1a1aa" dashed />
          {/* f_t up to the multiply node */}
          <Arrow x1={200} y1={120} x2={200} y2={60} color="#f43f5e" />

          {/* ── Input gate ── */}
          <Box x={280} y={120} w={64} h={36} label="i_t" sublabel="sig" color="accent" />
          <Arrow x1={85} y1={195} x2={297} y2={156} color="#a1a1aa" dashed />

          {/* ── Cell candidate ── */}
          <Box x={280} y={200} w={64} h={36} label="c~_t" sublabel="tanh" color="cyan" />
          <Arrow x1={85} y1={195} x2={297} y2={218} color="#a1a1aa" dashed />

          {/* i_t * c~_t multiply node */}
          <Box x={370} y={160} w={40} h={30} label="*" color="default" rx={15} />
          <Arrow x1={344} y1={138} x2={370} y2={168} color="#10b981" />
          <Arrow x1={344} y1={218} x2={370} y2={183} color="#06b6d4" />
          {/* result goes up to + node */}
          <Arrow x1={390} y1={160} x2={380} y2={60} color="#a1a1aa" />

          {/* ── Output gate ── */}
          <Box x={460} y={120} w={64} h={36} label="o_t" sublabel="sig" color="violet" />
          <Arrow x1={85} y1={195} x2={477} y2={156} color="#a1a1aa" dashed />

          {/* tanh of C_t */}
          <Box x={530} y={200} w={64} h={36} label="tanh" color="amber" />
          {/* C_t line branches down to tanh */}
          <Arrow x1={562} y1={40} x2={562} y2={200} color="#f59e0b" dashed />

          {/* o_t * tanh(C_t) multiply node */}
          <Box x={530} y={280} w={64} h={36} label="*" color="default" rx={15} />
          <Arrow x1={492} y1={156} x2={540} y2={280} color="#8b5cf6" />
          <Arrow x1={562} y1={236} x2={562} y2={280} color="#f59e0b" />

          {/* h_t output */}
          <Arrow x1={562} y1={316} x2={562} y2={350} color="#8b5cf6" />
          <Label x={562} y={362} text="h_t" size={13} color="#8b5cf6" weight="bold" />
        </SvgDiagram>
        <Eq><Sub sub="t"><F>f</F></Sub> = sigma(<Sub sub="f"><F>W</F></Sub>[<Sub sub="t-1"><F>h</F></Sub>, <Sub sub="t"><F>x</F></Sub>] + <Sub sub="f"><F>b</F></Sub>)  — forget gate</Eq>
        <Eq><Sub sub="t"><F>i</F></Sub> = sigma(<Sub sub="i"><F>W</F></Sub>[<Sub sub="t-1"><F>h</F></Sub>, <Sub sub="t"><F>x</F></Sub>] + <Sub sub="i"><F>b</F></Sub>)  — input gate</Eq>
        <Eq><Sub sub="t"><F>c~</F></Sub> = tanh(<Sub sub="c"><F>W</F></Sub>[<Sub sub="t-1"><F>h</F></Sub>, <Sub sub="t"><F>x</F></Sub>] + <Sub sub="c"><F>b</F></Sub>)  — candidat</Eq>
        <Eq><Sub sub="t"><F>C</F></Sub> = <Sub sub="t"><F>f</F></Sub> * <Sub sub="t-1"><F>C</F></Sub> + <Sub sub="t"><F>i</F></Sub> * <Sub sub="t"><F>c~</F></Sub>  — mise a jour cell state</Eq>
        <Eq><Sub sub="t"><F>o</F></Sub> = sigma(<Sub sub="o"><F>W</F></Sub>[<Sub sub="t-1"><F>h</F></Sub>, <Sub sub="t"><F>x</F></Sub>] + <Sub sub="o"><F>b</F></Sub>)  — output gate</Eq>
        <Eq><Sub sub="t"><F>h</F></Sub> = <Sub sub="t"><F>o</F></Sub> * tanh(<Sub sub="t"><F>C</F></Sub>)</Eq>
        <Steps>
          <Step number="1" title="Forget gate">
            Decide quoi oublier du cell state. Sigmoid : 0 = oublier, 1 = garder.
          </Step>
          <Step number="2" title="Input gate + candidat">
            Le candidat propose des valeurs, l&apos;input gate filtre ce qu&apos;on ecrit.
          </Step>
          <Step number="3" title="Cell state update">
            <Sub sub="t"><F>C</F></Sub> = (ancien * oubli) + (nouveau * filtrage). Operation <strong>additive</strong>.
          </Step>
          <Step number="4" title="Output gate">
            Filtre quelle partie du cell state on expose comme <Sub sub="t"><F>h</F></Sub>.
          </Step>
        </Steps>
        <KeyConcept title="Pourquoi ca resout le vanishing gradient">
          <p>
            Le cell state est mis a jour par <strong>addition</strong>. Le gradient
            qui remonte le long de <Sub sub="t"><F>C</F></Sub> n&apos;est multiplie que
            par <Sub sub="t"><F>f</F></Sub> (entre 0 et 1). Si le forget gate est proche
            de 1, le gradient passe sans attenuation — c&apos;est une autoroute.
          </p>
        </KeyConcept>
      </Section>

      {/* ============================================================ */}
      {/* 5. GRU                                                        */}
      {/* ============================================================ */}
      <Section id="gru" number="05" title="GRU — Gated Recurrent Unit">
        <p>
          Le GRU (Cho et al., 2014) fusionne cell state et hidden state,
          et reduit les portes de 3 a 2 : <strong>reset</strong> et <strong>update</strong>.
        </p>
        <Eq><Sub sub="t"><F>z</F></Sub> = sigma(<Sub sub="z"><F>W</F></Sub>[<Sub sub="t-1"><F>h</F></Sub>, <Sub sub="t"><F>x</F></Sub>])  — update gate</Eq>
        <Eq><Sub sub="t"><F>r</F></Sub> = sigma(<Sub sub="r"><F>W</F></Sub>[<Sub sub="t-1"><F>h</F></Sub>, <Sub sub="t"><F>x</F></Sub>])  — reset gate</Eq>
        <Eq><Sub sub="t"><F>h~</F></Sub> = tanh(<Sub sub="h"><F>W</F></Sub>[<Sub sub="t"><F>r</F></Sub> * <Sub sub="t-1"><F>h</F></Sub>, <Sub sub="t"><F>x</F></Sub>])  — candidat</Eq>
        <Eq><Sub sub="t"><F>h</F></Sub> = (1 - <Sub sub="t"><F>z</F></Sub>) * <Sub sub="t-1"><F>h</F></Sub> + <Sub sub="t"><F>z</F></Sub> * <Sub sub="t"><F>h~</F></Sub></Eq>
        <Analogy>
          <p>
            L&apos;update gate est un curseur : a 0 on garde l&apos;ancien etat
            intact (la memoire passe), a 1 on remplace tout. Pas besoin de cell
            state separe — le mecanisme est integre.
          </p>
        </Analogy>
        <ComparisonTable
          headers={["Critere", "LSTM", "GRU"]}
          rows={[
            ["Gates", "3 (forget, input, output)", "2 (reset, update)"],
            ["Etats", "h_t + C_t (separes)", "h_t uniquement"],
            ["Parametres (hidden=256)", "~790K", "~590K (25% de moins)"],
            ["Vitesse", "Plus lent", "Plus rapide"],
            ["Quand choisir", "Beaucoup de donnees, seq. longues", "Datasets modestes, prototypage"],
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* 6. BI-LSTM & DEEP RNNS                                       */}
      {/* ============================================================ */}
      <Section id="bi-lstm" number="06" title="Bi-LSTM & Deep RNNs">
        <p>
          Un RNN classique lit de gauche a droite. Mais &quot;avocat&quot; dans
          &quot;l&apos;avocat du tribunal&quot; vs &quot;l&apos;avocat dans la
          salade&quot; — c&apos;est le mot d&apos;apres qui desambiguise. Le
          contexte futur compte.
        </p>
        <Def title="Bi-LSTM (Bidirectional LSTM)">
          <p>
            Deux LSTMs en parallele : forward (gauche a droite) et backward (droite
            a gauche). Leurs etats sont concatenes : <Sub sub="t"><F>h</F></Sub> = [<Sup sup="fwd"><Sub sub="t"><F>h</F></Sub></Sup> ; <Sup sup="bwd"><Sub sub="t"><F>h</F></Sub></Sup>].
            Sortie = 2 * hidden_size.
          </p>
        </Def>
        <SvgDiagram width={620} height={250} title="Bi-LSTM">
          {/* ── Forward path (top) ── */}
          <GroupBox x={25} y={10} w={570} h={60} label="forward" color="accent" />
          <Box x={40} y={22} w={100} h={36} label="h1 fwd" color="accent" />
          <Box x={180} y={22} w={100} h={36} label="h2 fwd" color="accent" />
          <Box x={320} y={22} w={100} h={36} label="h3 fwd" color="accent" />
          <Box x={460} y={22} w={100} h={36} label="h4 fwd" color="accent" />
          <Arrow x1={140} y1={40} x2={180} y2={40} color="#10b981" />
          <Arrow x1={280} y1={40} x2={320} y2={40} color="#10b981" />
          <Arrow x1={420} y1={40} x2={460} y2={40} color="#10b981" />

          {/* ── Input labels ── */}
          <Arrow x1={90} y1={96} x2={90} y2={58} color="#a1a1aa" />
          <Arrow x1={230} y1={96} x2={230} y2={58} color="#a1a1aa" />
          <Arrow x1={370} y1={96} x2={370} y2={58} color="#a1a1aa" />
          <Arrow x1={510} y1={96} x2={510} y2={58} color="#a1a1aa" />

          <Label x={90} y={112} text="x_1" size={13} weight="bold" />
          <Label x={230} y={112} text="x_2" size={13} weight="bold" />
          <Label x={370} y={112} text="x_3" size={13} weight="bold" />
          <Label x={510} y={112} text="x_4" size={13} weight="bold" />

          <Arrow x1={90} y1={128} x2={90} y2={152} color="#a1a1aa" />
          <Arrow x1={230} y1={128} x2={230} y2={152} color="#a1a1aa" />
          <Arrow x1={370} y1={128} x2={370} y2={152} color="#a1a1aa" />
          <Arrow x1={510} y1={128} x2={510} y2={152} color="#a1a1aa" />

          {/* ── Backward path (bottom) ── */}
          <GroupBox x={25} y={142} w={570} h={60} label="backward" color="violet" />
          <Box x={40} y={154} w={100} h={36} label="h1 bwd" color="violet" />
          <Box x={180} y={154} w={100} h={36} label="h2 bwd" color="violet" />
          <Box x={320} y={154} w={100} h={36} label="h3 bwd" color="violet" />
          <Box x={460} y={154} w={100} h={36} label="h4 bwd" color="violet" />
          <Arrow x1={460} y1={172} x2={420} y2={172} color="#8b5cf6" />
          <Arrow x1={320} y1={172} x2={280} y2={172} color="#8b5cf6" />
          <Arrow x1={180} y1={172} x2={140} y2={172} color="#8b5cf6" />

          {/* ── Concatenation label ── */}
          <Label x={310} y={232} text="h_t = [h_t fwd ; h_t bwd]   sortie = 2 * hidden_size" size={10} />
        </SvgDiagram>
        <p>
          On peut empiler 2-3 couches (Deep RNN). Au-dela, le gain est marginal.
        </p>
        <Warning>
          <p>
            Le Bi-LSTM ne peut <strong>pas</strong> generer du texte (autoregressif) :
            il a besoin de la sequence complete en entree. Parfait pour la
            classification, le NER, le POS tagging, l&apos;encodeur en traduction.
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 7. APPLICATIONS PRATIQUES                                     */}
      {/* ============================================================ */}
      <Section id="applications" number="07" title="Applications pratiques">
        <p>Trois cas d&apos;usage concrets avec du code PyTorch.</p>

        <h3 className="mt-4 text-lg font-semibold">LSTM — prediction de serie temporelle</h3>
        <Code language="python">{`class LSTMForecaster(nn.Module):
    def __init__(self, input_size=1, hidden=64, layers=2):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden, layers,
                            batch_first=True, dropout=0.2)
        self.fc = nn.Linear(hidden, 1)

    def forward(self, x):          # (batch, seq_len, 1)
        out, _ = self.lstm(x)
        return self.fc(out[:, -1])  # dernier pas -> prediction

# Fenetre glissante pour creer les sequences
def make_seqs(data, w=30):
    X = [data[i:i+w] for i in range(len(data)-w)]
    y = [data[i+w]   for i in range(len(data)-w)]
    return torch.tensor(X).unsqueeze(-1).float(), torch.tensor(y).float()`}</Code>

        <h3 className="mt-6 text-lg font-semibold">GRU — sentiment analysis</h3>
        <Code language="python">{`class GRUSentiment(nn.Module):
    def __init__(self, vocab_size, embed=128, hidden=128):
        super().__init__()
        self.emb = nn.Embedding(vocab_size, embed, padding_idx=0)
        self.gru = nn.GRU(embed, hidden, batch_first=True, bidirectional=True)
        self.head = nn.Sequential(
            nn.Dropout(0.3), nn.Linear(hidden*2, 64),
            nn.ReLU(), nn.Linear(64, 1), nn.Sigmoid())

    def forward(self, x):                       # (batch, seq_len)
        out, h = self.gru(self.emb(x))          # h: (2, batch, hidden)
        return self.head(torch.cat([h[0], h[1]], dim=1))`}</Code>

        <h3 className="mt-6 text-lg font-semibold">CharRNN — generation de texte</h3>
        <Code language="python">{`class CharRNN(nn.Module):
    def __init__(self, vocab_size, hidden=256, layers=2):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, hidden)
        self.lstm  = nn.LSTM(hidden, hidden, layers, batch_first=True)
        self.head  = nn.Linear(hidden, vocab_size)

    def forward(self, x, h=None):
        out, h = self.lstm(self.embed(x), h)
        return self.head(out), h

    @torch.no_grad()
    def generate(self, start, length=200, temp=0.8):
        idx = torch.tensor([[char2i[start]]])
        h, result = None, [start]
        for _ in range(length):
            logits, h = self(idx, h)
            p = torch.softmax(logits[:,-1] / temp, dim=-1)
            idx = torch.multinomial(p, 1)
            result.append(i2char[idx.item()])
        return "".join(result)`}</Code>
        <Remark>
          <p>
            Ce char-RNN est ce qu&apos;Andrej Karpathy a utilise dans &quot;The
            Unreasonable Effectiveness of Recurrent Neural Networks&quot; (2015)
            pour generer du Shakespeare et du code C.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 8. WERE RNNS ALL WE NEEDED? (2024)                           */}
      {/* ============================================================ */}
      <Section id="min-lstm" number="08" title="&quot;Were RNNs All We Needed?&quot; (2024)">
        <p>
          En 2024, Feng et al. proposent des versions simplifiees du LSTM et du
          GRU qui sont <strong>parallelisables</strong> sur GPU — le talon d&apos;Achille
          historique des RNNs.
        </p>
        <KeyConcept title="minLSTM et minGRU">
          <p>
            Les gates ne dependent plus de <Sub sub="t-1"><F>h</F></Sub>, seulement
            de <Sub sub="t"><F>x</F></Sub>. On peut calculer tous les gates en parallele,
            puis faire le scan sequentiel via un <strong>parallel prefix scan</strong>.
          </p>
        </KeyConcept>
        <Steps>
          <Step number="1" title="Gates sans etat cache">
            <Sub sub="t"><F>f</F></Sub> = sigma(<Sub sub="f"><F>W</F></Sub> <Sub sub="t"><F>x</F></Sub>) — plus de dependance a <Sub sub="t-1"><F>h</F></Sub>.
          </Step>
          <Step number="2" title="Pas d'output gate">
            <Sub sub="t"><F>h</F></Sub> = <Sub sub="t"><F>C</F></Sub> directement.
          </Step>
          <Step number="3" title="Normalisation">
            <Sub sub="t"><F>f&apos;</F></Sub> = <Sub sub="t"><F>f</F></Sub> / (<Sub sub="t"><F>f</F></Sub> + <Sub sub="t"><F>i</F></Sub>) pour stabiliser.
          </Step>
        </Steps>
        <ComparisonTable
          headers={["Critere", "LSTM classique", "minLSTM"]}
          rows={[
            ["Parametres", "~4d^2", "~d^2"],
            ["Entrainement", "Sequentiel", "Parallelisable"],
            ["Complexite", "O(T * d^2)", "O(T * d) parallelise"],
            ["Performance", "Reference", "Competitive"],
          ]}
        />
        <Warning>
          <p>
            Cet article ne dit pas que les RNNs remplacent les Transformers.
            Il montre que les architectures recurrentes simplifiees retrouvent
            une competitivite, avec un cout d&apos;inference <strong>lineaire</strong> en
            la longueur (vs quadratique pour l&apos;attention).
          </p>
        </Warning>
      </Section>

      {/* ============================================================ */}
      {/* 9. HYBRIDES MODERNES                                          */}
      {/* ============================================================ */}
      <Section id="hybrides" number="09" title="Architectures hybrides modernes">
        <p>
          En pratique, on melange les architectures pour exploiter les forces
          de chacune.
        </p>
        <p>
          <strong>CNN-LSTM</strong> : le CNN extrait des features locales, le LSTM
          capture les dependances temporelles. Ideal pour les series multivariees.
        </p>
        <p>
          <strong>LSTM + XGBoost</strong> : le LSTM produit des features temporelles
          (etats caches), XGBoost fait la prediction finale. Combine sequentiel +
          gradient boosting.
        </p>
        <p>
          <strong>Attention + RNN</strong> : le mecanisme d&apos;attention de
          Bahdanau (2014), ancetre direct des Transformers, permet au decodeur
          de &quot;regarder&quot; les bons pas de l&apos;encodeur.
        </p>
        <ComparisonTable
          headers={["Architecture", "Force", "Cas d'usage"]}
          rows={[
            ["LSTM pur", "Dependances longues, robuste", "Texte, audio, seq. longues"],
            ["GRU pur", "Rapide, moins de params", "Prototypage, datasets modestes"],
            ["Bi-LSTM", "Contexte bidirectionnel", "NER, POS tagging, classification"],
            ["CNN-LSTM", "Local + temporel", "Series multivariees, video"],
            ["LSTM + XGBoost", "Best of both worlds", "Finance, tabular + temporel"],
            ["Transformer", "Parallelisable, scalable", "NLP moderne, LLMs"],
          ]}
        />
        <Remark>
          <p>
            Malgre la domination des Transformers en NLP, les LSTMs restent
            pertinents pour les series temporelles, l&apos;embarque (edge),
            et les cas ou la latence d&apos;inference doit etre constante.
          </p>
        </Remark>
      </Section>

      {/* ============================================================ */}
      {/* 10. QUIZ FINAL                                                */}
      {/* ============================================================ */}
      <Section id="quiz" number="10" title="Quiz final">
        <Quiz
          question="Pourquoi un RNN vanilla echoue sur les dependances longues ?"
          options={[
            "Parce qu'il n'a pas assez de parametres",
            "Parce que le gradient disparait exponentiellement lors du BPTT",
            "Parce que tanh est trop lente a calculer",
            "Parce qu'il ne traite que des sequences de longueur fixe",
          ]}
          answer={1}
          explanation="Le produit repete de W_hh fait disparaitre les gradients exponentiellement. La derivee de tanh (< 1) aggrave le probleme a chaque pas."
        />
        <Quiz
          question="Quel mecanisme permet au LSTM de resoudre le vanishing gradient ?"
          options={[
            "L'utilisation de ReLU au lieu de tanh",
            "Le gradient clipping automatique",
            "Le cell state mis a jour par addition, creant une autoroute pour les gradients",
            "L'augmentation du nombre de couches",
          ]}
          answer={2}
          explanation="C_t = f_t * C_{t-1} + i_t * c~_t : l'operation additive permet aux gradients de circuler sans multiplication par W_hh a chaque pas."
        />
        <Quiz
          question="Quelle est la difference principale entre LSTM et GRU ?"
          options={[
            "Le GRU est plus precis mais plus lent",
            "Le GRU fusionne cell state et hidden state, et utilise 2 gates au lieu de 3",
            "Le GRU ne peut pas traiter les sequences longues",
            "Le GRU utilise ReLU au lieu de tanh",
          ]}
          answer={1}
          explanation="Le GRU a un seul etat (h_t) et 2 portes (reset + update) au lieu de 3, soit ~25% de parametres en moins pour des performances souvent comparables."
        />
        <Quiz
          question="Pourquoi un Bi-LSTM ne peut pas generer du texte autoregressif ?"
          options={[
            "Parce qu'il est trop lent",
            "Parce qu'il a besoin de la sequence complete (y compris le futur) en entree",
            "Parce qu'il n'a pas de couche de sortie",
            "Parce qu'il ne supporte pas le backpropagation",
          ]}
          answer={1}
          explanation="Le LSTM backward lit de droite a gauche — il a besoin de connaitre la fin. En generation, les mots futurs n'existent pas encore."
        />
        <Quiz
          question="Quelle innovation du minLSTM (2024) le rend parallelisable ?"
          options={[
            "Il utilise l'attention multi-tete",
            "Il remplace tanh par ReLU",
            "Les gates ne dependent plus de h_{t-1}, permettant un parallel prefix scan",
            "Il elimine completement les gates",
          ]}
          answer={2}
          explanation="Sans dependance a h_{t-1}, tous les gates se calculent en parallele. Le scan restant (cell state) se parallelise via prefix scan."
        />
      </Section>
    </>
  );
}
