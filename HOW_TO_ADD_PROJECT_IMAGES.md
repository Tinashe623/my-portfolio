# 📸 How to Add Project Preview Images

## 🎯 Overview

Your portfolio now supports **live preview images** for all projects! This guide shows you how to add screenshots to make your portfolio even more impressive.

---

## 🖼️ What Was Added

### **Features**

- ✅ **Image previews** for each project
- ✅ **Hover zoom effect** - Images scale on hover
- ✅ **Gradient overlay** - Professional look at bottom
- ✅ **Fallback display** - Shows "Preview Coming Soon" if image missing
- ✅ **Responsive sizing** - Different heights per screen size
- ✅ **Lazy loading** - Images load efficiently

---

## 📁 How to Add Your Screenshots

### **Step 1: Create the Images Folder**

Create this folder structure in your project:

```
my-portfolio/
├── public/
│   └── images/
│       └── projects/          ← Create this folder
│           ├── school-website.jpg
│           ├── netflix-clone.jpg
│           ├── todo-app.jpg
│           ├── temp-converter.jpg
│           ├── amazon-ui.jpg
│           ├── saeku-frontend.jpg
│           └── saeku-backend.jpg
```

### **Step 2: Take Project Screenshots**

#### **Recommended Dimensions**

- **Optimal**: 1200 x 800 px (3:2 ratio)
- **Minimum**: 800 x 600 px
- **Maximum file size**: Under 500KB for fast loading

#### **How to Take Screenshots**

**For Deployed Projects:**

1. Open your project in a browser
2. Press `F12` to open DevTools
3. Click the device toggle (Ctrl+Shift+M)
4. Set width to 1200px
5. Press `Ctrl+Shift+P` → "Capture screenshot"

**For GitHub Projects:**

1. Visit the project's GitHub page
2. Look for deployed link or demo
3. Take a screenshot using tools like:
   - Windows: **Snipping Tool** or **Win+Shift+S**
   - Mac: **Cmd+Shift+4**
   - Browser: **Full Page Screenshot** extension

**For Projects Without Live Demo:**

