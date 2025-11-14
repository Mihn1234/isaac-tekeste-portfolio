"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Globe, Check, ChevronDown } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    region: "UK"
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    region: "ES"
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    region: "FR"
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    region: "DE"
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    region: "IT"
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    region: "PT"
  }
];

// Translation context and hook
interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.blog": "Blog",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.resources": "Resources",

    // Hero Section
    "hero.title": "Isaac Tekeste",
    "hero.subtitle": "AI & Fintech Innovation Consultant",
    "hero.description": "Transforming financial services through artificial intelligence and automation",

    // About Section
    "about.title": "Who Is Isaac Tekeste",
    "about.description": "Isaac is a seasoned business investor and consultant, specializing in AI and automation in finance, with a focus on banking, mortgages, insurance, and lending.",
    "about.description2": "He helps institutions harness agentic AI, AI voice agents, and automation to streamline underwriting, compliance, risk management, and customer engagement.",

    // Services
    "services.title": "What I do",
    "services.ai_transformation": "AI-Powered Financial Transformation",
    "services.strategic_advisory": "Strategic Investment & Advisory",
    "services.voice_agents": "Voice Agents & Conversational AI",
    "services.fintech_institutions": "Fintech for Financial Institutions",

    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.description": "Showcasing successful AI and fintech implementations across various financial institutions",

    // Blog
    "blog.title": "Latest Insights",
    "blog.description": "Thought leadership on AI trends, fintech innovation, and the future of financial services",
    "blog.read_more": "Read More",

    // Testimonials
    "testimonials.title": "Client Success Stories",
    "testimonials.description": "Hear from financial leaders who have transformed their operations with AI solutions",

    // Contact
    "contact.title": "Contact Me",
    "contact.description": "Ready to transform your financial services with AI? Let's connect and explore the possibilities.",
    "contact.form.title": "Get In Touch",
    "contact.form.description": "Send me a message and I'll get back to you within 24 hours.",
    "contact.form.first_name": "First Name",
    "contact.form.last_name": "Last Name",
    "contact.form.email": "Email",
    "contact.form.company": "Company",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.follow": "Follow Me",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.download": "Download",
    "common.subscribe": "Subscribe",
    "common.learn_more": "Learn More"
  },
  es: {
    // Navigation
    "nav.about": "Acerca de",
    "nav.services": "Servicios",
    "nav.portfolio": "Portafolio",
    "nav.blog": "Blog",
    "nav.testimonials": "Testimonios",
    "nav.contact": "Contacto",
    "nav.resources": "Recursos",

    // Hero Section
    "hero.title": "Isaac Tekeste",
    "hero.subtitle": "Consultor de Innovación en IA y Fintech",
    "hero.description": "Transformando servicios financieros a través de inteligencia artificial y automatización",

    // About Section
    "about.title": "Quién es Isaac Tekeste",
    "about.description": "Isaac es un experimentado inversor empresarial y consultor, especializado en IA y automatización en finanzas, con enfoque en banca, hipotecas, seguros y préstamos.",
    "about.description2": "Ayuda a las instituciones a aprovechar la IA agéntica, agentes de voz de IA y automatización para optimizar suscripción, cumplimiento, gestión de riesgos y compromiso del cliente.",

    // Services
    "services.title": "Lo que hago",
    "services.ai_transformation": "Transformación Financiera Impulsada por IA",
    "services.strategic_advisory": "Asesoría e Inversión Estratégica",
    "services.voice_agents": "Agentes de Voz e IA Conversacional",
    "services.fintech_institutions": "Fintech para Instituciones Financieras",

    // Portfolio
    "portfolio.title": "Portafolio",
    "portfolio.description": "Mostrando implementaciones exitosas de IA y fintech en varias instituciones financieras",

    // Blog
    "blog.title": "Perspectivas Recientes",
    "blog.description": "Liderazgo de pensamiento en tendencias de IA, innovación fintech y el futuro de los servicios financieros",
    "blog.read_more": "Leer Más",

    // Testimonials
    "testimonials.title": "Historias de Éxito de Clientes",
    "testimonials.description": "Escucha a líderes financieros que han transformado sus operaciones con soluciones de IA",

    // Contact
    "contact.title": "Contáctame",
    "contact.description": "¿Listo para transformar tus servicios financieros con IA? Conectemos y exploremos las posibilidades.",
    "contact.form.title": "Ponte en Contacto",
    "contact.form.description": "Envíame un mensaje y te responderé dentro de 24 horas.",
    "contact.form.first_name": "Nombre",
    "contact.form.last_name": "Apellido",
    "contact.form.email": "Email",
    "contact.form.company": "Empresa",
    "contact.form.message": "Mensaje",
    "contact.form.send": "Enviar Mensaje",
    "contact.email": "Email",
    "contact.location": "Ubicación",
    "contact.follow": "Sígueme",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.download": "Descargar",
    "common.subscribe": "Suscribirse",
    "common.learn_more": "Saber Más"
  },
  fr: {
    // Navigation
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.blog": "Blog",
    "nav.testimonials": "Témoignages",
    "nav.contact": "Contact",
    "nav.resources": "Ressources",

    // Hero Section
    "hero.title": "Isaac Tekeste",
    "hero.subtitle": "Consultant en Innovation IA et Fintech",
    "hero.description": "Transformer les services financiers grâce à l'intelligence artificielle et l'automatisation",

    // About Section
    "about.title": "Qui est Isaac Tekeste",
    "about.description": "Isaac est un investisseur commercial expérimenté et consultant, spécialisé dans l'IA et l'automatisation en finance, avec un focus sur la banque, les hypothèques, l'assurance et les prêts.",
    "about.description2": "Il aide les institutions à exploiter l'IA agentique, les agents vocaux IA et l'automatisation pour rationaliser la souscription, la conformité, la gestion des risques et l'engagement client.",

    // Services
    "services.title": "Ce que je fais",
    "services.ai_transformation": "Transformation Financière Alimentée par l'IA",
    "services.strategic_advisory": "Conseil et Investissement Stratégique",
    "services.voice_agents": "Agents Vocaux et IA Conversationnelle",
    "services.fintech_institutions": "Fintech pour Institutions Financières",

    // Contact
    "contact.title": "Me Contacter",
    "contact.description": "Prêt à transformer vos services financiers avec l'IA ? Connectons-nous et explorons les possibilités.",
    "contact.form.title": "Entrer en Contact",
    "contact.form.description": "Envoyez-moi un message et je vous répondrai dans les 24 heures.",
    "contact.form.first_name": "Prénom",
    "contact.form.last_name": "Nom",
    "contact.form.email": "Email",
    "contact.form.company": "Entreprise",
    "contact.form.message": "Message",
    "contact.form.send": "Envoyer le Message",
    "contact.email": "Email",
    "contact.location": "Localisation",
    "contact.follow": "Suivez-moi",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.download": "Télécharger",
    "common.subscribe": "S'abonner",
    "common.learn_more": "En Savoir Plus"
  }
};

