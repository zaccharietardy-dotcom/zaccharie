"use client";

import { Section, KeyConcept, Warning, Analogy, Quiz, ComparisonTable, Steps, Step } from "@/components/course-elements";
import { SvgDiagram, Box, Arrow, Label } from "@/components/svg-diagrams";

export function MIE() {
  return (
    <>
      {/* ── INTRODUCTION ──────────────────────────────────── */}
      <Section id="introduction" number="01" title="Qu'est-ce qu'une organisation ?">
        <p>
          Une <strong>organisation</strong>, c'est la collaboration stable d'acteurs qui poursuivent
          des objectifs communs, avec une division du travail et des moyens de coordination.
          Entreprise, labo, ONG, armee, asso — tout ca, ce sont des organisations.
          L'entreprise est juste un cas particulier : une organisation a activite marchande.
        </p>

        <p>
          Le mot <strong>management</strong> designe trois choses a la fois : une pratique
          (faire en sorte que l'action collective soit efficace), un groupe de personnes
          (le "top management"), et un corpus de connaissances (les sciences de gestion).
        </p>

        <KeyConcept title="Organisation">
          Collaboration stable d'acteurs, en vue d'objectifs communs, par une division du travail
          et des modalites de coordination predefinies. L'entreprise en est une forme specifique
          (activite marchande).
        </KeyConcept>

        <Warning>
          <p>
            Les techniques manageriales sont des <strong>outils</strong>, pas des solutions universelles.
            Toujours se demander : est-ce pertinent dans ce contexte ? Quels presupposes ? Quels effets
            secondaires ? La Theorie des Organisations est une science historique — pas de recette miracle.
          </p>
        </Warning>

        <p>
          L'evolution de la Theorie des Organisations se lit sur deux axes :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Rationnel vs social</strong> : l'homme comme agent rationnel ou comme etre social ?</li>
          <li><strong>Systeme ferme vs ouvert</strong> : on regarde juste l'interne, ou on integre l'environnement (economique, politique, culturel, juridique) ?</li>
        </ul>

        <p>
          Ce cours couvre 4 dimensions qu'on retrouve dans tout cas : <strong>structure</strong>,{" "}
          <strong>culture</strong>, <strong>pouvoir</strong>, <strong>incitations</strong>.
          La pale consiste a analyser un cas en mobilisant ces grilles.
        </p>
      </Section>

      {/* ── STRUCTURE ──────────────────────────────────────── */}
      <Section id="structure" number="02" title="Structure organisationnelle">
        <p>
          La structure, c'est comment on decoupe le travail et comment on recolle les morceaux.
          Deux tensions au coeur : <strong>division du travail</strong> (qui fait quoi ?) et{" "}
          <strong>coordination</strong> (comment on s'assure que ca marche ensemble ?).
        </p>

        <p>
          La division du travail cree deux types de problemes :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Des interdependances</strong> : couplage sequentiel (A puis B), de communaute (A et B partagent des ressources), ou reciproque (va-et-vient entre A et B)</li>
          <li><strong>Une differenciation</strong> : les gens se specialisent, developpent des preoccupations et des priorites differentes</li>
        </ul>

        <KeyConcept title="Structure organisationnelle">
          La somme des moyens employes pour diviser le travail en taches distinctes et
          coordonner ces taches. La structure definit la zone de decision de chaque individu
          et les moyens pour prendre ces decisions.
        </KeyConcept>

        <h3 className="text-lg font-semibold mt-8 mb-3">Les 5 mecanismes de coordination (Mintzberg)</h3>

        <ComparisonTable
          headers={["Mecanisme", "Principe", "Exemple"]}
          rows={[
            ["Supervision directe", "Un chef donne les ordres et controle", "Le patron d'une PME"],
            ["Standard. des procedes", "On ecrit les procedures a suivre", "Manuel qualite, protocoles"],
            ["Standard. des qualifications", "On recrute des gens formes", "Medecins, ingénieurs"],
            ["Standard. des resultats", "On fixe des objectifs chiffres", "CA par division, KPI"],
            ["Ajustement mutuel", "Les gens s'arrangent entre eux", "Equipe de recherche, startup"],
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-3">Les 5 parties de l'organisation</h3>

        <SvgDiagram width={520} height={300} title="Anatomie de l'organisation (Mintzberg)">
          {/* Sommet strategique */}
          <Box x={170} y={15} w={180} h={40} label="Sommet strategique" color="violet" />
          {/* Ligne hierarchique */}
          <Box x={190} y={90} w={140} h={40} label="Ligne hierarchique" color="cyan" />
          {/* Centre operationnel */}
          <Box x={140} y={230} w={240} h={45} label="Centre operationnel" color="accent" />
          {/* Technostructure */}
          <Box x={10} y={130} w={140} h={45} label="Technostructure" sublabel="analystes" color="amber" />
          {/* Support logistique */}
          <Box x={370} y={130} w={140} h={45} label="Support logistique" sublabel="services internes" color="rose" />
          {/* Arrows */}
          <Arrow x1={260} y1={55} x2={260} y2={90} />
          <Arrow x1={260} y1={130} x2={260} y2={230} />
          <Arrow x1={150} y1={152} x2={190} y2={110} dashed />
          <Arrow x1={370} y1={152} x2={330} y2={110} dashed />
        </SvgDiagram>

        <h3 className="text-lg font-semibold mt-8 mb-3">Les 5 configurations structurelles</h3>

        <ComparisonTable
          headers={["Configuration", "Coordination", "Partie cle", "Force"]}
          rows={[
            ["Structure simple", "Supervision directe", "Sommet strategique", "Centralisation"],
            ["Bureaucratie mecaniste", "Standard. procedes", "Technostructure", "Standardisation"],
            ["Structure divisionnalisee", "Standard. resultats", "Ligne hierarchique", "Balkanisation"],
            ["Bureaucratie professionnelle", "Standard. qualifications", "Centre operationnel", "Professionnalisation"],
            ["Adhocratie", "Ajustement mutuel", "Support logistique", "Collaboration"],
          ]}
        />

        <h3 className="text-lg font-semibold mt-8 mb-3">Les 3 superstructures</h3>

        <ComparisonTable
          headers={["Type", "Avantages", "Limites"]}
          rows={[
            ["Fonctionnelle", "Specialisation, economies d'echelle", "Silos, perte de vision d'ensemble"],
            ["Divisionnelle", "Orientation resultat, responsabilite", "Duplication, couts eleves"],
            ["Matricielle / projets", "Flexibilite, adaptation rapide", "Complexite RH, conflits de taches"],
          ]}
        />

        <p>
          <strong>Facteurs de contingence</strong> : la structure varie selon la taille, l'age,
          le systeme technique, l'environnement (stable/changeant, homogene/heterogene),
          les technologies, la main-d'oeuvre, la culture nationale. Pas de structure ideale universelle.
        </p>

        <Warning>
          Les configurations sont des <strong>types purs</strong>. En realite, les organisations
          combinent souvent des traits de plusieurs configurations. Les jeux de pouvoir internes
          et la culture influencent aussi la structure retenue. C'est un outil d'analyse, pas une loi.
        </Warning>
      </Section>

      {/* ── CULTURE ────────────────────────────────────────── */}
      <Section id="culture" number="03" title="Culture organisationnelle">
        <p>
          Les organisations sont traversees de cultures multiples : culture nationale,
          culture de communaute professionnelle, culture de groupe... La culture organisationnelle,
          c'est l'ensemble des croyances et convictions partagees par les membres, qui determinent{" "}
          <strong>inconsciemment</strong> comment l'organisation se voit et voit le monde.
        </p>

        <p>La culture a trois fonctions :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Equipement mental</strong> : un code pour percevoir, agir et juger</li>
          <li><strong>Glue sociale</strong> : adaptation a l'environnement, cohesion interne</li>
          <li><strong>Mais aussi</strong> : facteur d'inertie, d'aveuglement, voire de comportements a risque</li>
        </ul>

        <h3 className="text-lg font-semibold mt-8 mb-3">La grille de Schein — 3 niveaux</h3>

        <SvgDiagram width={400} height={300} title="Les 3 niveaux de la culture (Schein)">
          {/* Visible zone */}
          <Box x={70} y={20} w={260} h={55} label="Artefacts" sublabel="signes, rites, mythes, tabous" color="accent" />
          {/* Dashed line */}
          <line x1={30} y1={105} x2={370} y2={105} stroke="#a1a1aa" strokeWidth={1} strokeDasharray="6,4" />
          <Label x={380} y={105} text="visible" size={9} anchor="start" />
          <Label x={380} y={118} text="invisible" size={9} anchor="start" />
          {/* Values */}
          <Box x={70} y={130} w={260} h={55} label="Valeurs & croyances" sublabel="discours vs pratiques" color="cyan" />
          {/* Deep assumptions */}
          <Box x={70} y={225} w={260} h={55} label="Hypotheses fondamentales" sublabel="image de soi, du metier, du pouvoir" color="violet" />
          {/* Arrows */}
          <Arrow x1={200} y1={75} x2={200} y2={130} dashed />
          <Arrow x1={200} y1={185} x2={200} y2={225} dashed />
        </SvgDiagram>

        <h3 className="text-lg font-semibold mt-8 mb-3">Comment analyser la culture (methode pale)</h3>

        <Steps>
          <Step number="1" title="Reperer les artefacts">
            Signes (logo, jargon, look, amenagement espace/temps) et supports symboliques
            (mythes, heros, rites, tabous). Qu'est-ce qu'on voit ?
          </Step>
          <Step number="2" title="Identifier les valeurs">
            Pour chaque signe : quelle valeur ou croyance il porte ? Comparer avec le discours
            officiel. Y a-t-il des contradictions ?
          </Step>
          <Step number="3" title="Interpreter l'imaginaire partage">
            3 questions : comment les membres voient leur organisation ? Qu'est-ce qu'un "bon"
            membre ? Qui a le pouvoir et pourquoi ?
          </Step>
          <Step number="4" title="Chercher les dissonances">
            Les 3 niveaux sont-ils alignes ? Si la direction dit "innovation" mais que la structure
            punit l'echec, il y a dissonance. C'est souvent la que se cache le vrai probleme.
          </Step>
        </Steps>

        <KeyConcept title="Culture et changement">
          Le changement organisationnel est un changement culturel. La culture evolue lentement
          — il faut articuler culture, structure et systemes d'incitations <strong>ensemble</strong>.
          Changer un seul element sans toucher aux autres ne marche pas.
        </KeyConcept>
      </Section>

      {/* ── POUVOIR ────────────────────────────────────────── */}
      <Section id="pouvoir" number="04" title="Pouvoir et jeux politiques">
        <p>
          La perspective politique montre que l'organisation est <strong>pluraliste</strong> :
          les individus et les groupes ont des interets differents, parfois contradictoires.
          Le pouvoir, c'est la capacite d'agir sur d'autres pour affecter le fonctionnement
          de l'organisation.
        </p>

        <p>
          Point fondamental : le pouvoir n'est <strong>pas un attribut</strong> qu'on possede
          une fois pour toutes. C'est une <strong>relation</strong>, marquee par la dependance,
          la reciprocite et le desequilibre. Et ca peut changer.
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-3">2 sources de pouvoir</h3>

        <p><strong>1. La legitimite (Weber)</strong> — 3 types :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Rationnelle-legale</strong> : fondee sur les regles, le droit, la science. C'est l'autorite hierarchique.</li>
          <li><strong>Traditionnelle</strong> : heritage culturel, tradition, coutumes.</li>
          <li><strong>Charismatique</strong> : force heroique ou caractere sacre d'une personne ou de sa mission.</li>
        </ul>

        <p className="mt-4"><strong>2. L'opportunite (Crozier et Friedberg)</strong> — 4 zones d'incertitude :</p>

        <SvgDiagram width={460} height={250} title="Les 4 zones d'incertitude (Crozier-Friedberg)">
          <Box x={145} y={10} w={170} h={40} label="Expertise" sublabel="competence rare" color="accent" />
          <Box x={145} y={195} w={170} h={40} label="Lien environnement" sublabel="clients, regulateurs..." color="amber" />
          <Box x={10} y={100} w={155} h={40} label="Communication" sublabel="flux d'information" color="cyan" />
          <Box x={295} y={100} w={155} h={40} label="Application des regles" sublabel="maitrise du formel" color="violet" />
          {/* Center label */}
          <Label x={230} y={120} text="POUVOIR" size={14} weight="bold" color="#e4e4e7" />
          {/* Arrows toward center */}
          <Arrow x1={230} y1={50} x2={230} y2={105} dashed />
          <Arrow x1={230} y1={195} x2={230} y2={135} dashed />
          <Arrow x1={165} y1={120} x2={200} y2={120} dashed />
          <Arrow x1={295} y1={120} x2={260} y2={120} dashed />
        </SvgDiagram>

        <p>
          Tout individu dans l'organisation est un <strong>acteur</strong> : meme au bas de la
          hierarchie, il a une marge de liberte. Les acteurs s'arrangent entre eux au quotidien,
          ce qui cree des regles du jeu informelles — c'est le <strong>systeme d'action concret</strong>.
        </p>

        <Warning>
          Changer les personnes sans changer le systeme d'action concret ne resout rien.
          La meme situation se repetera avec d'autres individus. Il faut comprendre et faire
          evoluer le <strong>systeme</strong>, pas juste remplacer les gens.
        </Warning>

        <h3 className="text-lg font-semibold mt-8 mb-3">Grille d'analyse du pouvoir</h3>

        <p>
          Pour analyser les jeux de pouvoir dans un cas, remplir ce tableau :
        </p>

        <ComparisonTable
          headers={["Acteur", "Ressources (+)", "Contraintes (-)", "Enjeux", "Objectifs", "Strategie"]}
          rows={[
            ["...", "Zones d'incertitude maitrisees", "Ce qui lui manque", "Ce qu'il peut perdre/gagner", "Ce qu'il veut concretement", "Actions envisagees"],
          ]}
        />

        <p className="text-sm text-muted-foreground mt-2">
          Les <strong>parties prenantes</strong> sont tous les acteurs (individus, groupes, organisations)
          qui affectent ou sont affectes par l'organisation : clients, fournisseurs, syndicats,
          salaries, regulateurs, concurrents, etc.
        </p>
      </Section>

      {/* ── INCITATIONS ────────────────────────────────────── */}
      <Section id="incitations" number="05" title="Incitations et motivation">
        <p>
          La motivation n'est pas un trait de personnalite. On n'est jamais motive "dans l'absolu"
          — on est motive <strong>par</strong> ou <strong>pour</strong> quelque chose.
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-3">Herzberg — facteurs d'hygiene vs moteurs</h3>

        <ComparisonTable
          headers={["Type", "Effet", "Exemples"]}
          rows={[
            ["Facteurs d'hygiene (extrinseques)", "Absence = insatisfaction", "Salaire, conditions de travail, relations hierarchiques"],
            ["Facteurs moteurs (intrinseques)", "Presence = satisfaction", "Contenu de la tache, reconnaissance, responsabilites, autonomie"],
          ]}
        />

        <p>
          La motivation vient des facteurs <strong>intrinseques</strong>. Mais attention :
          si les facteurs d'hygiene sont trop mauvais, la personne partira meme si le poste
          l'interesse.
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-3">Etzioni — 3 mecanismes d'incitation</h3>

        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Coercitifs</strong> : sanctions, menaces (licenciement, avertissement)</li>
          <li><strong>Speculatifs</strong> : recompenses si objectif atteint (primes, promotion, carriere)</li>
          <li><strong>Identification</strong> : adhesion a la mission, aux valeurs, volonte de faire partie du groupe</li>
        </ul>

        <h3 className="text-lg font-semibold mt-8 mb-3">Le contrat psychologique</h3>

        <p>
          Au-dela du contrat de travail, il y a un <strong>contrat psychologique</strong> : l'ensemble
          des attentes implicites reciproques entre l'individu et son organisation. Il est non-ecrit,
          subjectif, propre a chaque personne, et il evolue dans le temps.
        </p>

        <p>
          Analyser le contrat psychologique = identifier les <strong>contributions</strong> et{" "}
          <strong>retributions</strong> (materielles et symboliques) que chaque partie attend.
          Si l'individu percoit un desequilibre, deux reactions immediates : reduire sa contribution
          (absenteisme, moins d'effort) ou augmenter sa retribution (reclamer une prime, detourner
          des ressources).
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-3">Hirschman — quand le contrat est rompu</h3>

        <SvgDiagram width={480} height={230} title="Exit, Voice, Loyalty (Hirschman)">
          {/* Trigger */}
          <Box x={120} y={10} w={240} h={40} label="Rupture du contrat" sublabel="desequilibre percu" color="violet" />
          {/* 3 main reactions */}
          <Box x={10} y={120} w={130} h={50} label="Exit" sublabel="partir en silence" color="rose" />
          <Box x={175} y={120} w={130} h={50} label="Voice" sublabel="rester et protester" color="amber" />
          <Box x={340} y={120} w={130} h={50} label="Loyalty" sublabel="rester en silence" color="accent" />
          {/* Exit + Voice */}
          <Box x={85} y={190} w={140} h={35} label="Exit + Voice" sublabel="partir en protestant" color="cyan" />
          {/* Arrows */}
          <Arrow x1={200} y1={50} x2={75} y2={120} />
          <Arrow x1={240} y1={50} x2={240} y2={120} />
          <Arrow x1={280} y1={50} x2={405} y2={120} />
          <Arrow x1={75} y1={170} x2={120} y2={190} dashed />
          <Arrow x1={240} y1={170} x2={190} y2={190} dashed />
        </SvgDiagram>

        <p>
          Le choix depend du contexte : l'individu croit-il que l'organisation peut changer ?
          A-t-il les moyens de partir ? La protestation est-elle facilitee (syndicats) ou reprimee ?
        </p>

        <h3 className="text-lg font-semibold mt-8 mb-3">Ouchi — 3 modeles de regulation interne</h3>

        <ComparisonTable
          headers={["Modele", "Horizon", "Logique", "Incitation dominante"]}
          rows={[
            ["Marche", "Court terme", "Performance individuelle, concurrence", "Speculatif (primes)"],
            ["Bureaucratie", "Moyen/long terme", "Carriere, anciennete, regles", "Speculatif + coercitif"],
            ["Clan", "Long terme", "Solidarite, fidelite, appartenance", "Identification"],
          ]}
        />

        <p className="text-sm text-muted-foreground">
          Toute organisation combine les trois, mais un seul modele predomine.
          Savoir lequel aide a comprendre pourquoi les gens restent, partent, ou se demotivent.
        </p>
      </Section>

      {/* ── METHODE ────────────────────────────────────────── */}
      <Section id="methode" number="06" title="Methode — Reussir l'etude de cas">
        <p>
          La pale, c'est une etude de cas avec des questions. Pas de reponse unique — mais il
          faut <strong>justifier</strong> chaque element de l'analyse. Donner son avis ne suffit pas.
        </p>

        <Steps>
          <Step number="1" title="Lire et relever les faits">
            Lire le cas et les questions attentivement. Prendre des notes, surligner les faits
            pertinents, lister tous les problemes identifies. Plusieurs lectures sont souvent
            necessaires.
          </Step>
          <Step number="2" title="Focaliser l'analyse">
            Quel est le probleme cle ? Pourquoi existe-t-il ? Quel impact ? Qui en est
            responsable ? Distinguer symptomes et causes.
          </Step>
          <Step number="3" title="Lier theorie et pratique">
            Quels outils du cours s'appliquent ? Structure (Mintzberg), culture (Schein),
            pouvoir (Crozier-Friedberg, Weber), incitations (Herzberg, Etzioni, Ouchi, Hirschman).
            Les questions suivent un ordre logique — chacune aborde une dimension differente.
          </Step>
          <Step number="4" title="Proposer des solutions argumentees">
            Identifier des solutions <strong>realistes</strong>. Pour chacune : en quoi elle repond
            au probleme, consequences previsibles, avantages et inconvenients. Choisir et justifier.
            Parfois, ne rien faire est une option valable.
          </Step>
        </Steps>

        <KeyConcept title="Justifier ≠ donner son opinion">
          Montrer comment on construit l'analyse : (1) faits releves dans le cas,
          (2) interpretation via les outils du cours, (3) redefinition du probleme cle,
          (4) solutions argumentees avec avantages/inconvenients.
        </KeyConcept>

        <Warning>
          <p>
            Ne pas rester au niveau individuel. Le cours attend qu'on analyse les effets
            de l'<strong>organisation</strong> (sa structure, sa culture, ses processus) sur
            l'action des individus. "Pierre est incompetent" n'est pas une analyse —
            "la structure empeche Pierre de faire son travail correctement" en est une.
          </p>
        </Warning>

        <h3 className="text-lg font-semibold mt-8 mb-3">Boite a outils — quand utiliser quoi</h3>

        <SvgDiagram width={440} height={340} title="Les 5 dimensions d'analyse">
          {/* Center */}
          <circle cx={220} cy={170} r={35} fill="#10b98133" stroke="#10b981" strokeWidth={1.5} />
          <Label x={220} y={170} text="CAS" size={14} weight="bold" color="#10b981" />
          {/* Surrounding dimensions */}
          <Box x={170} y={10} w={100} h={35} label="Structure" color="violet" />
          <Box x={320} y={80} w={100} h={35} label="Culture" color="cyan" />
          <Box x={300} y={230} w={110} h={35} label="Incitations" color="rose" />
          <Box x={30} y={230} w={100} h={35} label="Pouvoir" color="amber" />
          <Box x={20} y={80} w={120} h={35} label="Environnement" color="default" />
          {/* Arrows to center */}
          <Arrow x1={220} y1={45} x2={220} y2={135} dashed />
          <Arrow x1={320} y1={97} x2={255} y2={155} dashed />
          <Arrow x1={300} y1={247} x2={250} y2={195} dashed />
          <Arrow x1={130} y1={247} x2={195} y2={195} dashed />
          <Arrow x1={140} y1={97} x2={190} y2={155} dashed />
        </SvgDiagram>

        <ComparisonTable
          headers={["Dimension", "Outil / Grille", "Quand l'utiliser"]}
          rows={[
            ["Structure", "5 mecanismes de coordination + 5 configurations Mintzberg", "Caracteriser l'organisation, division du travail"],
            ["Culture", "3 niveaux de Schein (artefacts, valeurs, hypotheses)", "Identite, valeurs, resistance au changement"],
            ["Pouvoir", "Weber (legitimite) + Crozier-Friedberg (zones d'incertitude)", "Conflits, jeux d'influence, dysfonctionnements"],
            ["Incitations", "Herzberg + Etzioni + contrat psychologique + Hirschman", "Motivation, turnover, insatisfaction"],
            ["Relations", "Ouchi (Marche / Bureaucratie / Clan)", "Type de regulation interne, horizon du contrat"],
          ]}
        />

        <Analogy>
          Analyser un cas, c'est faire le detective. Les outils du cours sont les indices —
          il faut les assembler pour construire une explication coherente du probleme,
          pas juste les lister. Un bon detective ne se contente pas de dire "il y avait
          des empreintes" — il explique ce qu'elles signifient.
        </Analogy>

        <h3 className="text-lg font-semibold mt-8 mb-3">Exemple : le cas Buurtzorg</h3>

        <p>
          Buurtzorg est une organisation neerlandaise de soins a domicile. 10 000 infirmiers,
          850 equipes autonomes de 10-12 personnes, 2 managers et 22 coachs au siege (50 personnes).
          Fondee par Jos de Blok, ancien infirmier. Voici comment appliquer les outils :
        </p>

        <p><strong>Structure</strong> : bureaucratie professionnelle. Mecanisme dominant = standardisation
          des qualifications (tous diplomes, formes a la methode SDMI). Ajustement mutuel en secondaire
          (petites equipes). Centre operationnel = partie cle. Quasi-absence de supervision directe et
          de standardisation des procedes (rejet explicite de l'ancien systeme chronometre).
        </p>

        <p><strong>Culture (Schein)</strong> : artefacts = nom ("soins de quartier"), "first coffee"
          avec le patient, rotation des roles. Valeurs = "Humanity over Bureaucracy", confiance dans
          les pros, "keep it small". Imaginaire = communaute de professionnels, pas une entreprise.
          Dissonance : Jos de Blok fixe seul les regles structurantes, ce qui contredit le discours
          d'horizontalite.
        </p>
      </Section>

      {/* ── QUIZ ───────────────────────────────────────────── */}
      <Section id="quiz" number="07" title="Quiz final">
        <Quiz
          question="Quel mecanisme de coordination domine dans une bureaucratie professionnelle ?"
          options={[
            "Supervision directe",
            "Standardisation des procedes",
            "Standardisation des qualifications",
            "Standardisation des resultats",
          ]}
          answer={2}
          explanation="La bureaucratie professionnelle repose sur la standardisation des qualifications. La partie cle est le centre operationnel (les professionnels)."
        />

        <Quiz
          question="Selon Schein, quel est le niveau le plus profond de la culture organisationnelle ?"
          options={[
            "Les artefacts (signes et rites)",
            "Les valeurs affichees",
            "Les hypotheses fondamentales (imaginaire partage)",
            "Les supports symboliques",
          ]}
          answer={2}
          explanation="Les hypotheses fondamentales sont le niveau le plus profond — souvent inconscient. Les artefacts sont le niveau le plus visible, en surface."
        />

        <Quiz
          question="Un employe mecontent qui reste sans rien dire illustre quel comportement (Hirschman) ?"
          options={[
            "Exit",
            "Voice",
            "Loyalty",
            "Exit and Voice",
          ]}
          answer={2}
          explanation="Loyalty = rester en silence. Ca peut etre de la loyaute sincere, de l'apathie, ou l'absence de moyens pour protester."
        />

        <Quiz
          question="Les 4 zones d'incertitude de Crozier et Friedberg sont :"
          options={[
            "Expertise, regles, communication, lien avec l'environnement",
            "Legitimite, tradition, charisme, hierarchie",
            "Coercition, speculation, identification, socialisation",
            "Division, coordination, integration, differenciation",
          ]}
          answer={0}
          explanation="Les 4 sources situationnelles de pouvoir : maitrise de l'expertise, de l'application des regles, des flux de communication, et du lien avec l'environnement."
        />

        <Quiz
          question="Selon Herzberg, le salaire est :"
          options={[
            "Un facteur moteur",
            "Un facteur d'hygiene",
            "Les deux selon le montant",
            "Ni l'un ni l'autre",
          ]}
          answer={1}
          explanation="Le salaire est un facteur d'hygiene (extrinseque). Son absence cree de l'insatisfaction, mais l'augmenter ne cree pas de motivation durable — c'est le contenu du travail qui motive."
        />

        <Quiz
          question="Dans l'analyse d'un cas, que faut-il faire AVANT de proposer des solutions ?"
          options={[
            "Donner son opinion personnelle sur la situation",
            "Lister tous les outils du cours",
            "Analyser la situation avec les outils du cours et redefinir le probleme",
            "Resumer l'etude de cas en 3 points",
          ]}
          answer={2}
          explanation="La methode : (1) relever les faits, (2) interpreter avec les outils, (3) redefinir le probleme cle, PUIS (4) proposer des solutions argumentees."
        />
      </Section>
    </>
  );
}
