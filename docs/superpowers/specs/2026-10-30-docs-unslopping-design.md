# Vylinejs Docs Visual Redesign

## Intent

Make the Vylinejs documentation feel authored for this project rather than like a generic generated docs template. Keep it practical for developers looking for installation, login, API behavior, and protocol limits.

## Design direction

Use the visual language of an edited technical journal: clear type hierarchy, precise rules, intentional whitespace, and occasional project-specific metadata such as section numbers and source notes. Preserve the existing forest-green identity and VitePress navigation/search. Let documentation content lead the page instead of repeating card-shaped panels.

Reference for editorial structure: [Stripe Docs](https://docs.stripe.com/). Borrow hierarchy and content density only; retain Vylinejs colors, terminology, and project identity.

## Goals

- Replace the default-looking visual rhythm with an editorial, technical reading experience.
- Improve diagrams so labels are legible, layouts fit their content, and no nodes or labels clip.
- Keep pages comfortable in light/dark themes and at narrow widths.
- Make hierarchy and destination cues clear without decorative gradients, shadows, or repeated cards.
- Preserve existing navigation, custom search, Japanese translation control, and working examples.

## Constraints

- Preserve the VitePress site and existing documentation routes.
- Preserve Vylinejs green as the single semantic accent.
- Use no more than two primary type families; code remains readable in a monospace face as a technical-content exception.
- Use 1px rules and a single small radius; do not add shadows or gradient effects.
- Keep keyboard navigation, visible focus, responsive behavior, and reduced-motion support.
- Keep existing content and claims unless a display issue requires only presentation changes.

## Anti-goals

- Do not replace one generic template with all-monochrome brutalism or a trend-driven style.
- Do not add decorative hero art, emoji icons, filler badges, or card grids.
- Do not change the docs framework or remove navigation/search features.

## Acceptance

- Home and article pages visibly share the same deliberate editorial system.
- Sidebar and top navigation have clear separation and no scrollbar/rule collision.
- All Markdown diagrams render, fit their containers, and show every label at desktop and mobile widths.
- Light and dark modes retain readable contrast.
- The production build succeeds, and browser inspection confirms the generated CSS is actually loaded.

## Research basis

Unslopping is treated as a critique-and-revision process, not a canonical style or score. The direction uses findings from the visual-default taxonomy and practitioner critique while avoiding the trap of blindly optimizing a detector. The design remains judged by hierarchy, legibility, specificity, and real page behavior.

- [The Tells: A Measurable Taxonomy of the AI-Generated Design Look](https://labs.iovstudio.kr/en/papers/ai-design-tells)
- [Spot the Slop: A UI Designer’s Guide to Fixing AI Defaults](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c)
- [How well can generative AI design and evaluate user interfaces?](https://publications.ergonomics.org.uk/publications/how-well-can-generative-ai-design-and-evaluate-user-interfaces)
