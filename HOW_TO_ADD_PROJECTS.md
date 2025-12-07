# 📁 How to Add Projects to Your Portfolio

## 🎯 Quick Guide

Your portfolio supports **3 types of projects**:

1. **Solo Projects** - Your individual work
2. **Collaborative Projects** - Team projects where you contributed
3. **Featured Projects** - Highlighted work (solo or collaborative)

---

## 📝 Adding a Collaborative Project

Open `src/pages/PortfolioModern.jsx` and add your project to the `projects` array:

### **Template for Collaborative Projects**

```javascript
{
  name: "Project Name",
  desc: "Brief description of the project and your specific contributions.",
  url: "https://github.com/organization/repo-name",
  homepage: "https://project-demo.com", // Optional: live demo URL
  tags: ["React", "Node.js", "MongoDB"],
  image: "/images/projects/project.jpg", // Add project screenshot (NEW!)
  collaborative: true, // ✨ This marks it as a team project
  role: "Frontend Developer", // Your specific role
  team: "Team of 4", // Team size
  gridArea: { base: "auto", md: "3 / 2 / 4 / 4" }, // Grid position
}
```

### **Real Example**

```javascript
{
  name: "E-Commerce Platform",
  desc: "Full-stack e-commerce platform with payment integration. Built user dashboard, product catalog, and checkout flow.",
  url: "https://github.com/company/ecommerce-platform",
  homepage: "https://shop.example.com",
  tags: ["React", "Redux", "Stripe", "REST API"],
  collaborative: true,
  role: "Frontend Lead",
  team: "Team of 6",
  inProgress: false, // Set to true if still developing
  gridArea: { base: "auto", md: "3 / 2 / 4 / 4" },
}
```

---

## 🏷️ Project Properties Explained

| Property        | Type        | Required | Description                              |
| --------------- | ----------- | -------- | ---------------------------------------- |
| `name`          | string      | ✅ Yes   | Project name                             |
| `desc`          | string      | ✅ Yes   | Description + your role/contributions    |
| `url`           | string      | ✅ Yes   | GitHub repo URL                          |
| `homepage`      | string/null | ❌ No    | Live demo URL (set `null` if no demo)    |
| `tags`          | array       | ✅ Yes   | Technologies used (3-5 tags recommended) |
| `collaborative` | boolean     | ❌ No    | Set `true` for team projects             |
| `role`          | string      | ❌ No    | Your role (e.g., "Frontend Developer")   |
| `team`          | string      | ❌ No    | Team size (e.g., "Team of 4")            |
| `featured`      | boolean     | ❌ No    | Highlight this project (larger card)     |
| `inProgress`    | boolean     | ❌ No    | Show "In Progress" badge                 |
| `gridArea`      | object      | ❌ No    | Grid position (advanced)                 |

---

## 🎨 Visual Indicators

### **Collaborative Projects Get:**

- 💜 **Purple "Team Project" badge** in top-right
- 🎯 **Your role** displayed under the title
- 👥 **Team size** shown next to role
- 🔗 **GitHub link** to team repository

### **Other Badges:**

- ⭐ **Featured** - Gradient badge (top-left)
- 💛 **In Progress** - Yellow pulsing badge (top-right)

---

## 📐 Grid Layout Positions

The bento grid uses a 4-column layout on desktop:

```javascript
// Large featured card (2x2)
gridArea: { base: "auto", md: "1 / 1 / 3 / 3" }

// Wide card (1x2)
gridArea: { base: "auto", md: "1 / 3 / 2 / 5" }

// Regular card (1x1)
gridArea: { base: "auto", md: "2 / 3 / 3 / 4" }

// Auto-placement (recommended for most)
gridArea: { base: "auto", md: "auto" }
```

**Tip:** Use `"auto"` for automatic placement unless you want specific positioning.

---

## 🔧 Step-by-Step Instructions

### 1. **Open the Portfolio File**

```bash
src/pages/PortfolioModern.jsx
```

### 2. **Find the `projects` Array**

Look for line ~35:

```javascript
const projects = [
```

### 3. **Add Your Project**

Copy this template and customize:

```javascript
{
  name: "Your Collaborative Project",
  desc: "What you built and your specific contributions.",
  url: "https://github.com/team/project",
  homepage: "https://demo.com",
  tags: ["React", "TypeScript", "Tailwind"],
  collaborative: true,
  role: "Frontend Developer",
  team: "Team of 3",
},
```

### 4. **Place It in the Array**

Add before the closing `]`:

```javascript
const projects = [
  {
    name: 'School Website',
    // ... existing project
  },
  {
    name: 'Your New Project', // ✨ Add here
    // ...
  },
]
```

### 5. **Save & Build**

```bash
npm run build
npm run preview
```

