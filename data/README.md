# Quote data files

This directory contains structured JSON files for the Magic Quotes project. Each contributor adds their own file to demonstrate real-world Git collaboration patterns without merge conflicts.

📖 **New here?** See the [main README](../README.md) for project overview and [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines.

## Contribution model

- **One JSON file per contributor** - Eliminates merge conflicts
- **Never edit other contributors' files** - Work independently
- **Add your file, commit, and open a PR** - Standard Git workflow

## File naming

Use format: `quote-{yourname}.json`

Examples:

- `quote-alice.json`
- `quote-bob.json`
- `quote-charlie.json`

## JSON structure

Each file must follow this schema:

```json
{
  "author": "Your Name",
  "about": "Short description of your quote collection",
  "entries": [
    {
      "id": "unique-id-1",
      "category": "developer-wisdom",
      "tone": "reflective",
      "text": "Your quote text here",
      "source": "ai-assisted",
      "prompt_notes": "How you shaped the AI prompt"
    }
  ]
}
```

## Required fields

| Field      | Description                           | Constraints                                  |
| ---------- | ------------------------------------- | -------------------------------------------- |
| `author`   | Your name                             | Max 100 chars                                |
| `about`    | Brief description                     | Max 200 chars                                |
| `entries`  | Array of quote objects                | 1-25 entries                                 |
| `id`       | Unique identifier (e.g., "alice-001") | Lowercase, hyphens, numbers only; 3-50 chars |
| `category` | Type of quote                         | Max 50 chars                                 |
| `tone`     | Emotional tone                        | Max 50 chars                                 |
| `text`     | The actual quote                      | Max 500 chars                                |
| `source`   | How quote was created                 | Max 100 chars                                |

## Content rules

The validation system automatically blocks:

- **URLs** (links starting with `http://`, `https://`, or `www.`)
- **Email addresses**
- **Phone numbers**

This prevents spam and keeps quotes focused on the content itself.

## Validation

Run `npm run validate` to check your file before committing.

The build system will automatically:

- Validate your JSON structure
- Check for duplicate IDs
- Ensure all required fields are present
- Add your file to the manifest

## Categories

Suggested categories (feel free to create your own):

- developer-wisdom
- motivational
- humorous
- philosophical
- practical
- career-advice

## Tones

Suggested tones (feel free to create your own):

- reflective
- playful
- encouraging
- ironic
- thoughtful
- serious
- lighthearted

## Using AI assistance

You're encouraged to use AI tools (like ChatGPT, Claude, etc.) to help generate quote content. This teaches:

- **Prompt engineering** - Crafting effective prompts
- **Critical evaluation** - Assessing AI outputs
- **Human curation** - Editing and selecting the best results

**Best practices**:

1. Start with a clear prompt describing the type of quotes you want
2. Generate multiple options and select the best ones
3. Edit AI-generated text to match your voice
4. Document your process in `prompt_notes` field
5. Always review for accuracy and appropriateness

**Example workflow**:

```text
Prompt: "Generate 5 encouraging quotes about learning to code,
         written in a friendly, conversational tone"

→ Review AI output
→ Select best 2-3 quotes
→ Edit for clarity and authenticity
→ Add to your JSON file with source: "ai-assisted"
```
