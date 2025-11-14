// HubSpot CRM Integration Service
// This service handles automatic lead capture, scoring, and nurturing

export interface LeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
  phone?: string;
  website?: string;
  industry?: string;
  leadSource: 'newsletter' | 'download' | 'contact' | 'chat' | 'booking';
  leadScore?: number;
  lifecycle_stage?: 'subscriber' | 'lead' | 'marketing_qualified_lead' | 'sales_qualified_lead' | 'opportunity' | 'customer';
  interests?: string[];
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface ContactActivity {
  type: 'page_view' | 'download' | 'form_submit' | 'email_open' | 'email_click' | 'chat_message' | 'booking';
  timestamp: Date;
  details?: Record<string, unknown>;
  scoreValue?: number;
}

export interface LeadScoringRules {
  newsletter_signup: number;
  resource_download: number;
  contact_form: number;
  consultation_booking: number;
  page_view_services: number;
  page_view_portfolio: number;
  time_on_site_minutes: number;
  return_visitor: number;
  premium_resource_download: number;
  multiple_downloads: number;
  company_size_bonus: number;
  executive_title_bonus: number;
}

class HubSpotService {
  private readonly apiKey: string;
  private readonly portalId: string;
  private readonly baseUrl = 'https://api.hubapi.com';

  private readonly leadScoringRules: LeadScoringRules = {
    newsletter_signup: 5,
    resource_download: 15,
    contact_form: 25,
    consultation_booking: 50,
    page_view_services: 2,
    page_view_portfolio: 3,
    time_on_site_minutes: 1, // per minute
    return_visitor: 10,
    premium_resource_download: 25,
    multiple_downloads: 10,
    company_size_bonus: 15, // for enterprise companies
    executive_title_bonus: 20 // for C-level executives
  };

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_HUBSPOT_API_KEY || 'demo-key';
    this.portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || 'demo-portal';
  }

  // Create or update contact in HubSpot
  async createOrUpdateContact(leadData: LeadData): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      // For demo purposes, we'll simulate the API call
      if (this.apiKey === 'demo-key') {
        console.log('Demo Mode: Would create/update HubSpot contact:', leadData);
        return { success: true, contactId: `demo-contact-${Date.now()}` };
      }

      const contactProperties = this.mapLeadDataToHubSpotProperties(leadData);

      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: contactProperties,
        }),
      });

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, contactId: result.id };

    } catch (error) {
      console.error('HubSpot contact creation failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Calculate lead score based on activities and data
  calculateLeadScore(leadData: LeadData, activities: ContactActivity[]): number {
    let score = 0;

    // Base scoring from lead source
    switch (leadData.leadSource) {
      case 'newsletter':
        score += this.leadScoringRules.newsletter_signup;
        break;
      case 'download':
        score += this.leadScoringRules.resource_download;
        break;
      case 'contact':
        score += this.leadScoringRules.contact_form;
        break;
      case 'booking':
        score += this.leadScoringRules.consultation_booking;
        break;
    }

    // Activity-based scoring
    activities.forEach(activity => {
      if (activity.scoreValue) {
        score += activity.scoreValue;
      }
    });

    // Company and title bonuses
    if (this.isExecutiveTitle(leadData.jobTitle)) {
      score += this.leadScoringRules.executive_title_bonus;
    }

    if (this.isLargeCompany(leadData.company)) {
      score += this.leadScoringRules.company_size_bonus;
    }

    return Math.min(score, 100); // Cap at 100
  }

  // Trigger automated email sequence based on lead data and score
  async triggerEmailSequence(leadData: LeadData, leadScore: number): Promise<void> {
    try {
      const sequenceType = this.determineEmailSequence(leadData, leadScore);

      // For demo purposes, log the sequence
      if (this.apiKey === 'demo-key') {
        console.log(`Demo Mode: Would trigger email sequence "${sequenceType}" for ${leadData.email}`);
        return;
      }

      // Real implementation would call HubSpot workflows API
      await this.enrollInWorkflow(leadData.email, sequenceType);

    } catch (error) {
      console.error('Email sequence trigger failed:', error);
    }
  }

  // Create custom events for tracking
  async trackEvent(email: string, eventType: string, eventData?: Record<string, unknown>): Promise<void> {
    try {
      if (this.apiKey === 'demo-key') {
        console.log('Demo Mode: Would track event:', { email, eventType, eventData });
        return;
      }

      // Real implementation would use HubSpot Events API
      await fetch(`${this.baseUrl}/events/v3/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          eventName: eventType,
          properties: eventData,
        }),
      });

    } catch (error) {
      console.error('Event tracking failed:', error);
    }
  }

  // Private helper methods
  private mapLeadDataToHubSpotProperties(leadData: LeadData): Record<string, string> {
    return {
      email: leadData.email,
      firstname: leadData.firstName || '',
      lastname: leadData.lastName || '',
      company: leadData.company || '',
      jobtitle: leadData.jobTitle || '',
      phone: leadData.phone || '',
      website: leadData.website || '',
      industry: leadData.industry || '',
      lead_source: leadData.leadSource,
      lead_score: leadData.leadScore?.toString() || '0',
      lifecycle_stage: leadData.lifecycle_stage || 'subscriber',
      interests: leadData.interests?.join(';') || '',
      utm_source: leadData.utm_source || '',
      utm_medium: leadData.utm_medium || '',
      utm_campaign: leadData.utm_campaign || '',
    };
  }

  private isExecutiveTitle(title?: string): boolean {
    if (!title) return false;
    const executiveTitles = ['CEO', 'CTO', 'CFO', 'COO', 'CMO', 'Chief', 'President', 'VP', 'Vice President', 'Director'];
    return executiveTitles.some(exec => title.toUpperCase().includes(exec.toUpperCase()));
  }

  private isLargeCompany(company?: string): boolean {
    if (!company) return false;
    // Simple heuristic - could be enhanced with company data APIs
    const largeCompanyIndicators = ['Bank', 'Financial', 'Insurance', 'Capital', 'Investment', 'Group', 'Holdings', 'Corp', 'Inc', 'Ltd'];
    return largeCompanyIndicators.some(indicator => company.includes(indicator));
  }

  private determineEmailSequence(leadData: LeadData, leadScore: number): string {
    if (leadScore >= 75) {
      return 'high-value-prospect-sequence';
    } else if (leadScore >= 50) {
      return 'qualified-lead-sequence';
    } else if (leadData.leadSource === 'download') {
      return 'resource-download-nurture';
    } else if (leadData.leadSource === 'newsletter') {
      return 'newsletter-welcome-series';
    } else {
      return 'general-nurture-sequence';
    }
  }

  private async enrollInWorkflow(email: string, workflowType: string): Promise<void> {
    // Implementation would enroll contact in specific HubSpot workflow
    console.log(`Enrolling ${email} in workflow: ${workflowType}`);
  }
}

// Singleton instance
export const hubSpotService = new HubSpotService();

// Utility functions for lead tracking
export function getUTMParameters(): { utm_source?: string; utm_medium?: string; utm_campaign?: string } {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
  };
}

export function trackPageView(page: string): void {
  // Track page views for lead scoring
  const email = localStorage.getItem('user-email');
  if (email) {
    hubSpotService.trackEvent(email, 'page_view', { page, timestamp: new Date().toISOString() });
  }
}

export function getLeadScore(activities: ContactActivity[]): number {
  // Calculate current lead score based on activities
  return activities.reduce((score, activity) => score + (activity.scoreValue || 0), 0);
}

// Enhanced analytics integration for HubSpot
export function trackConversion(conversionType: string, value?: number, contactData?: Partial<LeadData>): void {
  // Enhanced conversion tracking
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'hubspot_integration',
        event_label: conversionType,
        value: value || 1,
        custom_map: {
          conversion_type: conversionType,
          lead_source: contactData?.leadSource || 'unknown'
        }
      });
    }

    // HubSpot tracking
    if (contactData?.email) {
      hubSpotService.trackEvent(contactData.email, `conversion_${conversionType}`, {
        value: value || 1,
        timestamp: new Date().toISOString(),
        ...contactData
      });
    }
  }
}
