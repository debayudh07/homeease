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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Briefcase, DollarSign, MapPin, Clock, User, Calendar, Menu, X } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

interface Job {
  id: number;
  title: string;
  description: string;
  price: number;
  suggestedPrice: number | null;
  estimatedTime: string;
  suggestedTime: string | null;
  location: string;
  status: string;
  poster: string;
}

export default function WorkerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: 'House Cleaning', description: 'Need help cleaning a 3-bedroom house', price: 80, suggestedPrice: null, estimatedTime: '3 hours', suggestedTime: null, location: 'New York, NY', status: 'Open', poster: 'John D.' },
    { id: 2, title: 'Lawn Mowing', description: 'Looking for someone to mow my lawn weekly', price: 50, suggestedPrice: 60, estimatedTime: '2 hours', suggestedTime: '1.5 hours', location: 'Los Angeles, CA', status: 'Suggested', poster: 'Sarah M.' },
    { id: 3, title: 'Furniture Assembly', description: 'Need assistance assembling IKEA furniture', price: 100, suggestedPrice: null, estimatedTime: '4 hours', suggestedTime: null, location: 'Chicago, IL', status: 'In Progress', poster: 'Mike T.' },
  ])

  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [suggestion, setSuggestion] = useState({ price: '', time: '' })
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

  const handleSuggestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSuggestion(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitSuggestion = (jobId: number) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            suggestedPrice: suggestion.price ? parseFloat(suggestion.price) : job.suggestedPrice,
            suggestedTime: suggestion.time || job.suggestedTime,
            status: 'Suggested'
          } 
        : job
    ))
    setSelectedJob(null)
    setSuggestion({ price: '', time: '' })
    toast.success('Suggestion submitted successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    })
  }

  const handleAcceptJob = (jobId: number) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'In Progress' } : job
    ))
    toast.success('Job accepted!', {
      position: "bottom-right",
      autoClose: 3000,
    })
  }

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job)
    toast.info('Viewing job details', {
      position: "bottom-right",
      autoClose: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-white text-red-500">
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">HomeEase Worker Dashboard</h1>
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
        <Tabs defaultValue="available" className="space-y-4">
          <TabsList className="w-full flex">
            <TabsTrigger value="available" className="flex-1">Available Jobs</TabsTrigger>
            <TabsTrigger value="inprogress" className="flex-1">In Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              {jobs.filter(job => job.status === 'Open' || job.status === 'Suggested').map(job => (
                <motion.div key={job.id} variants={fadeIn}>
                  <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
                          Rs.{job.price} {job.suggestedPrice && `(Suggested: Rs.${job.suggestedPrice})`}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <Clock className="w-4 h-4" />
                          {job.estimatedTime} {job.suggestedTime && `(Suggested: ${job.suggestedTime})`}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <User className="w-4 h-4" />
                          Posted by: {job.poster}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap justify-between gap-2">
                      <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(job)}>View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{job.title}</DialogTitle>
                              <DialogDescription>{job.description}</DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <p><strong>Price:</strong> Rs.{job.price}</p>
                              <p><strong>Estimated Time:</strong> {job.estimatedTime}</p>
                              <p><strong>Location:</strong> {job.location}</p>
                              <p><strong>Posted by:</strong> {job.poster}</p>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => handleAcceptJob(job.id)}>Accept Job</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Suggest Changes</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Suggest Changes</DialogTitle>
                              <DialogDescription>
                                Propose a new price or estimated time for this job.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="suggestedPrice" className="text-right">
                                  Price (Rs.)
                                </Label>
                                <Input
                                  id="suggestedPrice"
                                  name="price"
                                  type="number"
                                  value={suggestion.price}
                                  onChange={handleSuggestionChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="suggestedTime" className="text-right">
                                  Time
                                </Label>
                                <Input
                                  id="suggestedTime"
                                  name="time"
                                  value={suggestion.time}
                                  onChange={handleSuggestionChange}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => job && handleSubmitSuggestion(job.id)}>Submit Suggestion</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="inprogress">
            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              {jobs.filter(job => job.status === 'In Progress').map(job => (
                <motion.div key={job.id} variants={fadeIn}>
                  <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
                          <Clock className="w-4 h-4" />
                          {job.estimatedTime}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <User className="w-4 h-4" />
                          Posted by: {job.poster}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Badge variant="secondary">In Progress</Badge>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-12 py-6 text-center text-red-400">
        <p>&copy; 2023 HomeEase. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  )
}