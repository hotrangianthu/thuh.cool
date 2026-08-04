# Public Policy Portfolio Integration

## Purpose

The public policy portfolio is a first-class section of `thuh.cool`, designed to provide admissions reviewers and policy collaborators with a coherent record of research, field observation, applied tools, prototypes, experiments, and authored positions.

## Information architecture

- `/public-policy` — policy portfolio gateway and framing narrative
- `/public-policy/research` — long-form policy research and MDX papers
- `/public-policy/field-notes` — field observation and interview records
- `/public-policy/playgrounds` — interactive calculators and policy simulations
- `/public-policy/prototypes` — implementation-oriented policy concepts
- `/public-policy/experiments` — hypothesis and product experiment logs
- `/public-policy/voice` — evidence-backed positions and thought experiments
- `/public-policy/about` — policy trajectory and researcher context

## Integration model

The main Next.js app owns all public routes and metadata. Route entrypoints live under `src/app/public-policy`, while the imported portfolio source remains under `public_policy_artifact/src` during this consolidation phase. The `@policy/*` TypeScript alias makes that boundary explicit and prevents its components from colliding with the personal site's `@/*` modules.

The policy layout scopes its light editorial design system beneath `.policy-site`. This prevents policy colors, typography, links, and academic prose styles from leaking into the dark personal portfolio. All policy-internal links use the `/public-policy` namespace, and the policy header provides a direct return to the main `thuh.cool` homepage.

## Content model

Research papers remain file-backed MDX in `public_policy_artifact/src/content/research`. The main application owns the rendering route and reads those sources during the Next.js build. Interactive artifacts use the main application's shared React and Chart.js dependencies.

## Next consolidation step

After the content and navigation stabilize, move `public_policy_artifact/src/components`, `src/content`, and `src/lib` into matching `src/components/public-policy`, `src/content/public-policy`, and `src/lib/public-policy` directories. The route URLs and public information architecture should remain unchanged, so that move will be an internal cleanup rather than a user-facing migration.
