/* eslint-disable */

'use client'

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, CheckCircle, Home, Search, Star, ThumbsUp, Users, Menu, X } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'

import { useEffect } from 'react';
import ShuffleHero from '@/components/ui/hero'
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    bio: '',
    skills: [],
    experience: '',
    availability: '',
    hourlyRate: '',
  })
  const controls = useAnimation()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 0.3 },
    }))
  }, [controls])

  return (
    <div className="min-h-screen bg-white text-red-500">
    <div className="h-16"></div> {/* Spacer for fixed header */}
    <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-white bg-opacity-90 backdrop-blur-sm transition-all duration-300 ease-in-out md:px-6 lg:px-8 text-red-500">
      <motion.h1 
        className="text-2xl font-bold"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        HomeEase
      </motion.h1>
      <nav className="hidden md:flex space-x-4">
        <NavItems setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen} />
      </nav>
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>

    {/* Mobile menu */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-50 bg-white p-4 md:hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col space-y-4">
          <NavItems setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen} />
        </nav>
      </div>
    )}


      

      <main className="container mx-auto px-4 py-8">
        <ShuffleHero />

        <motion.section 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeIn}>
            <Card className="bg-red-100 h-full">
              <CardHeader>
                <Briefcase className="w-10 h-10 text-red-400 mb-2" />
                <CardTitle className="text-red-500">Post Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">Easily post your home chores and find reliable help.</p>
              </CardContent>
            </Card>
            
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="bg-red-100 h-full">
              <CardHeader>
                <Search className="w-10 h-10 text-red-400 mb-2" />
                <CardTitle className="text-red-500">Find Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">Browse and apply for various home chore opportunities.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="bg-red-100 h-full">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-red-400 mb-2" />
                <CardTitle className="text-red-500">Get Things Done</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">Complete tasks efficiently and earn great reviews.</p>
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
            <Card className="bg-red-100">
              <CardHeader>
                <CardTitle className="text-red-500">House Cleaning Needed</CardTitle>
                <p className="text-red-400">Posted by John D. • 2 hours ago</p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-red-600">Looking for someone to clean a 2-bedroom apartment. Tasks include vacuuming, dusting, and bathroom cleaning.</p>
                <div className="flex items-center gap-2 text-red-400">
                  <Home className="w-5 h-5" />
                  <span>123 Main St, Anytown, USA</span>
                </div>
                <p className="mt-4 font-bold text-red-500">$50</p>
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
              <ThumbsUp className="w-12 h-12 text-red-400 mb-2" />
              <h4 className="text-xl font-semibold mb-2">Trusted Service</h4>
              <p className="text-red-600">Our helpers are vetted and reviewed by the community.</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={fadeIn}
            >
              <Users className="w-12 h-12 text-red-400 mb-2" />
              <h4 className="text-xl font-semibold mb-2">Large Network</h4>
              <p className="text-red-600">Connect with thousands of helpers in your area.</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={fadeIn}
            >
              <Star className="w-12 h-12 text-red-400 mb-2" />
              <h4 className="text-xl font-semibold mb-2">Quality Assurance</h4>
              <p className="text-red-600">We ensure high-quality service with our rating system.</p>
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
          <div className="text-red-600 text-lg">
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
            <Card className="bg-red-100">
              <CardContent className="pt-6">
                <p className="text-red-600 italic">"HomeEase made it so easy to find help for my home projects. Highly recommended!"</p>
                <p className="text-red-400 mt-4">- Sarah M., Homeowner</p>
              </CardContent>
            </Card>
            <Card className="bg-red-100">
              <CardContent className="pt-6">
                <p className="text-red-600 italic">"I've been able to earn extra income and help my community. It's a win-win!"</p>
                <p className="text-red-400 mt-4">- Mike T., Helper</p>
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
            className="bg-red-100 p-8 rounded-lg text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-xl mb-4">Join HomeEase today and experience the easiest way to manage your home chores!</p>
            <motion.span 
              className="inline-block bg-red-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up Now
            </motion.span>
          </motion.div>
        </motion.section>
      </main>
     

      <footer className="mt-12 py-6 text-center text-red-400">
        <p>&copy; 2024 HomeEase. All rights reserved by 4Teens.</p>
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
   <AuthDialogs isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} isSignUpOpen={isSignUpOpen} setIsSignUpOpen={setIsSignUpOpen} />
   </div>
  )
}


function NavItems({ setIsLoginOpen, setIsSignUpOpen }: { setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>, setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <>
      <motion.a 
        href="/dashboard"
        className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Dashboard
      </motion.a>
      <motion.a 
        href="/worker-dashboard"
        className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Worker Dashboard
      </motion.a>
      <motion.a 
        href="/community-forum"
        className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Community Forum
      </motion.a>
      <motion.span 
        className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsLoginOpen(true)}
      >
        Login
      </motion.span>
      <motion.span 
        className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSignUpOpen(true)}
      >
        Sign Up
      </motion.span>
    </>
  )
}

function AuthDialogs({ isLoginOpen, setIsLoginOpen, isSignUpOpen, setIsSignUpOpen }: { isLoginOpen: boolean, setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>, isSignUpOpen: boolean, setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <>
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <AuthDialog type="login" onClose={() => setIsLoginOpen(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <AuthDialog type="signup" onClose={() => setIsSignUpOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

function AuthDialog({ type, onClose }: { type: 'login' | 'signup', onClose: () => void }) {
  const [userType, setUserType] = useState('user')

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{type === 'login' ? 'Login' : 'Sign Up'}</DialogTitle>
        <DialogDescription>
          {type === 'login' ? 'Login to your account' : 'Create a new account'}
        </DialogDescription>
      </DialogHeader>
      <Tabs value={userType} onValueChange={setUserType} className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="worker">Worker</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <UserAuthForm type={type} userType="user" />
        </TabsContent>
        <TabsContent value="worker">
          <UserAuthForm type={type} userType="worker" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function UserAuthForm({ type, userType }: { type: 'login' | 'signup', userType: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
    bio: string;
    skills: string[];
    experience: string;
    availability: string;
    hourlyRate: string;
  }>({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    bio: '',
    skills: [],
    experience: '',
    availability: '',
    hourlyRate: '',
  })

  const skillOptions = ['Cleaning', 'Plumbing', 'Electrical', 'Gardening', 'Painting', 'Carpentry'];

  const handleInputChange = (e: { target: any }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // Move to the second step
    } else {
      // Final submission logic
      console.log('Form submitted', formData);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    {step === 1 && (
      <>
        {type === 'signup' && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        {type === 'signup' && (
          <>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
            </div>
          </>
        )}
        <Button type="submit" className="w-full">
          Next
        </Button>
      </>
    )}
    {step === 2 && (
      <>
        {userType === 'worker' && (
          <>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} required />
            </div>
            <div>
              <Label>Skills</Label>
              <div className="grid grid-cols-2 gap-2">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillChange(skill)}
                    />
                    <label htmlFor={`skill-${skill}`}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Select
                name="experience"
                value={formData.experience}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: 'experience', value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                name="availability"
                placeholder="e.g., Weekdays 9AM-5PM"
                value={formData.availability}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min="0"
                step="0.01"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}
        <div className="flex justify-between">
          <Button type="button" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </>
    )}
  </form>
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

