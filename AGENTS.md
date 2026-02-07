A MUST RULES
- Keep docs brief and techinical (NO EMOJI)
- DONT create and Bash scripts or md files without certain requirement. Create files of these types only if user asked about it
- DONT write JSDoc
- While writing CSS, make it consistent with previously written styles - use same colors, rounds etc...
- Write all component-related CSS in separate files. Dont write css in .svelte files.
- When writing CSS, always check `src/app.css` `:root` for existing CSS variables before using hardcoded values
- Use CSS variables for: colors, border-radius, transitions, fonts
- If a value is repeated 3+ times across files, extract it into a CSS variable in `:root`
