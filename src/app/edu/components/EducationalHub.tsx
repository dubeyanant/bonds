import { useState, useEffect } from "react";
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
  Clock,
  Users,
  FileText,
  Video,
  Award,
  RefreshCw,
  Plus,
} from "lucide-react";
import { BondLearningFlow } from "./BondLearningFlow";
import { VideoPlayer, VideoThumbnail } from "@/components/VideoPlayer";
import {
  fetchMultipleYouTubeVideos,
  processVideoData,
  ProcessedVideoData,
  EDUCATIONAL_VIDEO_IDS,
  extractVideoIdFromUrl,
  fetchYouTubeVideoDetails,
} from "@/lib/youtubeApi";

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

export function EducationalHub() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLearningFlow, setShowLearningFlow] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [moduleProgress, setModuleProgress] = useState<{ [key: string]: { progress: number; isCompleted: boolean } }>({});
  
  // YouTube video related states
  const [videoLibrary, setVideoLibrary] = useState<ProcessedVideoData[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('bondEducationProgress');
    if (savedProgress) {
      setModuleProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bondEducationProgress', JSON.stringify(moduleProgress));
  }, [moduleProgress]);

  // Load YouTube videos on component mount
  useEffect(() => {
    loadYouTubeVideos();
  }, []);

  // Load videos from localStorage or fetch from API
  const loadYouTubeVideos = async () => {
    setIsLoadingVideos(true);
    try {
      // First try to load from localStorage
      const savedVideos = localStorage.getItem('bondEducationVideos');
      if (savedVideos) {
        setVideoLibrary(JSON.parse(savedVideos));
      } else {
        // Fetch from YouTube API
        const videoData = await fetchMultipleYouTubeVideos(EDUCATIONAL_VIDEO_IDS);
        const processedVideos = videoData.map(processVideoData);
        setVideoLibrary(processedVideos);
        localStorage.setItem('bondEducationVideos', JSON.stringify(processedVideos));
      }
    } catch (error) {
      console.error('Error loading videos:', error);
      // Fallback to static data if API fails
      const fallbackVideos = [
        {
          id: 'fallback-1',
          title: 'Introduction to Bond Investing',
          speaker: 'Financial Education',
          duration: '15:30',
          views: '25K',
          thumbnail: '/api/placeholder/320/180',
          description: 'Learn the basics of bond investing',
          publishedAt: new Date().toISOString(),
          tags: ['bonds', 'investing'],
          embedUrl: '#'
        }
      ];
      setVideoLibrary(fallbackVideos);
    }
    setIsLoadingVideos(false);
  };

  // Add new video from URL
  const addVideoFromUrl = async () => {
    if (!newVideoUrl.trim()) return;
    
    const videoId = extractVideoIdFromUrl(newVideoUrl);
    if (!videoId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setIsAddingVideo(true);
    try {
      const videoData = await fetchYouTubeVideoDetails(videoId);
      if (videoData) {
        const processedVideo = processVideoData(videoData);
        const updatedLibrary = [...videoLibrary, processedVideo];
        setVideoLibrary(updatedLibrary);
        localStorage.setItem('bondEducationVideos', JSON.stringify(updatedLibrary));
        setNewVideoUrl('');
      } else {
        alert('Could not fetch video details. Please check the URL.');
      }
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Error adding video. Please try again.');
    }
    setIsAddingVideo(false);
  };

  // Refresh video library
  const refreshVideoLibrary = async () => {
    localStorage.removeItem('bondEducationVideos');
    await loadYouTubeVideos();
  };

  // Handle video play
  const handleVideoPlay = (video: ProcessedVideoData) => {
    setSelectedVideo({ id: video.id, title: video.title });
  };

  // Close video player
  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const getModuleState = (moduleId: string, defaultProgress: number, defaultCompleted: boolean) => {
    const saved = moduleProgress[moduleId];
    
    // Special handling for module "1" to start at lesson 4 (only on client side)
    if (moduleId === "1" && typeof window !== 'undefined') {
      // Set localStorage to start at lesson 4 (index 3)
      const savedState = localStorage.getItem('bondLearningFlow_module1');
      if (!savedState) {
        const initialState = {
          currentIndex: 3, // Start at lesson 4 (0-indexed)
          completed: [1, 2, 3], // Mark first 3 lessons as completed
          answers: {},
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('bondLearningFlow_module1', JSON.stringify(initialState));
        console.log('🎯 Set module 1 to start at lesson 4');
      }
    }
    
    return {
      progress: saved?.progress ?? defaultProgress,
      isCompleted: saved?.isCompleted ?? defaultCompleted
    };
  };

  const updateModuleProgress = (moduleId: string, progress: number, isCompleted: boolean) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: { progress, isCompleted }
    }));
  };

  const learningModules: LearningModule[] = [
    {
      id: "1",
      title: "Introduction to Bonds",
      description: "Learn the fundamentals of bond investing, what bonds are, and how they work",
      duration: "45 min",
      difficulty: "Beginner",
      ...getModuleState("1", 80, false),
      isLocked: false,
      topics: ["Bond Basics", "Types of Bonds", "Bond vs Stocks"],
      type: "interactive"
    },
    {
      id: "2",
      title: "Credit Ratings Explained",
      description: "Understanding credit ratings, rating agencies, and what they mean for investors",
      duration: "40 min",
      difficulty: "Beginner",
      ...getModuleState("2", 100, true),
      isLocked: false,
      topics: ["Rating Agencies", "Rating Scale", "Default Risk"],
      type: "video"
    },
    {
      id: "3",
      title: "Understanding Bond Pricing",
      description: "Deep dive into how bonds are priced and what affects bond valuations",
      duration: "60 min",
      difficulty: "Intermediate",
      ...getModuleState("3", 100, true),
      isLocked: false,
      topics: ["Present Value", "Interest Rates", "Credit Risk"],
      type: "video"
    },
    {
      id: "4",
      title: "Yield Calculations & Analysis",
      description: "Master different types of yields and how to calculate them",
      duration: "50 min",
      difficulty: "Intermediate",
      ...getModuleState("4", 45, false),
      isLocked: false,
      topics: ["Current Yield", "YTM", "YTC", "Spread Analysis"],
      type: "article"
    },
    
    {
      id: "5",
      title: "Tax Implications of Bond Investing",
      description: "Navigate the tax landscape for bond investments in India",
      duration: "35 min",
      difficulty: "Intermediate",
      ...getModuleState("5", 0, false),
      isLocked: false,
      topics: ["Tax Treatment", "TDS", "Capital Gains"],
      type: "article"
    },
    {
      id: "6",
      title: "Duration & Risk Management",
      description: "Advanced concepts of bond sensitivity and risk measurement",
      duration: "70 min",
      difficulty: "Advanced",
      ...getModuleState("6", 0, false),
      isLocked: true,
      topics: ["Modified Duration", "Convexity", "Hedging"],
      type: "interactive"
    }
  ];

  const glossaryTerms = [ 
    { term: "Bond/Debenture", definition: "A debt instrument representing a loan made by an investor to an issuer (typically government or corporation). The issuer promises to repay the principal and usually pays interest (coupon) over a defined period." },
    { term: "Issuer", definition: "The entity (Government, PSU, or Corporate) that borrows the money by issuing the bond." },
    { term: "Face Value / Par Value / Principal", definition: "The nominal value of the bond (usually ₹1,000 in India) which is repaid to the bondholder on the maturity date." },
    { term: "Maturity Date", definition: "The date on which the issuer repays the full Face Value (principal) of the bond to the investor." },
    { term: "Coupon Rate", definition: "The fixed annual interest rate the issuer agrees to pay on the bond, expressed as a percentage of the Face Value." },
    { term: "Coupon Payment / Frequency", definition: "The actual cash amount paid as interest, and how often it is paid (e.g., semi-annually or annually)." },
    { term: "Accrued Interest", definition: "The interest a bond has earned since the last coupon payment date. A buyer must pay the seller this amount when purchasing the bond between coupon dates." },
    { term: "G-Sec / Government Security", definition: "A tradable instrument issued by the Central or State Governments of India (e.g., Treasury Bills or Dated Securities)." },
    { term: "Yield to Maturity (YTM)", definition: "The total annual rate of return an investor can expect if the bond is held until its maturity date, assuming all coupon payments are reinvested at the same rate." },
    { term: "Current Yield", definition: "The annual interest (coupon) payment divided by the bond's current market price. It shows the return based only on income." },
    { term: "Basis Point (bps)", definition: "A unit of measurement for interest rates and yields. 1 basis point (bps) is equal to 0.01%. (e.g., a 0.25% change is 25 bps)." },
    { term: "Discount", definition: "The condition where a bond's market price is below its Face Value (Par Value)." },
    { term: "Premium", definition: "The condition where a bond's market price is above its Face Value (Par Value)." },
    { term: "Yield Curve", definition: "A line that plots the yields (YTM) of bonds with equal credit quality but different maturity dates. It helps in assessing interest rate expectations." },
    { term: "Duration", definition: "A measure of a bond's price sensitivity to changes in interest rates. Higher duration means the bond's price will fluctuate more with a change in rates." },
    { term: "Credit Rating", definition: "An assessment of the issuer's creditworthiness and ability to repay the debt, provided by agencies like CRISIL, ICRA, or CARE. (e.g., AAA is the highest safety)." },
    { term: "Credit Risk / Default Risk", definition: "The risk that the bond issuer will be unable to make timely interest payments or repay the principal amount at maturity." },
    { term: "Credit Spread", definition: "The difference in yield between a Corporate Bond and a comparable Government Bond (G-Sec). It is the extra compensation an investor demands for taking on credit risk." },
    { term: "Default", definition: "The failure of a bond issuer to make a scheduled interest or principal payment." },
    { term: "Investment Grade", definition: "A credit rating indicating a relatively low risk of default (e.g., BBB- and above)." },
    { term: "High Yield Bonds (Junk Bonds)", definition: "Bonds with lower credit ratings (below Investment Grade) that offer higher yields to compensate investors for the significantly higher risk of default." },
    { term: "Treasury Bill (T-Bill)", definition: "A short-term G-Sec issued by the Central Government, with a maturity of less than one year. T-Bills are zero-coupon securities." },
    { term: "Zero-Coupon Bond", definition: "A bond that does not pay periodic interest (coupons). It is instead issued at a deep discount to its Face Value and redeemed at Par, with the capital appreciation being the investor's return." },
    { term: "Callable Bond", definition: "A bond that gives the issuer the right to redeem the bond (pay back the principal) before its maturity date." },
    { term: "Puttable Bond", definition: "A bond that gives the investor the right to demand early repayment of the principal from the issuer before its maturity date." },
    { term: "ISIN", definition: "International Securities Identification Number—a unique 12-character code used globally to identify a specific bond." },
    { term: "Primary Market", definition: "The market where the bond is first issued by the borrower (issuer) to investors." },
    { term: "Secondary Market", definition: "The market where existing bonds are traded between investors after the initial issue." },
    { term: "ASBA", definition: "Application Supported by Blocked Amount. A payment mechanism used in public issues (like bonds or IPOs) where the funds are blocked in the bank account but only debited upon final allotment." }
  ];

  // Video library is now managed by state and loaded from YouTube API

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 transition-colors duration-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900 transition-colors duration-200";
      case "Advanced": return "bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900 transition-colors duration-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-200";
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

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === "1") { // Introduction to Bonds module
      setSelectedModuleId(moduleId);
      setShowLearningFlow(true);
    }
    // Handle other modules as needed
  };

  const handleLearningFlowBack = () => {
    setShowLearningFlow(false);
    setSelectedModuleId(null);
  };

  const handleLearningFlowComplete = () => {
    // Update the module progress to completed
    if (selectedModuleId) {
      updateModuleProgress(selectedModuleId, 100, true);
    }
    setShowLearningFlow(false);
    setSelectedModuleId(null);
  };

  const handleLearningFlowProgress = (progress: number) => {
    // Update the module progress when user leaves mid-way
    if (selectedModuleId) {
      updateModuleProgress(selectedModuleId, progress, false);
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

  if (showLearningFlow && selectedModuleId === "1") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <BondLearningFlow 
            onBack={handleLearningFlowBack}
            onComplete={handleLearningFlowComplete}
            onProgress={handleLearningFlowProgress}
          />
        </div>
      </div>
    );
  }

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
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {learningModules.filter(m => m.isCompleted).length}
                </div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {Math.round(learningModules.reduce((acc, m) => acc + m.progress, 0) / learningModules.length)}%
                </div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {learningModules.filter(m => m.isCompleted).length}
                </div>
                <div className="text-sm text-gray-600">Certificates Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {learningModules.filter(m => m.progress > 0).length * 2}h
                </div>
                <div className="text-sm text-gray-600">Learning Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            <TabsTrigger value="videos">Video Library</TabsTrigger>
            <TabsTrigger value="glossary">Glossary</TabsTrigger>
          </TabsList>

          {/* Learning Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                  <Card key={module.id} className={`relative ${module.isLocked ? 'opacity-60' : 'hover:shadow-lg transition-shadow'}`}>
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
                        <Button disabled className="w-full cursor-not-allowed">
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </Button>
                      ) : module.isCompleted ? (
                        <Button 
                          variant="outline" 
                          className="w-full cursor-pointer"
                          onClick={() => handleModuleClick(module.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      ) : module.progress > 0 ? (
                        <Button 
                          className="w-full cursor-pointer"
                          onClick={() => handleModuleClick(module.id)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      ) : (
                        <Button 
                          className="w-full cursor-pointer"
                          onClick={() => handleModuleClick(module.id)}
                        >
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
            {/* Video Library Header with Controls */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Educational Videos</h2>
                <p className="text-sm text-gray-600">Learn from expert insights and educational content</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshVideoLibrary}
                  disabled={isLoadingVideos}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingVideos ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Add New Video Section */}
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste a URL to add a new educational video..."
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addVideoFromUrl()}
                />
                <Button
                  onClick={addVideoFromUrl}
                  disabled={isAddingVideo || !newVideoUrl.trim()}
                  size="sm"
                >
                  {isAddingVideo ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </Card>

            {/* Video Grid */}
            {isLoadingVideos ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading videos...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoLibrary.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <VideoThumbnail
                      videoId={video.id}
                      title={video.title}
                      speaker={video.speaker}
                      duration={video.duration}
                      views={video.views}
                      thumbnail={video.thumbnail}
                      onPlay={() => handleVideoPlay(video)}
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-medium mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">by {video.speaker}</p>
                      <div className="flex justify-between gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {video.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {video.duration}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Video Player Modal */}
            <VideoPlayer
              videoId={selectedVideo?.id || ''}
              title={selectedVideo?.title || ''}
              isOpen={!!selectedVideo}
              onClose={closeVideoPlayer}
            />
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
        </Tabs>
      </div>
    </div>
  );
}
