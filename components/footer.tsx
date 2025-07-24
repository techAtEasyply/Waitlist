"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/Easyply", label: "Twitter" },
    { icon: Github, href: "https://github.com/Easyply", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/easyply/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@easyply.com", label: "Email" },
  ]

  return (
    <footer className="relative bg-gray-900/50 border-t border-gray-800 backdrop-blur-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Get in touch</h2>
            <p className="text-gray-400 mb-4 max-w-sm leading-relaxed">
              Follow us on social media
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800/50 hover:bg-lime-400/10 border border-gray-700 hover:border-lime-400/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-lime-400 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
