"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Star, Quote, ArrowRight, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { DownloadableResources } from "@/components/DownloadableResources"
import { LiveChatCalendly } from "@/components/LiveChatCalendly"
import { LanguageSwitcher, useTranslation, TranslatedText } from "@/components/LanguageSwitcher"

export default function Home() {
  const blogPosts = [
    {
      title: "The Future of Agentic AI in Banking",
      excerpt: "How autonomous AI agents are transforming customer service and operational efficiency in financial institutions.",
      date: "15 Jan 2024",
      readTime: "5 min read",
      category: "AI Innovation",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Voice Agents: Revolutionizing Insurance Claims",
      excerpt: "Exploring how conversational AI is streamlining the claims process and improving customer satisfaction.",
      date: "10 Jan 2024",
      readTime: "7 min read",
      category: "Voice Technology",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Risk Management in the Age of AI",
      excerpt: "Best practices for implementing AI-driven risk assessment while maintaining regulatory compliance.",
      date: "5 Jan 2024",
      readTime: "6 min read",
      category: "Risk Management",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Chief Technology Officer",
      company: "Meridian Bank",
      content: "Isaac's expertise in AI automation transformed our mortgage approval process. We've seen a 40% reduction in processing time and significantly improved customer satisfaction.",
      rating: 5,
      image: "https://www.shutterstock.com/image-photo/happy-middle-aged-business-woman-600nw-2424450089.jpg"
    },
    {
      name: "David Chen",
      role: "Head of Innovation",
      company: "InsureTech Solutions",
      content: "Working with Isaac on our voice agent implementation was game-changing. His deep understanding of both AI technology and financial services is unmatched.",
      rating: 5,
      image: "https://imageio.forbes.com/specials-images/imageserve/5f0cd14d147a4f0007fb1abd/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
    },
    {
      name: "Emma Rodriguez",
      role: "CEO",
      company: "Future Finance Group",
      content: "Isaac's strategic guidance helped us successfully integrate agentic AI into our compliance workflows. The ROI has exceeded all expectations.",
      rating: 5,
      image: "https://media.istockphoto.com/id/2103894533/photo/business-people-in-the-office.jpg?s=612x612&w=0&k=20&c=DrnqkuBHgk3_YicnJJwm45HopK626ZqWAmlgUpXaBRc="
    }
  ];

  const portfolioItems = [
    {
      title: "AI-Powered Mortgage Platform",
      description: "End-to-end automation of mortgage underwriting process",
      category: "Banking",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      results: "65% faster processing, 30% cost reduction"
    },
    {
      title: "Conversational Insurance Assistant",
      description: "24/7 AI voice agent for policy inquiries and claims",
      category: "Insurance",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      results: "85% customer satisfaction, 50% reduced call volume"
    },
    {
      title: "Compliance Automation Suite",
      description: "AI-driven regulatory compliance and reporting system",
      category: "RegTech",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      results: "90% accuracy improvement, 70% time savings"
    },
    {
      title: "Credit Risk Assessment AI",
      description: "Machine learning models for enhanced risk evaluation",
      category: "Risk Management",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      results: "25% better prediction accuracy, 40% faster decisions"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-2 rounded-lg shadow-lg">
              <span className="text-xl font-bold tracking-wide">IT</span>
            </div>
            <div className="text-xl font-bold text-gray-800 tracking-wide">
              Isaac <span className="text-teal-600">Tekeste</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-gray-600">
            <a href="#about" className="hover:text-teal-600 transition-colors">
              <TranslatedText translationKey="nav.about" fallback="About" />
            </a>
            <a href="#services" className="hover:text-teal-600 transition-colors">
              <TranslatedText translationKey="nav.services" fallback="Services" />
            </a>
            <a href="#portfolio" className="hover:text-teal-600 transition-colors">
              <TranslatedText translationKey="nav.portfolio" fallback="Portfolio" />
            </a>
            <a href="#blog" className="hover:text-teal-600 transition-colors">
              <TranslatedText translationKey="nav.blog" fallback="Blog" />
            </a>
            <a href="#testimonials" className="hover:text-teal-600 transition-colors">
              <TranslatedText translationKey="nav.testimonials" fallback="Testimonials" />
            </a>
            <a href="#resources" className="hover:text-teal-600 transition-colors">
              <TranslatedText translationKey="nav.resources" fallback="Resources" />
            </a>
            <a href="#contact" className="hover:text-teal-600 transition-colors">
              <TranslatedText translationKey="nav.contact" fallback="Contact" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="compact" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with financial data overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage: `url('https://ext.same-assets.com/1982082812/3077072916.jpeg')`,
            }}
          />
          {/* Financial data overlay pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="20" font-family="monospace" font-size="3" fill="%2314b8a6">1.7865</text><text y="35" font-family="monospace" font-size="3" fill="%2314b8a6">2.9410</text><text y="50" font-family="monospace" font-size="3" fill="%2306b6d4">0.7318</text><text y="65" font-family="monospace" font-size="3" fill="%2314b8a6">1.2547</text><text y="80" font-family="monospace" font-size="3" fill="%2306b6d4">3.8291</text></svg>')`,
              backgroundSize: '200px 200px',
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 via-teal-800/75 to-blue-900/80"></div>
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-wider mb-6">
              <TranslatedText translationKey="hero.title" fallback="Isaac Tekeste" />
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl font-light opacity-90 leading-relaxed">
              <TranslatedText translationKey="hero.subtitle" fallback="AI & Fintech Innovation Consultant" />
            </p>
            <p className="text-lg opacity-75 mt-4 max-w-2xl mx-auto">
              <TranslatedText translationKey="hero.description" fallback="Transforming financial services through artificial intelligence and automation" />
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                <img
                  src="https://ext.same-assets.com/1982082812/1667391984.jpeg"
                  alt="Isaac Tekeste"
                  className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-light text-teal-600 mb-8 leading-tight">
                <TranslatedText translationKey="about.title" fallback="Who Is Isaac Tekeste" />
              </h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  <TranslatedText translationKey="about.description" fallback="Isaac is a seasoned business investor and consultant, specializing in AI and automation in finance, with a focus on banking, mortgages, insurance, and lending." />
                </p>
                <p>
                  <TranslatedText translationKey="about.description2" fallback="He helps institutions harness agentic AI, AI voice agents, and automation to streamline underwriting, compliance, risk management, and customer engagement." />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* What I Do Section */}
      <section id="services" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-light text-teal-600 mb-4">
              <TranslatedText translationKey="services.title" fallback="What I do" />
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                titleKey: "services.ai_transformation",
                title: "AI-Powered Financial Transformation",
                description: "Elevate mortgage approvals, credit scoring, and underwriting with AI systems that reduce fraud, speed decisions, and boost compliance efficiency."
              },
              {
                image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                titleKey: "services.strategic_advisory",
                title: "Strategic Investment & Advisory",
                description: "Deploy 24/7 intelligent voice assistants for financial advisers, brokers, and insurers automating client onboarding, policy explanations, compliance logging, and lead qualification."
              },
              {
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                titleKey: "services.voice_agents",
                title: "Voice Agents & Conversational AI",
                description: "Invest and advise across fintech, AI-in-finance, and digital services driving ROI through automation, business model optimization, and operational scaling."
              },
              {
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
                titleKey: "services.fintech_institutions",
                title: "Fintech for Financial Institutions",
                description: "Partner with banks, mortgage lenders, insurance firms, and credit providers to design and implement scalable fintech solutions that transforms and aligns with real business outcomes."
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 pb-2">
                    <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                      <TranslatedText translationKey={service.titleKey} fallback={service.title} />
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="portfolio" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-light text-teal-600 mb-4">
              <TranslatedText translationKey="portfolio.title" fallback="Portfolio" />
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              <TranslatedText translationKey="portfolio.description" fallback="Showcasing successful AI and fintech implementations across various financial institutions" />
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="banking">Banking</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="regtech">RegTech</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {portfolioItems.map((item, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-teal-600">
                        {item.results}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Downloadable Resources Section */}
      <section id="resources">
        <DownloadableResources />
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-light text-teal-600 mb-4">
              <TranslatedText translationKey="blog.title" fallback="Latest Insights" />
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              <TranslatedText translationKey="blog.description" fallback="Thought leadership on AI trends, fintech innovation, and the future of financial services" />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700 p-0">
                    <TranslatedText translationKey="blog.read_more" fallback="Read More" />
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-light text-teal-600 mb-4">
              <TranslatedText translationKey="testimonials.title" fallback="Client Success Stories" />
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              <TranslatedText translationKey="testimonials.description" fallback="Hear from financial leaders who have transformed their operations with AI solutions" />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-600 mb-4" />
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm font-medium text-teal-600">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Isaac Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light text-teal-600 mb-16 text-center">
            Why Work With Isaac
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "Proven expertise:",
                  description: "Recognized voice on AI trends in UK financial services, publishing on AI's role in banking, insurance, and the financial sector"
                },
                {
                  title: "Hands-on investor:",
                  description: "Active angel investor and consultant, connecting capital with growth-stage fintech and AI ventures."
                },
                {
                  title: "Clear communicator:",
                  description: "Regularly share thought leadership on complex AI topics like agentic AI transforming finance into actionable strategies"
                }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-teal-500 rounded-full mt-3 group-hover:scale-150 transition-transform"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-teal-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl opacity-20 blur-xl"></div>
              <img
                src="https://ext.same-assets.com/1982082812/3064916297.jpeg"
                alt="Isaac Tekeste"
                className="relative w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                title: "AI Strategy & Implementation",
                description: "Tailored roadmaps for AI adoption in underwriting, fraud detection, and risk management."
              },
              {
                image: "https://ext.same-assets.com/1982082812/3077072916.jpeg",
                title: "Keynote Speaking",
                description: "Presentations on AI trends, agentic systems, financial technology, and digital innovation."
              },
              {
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                title: "Fintech Solutions",
                description: "Implement scalable fintech solutions from AI-powered workflows to embedded finance strategy"
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 pb-2">
                    <CardTitle className="text-xl font-semibold text-teal-600 group-hover:text-teal-700 transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-teal-600 to-cyan-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-light text-white mb-4">
              <TranslatedText translationKey="contact.title" fallback="Contact Me" />
            </h2>
            <div className="h-1 w-24 bg-white/30 mx-auto rounded-full mb-8"></div>
            <p className="text-teal-100 text-lg mb-12 max-w-2xl mx-auto">
              <TranslatedText translationKey="contact.description" fallback="Ready to transform your financial services with AI? Let's connect and explore the possibilities." />
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  <TranslatedText translationKey="contact.form.title" fallback="Get In Touch" />
                </CardTitle>
                <CardDescription className="text-teal-100">
                  <TranslatedText translationKey="contact.form.description" fallback="Send me a message and I'll get back to you within 24 hours." />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      <TranslatedText translationKey="contact.form.first_name" fallback="First Name" />
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      <TranslatedText translationKey="contact.form.last_name" fallback="Last Name" />
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    <TranslatedText translationKey="contact.form.email" fallback="Email" />
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@company.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    <TranslatedText translationKey="contact.form.company" fallback="Company" />
                  </Label>
                  <Input
                    id="company"
                    placeholder="Your Company"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    <TranslatedText translationKey="contact.form.message" fallback="Message" />
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your AI and fintech needs..."
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <Button className="w-full bg-white text-teal-600 hover:bg-white/90">
                  <TranslatedText translationKey="contact.form.send" fallback="Send Message" />
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      <TranslatedText translationKey="contact.email" fallback="Email" />
                    </div>
                    <div className="text-teal-100">isaac@isaactekeste.co.uk</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      <TranslatedText translationKey="contact.location" fallback="Location" />
                    </div>
                    <div className="text-teal-100">United Kingdom</div>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div>
                <h3 className="text-white font-semibold mb-4">
                  <TranslatedText translationKey="contact.follow" fallback="Follow Me" />
                </h3>
                <div className="flex space-x-4">
                  {[
                    {
                      href: "https://www.tiktok.com/@isaactekeste7",
                      src: "https://ext.same-assets.com/1982082812/775053127.png",
                      alt: "TikTok"
                    },
                    {
                      href: "https://www.instagram.com/isaac.tekeste/",
                      src: "https://ext.same-assets.com/1982082812/1492812477.png",
                      alt: "Instagram"
                    },
                    {
                      href: "https://www.linkedin.com/in/isaactekeste/",
                      src: "https://ext.same-assets.com/1982082812/3959015307.png",
                      alt: "LinkedIn"
                    }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <div className="absolute -inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                      <img
                        src={social.src}
                        alt={social.alt}
                        className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Widget */}
      <LiveChatCalendly />
    </div>
  )
}
