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
import { Briefcase, DollarSign, MapPin, Clock, User } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function UserDashboard() {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'House Cleaning', description: 'Need help cleaning a 3-bedroom house', price: 80, location: 'New York, NY', status: 'Open', worker: null },
    { id: 2, title: 'Lawn Mowing', description: 'Looking for someone to mow my lawn weekly', price: 50, location: 'Los Angeles, CA', status: 'In Progress', worker: { name: 'Jane Smith', rating: 4.8 } },
    { id: 3, title: 'Furniture Assembly', description: 'Need assistance assembling IKEA furniture', price: 100, location: 'Chicago, IL', status: 'Completed', worker: { name: 'Mike Johnson', rating: 4.5 } },
  ])

  const [newJob, setNewJob] = useState({ title: '', description: '', price: '', location: '' })

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setNewJob(prev => ({ ...prev, [name]: value }))
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
};

  return (
    <div className="min-h-screen bg-white text-orange-500">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HomeEase User Dashboard</h1>
          <nav>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600">Logout</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="myjobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="myjobs">My Jobs</TabsTrigger>
            <TabsTrigger value="post">Post a Job</TabsTrigger>
          </TabsList>

          <TabsContent value="myjobs">
            <motion.div 
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              {jobs.map(job => (
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
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-600 mb-2">
                        <Clock className="w-4 h-4" />
                        Status: {job.status}
                      </div>
                      {job.worker && (
                        <div className="flex items-center gap-2 text-sm text-orange-600">
                          <User className="w-4 h-4" />
                          Worker: {job.worker.name} (Rating: {job.worker.rating})
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Badge variant={job.status === 'Open' ? 'default' : job.status === 'In Progress' ? 'secondary' : 'outline'}>
                        {job.status}
                      </Badge>
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
                    <label htmlFor="title" className="block text-sm font-medium text-orange-600 mb-1">Job Title</label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={newJob.title} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-orange-600 mb-1">Description</label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={newJob.description} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-orange-600 mb-1">Price ($)</label>
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
                    <label htmlFor="location" className="block text-sm font-medium text-orange-600 mb-1">Location</label>
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

      <footer className="mt-12 py-6 text-center text-orange-400">
        <p>&copy; 2023 HomeEase. All rights reserved.</p>
      </footer>
    </div>
  )
}