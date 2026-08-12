"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/common/GlassCard";
import GradientHeading from "@/components/common/GradientHeading";
import { FaCheckCircle, FaRocket, FaCode, FaServer, FaMobileAlt, FaDatabase } from "react-icons/fa";

const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "End-to-end web application development using Next.js, React, and modern backend technologies.",
    features: [
      "Custom web applications from scratch",
      "Responsive and mobile-first design",
      "Performance optimization",
      "SEO best practices",
      "Testing and deployment",
    ],
    icon: FaCode,
    color: "text-brand-400",
    popular: true,
  },
  {
    title: "API Development & Integration",
    description:
      "Building robust RESTful APIs and integrating third-party services for seamless data flow.",
    features: [
      "RESTful API design and development",
      "Database schema design",
      "Third-party API integrations",
      "Authentication & authorization",
      "API documentation",
    ],
    icon: FaServer,
    color: "text-accent-400",
    popular: false,
  },
  {
    title: "Database Design & Management",
    description:
      "Designing scalable database architectures with PostgreSQL and Prisma ORM.",
    features: [
      "Relational database design",
      "Query optimization",
      "Data migration strategies",
      "Database indexing",
      "Prisma schema modeling",
    ],
    icon: FaDatabase,
    color: "text-green-400",
    popular: false,
  },
  {
    title: "Web Application Maintenance",
    description:
      "Ongoing support and maintenance to keep your applications running smoothly.",
    features: [
      "Bug fixes and updates",
      "Security patches",
      "Performance monitoring",
      "Feature enhancements",
      "Technical support",
    ],
    icon: FaRocket,
    color: "text-orange-400",
    popular: false,
  },
  {
    title: "Mobile-Responsive Design",
    description:
      "Creating responsive layouts that work seamlessly across all devices and screen sizes.",
    features: [
      "Mobile-first approach",
      "Cross-browser compatibility",
      "Touch-friendly interfaces",
      "Progressive Web Apps (PWA)",
      "Accessibility compliance",
    ],
    icon: FaMobileAlt,
    color: "text-purple-400",
    popular: false,
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Understanding your requirements, goals, and technical needs to create a tailored solution.",
  },
  {
    step: "02",
    title: "Development",
    description:
      "Building your application using modern technologies, best practices, and agile methodologies.",
  },
  {
    step: "03",
    title: "Delivery",
    description:
      "Testing, deployment, and handover with documentation and ongoing support options.",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GradientHeading>Services</GradientHeading>
          <p className="mt-4 text-dark-400 max-w-2xl mx-auto text-balance">
            Comprehensive full-stack development services to bring your ideas to life
            with modern, scalable technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {service.popular && (
                <span className="absolute -top-3 right-4 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  POPULAR
                </span>
              )}
              <GlassCard className="p-6 h-full flex flex-col">
                <div className={`text-3xl mb-4 ${service.color}`}>
                  <service.icon />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-dark-400 text-sm mb-6 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-dark-300"
                    >
                      <FaCheckCircle className="text-brand-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <GradientHeading className="text-center mb-12">
            How I Work
          </GradientHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold gradient-text mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-dark-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <GlassCard className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">
              Ready to Build Something{" "}
              <span className="gradient-text">Amazing</span>?
            </h3>
            <p className="text-dark-400 mb-8 max-w-xl mx-auto">
              Let&apos;s discuss your project and how I can help you achieve your goals
              with modern full-stack development.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Start a Conversation
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
