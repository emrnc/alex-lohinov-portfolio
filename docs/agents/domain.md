# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- `CONTEXT.md` at the repo root.
- `docs/adr/` for architecture decision records that touch the area you're about to work in.

If any of these files don't exist, proceed silently. Don't flag their absence or suggest creating them upfront.

## File structure

This is a single-context repo:

```text
/
├── CONTEXT.md
├── docs/adr/
└── app/
```

## Use the glossary's vocabulary

When your output names a domain concept, use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, either reconsider whether the term belongs in this codebase or note the gap for a future domain-doc update.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding it.
