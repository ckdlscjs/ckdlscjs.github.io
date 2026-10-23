# Portfolio scaffold

Site: https://ckdlscjs.github.io/

Built on `sproogen/modern-resume-theme` using a local portfolio layout.
All bracketed text is a placeholder, not an actual career claim.

## Fill in content

Edit `_data/portfolio.yml`:

- `profile`: name, role, introduction, skills, contact links, and About dialog.
- `projects`: project items. Copy one item to add another; use a unique `id`.
- `category`: `personal` or `team`. `featured: true` includes it in Featured.
- `image`: use `/images/your-file.jpg` after uploading the image to `images/`.
- `github`, `document`, `video`: full HTTPS URLs. Empty values hide the link.
- `details` and About `text`: Markdown is supported. Use YAML `|` for multiline text.
- `career`, `education`, `awards`: entries for the lower sections.

Keep indentation consistent (spaces, not tabs). Set an unused list to `[]`.
Do not publish private contact information or documents unintentionally.
The header's draft label is in `_layouts/portfolio.html`; remove it when ready.

## Structure

- `_config.yml`: Jekyll and remote theme configuration.
- `_layouts/portfolio.html`: sections, cards, dialogs, and links.
- `assets/portfolio.css`: responsive layout, light/dark themes.
- `assets/portfolio.js`: filters, dialogs, and theme toggle.

GitHub Pages builds automatically from `main` at the repository root.
Check the Actions tab after committing. No build tools need to be installed locally.
