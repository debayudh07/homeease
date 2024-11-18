/* eslint-disable */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Briefcase, DollarSign, MapPin, Clock, User, Calendar } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function WorkerDashboard() {
  const [jobs, setJobs] = useState<{ id: number, title: string, description: string, price: number, suggestedPrice: number | null, estimatedTime: string, suggestedTime: string | null, location: string, status: string, poster: string }[]>([
      { id: 1, title: 'House Cleaning', description: 'Need help cleaning a 3-bedroom house', price: 80, suggestedPrice: null, estimatedTime: '3 hours', suggestedTime: null, location: 'New York, NY', status: 'Open', poster: 'John D.' },
      { id: 2, title: 'Lawn Mowing', description: 'Looking for someone to mow my lawn weekly', price: 50, suggestedPrice: 60, estimatedTime: '2 hours', suggestedTime: '1.5 hours', location: 'Los Angeles, CA', status: 'Suggested', poster: 'Sarah M.' },
      { id: 3, title: 'Furniture Assembly', description: 'Need assistance assembling IKEA furniture', price: 100, suggestedPrice: null, estimatedTime: '4 hours', suggestedTime: null, location: 'Chicago, IL', status: 'In Progress', poster: 'Mike T.' },
    ])

  const [selectedJob, setSelectedJob] = useState<{ id: number } | null>(null)
  const [suggestion, setSuggestion] = useState({ price: '', time: '' })

  const handleSuggestionChange = (e: { target: { name: any; value: any } }) => {
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
  }

  const handleAcceptJob = (jobId: number) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'In Progress' } : job
    ))
  }

  return (
    <div className="min-h-screen bg-white text-orange-500">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HomeEase Worker Dashboard</h1>
          <nav>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600">Logout</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="available" className="space-y-4">
          <TabsList>
            <TabsTrigger value="available">Available Jobs</TabsTrigger>
            <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <motion.div 
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              {jobs.filter(job => job.status === 'Open' || job.status === 'Suggested').map(job => (
                <motion.div key={job.id} variants={fadeIn}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        {job.title}
                      </CardTitle>
                      <CardDescription>{job.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-orange-600 mb-2">
                        <DollarSign className="w-4 h-4" />
                        ${job.price} {job.suggestedPrice && `(Suggested: $${job.suggestedPrice})`}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600 mb-2">
                        <Clock className="w-4 h-4" />
                        {job.estimatedTime} {job.suggestedTime && `(Suggested: ${job.suggestedTime})`}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <User className="w-4 h-4" />
                        Posted by: {job.poster}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                      <div className="space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setSelectedJob(job)}>Suggest Changes</Button>
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
                                  Price ($)
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
                              <Button onClick={() => selectedJob && handleSubmitSuggestion(selectedJob.id)}>Submit Suggestion</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button onClick={() => handleAcceptJob(job.id)}>Accept Job</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="inprogress">
            <motion.div 
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              {jobs.filter(job => job.status === 'In Progress').map(job => (
                <motion.div key={job.id} variants={fadeIn}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        {job.title}
                      </CardTitle>
                      <CardDescription>{job.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-orange-600 mb-2">
                        <DollarSign className="w-4 h-4" />
                        ${job.price}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600 mb-2">
                        <Clock className="w-4 h-4" />
                        {job.estimatedTime}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <User className="w-4 h-4" />
                        Posted by: {job.poster}
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

      <footer className="mt-12 py-6 text-center text-orange-400">
        <p>&copy; 2023 HomeEase. All rights reserved.</p>
      </footer>
    </div>
  )
}