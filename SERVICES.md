# Services Management Guide

The service categories displayed in the navigation menu are managed through content collections in `src/content/services/`.

## Current Service Files

- `commercial.md` - Commercial Electrical Services
- `residential.md` - Residential Electrical Services
- `specialty.md` - Specialty Services
- `emergency.md` - Emergency Services

## How to Add a New Service Category

Create a new `.md` file in `src/content/services/` with the following structure:

```markdown
---
category: "Your Service Category Name"
href: "/your-category-url"
order: 5
services:
  - label: "Service Name 1"
    href: "/your-category-url/service-1"
  - label: "Service Name 2"
    href: "/your-category-url/service-2"
---
```

### Fields Explanation

- `category`: The display name of the service category (shown in the navigation)
- `href`: The URL path for the category page
- `order`: Determines the display order in the navigation (lower numbers appear first)
- `services`: Array of individual services under this category
  - `label`: The display name of the service
  - `href`: The URL path for the service page

## Example: Adding a New "Solar Services" Category

Create `src/content/services/solar.md`:

```markdown
---
category: "Solar Services"
href: "/solar"
order: 5
services:
  - label: "Solar Panel Installation"
    href: "/solar/installation"
  - label: "Solar Maintenance"
    href: "/solar/maintenance"
  - label: "Solar Inspection"
    href: "/solar/inspection"
---
```

## Editing Existing Services

Simply edit the corresponding `.md` file in `src/content/services/`. Changes will automatically appear in the navigation after saving the file and the dev server reloads.

## Important Notes

- Do not add README or documentation files inside `src/content/services/` as they will be loaded as service entries
- Each service file must have all required fields: `category`, `href`, `order`, and `services`
- The `order` field controls the display order (1 = first, 2 = second, etc.)
