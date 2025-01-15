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
import { Briefcase, CheckCircle, Home, Search, Star, ThumbsUp, Users, Menu, X, ArrowRight,  } from 'lucide-react'
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
    { icon: <Home className="w-8 h-8" />, title: "House Cleaning", price: "From $49" },
    { icon: <Briefcase className="w-8 h-8" />, title: "Plumbing", price: "From $79" },
    { icon: <Star className="w-8 h-8" />, title: "Electrical", price: "From $89" },
    { icon: <CheckCircle className="w-8 h-8" />, title: "Painting", price: "From $199" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-red-500">HomeEase</h1>
            <nav className="hidden md:flex space-x-6">
              <NavItems setIsLoginOpen={setIsLoginOpen} setIsSignUpOpen={setIsSignUpOpen} />
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setIsLoginOpen(true)}>Login</Button>
            <Button onClick={() => setIsSignUpOpen(true)}>Sign Up</Button>
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-red-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-red-500 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Home Services, On Demand
              </motion.h2>
              <motion.p 
                className="text-xl text-red-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Quality home services, delivered to your doorstep
              </motion.p>
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button size="lg" className="bg-red-500 hover:bg-red-600">Book a Service</Button>
                <Button size="lg" variant="outline" className="text-red-500">Become a Partner</Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-red-500 mb-8">Popular Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center p-6 bg-red-50 hover:bg-red-100 transition-colors">
                    <div className="text-red-400 mb-4 group-hover:text-red-500 transition-colors">
                      {service.icon}
                    </div>
                    <h4 className="font-semibold text-red-500 mb-2">{service.title}</h4>
                    <p className="text-red-400">{service.price}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 bg-red-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-red-500 mb-8">Why Choose HomeEase?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="flex items-start space-x-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                <Users className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-500 mb-2">Verified Professionals</h4>
                  <p className="text-red-400">Background-checked and trained professionals at your service</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                <CheckCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-500 mb-2">Insured Services</h4>
                  <p className="text-red-400">Your home and services are covered by insurance</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
              >
                <Star className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-500 mb-2">Satisfaction Guaranteed</h4>
                  <p className="text-red-400">100% satisfaction or we'll make it right</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-red-500">Featured Services</h3>
              <Button variant="ghost" className="text-red-500">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="group cursor-pointer"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-red-100 relative">
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-white text-red-500">
                          Most Popular
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-red-500 mb-2">Deep House Cleaning</h4>
                      <p className="text-red-400 mb-4">Professional cleaning service for your entire home</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-red-500">From $99</span>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="py-12 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold text-red-500 mb-4">Get the HomeEase App</h3>
                <p className="text-red-400 mb-6">Book services on the go with our mobile app</p>
                <div className="flex space-x-4">
                  <Button variant="outline" className="text-red-500">
                    App Store
                  </Button>
                  <Button variant="outline" className="text-red-500">
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-red-100 h-64 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-red-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-red-500 mb-4">About HomeEase</h4>
              <ul className="space-y-2 text-red-400">
                <li>About Us</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-500 mb-4">For Customers</h4>
              <ul className="space-y-2 text-red-400">
                <li>Book a Service</li>
                <li>Our Services</li>
                <li>Safety & Insurance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-500 mb-4">For Partners</h4>
              <ul className="space-y-2 text-red-400">
                <li>Become a Partner</li>
                <li>Partner Success Stories</li>
                <li>Partner Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-500 mb-4">Connect With Us</h4>
              <ul className="space-y-2 text-red-400">
                <li>Blog</li>
                <li>Facebook</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-red-100 text-center text-red-400">
            <p>&copy; 2024 HomeEase. All rights reserved by 4Teens.</p>
          </div>
        </div>
      </footer>

      <AuthDialogs 
        isLoginOpen={isLoginOpen} 
        setIsLoginOpen={setIsLoginOpen} 
        isSignUpOpen={isSignUpOpen} 
        setIsSignUpOpen={setIsSignUpOpen} 
      />
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

