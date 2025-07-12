
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Plus, 
  Search, 
  Bell, 
  Settings,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '',
    rating: 4.8,
    totalSwaps: 23,
    activeSwaps: 3,
    skillsOffered: 8,
    skillsWanted: 5
  };

  const activeSwaps = [
    {
      id: 1,
      partner: 'Sarah Chen',
      partnerAvatar: '',
      offering: 'React Development',
      learning: 'UI/UX Design',
      status: 'in-progress',
      nextMeeting: '2024-07-15T14:00:00',
      progress: 60
    },
    {
      id: 2,
      partner: 'Mike Rodriguez',
      partnerAvatar: '',
      offering: 'Python Programming',
      learning: 'Digital Marketing',
      status: 'scheduled',
      nextMeeting: '2024-07-16T10:00:00',
      progress: 20
    },
    {
      id: 3,
      partner: 'Emma Wilson',
      partnerAvatar: '',
      offering: 'Photography',
      learning: 'Video Editing',
      status: 'pending-completion',
      nextMeeting: null,
      progress: 90
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      from: 'David Kim',
      avatar: '',
      skill: 'Machine Learning',
      message: 'Hi! I\'d love to learn React from you in exchange for ML knowledge.',
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      from: 'Lisa Thompson',
      avatar: '',
      skill: 'Graphic Design',
      message: 'Interested in trading design skills for programming help!',
      timeAgo: '1 day ago'
    }
  ];

  const recentActivity = [
    { type: 'swap-completed', message: 'Completed swap with John Doe', time: '2 days ago' },
    { type: 'rating-received', message: 'Received 5-star rating from Jane Smith', time: '3 days ago' },
    { type: 'request-sent', message: 'Sent swap request to Mike Johnson', time: '5 days ago' },
    { type: 'profile-updated', message: 'Updated your skill profile', time: '1 week ago' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'scheduled': return <Calendar className="h-4 w-4 text-orange-500" />;
      case 'pending-completion': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-progress': return 'In Progress';
      case 'scheduled': return 'Scheduled';
      case 'pending-completion': return 'Pending Completion';
      default: return 'Completed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SkillSwap</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <Button variant="ghost" onClick={() => navigate('/browse')}>
                <Search className="h-4 w-4 mr-2" />
                Browse Skills
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your skill exchanges</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                  <p className="text-2xl font-bold text-gray-900">{user.totalSwaps}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                  <p className="text-2xl font-bold text-gray-900">{user.activeSwaps}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Your Rating</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-gray-900">{user.rating}</p>
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skills Offered</p>
                  <p className="text-2xl font-bold text-gray-900">{user.skillsOffered}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button 
            className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => navigate('/browse')}
          >
            <Search className="h-5 w-5 mr-2" />
            Find Skills to Learn
          </Button>
          <Button 
            variant="outline" 
            className="h-16 border-blue-200 hover:bg-blue-50"
            onClick={() => navigate('/profile')}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Skills
          </Button>
          <Button 
            variant="outline" 
            className="h-16 border-blue-200 hover:bg-blue-50"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            View Messages
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="swaps">Active Swaps</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Swaps Preview */}
              <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Active Swaps
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('swaps')}>
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeSwaps.slice(0, 2).map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between p-4 bg-white/40 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={swap.partnerAvatar} />
                          <AvatarFallback>{swap.partner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{swap.partner}</p>
                          <p className="text-sm text-gray-600">{swap.offering} ↔ {swap.learning}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(swap.status)}
                        <Badge variant="secondary">{getStatusLabel(swap.status)}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30">
              <CardHeader>
                <CardTitle>Your Active Swaps</CardTitle>
                <CardDescription>
                  Manage your ongoing skill exchanges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeSwaps.map((swap) => (
                  <div key={swap.id} className="p-6 bg-white/40 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={swap.partnerAvatar} />
                          <AvatarFallback>{swap.partner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{swap.partner}</h3>
                          <p className="text-gray-600">{swap.offering} ↔ {swap.learning}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(swap.status)}
                        <Badge variant="secondary">{getStatusLabel(swap.status)}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{swap.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                            style={{ width: `${swap.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {swap.nextMeeting && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Next meeting: {new Date(swap.nextMeeting).toLocaleDateString()} at {new Date(swap.nextMeeting).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {swap.status === 'pending-completion' && (
                          <Button size="sm" variant="outline">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30">
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>
                  Review and respond to swap requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-6 bg-white/40 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.from.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{request.from}</h3>
                            <Badge>{request.skill}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{request.message}</p>
                          <p className="text-xs text-gray-500">{request.timeAgo}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                      <Button size="sm" variant="ghost">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
