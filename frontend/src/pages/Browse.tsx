
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Grid3X3, 
  List,
  MessageSquare,
  Heart,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Technology', 'Creative', 'Business', 'Languages', 'Health & Fitness', 
    'Cooking', 'Music', 'Education', 'Crafts', 'Sports'
  ];

  const skills = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: '',
      rating: 4.9,
      totalSwaps: 45,
      location: 'San Francisco, CA',
      skills: ['React Development', 'TypeScript', 'UI/UX Design'],
      wants: ['Digital Marketing', 'Content Writing'],
      categories: ['Technology', 'Creative'],
      availability: 'Available now',
      bio: 'Full-stack developer with 5 years of experience. Love teaching and learning new technologies.',
      responseTime: '2 hours',
      languages: ['English', 'Mandarin']
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      avatar: '',
      rating: 4.7,
      totalSwaps: 32,
      location: 'Austin, TX',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
      wants: ['Python Programming', 'Data Analysis'],
      categories: ['Business', 'Technology'],
      availability: 'Available weekends',
      bio: 'Marketing professional passionate about data-driven strategies and continuous learning.',
      responseTime: '4 hours',
      languages: ['English', 'Spanish']
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: '',
      rating: 5.0,
      totalSwaps: 28,
      location: 'London, UK',
      skills: ['Photography', 'Photo Editing', 'Adobe Creative Suite'],
      wants: ['Web Development', 'JavaScript'],
      categories: ['Creative', 'Technology'],
      availability: 'Available weekdays',
      bio: 'Professional photographer looking to transition into tech. Expert in visual storytelling.',
      responseTime: '1 hour',
      languages: ['English', 'French']
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: '',
      rating: 4.8,
      totalSwaps: 56,
      location: 'Seoul, South Korea',
      skills: ['Machine Learning', 'Python', 'Data Science'],
      wants: ['UI/UX Design', 'Product Management'],
      categories: ['Technology', 'Business'],
      availability: 'Available now',
      bio: 'AI researcher with expertise in deep learning. Excited to learn about design thinking.',
      responseTime: '3 hours',
      languages: ['Korean', 'English']
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      avatar: '',
      rating: 4.6,
      totalSwaps: 19,
      location: 'Toronto, Canada',
      skills: ['Graphic Design', 'Brand Identity', 'Illustration'],
      wants: ['Video Editing', 'Animation'],
      categories: ['Creative'],
      availability: 'Available evenings',
      bio: 'Creative designer with a passion for visual communication and storytelling.',
      responseTime: '6 hours',
      languages: ['English', 'French']
    },
    {
      id: 6,
      name: 'Alex Johnson',
      avatar: '',
      rating: 4.9,
      totalSwaps: 73,
      location: 'New York, NY',
      skills: ['Project Management', 'Agile', 'Team Leadership'],
      wants: ['Mobile App Development', 'Flutter'],
      categories: ['Business', 'Technology'],
      availability: 'Available now',
      bio: 'Experienced PM looking to dive into mobile development. Great at breaking down complex projects.',
      responseTime: '1 hour',
      languages: ['English']
    }
  ];

  const filteredSkills = skills.filter(person => {
    const matchesSearch = searchQuery === '' || 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      person.wants.some(want => want.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
      person.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SkillSwap</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button onClick={() => navigate('/profile')}>
                My Profile
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Skills</h1>
          <p className="text-gray-600">Find amazing people to exchange skills with</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search skills, people, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/60 backdrop-blur-sm border-blue-200/30"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-white/60 backdrop-blur-sm border-blue-200/30">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/60 backdrop-blur-sm border-blue-200/30"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex border rounded-lg bg-white/60 backdrop-blur-sm">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="bg-white/60 backdrop-blur-sm border-blue-200/30 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    {['Available now', 'Available weekends', 'Available weekdays', 'Available evenings'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox id={option} />
                        <label htmlFor={option} className="text-sm">{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {['4.5+ stars', '4.0+ stars', '3.5+ stars', 'Any rating'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox id={option} />
                        <label htmlFor={option} className="text-sm">{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Experience</h3>
                  <div className="space-y-2">
                    {['50+ swaps', '25+ swaps', '10+ swaps', 'Any experience'].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox id={option} />
                        <label htmlFor={option} className="text-sm">{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredSkills.length} of {skills.length} results
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48 bg-white/60 backdrop-blur-sm border-blue-200/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="recent">Recently Active</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {filteredSkills.map((person) => (
            <Card 
              key={person.id} 
              className={`bg-white/60 backdrop-blur-sm border-blue-200/30 hover:shadow-lg transition-all cursor-pointer group ${
                viewMode === 'list' ? 'flex-row' : ''
              }`}
            >
              <CardHeader className={viewMode === 'list' ? 'flex-row space-y-0' : ''}>
                <div className={`flex ${viewMode === 'list' ? 'flex-row items-center space-x-4 flex-1' : 'flex-col items-center space-y-4'}`}>
                  <Avatar className={viewMode === 'list' ? 'h-16 w-16' : 'h-20 w-20'}>
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`${viewMode === 'list' ? 'flex-1' : 'text-center'}`}>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">
                      {person.name}
                    </CardTitle>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{person.rating}</span>
                      <span className="text-sm text-gray-500">({person.totalSwaps} swaps)</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {person.location}
                    </div>
                  </div>

                  {viewMode === 'list' && (
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Request Swap
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Offers</h4>
                  <div className="flex flex-wrap gap-1">
                    {person.skills.map((skill, index) => (
                      <Badge key={index} className="bg-green-100 text-green-700 hover:bg-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Wants to Learn</h4>
                  <div className="flex flex-wrap gap-1">
                    {person.wants.map((want, index) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                        {want}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="line-clamp-2">{person.bio}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Responds in {person.responseTime}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {person.availability}
                  </Badge>
                </div>

                {viewMode === 'grid' && (
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Request Swap
                    </Button>
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="bg-white/60 backdrop-blur-sm border-blue-200/30">
            Load More Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Browse;
