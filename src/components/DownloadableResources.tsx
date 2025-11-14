"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Users, TrendingUp, Shield, Zap, CheckCircle, AlertCircle, Sparkles, Crown } from "lucide-react";
import { hubSpotService, getUTMParameters, trackConversion, type LeadData } from "@/lib/hubspot";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "whitepaper" | "case-study" | "guide" | "report";
  downloadCount: number;
  category: string;
  icon: React.ReactNode;
  fileSize: string;
  pages: number;
  featured?: boolean;
  premium?: boolean;
  leadScoreRequired?: number;
}

const resources: Resource[] = [
  {
    id: "ai-banking-transformation-2024",
    title: "AI Banking Transformation Guide 2024",
    description: "Comprehensive guide to implementing AI solutions in traditional banking operations, featuring 12 real-world case studies and ROI calculations.",
    type: "whitepaper",
    downloadCount: 2847,
    category: "AI Implementation",
    icon: <TrendingUp className="w-6 h-6" />,
    fileSize: "2.8 MB",
    pages: 45,
    featured: true,
    leadScoreRequired: 0
  },
  {
    id: "voice-agents-insurance-playbook",
    title: "Voice Agents in Insurance: Complete Playbook",
    description: "Step-by-step implementation guide for deploying conversational AI in insurance operations, with compliance frameworks and best practices.",
    type: "guide",
    downloadCount: 1923,
    category: "Voice Technology",
    icon: <Users className="w-6 h-6" />,
    fileSize: "1.9 MB",
    pages: 32,
    leadScoreRequired: 15
  },
  {
    id: "fintech-risk-management-ai",
    title: "AI-Driven Risk Management Framework",
    description: "Advanced strategies for implementing AI in financial risk assessment, featuring regulatory compliance guidelines and implementation roadmaps.",
    type: "report",
    downloadCount: 1654,
    category: "Risk Management",
    icon: <Shield className="w-6 h-6" />,
    fileSize: "3.2 MB",
    pages: 38,
    premium: true,
    leadScoreRequired: 25
  },
  {
    id: "mortgage-automation-case-study",
    title: "Mortgage Automation Success Story",
    description: "Detailed case study of how a major UK bank reduced mortgage processing time by 65% using AI automation, including implementation timeline and costs.",
    type: "case-study",
    downloadCount: 2156,
    category: "Banking",
    icon: <Zap className="w-6 h-6" />,
    fileSize: "1.4 MB",
    pages: 24,
    featured: true,
    premium: true,
    leadScoreRequired: 35
  }
];

interface DownloadFormProps {
  resource: Resource;
  onClose: () => void;
}

