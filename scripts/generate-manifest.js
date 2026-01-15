import fs from "fs/promises";
import path from "path";
import Ajv from "ajv";

const DATA_DIR = "./data";
const SCHEMA_PATH = "./scripts/quote-schema.json";
const MANIFEST_PATH = "./public/manifest.json";

// Patterns to block in quote text (spam/phishing prevention)
const BLOCKED_PATTERNS = [
  { pattern: /https?:\/\/\S+/gi, name: "URL" },
  { pattern: /www\.\S+/gi, name: "URL" },
  { pattern: /[\w.-]+@[\w.-]+\.\w+/gi, name: "email address" },
  { pattern: /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, name: "phone number" },
];

// Required file naming pattern: quote-*.json or example-quote.json
const VALID_FILENAME_PATTERN = /^(quote-[a-z0-9-]+|example-quote)\.json$/;

function checkBlockedContent(text, file, field) {
  const issues = [];
  for (const { pattern, name } of BLOCKED_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) {
      issues.push(`${file}: Found ${name} in ${field}: "${matches[0]}"`);
    }
  }
  return issues;
}

async function main() {
  const validateOnly = process.argv.includes("--validate-only");

  console.log("🔍 Scanning data directory...");

  // Read schema
  const schemaContent = await fs.readFile(SCHEMA_PATH, "utf-8");
  const schema = JSON.parse(schemaContent);

  // Initialize validator
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);

  // Find all JSON files in data/
  const files = await fs.readdir(DATA_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  if (jsonFiles.length === 0) {
    console.error("❌ No JSON files found in data/ directory");
    process.exit(1);
  }

  console.log(`📄 Found ${jsonFiles.length} JSON file(s)`);

  // Track validation results
  let hasErrors = false;
  const allIds = new Set();
  const dataFiles = [];

  // Validate each file
  for (const file of jsonFiles) {
    const filePath = path.join(DATA_DIR, file);
    const relativePath = `data/${file}`;

    // Check file naming convention
    if (!VALID_FILENAME_PATTERN.test(file)) {
      console.error(
        `❌ ${file}: Invalid filename. Must match pattern "quote-yourname.json" (lowercase, hyphens only)`,
      );
      hasErrors = true;
      continue;
    }

    try {
      const content = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(content);

      // Validate against schema
      const valid = validate(data);

      if (!valid) {
        console.error(`❌ ${file}: Schema validation failed`);
        console.error(JSON.stringify(validate.errors, null, 2));
        hasErrors = true;
        continue;
      }

      // Check for duplicate IDs and blocked content
      for (const entry of data.entries) {
        if (allIds.has(entry.id)) {
          console.error(`❌ ${file}: Duplicate ID "${entry.id}" found`);
          hasErrors = true;
        } else {
          allIds.add(entry.id);
        }

        // Check for URLs, emails, phone numbers in text fields
        const textIssues = checkBlockedContent(entry.text, file, "text");
        const notesIssues = entry.prompt_notes
          ? checkBlockedContent(entry.prompt_notes, file, "prompt_notes")
          : [];

        for (const issue of [...textIssues, ...notesIssues]) {
          console.error(`❌ ${issue}`);
          hasErrors = true;
        }
      }

      console.log(`✅ ${file}: Valid (${data.entries.length} entries)`);
      dataFiles.push(relativePath);
    } catch (error) {
      console.error(`❌ ${file}: ${error.message}`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error("\n❌ Validation failed");
    process.exit(1);
  }

  console.log(`\n✅ All files valid (${allIds.size} total entries)`);

  // Generate manifest if not validate-only mode
  if (!validateOnly) {
    const manifest = {
      generatedAt: new Date().toISOString(),
      dataFiles: dataFiles.sort(),
    };

    await fs.writeFile(
      MANIFEST_PATH,
      JSON.stringify(manifest, null, 2),
      "utf-8",
    );

    console.log(`📝 Generated ${MANIFEST_PATH}`);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
