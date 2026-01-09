# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Magic Quotes** is a simple web application for displaying random quotes. It's designed as a teaching tool for students learning HTML, CSS, and JavaScript fundamentals, with a focus on:

- **Collaboration via Git/GitHub**: Students contribute by adding their own JSON files
- **Data structures**: Preparing students to work with objects and arrays
- **Markdown documentation**: Teaching students to communicate via Markdown
- **AI-assisted content creation**: Students learn to prompt AI tools and edit outputs

This is an educational repository where **students only write HTML, CSS, and configuration files** - they are NOT writing JavaScript (except for configuration).

## How to run

### Development (recommended)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Vite dev server:

   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:5173`

### No-build option

For simple viewing without the build system:

1. Open [index.html](index.html) directly in a web browser
2. Or use a local development server:

   ```bash
   # Python 3
   python3 -m http.server 8000

   # Node.js (if http-server is installed)
   npx http-server

   # VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

Note: The no-build option works because `manifest.json` is committed to the repository.

## Architecture

### Data structure

All quote data lives in `data/` with **one JSON file per contributor**. This design:

- Eliminates merge conflicts when students submit PRs
- Teaches JSON object/array structure
- Allows independent contributions without coordination

Each JSON file follows this schema:

```json
{
  "author": "Contributor name",
  "about": "Short description of this collection",
  "entries": [
    {
      "id": "unique-id",
      "category": "developer-wisdom",
      "tone": "reflective",
      "text": "The quote text",
      "source": "ai-assisted",
      "prompt_notes": "How the prompt was shaped"
    }
  ]
}
```

### Application flow

1. [script.js](script.js) loads [manifest.json](manifest.json) to get list of data files
2. Loads all JSON files listed in manifest
3. All `entries` arrays are merged into a single pool
4. Button click selects a random quote and displays entry.text
5. Basic DOM manipulation - no frameworks or complexity

### Build system

The project uses **Vite** for development and **automated validation**:

**npm scripts**:

- `npm run dev` - Start dev server with auto-validation
- `npm run build` - Build for production (validates + generates manifest)
- `npm run validate` - Validate JSON files only (no manifest generation)
- `npm run preview` - Preview production build

**What the build does**:

1. Scans `data/` directory for all `.json` files
2. Validates each file against [scripts/quote-schema.json](scripts/quote-schema.json)
3. Checks for duplicate IDs across all files
4. Generates [manifest.json](manifest.json) with sorted file list
5. Fails fast if validation errors are found

**Validation**:

- JSON Schema validation with [ajv](https://ajv.js.org/)
- Required fields: `author`, `about`, `entries[]`
- Each entry requires: `id`, `category`, `tone`, `text`, `source`
- Duplicate ID detection across all contributor files
- Clear error messages guide students to fix issues

### File structure

```
.
├── index.html              # Single-page application with inline CSS
├── package.json            # npm dependencies and scripts
├── vite.config.js          # Vite configuration
├── public/                 # Static assets (copied to dist/ during build)
│   ├── script.js           # Loads manifest, handles random selection
│   ├── manifest.json       # Auto-generated list of data files
│   └── data/               # One JSON file per contributor (copied from root)
│       ├── README.md       # Contributor instructions
│       ├── example-quote.json  # Example data
│       └── quote-*.json    # Student contribution files
├── data/                   # Source data files (contributors edit here)
│   ├── README.md           # Contributor instructions
│   ├── example-quote.json  # Example data
│   └── quote-*.json        # Student contribution files
├── scripts/
│   ├── generate-manifest.js  # Manifest generator + validator
│   └── quote-schema.json     # JSON Schema definition
├── .github/workflows/
│   └── validate-pr.yml     # CI/CD validation
├── dist/                   # Build output (generated, not committed)
├── reports/                # Implementation documentation
├── netlify.toml            # Netlify deployment configuration
├── LICENSE.md              # MIT License with HAP trademark exclusions
├── TRADEMARK.md            # HAP character and brand usage terms
└── README.md               # Project documentation
```

**Note**: All visual assets (favicon, images) are served via Cloudinary CDN.

**Build process**:

1. Contributors add/edit JSON files in `data/` directory
2. Build system validates files and generates `public/manifest.json`
3. Vite copies `public/` contents to `dist/` during build
4. Netlify deploys the `dist/` directory

## CSS standards (critical)

This project uses **HSL color format exclusively**:

- ✅ CORRECT: `color: hsl(248, 53.50%, 57.80%);`
- ❌ WRONG: `color: #7B68EE;` or `color: rgb(123, 104, 238);`

**Why HSL?**

- Students can easily adjust lightness for hover states
- Maintains consistent hue across the design
- More semantic than hex codes

**CSS terminology**: Use "CSS custom property" not "CSS variable" when referring to `--variable-name` syntax.

## Key constraints

### What NOT to add

- No testing frameworks
- No frameworks or libraries (React, Vue, etc.)
- No TypeScript
- No premature optimization
- No additional build complexity beyond Vite + validation

### What NOT to assume

- Do not assume number of entries in JSON files
- Do not add features beyond the basic random quote display
- Do not manually edit manifest.json (it's auto-generated)

## Student contribution workflow

1. Student forks the repository
2. Student runs `npm install` and `npm run dev`
3. Student creates a new branch
4. Student adds **one new JSON file** to `data/` (never edits existing files)
5. Validation runs automatically during development
6. Student tests in browser at `localhost:5173`
7. Student commits and opens a pull request
8. GitHub Actions validates the PR automatically
9. **Zero merge conflicts** because each student has their own file

**Key points**:

- Build system auto-generates manifest (students don't touch it)
- Validation catches errors immediately during development
- CI/CD validates all PRs before merge
- Students only need to know: add JSON file, run `npm run dev`, test, commit

## Documentation standards

- Markdown is the primary documentation format
- Keep tone descriptive, not instructional
- Document **norms and expectations**, not step-by-step instructions
- Treat documentation as a professional communication tool

## Important context

This repository was refactored from "Magic Fortune Teller" to support:

- Real-world collaboration patterns
- Data-driven design thinking
- Preparation for future JavaScript lessons on objects/arrays
- Git workflow education

See [prompt1.md](prompt1.md) for the original refactoring requirements.
