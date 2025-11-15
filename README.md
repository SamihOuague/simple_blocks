# Simple Block — Mini moteur 3D en JavaScript

**Simple Block** est un prototype de moteur 3D développé en JavaScript et rendu via un canvas HTML5.  
L’objectif du projet était de **comprendre et reconstruire les fondations d’un moteur 3D minimal** : projection, caméra, rotation, collisions et rendu.

Il s’agit d’un exercice d’ingénierie exploratoire visant à manipuler directement des concepts tels que :

- Projection 3D → 2D
- Vecteurs & matrices de transformation
- Caméra mobile (position, rotation, vélocité)
- Rendu en perspective
- Détection simple des collisions
- Gestion d’une scène et d’objets (blocs)

Le projet se veut volontairement simple afin de se concentrer sur la compréhension des mécanismes internes d’un moteur 3D.

---

## 🎯 Objectifs du projet

- Reproduire les composants essentiels d’un moteur 3D de manière pédagogique  
- Implémenter une caméra contrôlable (déplacement + orientation)
- Créer une scène capable d’afficher et de gérer plusieurs blocs 3D
- Développer un système de projection maison sans framework externe
- Expérimenter une boucle de rendu (`update → project → draw`)
- Mettre en place une gestion basique des collisions

Ce projet illustre une capacité à **comprendre, analyser et reconstruire** des mécanismes graphiques complexes de façon autonome.

---

## 🧱 Architecture technique

### **Scene**
- Gère la liste des blocs présents dans l’espace 3D  
- Déclenche le rendu 2D via le canvas  
- Centralise les appels à la caméra et aux transformations

### **Camera**
- Position, rotation et vélocité dans l’espace
- Transformation des vecteurs 3D → 2D
- Matrices de rotation (X, Y)
- Perspective + clipping

### **Block**
- Représentation d’un cube dans l’espace  
- Conversion de ses sommets en vecteurs exploitables par la caméra

### **Rendu**
- Utilise `canvas.getContext("2d")`
- Affiche la projection des sommets et des faces  
- Ordonne les éléments selon leur profondeur (z-index simplifié)

---

## 🚀 Tester le projet

Pour une meilleure expérience, utilisez **Firefox** et lancez le projet via un serveur local :

```bash
git clone https://github.com/SamihOuague/simple_blocks
cd simple_blocks
npm install && node server.js
```
