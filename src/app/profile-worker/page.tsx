'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Briefcase, DollarSign, MapPin, Star, User, Phone, Mail, Calendar } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function WorkerProfile() {
  const [profile, setProfile] = useState({
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    bio: 'Experienced home service professional with 5+ years in cleaning and organizing.',
    skills: ['Cleaning', 'Organizing', 'Lawn Care', 'Painting'],
    hourlyRate: 25,
    completedJobs: 47,
    rating: 4.8,
    memberSince: '2021-03-15'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillChange = (e: { target: { value: string } }) => {
    const skills = e.target.value.split(',').map((skill: string) => skill.trim())
    setProfile(prev => ({ ...prev, skills }))
  }

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log('Saving profile:', profile)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-white text-orange-500">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HomeEase Worker Profile</h1>
          <nav>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600">Dashboard</Button>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600">Logout</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profile.name} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={profile.phone} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" value={profile.location} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={profile.bio} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Input id="skills" name="skills" value={profile.skills.join(', ')} onChange={handleSkillChange} />
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input id="hourlyRate" name="hourlyRate" type="number" value={profile.hourlyRate} onChange={handleInputChange} />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-orange-600">{profile.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {profile.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {profile.phone}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        ${profile.hourlyRate}/hour
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {profile.completedJobs} jobs completed
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        {profile.rating} rating
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Member since {new Date(profile.memberSince).toLocaleDateString()}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {isEditing ? (
                <Button onClick={handleSave}>Save Changes</Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <footer className="mt-12 py-6 text-center text-orange-400">
        <p>&copy; 2023 HomeEase. All rights reserved.</p>
      </footer>
    </div>
  )
}