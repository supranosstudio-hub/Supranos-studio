# 3D Book Component Integration Guide

## Overview

The `Book3D` component is a fully interactive 3D book viewer with:
- **3D perspective tilt** tracking based on mouse position
- **Page navigation** with previous/next arrows
- **Zoom controls** (50% - 200%)
- **Responsive design** using Tailwind CSS
- **Optional `VentureBook` wrapper** for displaying ventures with book content

## Files

1. **`Book3D.tsx`** — Core 3D book component (reusable)
2. **`VentureBook.tsx`** — Venture-specific wrapper with modal UI (optional)

---

## Installation

### Step 1: Copy Components to Your Project

```bash
# Copy the Book3D component to your components folder
cp Book3D.tsx components/home/

# Optional: Copy VentureBook if using ventures integration
cp VentureBook.tsx components/home/
```

### Step 2: Add to Your Project

Place them in:
- `components/home/Book3D.tsx`
- `components/home/VentureBook.tsx`

---

## Usage

### Option A: Standalone Book3D Component

Use the `Book3D` component directly to display a 3D book:

```tsx
import Book3D from "@/components/home/Book3D";

export default function MyPage() {
  const pages = [
    {
      title: "Marina Bay Sands",
      location: "Bayfront, Singapore",
      imageSrc: "/images/marina-bay-sands.jpg",
    },
    {
      title: "Gardens by the Bay",
      location: "Supertree Grove",
      imageSrc: "/images/gardens-by-the-bay.jpg",
    },
  ];

  return <Book3D pages={pages} height="520px" />;
}
```

### Option B: VentureBook Wrapper (Click Venture → Book Modal)

Use `VentureBook` to add clickable book modals to your venture list:

```tsx
import { VENTURES } from "@/lib/ventures";
import VentureBook from "@/components/home/VentureBook";

// Define book content for ventures
const ventureBooks = {
  umedia: {
    venture: VENTURES[0],
    pages: [
      {
        title: "UMedia Project 1",
        location: "Production Studio",
        imageSrc: "/images/umedia-01.jpg",
      },
      {
        title: "UMedia Project 2",
        location: "Post-Production",
        imageSrc: "/images/umedia-02.jpg",
      },
    ],
  },
  avst: {
    venture: VENTURES[2],
    pages: [
      {
        title: "AVST Episode 1",
        location: "Hyderabad Suburb",
        imageSrc: "/images/avst-01.jpg",
      },
      {
        title: "AVST Set Design",
        location: "Studio Floor",
        imageSrc: "/images/avst-02.jpg",
      },
    ],
  },
  // ... add more ventures
};

export default function Home() {
  return (
    <section id="ventures" className="px-[clamp(18px,6vw,110px)] py-[clamp(40px,8vw,120px)]">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-6 sm:mb-10">
        The index / six ventures
      </p>
      <VentureBook ventures={VENTURES} ventureBooks={ventureBooks} />
    </section>
  );
}
```

---

## Props

### Book3D Props

```tsx
interface Book3DProps {
  pages: Array<{
    title: string;
    location: string;
    imageSrc: string;
  }>;
  height?: string; // Default: "520px"
}
```

**Parameters:**
- `pages` — Array of book pages (required)
  - `title` — Page title (displayed below book)
  - `location` — Location/subtitle (displayed below book)
  - `imageSrc` — Image URL for the page
- `height` — Height of the book container (CSS value)

### VentureBook Props

```tsx
interface VentureBookProps {
  ventures: Venture[];
  ventureBooks: Record<string, VentureBookContent>;
}
```

---

## Customization

### Adjust 3D Tilt Sensitivity

In `Book3D.tsx`, find the tilt calculation:

```tsx
const maxAngle = 8; // Change this value (0-15 recommended)
const ry = (distX / (rect.width / 2)) * maxAngle;
const rx = (distY / (rect.height / 2)) * maxAngle * -1;
```

### Change Book Height

Pass a different height prop:

```tsx
<Book3D pages={pages} height="600px" />
```

### Customize Colors

The component uses your Tailwind theme colors:
- `bg-paper` — Background
- `text-ink` — Text color
- `text-muted` — Muted text
- `border-line` — Border color
- `bg-avst-paper*` — Book background (can be changed to `bg-paper`, etc.)

To customize, edit the color values in `app/globals.css` or change the class names in the component.

### Adjust Zoom Range

In `Book3D.tsx`, modify the zoom buttons:

```tsx
// Current range: 50% to 200%
setZoom(Math.max(50, zoom - 10)) // Zoom out step
setZoom(Math.min(200, zoom + 10)) // Zoom in step
```

---

## Responsive Behavior

The component is fully responsive:
- **Mobile:** Stacked layout, larger touch targets
- **Tablet:** Optimized for landscape
- **Desktop:** Full 3D tilt effect with shadows

On mobile, the component automatically disables mouse-based interactions while maintaining all touch-friendly buttons.

---

## Performance Notes

- ✅ Uses `will-change` and `transition` for smooth 60fps animations
- ✅ No external dependencies (pure React + Tailwind)
- ✅ Optimized for static export (`output: "export"`)
- ✅ Images should be pre-optimized (use `next/image` if not using static export)

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

Requires CSS support for:
- `transform-style: preserve-3d`
- `perspective`
- `backdrop-filter` (gracefully degrades)

---

## Troubleshooting

### CSS Not Rendering

If you still see CSS issues after cleaning the build:

```bash
cd /Users/srinivas/supranos/Supranos-studio
rm -rf .next .next-broken-* node_modules package-lock.json
npm install
npm run dev
```

### Images Not Loading

For static export, place images in:
```
/public/images/page-name.jpg
```

Reference them as:
```tsx
imageSrc: "/images/page-name.jpg"
```

### 3D Tilt Not Working

Ensure JavaScript is enabled and the component has focus. The tilt only works on non-touch devices (`@media (hover: hover)`).

---

## Examples

See `VentureBook.tsx` for a complete example of integrating with your venture data structure.

To add more ventures with books:

1. Add to `ventureBooks` object
2. Ensure `venture.name` matches the key
3. Provide 2-5 pages per venture
4. Use high-quality images (2000px+ width recommended)

---

## Questions?

Refer back to the sketchbook source (https://github.com/MengTo/sketchbook) for more advanced 3D techniques!
