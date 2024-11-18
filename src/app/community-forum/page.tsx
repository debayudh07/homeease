/* eslint-disable */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Send, MapPin } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function CommunityForum() {
  const [workers, setWorkers] = useState([
    { id: 1, name: 'Ramesh Bhopadhike', avatar: '/placeholder.svg?height=40&width=40', rating: 4.8, skills: ['Cleaning', 'Organizing'], location: 'New York, NY' },
    { id: 2, name: 'Umesh Reshamiya', avatar: '/placeholder.svg?height=40&width=40', rating: 4.5, skills: ['Plumbing', 'Electrical'], location: 'Los Angeles, CA' },
    { id: 3, name: 'Sutiya Kamaral', avatar: '/placeholder.svg?height=40&width=40', rating: 4.9, skills: ['Gardening', 'Landscaping'], location: 'Chicago, IL' },
  ])

  const [selectedWorker, setSelectedWorker] = useState<{ id: number; name: string; avatar: string; rating: number; skills: string[]; location: string } | null>(null)
  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string }[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setChatMessages([...chatMessages, { sender: 'You', message: newMessage }])
      setNewMessage('')
      // Simulate worker response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: selectedWorker?.name || 'Worker', message: "Thank you for your message. How can I help you today?" }])
      }, 1000)
    }
  }

  const handleSubmitReview = () => {
    if (newReview.rating > 0) {
      if (selectedWorker) {
        setWorkers(workers.map(worker => 
          worker.id === selectedWorker.id 
            ? { ...worker, rating: parseFloat(((worker.rating * 5 + newReview.rating) / 6).toFixed(1)) } 
            : worker
        ))
      }
      setNewReview({ rating: 0, comment: '' })
      // Here you would typically send the review to your backend
      console.log('Review submitted:', newReview)
    }
  }

  return (
    <div className="min-h-screen bg-white text-orange-500">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">HomeEase Community Forum</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          <motion.section variants={fadeIn} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle>Local Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {workers.map(worker => (
                    <li key={worker.id} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={worker.avatar} alt={worker.name} />
                        <AvatarFallback>{worker.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{worker.name}</h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{worker.rating}</span>
                        </div>
                      </div>
                      <Button onClick={() => setSelectedWorker(worker)}>View Profile</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section variants={fadeIn} initial="initial" animate="animate">
            {selectedWorker ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedWorker.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedWorker.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="chat">
                    <TabsList>
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat">
                      <div className="h-64 overflow-y-auto mb-4 p-4 border rounded">
                        {chatMessages.map((msg, index) => (
                          <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                            <span className="font-semibold">{msg.sender}: </span>
                            {msg.message}
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Input 
                          value={newMessage} 
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="profile">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedWorker.skills.map(skill => (
                              <span key={skill} className="bg-orange-100 text-orange-800 px-2 py-1 rounded">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold">Rating</h3>
                          <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 mr-1" />
                            <span>{selectedWorker.rating} / 5</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="reviews">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Leave a Review</h3>
                          <div className="flex items-center space-x-1 mb-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-6 h-6 cursor-pointer ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                              />
                            ))}
                          </div>
                          <Textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                            placeholder="Write your review..."
                            className="mb-2"
                          />
                          <Button onClick={handleSubmitReview}>Submit Review</Button>
                        </div>
                        {/* Here you would typically map through and display existing reviews */}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-xl">Select a worker to view their profile and chat</p>
                </CardContent>
              </Card>
            )}
          </motion.section>
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-orange-400">
        <p>&copy; 2023 HomeEase. All rights reserved.</p>
      </footer>
    </div>
  )
}