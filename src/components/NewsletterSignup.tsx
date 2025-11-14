"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { hubSpotService, getUTMParameters, trackConversion, type LeadData } from "@/lib/hubspot";

interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [leadScore, setLeadScore] = useState(0);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !firstName) {
      setError("Please fill in all required fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Get UTM parameters for lead attribution
      const utmParams = getUTMParameters();

      // Prepare lead data for HubSpot
      const leadData: LeadData = {
        email,
        firstName,
        company: company || undefined,
        jobTitle: jobTitle || undefined,
        leadSource: 'newsletter',
        lifecycle_stage: 'subscriber',
        interests: ['fintech_insights', 'ai_trends', 'financial_automation'],
        ...utmParams
      };

      // Calculate initial lead score
      const activities = [{
        type: 'form_submit' as const,
        timestamp: new Date(),
        details: { form_type: 'newsletter_signup' },
        scoreValue: 5
      }];

      const calculatedScore = hubSpotService.calculateLeadScore(leadData, activities);
      leadData.leadScore = calculatedScore;
      setLeadScore(calculatedScore);

      // Create/update contact in HubSpot
      const hubspotResult = await hubSpotService.createOrUpdateContact(leadData);

      if (hubspotResult.success) {
        // Trigger automated email sequence
        await hubSpotService.triggerEmailSequence(leadData, calculatedScore);

        // Track event in HubSpot
        await hubSpotService.trackEvent(email, 'newsletter_signup', {
          lead_score: calculatedScore,
          company: company || 'unknown',
          job_title: jobTitle || 'unknown'
        });

        // Store email in localStorage for tracking
        localStorage.setItem('user-email', email);
        localStorage.setItem('lead-score', calculatedScore.toString());
      }

      // Analytics tracking for newsletter signup
      if (typeof window !== 'undefined') {
        // Google Analytics event
        if (window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: 'fintech_newsletter',
            value: calculatedScore,
            custom_map: {
              lead_score: calculatedScore,
              company_provided: company ? 'yes' : 'no',
              job_title_provided: jobTitle ? 'yes' : 'no'
            }
          });
        }

        // LinkedIn conversion tracking
        if (window.lintrk) {
          window.lintrk('track', {
            conversion_id: 'newsletter_signup',
            lead_score: calculatedScore
          });
        }

        // Facebook pixel event
        if (window.fbq) {
          window.fbq('track', 'Subscribe', {
            content_category: 'newsletter',
            content_type: 'fintech_insights',
            value: calculatedScore,
            currency: 'GBP'
          });
        }
      }

      // Track conversion for HubSpot integration
      trackConversion('newsletter_signup', calculatedScore, leadData);

      // Simulate API call (replace with actual newsletter service)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubscribed(true);
      setEmail("");
      setFirstName("");
      setCompany("");
      setJobTitle("");

    } catch (err) {
      console.error('Newsletter signup error:', err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className={`bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="relative mb-6">
            <CheckCircle className="w-16 h-16 text-teal-600 mx-auto" />
            {leadScore > 0 && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {leadScore} pts
              </div>
            )}
          </div>
          <h3 className="text-2xl font-semibold text-teal-800 mb-2">
            Welcome to the community!
          </h3>
          <p className="text-teal-700 mb-4">
            You've successfully subscribed to Isaac's fintech insights.
            Check your email for a welcome message with exclusive content.
          </p>
          {leadScore > 0 && (
            <div className="bg-white/60 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-teal-800 mb-2">Your Engagement Score</h4>
              <div className="flex items-center justify-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(leadScore, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-teal-600">{leadScore}/100</span>
              </div>
              <p className="text-xs text-teal-600 mt-2">
                Higher scores unlock premium content and priority support!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gradient-to-br from-white to-gray-50 shadow-xl border-2 border-teal-100 ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <Mail className="w-8 h-8 text-teal-600" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Get Fintech Insights
        </CardTitle>
        <CardDescription className="text-gray-600">
          Join 5,000+ financial leaders receiving weekly insights on AI trends,
          regulatory changes, and innovation strategies in fintech.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newsletter-firstName" className="flex items-center gap-2">
                First Name *
                <span className="text-xs text-gray-500">(for personalization)</span>
              </Label>
              <Input
                id="newsletter-firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newsletter-email" className="flex items-center gap-2">
                Business Email *
                <span className="text-xs text-gray-500">(for lead scoring)</span>
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                required
              />
            </div>

            {/* Enhanced fields for better lead qualification */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newsletter-company" className="text-sm">
                  Company
                  <span className="text-xs text-gray-500 ml-1">(+10 pts)</span>
                </Label>
                <Input
                  id="newsletter-company"
                  type="text"
                  placeholder="Your Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newsletter-jobTitle" className="text-sm">
                  Job Title
                  <span className="text-xs text-gray-500 ml-1">(+15 pts if executive)</span>
                </Label>
                <Input
                  id="newsletter-jobTitle"
                  type="text"
                  placeholder="CEO, CTO, etc."
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-sm"
                />
              </div>
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
            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing & Creating Lead Profile...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Subscribe & Get Lead Score
              </div>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Unsubscribe anytime. No spam, just valuable insights on AI and fintech innovation.
            By subscribing, you'll get a lead score based on your engagement!
          </p>

          {/* Newsletter value proposition with lead scoring info */}
          <div className="mt-6 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
            <h4 className="text-sm font-semibold text-teal-800 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              What you'll receive + Lead Scoring Benefits:
            </h4>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• Weekly AI & fintech trend analysis</li>
              <li>• Exclusive case studies and implementation guides</li>
              <li>• Early access to new research and whitepapers</li>
              <li>• Invitations to private webinars and events</li>
              <li className="font-semibold">• Personalized lead score for priority access</li>
              <li className="font-semibold">• Higher scores unlock premium content & consultation priority</li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Extend window type for analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    lintrk?: (type: string, params?: Record<string, unknown>) => void;
    fbq?: (type: string, event?: string, params?: Record<string, unknown>) => void;
  }
}
