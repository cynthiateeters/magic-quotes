# Contributing to Magic Quotes

Thank you for your interest in contributing to Magic Quotes! This project welcomes contributions from learners at all levels.

## How to contribute

1. **Fork** this repository to your GitHub account
2. **Clone** your fork locally
3. **Create a branch** for your contribution
4. **Add your JSON file** to the `data/` folder
5. **Run validation** with `npm run dev`
6. **Submit a pull request**

## Content guidelines

All contributions must follow these guidelines to be accepted.

### Acceptable content

- Motivational and inspirational quotes
- Developer wisdom and programming insights
- Humorous observations about technology and learning
- Original quotes you've written
- AI-assisted content (properly attributed)

### Unacceptable content

The following will result in immediate rejection:

- **Offensive material**: Hate speech, discrimination, or content targeting any group
- **Inappropriate content**: Profanity, sexual content, or violent themes
- **Copyrighted material**: Quotes from books, movies, or songs without permission
- **Spam**: Promotional content, advertisements, or self-promotion
- **Misinformation**: False claims presented as facts
- **Personal attacks**: Content targeting specific individuals

### Attribution requirements

- If using AI-generated content, set `source` to `"ai-assisted"`
- Include `prompt_notes` describing how you crafted the prompt

## Technical requirements

### File naming

Name your file using the pattern: `quote-yourname.json`

Examples:

- `quote-jane.json`
- `quote-jsmith.json`

### ID format

Each entry needs a unique `id` field:

- Use only lowercase letters, numbers, and hyphens
- Minimum 3 characters, maximum 50
- Include your name to prevent collisions

Examples:

- `jane-001`
- `jsmith-motivation-1`

### Entry limits

- Maximum **25 entries** per contributor file
- Maximum **500 characters** per quote text
- Quality over quantity is preferred

### Required fields

Every entry must include:

| Field    | Description       | Max length |
| -------- | ----------------- | ---------- |
| id       | Unique identifier | 50 chars   |
| category | Topic category    | 50 chars   |
| tone     | Emotional tone    | 50 chars   |
| text     | The quote itself  | 500 chars  |
| source   | Origin of quote   | 100 chars  |

Optional:

| Field        | Description       | Max length |
| ------------ | ----------------- | ---------- |
| prompt_notes | AI prompt details | 300 chars  |

## Example contribution

```json
{
  "author": "Jane Smith",
  "about": "Quotes about learning and growth",
  "entries": [
    {
      "id": "jane-001",
      "category": "learning",
      "tone": "encouraging",
      "text": "Every line of code you write is a step forward.",
      "source": "ai-assisted",
      "prompt_notes": "Asked for short motivational quotes for new programmers"
    }
  ]
}
```

## Validation

Before submitting:

1. Run `npm install` (first time only)
2. Run `npm run dev` to start the dev server
3. Check the terminal for validation errors
4. Test your quotes in the browser

The build system will:

- Validate JSON syntax
- Check schema compliance
- Detect duplicate IDs across all files

## Code of conduct

By contributing, you agree to:

- Be respectful and inclusive
- Accept constructive feedback gracefully
- Help maintain a positive learning environment
- Follow these guidelines consistently

## Questions?

If you're unsure whether your content is appropriate, please open an issue to ask before submitting.
