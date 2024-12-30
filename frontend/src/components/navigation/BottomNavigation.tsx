'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Logo from '../logo/LogoBlack'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <footer ref={ref} className="bg-idealGreen text-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Us Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">About Us</h3>
            <ul className="space-y-3">
              {['Join Our Network', 'Careers', 'FAQs', 'Blog', 'Privacy Policy', 
                'Terms Of Use', 'Accessibility', 'Media Kit'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {['Therapy', 'Psychiatry', 'Counseling', 'Support Groups', 
                'Resources'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Industries Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">Industries</h3>
            <ul className="space-y-3">
              {['Contact Us', 'Support', 'Feedback'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Follow Us Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo theme='white' />
              <h3 className="text-lg font-semibold">Follow Us</h3>
            </div>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' }
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  className="bg-[#3B5F5F] p-2 rounded-full hover:bg-[#4A766E] transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
            <div className="space-y-3 text-sm">
              <p>For Support Contact:</p>
              <p>+233256619388 | +233501396664</p>
            </div>
          </motion.div>
        </div>

        {/* Crisis Warning */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-[#3B5F5F] pt-8 mt-8 text-center text-sm text-gray-300"
        >
          <p className="max-w-3xl mx-auto">
            If you are in a crisis or any other person may be in danger - 
            don&apos;t use this site. These resources can provide you with immediate help.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}