"use client";

import {
  Section, Code, KeyConcept, Warning, Analogy, Quiz,
  Diagram, Term, Steps, Step, ComparisonTable,
} from "@/components/course-elements";

export function GitGithub() {
  return (
    <>
      {/* ── 01 ── */}
      <Section id="pourquoi" number="01" title="Pourquoi Git est indispensable">
        <p>
          En entreprise, <Term def="Version Control System — systeme qui enregistre chaque modification du code">Git</Term> n&apos;est
          pas optionnel. C&apos;est le systeme nerveux de tout projet logiciel : il permet a des dizaines de developpeurs
          de travailler simultanement sur le meme code sans se marcher dessus.
        </p>
        <Analogy>
          Imagine un Google Docs pour le code, mais en 1000x plus puissant : chaque modification est tracee,
          chaque version est recuperable, et tu peux travailler hors-ligne puis synchroniser plus tard.
        </Analogy>
        <KeyConcept title="Les 3 piliers du travail en equipe">
          <strong>1. Traçabilite</strong> — qui a modifie quoi, quand, et pourquoi (git log, git blame).<br />
          <strong>2. Collaboration</strong> — branches, merge requests, code review.<br />
          <strong>3. Securite</strong> — chaque developpeur a une copie complete du projet (distribue).
        </KeyConcept>
      </Section>

      {/* ── 02 ── */}
      <Section id="fondamentaux" number="02" title="Les fondamentaux — init, add, commit">
        <p>
          Git fonctionne avec 3 zones : le <Term def="Ton repertoire de fichiers, la ou tu edites">working directory</Term>,
          la <Term def="Zone de preparation avant un commit">staging area</Term> (index),
          et le <Term def="L'historique permanent des snapshots">repository</Term>.
        </p>
        <Diagram title="Les 3 zones de Git">
{`  Working Directory    Staging Area (Index)    Repository (.git)
  ┌────────────────┐   ┌──────────────────┐   ┌─────────────────┐
  │  edit files     │──▶│  git add          │──▶│  git commit      │
  │                 │   │                  │   │                 │
  │                 │◀──│  git restore      │   │  git log         │
  └────────────────┘   └──────────────────┘   └─────────────────┘`}
        </Diagram>
        <Code language="bash — les commandes de base">{`# Initialiser un repo
git init

# Voir l'etat actuel
git status

# Ajouter des fichiers au staging
git add fichier.py           # un fichier specifique
git add src/                 # un dossier entier
git add -p                   # mode interactif (choisir hunk par hunk)

# Committer
git commit -m "feat: ajouter le calcul de prix"

# Voir l'historique
git log --oneline --graph    # vue compacte avec branches
git log -5                   # les 5 derniers commits`}</Code>
        <Warning>
          <strong>Ne jamais faire <code>git add .</code> aveuglément.</strong> Tu risques de committer des fichiers
          sensibles (.env, credentials) ou des binaires. Toujours verifier avec <code>git status</code> avant.
        </Warning>
        <Quiz
          question="Quelle commande permet de voir exactement ce qui va etre committe ?"
          options={[
            "git status",
            "git diff --staged",
            "git log",
            "git show",
          ]}
          answer={1}
          explanation="git diff --staged (ou --cached) montre les differences entre le staging et le dernier commit — exactement ce qui sera dans le prochain commit."
        />
      </Section>

      {/* ── 03 ── */}
      <Section id="branches" number="03" title="Branches — le coeur du workflow">
        <p>
          Une <Term def="Un pointeur mobile vers un commit">branche</Term> est juste un pointeur vers un commit.
          Creer une branche coute quasi rien — c&apos;est pourquoi on en cree une pour chaque feature, bugfix, ou experiment.
        </p>
        <Diagram title="Branching et merge">
{`  main:     A───B───C───────F (merge commit)
                 \\         /
  feature:        D───E───┘`}
        </Diagram>
        <Code language="bash — gestion des branches">{`# Creer et basculer sur une nouvelle branche
git switch -c feature/pricing       # methode moderne
git checkout -b feature/pricing     # ancienne methode (marche toujours)

# Lister les branches
git branch -a                       # locales + remotes

# Basculer entre branches
git switch main

# Supprimer une branche mergee
git branch -d feature/pricing

# Forcer la suppression (non mergee)
git branch -D experiment/test`}</Code>
        <KeyConcept title="Convention de nommage des branches (entreprise)">
          <code>feature/nom-court</code> — nouvelle fonctionnalite<br />
          <code>fix/description-bug</code> — correction de bug<br />
          <code>hotfix/urgent</code> — fix critique en production<br />
          <code>chore/mise-a-jour</code> — maintenance (deps, CI, docs)<br />
          <code>release/v1.2.0</code> — preparation de release
        </KeyConcept>
      </Section>

      {/* ── 04 ── */}
      <Section id="merge-rebase" number="04" title="Merge vs Rebase — le grand debat">
        <p>
          Deux strategies pour integrer les changements d&apos;une branche dans une autre.
          Les deux sont valides, mais les equipes choisissent generalement une convention.
        </p>
        <ComparisonTable
          headers={["", "Merge", "Rebase"]}
          rows={[
            ["Historique", "Preserve tout (commits + merge commit)", "Lineaire, propre"],
            ["Commande", "git merge feature", "git rebase main (depuis feature)"],
            ["Conflits", "A resoudre une fois", "A resoudre commit par commit"],
            ["Regle d'or", "Safe sur branches partagees", "JAMAIS sur une branche publique/partagee"],
            ["Usage typique", "Merge PR dans main", "Mettre sa branche a jour avant PR"],
          ]}
        />
        <Code language="bash — merge et rebase en pratique">{`# Merge : integrer feature dans main
git switch main
git merge feature/pricing

# Rebase : mettre feature a jour avec main
git switch feature/pricing
git rebase main
# Si conflits : resoudre, puis git rebase --continue

# Squash merge : fusionner tous les commits en un seul
git merge --squash feature/pricing
git commit -m "feat: pricing engine complet"`}</Code>
        <Warning>
          <strong>Regle absolue : ne JAMAIS rebase une branche sur laquelle d&apos;autres personnes travaillent.</strong> Le
          rebase reecrit l&apos;historique — si un collegue a base son travail sur l&apos;ancien historique, c&apos;est le chaos.
        </Warning>
        <Quiz
          question="Ton collegue a push sur la branche 'feature/auth'. Tu veux la mettre a jour avec main. Que fais-tu ?"
          options={[
            "git rebase main (depuis feature/auth)",
            "git merge main (depuis feature/auth)",
            "git reset --hard main",
            "git cherry-pick main",
          ]}
          answer={1}
          explanation="Comme la branche est partagee (ton collegue a push dessus), tu fais un merge pour ne pas reecrire l'historique. Le rebase est reserve aux branches personnelles."
        />
      </Section>

      {/* ── 05 ── */}
      <Section id="conflits" number="05" title="Resoudre les conflits comme un pro">
        <p>
          Les conflits arrivent quand deux personnes modifient les memes lignes. Pas de panique — Git te montre
          exactement ou est le probleme.
        </p>
        <Code language="text — anatomie d'un conflit">{`<<<<<<< HEAD (ta version)
prix = calculer_prix(produit, quantite)
=======
prix = get_price(product, qty)
>>>>>>> feature/refactor (la leur)

# Tu dois choisir : garder une version, l'autre, ou combiner.
# Puis supprimer les marqueurs <<<, ===, >>>`}</Code>
        <Steps>
          <Step number="1" title="Identifier les fichiers en conflit">
            <code>git status</code> — les fichiers en conflit sont marques &quot;both modified&quot;.
          </Step>
          <Step number="2" title="Ouvrir et resoudre">
            Editer chaque fichier, choisir la bonne version, supprimer les marqueurs.
            Les IDE modernes (VS Code, JetBrains) ont des outils visuels tres utiles.
          </Step>
          <Step number="3" title="Marquer comme resolu">
            <code>git add fichier-resolu.py</code>
          </Step>
          <Step number="4" title="Finaliser">
            <code>git commit</code> (merge) ou <code>git rebase --continue</code> (rebase).
          </Step>
        </Steps>
        <KeyConcept title="Astuce pro : git rerere">
          Active <code>git config --global rerere.enabled true</code>. Git memorise comment tu as resolu un conflit
          et l&apos;applique automatiquement si le meme conflit se reproduit. Indispensable en rebase frequents.
        </KeyConcept>
      </Section>

      {/* ── 06 ── */}
      <Section id="remote" number="06" title="Remotes — GitHub, GitLab, Bitbucket">
        <p>
          Un <Term def="Copie du repo hebergee sur un serveur (GitHub, GitLab, etc.)">remote</Term> est la copie
          partagee du projet. C&apos;est le point de synchronisation entre tous les developpeurs.
        </p>
        <Code language="bash — travailler avec les remotes">{`# Cloner un repo existant
git clone git@github.com:user/projet.git

# Voir les remotes
git remote -v

# Pousser sa branche
git push -u origin feature/pricing   # -u pour lier la branche locale au remote

# Recuperer les changements
git fetch                            # telecharger sans merger
git pull                             # fetch + merge (ou --rebase pour fetch + rebase)

# Ajouter un remote supplementaire (fork, upstream)
git remote add upstream git@github.com:orga/projet.git
git fetch upstream`}</Code>
        <ComparisonTable
          headers={["", "GitHub", "GitLab", "Bitbucket"]}
          rows={[
            ["Modele", "SaaS (cloud)", "SaaS ou self-hosted", "SaaS (Atlassian)"],
            ["CI/CD", "GitHub Actions", "GitLab CI (integre)", "Bitbucket Pipelines"],
            ["Gratuit", "Repos publics illimites", "Repos prives illimites + 400min CI/mois", "5 users gratuits"],
            ["Forces", "Communaute, Actions, Copilot", "DevOps complet, self-hosted", "Integration Jira/Confluence"],
            ["Usage", "Open source, startups", "Entreprises (DevSecOps)", "Equipes Atlassian"],
          ]}
        />
      </Section>

      {/* ── 07 ── */}
      <Section id="workflow" number="07" title="Workflows d'equipe en entreprise">
        <p>
          Chaque equipe adopte un workflow. Les 3 plus courants :
        </p>
        <KeyConcept title="1. GitHub Flow (le plus simple)">
          <code>main</code> est toujours deployable. Pour chaque changement : creer une branche → commits →
          ouvrir une Pull Request → code review → merge dans main → deploy automatique.
          Ideal pour les equipes qui deployent en continu.
        </KeyConcept>
        <KeyConcept title="2. GitFlow (le plus structure)">
          Branches <code>main</code> (production), <code>develop</code> (integration),
          <code>feature/*</code>, <code>release/*</code>, <code>hotfix/*</code>.
          Plus complexe, adapte aux releases planifiees (mobile, enterprise).
        </KeyConcept>
        <KeyConcept title="3. Trunk-Based Development">
          Tout le monde push sur <code>main</code> (ou via des branches tres courtes, &lt;1 jour).
          Feature flags pour cacher le code pas fini. Utilise par Google, Meta, et les equipes qui
          pratiquent le continuous deployment.
        </KeyConcept>
        <Diagram title="GitHub Flow">
{`  main:     A───B───────D───E───────G
                \\       /       \\   /
  feat-1:        C─────┘         F─┘
                PR #1           PR #2`}
        </Diagram>
        <Quiz
          question="Ton equipe deploie 10 fois par jour en production. Quel workflow est le plus adapte ?"
          options={[
            "GitFlow avec branches release",
            "Trunk-Based Development",
            "GitHub Flow",
            "Chacun push sur main sans PR",
          ]}
          answer={1}
          explanation="Trunk-Based Development est concu pour le deploiement continu a haute frequence. GitHub Flow fonctionne aussi mais avec des PRs plus longues. GitFlow est trop lourd pour 10 deploys/jour."
        />
      </Section>

      {/* ── 08 ── */}
      <Section id="pr-review" number="08" title="Pull Requests et Code Review">
        <p>
          La <Term def="Demande d'integration de ta branche dans main, avec revue de code par tes pairs">Pull Request</Term> (ou
          Merge Request sur GitLab) est le mecanisme central de collaboration. C&apos;est la que la qualite du code se joue.
        </p>
        <Steps>
          <Step number="1" title="Creer une bonne PR">
            Titre clair et concis. Description avec le contexte (pourquoi ce changement), ce qui a change,
            et comment tester. Lier le ticket/issue.
          </Step>
          <Step number="2" title="Garder les PRs petites">
            &lt;400 lignes de diff idealement. Une grosse PR = review superficielle = bugs en production.
            Decouper en plusieurs PRs si necessaire.
          </Step>
          <Step number="3" title="Reviewer du code">
            Chercher : bugs logiques, edge cases, securite, lisibilite, tests manquants.
            Etre constructif — proposer des alternatives, pas juste critiquer.
          </Step>
          <Step number="4" title="Merger">
            Apres approbation(s), merger. Squash merge pour garder l&apos;historique propre, ou merge commit
            pour preserver le detail.
          </Step>
        </Steps>
        <Code language="bash — CLI GitHub/GitLab">{`# Creer une PR depuis le terminal (GitHub CLI)
gh pr create --title "feat: pricing engine" --body "Implements #42"

# Lister les PRs ouvertes
gh pr list

# Checkout une PR pour la tester localement
gh pr checkout 123

# Approuver / commenter
gh pr review 123 --approve
gh pr review 123 --comment --body "Bonne approche, un nit sur la ligne 45"

# GitLab CLI (glab)
glab mr create --title "feat: pricing" --description "..." --target-branch main`}</Code>
        <Warning>
          En entreprise, <strong>ne jamais push directement sur main</strong>. Configurer des branch protection rules :
          require PR, require approvals, require CI passing, require linear history.
        </Warning>
      </Section>

      {/* ── 09 ── */}
      <Section id="ci-cd" number="09" title="CI/CD — automatiser les verifications">
        <p>
          La <Term def="Continuous Integration / Continuous Deployment">CI/CD</Term> execute automatiquement des tests,
          du linting, et des deployments a chaque push ou PR.
        </p>
        <Code language="yaml — GitHub Actions (exemple minimal)">{`# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm test
      - run: npm run lint`}</Code>
        <Code language="yaml — GitLab CI (equivalent)">{`# .gitlab-ci.yml
stages:
  - test

test:
  stage: test
  image: node:22
  script:
    - npm ci
    - npm test
    - npm run lint`}</Code>
        <KeyConcept title="Ce que la CI doit verifier (minimum)">
          <strong>Tests unitaires</strong> — le code marche comme prevu.<br />
          <strong>Linting</strong> — le code respecte les conventions (ESLint, Prettier, Black).<br />
          <strong>Types</strong> — pas d&apos;erreurs TypeScript / mypy.<br />
          <strong>Build</strong> — le projet compile correctement.<br />
          <strong>Security</strong> — scan de dependances (npm audit, Snyk, Dependabot).
        </KeyConcept>
      </Section>

      {/* ── 10 ── */}
      <Section id="commandes-avancees" number="10" title="Commandes avancees indispensables">
        <p>
          Les commandes qui separent le junior du senior en situation reelle.
        </p>
        <Code language="bash — stash, cherry-pick, bisect, reflog">{`# ── Stash : mettre de cote des changements temporairement
git stash                          # sauvegarder les modifications
git stash list                     # voir les stashes
git stash pop                      # recuperer le dernier stash
git stash apply stash@{2}          # appliquer un stash specifique

# ── Cherry-pick : prendre un commit specifique d'une autre branche
git cherry-pick abc1234            # appliquer le commit sur ta branche actuelle

# ── Bisect : trouver le commit qui a introduit un bug
git bisect start
git bisect bad                     # le commit actuel est bugge
git bisect good v1.0.0             # ce tag marchait bien
# Git te checkout des commits au milieu — tu testes et dis "good" ou "bad"
# jusqu'a trouver le coupable

# ── Reflog : l'historique de TOUTES tes actions (meme les reset)
git reflog                         # voir l'historique
git checkout HEAD@{5}              # revenir a un etat precedent

# ── Reset : revenir en arriere
git reset --soft HEAD~1            # annuler le dernier commit, garder les fichiers staged
git reset --mixed HEAD~1           # annuler le dernier commit, garder les fichiers modifies
git reset --hard HEAD~1            # TOUT supprimer (dangereux!)

# ── Blame : qui a ecrit cette ligne ?
git blame fichier.py               # chaque ligne avec auteur, date, commit`}</Code>
        <ComparisonTable
          headers={["Commande", "Quand l'utiliser", "Danger"]}
          rows={[
            ["git stash", "Changer de branche avec du WIP", "Aucun"],
            ["git cherry-pick", "Porter un fix sur une autre branche", "Faible"],
            ["git bisect", "Trouver l'origine d'un bug", "Aucun (read-only)"],
            ["git reflog", "Recuperer un commit perdu apres un reset", "Aucun"],
            ["git reset --soft", "Refaire un commit (message, contenu)", "Faible"],
            ["git reset --hard", "Abandonner tout le travail en cours", "ELEVE — perte de donnees"],
            ["git rebase -i", "Reorganiser/squash ses commits avant PR", "Moyen (reecrit l'historique)"],
          ]}
        />
        <Quiz
          question="Tu as fait un git reset --hard par erreur et perdu 3 commits. Comment les recuperer ?"
          options={[
            "C'est perdu pour toujours",
            "git reflog puis git checkout du bon SHA",
            "git log --all",
            "git stash pop",
          ]}
          answer={1}
          explanation="git reflog garde un historique de toutes les positions de HEAD pendant 90 jours. Tu peux retrouver le SHA du commit perdu et le checkout ou reset dessus."
        />
      </Section>

      {/* ── 11 ── */}
      <Section id="gitignore" number="11" title=".gitignore, hooks et bonnes pratiques">
        <Code language="text — .gitignore typique">{`# Dependencies
node_modules/
venv/
__pycache__/

# Build
dist/
build/
.next/

# Secrets (CRITIQUE — ne jamais committer)
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
        <KeyConcept title="Git hooks — automatiser les verifications locales">
          Les hooks s&apos;executent automatiquement avant/apres certaines actions Git.
          En entreprise, on utilise souvent <code>pre-commit</code> pour linter et formater le code
          avant meme qu&apos;il ne soit committe.
        </KeyConcept>
        <Code language="bash — pre-commit hooks">{`# Installer pre-commit (Python)
pip install pre-commit

# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: check-added-large-files
  - repo: https://github.com/psf/black
    rev: 24.4.2
    hooks:
      - id: black

# Activer
pre-commit install`}</Code>
        <Steps>
          <Step number="1" title="Commits atomiques">
            Un commit = un changement logique. Pas &quot;fix tout&quot; ou &quot;WIP&quot;.
          </Step>
          <Step number="2" title="Messages conventionnels">
            <code>feat:</code> nouvelle feature, <code>fix:</code> bugfix, <code>chore:</code> maintenance,
            <code>docs:</code> documentation, <code>refactor:</code> restructuration sans changement fonctionnel.
          </Step>
          <Step number="3" title="Ne jamais committer de secrets">
            Utiliser des variables d&apos;environnement (.env) et les ajouter au .gitignore.
            Si un secret est committe par erreur : le considerer comme compromis, le rotater immediatement.
            <code>git filter-branch</code> ne suffit pas — le secret est dans le reflog et potentiellement sur le remote.
          </Step>
          <Step number="4" title="Signer ses commits (GPG/SSH)">
            En entreprise securisee, les commits doivent etre signes pour prouver l&apos;identite de l&apos;auteur.
            <code>git config --global commit.gpgsign true</code>
          </Step>
        </Steps>
      </Section>

      {/* ── 12 ── */}
      <Section id="quiz" number="12" title="Quiz final">
        <Quiz
          question="Quelle est la difference entre git fetch et git pull ?"
          options={[
            "Aucune, c'est la meme chose",
            "fetch telecharge les changements sans les merger, pull fait fetch + merge",
            "fetch est pour GitHub, pull pour GitLab",
            "pull telecharge uniquement les branches, fetch telecharge tout",
          ]}
          answer={1}
          explanation="git fetch telecharge les objets et refs du remote sans modifier ton working directory. git pull fait un fetch suivi d'un merge (ou rebase avec --rebase)."
        />
        <Quiz
          question="Tu travailles sur une feature branch depuis 3 jours. Main a avance. Comment mettre ta branche a jour proprement (branche personnelle) ?"
          options={[
            "git merge main",
            "git rebase main",
            "git reset --hard origin/main",
            "git cherry-pick main",
          ]}
          answer={1}
          explanation="Sur une branche personnelle, le rebase est prefere car il garde un historique lineaire. On merge seulement si la branche est partagee avec d'autres."
        />
        <Quiz
          question="Un collegue a accidentellement push un fichier .env avec des secrets sur GitHub. Que faire en priorite ?"
          options={[
            "Supprimer le fichier et faire un nouveau commit",
            "Rotater tous les secrets immediatement, puis nettoyer l'historique",
            "Faire un git revert",
            "Supprimer le repo et le re-creer",
          ]}
          answer={1}
          explanation="La priorite absolue est de rotater (changer) tous les secrets compromis. Meme si tu supprimes le fichier, il reste dans l'historique Git et peut avoir ete clone/cache par n'importe qui."
        />
        <Quiz
          question="Quel workflow est le plus adapte pour une app mobile avec des releases toutes les 2 semaines ?"
          options={[
            "Trunk-Based Development",
            "GitHub Flow",
            "GitFlow",
            "Pas de workflow, chacun push sur main",
          ]}
          answer={2}
          explanation="GitFlow avec ses branches release/* est concu pour les cycles de release planifies. GitHub Flow est mieux pour le deploiement continu, Trunk-Based pour le CD a haute frequence."
        />
      </Section>
    </>
  );
}
