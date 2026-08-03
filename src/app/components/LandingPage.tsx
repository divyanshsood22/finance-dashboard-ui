import { useState } from "react";
import {
  TrendingUp,
  Shield,
  PieChart,
  BarChart3,
  Zap,
  Lock,
  Eye,
  Smartphone,
  Twitter,
  Github,
  Instagram,
  MessageCircle,
  FileText,
  Mail,
} from "lucide-react";
import LoginModal from "./LoginModal";
import AdminLoginModal from "./AdminLoginModal";
import ThemeToggle from "./ThemeToggle";
import { FaXTwitter, FaWhatsapp, FaInstagram, FaGithub } from "react-icons/fa6";

const clientPhotos = [
  "https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1739298061757-7a3339cee982?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1610631066894-62452ccb927c?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1584940120505-117038d90b05?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1772442164162-c28b6391758f?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1758518731468-98e90ffd7430?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1584940121730-93ffb8aa88b0?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1717068341688-1b055a0e6c61?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1584981886809-8920959a5e9b?w=200&h=200&fit=crop",
];

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 animate-fade-in">
          <img
            className="h-10 w-fit sm:h-15 text-blue-600 dark:text-black-400"
            src="https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png"
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Take Control of Your
            <span className="text-green-600 dark:text-green-400 block mt-2 animate-gradient">
              {" "}
              Finances
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Track your expenses, monitor your income, and implement informed
            financial decisions.
          </p>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-20 mb-20">
          {/* Row 1 */}
          {/* Visual Analytics*/}
          <div className="md:col-span-4 md:row-span-2 bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] animate-fade-in min-h-[280px] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Visual Analytics
              </h3>
              <p className="text-blue-100 text-lg">
                Track your finances with interactive charts and real-time graphs
                that helps you in understanding your money seemlessly.
              </p>
            </div>
          </div>

          {/* Real-time Updates */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-gray-100 dark:border-gray-700 animate-fade-in-delay-1 min-h-[130px] flex flex-col justify-between">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Real-time Updates
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Monitor your balance and transactions instantly.
              </p>
            </div>
          </div>

          {/* Row 2 */}
          {/* Spending Insights */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-gray-100 dark:border-gray-700 animate-fade-in-delay-2 min-h-[130px] flex flex-col justify-between">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-3">
              <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Spending Insights
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Detailed breakdowns of your expenses.
              </p>
            </div>
          </div>

          {/* Row 3 */}
          {/* Secure & Private*/}
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-gray-500 to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] animate-fade-in-delay-3 min-h-[280px] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Secure & Private
              </h3>
              <p className="text-purple-100 mb-6">
                Your financial data is protected with bank-level security.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-5 h-5" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Eye className="w-5 h-5" />
                <span>Private by default</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Lock className="w-5 h-5" />
                <span>Secure authentication</span>
              </div>
            </div>
          </div>

          {/* Lightning Fast*/}
          <div className="md:col-span-4 bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] animate-fade-in-delay-4 min-h-[130px] flex items-center">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-orange-100">
                Instant insights and seamless performance, optimized for speed.
              </p>
            </div>
          </div>

          {/* Mobile Ready */}
          <div className="md:col-span-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-gray-100 dark:border-gray-700 animate-fade-in-delay-5 min-h-[130px] flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
              <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Mobile Ready
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access your finances anywhere, on any device with our responsive
                design.
              </p>
            </div>
          </div>
        </div>

        {/* Clients Section */}
        <div className="mb-20 overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Users Who Trust Us
          </h2>
          <div className="relative">
            <div className="flex animate-scroll">
              {[...clientPhotos, ...clientPhotos, ...clientPhotos].map(
                (photo, index) => (
                  <div
                    key={`client-${index}-${photo}`}
                    className="flex-shrink-0 mx-4"
                  >
                    <img
                      src={photo}
                      alt={`Client ${(index % clientPhotos.length) + 1}`}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-fit h-15 text-blue-600 dark:text-black-400"
                  src="https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png"
                  alt=""
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enterprise grade financial infrastructure that scales with you.
                From startups to enterprises, we power the future of finance.
              </p>
            </div>

            {/* Documentation */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Documentation
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/divyanshsood22/finance-dashboard-ui/"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Getting Started
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/divyanshsood22/finance-dashboard-ui/"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    User Guide
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/divyanshsood22/finance-dashboard-ui/"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="https://thesood.dev/"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://twitter.com/@divyanshsood22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-110"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/divyanshsood22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-110"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/divyanshsood22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/919805700030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-500 dark:hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Legal
              </h4>
              <ul className="space-y-2 mb-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} Divyansh SOod. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToAdmin={() => {
            setShowLogin(false);
            setShowAdminLogin(true);
          }}
        />
      )}

      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onSwitchToUser={() => {
            setShowAdminLogin(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}
