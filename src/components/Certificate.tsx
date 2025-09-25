import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Download,
  X,
  CheckCircle,
  Star,
  Calendar,
  User,
  GraduationCap
} from "lucide-react";

interface CertificateProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  moduleName: string;
  completionDate: string;
  score?: number;
  duration?: string;
}

export function Certificate({
  isOpen,
  onClose,
  studentName = "Bond Investor",
  moduleName,
  completionDate,
  score = 100,
  duration = "45 minutes"
}: CertificateProps) {
  const handleDownload = () => {
    // Create a simple download functionality
    const element = document.getElementById('certificate-content');
    if (element) {
      // In a real app, you might use html2canvas or similar library
      window.print();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bond Learning Certificate',
        text: `I just completed "${moduleName}" and earned a certificate!`,
        url: window.location.href
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900">Certificate of Completion</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Certificate Content */}
        <div className="p-6">
          <div 
            id="certificate-content"
            className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-8 border-double border-yellow-400 rounded-lg p-8 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 opacity-10">
              <Star className="h-12 w-12 text-yellow-500" />
            </div>
            <div className="absolute top-4 right-4 opacity-10">
              <Star className="h-12 w-12 text-yellow-500" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-10">
              <GraduationCap className="h-12 w-12 text-blue-500" />
            </div>
            <div className="absolute bottom-4 right-4 opacity-10">
              <GraduationCap className="h-12 w-12 text-blue-500" />
            </div>

            {/* Certificate Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Certificate of Achievement
              </h1>
              
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Certificate Body */}
            <div className="text-center space-y-6 mb-8">
              <p className="text-lg text-gray-600">
                This certifies that
              </p>
              
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 inline-block">
                <h2 className="text-3xl font-bold text-blue-600 mb-1">
                  {studentName}
                </h2>
                <div className="flex items-center justify-center gap-1">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Certified Bond Learner</span>
                </div>
              </div>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                has successfully completed the comprehensive course
              </p>

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {moduleName}
                </h3>
                <p className="text-gray-600">
                  A comprehensive learning module covering bond fundamentals, investment strategies, and market analysis
                </p>
              </div>

              <p className="text-gray-600">
                and has demonstrated proficiency in bond investment principles
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-white/80 border-green-200">
                <CardContent className="pt-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{score}%</div>
                  <div className="text-sm text-gray-600">Completion Score</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-blue-200">
                <CardContent className="pt-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{duration}</div>
                  <div className="text-sm text-gray-600">Time Invested</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-purple-200">
                <CardContent className="pt-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">5/5</div>
                  <div className="text-sm text-gray-600">Modules Completed</div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Earned */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Skills & Knowledge Acquired
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Bond Fundamentals
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Risk Assessment
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Investment Analysis
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Market Understanding
                </Badge>
                <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                  Portfolio Management
                </Badge>
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 font-medium">
                    Date of Completion
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(completionDate)}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 font-medium">
                    Certificate ID
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    BOND-{new Date(completionDate).getFullYear()}-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full inline-block">
                  <p className="text-sm font-medium">Bonds Learning Platform</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This certificate validates the completion of structured bond investment education
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Certificate
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Share Achievement
            </Button>
          </div>

          {/* Congratulations Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-green-800">Congratulations!</h4>
                <p className="text-sm text-green-700">
                  You've successfully completed the bond learning module. You're now ready to start your bond investment journey!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
