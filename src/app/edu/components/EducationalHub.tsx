import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock, 
  Star, 
  Clock, 
  Users, 
  TrendingUp,
  FileText,
  Video,
  Headphones,
  Award,
  Search,
  Filter
} from "lucide-react";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  isCompleted: boolean;
  isLocked: boolean;
  topics: string[];
  type: "video" | "article" | "interactive" | "quiz";
}

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  scenario: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  learningOutcomes: string[];
}

export function EducationalHub() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const learningModules: LearningModule[] = [
    {
      id: "1",
      title: "Introduction to Bonds",
      description: "Learn the fundamentals of bond investing, what bonds are, and how they work",
      duration: "45 min",
      difficulty: "Beginner",
      progress: 100,
      isCompleted: true,
      isLocked: false,
      topics: ["Bond Basics", "Types of Bonds", "Bond vs Stocks"],
      type: "video"
    },
    {
      id: "2",
      title: "Understanding Bond Pricing",
      description: "Deep dive into how bonds are priced and what affects bond valuations",
      duration: "60 min",
      difficulty: "Intermediate",
      progress: 75,
      isCompleted: false,
      isLocked: false,
      topics: ["Present Value", "Interest Rates", "Credit Risk"],
      type: "interactive"
    },
    {
      id: "3",
      title: "Yield Calculations & Analysis",
      description: "Master different types of yields and how to calculate them",
      duration: "50 min",
      difficulty: "Intermediate",
      progress: 30,
      isCompleted: false,
      isLocked: false,
      topics: ["Current Yield", "YTM", "YTC", "Spread Analysis"],
      type: "article"
    },
    {
      id: "4",
      title: "Credit Ratings Explained",
      description: "Understanding credit ratings, rating agencies, and what they mean for investors",
      duration: "40 min",
      difficulty: "Beginner",
      progress: 0,
      isCompleted: false,
      isLocked: false,
      topics: ["Rating Agencies", "Rating Scale", "Default Risk"],
      type: "video"
    },
    {
      id: "5",
      title: "Duration & Convexity",
      description: "Advanced concepts of price sensitivity and risk measurement",
      duration: "70 min",
      difficulty: "Advanced",
      progress: 0,
      isCompleted: false,
      isLocked: true,
      topics: ["Modified Duration", "Convexity", "Hedging"],
      type: "interactive"
    },
    {
      id: "6",
      title: "Tax Implications of Bond Investing",
      description: "Navigate the tax landscape for bond investments in India",
      duration: "35 min",
      difficulty: "Intermediate",
      progress: 0,
      isCompleted: false,
      isLocked: false,
      topics: ["Tax Treatment", "TDS", "Capital Gains"],
      type: "article"
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: "1",
      title: "Interest Rate Risk Scenario",
      description: "Analyze how rising interest rates affect a bond portfolio",
      scenario: "RBI increases repo rate by 50 bps. How does this impact your bond holdings?",
      difficulty: "Intermediate",
      estimatedTime: "30 min",
      learningOutcomes: ["Interest rate sensitivity", "Portfolio rebalancing", "Duration matching"]
    },
    {
      id: "2", 
      title: "Credit Rating Downgrade",
      description: "Navigate a corporate bond facing credit rating changes",
      scenario: "A corporate bond you own gets downgraded from AA to A+. What's your next move?",
      difficulty: "Advanced",
      estimatedTime: "25 min",
      learningOutcomes: ["Credit analysis", "Risk assessment", "Portfolio decisions"]
    },
    {
      id: "3",
      title: "Building a Ladder Strategy",
      description: "Construct a bond ladder for steady income",
      scenario: "You have ₹10 lakhs to invest for regular income. Build an optimal bond ladder.",
      difficulty: "Beginner",
      estimatedTime: "35 min",
      learningOutcomes: ["Laddering strategy", "Cash flow planning", "Reinvestment risk"]
    }
  ];

  const glossaryTerms = [
    { term: "Yield to Maturity (YTM)", definition: "The total return anticipated on a bond if held until maturity" },
    { term: "Coupon Rate", definition: "The annual interest rate paid by the bond issuer" },
    { term: "Duration", definition: "A measure of bond price sensitivity to interest rate changes" },
    { term: "Credit Spread", definition: "The difference in yield between a corporate bond and government bond" },
    { term: "Face Value", definition: "The principal amount that will be paid back at maturity" }
  ];

  const videoLibrary = [
    {
      title: "RBI Monetary Policy Explained",
      speaker: "Dr. Raghuram Rajan",
      duration: "25:30",
      views: "45K",
      rating: 4.8
    },
    {
      title: "Corporate Bond Market Outlook 2024",
      speaker: "Sanjay Sharma, CFA",
      duration: "18:45",
      views: "32K", 
      rating: 4.6
    },
    {
      title: "Government Securities: Safe Haven Assets",
      speaker: "Priya Nair, Fixed Income Analyst",
      duration: "22:15",
      views: "28K",
      rating: 4.7
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "article": return <FileText className="h-4 w-4" />;
      case "interactive": return <Play className="h-4 w-4" />;
      case "quiz": return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const filteredModules = learningModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || 
                         activeFilter === module.difficulty.toLowerCase() ||
                         (activeFilter === "completed" && module.isCompleted) ||
                         (activeFilter === "in-progress" && module.progress > 0 && !module.isCompleted);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Educational Hub</h1>
          <p className="text-gray-600">
            Master bond investing with comprehensive learning modules, expert insights, and practical case studies
          </p>
        </div>

        {/* Learning Progress Overview */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">4</div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">68%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Certificates Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">12h</div>
                <div className="text-sm text-gray-600">Learning Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            <TabsTrigger value="videos">Video Library</TabsTrigger>
            <TabsTrigger value="cases">Case Studies</TabsTrigger>
            <TabsTrigger value="glossary">Glossary</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          {/* Learning Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search modules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["all", "beginner", "intermediate", "advanced", "completed", "in-progress"].map((filter) => (
                      <Button
                        key={filter}
                        variant={activeFilter === filter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className="capitalize"
                      >
                        {filter === "in-progress" ? "In Progress" : filter}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <Card key={module.id} className={`relative ${module.isLocked ? 'opacity-60' : 'hover:shadow-lg transition-shadow cursor-pointer'}`}>
                  {module.isLocked && (
                    <div className="absolute top-4 right-4 z-10">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(module.type)}
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                      </div>
                      {module.isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          {module.duration}
                        </div>
                        <div className="text-gray-500">
                          {module.progress}% complete
                        </div>
                      </div>
                      
                      <Progress value={module.progress} className="h-2" />
                      
                      <div className="flex flex-wrap gap-1">
                        {module.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {module.topics.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{module.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      {module.isLocked ? (
                        <Button disabled className="w-full">
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </Button>
                      ) : module.isCompleted ? (
                        <Button variant="outline" className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      ) : module.progress > 0 ? (
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      ) : (
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Start Learning
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Video Library Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoLibrary.map((video, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-600 rounded-t-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <Video className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">Video Content</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg">
                      <Button size="lg" className="rounded-full">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {video.speaker}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {video.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {video.rating}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Case Studies Tab */}
          <TabsContent value="cases" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{caseStudy.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(caseStudy.difficulty)}>
                            {caseStudy.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {caseStudy.estimatedTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{caseStudy.description}</p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="font-medium text-blue-800 text-sm mb-1">Scenario:</div>
                      <div className="text-blue-700 text-sm">{caseStudy.scenario}</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="font-medium text-sm mb-2">What you'll learn:</div>
                      <ul className="space-y-1">
                        {caseStudy.learningOutcomes.map((outcome, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Case Study
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Glossary Tab */}
          <TabsContent value="glossary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bond Market Glossary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {glossaryTerms.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h3 className="font-medium mb-1">{item.term}</h3>
                      <p className="text-sm text-gray-600">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Overall Completion</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-3" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Beginner Level</span>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Intermediate Level</span>
                        <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Advanced Level</span>
                        <Badge variant="secondary">Locked</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="bg-green-500 p-2 rounded-full">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Bond Basics Master</div>
                        <div className="text-xs text-gray-500">Complete beginner modules</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="bg-blue-500 p-2 rounded-full">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Quiz Champion</div>
                        <div className="text-xs text-gray-500">Score 90%+ on 5 quizzes</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="bg-purple-500 p-2 rounded-full">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Learning Streak</div>
                        <div className="text-xs text-gray-500">7 days of continuous learning</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Complete Yield Analysis</div>
                      <div className="text-sm text-gray-500">Continue your intermediate journey</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Take Assessment Quiz</div>
                      <div className="text-sm text-gray-500">Test your knowledge</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Explore Case Studies</div>
                      <div className="text-sm text-gray-500">Apply your learning</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
