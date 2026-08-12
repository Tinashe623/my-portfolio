const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: { email: "admin@tinashemundieta.com" },
    update: {},
    create: {
      email: "admin@tinashemundieta.com",
      password: hashedPassword,
      name: "Tinashe Mundieta",
    },
  });

  const projects = [
    {
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description: "Full-stack e-commerce platform with Next.js, Prisma, and PostgreSQL.",
      content: "Built a complete e-commerce solution with user authentication, product management, shopping cart, and Stripe payment integration.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "TypeScript"],
      category: "Full-Stack",
      status: "completed",
      featured: true,
      liveUrl: "#",
      codeUrl: "#",
    },
    {
      title: "SaaS Dashboard",
      slug: "saas-dashboard",
      description: "Real-time analytics dashboard for SaaS platform.",
      content: "Developed a comprehensive analytics dashboard with data visualization, user management, and automated reporting.",
      tags: ["Next.js", "PostgreSQL", "Prisma", "Chart.js"],
      category: "Full-Stack",
      status: "completed",
      featured: true,
      liveUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Blog Platform",
      slug: "blog-platform",
      description: "Content management system with markdown support.",
      content: "Created a blog platform with MDX support, SEO optimization, and an admin dashboard.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "MDX"],
      category: "Full-Stack",
      status: "completed",
      featured: false,
      liveUrl: "#",
      codeUrl: "#",
    },
    {
      title: "API Gateway Service",
      slug: "api-gateway",
      description: "Microservices API gateway with rate limiting.",
      content: "Built an API gateway with authentication, rate limiting, and request routing.",
      tags: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
      category: "Backend",
      status: "completed",
      featured: false,
      liveUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Real-time Chat App",
      slug: "chat-app",
      description: "WebSocket-based chat application.",
      content: "Developed a real-time chat application with rooms, direct messaging, and file sharing.",
      tags: ["Next.js", "Socket.io", "PostgreSQL", "Prisma"],
      category: "Full-Stack",
      status: "in-progress",
      featured: false,
    },
    {
      title: "Inventory Management System",
      slug: "inventory-system",
      description: "Complete inventory tracking system.",
      content: "Built an inventory management system with barcode scanning, stock alerts, and reporting.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "PWA"],
      category: "Full-Stack",
      status: "in-progress",
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  const certificates = [
    {
      title: "HTML5 Certified",
      slug: "html5-certified",
      issuer: "W3Schools",
      issueDate: new Date("2024-04-03"),
      credentialUrl: "https://www.w3schools.com/cert/certificate.aspx",
      tags: ["HTML5", "Frontend"],
    },
    {
      title: "CSS Certified",
      slug: "css-certified",
      issuer: "W3Schools",
      issueDate: new Date("2024-04-27"),
      credentialUrl: "https://www.w3schools.com/cert/certificate.aspx",
      tags: ["CSS3", "Frontend"],
    },
    {
      title: "JavaScript Certified",
      slug: "javascript-certified",
      issuer: "W3Schools",
      issueDate: new Date("2024-10-19"),
      credentialUrl: "https://www.w3schools.com/cert/certificate.aspx",
      tags: ["JavaScript", "Frontend"],
    },
    {
      title: "Frontend Development",
      slug: "frontend-development",
      issuer: "W3Schools",
      issueDate: new Date("2024-10-19"),
      credentialUrl: "https://www.w3schools.com/cert/certificate.aspx",
      tags: ["Frontend", "Full-Stack"],
    },
  ];

  for (const cert of certificates) {
    await prisma.certificate.create({
      data: cert,
    });
  }

  const skills = [
    { name: "Next.js", category: "frontend", level: "advanced", order: 1 },
    { name: "React", category: "frontend", level: "advanced", order: 2 },
    { name: "TypeScript", category: "frontend", level: "advanced", order: 3 },
    { name: "Node.js", category: "backend", level: "intermediate", order: 4 },
    { name: "Prisma", category: "database", level: "intermediate", order: 5 },
    { name: "PostgreSQL", category: "database", level: "intermediate", order: 6 },
    { name: "Tailwind CSS", category: "frontend", level: "advanced", order: 7 },
    { name: "Git", category: "tools", level: "intermediate", order: 8 },
    { name: "Docker", category: "devops", level: "beginner", order: 9 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({
      data: skill,
    });
  }

  const testimonials = [
    {
      name: "George Mundieta",
      role: "Director",
      company: "GMP Electrical",
      content: "Tinashe delivered an excellent website for our business. Professional, responsive, and exceeded our expectations.",
      featured: true,
    },
    {
      name: "Chigumira",
      role: "Administrator",
      company: "St James Zongoro Primary",
      content: "Great work on our school website. The new design has significantly improved our online presence.",
      featured: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
