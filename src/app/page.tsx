/* eslint-disable */

'use client'

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, CheckCircle, Home, Search, Star, ThumbsUp, Users, Menu, X, ArrowRight, Brush,Scissors,BathIcon ,Wrench} from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'

import { useEffect } from 'react';
import ShuffleHero from '@/components/ui/hero'


const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const popularServices = [
    { icon: <Home className="w-8 h-8" />, title: "House Cleaning", price: "From ₹3,499" },
    { icon: <Briefcase className="w-8 h-8" />, title: "Plumbing", price: "From ₹5,799" },
    { icon: <Star className="w-8 h-8" />, title: "Electrical", price: "From ₹6,499" },
    { icon: <CheckCircle className="w-8 h-8" />, title: "Painting", price: "From ₹14,499" },
    { icon: <Brush className="w-8 h-8" />, title: "Carpet Cleaning", price: "From ₹4,499" },
    { icon: <Scissors className="w-8 h-8" />, title: "Lawn Mowing", price: "From ₹3,499" },
    { icon: <BathIcon className="w-8 h-8" />, title: "Bathroom Cleaning", price: "From ₹5,199" },
    { icon: <Wrench className="w-8 h-8" />, title: "Handyman Services", price: "From ₹6,999" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-lg bg-indigo-950">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">HomeEase</h1>
            <nav className="hidden md:flex space-x-6">
              <NavItems setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen} />
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-transparent border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300" onClick={() => setIsLoginOpen(true)}>Login</Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300" onClick={() => setIsSignUpOpen(true)}>Sign Up</Button>
            <Button variant="ghost" className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10"></div>
          <motion.div 
            className="absolute top-20 left-1/4 w-2 h-2 bg-purple-400 rounded-full"
            animate={{ 
              scale: [1, 2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <motion.div 
            className="absolute top-40 right-1/3 w-3 h-3 bg-pink-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl">
              <motion.h2 
                className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Your Home Services,{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  In the Digital Age
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-purple-200 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Experience the future of home services with AI-powered matching and real-time tracking
              </motion.p>
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg">
                  Launch App
                </Button>
                <Button className="bg-transparent border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-6 text-lg">
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-white mb-2">Popular Services</h3>
            <p className="text-purple-300 mb-8">Discover our most requested services for your home</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-indigo-900/50 backdrop-blur-lg border border-purple-500/20 p-6 hover:border-purple-500 transition-all duration-300">
                    <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors">
                      {service.icon}
                    </div>
                    <h4 className="font-bold text-white mb-2">{service.title}</h4>
                    <p className="text-purple-300">{service.price}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Section: Features of the App */}
        <section className="bg-indigo-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Why Choose HomeEase?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4">AI-Powered Service Matching</h4>
                <p className="text-gray-700">Our AI algorithm ensures you find the best professionals based on your needs, preferences, and location.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Real-Time Tracking</h4>
                <p className="text-gray-700">Track your service progress and get live updates on your home service requests, all from the app.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Affordable Pricing</h4>
                <p className="text-gray-700">Get high-quality services at competitive prices, starting from just ₹3,499 for house cleaning.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-indigo-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Customer Testimonials</h3>
            <div className="flex space-x-8 justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="text-gray-700 mb-4">"The home cleaning service was excellent! My house looks brand new. Highly recommended!"</p>
                <p className="font-semibold text-indigo-800">Anita Sharma</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="text-gray-700 mb-4">"Great experience with their plumbing service. The technician was quick and professional."</p>
                <p className="font-semibold text-indigo-800">Rajesh Kumar</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="text-gray-700 mb-4">"I used HomeEase for my lawn care needs. The team was professional and the results were amazing!"</p>
                <p className="font-semibold text-indigo-800">Meera Patel</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="text-white">
                <h4 className="font-semibold">How do I book a service?</h4>
                <p className="text-purple-300">You can easily book a service through the HomeEase app by selecting the service, preferred time, and location.</p>
              </div>
              <div className="text-white">
                <h4 className="font-semibold">What if I need to cancel my booking?</h4>
                <p className="text-purple-300">You can cancel your booking anytime before the scheduled time directly from the app, with no extra charges.</p>
              </div>
              <div className="text-white">
                <h4 className="font-semibold">Are the service providers verified?</h4>
                <p className="text-purple-300">Yes, all our service providers are carefully vetted and verified for safety and professionalism.</p>
              </div>
            </div>
          </div>
        </section>

        <AuthDialogs 
          isLoginOpen={isLoginOpen} 
          setIsLoginOpen={setIsLoginOpen} 
          isSignUpOpen={isSignUpOpen} 
          setIsSignUpOpen={setIsSignUpOpen} 
        />
      </main>
    </div>
  );
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

      <motion.a 
        href="/pricing"
        className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Pricing
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

