# Quote data files

## Contribution model

- **One JSON file per contributor**
- **Never edit other contributors' files**
- **Add your file, commit, and open a PR**

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

- `author`: Your name
- `about`: Brief description
- `entries`: Array of quote objects (minimum 1)
- `id`: Unique identifier (use your name + number, e.g., "alice-1")
- `category`: Type of quote (developer-wisdom, motivational, humorous, etc.)
- `tone`: Emotional tone (reflective, playful, encouraging, etc.)
- `text`: The actual quote
- `source`: How quote was created (ai-assisted, original, etc.)

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
