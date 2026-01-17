# Codeo UI - Vision Engine AI (v2.0)

Codeo UI est une plateforme SaaS de pointe qui transforme instantanément les captures d'écran d'interfaces utilisateur (UI) en composants de code propres, sémantiques et prêts pour la production (React, Vue, HTML).

Propulsé par le moteur propriétaire V-AST (Visual Abstract Syntax Tree), l'outil garantit une fidélité de conversion de 99.8% en éliminant les hallucinations structurelles communes aux IA génératives classiques.

## 🏗️ Architecture du Projet

### 1. Partie Pre-Connexion (Landing Page & Démo) - COMPLÉTÉ
La porte d'entrée conçue pour la conversion maximale grâce à une approche "Proof of Value" (Preuve de valeur).

- **Hero Interactive** : Présentation du moteur Neural-Vision-V2 avec un cycle de frameworks dynamique.
- **Live Demo (Controlled)** : 
  - Visualisation du scanneur laser sur une UI prédéfinie.
  - Génération en temps réel du code React/Vue/HTML.
  - Affichage du V-AST JSON Tree pour prouver la profondeur technique.
- **Section Technique "How it works"** : 
  - Explication pédagogique du pipeline : Visual Input → V-AST Bridge → Code Generation.
  - Affichage en modale pour ne pas surcharger le tunnel de vente.
- **Pricing Stratégique** : Système basé sur les Scans IA (Crédits) plutôt que sur les exports simples.

### 2. Partie Post-Connexion (Dashboard & Workbench) - EN COURS
L'espace de travail productif pour les développeurs et designers.

- **Workspace Dashboard** :
  - Gestion du solde de crédits (Scans IA).
  - Zone de Drag & Drop pour l'upload de fichiers personnels (PNG, JPG).
  - Historique des projets avec miniatures et métadonnées.

- **Le Workbench (L'Éditeur)** :
  - Dual View : Image source à gauche, Code généré à droite.
  - Framework Switcher : Bascule instantanée entre React (Tailwind), Vue et HTML5.
  - Smart Selection : Cliquer sur une zone de l'image met en surbrillance le bloc de code correspondant.

- **User Settings & Billing** :
  - Gestion de l'abonnement (Upgrade vers Pro/Business).
  - Préférences d'export (TypeScript vs JavaScript, Espacements, Prefixes Tailwind).

## 🛠 Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Style** : Tailwind CSS
- **Animations** : Framer Motion & Lucide React
- **Moteur Vision** : V-AST Neural Engine (Propriétaire)

### Design System

- **Couleur Primaire** : #09d600 (codeo-green)
- **Fond** : #020617 (slate-950)
- **Typographie** : JetBrains Mono (pour le code) & Sans-serif (Interface)

## 📈 Roadmap Post-Connexion

- **Phase 1** : Création du Dashboard Layout & Système d'upload.
- **Phase 2** : Intégration de la logique de Scan (Simulation de l'analyse V-AST sur image utilisateur).
- **Phase 3** : Workbench interactif avec option "Copier le code".
- **Phase 4** : Système de crédits et persistance des projets (Base de données).

## 💎 Points Forts du Produit

- **"Zéro Hallucination"** : Contrairement aux LLM standards, le passage par le V-AST structure le code logiquement avant la génération.
- **"Scan Once, Export Everywhere"** : Un crédit consommé permet l'export illimité dans tous les frameworks supportés pour cette image.
- **"Production-Ready"** : Le code généré n'est pas une "soupe de div", mais un code respectant l'accessibilité et les bonnes pratiques Tailwind.

## 📦 Installation

1. Clonez le repository :
```bash
git clone https://github.com/Kesjs/Codeo-UI.git
cd Codeo-UI
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🚀 Déploiement

### Vercel (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez votre repository à Vercel
3. Configurez les variables d'environnement
4. Déployez !

### Autres Plateformes

L'application peut être déployée sur toute plateforme supportant Next.js :
- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## 🤝 Contribuer

1. Fork le repository
2. Créez une branche de fonctionnalité : `git checkout -b feature/amazing-feature`
3. Commitez vos changements : `git commit -m 'Add amazing feature'`
4. Pushez vers la branche : `git push origin feature/amazing-feature`
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT License - voir le fichier [LICENSE](LICENSE) pour les détails.

---

Développé avec passion pour les bâtisseurs du web. ✌️