---

## 📋 Examples for Different Scenarios

### **Collaborative Project (Still in Development)**

```javascript
{
  name: "Social Media App",
  desc: "Real-time social platform. Built the messaging system and notification features.",
  url: "https://github.com/team/social-app",
  homepage: null,
  tags: ["React", "Socket.io", "Node.js"],
  collaborative: true,
  role: "Full-Stack Developer",
  team: "Team of 5",
  inProgress: true, // ✨ Shows pulsing badge
}
```

### **Featured Collaborative Project**

```javascript
{
  name: "Healthcare Portal",
  desc: "Patient management system for hospitals. Led frontend development and UI/UX design.",
  url: "https://github.com/healthtech/portal",
  homepage: "https://health-portal.com",
  tags: ["React", "Material-UI", "Firebase"],
  collaborative: true,
  role: "Frontend Lead",
  team: "Team of 8",
  featured: true, // ✨ Larger card, gradient badge
  gridArea: { base: "auto", md: "1 / 1 / 3 / 3" },
}
```

### **Solo Project for Comparison**

```javascript
{
  name: "Weather Dashboard",
  desc: "Real-time weather app with forecast and maps integration.",
  url: "https://github.com/Tinashe623/weather-app",
  homepage: "https://weather.example.com",
  tags: ["React", "API", "Charts"],
  // No collaborative flag = solo project
}
```

---

## 💡 Best Practices

### **Writing Descriptions**

✅ **Good:** "E-commerce platform. Built shopping cart, payment integration, and order management system."
❌ **Avoid:** "An e-commerce website using React."

### **Choosing Tags**

- Use **3-5 tags** maximum
- Include **main technologies** only
- Examples: "React", "TypeScript", "Node.js", "MongoDB", "REST API"

### **Team Size**

- "Team of 2" (including you)
- "Team of 5"
- "12-person team"

### **Roles to Mention**

- Frontend Developer
- Full-Stack Developer
- UI/UX Developer
- Team Lead
- Frontend Architect

---

## 🚀 After Adding Your Project

1. **Build** to check for errors:

   ```bash
   npm run build
   ```

2. **Preview** locally:

   ```bash
   npm run preview
   ```

3. **Check** your project appears correctly:
   - Purple "Team Project" badge visible
   - Role and team size displayed
   - Links work properly

4. **Deploy** when satisfied:
   ```bash
   git add .
   git commit -m "feat: add collaborative project"
   git push
   ```

---

## 🎨 Customization Tips

### **Change Badge Colors**

Edit line ~187 in `PortfolioModern.jsx`:

```javascript
colorScheme = 'purple' // Change to: cyan, pink, green, blue, etc.
```

### **Adjust Card Size**

For collaborative projects that need more space:

```javascript
gridArea: { base: "auto", md: "1 / 1 / 3 / 3" } // 2x2 card
gridArea: { base: "auto", md: "1 / 1 / 2 / 3" } // 1x2 wide card
```

---

## 📸 Adding Project Preview Images (NEW!)

Your portfolio now supports **live preview images** for each project!

### **How to Add Images**

1. **Create the folder**: `public/images/projects/`
2. **Add your screenshot**: Save as `.jpg`, `.png`, or `.webp`
3. **Add image property** to your project:

```javascript
{
  name: "My Awesome Project",
  // ... other properties
  image: "/images/projects/my-project.jpg", // ← Add this
}
```

### **Image Guidelines**

- ✅ **Recommended size**: 1200 x 800 px (3:2 ratio)
- ✅ **Max file size**: Under 500KB (compress with TinyPNG)
- ✅ **Formats**: JPG, PNG, WebP
- ✅ **What to show**: Main UI, homepage, or key feature

### **No Image Yet?**

Don't worry! The portfolio shows a nice "Preview Coming Soon" fallback.

### **Need More Help?**

See `HOW_TO_ADD_PROJECT_IMAGES.md` for detailed instructions, tips, and best practices!

---

## ❓ Common Questions

**Q: Can I have multiple collaborative projects?**  
A: Yes! Add as many as you want.

**Q: What if the project has no live demo?**  
A: Set `homepage: null` and it won't show the "Live Demo" button.

**Q: Can a collaborative project also be featured?**  
A: Absolutely! Set both `collaborative: true` and `featured: true`.

**Q: How do I reorder projects?**  
A: Change their position in the array. First = top-left.

**Q: My role was complex, can I add more detail?**  
A: Yes! Put detailed contributions in the `desc` field.

---

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all required fields are filled
3. Verify URLs are correct
4. Make sure commas are in the right place

---

**Your portfolio now fully supports collaborative projects!** 🎉

Just follow the template above and your team projects will be beautifully showcased with proper attribution.