- Screenshot the GitHub README
- Screenshot the code editor view
- Create a mockup using tools like:
  - [Screely.com](https://screely.com) - Free screenshot beautifier
  - [Mockuphone.com](https://mockuphone.com) - Device mockups
  - [Shots.so](https://shots.so) - Beautiful browser mockups

### **Step 3: Optimize Your Images**

#### **Compress Images**

Use these free tools to reduce file size:

- [TinyPNG.com](https://tinypng.com) - Excellent compression
- [Squoosh.app](https://squoosh.app) - Google's image optimizer
- [Compressor.io](https://compressor.io) - Online compression

#### **Rename Images**

Use the exact names from your portfolio code:

```javascript
✅ school-website.jpg
✅ netflix-clone.jpg
✅ todo-app.jpg
✅ temp-converter.jpg
✅ amazon-ui.jpg
✅ saeku-frontend.jpg
✅ saeku-backend.jpg
```

### **Step 4: Add Images to Your Project**

1. Copy your screenshots
2. Paste them into `public/images/projects/`
3. Make sure filenames match exactly

---

## 🎨 Image Configuration

### **Current Setup in Code**

```javascript
const projects = [
  {
    name: 'School Website',
    image: '/images/projects/school-website.jpg', // ← Image path
    // ... other properties
  },
]
```

### **Changing Image Paths**

If you want different names or formats:

```javascript
// Change from:
image: "/images/projects/school-website.jpg",

// To (example):
image: "/images/projects/my-school-site.png",
```

### **Supported Formats**

- ✅ `.jpg` / `.jpeg` - Best for photos/screenshots
- ✅ `.png` - Best for UI with transparency
- ✅ `.webp` - Modern format, smaller size
- ❌ `.gif` - Not recommended (large file size)

---

## 💡 Image Guidelines

### **Best Practices**

1. ✅ **Show the main UI** - Homepage or key feature
2. ✅ **Use clean screenshots** - No browser UI clutter
3. ✅ **Consistent aspect ratio** - 3:2 or 16:9
4. ✅ **High quality** - But compressed for web
5. ✅ **Light on brand colors** - Match your project's theme

### **What to Show**

- 🎯 **Hero section** - Main landing view
- 🎯 **Key features** - Most impressive part
- 🎯 **Clean UI** - Organized, professional
- 🎯 **Real data** - Not Lorem Ipsum if possible

### **What to Avoid**

- ❌ **Broken layouts** - Test before screenshot
- ❌ **Browser chrome** - Just the content
- ❌ **Personal data** - Blur sensitive info
- ❌ **Low resolution** - Blurry images look unprofessional

---

## 🎭 Temporary Solutions

### **Don't Have Screenshots Yet?**

The portfolio will show a nice fallback:

```
┌────────────────────────┐
│                        │
│  Preview Coming Soon   │
│                        │
└────────────────────────┘
```

### **Using Placeholder Images**

You can use placeholder services temporarily:

```javascript
// Temporary placeholder (replace with real screenshot later)
image: "https://via.placeholder.com/1200x800/1e293b/22d3ee?text=School+Website",
```

Popular placeholder services:

- [via.placeholder.com](https://via.placeholder.com)
- [placehold.co](https://placehold.co)
- [picsum.photos](https://picsum.photos)

---

## 🎨 Image Sizes Per Screen

The portfolio automatically adjusts image heights:

| Screen Size | Featured Projects | Regular Projects |
| ----------- | ----------------- | ---------------- |
| **Mobile**  | 180px             | 180px            |
| **Tablet**  | 140px             | 140px            |
| **Desktop** | 200px             | 160px            |

### **Why Different Sizes?**

- Featured projects get **more space** (larger card)
- Regular projects are **more compact**
- Mobile gets **taller images** for better viewing

---

## 🔥 Advanced Tips

### **1. Create a Thumbnail Script**

Create a script to batch-process your screenshots:

```bash
# Install ImageMagick
# Then use this command to resize all images:
magick mogrify -resize 1200x800^ -gravity center -extent 1200x800 -quality 85 *.jpg
```

### **2. Use GitHub Screenshots**

If your project has a good README with images:

```javascript
// Link directly to GitHub image
image: "https://raw.githubusercontent.com/YourUsername/project/main/screenshot.png",
```

### **3. Create Animated Previews**

For extra wow-factor, use short screen recordings:

```javascript
// Use a GIF or video (keep file size under 2MB)
image: "/images/projects/school-website.gif",
```

### **4. Multiple Screenshots**

To show multiple views later, you could add an array:

```javascript
images: [
  "/images/projects/school-home.jpg",
  "/images/projects/school-dashboard.jpg",
  "/images/projects/school-contact.jpg",
],
```

---

## ✅ Quick Start Checklist

- [ ] Create `public/images/projects/` folder
- [ ] Take screenshots of each project
- [ ] Optimize images (compress to <500KB each)
- [ ] Name files exactly as specified in code
- [ ] Copy images to the projects folder
- [ ] Test in browser (npm run dev)
- [ ] Verify images load correctly
- [ ] Check responsive behavior on mobile

---

## 🎯 Example: Complete Project Entry

```javascript
{
  name: "School Website",
  desc: "Full-featured school website with modern UI, responsive design, and clean architecture.",
  url: "https://github.com/Tinashe623/school-website",
  homepage: "https://my-school-website.netlify.app", // Live demo
  tags: ["React", "Vite", "Chakra UI"],
  featured: true,
  image: "/images/projects/school-website.jpg", // ← Your screenshot here
  gridArea: { base: "auto", md: "1 / 1 / 3 / 3" },
}
```

---

## 🚀 Result

Once you add images, your portfolio cards will display:

```
┌─────────────────────────────┐
│ ⭐ Featured                 │
│                             │
│  ┌─────────────────────┐   │
│  │                     │   │
│  │   PROJECT IMAGE     │   │
│  │    (Your screenshot)│   │
│  └─────────────────────┘   │
│                             │
│  School Website             │
│  Full-featured school...    │
│  [React] [Vite] [Chakra UI] │
│  [Code] [Live]              │
└─────────────────────────────┘
```

### **Features**

- ✨ **Visual appeal** - Immediate understanding
- 🎯 **Professional** - Shows actual work
- 💎 **Interactive** - Hover to zoom
- 📱 **Responsive** - Perfect on all screens

---

## 📝 Need Help?

### **Common Issues**

**Images not showing?**

- Check file path is correct
- Ensure folder is `public/images/projects/`
- Verify filename matches code exactly
- Clear browser cache (Ctrl+F5)

**Images too large?**

- Use [TinyPNG.com](https://tinypng.com) to compress
- Target: Under 500KB per image
- Consider using WebP format

**Images look blurry?**

- Use higher resolution source
- Minimum 800x600px
- Save at 85-95% quality

---

## 🎉 You're All Set!

Your portfolio now has beautiful project previews! Users can see your work at a glance, making your portfolio **10x more impressive**.

**Pro tip**: Update screenshots whenever you improve your projects to keep your portfolio fresh! 🚀

---

_Last Updated: October 25, 2025_
_Feature: Live Project Previews ✅_
