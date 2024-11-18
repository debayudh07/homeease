'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, CheckCircle, Home, Search, Star, ThumbsUp, Users } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 0.3 },
    }))
  }, [controls])

  return (
    <div className="min-h-screen bg-white text-orange-500">
      <div className="h-16"></div> {/* Spacer for fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-white bg-opacity-90 backdrop-blur-sm transition-all duration-300 ease-in-out md:px-6 lg:px-8 text-orange-500">
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          HomeEase
        </motion.h1>
        <nav className="space-x-4">
          <motion.span 
            className="text-orange-400 cursor-pointer hover:text-orange-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Dashboard
          </motion.span>
          <motion.span 
            className="text-orange-400 cursor-pointer hover:text-orange-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.span>
          <motion.span 
            className="text-orange-400 cursor-pointer hover:text-orange-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.span>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.section 
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            variants={fadeIn}
          >
            Welcome to HomeEase
          </motion.h2>
          <motion.p 
            className="text-xl mb-6"
            variants={fadeIn}
          >
            Connect with local helpers for your home chores
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-4"
            variants={fadeIn}
          >
            <motion.span 
              className="bg-orange-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Post a Job
            </motion.span>
            <motion.span 
              className="bg-orange-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-orange-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find Work
            </motion.span>
          </motion.div>
        </motion.section>

        <motion.section 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeIn}>
            <Card className="bg-orange-100 h-full">
              <CardHeader>
                <Briefcase className="w-10 h-10 text-orange-400 mb-2" />
                <CardTitle className="text-orange-500">Post Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-600">Easily post your home chores and find reliable help.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="bg-orange-100 h-full">
              <CardHeader>
                <Search className="w-10 h-10 text-orange-400 mb-2" />
                <CardTitle className="text-orange-500">Find Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-600">Browse and apply for various home chore opportunities.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="bg-orange-100 h-full">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-orange-400 mb-2" />
                <CardTitle className="text-orange-500">Get Things Done</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-600">Complete tasks efficiently and earn great reviews.</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h3 
            className="text-2xl font-bold mb-4"
            variants={fadeIn}
          >
            Featured Job
          </motion.h3>
          <motion.div variants={fadeIn}>
            <Card className="bg-orange-100">
              <CardHeader>
                <CardTitle className="text-orange-500">House Cleaning Needed</CardTitle>
                <p className="text-orange-400">Posted by John D. • 2 hours ago</p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-orange-600">Looking for someone to clean a 2-bedroom apartment. Tasks include vacuuming, dusting, and bathroom cleaning.</p>
                <div className="flex items-center gap-2 text-orange-400">
                  <Home className="w-5 h-5" />
                  <span>123 Main St, Anytown, USA</span>
                </div>
                <p className="mt-4 font-bold text-orange-500">$50</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h3 
            className="text-2xl font-bold mb-4"
            variants={fadeIn}
          >
            Why Choose HomeEase?
          </motion.h3>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
          >
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={fadeIn}
            >
              <ThumbsUp className="w-12 h-12 text-orange-400 mb-2" />
              <h4 className="text-xl font-semibold mb-2">Trusted Service</h4>
              <p className="text-orange-600">Our helpers are vetted and reviewed by the community.</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={fadeIn}
            >
              <Users className="w-12 h-12 text-orange-400 mb-2" />
              <h4 className="text-xl font-semibold mb-2">Large Network</h4>
              <p className="text-orange-600">Connect with thousands of helpers in your area.</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={fadeIn}
            >
              <Star className="w-12 h-12 text-orange-400 mb-2" />
              <h4 className="text-xl font-semibold mb-2">Quality Assurance</h4>
              <p className="text-orange-600">We ensure high-quality service with our rating system.</p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h3 
            className="text-2xl font-bold mb-4"
            variants={fadeIn}
          >
            How It Works
          </motion.h3>
          <div className="text-orange-600 text-lg">
            <TypewriterEffect />
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-4">What Our Users Say</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            <Card className="bg-orange-100">
              <CardContent className="pt-6">
                <p className="text-orange-600 italic">"HomeEase made it so easy to find help for my home projects. Highly recommended!"</p>
                <p className="text-orange-400 mt-4">- Sarah M., Homeowner</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-100">
              <CardContent className="pt-6">
                <p className="text-orange-600 italic">"I've been able to earn extra income and help my community. It's a win-win!"</p>
                <p className="text-orange-400 mt-4">- Mike T., Helper</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <motion.div 
            className="bg-orange-100 p-8 rounded-lg text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-xl mb-4">Join HomeEase today and experience the easiest way to manage your home chores!</p>
            <motion.span 
              className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up Now
            </motion.span>
          </motion.div>
        </motion.section>
      </main>

      <footer className="mt-12 py-6 text-center text-orange-400">
        <p>&copy; 2023 HomeEase. All rights reserved.</p>
      </footer>
      <style jsx>{`
        @media (max-width: 640px) {
          header {
            left: 5%;
            right: 5%;
            border-radius: 9999px;
            box-shadow: 0 4px 6px -1px rgba(255, 130, 0, 0.1), 0 2px 4px -1px rgba(255, 130, 0, 0.06);
          }
        }
      `}</style>
    </div>
  )
}

const TypewriterEffect = () => {
  const steps = [
    "Create an account",
    "Post a job or browse available tasks",
    "Connect with helpers or clients",
    "Complete the work and leave a review"
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < steps[currentStep].length) {
          setCurrentText(steps[currentStep].slice(0, currentText.length + 1));
        } else {
          setIsDeleting(true);
          setTimeout(() => setIsDeleting(true), 1000); // Pause at the end
        }
      } else {
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentStep((prev) => (prev + 1) % steps.length);
        } else {
          setCurrentText(steps[currentStep].slice(0, currentText.length - 1));
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {currentText}
    </motion.div>
  );
};