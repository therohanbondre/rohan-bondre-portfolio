# public/projects/

Place your project screenshot images here.

## Expected Files

| File | Project | Used in |
|------|---------|---------|
| `city-grievance.png` | City Grievance Services | `data/static/projects.ts` → id: 1 → `image_url` |
| `stock-analytics.png` | Stock Analytics Platform | `data/static/projects.ts` → id: 2 → `image_url` |
| `network-monitoring.png` | Network Monitoring Lab | `data/static/projects.ts` → id: 3 → `image_url` |
| `stock-analytics-ai.png` | Stock Analytics AI Agent | `data/static/projects.ts` → id: 4 → `image_url` |
| `propvista.png` | PropVista – Intelligent Property Selection System | `data/static/projects.ts` → id: 5 → `image_url` |

## How to use

After placing each screenshot, update the `image_url` for the corresponding project
in `data/static/projects.ts`:

```ts
// Example — replace the placehold.co URL with the local path:
image_url: "/projects/city-grievance.png",
image_url: "/projects/stock-analytics.png",
image_url: "/projects/network-monitoring.png",
```

## Recommended image dimensions

- Size: 600×400 px (3:2 ratio)
- Format: `.png` or `.jpg`
- The project card uses `object-contain`, so any aspect ratio will display without cropping.
