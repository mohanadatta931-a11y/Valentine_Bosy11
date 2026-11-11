# Implementation Plan — 11/11 Valentine Tribute Hero & Rose Portrait Refinement

## Goal
Update the Hero section and Fiancée Rose Portrait to match the exact layout, typography, circular crimson halo, and realistic dark red velvet rose cluster from your reference screenshots, while displaying your uploaded transparent Photoroom portrait directly without any pixel editing or modification.

---

## Confirmed Design & Functional Decisions

- **Untouched Fiancée Portrait**: Render the uploaded transparent Photoroom portrait directly inside the glowing circular crimson frame without running any background-removal algorithm or pixel manipulation on her image, preserving 100% of her face, hands, and attire cleanly.
- **Photorealistic Dark Velvet Rose Bed**: Restore the exact U-shaped cluster of deep crimson velvet roses cradling the lower portion of the circular portrait frame, matching the realistic rose arrangement shown in your reference screenshots.
- **Exact Hero Layout & Romantic Copy**:
  - **Ambient Rose Backdrop**: Subtle dark velvet rose texture behind the Hero composition over the deep obsidian-crimson theme (`#140204`).
  - **Editorial Typography & Hierarchy**:
    - `HAPPY 11/11`
    - `VALENTINE` (oversized rose-gold Didone serif `#D59B8D`)
    - `TO MY FIANCÉE.`
    - `PURE CONSCIENCE • MY SAFE HOME • FOREVER YOURS`
    - Romantic lead message: *"How many times in a lifetime do we meet someone who loves so purely? Your heart is my warmest home, and I am staying yours until the very end of my life."*
    - Primary action button: `BLOOM YOUR ROSES →`
  - **Responsive Mobile & Desktop Alignment**: Portrait above typography on mobile viewports, and side-by-side split composition on desktop viewports with the rotating `MY FOREVER VALENTINE • 11 : 11` seal on the upper-right edge of the crimson circle.
- **Preserved Features Across the Page**:
  - Slow, gentle falling rose petals from the top of the screen.
  - Three floating rose bouquets with transparent backgrounds and no cards or drop-shadow boxes.
  - Interactive blooming rose garden without the visible song player bar, while keeping your romantic song playing and looping seamlessly in the background.

---

## Architecture & Visual Composition

```
+-------------------------------------------------------------------------+
|  TOP BAR: MY VALENTINE (11·11)     NAV LINKS       [ PLAY / PAUSE SONG ]|
+-------------------------------------------------------------------------+
|                                                                         |
|  LEFT COLUMN (Desktop) / BOTTOM (Mobile)   RIGHT COLUMN / TOP (Mobile)  |
|  ---------------------------------------   ---------------------------  |
|  HAPPY 11/11                                    .---~~~~~~~---.         |
|  VALENTINE                                    /   Crimson Halo  \       |
|  TO MY FIANCÉE.                              |  [Untouched Photo] |     |
|                                              |   of Your Fiancée  |     |
|  PURE CONSCIENCE • MY SAFE HOME •            |  (Zero Pixel Edit) |     |
|  FOREVER YOURS                                \  **************  /      |
|                                                `~Realistic Red~'        |
|  "How many times in a lifetime do we             Velvet Roses           |
|   meet someone who loves so purely?..."                                 |
|                                                                         |
|  [ BLOOM YOUR ROSES -> ]                                                |
|                                                                         |
+-------------------------------------------------------------------------+
|  SECTION 2: ROSES FOR MY FIANCÉE (3 Floating Bouquets, No Background)   |
+-------------------------------------------------------------------------+
|  SECTION 3: INTERACTIVE BLOOMING ROSE GARDEN (Background Song Active)   |
+-------------------------------------------------------------------------+
|  SECTION 4: SATIN RIBBON & SEALED LOVE LETTER MODAL                     |
+-------------------------------------------------------------------------+
```

---

## Implementation Phases

1. **Direct Untouched Portrait Integration**
   - Update the portrait asset reference to use your uploaded transparent Photoroom image directly inside an `<img>` element positioned cleanly within the circular crimson halo.
   - Remove all algorithmic pixel-cutting on her photo so her face, smile, and hands remain completely natural and untouched.

2. **Realistic Dark Velvet Rose Cradle Restoration**
   - Restore the U-shaped bed of photorealistic dark red velvet roses layered across the bottom of the circular frame so she appears to emerge naturally from the roses exactly as in your screenshot.

3. **Hero Layout & Copy Synchronization**
   - Restore the ambient dark rose backdrop layer, the circular border ring, and the romantic paragraph above the `BLOOM YOUR ROSES` button on both mobile and desktop layouts.
   - Verify compilation, lint checks, and visual rendering across desktop and mobile viewports.
