import fs from "fs/promises";
import path from "path";
import Ajv from "ajv";

const DATA_DIR = "./data";
const SCHEMA_PATH = "./scripts/quote-schema.json";
const MANIFEST_PATH = "./public/manifest.json";

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

      // Check for duplicate IDs across files
      for (const entry of data.entries) {
        if (allIds.has(entry.id)) {
          console.error(`❌ ${file}: Duplicate ID "${entry.id}" found`);
          hasErrors = true;
        } else {
          allIds.add(entry.id);
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
