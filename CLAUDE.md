# Spaessentiel

# 🎯 OBJECTIF N°1 : DÉCROCHER LA PREMIÈRE VENTE

**Tout le reste est secondaire.** Chaque décision, chaque feature, chaque priorité se lit à travers ce prisme : *est-ce que ça rapproche de la première commande payée ?*

---

## Statut projet (2026-04-24)

- 🚧 Site **en cours de création** — pas encore lancé publiquement
- 📉 **0 vues, 0 ventes** — aucun trafic, aucune commande à préserver
- 🔍 Pas encore indexé Google → **pas de redirects 301** nécessaires sur changements de slugs/URLs

---

## 🚨 Bloqueurs VÉRIFIÉS pour la première vente

Vérifiés à la main sur le repo + prod (2026-04-24). Par ordre de criticité :

### 1. ❌ Stripe webhook : clé de signature vide — BLOQUANT PAIEMENT
- Fichier : `.env.local:14` → `STRIPE_WEBHOOKS_SIGNING_SECRET=whsec_` (vide)
- Impact : webhook Stripe ne peut pas valider → commande pas créée après paiement réussi
- À faire : créer webhook dans Stripe Dashboard → copier `whsec_...` dans `.env.local` ET `.env.prod`

### 2. ❌ Emails transactionnels désactivés — BLOQUANT CONFIRMATION
- Fichier : [src/payload.config.ts:90-102](src/payload.config.ts) — `nodemailerAdapter` commenté ("Temporairement désactivé pour éviter les erreurs SMTP")
- Impact : client ne reçoit aucune confirmation de commande → confiance zéro
- À faire : configurer SMTP (Resend recommandé) + décommenter l'adapter + templates Payload

### 3. ❌ Produits : SEO manquant + slugs/titres cassés — BLOQUANT CONVERSION
- 8/10 produits sans meta description ni `ProductSeoBlock` → pages fiches vides
- Typos dans titres produits : `Capsule SAuna Arrondis`, espace traînant, titre "4 Places" vs slug "2-places" sur Hemlock
- À faire : lancer skill `product-seo` sur les 8 manquants + corriger titres

### 4. ⚠️ Page `/contact` non personnalisée
- Titre actuel : `"Payload Ecommerce Template | Spa Essentiel"` — affiche le titre par défaut du template
- À faire : éditer la page contact dans Payload (vrai contenu, tel, email, formulaire)

### 5. ⚠️ Tester le checkout end-to-end en vrai
- Une fois les 4 points ci-dessus réglés : passer une vraie commande test (carte réelle, puis remboursement)
- Vérifier : réception email confirmation, commande visible en admin, stock décrémenté

---

## ✅ Ce qui est OK (ne pas retoucher)

- Pages légales publiées : [/mentions-legales](https://www.spaessentiel.fr/mentions-legales), [/cgv](https://www.spaessentiel.fr/cgv), [/politique-de-confidentialite](https://www.spaessentiel.fr/politique-de-confidentialite)
- Composants de réassurance en place ([src/components/shop-home/ReassuranceBar.tsx](src/components/shop-home/ReassuranceBar.tsx))
- Checkout flow branché sur Stripe live (clés `pk_live`/`sk_live` présentes)
- 10 produits déjà en base avec galerie images
- Orders gérés via plugin Payload ecommerce (pas de collection custom)

---

## Règle de priorisation

Avant de coder quoi que ce soit, se demander :

> *« Est-ce que cette tâche débloque ou accélère la première vente ? »*

- **Oui** → go
- **Non** → dans le backlog, on verra après la première commande encaissée
