# Dinozauri Beach — Design System

## Brand source
Logo: `public/dinozauri.webp` — T-Rex beach volleyball mascot on forest-green circle.

## Pattern
**Hero-centric + functional dashboard** — mascot-led landing, clean calendar tools for signed-in users.

## Style
Light, airy sports scheduling app. Soft cream surfaces, forest-green typography, olive-green interactive accents. Rounded cards echo the circular logo.

## Colors (from logo)

| Token | Hex | Usage |
|-------|-----|-------|
| cream | `#F7F5F0` | Page background |
| cream-dark | `#EDEAE3` | Subtle fills, empty calendar cells |
| surface | `#FFFFFF` | Cards, header |
| forest | `#1B3D2F` | Headings, primary text |
| forest-deep | `#0F2419` | Strong emphasis, sign-out |
| olive | `#5C7A45` | Primary buttons, selected dates |
| olive-light | `#6D8F52` | Button hover |
| sage | `#A8C48A` | Highlights, availability heat |
| sage-muted | `#E8F0E0` | Borders, soft backgrounds |
| muted | `#5A6B55` | Body secondary text |

## Typography
- **Outfit** — headings (sporty, bold)
- **DM Sans** — body (readable)

## Effects
- Card shadow: soft `0 1px 3px rgba(27,61,47,0.08)`
- Transitions: `200ms` color/background only — no layout-shifting scale
- Header: floating pill, `bg-white/90 backdrop-blur-md`

## Anti-patterns
- No orange/teal palette (replaced by logo greens)
- No emoji icons
- No scale hover on buttons
- Muted text must stay ≥ `#5A6B55` on light backgrounds
