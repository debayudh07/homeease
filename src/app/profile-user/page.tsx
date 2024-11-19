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
import { Label } from "@/components/ui/label"
import { Briefcase, DollarSign, MapPin, Clock, User, Mail, Phone } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, New York, NY 10001',
  })

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Bathroom Renovation', description: 'Need help renovating a small bathroom', price: 500, estimatedTime: '3 days', location: 'New York, NY', status: 'Open' },
    { id: 2, title: 'Kitchen Sink Repair', description: 'Leaking kitchen sink needs fixing', price: 100, estimatedTime: '2 hours', location: 'New York, NY', status: 'In Progress' },
    { id: 3, title: 'Lawn Mowing', description: 'Weekly lawn mowing service needed', price: 50, estimatedTime: '1 hour', location: 'New York, NY', status: 'Completed' },
  ])

  const [editMode, setEditMode] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setEditedProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setProfile(editedProfile)
    setEditMode(false)
  }

  return (
    <div className="min-h-screen bg-white text-red-500">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HomeEase User Profile</h1>
          <nav>
            <Button variant="ghost" className="text-red-500 hover:text-red-600">Dashboard</Button>
            <Button variant="ghost" className="text-red-500 hover:text-red-600">Logout</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <motion.div variants={fadeIn} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profile.name} />
                    <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{profile.name}</CardTitle>
                    <CardDescription>HomeEase User</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={editedProfile.name} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={editedProfile.email} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={editedProfile.phone} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={editedProfile.address} onChange={handleInputChange} />
                    </div>
                  </form>
                ) : (
                  <div className="space-y-2">
                    <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {profile.email}</p>
                    <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {profile.phone}</p>
                    <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {profile.address}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {editMode ? (
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                ) : (
                  <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle>My Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="open">
                  <TabsList>
                    <TabsTrigger value="open">Open Jobs</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
                  </TabsList>
                  {['open', 'in-progress', 'completed'].map((status) => (
                    <TabsContent key={status} value={status}>
                      {jobs.filter(job => job.status.toLowerCase().replace(' ', '-') === status).map(job => (
                        <Card key={job.id} className="mb-4">
                          <CardHeader>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <CardDescription>{job.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                              <DollarSign className="w-4 h-4" />
                              ${job.price}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                              <Clock className="w-4 h-4" />
                              {job.estimatedTime}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-red-600">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Badge variant={status === 'open' ? 'default' : status === 'in-progress' ? 'secondary' : 'outline'}>
                              {job.status}
                            </Badge>
                          </CardFooter>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-red-400">
        <p>&copy; 2023 HomeEase. All rights reserved.</p>
      </footer>
    </div>
  )
}