# Service Areas Management Guide

The service areas displayed in the "Service Area" dropdown menu are managed through content collections in `src/content/service-areas/`.

## Current Service Area Files

- `los-angeles.md` - Los Angeles
- `san-diego.md` - San Diego
- `san-francisco.md` - San Francisco
- `sacramento.md` - Sacramento
- `fresno.md` - Fresno
- `oakland.md` - Oakland

## How to Add a New Service Area

Create a new `.md` file in `src/content/service-areas/` with the following structure:

```markdown
---
name: "City Name"
href: "/service-area/city-name"
order: 7
---
```

### Fields Explanation

- `name`: The display name of the service area (shown in the dropdown menu)
- `href`: The URL path for the service area page
- `order`: Determines the display order in the dropdown (lower numbers appear first)

## Example: Adding "Riverside" Service Area

Create `src/content/service-areas/riverside.md`:

```markdown
---
name: "Riverside"
href: "/service-area/riverside"
order: 7
---
```

## Editing Existing Service Areas

Simply edit the corresponding `.md` file in `src/content/service-areas/`. Changes will automatically appear in the navigation dropdown after saving the file and the dev server reloads.

## Removing a Service Area

Delete the corresponding `.md` file from `src/content/service-areas/`. The area will be removed from the dropdown menu automatically.

## Important Notes

- Each service area file must have all required fields: `name`, `href`, and `order`
- The `order` field controls the display order (1 = first, 2 = second, etc.)
- Use lowercase with hyphens for the file name (e.g., `san-francisco.md`)
- The `href` should follow the pattern `/service-area/city-name`
