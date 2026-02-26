# TODO — Site pro & clean

## 🧹 Template à nettoyer
- [ ] Supprimer "Designed in Michigan" et "Crafted by Payload" (Footer)
- [ ] Remplacer les métadonnées par défaut dans `mergeOpenGraph.ts` ("Payload Website Template", etc.)
- [ ] Mettre à jour `SITE_NAME` / `COMPANY_NAME` dans les variables d'environnement
- [ ] Remplacer le logo placeholder (`LogoIcon`) par le vrai logo
- [ ] Retirer le `ThemeSelector` (dark/light mode) si non souhaité

## 🏠 Page d'accueil
- [ ] Contenu réel dans le hero (titre, sous-titre, CTA)
- [ ] Section catégories avec vraies photos
- [ ] Bannière promotionnelle ou mise en avant produit
- [ ] Barre de réassurance (livraison, retours, paiement, conseils)

## 🛍️ Listing produits (`/shop`)
- [ ] Filtres par catégorie fonctionnels (UI)
- [ ] Tri par prix, nouveauté, popularité
- [ ] Pagination ou infinite scroll
- [ ] État vide propre (aucun produit trouvé)

## 📦 Fiche produit
- [ ] Fil d'Ariane (breadcrumb)
- [ ] Affichage du stock (en stock / rupture)
- [ ] Onglets ou accordéon (Description / Caractéristiques / Livraison)
- [ ] Avis clients ou lien Trustpilot
- [ ] Produits associés avec vraies données

## 🔍 SEO & Meta
- [ ] `generateMetadata` sur toutes les pages (home, shop, catégories)
- [ ] `sitemap.xml` généré dynamiquement
- [ ] `robots.txt`
- [ ] Open Graph image par défaut (remplacer l'image Payload)
- [ ] Balises canoniques

## 🎨 UI / Design
- [ ] Palette de couleurs définie dans `tailwind.config` (brand colors)
- [ ] Typographie cohérente (font principale + font serif si utilisée)
- [ ] Favicon réel
- [ ] Images réelles sur tous les blocs (pas de placeholders)
- [ ] Responsive vérifié sur mobile (header, product grid, footer)

## ⚙️ Header / Navigation
- [ ] Logo cliquable vers l'accueil
- [ ] Navigation avec les vraies catégories ou pages
- [ ] Icône panier avec compteur
- [ ] Menu mobile (burger)

## 📝 Pages légales (contenu à rédiger)
- [ ] `/mentions-legales`
- [ ] `/cgv`
- [ ] `/politique-de-confidentialite`
- [ ] `/rgpd`

## 🔧 Technique
- [ ] Variables d'environnement documentées (`.env.example`)
- [ ] Numéro de téléphone réel dans `src/constants/contact.ts`
- [ ] URLs réseaux sociaux réels dans `src/constants/contact.ts`
- [ ] Email de contact réel dans `src/constants/contact.ts`
- [ ] URLs des marques dans le Footer (`/marques/...`)