// Translation hook
export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Get language from localStorage or browser
    const savedLang = localStorage.getItem("preferred-language");
    const browserLang = navigator.language.split("-")[0];

    if (savedLang && languages.find(l => l.code === savedLang)) {
      setCurrentLanguage(savedLang);
    } else if (languages.find(l => l.code === browserLang)) {
      setCurrentLanguage(browserLang);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("preferred-language", lang);

    // Analytics tracking
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'language_change', {
          event_category: 'localization',
          event_label: lang,
          value: 1
        });
      }
    }
  };

  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return { currentLanguage, setLanguage, t };
}

interface LanguageSwitcherProps {
  className?: string;
  variant?: "default" | "compact";
}

export function LanguageSwitcher({ className, variant = "default" }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage } = useTranslation();
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={`gap-2 ${className}`}>
            <span className="text-lg">{currentLang.flag}</span>
            <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLanguage(language.code)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="w-4 h-4 text-teal-600" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`gap-2 ${className}`}>
          <Globe className="w-4 h-4" />
          <span className="text-lg">{currentLang.flag}</span>
          <span className="font-medium">{currentLang.name}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Choose Language</h4>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLanguage(language.code)}
              className="flex items-center justify-between p-3 cursor-pointer rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{language.flag}</span>
                <div>
                  <div className="text-sm font-medium">{language.name}</div>
                  <div className="text-xs text-gray-500">{language.nativeName}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {language.region}
                </Badge>
                {currentLanguage === language.code && (
                  <Check className="w-4 h-4 text-teal-600" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Language-aware text component
interface TranslatedTextProps {
  translationKey: string;
  fallback?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function TranslatedText({
  translationKey,
  fallback,
  className,
  as: Component = "span"
}: TranslatedTextProps) {
  const { t } = useTranslation();
  const text = t(translationKey) || fallback || translationKey;

  return (
    <Component className={className}>
      {text}
    </Component>
  );
}
