# 📁 Assets Documentation

This document outlines all the image assets needed for the portfolio. Please add images following the naming conventions below.

---

## 📂 Folder Structure

```
public/
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   └── profile-photo.png          # Your profile picture (400x400+ px, square)
│   │   │
│   │   ├── projects/
│   │   │   ├── synapse-docs/
│   │   │   │   ├── thumbnail.png          # Card thumbnail (800x600 px recommended)
│   │   │   │   ├── screenshot-1.png       # Main dashboard/hero view
│   │   │   │   ├── screenshot-2.png       # Feature showcase
│   │   │   │   └── screenshot-3.png       # Knowledge graph or additional view
│   │   │   │
│   │   │   ├── haskell-run/
│   │   │   │   ├── thumbnail.png          # Extension icon or VS Code screenshot
│   │   │   │   ├── screenshot-1.png       # Extension in action
│   │   │   │   └── screenshot-2.png       # REPL or debugging view
│   │   │   │
│   │   │   └── attendease/
│   │   │       ├── thumbnail.png          # Extension popup or widget
│   │   │       ├── screenshot-1.png       # Popup interface
│   │   │       └── screenshot-2.png       # Floating widget on portal
│   │   │
│   │   ├── achievements/
│   │   │   └── adobe-hackathon-runner-up.png  # Certificate or announcement image
│   │   │
│   │   └── blog/
│   │       ├── synapse-docs-journey.png       # Cover for Synapse-Docs blog post
│   │       ├── vscode-extension-guide.png     # Cover for VS Code extension guide
│   │       ├── browser-extension-scraping.png # Cover for AttendEase blog post
│   │       └── hackathon-tips.png             # Cover for hackathon tips post
│   │
│   └── resume/
│       └── midhunan-resume.pdf            # Your resume PDF
```

---

## 🖼️ Image Specifications

### Profile Photo
- **File**: `profile-photo.png`
- **Size**: 400×400 px minimum (square)
- **Format**: PNG or WebP preferred
- **Usage**: About page, hero section

### Project Thumbnails
- **Size**: 800×600 px recommended (4:3 ratio)
- **Format**: PNG or WebP
- **Style**: Clean, high-contrast, shows the main UI

### Project Screenshots
- **Size**: 1200×800 px or higher
- **Format**: PNG or WebP
- **Tip**: Use browser mockups or device frames for a polished look

### Blog Cover Images
- **Size**: 1200×630 px (Open Graph optimized)
- **Format**: PNG or WebP
- **Style**: Text overlays are optional, keep it minimal

### Achievement Images
- **Size**: Any reasonable size
- **Format**: PNG, JPG, or WebP
- **Content**: Certificates, LinkedIn announcements, or prize photos

---

## 🔄 How to Add Images

1. Place your images in the corresponding folders following the naming convention
2. The website will automatically pick them up based on the data files in `src/data/`
3. For new projects, update `src/data/projects.ts` with the correct image paths
4. For new blog posts, update `src/data/blog.ts`

---

## ✅ Checklist

### Profile
- [ ] `profile-photo.png` - Your professional photo

### Synapse-Docs
- [ ] `thumbnail.png`
- [ ] `screenshot-1.png`
- [ ] `screenshot-2.png`
- [ ] `screenshot-3.png`

### Haskell Run
- [ ] `thumbnail.png`
- [ ] `screenshot-1.png`
- [ ] `screenshot-2.png`

### AttendEase
- [ ] `thumbnail.png`
- [ ] `screenshot-1.png`
- [ ] `screenshot-2.png`

### Achievements
- [ ] `adobe-hackathon-runner-up.png`

### Blog Covers
- [ ] `synapse-docs-journey.png`
- [ ] `vscode-extension-guide.png`
- [ ] `browser-extension-scraping.png`
- [ ] `hackathon-tips.png`

### Resume
- [ ] `midhunan-resume.pdf`

---

## 🎨 Placeholder Images

Until you add real images, the site uses placeholder boxes. To generate quick placeholders:
- Use [Placekitten](https://placekitten.com) or [Unsplash](https://unsplash.com)
- Or create simple colored rectangles with Figma/Canva
