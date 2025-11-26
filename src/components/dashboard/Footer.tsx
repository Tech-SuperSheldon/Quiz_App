"use client";
import ScrollAnimation from "./ScrollAnimation";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <ScrollAnimation direction="up" delay={0.1}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Super Sheldon Logo */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-sm">🛡️</span>
              </div>
              <span className="text-blue-400 font-bold text-lg">
                SUPER SHELDON
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Supersheldon is a trusted global learning platform offering
              expert-led exam preparation for UK, US, and Australian students.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Courses Links - Middle Section using TSX */}
          <div>
            <h3 className="font-bold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Naplan Exam
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  11+Exam
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  SAT Exam
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Career
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+0913-705-3875</li>
                <li>Elizabeth.J@jourrapide.com</li>
                <li>4808 Skinner Hollow Road Days Creek, OR 97429</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>©2025 Room. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      </ScrollAnimation>
    </footer>
  );
}

