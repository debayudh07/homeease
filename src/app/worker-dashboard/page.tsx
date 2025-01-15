"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {  DollarSign, Globe, Clock, Menu, X, Zap, Star, HomeIcon } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  suggestedBudget: number | null;
  timeline: string;
  suggestedTimeline: string | null;
  location: string;
  status: string;
  founder: string;
  techStack: string[];
}

export default function StartupDashboard() {
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: 1, 
      title: ' Dishwashing Service Platform', 
      description: 'Seeking development partner for a platform to connect customers with professional dishwashing services', 
      budget: 8000, 
      suggestedBudget: null, 
      timeline: '2 months', 
      suggestedTimeline: null, 
      location: 'Remote', 
      status: 'Open', 
      founder: 'Emily D.',
      techStack: ['Dishwashing', 'Utensil Scrubbing', 'Sink Cleaning']
    },
    { 
      id: 2, 
      title: 'Lawn Mowing ', 
      description: 'Building an intuitive app to schedule and manage lawn mowing services efficiently', 
      budget: 12000, 
      suggestedBudget: 15000, 
      timeline: '3 months', 
      suggestedTimeline: '4 months', 
      location: 'Hybrid', 
      status: 'Suggested', 
      founder: 'John P.',
      techStack: ['Lawn Mowing', 'Hedge Trimming', 'Grass Edging']
    },
    { 
      id: 3, 
      title: 'House Cleaning and Maintenance', 
      description: 'Real-time tracking and management system for house cleaning and maintenance services', 
      budget: 18000, 
      suggestedBudget: null, 
      timeline: '5 months', 
      suggestedTimeline: null, 
      location: 'Remote', 
      status: 'In Progress', 
      founder: 'Sophia G.',
      techStack: ['Dusting', 'Floor Mopping', 'Window Cleaning']
    },    
  ])

  const [, setSelectedProject] = useState<Project | null>(null)
  const [suggestion, setSuggestion] = useState({ budget: '', timeline: '' })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [, setIsMobile] = useState(false)

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

  const handleSubmitSuggestion = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            suggestedBudget: suggestion.budget ? parseFloat(suggestion.budget) : project.suggestedBudget,
            suggestedTimeline: suggestion.timeline || project.suggestedTimeline,
            status: 'Suggested'
          } 
        : project
    ))
    setSelectedProject(null)
    setSuggestion({ budget: '', timeline: '' })
    toast.success('Proposal submitted successfully!', {
      position: "bottom-right",
      autoClose: 3000,
    })
  }

  const handleAcceptProject = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, status: 'In Progress' } : project
    ))
    toast.success('Project accepted!', {
      position: "bottom-right",
      autoClose: 3000,
    })
  }

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    toast.info('Viewing project details', {
      position: "bottom-right",
      autoClose: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <HomeIcon className="w-6 h-6 text-purple-600" />
            HomeEase
          </h1>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-purple-700 hover:text-purple-900 hover:bg-purple-100">
              <a href="/profile" className="flex items-center">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Profile" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                Worker Hub
              </a>
            </Button>
            <Button variant="ghost" className="text-purple-700 hover:text-purple-900 hover:bg-purple-100">Sign Out</Button>
          </nav>
          <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-purple-700" /> : <Menu className="text-purple-700" />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden bg-white/80 backdrop-blur-md border-b border-purple-100 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button variant="ghost" className="w-full text-left mb-2 text-purple-700">
              <a href="/profile" className="flex items-center">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Profile" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                Developer Hub
              </a>
            </Button>
            <Button variant="ghost" className="w-full text-left text-purple-700">Sign Out</Button>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="available" className="space-y-4">
          <TabsList className="w-full flex bg-white/50 backdrop-blur-sm rounded-lg p-1">
            <TabsTrigger value="available" className="flex-1 text-purple-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">Available Projects</TabsTrigger>
            <TabsTrigger value="inprogress" className="flex-1 text-purple-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">Active Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              {projects.filter(project => project.status === 'Open' || project.status === 'Suggested').map(project => (
                <motion.div key={project.id} variants={fadeIn}>
                  <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-purple-800">
                        <Zap className="w-5 h-5 text-purple-600" />
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-purple-600/80">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <DollarSign className="w-4 h-4" />
                          ${project.budget.toLocaleString()} {project.suggestedBudget && `(Suggested: $${project.suggestedBudget.toLocaleString()})`}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <Clock className="w-4 h-4" />
                          {project.timeline} {project.suggestedTimeline && `(Suggested: ${project.suggestedTimeline})`}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <Globe className="w-4 h-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <Star className="w-4 h-4" />
                          Founded by: {project.founder}
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border-0">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap justify-between gap-2">
                      <Badge variant={project.status === 'Open' ? 'default' : 'secondary'} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        {project.status}
                      </Badge>
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50" onClick={() => handleViewDetails(project)}>View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white/95 backdrop-blur-md border-purple-100">
                            <DialogHeader>
                              <DialogTitle className="text-purple-800">{project.title}</DialogTitle>
                              <DialogDescription className="text-purple-600">{project.description}</DialogDescription>
                            </DialogHeader>
                            <div className="py-4 text-purple-700">
                              <p><strong>Budget:</strong> ${project.budget.toLocaleString()}</p>
                              <p><strong>Timeline:</strong> {project.timeline}</p>
                              <p><strong>Location:</strong> {project.location}</p>
                              <p><strong>Founded by:</strong> {project.founder}</p>
                              <div className="mt-4">
                                <strong>Tech Stack:</strong>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {project.techStack.map((tech, index) => (
                                    <Badge key={index} variant="secondary" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border-0">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => handleAcceptProject(project.id)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">Join Project</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50">Submit Proposal</Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white/95 backdrop-blur-md border-purple-100">
                            <DialogHeader>
                              <DialogTitle className="text-purple-800">Submit Proposal</DialogTitle>
                              <DialogDescription className="text-purple-600">
                                Propose a new budget or timeline for this project.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="suggestedBudget" className="text-right text-purple-700">
                                  Budget ($)
                                </Label>
                                <Input
                                  id="suggestedBudget"
                                  name="budget"
                                  type="number"
                                  value={suggestion.budget}
                                  onChange={handleSuggestionChange}
                                  className="col-span-3 bg-white/50 border-purple-200 text-purple-900 focus:border-purple-400"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="suggestedTimeline" className="text-right text-purple-700">
                                  Timeline
                                </Label>
                                <Input
                                  id="suggestedTimeline"
                                  name="timeline"
                                  value={suggestion.timeline}
                                  onChange={handleSuggestionChange}
                                  className="col-span-3 bg-white/50 border-purple-200 text-purple-900 focus:border-purple-400"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => project && handleSubmitSuggestion(project.id)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">Submit Proposal</Button>
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
              {projects.filter(project => project.status === 'In Progress').map(project => (
                <motion.div key={project.id} variants={fadeIn}>
                  <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-purple-800">
                        <Zap className="w-5 h-5 text-purple-600" />
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-purple-600/80">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <DollarSign className="w-4 h-4" />
                          ${project.budget.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <Clock className="w-4 h-4" />
                          {project.timeline}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <Globe className="w-4 h-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <Star className="w-4 h-4" />
                          Founded by: {project.founder}
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border-0">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">In Progress</Badge>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-12 py-6 text-center text-purple-500">
        <p>&copy; 2024 HomeEase. All rights reserved.</p>
      </footer>
      <ToastContainer theme="light" />
    </div>
  )
}