# 3D Book Component - Setup Checklist

## 🎯 Quick Start

### Step 1: Fix CSS Issue (DO THIS FIRST)
- [ ] Open Terminal and run:
  ```bash
  cd /Users/srinivas/supranos/Supranos-studio
  rm -rf .next .next-broken-* out-old-*
  npm install
  npm run dev
  ```
- [ ] Verify CSS renders at `http://localhost:3000`
- [ ] If CSS still doesn't render, check browser DevTools Console for errors

---

## Step 2: Copy Components

Copy these three files to your project:

- [ ] **`Book3D.tsx`** → `components/home/Book3D.tsx`
- [ ] **`VentureBook.tsx`** → `components/home/VentureBook.tsx` (optional)
- [ ] **`INTEGRATION_GUIDE.md`** → Keep for reference

### Via Command Line:
```bash
cd /Users/srinivas/supranos/Supranos-studio

# Copy Book3D (required)
cp ~/Downloads/Book3D.tsx components/home/

# Copy VentureBook (optional, for venture integration)
cp ~/Downloads/VentureBook.tsx components/home/
```

---

## Step 3: Choose Your Integration

### Option A: Standalone Book (Easy) ✅

Just import and use `Book3D` directly:

```tsx
import Book3D from "@/components/home/Book3D";

const pages = [
  {
    title: "Page Title",
    location: "Location Name",
    imageSrc: "/images/image.jpg",
  },
];

<Book3D pages={pages} height="520px" />
```

**No changes needed to other files!**

---

### Option B: Interactive Ventures (More Complex)

1. **Copy `VentureBook.tsx`** to `components/home/`
2. **Add book data** to your page component
3. **Replace ventures section** in `app/page.tsx`

See `page-example.tsx` for complete example.

---

## Step 4: Add Images

Images need to be placed in `/public/images/` or any accessible URL:

```
public/
  images/
    umedia-01.jpg
    umedia-02.jpg
    avst-01.jpg
    avst-02.jpg
    ... etc
```

Then reference them:
```tsx
imageSrc: "/images/umedia-01.jpg"
```

---

## Step 5: Test Locally

```bash
npm run dev
```

Then:
- [ ] Navigate to the page with the book
- [ ] Hover over the book → Should see 3D tilt effect
- [ ] Click left/right arrows → Pages should change
- [ ] Click zoom buttons → Book should zoom 50%-200%
- [ ] On mobile → Touch controls should work

---

## Step 6: Build & Deploy

When ready to deploy:

```bash
npm run build
npm run start  # Test locally
# Then deploy to GitHub Pages, Vercel, etc.
```

---

## ❌ Troubleshooting

### CSS Still Not Rendering?

1. **Check Node version:**
   ```bash
   node --version  # Should be 18+ or 24+
   ```

2. **Clear everything and reinstall:**
   ```bash
   rm -rf .next node_modules package-lock.json
   npm cache clean --force
   npm install
   npm run dev
   ```

3. **Check PostCSS config:**
   - File `postcss.config.mjs` should exist
   - Content should be:
     ```js
     export default {
       plugins: {
         "@tailwindcss/postcss": {},
       },
     };
     ```

4. **Check Tailwind in globals.css:**
   - First line should be: `@import "tailwindcss";`
   - Not the old `@tailwind` directives

### Images Not Loading?

- [ ] Image files exist in `/public/images/`
- [ ] Path starts with `/` (e.g., `/images/photo.jpg`)
- [ ] File extension is correct (.jpg, .png, .webp)
- [ ] File size is reasonable (<500KB ideal)

### 3D Tilt Not Working?

- [ ] Using desktop browser (not mobile)
- [ ] JavaScript is enabled
- [ ] Not in an iframe
- [ ] Try different browser (Chrome, Firefox, Safari)

### Book Component Won't Import?

- [ ] File is at `components/home/Book3D.tsx` ✅
- [ ] Check TypeScript errors in terminal
- [ ] Try: `npm run dev` again after copying file

---

## 📝 Optional: Customize

### Change Tilt Sensitivity
In `Book3D.tsx`, line ~40:
```tsx
const maxAngle = 8; // 0-15, higher = more tilt
```

### Change Zoom Range
In `Book3D.tsx`, zoom buttons:
```tsx
Math.max(50, zoom - 10)  // Min zoom: 50%
Math.min(200, zoom + 10) // Max zoom: 200%
```

### Change Colors
Edit `app/globals.css` CSS variables:
```css
:root {
  --paper: #F4F1EA;  /* Background */
  --ink: #17150F;    /* Text */
  --muted: #6E6A5E;  /* Muted text */
}
```

---

## 🚀 Done!

Once these steps are complete, your 3D book component is ready to use.

**Questions?** See `INTEGRATION_GUIDE.md` for detailed docs.

---

## File Checklist

- [ ] `Book3D.tsx` copied to `components/home/`
- [ ] `VentureBook.tsx` copied (if using ventures)
- [ ] CSS rendering at localhost:3000
- [ ] Images placed in `/public/images/`
- [ ] Component imported in your page
- [ ] Pages array configured with correct image paths
- [ ] Tested locally with `npm run dev`
- [ ] Ready to build!