function DownloadForm({ resource, onClose }: DownloadFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    industry: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [error, setError] = useState("");
  const [leadScore, setLeadScore] = useState(0);
  const [currentUserScore, setCurrentUserScore] = useState(0);

  // Check user's current lead score
  const checkCurrentLeadScore = () => {
    const storedScore = localStorage.getItem('lead-score');
    return storedScore ? parseInt(storedScore) : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      setError("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    const userCurrentScore = checkCurrentLeadScore();
    setCurrentUserScore(userCurrentScore);

    // Check if user meets lead score requirement for premium resources
    if (resource.leadScoreRequired && resource.leadScoreRequired > userCurrentScore) {
      setError(`This premium resource requires a lead score of ${resource.leadScoreRequired}. Your current score is ${userCurrentScore}. Try engaging more with our content!`);
      return;
    }

    setIsLoading(true);

    try {
      // Get UTM parameters for lead attribution
      const utmParams = getUTMParameters();

      // Prepare lead data for HubSpot
      const leadData: LeadData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        jobTitle: formData.jobTitle || undefined,
        industry: formData.industry || undefined,
        leadSource: 'download',
        lifecycle_stage: 'lead',
        interests: [resource.category.toLowerCase(), resource.type, 'ai_implementation'],
        ...utmParams
      };

      // Calculate lead score boost for download
      const activities = [
        {
          type: 'form_submit' as const,
          timestamp: new Date(),
          details: {
            form_type: 'resource_download',
            resource_id: resource.id,
            resource_type: resource.type,
            resource_category: resource.category
          },
          scoreValue: resource.premium ? 25 : 15
        }
      ];

      const calculatedScore = hubSpotService.calculateLeadScore(leadData, activities);
      const totalScore = userCurrentScore + calculatedScore;
      leadData.leadScore = totalScore;
      setLeadScore(calculatedScore);

      // Create/update contact in HubSpot
      const hubspotResult = await hubSpotService.createOrUpdateContact(leadData);

      if (hubspotResult.success) {
        // Trigger automated email sequence
        await hubSpotService.triggerEmailSequence(leadData, totalScore);

        // Track download event in HubSpot
        await hubSpotService.trackEvent(formData.email, 'resource_download', {
          resource_id: resource.id,
          resource_title: resource.title,
          resource_type: resource.type,
          resource_category: resource.category,
          lead_score_boost: calculatedScore,
          total_lead_score: totalScore,
          is_premium: resource.premium || false
        });

        // Update stored lead score
        localStorage.setItem('user-email', formData.email);
        localStorage.setItem('lead-score', totalScore.toString());
      }

      // Analytics tracking for resource download
      if (typeof window !== 'undefined') {
        // Google Analytics event
        if (window.gtag) {
          window.gtag('event', 'resource_download', {
            event_category: 'lead_generation',
            event_label: resource.id,
            resource_type: resource.type,
            resource_category: resource.category,
            value: calculatedScore,
            custom_map: {
              lead_score_boost: calculatedScore,
              total_score: totalScore,
              is_premium: resource.premium || false
            }
          });
        }

        // LinkedIn conversion tracking
        if (window.lintrk) {
          window.lintrk('track', {
            conversion_id: 'resource_download',
            resource_id: resource.id,
            lead_score: totalScore
          });
        }

        // Facebook pixel event
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_category: 'gated_content',
            content_type: resource.type,
            content_name: resource.title,
            value: calculatedScore,
            currency: 'GBP'
          });
        }
      }

      // Track conversion for HubSpot integration
      trackConversion('resource_download', calculatedScore, leadData);

      // Simulate API call for lead capture and resource generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsDownloaded(true);

      // Simulate file download
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = `#${resource.id}-download`; // This would be actual PDF URL
        link.download = `${resource.title.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1000);

    } catch (err) {
      console.error('Resource download error:', err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isDownloaded) {
    return (
      <div className="text-center p-6">
        <div className="relative mb-6">
          <CheckCircle className="w-16 h-16 text-teal-600 mx-auto" />
          {leadScore > 0 && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              +{leadScore} pts
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Download Started!
        </h3>
        <p className="text-gray-600 mb-4">
          Your download should begin shortly. We've also sent a copy to your email.
        </p>
        {leadScore > 0 && (
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-teal-800 mb-2">Lead Score Updated!</h4>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-600">Previous: {currentUserScore}</span>
              <span className="text-lg">→</span>
              <span className="text-sm font-bold text-teal-600">New: {currentUserScore + leadScore}</span>
            </div>
            <p className="text-xs text-teal-600 mt-2">
              Keep engaging to unlock more premium content!
            </p>
          </div>
        )}
        <Button onClick={onClose} className="bg-teal-600 hover:bg-teal-700">
          Continue Browsing
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            placeholder="John"
            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            placeholder="Doe"
            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Business Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="john.doe@company.com"
          className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company *</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          placeholder="Your Company"
          className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-sm">
            Job Title
            <span className="text-xs text-gray-500 ml-1">(+20 pts if executive)</span>
          </Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
            placeholder="CEO, CTO, etc."
            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm">
            Industry
            <span className="text-xs text-gray-500 ml-1">(for personalization)</span>
          </Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
            placeholder="Banking, Insurance, etc."
            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing & Updating Lead Score...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download & Get +{resource.premium ? '25' : '15'} Points
          </div>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By downloading, you agree to receive relevant updates from Isaac Tekeste.
        Downloads boost your lead score for priority access to premium content.
      </p>
    </form>
  );
}

export function DownloadableResources() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [userLeadScore, setUserLeadScore] = useState(0);

  // Get user's current lead score on component mount
  useEffect(() => {
    const storedScore = localStorage.getItem('lead-score');
    setUserLeadScore(storedScore ? parseInt(storedScore) : 0);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-light text-teal-600 mb-4">
            Expert Resources
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Download exclusive insights, implementation guides, and case studies
            to accelerate your AI and fintech transformation journey.
          </p>

          {/* Lead Score Display */}
          {userLeadScore > 0 && (
            <div className="max-w-md mx-auto bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-200 mb-8">
              <h3 className="text-sm font-semibold text-teal-800 mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Your Lead Score
              </h3>
              <div className="flex items-center justify-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(userLeadScore, 100)}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-teal-600">{userLeadScore}/100</span>
              </div>
              <p className="text-xs text-teal-600 mt-2">
                Higher scores unlock premium resources and priority consultation access!
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource) => {
            const canAccess = !resource.leadScoreRequired || userLeadScore >= resource.leadScoreRequired;

            return (
              <Card
                key={resource.id}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 relative ${
                  resource.featured ? 'ring-2 ring-teal-500 ring-opacity-50' : ''
                } ${!canAccess ? 'opacity-75' : ''}`}
              >
                {resource.featured && (
                  <Badge className="absolute -top-3 left-6 bg-teal-600 text-white px-3 py-1">
                    Featured
                  </Badge>
                )}

                {resource.premium && (
                  <Badge className="absolute -top-3 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      resource.featured ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                        {resource.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                          {resource.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{resource.type}</span>
                        {resource.leadScoreRequired && (
                          <Badge
                            variant={canAccess ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {resource.leadScoreRequired} pts required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>{resource.pages} pages</span>
                    <span>{resource.fileSize}</span>
                    <span>{resource.downloadCount.toLocaleString()} downloads</span>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className={`w-full ${
                          canAccess
                            ? 'bg-teal-600 hover:bg-teal-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={() => setSelectedResource(resource)}
                        disabled={!canAccess}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {canAccess ? 'Free Download' : `Need ${resource.leadScoreRequired} Points`}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-teal-600" />
                          Download Resource
                          {resource.premium && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white flex items-center gap-1">
                              <Crown className="w-3 h-3" />
                              Premium
                            </Badge>
                          )}
                        </DialogTitle>
                        <DialogDescription>
                          Get instant access to "{resource.title}" and boost your lead score by {resource.premium ? '25' : '15'} points.
                        </DialogDescription>
                      </DialogHeader>
                      {selectedResource && (
                        <DownloadForm
                          resource={selectedResource}
                          onClose={() => setSelectedResource(null)}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action for custom resources */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Crown className="w-6 h-6" />
                Need Custom Research?
              </h3>
              <p className="mb-6 opacity-90">
                Looking for industry-specific insights or custom analysis?
                I create bespoke research reports for enterprise clients with lead scores of 75+.
              </p>
              <Button variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
                Request Custom Research
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
