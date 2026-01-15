# Magic quotes

A collaborative web application for displaying random quotes, featuring HAP™ from HAP's Learning Lab. Built as an educational project to teach Git workflows, structured data, and modern web development practices.

🌐 **[View Live Demo](https://magic-quotes.netlify.app)**

## Quick start

### For contributors

1. Fork and clone this repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Add your JSON file to the `data/` directory (see [data/README.md](data/README.md))
5. Test your changes at `http://localhost:5173`
6. Commit and open a pull request

### For users

Visit the [live demo](https://magic-quotes.netlify.app) or run locally with `npm run dev`.

## Project structure

- `data/` - Quote data files (one per contributor, source files)
- `public/` - Static assets copied to build output
  - `script.js` - Application logic
  - `manifest.json` - Generated list of data files (auto-generated)
  - `data/` - Copied data files for deployment
- `index.html` - Single-page application with HAP Learning Lab design
- `scripts/` - Build and validation scripts
- `dist/` - Build output (generated, deployed to Netlify)

## How it works

### Collaboration model

- **One JSON file per contributor** eliminates merge conflicts
- **Automated validation** catches errors before merge
- **Generated manifest** removes manual maintenance
- **GitHub Actions** validates all pull requests

### Data structure

Each contributor creates a structured JSON file with:

- Author information
- Collection description
- Array of quote entries with metadata

This structure teaches:

- Working with JavaScript objects and arrays
- Data modeling and schema design
- JSON format and validation

### Build system

The project uses Vite for development and validation:

```bash
npm run dev       # Start dev server with auto-validation
npm run build     # Build for production
npm run validate  # Validate JSON files only
npm run preview   # Preview production build
```

The build automatically:

1. Scans the `data/` directory for source files
2. Validates file naming convention (`quote-*.json`)
3. Validates each JSON file against schema (field lengths, ID format)
4. Checks for duplicate IDs across all files
5. Blocks spam content (URLs, emails, phone numbers)
6. Generates `public/manifest.json` with file list
7. Copies all static assets from `public/` to `dist/`
8. Deploys `dist/` to Netlify

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines and [data/README.md](data/README.md) for technical details.

All contributions must:

- Follow the JSON schema and content guidelines
- Name files using `quote-yourname.json` pattern (lowercase, hyphens only)
- Add a new file (never edit existing files)
- Pass automated validation (no URLs, emails, or phone numbers in quotes)
- Include 1-25 quote entries (max 500 characters each)
- Complete the PR checklist confirming guidelines were followed

## Educational context

This repository demonstrates:

- **Real-world collaboration patterns** via Git/GitHub
- **Data-driven design** with structured JSON
- **Build automation** with Vite and npm scripts
- **CI/CD concepts** with GitHub Actions
- **Professional documentation** using Markdown

Students learn modern web development practices while contributing meaningful content.

## AI-assisted content

Contributors are encouraged to use AI tools to generate quote content, with the expectation that humans will edit and curate the results. This teaches:

- Effective prompt engineering
- Critical evaluation of AI outputs
- Human-AI collaboration workflows

## About HAP's Learning Lab

This project features **HAP™** (HyBit A. ProtoBot™), Prof. Teeters' apprentice learner. HAP learns alongside students, demonstrating that even AI assistants are always learning new things. The warm, approachable design follows the HAP Learning Lab style guide, making technical concepts feel accessible and friendly.

## Deployment

This site is deployed on Netlify and automatically rebuilds when changes are pushed to the main branch. The deployment process:

1. GitHub triggers Netlify on push to main
2. Netlify runs `npm run build`
3. Build validates data, generates manifest, and creates `dist/`
4. Netlify serves `dist/` directory at magic-quotes.netlify.app

## License

This project uses a dual-license model:

- **Code**: MIT License (see [LICENSE.md](LICENSE.md))
- **HAP™ character and educational content**: Proprietary (see [TRADEMARK.md](TRADEMARK.md))

You're free to use, modify, and distribute the code, but the HAP character, design, and educational methodology remain proprietary to Prof. Cynthia Teeters.
