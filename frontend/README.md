# Ça marche avec Lety — Frontend

Site vitrine one-page en **Next.js (App Router)** + **Tailwind CSS**.

## Lancer le projet

```bash
npm install
npm run dev
```

## Où modifier le contenu

- **Photos (hero, bande photo, section À propos)** : `src/app/page.tsx`
  - Rechercher les `src="https://images.unsplash.com/..."`.
- **Lien WhatsApp** : `src/app/page.tsx`
  - Rechercher `https://wa.me/33600000000`.
- **Email de contact** : `src/app/page.tsx`
  - Rechercher `contact@camarcheaveclety.fr`.
- **Sorties figées** : `public/data/sorties.json`.
- **Textes (accroche, sections, FAQ)** : `src/app/page.tsx`.
- **Palette / styles globaux / animation fade** : `src/app/globals.css` + `tailwind.config.ts`.

## Notes

- Le mini-formulaire est visuel (pas de backend de soumission).
- Le SEO principal est défini dans `src/app/layout.tsx`.
