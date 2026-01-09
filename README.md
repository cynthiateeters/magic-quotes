# Magic quotes

A collaborative web application for displaying random quotes. Built as an educational project to teach Git workflows, data structures, and modern web development practices.

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

Simply open `index.html` in a browser, or visit the deployed site.

## Project structure

- `data/` - Quote data files (one per contributor)
- `index.html` - Single-page application
- `script.js` - Application logic
- `manifest.json` - Generated list of data files (auto-generated)
- `scripts/` - Build and validation scripts

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

1. Scans the `data/` directory
2. Validates each JSON file against schema
3. Checks for duplicate IDs
4. Generates `manifest.json` with file list

## Contributing

See [data/README.md](data/README.md) for detailed contribution guidelines.

All contributions must:

- Follow the JSON schema
- Add a new file (never edit existing files)
- Pass automated validation
- Include at least one quote entry

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

## License

See [LICENSE.md](LICENSE.md)
