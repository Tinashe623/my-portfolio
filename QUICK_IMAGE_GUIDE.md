# 📸 Quick Guide: Add Your Real Project Screenshots

## ✅ **Currently Using**

Your portfolio now uses **beautiful Unsplash placeholder images** that display immediately! These look professional while you gather real screenshots.

---

## 🎯 **To Add Your Real Screenshots**

### **Step 1: Take Screenshots**

1. Open each project in your browser
2. Press `F12` → Toggle device toolbar (Ctrl+Shift+M)
3. Set width to **1200px**
4. Take screenshot (Full page or specific section)

### **Step 2: Optimize Images**

1. Go to [TinyPNG.com](https://tinypng.com)
2. Upload your screenshots
3. Compress them (target <500KB each)
4. Download optimized images

### **Step 3: Add to Project**

Save images to: `public/images/projects/`

**Required filenames:**

- `school-website.jpg`
- `netflix-clone.jpg`
- `todo-app.jpg`
- `temp-converter.jpg`
- `amazon-ui.jpg`
- `saeku-frontend.jpg`
- `saeku-backend.jpg`

### **Step 4: Update Code**

In `src/pages/PortfolioModern.jsx`, replace the Unsplash URLs:

```javascript
// Change from:
image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop&q=80",

// To:
image: "/images/projects/school-website.jpg",
```

---

## 🎨 **Image Recommendations**

### **Best Dimensions**

- **Width**: 1200-1600px
- **Height**: 800-1000px
- **Aspect Ratio**: 3:2 or 16:10
- **Format**: JPG or WebP
- **Size**: Under 500KB each

### **What to Capture**

1. **Homepage/Hero** - Main landing view
2. **Clean UI** - No browser chrome
3. **Key Features** - Most impressive parts
4. **Desktop View** - Full responsive layout

### **Pro Tips**

- ✅ Use consistent zoom level (100%)
- ✅ Hide browser UI (F11 fullscreen mode)
- ✅ Capture at good resolution
- ✅ Show your best work
- ❌ Avoid Lorem Ipsum text
- ❌ Don't include broken layouts
- ❌ Skip personal/sensitive data

---

## 🚀 **Quick Tools**

### **Screenshot Tools**

- **Windows**: Win+Shift+S, Snipping Tool
- **Mac**: Cmd+Shift+4
- **Browser**: DevTools screenshot feature
- **Extensions**: Awesome Screenshot, Full Page Screen Capture

### **Image Editors**

- [Photopea](https://photopea.com) - Free Photoshop alternative
- [Canva](https://canva.com) - Easy design tool
- [Squoosh](https://squoosh.app) - Google's image optimizer

### **Mockup Generators**

- [Screely](https://screely.com) - Beautiful browser mockups
- [Shots.so](https://shots.so) - Device mockups
- [Mockuphone](https://mockuphone.com) - Phone/tablet frames

---

## 💡 **Current Placeholder Images**

Your portfolio uses these themed Unsplash images:

1. **School Website** - Education/books theme
2. **Saeku Frontend** - Business/tech theme
3. **Saeku Backend** - Data/servers theme
4. **Netflix Clone** - Entertainment/streaming theme
5. **Todo App** - Productivity/checklist theme
6. **Temperature Converter** - Charts/data theme
7. **Amazon UI** - Shopping/ecommerce theme

These look professional and thematic! You can keep them or replace with real screenshots anytime.

---

## 🔧 **Preventing Image Cutting**

### **The images are sized to:**

- Mobile: 180px height
- Tablet: 160px height
- Desktop: 200-240px height (featured: 240-280px)

### **If images still cut:**

Adjust in `PortfolioModern.jsx`:

```javascript
height={{
  base: "180px",    // Mobile
  md: "160px",      // Tablet
  lg: project.featured ? "240px" : "200px",  // Desktop
  xl: project.featured ? "280px" : "240px"   // Large
}}
```

Make these numbers smaller if cards still cut content.

---

## ✅ **You're All Set!**

Your portfolio looks amazing with the current placeholder images. When you're ready:

1. Take screenshots of your projects
2. Optimize them with TinyPNG
3. Save to `public/images/projects/`
4. Update the image URLs in the code

**No rush - the placeholders look professional!** 🎨

---

_Last Updated: October 28, 2025_
_Current Status: Using Unsplash Placeholders ✅_
