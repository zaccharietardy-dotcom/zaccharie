"use client";

import {
  Section, Code, KeyConcept, Warning, Analogy, Quiz,
  Term, Steps, Step, ComparisonTable,
} from "@/components/course-elements";
import {
  SvgDiagram, Box, Circle, Arrow, Label, GroupBox,
} from "@/components/svg-diagrams";

export function GitGithub() {
  return (
    <>
      {/* ── 01 ── */}
      <Section id="pourquoi" number="01" title="Pourquoi Git est non-negociable">
        <p>
          En entreprise, <Term def="Version Control System — systeme qui enregistre chaque modification du code">Git</Term> n&apos;est
          pas un outil parmi d&apos;autres. C&apos;est <strong>le</strong> systeme nerveux de tout projet logiciel.
          Sans Git, impossible de travailler a plusieurs, de revenir en arriere, ou de deployer proprement.
        </p>
        <Analogy>
          Pense a Git comme un Google Docs pour le code, mais en beaucoup plus puissant.
          Chaque modification est tracee avec qui l&apos;a faite, quand, et pourquoi.
          Tu peux revenir a n&apos;importe quelle version passee. Et tu peux travailler hors-ligne
          puis synchroniser plus tard — parce que chaque developpeur a une copie complete du projet.
        </Analogy>
        <KeyConcept title="Ce que Git resout concretement">
          <strong>Sans Git :</strong> &quot;v2_final_FINAL_corrige.zip&quot;, des fichiers ecrases par un collegue,
          aucune idee de qui a casse quoi.<br />
          <strong>Avec Git :</strong> chaque changement est un point de sauvegarde (commit), chaque developpeur
          travaille sur sa propre branche, et tout est fusionnable de maniere controlee.
        </KeyConcept>
      </Section>

      {/* ── 02 ── */}
      <Section id="concepts" number="02" title="Les concepts fondamentaux">
        <p>
          Avant de taper des commandes, il faut comprendre <strong>3 concepts</strong> que les tutos survolent
          et qui causent 90% de la confusion.
        </p>

        <KeyConcept title="1. Un commit = une photo de TOUT le projet">
          <p>
            Un <Term def="Snapshot — photo instantanee de tous les fichiers du projet a un instant T">commit</Term> n&apos;est
            PAS &quot;les lignes qui ont change&quot;. C&apos;est une <strong>photo complete</strong> de tous tes fichiers
            a un instant T. Chaque commit a un identifiant unique (un hash SHA comme <code>a1b2c3d</code>),
            un auteur, une date, un message, et un pointeur vers le commit precedent (son parent).
          </p>
          <p>
            C&apos;est pour ca que Git peut revenir a n&apos;importe quel etat passe — chaque commit
            contient tout le projet, pas juste un diff.
          </p>
        </KeyConcept>

        <SvgDiagram width={600} height={140} title="Chaine de commits">
          <Circle cx={80} cy={70} r={28} label="a1b2" color="accent" />
          <Circle cx={220} cy={70} r={28} label="c3d4" color="accent" />
          <Circle cx={360} cy={70} r={28} label="e5f6" color="accent" />
          <Circle cx={500} cy={70} r={28} label="g7h8" color="violet" />
          <Arrow x1={108} y1={70} x2={192} y2={70} />
          <Arrow x1={248} y1={70} x2={332} y2={70} />
          <Arrow x1={388} y1={70} x2={472} y2={70} />
          <Label x={80} y={115} text="1er commit" size={10} />
          <Label x={500} y={115} text="dernier" size={10} />
          <Label x={500} y={30} text="HEAD" size={11} color="#8b5cf6" weight="bold" />
          <Arrow x1={500} y1={37} x2={500} y2={42} color="#8b5cf6" />
        </SvgDiagram>

        <KeyConcept title="2. HEAD = ou tu te trouves en ce moment">
          <p>
            <Term def="Pointeur vers le commit sur lequel tu travailles actuellement">HEAD</Term> pointe toujours
            vers le commit actuel — celui qui sera le parent de ton prochain commit. Quand tu fais
            <code>git switch</code>, tu deplace HEAD vers une autre branche. Quand tu fais <code>git commit</code>,
            HEAD avance d&apos;un cran.
          </p>
        </KeyConcept>

        <KeyConcept title="3. Les 3 zones de Git">
          <p>
            Tes fichiers existent dans 3 endroits distincts. Comprendre ce circuit est la cle de tout le reste.
          </p>
        </KeyConcept>

        <SvgDiagram width={700} height={200} title="Les 3 zones de Git">
          <Box x={30} y={50} w={180} h={80} label="Working Dir" sublabel="tes fichiers" color="default" />
          <Box x={260} y={50} w={180} h={80} label="Staging Area" sublabel="zone de preparation" color="amber" />
          <Box x={490} y={50} w={180} h={80} label="Repository" sublabel="historique (.git/)" color="accent" />
          <Arrow x1={210} y1={75} x2={260} y2={75} label="git add" />
          <Arrow x1={440} y1={75} x2={490} y2={75} label="git commit" />
          <Arrow x1={260} y1={110} x2={210} y2={110} label="git restore" dashed />
          <Arrow x1={490} y1={110} x2={440} y2={110} label="git restore --staged" dashed />
          <Label x={120} y={165} text="tu edites ici" size={10} />
          <Label x={350} y={165} text="tu prepares ici" size={10} />
          <Label x={580} y={165} text="c'est sauve ici" size={10} />
        </SvgDiagram>

        <p>
          <strong>Working Directory</strong> — tes fichiers tels que tu les vois dans ton editeur.
          Quand tu modifies un fichier, c&apos;est ici que ca se passe.
        </p>
        <p>
          <strong>Staging Area (Index)</strong> — la zone de preparation. Quand tu fais <code>git add</code>,
          tu dis a Git &quot;ce changement-la, je veux l&apos;inclure dans mon prochain commit&quot;.
          Tu peux add certains fichiers et pas d&apos;autres — c&apos;est ca la puissance du staging.
        </p>
        <p>
          <strong>Repository</strong> — l&apos;historique permanent, stocke dans le dossier <code>.git/</code>.
          Quand tu fais <code>git commit</code>, le contenu du staging est photographie et ajoute a l&apos;historique.
          C&apos;est irreversible (ou presque).
        </p>
      </Section>

      {/* ── 03 ── */}
      <Section id="commandes-base" number="03" title="Les commandes de base — une par une">
        <p>
          Chaque commande a un role precis. On les voit une par une avec ce qu&apos;elle fait <strong>concretement</strong>.
        </p>

        <Code language="bash — initialiser et configurer">{`# Creer un nouveau repo Git dans le dossier courant
git init
# Cree un dossier cache .git/ — c'est la que Git stocke tout.
# Sans .git/, pas de Git.

# Configurer ton identite (une seule fois par machine)
git config --global user.name "Zaccharie Tardy"
git config --global user.email "zaccharie.tardy@gmail.com"
# --global = pour tous tes projets. Sans --global = pour ce repo seulement.`}</Code>

        <Code language="bash — git status : comprendre l'etat de tes fichiers">{`git status

# Affiche 3 categories :
# 1. "Changes to be committed" (staging — pret a committer)
# 2. "Changes not staged for commit" (modifie mais pas encore add)
# 3. "Untracked files" (fichiers que Git ne connait pas encore)

# Flags utiles :
git status -s          # version courte (M = modifie, A = ajoute, ?? = non traque)
git status -b          # montre aussi la branche courante`}</Code>

        <Code language="bash — git add : preparer les changements">{`git add fichier.py           # ajouter un fichier specifique
git add src/utils.py tests/  # ajouter plusieurs fichiers/dossiers
git add .                    # ajouter TOUT (⚠️ dangereux, voir Warning)
git add -p                   # mode interactif : choisir morceau par morceau
                             # Git te montre chaque changement et tu dis y/n

# Ce que git add fait VRAIMENT :
# Il copie le fichier du Working Dir vers la Staging Area.
# Le fichier dans ton editeur ne bouge pas — c'est une copie.`}</Code>

        <Warning>
          <strong><code>git add .</code> est dangereux.</strong> Il ajoute TOUT, y compris des fichiers sensibles
          (.env, credentials.json) ou des fichiers lourds (node_modules/). Toujours faire <code>git status</code> avant
          pour verifier ce qui va etre ajoute. En entreprise, on prefere <code>git add fichier1 fichier2</code> explicitement.
        </Warning>

        <Code language="bash — git commit : sauvegarder">{`git commit -m "feat: ajouter le calcul de prix"
# -m = message en ligne. Sans -m, Git ouvre ton editeur (vim/nano/vscode).

# Ce que git commit fait VRAIMENT :
# 1. Prend une photo de tout ce qui est dans le staging
# 2. Cree un objet commit avec un hash unique, ton nom, la date, le message
# 3. Avance HEAD vers ce nouveau commit

# Flag courant :
git commit -am "fix: corriger le bug de prix"
# -a = add automatiquement TOUS les fichiers deja traqués qui ont change
# (ne fonctionne PAS pour les nouveaux fichiers — il faut git add d'abord)`}</Code>

        <Code language="bash — git log : voir l'historique">{`git log                      # historique complet (q pour quitter)
git log --oneline            # une ligne par commit (hash court + message)
git log --oneline --graph    # vue avec les branches dessinees en ASCII
git log -5                   # les 5 derniers commits
git log --author="Zac"       # filtrer par auteur
git log -- src/pricing.py    # historique d'un fichier specifique

# Lire un commit en detail :
git show a1b2c3d             # montre le contenu du commit (diff + metadata)`}</Code>

        <Code language="bash — git diff : voir ce qui a change">{`git diff                     # diff entre Working Dir et Staging
git diff --staged            # diff entre Staging et dernier commit
                             # (= ce qui sera dans le prochain commit)
git diff HEAD                # diff entre Working Dir et dernier commit
git diff main..feature       # diff entre deux branches
git diff a1b2c3d..e5f6g7h   # diff entre deux commits`}</Code>

        <Quiz
          question="Tu as modifie 3 fichiers. Tu fais git add sur 2 d'entre eux puis git commit. Que se passe-t-il ?"
          options={[
            "Les 3 fichiers sont commites",
            "Seuls les 2 fichiers ajoutes au staging sont commites, le 3e reste modifie",
            "Git refuse de committer si tout n'est pas add",
            "Le commit echoue",
          ]}
          answer={1}
          explanation="Seul le contenu du staging est commite. Le 3e fichier reste dans le Working Dir comme 'modifie mais non stage'. C'est justement le but du staging : choisir quoi committer."
        />
      </Section>

      {/* ── 04 ── */}
      <Section id="branches" number="04" title="Branches — le coeur du travail en equipe">
        <p>
          Une <Term def="Pointeur mobile vers un commit — creer une branche coute quasi rien">branche</Term> c&apos;est
          juste <strong>un post-it avec un nom colle sur un commit</strong>. Quand tu fais un nouveau commit
          sur cette branche, le post-it avance vers le nouveau commit. C&apos;est tout.
        </p>
        <p>
          <code>main</code> n&apos;a rien de special techniquement — c&apos;est juste la branche qu&apos;on a
          <strong>decide</strong> d&apos;appeler branche principale. On pourrait l&apos;appeler &quot;banane&quot;, ca marcherait pareil.
        </p>

        <SvgDiagram width={650} height={180} title="Qu'est-ce qu'une branche">
          <Label x={30} y={40} text="main" size={12} anchor="start" weight="bold" color="#10b981" />
          <Circle cx={120} cy={70} r={24} label="A" color="accent" />
          <Circle cx={220} cy={70} r={24} label="B" color="accent" />
          <Circle cx={320} cy={70} r={24} label="C" color="accent" />
          <Arrow x1={144} y1={70} x2={196} y2={70} />
          <Arrow x1={244} y1={70} x2={296} y2={70} />
          <Label x={30} y={140} text="feature" size={12} anchor="start" weight="bold" color="#8b5cf6" />
          <Circle cx={320} cy={140} r={24} label="D" color="violet" />
          <Circle cx={420} cy={140} r={24} label="E" color="violet" />
          <Arrow x1={320} y1={94} x2={320} y2={116} dashed />
          <Arrow x1={344} y1={140} x2={396} y2={140} />
          <Label x={420} y={105} text="HEAD" size={11} color="#f59e0b" weight="bold" />
          <Arrow x1={420} y1={110} x2={420} y2={116} color="#f59e0b" />
        </SvgDiagram>

        <Code language="bash — creer et naviguer entre les branches">{`# ── git switch : changer de branche (commande moderne, depuis Git 2.23)
git switch main              # basculer sur la branche main
git switch feature/pricing   # basculer sur feature/pricing
git switch -c feature/pricing  # -c = create : creer ET basculer en une commande

# ── git checkout : l'ancienne facon (fait la meme chose + d'autres trucs)
git checkout main            # basculer sur main (= git switch main)
git checkout -b feature/new  # -b = creer + basculer (= git switch -c)

# ⚠️ Pourquoi git switch a ete cree :
# git checkout faisait trop de choses (changer de branche, restaurer des fichiers,
# creer des branches...). git switch fait UNIQUEMENT le changement de branche.
# En entreprise, les deux marchent. Mais switch est plus clair.

# ── Lister les branches
git branch                   # branches locales seulement
git branch -a                # -a = all : locales + distantes (origin/main, etc.)
git branch -v                # -v = verbose : montre le dernier commit de chaque branche
git branch -d feature/done   # -d = delete : supprimer (refuse si non mergee)
git branch -D feature/test   # -D = force delete : supprimer meme si non mergee`}</Code>

        <KeyConcept title="Les flags les plus courants">
          <p>En Git, les flags (options) suivent une logique :</p>
          <p><code>-a</code> = all (tout), <code>-b</code> = branch, <code>-c</code> = create,
          <code>-d</code> = delete, <code>-D</code> = force delete,
          <code>-m</code> = message, <code>-p</code> = patch (interactif),
          <code>-u</code> = upstream (lier au remote), <code>-v</code> = verbose (details),
          <code>-f</code> = force.</p>
          <p>Un tiret = lettre courte (<code>-a</code>), deux tirets = mot complet (<code>--all</code>).
          <code>-a</code> et <code>--all</code> font la meme chose.</p>
        </KeyConcept>

        <KeyConcept title="Convention de nommage (entreprise)">
          <code>feature/nom-court</code> — nouvelle fonctionnalite<br />
          <code>fix/description-bug</code> — correction de bug<br />
          <code>hotfix/urgent</code> — fix critique en production<br />
          <code>chore/mise-a-jour</code> — maintenance<br />
          <code>release/v1.2.0</code> — preparation de release
        </KeyConcept>

        <Quiz
          question="Quelle est la difference entre git branch -d et git branch -D ?"
          options={[
            "Aucune, c'est la meme chose",
            "-d refuse de supprimer si non mergee, -D force la suppression",
            "-d supprime local, -D supprime aussi le remote",
            "-D est deprecie, utiliser -d",
          ]}
          answer={1}
          explanation="-d est safe : Git verifie que la branche est mergee avant de la supprimer. -D passe en force sans verifier — utile pour les branches experimentales qu'on abandonne."
        />
      </Section>

      {/* ── 05 ── */}
      <Section id="merge-rebase" number="05" title="Merge vs Rebase — comprendre la difference">
        <p>
          Tu as travaille sur une branche <code>feature</code>. Pendant ce temps, <code>main</code> a avance
          (d&apos;autres collegues ont merge leurs PRs). Il faut integrer ces changements.
          Deux options : <strong>merge</strong> ou <strong>rebase</strong>.
        </p>

        <h3 className="mt-8 mb-3 text-lg font-semibold">Merge : fusionner les historiques</h3>
        <p>
          <code>git merge</code> cree un <strong>commit de fusion</strong> qui a deux parents :
          le dernier commit de ta branche et le dernier de main. L&apos;historique garde la trace
          des deux branches.
        </p>

        <SvgDiagram width={650} height={200} title="git merge feature (depuis main)">
          <Label x={20} y={25} text="AVANT" size={11} weight="bold" color="#a1a1aa" />
          <Label x={20} y={55} text="main" size={11} anchor="start" color="#10b981" />
          <Circle cx={100} cy={55} r={18} label="A" color="accent" />
          <Circle cx={180} cy={55} r={18} label="B" color="accent" />
          <Circle cx={260} cy={55} r={18} label="C" color="accent" />
          <Arrow x1={118} y1={55} x2={162} y2={55} />
          <Arrow x1={198} y1={55} x2={242} y2={55} />
          <Label x={20} y={105} text="feature" size={11} anchor="start" color="#8b5cf6" />
          <Circle cx={180} cy={105} r={18} label="D" color="violet" />
          <Circle cx={260} cy={105} r={18} label="E" color="violet" />
          <Arrow x1={180} y1={73} x2={180} y2={87} dashed />
          <Arrow x1={198} y1={105} x2={242} y2={105} />

          <Label x={370} y={25} text="APRES git merge" size={11} weight="bold" color="#a1a1aa" />
          <Label x={370} y={55} text="main" size={11} anchor="start" color="#10b981" />
          <Circle cx={420} cy={55} r={18} label="A" color="accent" />
          <Circle cx={480} cy={55} r={18} label="B" color="accent" />
          <Circle cx={540} cy={55} r={18} label="C" color="accent" />
          <Circle cx={610} cy={80} r={18} label="M" color="cyan" />
          <Arrow x1={438} y1={55} x2={462} y2={55} />
          <Arrow x1={498} y1={55} x2={522} y2={55} />
          <Arrow x1={555} y1={62} x2={595} y2={73} />
          <Label x={370} y={130} text="feature" size={11} anchor="start" color="#8b5cf6" />
          <Circle cx={480} cy={130} r={18} label="D" color="violet" />
          <Circle cx={540} cy={130} r={18} label="E" color="violet" />
          <Arrow x1={498} y1={130} x2={522} y2={130} />
          <Arrow x1={555} y1={118} x2={595} y2={90} />
          <Label x={610} y={140} text="merge commit" size={9} color="#06b6d4" />
          <Label x={610} y={155} text="(2 parents)" size={9} color="#06b6d4" />
        </SvgDiagram>

        <h3 className="mt-8 mb-3 text-lg font-semibold">Rebase : rejouer tes commits sur main</h3>
        <p>
          <code>git rebase main</code> (depuis ta branche feature) prend tes commits D et E,
          les <strong>decolle</strong> de la ou ils etaient, et les <strong>recolle un par un</strong> au bout de main.
          Resultat : un historique lineaire, comme si tu avais commence a travailler apres C.
        </p>
        <p>
          Les commits D et E sont <strong>recrees</strong> avec de nouveaux hash — ce sont techniquement
          des copies (D&apos; et E&apos;). C&apos;est pour ca que le rebase &quot;reecrit l&apos;historique&quot;.
        </p>

        <SvgDiagram width={650} height={200} title="git rebase main (depuis feature)">
          <Label x={20} y={25} text="AVANT" size={11} weight="bold" color="#a1a1aa" />
          <Label x={20} y={55} text="main" size={11} anchor="start" color="#10b981" />
          <Circle cx={100} cy={55} r={18} label="A" color="accent" />
          <Circle cx={180} cy={55} r={18} label="B" color="accent" />
          <Circle cx={260} cy={55} r={18} label="C" color="accent" />
          <Arrow x1={118} y1={55} x2={162} y2={55} />
          <Arrow x1={198} y1={55} x2={242} y2={55} />
          <Label x={20} y={115} text="feature" size={11} anchor="start" color="#8b5cf6" />
          <Circle cx={180} cy={115} r={18} label="D" color="violet" />
          <Circle cx={260} cy={115} r={18} label="E" color="violet" />
          <Arrow x1={180} y1={73} x2={180} y2={97} dashed />
          <Arrow x1={198} y1={115} x2={242} y2={115} />

          <Label x={370} y={25} text="APRES git rebase" size={11} weight="bold" color="#a1a1aa" />
          <Label x={370} y={55} text="main" size={11} anchor="start" color="#10b981" />
          <Circle cx={420} cy={55} r={18} label="A" color="accent" />
          <Circle cx={480} cy={55} r={18} label="B" color="accent" />
          <Circle cx={540} cy={55} r={18} label="C" color="accent" />
          <Circle cx={600} cy={55} r={18} label="D'" color="violet" />
          <Arrow x1={438} y1={55} x2={462} y2={55} />
          <Arrow x1={498} y1={55} x2={522} y2={55} />
          <Arrow x1={558} y1={55} x2={582} y2={55} />
          <Label x={370} y={105} text="feature" size={11} anchor="start" color="#8b5cf6" />
          <Circle cx={600} cy={105} r={18} label="E'" color="violet" />
          <Arrow x1={600} y1={73} x2={600} y2={87} />
          <Label x={510} y={130} text="lineaire !" size={10} color="#10b981" weight="bold" />
        </SvgDiagram>

        <ComparisonTable
          headers={["", "Merge", "Rebase"]}
          rows={[
            ["Ce que ca fait", "Cree un commit de fusion a 2 parents", "Rejoue tes commits au bout de la cible"],
            ["Historique", "Non lineaire (branches visibles)", "Lineaire (comme si tu avais commence apres)"],
            ["Reecrit l'historique ?", "Non (safe)", "Oui (les hash des commits changent)"],
            ["Quand l'utiliser", "Merger une PR dans main", "Mettre ta branche perso a jour avec main"],
            ["Commande", "git switch main && git merge feature", "git switch feature && git rebase main"],
          ]}
        />

        <Code language="bash — merge et rebase en pratique">{`# ── Scenario : ta branche est en retard sur main

# Option 1 — Merge (safe, toujours ok)
git switch feature/pricing
git merge main                    # ramene les changements de main dans ta branche
# → cree un merge commit, pas grave

# Option 2 — Rebase (propre, mais branche PERSONNELLE seulement)
git switch feature/pricing
git rebase main                   # rejoue tes commits apres le dernier de main
# Si conflit : resoudre, puis :
git add .
git rebase --continue             # passer au commit suivant
# Si tu veux abandonner le rebase :
git rebase --abort                # revient a l'etat d'avant

# ── Squash merge : fusionner TOUS les commits en un seul
git switch main
git merge --squash feature/pricing
git commit -m "feat: pricing engine complet"
# → un seul commit propre dans main, meme si ta branche avait 15 commits`}</Code>

        <Warning>
          <strong>Regle d&apos;or : ne JAMAIS rebase une branche partagee.</strong> Si un collegue a push sur
          cette branche, le rebase va reecrire l&apos;historique que ton collegue connait. Au prochain pull,
          c&apos;est le chaos — conflits partout, commits dupliques. En cas de doute : merge.
        </Warning>

        <Quiz
          question="Tu travailles seul sur feature/search depuis 2 jours. Main a avance. Que fais-tu ?"
          options={[
            "git merge main (depuis feature/search)",
            "git rebase main (depuis feature/search)",
            "git reset --hard origin/main",
            "git cherry-pick main",
          ]}
          answer={1}
          explanation="Tu es seul sur cette branche → rebase est safe et donne un historique propre. Si la branche etait partagee, on ferait un merge."
        />
      </Section>

      {/* ── 06 ── */}
      <Section id="conflits" number="06" title="Resoudre les conflits sans paniquer">
        <p>
          Un conflit arrive quand deux personnes ont modifie <strong>les memes lignes du meme fichier</strong>.
          Git ne peut pas deviner quelle version garder — il te demande de choisir.
        </p>

        <Code language="text — anatomie d'un conflit">{`<<<<<<< HEAD
prix = calculer_prix(produit, quantite)
=======
prix = get_price(product, qty)
>>>>>>> feature/refactor

# <<<<<<< HEAD         = ta version (la branche ou tu es)
# =======              = separateur
# >>>>>>> feature/...  = leur version (la branche qu'on merge/rebase)

# Tu dois :
# 1. Choisir une version, l'autre, ou combiner les deux
# 2. Supprimer les marqueurs <<<, ===, >>>
# 3. Sauvegarder le fichier`}</Code>

        <Steps>
          <Step number="1" title="Identifier les fichiers en conflit">
            <code>git status</code> montre les fichiers &quot;both modified&quot; en rouge.
          </Step>
          <Step number="2" title="Ouvrir et resoudre">
            VS Code montre les conflits en couleur avec des boutons &quot;Accept Current&quot; / &quot;Accept Incoming&quot; /
            &quot;Accept Both&quot;. Sinon, editer a la main.
          </Step>
          <Step number="3" title="Marquer comme resolu">
            <code>git add fichier-resolu.py</code> — ca dit a Git &quot;j&apos;ai resolu ce conflit&quot;.
          </Step>
          <Step number="4" title="Finaliser">
            Si merge : <code>git commit</code> (Git propose un message automatique).<br />
            Si rebase : <code>git rebase --continue</code> (passe au commit suivant).
          </Step>
        </Steps>
      </Section>

      {/* ── 07 ── */}
      <Section id="remote" number="07" title="Remotes, push, pull, fetch">
        <p>
          Un <Term def="Copie du repo hebergee sur un serveur (GitHub, GitLab...)">remote</Term> est la version
          du projet hebergee sur un serveur. Par convention, le remote principal s&apos;appelle <code>origin</code>.
        </p>

        <SvgDiagram width={700} height={200} title="Local vs Remote">
          <GroupBox x={20} y={15} w={300} h={170} label="TON ORDI" color="accent" />
          <Box x={40} y={50} w={120} h={50} label="main" sublabel="local" color="accent" />
          <Box x={180} y={50} w={120} h={50} label="feature" sublabel="local" color="violet" />
          <Box x={110} y={120} w={120} h={50} label="staging" sublabel="+ working dir" color="default" />

          <GroupBox x={400} y={15} w={280} h={170} label="GITHUB (origin)" color="amber" />
          <Box x={420} y={50} w={120} h={50} label="main" sublabel="origin/main" color="amber" />
          <Box x={560} y={50} w={100} h={50} label="feature" sublabel="origin/feature" color="amber" />

          <Arrow x1={320} y1={70} x2={400} y2={70} label="git push" />
          <Arrow x1={400} y1={90} x2={320} y2={90} label="git fetch" dashed />
        </SvgDiagram>

        <Code language="bash — travailler avec les remotes">{`# ── Cloner un repo (telecharge tout + configure origin)
git clone git@github.com:user/projet.git

# ── Voir les remotes configures
git remote -v                    # -v = verbose : montre les URLs

# ── Pousser ta branche vers le remote
git push                         # pousse la branche courante (si deja liee)
git push -u origin feature/pricing
# -u = --set-upstream : lie ta branche locale a origin/feature/pricing
# Apres ca, un simple "git push" suffit.

# ── Recuperer les changements
git fetch                        # telecharge les nouveaux commits du remote
                                 # SANS modifier tes fichiers locaux
git pull                         # = git fetch + git merge
git pull --rebase                # = git fetch + git rebase (plus propre)

# ── Difference fondamentale :
# fetch = "dis-moi ce qui a change" (read-only, safe)
# pull  = "dis-moi ce qui a change ET applique-le" (modifie ton code)`}</Code>

        <ComparisonTable
          headers={["", "GitHub", "GitLab", "Bitbucket"]}
          rows={[
            ["CI/CD", "GitHub Actions", "GitLab CI (integre)", "Pipelines"],
            ["Gratuit", "Repos publics illimites", "Prives illimites + 400min CI/mois", "5 users"],
            ["Force", "Communaute, Actions, Copilot", "DevOps complet, self-hosted", "Jira/Confluence"],
          ]}
        />
      </Section>

      {/* ── 08 ── */}
      <Section id="workflow" number="08" title="Workflows d'equipe en entreprise">
        <p>
          Chaque equipe choisit un workflow. En voici 3 — du plus simple au plus structure.
        </p>

        <KeyConcept title="GitHub Flow (le plus courant)">
          <code>main</code> est <strong>toujours deployable</strong>. Pour chaque changement :<br />
          1. Creer une branche depuis main<br />
          2. Faire tes commits<br />
          3. Ouvrir une Pull Request<br />
          4. Code review par un collegue<br />
          5. Merge dans main → deploy automatique
        </KeyConcept>

        <SvgDiagram width={650} height={200} title="GitHub Flow en action">
          <Label x={20} y={30} text="main" size={12} anchor="start" weight="bold" color="#10b981" />
          <Circle cx={80} cy={50} r={20} label="A" color="accent" />
          <Circle cx={160} cy={50} r={20} label="B" color="accent" />
          <Circle cx={400} cy={50} r={20} label="E" color="cyan" />
          <Circle cx={480} cy={50} r={20} label="F" color="accent" />
          <Arrow x1={100} y1={50} x2={140} y2={50} />
          <Arrow x1={180} y1={50} x2={380} y2={50} dashed />
          <Arrow x1={420} y1={50} x2={460} y2={50} />
          <Label x={20} y={130} text="feature" size={12} anchor="start" weight="bold" color="#8b5cf6" />
          <Circle cx={240} cy={130} r={20} label="C" color="violet" />
          <Circle cx={320} cy={130} r={20} label="D" color="violet" />
          <Arrow x1={175} y1={63} x2={223} y2={117} />
          <Arrow x1={260} y1={130} x2={300} y2={130} />
          <Arrow x1={337} y1={117} x2={383} y2={63} />
          <Label x={280} y={170} text="PR + review + merge" size={10} color="#8b5cf6" />
          <Label x={400} y={20} text="merge" size={10} color="#06b6d4" />
        </SvgDiagram>

        <KeyConcept title="GitFlow (pour les releases planifiees)">
          Branches <code>main</code> (production), <code>develop</code> (integration),
          <code>feature/*</code>, <code>release/*</code>, <code>hotfix/*</code>.
          Plus complexe — adapte aux apps mobiles ou enterprise avec des cycles de release.
        </KeyConcept>

        <KeyConcept title="Trunk-Based Development (pour le CD haute frequence)">
          Tout le monde push sur <code>main</code> (ou via des branches tres courtes, moins d&apos;1 jour).
          Feature flags pour cacher le code pas fini. Utilise par Google et Meta.
        </KeyConcept>
      </Section>

      {/* ── 09 ── */}
      <Section id="pr-review" number="09" title="Pull Requests et Code Review">
        <p>
          La <Term def="Demande d'integration de ta branche dans main, avec revue de code">Pull Request</Term> (PR
          sur GitHub, Merge Request sur GitLab) est le mecanisme central de qualite.
        </p>

        <Steps>
          <Step number="1" title="Creer une bonne PR">
            Titre clair (<code>feat: add pricing engine</code>). Description avec le contexte,
            ce qui a change, et comment tester. Lier le ticket/issue (<code>Fixes #42</code>).
          </Step>
          <Step number="2" title="Garder les PRs petites">
            Moins de 400 lignes de diff. Une grosse PR = review superficielle = bugs en production.
          </Step>
          <Step number="3" title="Reviewer du code">
            Chercher : bugs logiques, edge cases, securite, lisibilite, tests manquants.
            Etre constructif — proposer des alternatives, pas juste critiquer.
          </Step>
          <Step number="4" title="Merger">
            Apres approbation(s), merger. Squash merge pour un historique propre.
          </Step>
        </Steps>

        <Code language="bash — GitHub CLI (gh)">{`# Creer une PR
gh pr create --title "feat: pricing engine" --body "Fixes #42"

# Lister les PRs ouvertes
gh pr list

# Tester une PR localement
gh pr checkout 123

# Approuver
gh pr review 123 --approve`}</Code>

        <Warning>
          En entreprise, <strong>ne JAMAIS push directement sur main</strong>. Configurer des branch protection rules :
          require PR, require 1+ approbation, require CI verte.
        </Warning>
      </Section>

      {/* ── 10 ── */}
      <Section id="ci-cd" number="10" title="CI/CD — automatiser les verifications">
        <p>
          La <Term def="Continuous Integration / Continuous Deployment">CI/CD</Term> execute
          automatiquement des tests, du linting et des deployments a chaque push.
        </p>

        <SvgDiagram width={700} height={140} title="Pipeline CI/CD typique">
          <Box x={20} y={45} w={100} h={50} label="Push" color="default" />
          <Box x={150} y={45} w={100} h={50} label="Lint" color="violet" />
          <Box x={280} y={45} w={100} h={50} label="Tests" color="violet" />
          <Box x={410} y={45} w={100} h={50} label="Build" color="violet" />
          <Box x={540} y={45} w={130} h={50} label="Deploy" sublabel="(si main)" color="accent" />
          <Arrow x1={120} y1={70} x2={150} y2={70} />
          <Arrow x1={250} y1={70} x2={280} y2={70} />
          <Arrow x1={380} y1={70} x2={410} y2={70} />
          <Arrow x1={510} y1={70} x2={540} y2={70} />
        </SvgDiagram>

        <Code language="yaml — GitHub Actions (exemple)">{`# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci          # installe les deps
      - run: npm run lint    # verifie le style
      - run: npm test        # lance les tests
      - run: npm run build   # verifie que ca compile`}</Code>
      </Section>

      {/* ── 11 ── */}
      <Section id="commandes-avancees" number="11" title="Commandes avancees">
        <p>
          Les commandes qui separent le junior du senior en situation reelle.
        </p>

        <Code language="bash — stash : mettre de cote du travail en cours">{`# Scenario : tu bosses sur feature/pricing mais on te demande un fix urgent sur main.
# Probleme : tu as des changements non commites. git switch main va refuser.

git stash                          # met de cote TOUS les changements non commites
git switch main                    # maintenant tu peux changer de branche
# ... tu fais ton fix, tu commites, tu reviens ...
git switch feature/pricing
git stash pop                      # recupere tes changements mis de cote

# Variantes :
git stash list                     # voir tous les stashes
git stash apply stash@{2}          # appliquer un stash specifique sans le supprimer
git stash drop stash@{0}           # supprimer un stash`}</Code>

        <Code language="bash — reset : revenir en arriere">{`# 3 niveaux de reset (du moins au plus destructeur) :

git reset --soft HEAD~1
# Annule le dernier commit MAIS garde les fichiers dans le staging.
# Utile pour : refaire un commit avec un meilleur message.

git reset --mixed HEAD~1           # (c'est le defaut, --mixed est implicite)
# Annule le dernier commit ET enleve du staging, mais garde les fichiers modifies.
# Utile pour : re-organiser ce qu'on veut committer.

git reset --hard HEAD~1
# Annule le dernier commit ET supprime toutes les modifications.
# ⚠️ DESTRUCTEUR — les changements sont perdus (sauf via reflog).

# HEAD~1 = "un commit en arriere"
# HEAD~3 = "trois commits en arriere"
# On peut aussi utiliser un hash : git reset --soft a1b2c3d`}</Code>

        <SvgDiagram width={650} height={160} title="Les 3 niveaux de reset">
          <Box x={20} y={55} w={180} h={50} label="--soft" sublabel="garde staged" color="accent" />
          <Box x={235} y={55} w={180} h={50} label="--mixed" sublabel="garde modifie" color="amber" />
          <Box x={450} y={55} w={180} h={50} label="--hard" sublabel="supprime tout" color="rose" />
          <Arrow x1={200} y1={80} x2={235} y2={80} />
          <Arrow x1={415} y1={80} x2={450} y2={80} />
          <Label x={110} y={40} text="safe" size={10} color="#10b981" weight="bold" />
          <Label x={540} y={40} text="dangereux" size={10} color="#f43f5e" weight="bold" />
        </SvgDiagram>

        <Code language="bash — cherry-pick, bisect, blame, reflog">{`# ── Cherry-pick : prendre UN commit d'une autre branche
git cherry-pick a1b2c3d            # applique ce commit sur ta branche actuelle
# Utile pour : porter un hotfix de main vers une branche de release.

# ── Bisect : trouver QUEL commit a casse quelque chose
git bisect start
git bisect bad                     # "le commit actuel est bugge"
git bisect good v1.0.0             # "ce tag marchait bien"
# Git te checkout des commits au milieu — tu testes et dis good/bad
# En ~7 etapes, il trouve le commit coupable parmi 100+ commits.

# ── Blame : qui a ecrit cette ligne ?
git blame fichier.py               # chaque ligne avec auteur + date + commit

# ── Reflog : ton filet de securite (historique de TOUS les mouvements de HEAD)
git reflog                         # voir les 30 derniers mouvements
# Meme apres un reset --hard, le commit est encore dans le reflog pendant 90 jours.
git checkout HEAD@{5}              # revenir a un etat precedent`}</Code>

        <Quiz
          question="Tu as fait git reset --hard par erreur et perdu 3 commits. Comment les recuperer ?"
          options={[
            "C'est perdu pour toujours",
            "git reflog puis git reset --hard sur le bon SHA",
            "git log --all",
            "git stash pop",
          ]}
          answer={1}
          explanation="git reflog garde un historique de toutes les positions de HEAD pendant 90 jours. Tu trouves le SHA du commit perdu et tu fais git reset --hard <SHA>."
        />
      </Section>

      {/* ── 12 ── */}
      <Section id="gitignore" number="12" title=".gitignore et bonnes pratiques">

        <Code language="text — .gitignore typique">{`# Dependencies
node_modules/
venv/
__pycache__/

# Build
dist/
build/
.next/

# Secrets (CRITIQUE)
.env
.env.local
*.pem
credentials.json

# IDE
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db`}</Code>

        <KeyConcept title="Commits : les regles d'or">
          <strong>1. Atomique</strong> — un commit = un changement logique. Pas &quot;fix tout&quot;.<br />
          <strong>2. Message conventionnel</strong> — <code>feat:</code> <code>fix:</code> <code>chore:</code> <code>docs:</code> <code>refactor:</code><br />
          <strong>3. Jamais de secrets</strong> — .env dans .gitignore. Si un secret est commite,
          le considerer comme compromis et le changer immediatement.
        </KeyConcept>
      </Section>

      {/* ── 13 ── */}
      <Section id="scenario" number="13" title="Scenario complet — une journee type">
        <p>
          Voici exactement ce que tu fais quand tu arrives le matin sur un projet en equipe.
        </p>

        <Code language="bash — ta journee type en entreprise">{`# 1. Mettre a jour main
git switch main
git pull                           # recuperer les derniers changements

# 2. Creer ta branche
git switch -c feature/user-search

# 3. Coder, tester, committer
# ... tu codes ...
git status                         # verifier ce qui a change
git diff                           # voir les changements en detail
git add src/search.py tests/test_search.py
git commit -m "feat: add user search endpoint"

# ... tu continues ...
git add src/search.py
git commit -m "feat: add pagination to search"

# 4. Mettre a jour avec main (d'autres ont peut-etre merge entre-temps)
git fetch
git rebase origin/main             # rebase car ta branche est perso

# 5. Pousser ta branche
git push -u origin feature/user-search

# 6. Creer une PR (sur GitHub)
gh pr create --title "feat: user search" --body "Adds search with pagination. Fixes #38"

# 7. Attendre la review, corriger si besoin, merge

# 8. Nettoyer
git switch main
git pull
git branch -d feature/user-search  # supprimer la branche locale`}</Code>
      </Section>

      {/* ── 14 ── */}
      <Section id="quiz" number="14" title="Quiz final">
        <Quiz
          question="Quelle est la difference entre git fetch et git pull ?"
          options={[
            "Aucune",
            "fetch telecharge sans modifier tes fichiers, pull telecharge ET merge",
            "fetch est pour GitHub, pull pour GitLab",
            "pull telecharge les branches, fetch les tags",
          ]}
          answer={1}
          explanation="fetch telecharge les nouveaux objets du remote sans toucher a ton code. pull = fetch + merge (ou rebase avec --rebase)."
        />
        <Quiz
          question="Que fait l'option -u dans git push -u origin feature ?"
          options={[
            "Force le push",
            "Lie ta branche locale au remote pour les futurs push/pull",
            "Push sur tous les remotes",
            "Update le remote",
          ]}
          answer={1}
          explanation="-u (--set-upstream) lie ta branche locale a la branche distante. Apres ca, tu peux juste taper 'git push' sans preciser origin et la branche."
        />
        <Quiz
          question="Tu as 5 petits commits sur ta branche perso. Tu veux les fusionner en un seul avant la PR. Que fais-tu ?"
          options={[
            "git merge --squash",
            "git rebase -i HEAD~5 et squash les commits",
            "git reset --hard HEAD~5",
            "git commit --amend 5 fois",
          ]}
          answer={1}
          explanation="git rebase -i (interactif) te permet de choisir quels commits garder, squash, ou editer. Tu marques 4 commits en 'squash' et tu gardes le premier en 'pick'. Resultat : un seul commit propre."
        />
        <Quiz
          question="Un collegue a push un .env avec des cles API sur GitHub. Priorite numero 1 ?"
          options={[
            "Supprimer le fichier et committer",
            "Rotater (changer) toutes les cles immediatement",
            "git revert le commit",
            "Supprimer le repo",
          ]}
          answer={1}
          explanation="Meme si tu supprimes le fichier, il reste dans l'historique Git et peut avoir ete clone par n'importe qui. La priorite est de changer les cles, puis nettoyer l'historique."
        />
      </Section>
    </>
  );
}
