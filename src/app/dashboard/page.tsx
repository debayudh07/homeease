/* eslint-disable */
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Briefcase, DollarSign, MapPin, Clock, User, CheckCircle, XCircle, Menu, X } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const cardVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
}

interface Job {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  status: string;
  worker: Worker | null;
}

interface Worker {
  name: string;
  rating: number;
}

interface NewJob {
  title: string;
  description: string;
  price: string;
  location: string;
}

export default function UserDashboard() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: 'House Cleaning', description: 'Need help cleaning a 3-bedroom house', price: 80, location: 'New York, NY', status: 'Open', worker: null },
    { id: 2, title: 'Lawn Mowing', description: 'Looking for someone to mow my lawn weekly', price: 50, location: 'Los Angeles, CA', status: 'In Progress', worker: { name: 'Jane Smith', rating: 4.8 } },
    { id: 3, title: 'Furniture Assembly', description: 'Need assistance assembling IKEA furniture', price: 100, location: 'Chicago, IL', status: 'Completed', worker: { name: 'Mike Johnson', rating: 4.5 } },
  ])

  const [newJob, setNewJob] = useState<NewJob>({ title: '', description: '', price: '', location: '' })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewJob(prev => ({ ...prev, [name]: value }))
  }

  const handlePostJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const job: Job = {
      id: jobs.length + 1,
      ...newJob,
      price: parseFloat(newJob.price),
      status: 'Open',
      worker: null
    };
    setJobs(prev => [...prev, job]);
    setNewJob({ title: '', description: '', price: '', location: '' });
    toast.success('Job created successfully!', {
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    });
  };

  const handleDeleteJob = (id: number) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    toast.error('Job deleted', {
      icon: <XCircle className="h-4 w-4 text-red-500" />
    });
  };

  return (
    <div className="min-h-screen bg-white text-red-500">
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">HomeEase User Dashboard</h1>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-red-500 hover:text-red-600">
              <a href="/profile-user" className="flex items-center">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="/path/to/profile-image.jpg" alt="Profile" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                Profile
              </a>
            </Button>
            <Button variant="ghost" className="text-red-500 hover:text-red-600">Logout</Button>
          </nav>
          <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden bg-white shadow-md p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button variant="ghost" className="w-full text-left mb-2">
              <a href="/profile-user" className="flex items-center">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="/path/to/profile-image.jpg" alt="Profile" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                Profile
              </a>
            </Button>
            <Button variant="ghost" className="w-full text-left">Logout</Button>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="myjobs" className="space-y-4">
          <TabsList className="w-full flex">
            <TabsTrigger value="myjobs" className="flex-1">My Jobs</TabsTrigger>
            <TabsTrigger value="post" className="flex-1">Post a Job</TabsTrigger>
          </TabsList>

          <TabsContent value="myjobs">
            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              {jobs.map(job => (
                <motion.div key={job.id} variants={cardVariants} whileHover="hover">
                  <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Briefcase className="w-5 h-5" />
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base">{job.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <DollarSign className="w-4 h-4" />
                          Rs.{job.price}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <Clock className="w-4 h-4" />
                          Status: {job.status}
                        </div>
                        {job.worker && (
                          <div className="flex items-center gap-2 text-sm text-red-600">
                            <User className="w-4 h-4" />
                            Worker: {job.worker.name} (Rating: {job.worker.rating})
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center mt-auto">
                      <Badge variant={job.status === 'Open' ? 'default' : job.status === 'In Progress' ? 'secondary' : 'outline'}>
                        {job.status}
                      </Badge>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job.id)}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="post">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
                <CardDescription>Fill out the form below to post a new job</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostJob} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-red-600 mb-1">Job Title</label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={newJob.title} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-red-600 mb-1">Description</label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={newJob.description} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-red-600 mb-1">Price (Rs.)</label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number" 
                      value={newJob.price} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-red-600 mb-1">Location</label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={newJob.location} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <Button type="submit">Post Job</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-12 py-6 text-center text-red-400">
        <p>&copy; 2024 HomeEase. All rights reserved.</p>
      </footer>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}