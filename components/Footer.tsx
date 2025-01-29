import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-30" />
        
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center space-y-8">
            {/* Social Links */}
            <div className="flex space-x-6">
              <Link
                href="https://github.com/ZAHRAN88"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mohamed-zahran-383859222/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/mohamedosamazahran77/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:mohamedzahrann0@gmail.com"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} MoodFlix. All rights reserved.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Made with{' '}
                <span className="text-red-400 animate-pulse">❤️</span>{' '}
                by{' '}
                <Link 
                  href="https://mohamed-zahran.netlify.app/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-colors"
                >
                  Mohamed Zahran
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}