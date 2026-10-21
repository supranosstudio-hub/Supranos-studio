# 3D Book Component - Quick Reference

## 📋 What You Got

1. **`Book3D.tsx`** — Interactive 3D book viewer component
2. **`VentureBook.tsx`** — (Optional) Venture cards with book modals
3. **`INTEGRATION_GUIDE.md`** — Detailed documentation
4. **`SETUP_CHECKLIST.md`** — Step-by-step setup
5. **`page-example.tsx`** — Code examples
6. **`QUICK_REFERENCE.md`** — This file

---

## 🚀 The Fastest Path to "Working"

### 1. Fix CSS (Right Now!)
```bash
cd /Users/srinivas/supranos/Supranos-studio
rm -rf .next .next-broken-*
npm install
npm run dev
```
✅ CSS should render at `http://localhost:3000`

### 2. Copy Components
```bash
# Copy to your project
cp Book3D.tsx components/home/
cp VentureBook.tsx components/home/  # optional
```

### 3. Use It (30 seconds)
```tsx
import Book3D from "@/components/home/Book3D";

export default function Page() {
  return (
    <Book3D 
      pages={[
        { title: "Page 1", location: "Place", imageSrc: "/image1.jpg" },
        { title: "Page 2", location: "Place", imageSrc: "/image2.jpg" },
      ]}
      height="520px"
    />
  );
}
```

Done! 🎉

---

## 📚 Book3D Features

| Feature | How To |
|---------|--------|
| **Tilt** | Move mouse over book — automatic 3D tilt |
| **Turn Pages** | Click left/right arrows or use keyboard |
| **Zoom** | Click +/- buttons (50%-200%) |
| **Responsive** | Works on mobile, tablet, desktop |
| **Dark Mode** | Uses your CSS theme variables |

---

## 🎯 Two Ways to Integrate

### Simple Path
```tsx
<Book3D pages={myPages} height="400px" />
```
**Just render the book. That's it.**

### Advanced Path
```tsx
<VentureBook ventures={VENTURES} ventureBooks={bookData} />
```
**Clickable venture cards that open book modals.**

---

## 🖼️ Page Structure

```tsx
{
  title: "Marina Bay Sands",        // Page title
  location: "Bayfront, Singapore",  // Subtitle
  imageSrc: "/images/mbs.jpg"       // Image URL
}
```

---

## 🎨 Colors Used

From your `app/globals.css`:
- `--paper` → Background (light cream)
- `--ink` → Text (dark brown)
- `--muted` → Muted text
- `--avst-paper*` → Book background tones

To customize, edit CSS variables or change Tailwind class names in `Book3D.tsx`.

---

## 📱 Responsive Sizes

- **Mobile:** Stacked, full-width
- **Tablet:** Medium layout
- **Desktop:** Full 3D tilt effect with shadows

All built-in with Tailwind `clamp()` — no breakpoint changes needed.

---

## ⚙️ Customization (Advanced)

### Tilt Sensitivity
Line 40 in `Book3D.tsx`:
```tsx
const maxAngle = 8;  // 0-15, higher = more tilt
```

### Zoom Range
Zoom buttons in `Book3D.tsx`:
```tsx
zoom - 10   // Step size
50, zoom    // Min (50%)
200, zoom   // Max (200%)
```

### Height
Pass any CSS value:
```tsx
<Book3D pages={...} height="600px" />
<Book3D pages={...} height="clamp(300px, 50vh, 600px)" />
```

---

## ✅ Checklist Before Going Live

- [ ] CSS renders locally (`npm run dev`)
- [ ] Components copied to `components/home/`
- [ ] Images placed in `/public/images/`
- [ ] Page array configured
- [ ] Tested on desktop (3D tilt visible)
- [ ] Tested on mobile (controls work)
- [ ] Build succeeds (`npm run build`)

---

## 🚨 Common Issues

| Problem | Fix |
|---------|-----|
| CSS broken | `rm -rf .next && npm install && npm run dev` |
| Images not loading | Check paths start with `/` → `/images/...` |
| No 3D tilt | Hover (mouse), not touch device |
| Component not found | File at `components/home/Book3D.tsx` ? |
| Type errors | Use TypeScript: `pages: Book3DProps["pages"]` |

---

## 📖 Where to Learn More

1. **`INTEGRATION_GUIDE.md`** — Full documentation
2. **`page-example.tsx`** — Code examples
3. **`SETUP_CHECKLIST.md`** — Step-by-step instructions
4. **Original:** https://github.com/MengTo/sketchbook

---

## 💡 Tips

✅ **Do:**
- Use high-quality images (2000px+ width)
- Provide 2-5 pages per book
- Test on actual device/browser
- Keep images under 500KB each

❌ **Don't:**
- Nest Book3D deeply in DOM (affects performance)
- Use very large images (>1MB)
- Change CSS structure without understanding it
- Override 3D transform styles

---

## 🎬 Show Time

Your book component is ready! 

1. Copy components
2. Add your images
3. Pass page data
4. Ship it

That's all there is to it. 🚀

---

*Questions? See `INTEGRATION_GUIDE.md` or the examples in `page-example.tsx`.*
