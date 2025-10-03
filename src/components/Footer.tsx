"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="mt-6 text-gray-800 px-4 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-6">

        {/* Left Section */}
        <div className="lg:w-2/5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/Final-Logo-bg-removed.png"
              alt="Super Sheldon Logo"
              width={120}
              height={80}
              className="h-auto w-auto"
            />
            <span className="font-extrabold text-2xl sm:text-3xl">Supersheldon</span>
          </div>

          <p className="text-gray-700 text-base sm:text-lg leading-snug">
            Supersheldon is a trusted global learning platform offering expert-led exam preparation for UK, US, and Australian students.
          </p>

          <div className="space-y-1 text-gray-800 text-sm sm:text-base">
            <p>📞 <span className="font-semibold">Phone:</span> +91 91370 53875</p>
            <p>✉️ <span className="font-semibold">Email:</span> support@supersheldon.com</p>
            <p>📍 <span className="font-semibold">Address:</span> Om Chambers 648/A 4th Flr, Binnamangala 1st Stage, Bangalore- 560038, Karnataka, India</p>
          </div>

          <div className="flex gap-5 mt-3 text-2xl sm:text-3xl">
            <Link href="https://www.instagram.com/supersheldon.education/" target="_blank" aria-label="Instagram">
              <FaInstagram className="hover:text-pink-500 transition-colors duration-300" />
            </Link>
            <Link href="https://x.com/SuperSheldonHQ" target="_blank" aria-label="Twitter">
              <FaXTwitter className="hover:text-black transition-colors duration-300" />
            </Link>
            <Link href="https://wa.me/917974695618" target="_blank" aria-label="WhatsApp">
              <FaWhatsapp className="hover:text-green-500 transition-colors duration-300" />
            </Link>
            <Link href="https://www.linkedin.com/company/super-sheldon/" target="_blank" aria-label="Linkedin">
              <FaLinkedin className="hover:text-blue-600 transition-colors duration-300"/>
            </Link>
            <Link href="https://www.youtube.com/@SuperSheldon-Education" target="_blank" aria-label="Youtube">
              <FaYoutube className="hover:text-red-600 transition-colors duration-300"/>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div>
            <h3 className="font-extrabold text-red-400 mb-2 text-lg sm:text-xl uppercase tracking-wide">Company</h3>
            <ul className="space-y-2 text-gray-800 text-sm sm:text-base">
              <li><Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/refund" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Refund Policy</Link></li>
              <li><Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <Link href="/courses">
              <h3 className="font-extrabold text-orange-600 mb-2 text-lg sm:text-xl uppercase tracking-wide">Courses</h3>
            </Link>
            <ul className="space-y-2 text-gray-800 text-sm sm:text-base">
              <li><Link href="/courses" className="hover:text-gray-900">Naplan Exam</Link></li>
              <li><Link href="/courses" className="hover:text-gray-900">ICAS</Link></li>
              <li><Link href="/courses" className="hover:text-gray-900">HCS</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-red-600 mb-2 text-lg sm:text-xl uppercase tracking-wide">Support</h3>
            <ul className="space-y-2 text-gray-800 text-sm sm:text-base">
              <li><Link href="#" className="hover:text-gray-900">FAQ</Link></li>
              <li><Link href="https://api.whatsapp.com/send/?phone=917974695618&text&type=phone_number&app_absent=0" target="_blank" className="hover:text-gray-900">Support</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-4 sm:mt-6 border-t border-gray-300 pt-3 text-center text-xs sm:text-sm text-gray-600">
        © {new Date().getFullYear()} Supersheldon LLP. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
