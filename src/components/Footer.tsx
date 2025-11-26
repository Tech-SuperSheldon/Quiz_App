"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="mt-6 text-gray-800 px-4 py-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:w-2/5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className=" p-2">
                <Image
                  src="/Final-Logo-bg-removed.png"
                  alt="Super Sheldon Logo"
                  width={80}
                  height={60}
                  className="h-auto w-auto"
                />
              </div>
             
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Supersheldon is a trusted global learning platform offering expert-led exam preparation for UK, US, and Australian students.
            </p>

            <div className="space-y-1 text-gray-700 text-xs">
              <p>📞 <span className="font-medium">Phone:</span> +91 91370 53875</p>
              <p>✉️ <span className="font-medium">Email:</span> support@supersheldon.com</p>
              <p>📍 <span className="font-medium">Address:</span> Om Chambers 648/A 4th Flr, Binnamangala 1st Stage, Bangalore- 560038, Karnataka, India</p>
            </div>

            <div className="flex gap-3 mt-2 text-xl">
              {[
                { href: "https://www.instagram.com/supersheldon.education/", icon: FaInstagram, color: "hover:text-pink-500", label: "Instagram" },
                { href: "https://x.com/SuperSheldonHQ", icon: FaXTwitter, color: "hover:text-black", label: "Twitter" },
                { href: "https://wa.me/917974695618", icon: FaWhatsapp, color: "hover:text-green-500", label: "WhatsApp" },
                { href: "https://www.linkedin.com/company/super-sheldon/", icon: FaLinkedin, color: "hover:text-blue-600", label: "LinkedIn" },
                { href: "https://www.youtube.com/@SuperSheldon-Education", icon: FaYoutube, color: "hover:text-red-600", label: "YouTube" }
              ].map((social) => (
                <motion.div
                  key={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={social.href} 
                    target="_blank" 
                    aria-label={social.label}
                    className={`text-gray-600 transition-colors duration-300 ${social.color}`}
                  >
                    <social.icon />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {/* Company */}
            <motion.div
              variants={itemVariants}
              className="bg-white/95 backdrop-blur-lg p-3"
            >
              <h3 className="font-bold text-red-400 mb-2 text-sm uppercase tracking-wide">Company</h3>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li>
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Courses */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-lg p-3 border-gray-200/50"
            >
              <Link href="/courses">
                <h3 className="font-bold text-orange-600 mb-2 text-sm uppercase tracking-wide hover:text-orange-700 transition-colors">
                  Courses
                </h3>
              </Link>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li>
                  <Link href="/courses" className="hover:text-gray-900 transition-colors">
                    Naplan Exam
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-gray-900 transition-colors">
                    ICAS
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-gray-900 transition-colors">
                    HCS
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-lg p-3 border-gray-200/50"
            >
              <h3 className="font-bold text-red-600 mb-2 text-sm uppercase tracking-wide">Support</h3>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li>
                  <Link href="#" className="hover:text-gray-900 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://api.whatsapp.com/send/?phone=917974695618&text&type=phone_number&app_absent=0" 
                    target="_blank"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          variants={itemVariants}
          className="mt-4 border-t border-gray-300 pt-3 text-center text-xs text-gray-600"
        >
          © {new Date().getFullYear()} Supersheldon LLP. All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;