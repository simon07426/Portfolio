import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import ProjectDetail, { projectsDataBase } from './ProjectDetail.jsx';

// Mapujeme projectsDataBase na jednoduchší formát pre zobrazenie v zozname
const projectsData = projectsDataBase;

// Funkcia na získanie projektov s prekladmi
const getProjects = (language) => {
  return projectsData.map(p => ({
    id: p.id,
    title: typeof p.title === 'object' ? p.title[language] : p.title,
    description: typeof p.description === 'object' ? p.description[language] : p.description,
    technologies: p.technologies,
    category: p.category,
    link: p.link,
    repositoryLink: p.repositoryLink
  }));
};

const hardSkills = [
  'Front / Back End Coding (Javascript, Python, SQL, C#)',
  'Adobe Creative Cloud',
  'Google Workspace',
  'Looker Studio',
  'Business Intelligence',
  'Business planning and strategy',
  'Design Thinking',
  'Lean Canvas'
];

const softSkills = [
  {
    name: 'Leadership',
    description: { sk: 'Viedol som vývoj a plánovanie v študentskom podnikateľskom projekte', en: 'Led development and planning in a student-led business project' }
  },
  {
    name: 'Teamwork',
    description: { sk: 'Spoluzakladal som startup so spolužiakmi; spolupracoval som na stážach a crowdfundingových projektoch', en: 'Co-founded a startup with classmates; collaborated on internships and crowdfunding' }
  },
  {
    name: 'Time Management',
    description: { sk: 'Vyvážil som školu, prácu na startupe a súťažné plávanie', en: 'Balanced school, startup work, and competitive swimming' }
  },
  {
    name: 'Discipline',
    description: { sk: 'Trénoval som ako plavec viac než desať rokov počas štúdia', en: 'Trained as a swimmer for over 10 years while pursuing academics' }
  },
  {
    name: 'Problem Solving',
    description: { sk: 'Vybudoval som kvízovú platformu na riešenie medzier v tréningu a testovaní', en: 'Built a quiz platform to address gaps in training and testing' }
  },
  {
    name: 'Communication',
    description: { sk: 'Vytvoril som prezentácie a koordinoval crowdfundingové kampane', en: 'Created pitches and coordinated crowdfunding outreach' }
  }
];

// Translations
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      welcome: 'Welcome to my portfolio',
      name: 'Šimon Godarský',
      description: 'Data Science & Programming student at C.S. Lewis Lyceum. I\'m passionate about AI, data analysis, machine learning and modern web development.',
      viewProjects: 'View projects',
      contactMe: 'Contact me'
    },
    about: {
      title: 'About me',
      text1: 'Motivated high school student with a strong interest in informatics and business. Co-founded a startup, completed industry internships, and built discipline through over 10 years of competitive swimming. Eager to apply problem solving and teamwork skills to real world tech and business challenges.',
      text2: 'I specialize in web development, machine learning and data analysis. I enjoy learning new technologies and applying them in practical projects.',
      education: 'Education',
      school: 'C.S. Lewis Lyceum',
      field: 'Data Science & Programming',
      years: '2022-2026',
      language: 'Languages',
      english: 'English - C1 Cambridge Certificate'
    },
    skills: {
      title: 'Skills',
      hardSkills: 'Hard Skills',
      softSkills: 'Soft Skills'
    },
    experience: {
      title: 'Experience',
      slido: {
        company: 'Slido',
        description: 'Slido is an audience interaction platform founded in Bratislava in 2012, which enhances engagement during meetings and events through live polls, Q&A sessions, and quizzes. The company was acquired by Cisco in 2021.',
        role: 'Internship',
        desc1: 'Applied informatics knowledge to develop product features for the audience interaction platform.',
        desc2: 'Collaborated with developers to improve internal tools based on user feedback.',
        desc3: 'Worked on features for live polls and Q&A sessions that enhance user engagement.'
      },
      titans: {
        company: 'Titans Freelancers',
        description: 'Titans Freelancers is a Slovak IT company founded in 2013 that connects IT freelancers with businesses seeking specialized expertise. They provide flexible IT solutions for various industries.',
        role: 'Internship',
        desc1: 'Collaborated with a team of IT specialists on various client projects.',
        desc2: 'Assisted in the development and maintenance of software solutions for external clients.',
        desc3: 'Gained experience with team collaboration and project management in an IT environment.'
      }
    },
    extracurricular: {
      title: 'Extracurricular Activities',
      swimming: 'Competitive Swimmer',
      swimmingDecade: 'I have been actively engaged in competitive swimming for more than a decade.',
      swimmingDesc1: 'Developed strong discipline, resilience, and goal-setting habits through rigorous daily training and competition.',
      swimmingDesc2: 'Learned to manage pressure, maintain focus, and perform consistently over long periods.',
      swimmingDesc3: 'Applied lessons from sports, such as perseverance and time management, to academics and personal projects.'
    },
    projects: {
      title: 'Projects',
      description: 'Overview of my most important projects and work',
      viewProject: 'View project',
      categories: {
        'Web Development': 'Web Development',
        'Data Science': 'Data Science',
        'Data Visualization': 'Data Visualization',
        'Game Development': 'Game Development'
      },
      detail: {
        technologies: 'Technologies',
        about: 'About the project',
        features: 'Features',
        challenges: 'Challenges',
        lessons: 'What I learned',
        viewProject: 'View project',
        backToProjects: 'Back to projects',
        projectNotFound: 'Project not found',
        backToHome: 'Back to home',
        screenshots: 'Screenshots',
        githubRepo: 'GitHub Repository',
        gitlabRepo: 'GitLab Repository'
      }
    },
    contact: {
      title: 'Contact',
      description: 'Feel free to contact me for collaboration or questions',
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub'
    },
    footer: {
      rights: 'All rights reserved.'
    }
  }
};

// Export translations for use in other components
export { translations };

const darkThemes = {
  blue: {
    bg: 'from-slate-900 via-indigo-950 to-slate-800',
    card: 'bg-slate-800',
    text: 'text-slate-200',
    accent: 'indigo',
    border: 'border-indigo-900/30',
    shadow: 'shadow-indigo-900/20'
  },
  purple: {
    bg: 'from-slate-900 via-purple-950 to-slate-800',
    card: 'bg-slate-800',
    text: 'text-slate-200',
    accent: 'purple',
    border: 'border-purple-900/30',
    shadow: 'shadow-purple-900/20'
  },
  green: {
    bg: 'from-slate-900 via-emerald-950 to-slate-800',
    card: 'bg-slate-800',
    text: 'text-slate-200',
    accent: 'emerald',
    border: 'border-emerald-900/30',
    shadow: 'shadow-emerald-900/20'
  },
  orange: {
    bg: 'from-slate-900 via-orange-950 to-slate-800',
    card: 'bg-slate-800',
    text: 'text-slate-200',
    accent: 'orange',
    border: 'border-orange-900/30',
    shadow: 'shadow-orange-900/20'
  },
  pink: {
    bg: 'from-slate-900 via-pink-950 to-slate-800',
    card: 'bg-slate-800',
    text: 'text-slate-200',
    accent: 'pink',
    border: 'border-pink-900/30',
    shadow: 'shadow-pink-900/20'
  },
  cyan: {
    bg: 'from-slate-900 via-cyan-950 to-slate-800',
    card: 'bg-slate-800',
    text: 'text-slate-200',
    accent: 'cyan',
    border: 'border-cyan-900/30',
    shadow: 'shadow-cyan-900/20'
  }
};

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [darkTheme, setDarkTheme] = useState('blue');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));
  const scrollDirectionRef = useRef('down');
  const lastScrollYRef = useRef(window.scrollY);

  const t = translations.en;
  const projects = getProjects('en');

  useEffect(() => {
    // Načítať preferenciu z localStorage (defaultne light mode)
    const savedTheme = localStorage.getItem('theme');
    const savedDarkTheme = localStorage.getItem('darkTheme') || 'blue';
    const shouldBeDark = savedTheme === 'dark';
    
    setIsDarkMode(shouldBeDark);
    setDarkTheme(savedDarkTheme);
    
    // Nastaviť triedy
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', savedDarkTheme);
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', darkTheme);
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeDarkTheme = (themeName) => {
    setDarkTheme(themeName);
    localStorage.setItem('darkTheme', themeName);
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    setShowThemeMenu(false);
  };

  // Aktualizovať data-theme pri zmene darkTheme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', darkTheme);
    }
  }, [darkTheme, isDarkMode]);

  // Helper funkcie pre dynamické triedy podľa témy
  const getThemeClasses = {
    // Progress bar gradient
    progressGradient: () => {
      if (!isDarkMode) return 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500';
      const gradients = {
        blue: 'bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400',
        purple: 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400',
        green: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400',
        orange: 'bg-gradient-to-r from-orange-400 via-red-400 to-orange-400',
        pink: 'bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400',
        cyan: 'bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400'
      };
      return gradients[darkTheme] || gradients.blue;
    },
    // Button gradient
    buttonGradient: () => {
      if (!isDarkMode) return 'bg-gradient-to-r from-blue-600 to-indigo-600';
      const gradients = {
        blue: 'bg-gradient-to-r from-blue-500 to-purple-600',
        purple: 'bg-gradient-to-r from-purple-500 to-pink-600',
        green: 'bg-gradient-to-r from-emerald-500 to-teal-600',
        orange: 'bg-gradient-to-r from-orange-500 to-red-600',
        pink: 'bg-gradient-to-r from-pink-500 to-rose-600',
        cyan: 'bg-gradient-to-r from-cyan-500 to-blue-600'
      };
      return gradients[darkTheme] || gradients.blue;
    },
    // Text color
    textColor: () => {
      if (!isDarkMode) return 'text-blue-600';
      const colors = {
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        green: 'text-emerald-400',
        orange: 'text-orange-400',
        pink: 'text-pink-400',
        cyan: 'text-cyan-400'
      };
      return colors[darkTheme] || colors.blue;
    },
    // Border color
    borderColor: () => {
      if (!isDarkMode) return 'border-blue-600';
      const colors = {
        blue: 'border-blue-400',
        purple: 'border-purple-400',
        green: 'border-emerald-400',
        orange: 'border-orange-400',
        pink: 'border-pink-400',
        cyan: 'border-cyan-400'
      };
      return colors[darkTheme] || colors.blue;
    },
    // Shadow color
    shadowColor: () => {
      if (!isDarkMode) return 'hover:shadow-blue-500/50';
      const shadows = {
        blue: 'hover:shadow-purple-500/50',
        purple: 'hover:shadow-pink-500/50',
        green: 'hover:shadow-emerald-500/50',
        orange: 'hover:shadow-orange-500/50',
        pink: 'hover:shadow-pink-500/50',
        cyan: 'hover:shadow-cyan-500/50'
      };
      return shadows[darkTheme] || shadows.blue;
    },
    // Hover text color
    hoverTextColor: () => {
      if (!isDarkMode) return 'hover:text-indigo-600';
      const colors = {
        blue: 'hover:text-purple-400',
        purple: 'hover:text-pink-400',
        green: 'hover:text-teal-400',
        orange: 'hover:text-red-400',
        pink: 'hover:text-rose-400',
        cyan: 'hover:text-blue-400'
      };
      return colors[darkTheme] || colors.blue;
    },
    // Badge background
    badgeBg: () => {
      if (!isDarkMode) return 'bg-blue-100';
      const backgrounds = {
        blue: 'bg-indigo-900/60',
        purple: 'bg-purple-900/60',
        green: 'bg-emerald-900/60',
        orange: 'bg-orange-900/60',
        pink: 'bg-pink-900/60',
        cyan: 'bg-cyan-900/60'
      };
      return backgrounds[darkTheme] || backgrounds.blue;
    },
    // Badge text
    badgeText: () => {
      if (!isDarkMode) return 'text-blue-700';
      const colors = {
        blue: 'text-blue-300',
        purple: 'text-purple-300',
        green: 'text-emerald-300',
        orange: 'text-orange-300',
        pink: 'text-pink-300',
        cyan: 'text-cyan-300'
      };
      return colors[darkTheme] || colors.blue;
    },
    // Badge border
    badgeBorder: () => {
      if (!isDarkMode) return 'border-blue-200';
      const borders = {
        blue: 'border-indigo-700/50',
        purple: 'border-purple-700/50',
        green: 'border-emerald-700/50',
        orange: 'border-orange-700/50',
        pink: 'border-pink-700/50',
        cyan: 'border-cyan-700/50'
      };
      return borders[darkTheme] || borders.blue;
    },
    // Card shadow
    cardShadow: () => {
      if (!isDarkMode) return 'shadow-lg';
      const shadows = {
        blue: 'shadow-indigo-900/20',
        purple: 'shadow-purple-900/20',
        green: 'shadow-emerald-900/20',
        orange: 'shadow-orange-900/20',
        pink: 'shadow-pink-900/20',
        cyan: 'shadow-cyan-900/20'
      };
      return shadows[darkTheme] || shadows.blue;
    },
    // Card border
    cardBorder: () => {
      if (!isDarkMode) return 'border-gray-100';
      const borders = {
        blue: 'border-indigo-900/30',
        purple: 'border-purple-900/30',
        green: 'border-emerald-900/30',
        orange: 'border-orange-900/30',
        pink: 'border-pink-900/30',
        cyan: 'border-cyan-900/30'
      };
      return `border-gray-100 dark:${borders[darkTheme] || borders.blue}`;
    },
    // Icon gradient
    iconGradient: () => {
      if (!isDarkMode) return 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500';
      const gradients = {
        blue: 'bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400',
        purple: 'bg-gradient-to-br from-purple-400 via-pink-400 to-purple-400',
        green: 'bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-400',
        orange: 'bg-gradient-to-br from-orange-400 via-red-400 to-orange-400',
        pink: 'bg-gradient-to-br from-pink-400 via-rose-400 to-pink-400',
        cyan: 'bg-gradient-to-br from-cyan-400 via-blue-400 to-cyan-400'
      };
      return gradients[darkTheme] || gradients.blue;
    },
    // Icon shadow
    iconShadow: () => {
      if (!isDarkMode) return 'shadow-lg';
      const shadows = {
        blue: 'shadow-indigo-500/50',
        purple: 'shadow-purple-500/50',
        green: 'shadow-emerald-500/50',
        orange: 'shadow-orange-500/50',
        pink: 'shadow-pink-500/50',
        cyan: 'shadow-cyan-500/50'
      };
      return `shadow-lg dark:${shadows[darkTheme] || shadows.blue}`;
    },
    // Tech badge background
    techBadgeBg: () => {
      if (!isDarkMode) {
      const backgrounds = {
          blue: 'bg-blue-100',
          purple: 'bg-purple-100',
          green: 'bg-emerald-100',
          orange: 'bg-orange-100',
          pink: 'bg-pink-100',
          cyan: 'bg-cyan-100'
        };
        return backgrounds[darkTheme] || backgrounds.blue;
      }
      const backgrounds = {
        blue: 'bg-indigo-900/60',
        purple: 'bg-purple-900/60',
        green: 'bg-emerald-900/60',
        orange: 'bg-orange-900/60',
        pink: 'bg-pink-900/60',
        cyan: 'bg-cyan-900/60'
      };
      return backgrounds[darkTheme] || backgrounds.blue;
    },
    // Tech badge text
    techBadgeText: () => {
      if (!isDarkMode) {
        const colors = {
          blue: 'text-blue-700',
          purple: 'text-purple-700',
          green: 'text-emerald-700',
          orange: 'text-orange-700',
          pink: 'text-pink-700',
          cyan: 'text-cyan-700'
        };
        return colors[darkTheme] || colors.blue;
      }
      const colors = {
        blue: 'text-blue-300',
        purple: 'text-purple-300',
        green: 'text-emerald-300',
        orange: 'text-orange-300',
        pink: 'text-pink-300',
        cyan: 'text-cyan-300'
      };
      return colors[darkTheme] || colors.blue;
    },
    // Tech badge border
    techBadgeBorder: () => {
      if (!isDarkMode) {
      const borders = {
          blue: 'border-blue-200',
          purple: 'border-purple-200',
          green: 'border-emerald-200',
          orange: 'border-orange-200',
          pink: 'border-pink-200',
          cyan: 'border-cyan-200'
        };
        return borders[darkTheme] || borders.blue;
      }
      const borders = {
        blue: 'border-indigo-700/50',
        purple: 'border-purple-700/50',
        green: 'border-emerald-700/50',
        orange: 'border-orange-700/50',
        pink: 'border-pink-700/50',
        cyan: 'border-cyan-700/50'
      };
      return borders[darkTheme] || borders.blue;
    },
    // Percentage text color
    percentText: () => {
      if (!isDarkMode) return 'text-gray-500';
      const colors = {
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        green: 'text-emerald-400',
        orange: 'text-orange-400',
        pink: 'text-pink-400',
        cyan: 'text-cyan-400'
      };
      return `text-gray-500 dark:${colors[darkTheme] || colors.blue}`;
    },
    // Education card gradient
    educationCardGradient: () => {
      if (!isDarkMode) {
        return 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600';
      }
      const gradients = {
        blue: 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700',
        purple: 'bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700',
        green: 'bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700',
        orange: 'bg-gradient-to-br from-orange-600 via-red-600 to-orange-700',
        pink: 'bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700',
        cyan: 'bg-gradient-to-br from-cyan-600 via-blue-600 to-cyan-700'
      };
      return gradients[darkTheme] || gradients.blue;
    },
    // Education card border
    educationCardBorder: () => {
      if (!isDarkMode) {
        return 'border-blue-400/20';
      }
      const borders = {
        blue: 'border-indigo-500/30',
        purple: 'border-purple-500/30',
        green: 'border-emerald-500/30',
        orange: 'border-orange-500/30',
        pink: 'border-pink-500/30',
        cyan: 'border-cyan-500/30'
      };
      return borders[darkTheme] || borders.blue;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for section animations - only triggers when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirectionRef.current = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const observerOptions = {
      threshold: [0, 0.15],
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const sectionElement = entry.target.querySelector('.section-animate');
        const isScrollingDown = scrollDirectionRef.current === 'down';

        // Only process if scrolling down OR if section is already visible (scrolling up)
        if (entry.isIntersecting) {
          if (isScrollingDown) {
            // Animate ONLY when scrolling down - always reset and re-animate
            if (sectionElement) {
              sectionElement.classList.remove('visible');
              // Force reflow to reset animation
              void sectionElement.offsetHeight;
              setTimeout(() => {
                sectionElement.classList.add('visible');
              }, 10);
            }
            setVisibleSections((prev) => new Set([...prev, sectionId]));
          } else {
            // When scrolling up, just ensure content is visible WITHOUT any animation
            if (sectionElement) {
              // Add a class to disable animations
              sectionElement.classList.add('no-animation');
              sectionElement.style.opacity = '1';
              sectionElement.style.transform = 'translateY(0)';
              // Set child elements to visible immediately without animation
              const children = sectionElement.querySelectorAll('*');
              children.forEach((child) => {
                child.style.transition = 'none';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              });
              sectionElement.classList.add('visible');
              // Remove no-animation class after styles are applied
              setTimeout(() => {
                sectionElement.classList.remove('no-animation');
                children.forEach((child) => {
                  child.style.transition = '';
                });
              }, 100);
            }
            setVisibleSections((prev) => new Set([...prev, sectionId]));
          }
        } else {
          // When section completely leaves viewport, reset animation for next time
          if (sectionElement) {
            sectionElement.classList.remove('visible');
            // Reset inline styles when leaving viewport
            sectionElement.style.opacity = '';
            sectionElement.style.transform = '';
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Zatvoriť menu pri kliknutí mimo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showThemeMenu && !event.target.closest('.theme-menu-container')) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showThemeMenu]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? `bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-indigo-900/50 dark:[data-theme='purple']:border-purple-900/50 dark:[data-theme='green']:border-emerald-900/50 dark:[data-theme='orange']:border-orange-900/50 dark:[data-theme='pink']:border-pink-900/50 dark:[data-theme='cyan']:border-cyan-900/50` 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity">Portfolio</Link>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                <a href="#home" className="text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 dark:[data-theme='purple']:hover:text-purple-400 dark:[data-theme='green']:hover:text-emerald-400 dark:[data-theme='orange']:hover:text-orange-400 dark:[data-theme='pink']:hover:text-pink-400 dark:[data-theme='cyan']:hover:text-cyan-400 transition-colors font-medium">{t.nav.home}</a>
                <a href="#about" className="text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 dark:[data-theme='purple']:hover:text-purple-400 dark:[data-theme='green']:hover:text-emerald-400 dark:[data-theme='orange']:hover:text-orange-400 dark:[data-theme='pink']:hover:text-pink-400 dark:[data-theme='cyan']:hover:text-cyan-400 transition-colors font-medium">{t.nav.about}</a>
                <a href="#skills" className="text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 dark:[data-theme='purple']:hover:text-purple-400 dark:[data-theme='green']:hover:text-emerald-400 dark:[data-theme='orange']:hover:text-orange-400 dark:[data-theme='pink']:hover:text-pink-400 dark:[data-theme='cyan']:hover:text-cyan-400 transition-colors font-medium">{t.nav.skills}</a>
                <a href="#experience" className="text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 dark:[data-theme='purple']:hover:text-purple-400 dark:[data-theme='green']:hover:text-emerald-400 dark:[data-theme='orange']:hover:text-orange-400 dark:[data-theme='pink']:hover:text-pink-400 dark:[data-theme='cyan']:hover:text-cyan-400 transition-colors font-medium">{t.nav.experience}</a>
                <a href="#projects" className="text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 dark:[data-theme='purple']:hover:text-purple-400 dark:[data-theme='green']:hover:text-emerald-400 dark:[data-theme='orange']:hover:text-orange-400 dark:[data-theme='pink']:hover:text-pink-400 dark:[data-theme='cyan']:hover:text-cyan-400 transition-colors font-medium">{t.nav.projects}</a>
                <a href="#contact" className="text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 dark:[data-theme='purple']:hover:text-purple-400 dark:[data-theme='green']:hover:text-emerald-400 dark:[data-theme='orange']:hover:text-orange-400 dark:[data-theme='pink']:hover:text-pink-400 dark:[data-theme='cyan']:hover:text-cyan-400 transition-colors font-medium">{t.nav.contact}</a>
              </div>
              <div className="flex items-center space-x-2">
                {isDarkMode && (
                  <div className="relative theme-menu-container">
                    <button
                      onClick={() => setShowThemeMenu(!showThemeMenu)}
                      className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 dark:[data-theme='purple']:bg-purple-900/50 dark:[data-theme='green']:bg-emerald-900/50 dark:[data-theme='orange']:bg-orange-900/50 dark:[data-theme='pink']:bg-pink-900/50 dark:[data-theme='cyan']:bg-cyan-900/50 text-gray-800 dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-600 dark:[data-theme='purple']:hover:bg-purple-800/60 dark:[data-theme='green']:hover:bg-emerald-800/60 dark:[data-theme='orange']:hover:bg-orange-800/60 dark:[data-theme='pink']:hover:bg-pink-800/60 dark:[data-theme='cyan']:hover:bg-cyan-800/60 transition-all duration-300"
                      aria-label="Choose theme"
                      title="Vybrať farebnú tému"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </button>
                    {showThemeMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 dark:[data-theme='purple']:bg-slate-800 dark:[data-theme='green']:bg-slate-800 dark:[data-theme='orange']:bg-slate-800 dark:[data-theme='pink']:bg-slate-800 dark:[data-theme='cyan']:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 dark:[data-theme='purple']:border-purple-800/50 dark:[data-theme='green']:border-emerald-800/50 dark:[data-theme='orange']:border-orange-800/50 dark:[data-theme='pink']:border-pink-800/50 dark:[data-theme='cyan']:border-cyan-800/50 py-2 z-50">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Farebné témy</div>
                        {Object.keys(darkThemes).map((themeName) => (
                          <button
                            key={themeName}
                            onClick={() => changeDarkTheme(themeName)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 dark:[data-theme='purple']:hover:bg-purple-900/30 dark:[data-theme='green']:hover:bg-emerald-900/30 dark:[data-theme='orange']:hover:bg-orange-900/30 dark:[data-theme='pink']:hover:bg-pink-900/30 dark:[data-theme='cyan']:hover:bg-cyan-900/30 transition-colors flex items-center justify-between ${
                              darkTheme === themeName 
                                ? `bg-blue-50 dark:bg-slate-700 dark:[data-theme='purple']:bg-purple-900/40 dark:[data-theme='green']:bg-emerald-900/40 dark:[data-theme='orange']:bg-orange-900/40 dark:[data-theme='pink']:bg-pink-900/40 dark:[data-theme='cyan']:bg-cyan-900/40 text-blue-600 dark:text-blue-400 dark:[data-theme='purple']:text-purple-400 dark:[data-theme='green']:text-emerald-400 dark:[data-theme='orange']:text-orange-400 dark:[data-theme='pink']:text-pink-400 dark:[data-theme='cyan']:text-cyan-400` 
                                : 'text-gray-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="capitalize">{themeName}</span>
                            {darkTheme === themeName && (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={toggleDarkMode}
                  className="p-2.5 rounded-full bg-gray-200 dark:bg-slate-700 dark:[data-theme='purple']:bg-purple-900/50 dark:[data-theme='green']:bg-emerald-900/50 dark:[data-theme='orange']:bg-orange-900/50 dark:[data-theme='pink']:bg-pink-900/50 dark:[data-theme='cyan']:bg-cyan-900/50 text-gray-800 dark:text-yellow-300 dark:[data-theme='purple']:text-purple-300 dark:[data-theme='green']:text-emerald-300 dark:[data-theme='orange']:text-orange-300 dark:[data-theme='pink']:text-pink-300 dark:[data-theme='cyan']:text-cyan-300 hover:bg-gray-300 dark:hover:bg-slate-600 dark:[data-theme='purple']:hover:bg-purple-800/60 dark:[data-theme='green']:hover:bg-emerald-800/60 dark:[data-theme='orange']:hover:bg-orange-800/60 dark:[data-theme='pink']:hover:bg-pink-800/60 dark:[data-theme='cyan']:hover:bg-cyan-800/60 transition-all duration-300 shadow-md hover:shadow-lg dark:[data-theme='purple']:shadow-purple-900/30 dark:[data-theme='green']:shadow-emerald-900/30 dark:[data-theme='orange']:shadow-orange-900/30 dark:[data-theme='pink']:shadow-pink-900/30 dark:[data-theme='cyan']:shadow-cyan-900/30"
                  aria-label="Toggle dark mode"
                  title={isDarkMode ? "Vypnúť dark mode" : "Zapnúť dark mode"}
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center section-padding pt-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-6">
            <div className={`inline-block px-4 py-2 ${getThemeClasses.badgeBg()} ${getThemeClasses.badgeText()} rounded-full text-sm font-semibold mb-4 border ${getThemeClasses.badgeBorder()}`}>
              {t.hero.welcome}
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">{t.hero.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#projects" 
              className={`px-8 py-3 ${getThemeClasses.buttonGradient()} text-white rounded-full font-semibold hover:shadow-lg ${getThemeClasses.shadowColor()} hover:scale-105 transition-all duration-300`}
            >
              {t.hero.viewProjects}
            </a>
            <a 
              href="#contact" 
              className={`px-8 py-3 bg-white dark:bg-slate-800 ${getThemeClasses.textColor()} border-2 ${getThemeClasses.borderColor()} rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-md dark:${getThemeClasses.cardShadow()}`}
            >
              {t.hero.contactMe}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto w-full section-animate ${visibleSections.has('about') ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 md:mb-12 gradient-text">{t.about.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="space-y-5 md:space-y-6 text-lg md:text-xl text-gray-700 dark:text-slate-200 leading-relaxed">
              <p>
                {t.about.text1}
              </p>
              <p>
                {t.about.text2}
              </p>
            </div>
            <div className={`${getThemeClasses.educationCardGradient()} rounded-3xl p-8 md:p-10 text-white shadow-2xl border ${getThemeClasses.educationCardBorder()}`}>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-5">{t.about.education}</h3>
              <p className="text-lg md:text-xl mb-1 md:mb-2 font-semibold">{t.about.school}</p>
              <p className="text-blue-100 dark:text-blue-200 dark:[data-theme='purple']:text-purple-200 dark:[data-theme='green']:text-emerald-200 dark:[data-theme='orange']:text-orange-200 dark:[data-theme='pink']:text-pink-200 dark:[data-theme='cyan']:text-cyan-200 mb-1">{t.about.field}</p>
              <p className="text-sm text-blue-200 dark:text-blue-300 dark:[data-theme='purple']:text-purple-300 dark:[data-theme='green']:text-emerald-300 dark:[data-theme='orange']:text-orange-300 dark:[data-theme='pink']:text-pink-300 dark:[data-theme='cyan']:text-cyan-300 mb-4">{t.about.years}</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <h4 className="text-lg font-semibold mb-2">{t.about.language}</h4>
                <p className="text-sm text-blue-100 dark:text-blue-200 dark:[data-theme='purple']:text-purple-200 dark:[data-theme='green']:text-emerald-200 dark:[data-theme='orange']:text-orange-200 dark:[data-theme='pink']:text-pink-200 dark:[data-theme='cyan']:text-cyan-200">{t.about.english}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto w-full section-animate ${visibleSections.has('skills') ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 md:mb-12 gradient-text">{t.skills.title}</h2>
          
          {/* Hard Skills */}
          <div className="mb-10 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-7 text-gray-800 dark:text-slate-200">{t.skills.hardSkills}</h3>
            <div className="flex flex-wrap gap-3">
              {hardSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 ${getThemeClasses.techBadgeBg()} ${getThemeClasses.techBadgeText()} rounded-lg text-sm border ${getThemeClasses.techBadgeBorder()} font-medium`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-7 text-gray-800 dark:text-slate-200">{t.skills.softSkills}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkills.map((skill, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md dark:shadow-indigo-900/20 dark:[data-theme='purple']:shadow-purple-900/20 dark:[data-theme='green']:shadow-emerald-900/20 dark:[data-theme='orange']:shadow-orange-900/20 dark:[data-theme='pink']:shadow-pink-900/20 dark:[data-theme='cyan']:shadow-cyan-900/20 card-hover border border-gray-100 dark:border-indigo-900/30 dark:[data-theme='purple']:border-purple-900/30 dark:[data-theme='green']:border-emerald-900/30 dark:[data-theme='orange']:border-orange-900/30 dark:[data-theme='pink']:border-pink-900/30 dark:[data-theme='cyan']:border-cyan-900/30">
                  <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-slate-200">{skill.name}</h4>
                  <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{skill.description.en}</p>
                </div>
              ))}
                </div>
              </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto w-full section-animate ${visibleSections.has('experience') ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 md:mb-12 gradient-text">{t.experience.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Slido */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl dark:shadow-indigo-900/30 dark:[data-theme='purple']:shadow-purple-900/30 dark:[data-theme='green']:shadow-emerald-900/30 dark:[data-theme='orange']:shadow-orange-900/30 dark:[data-theme='pink']:shadow-pink-900/30 dark:[data-theme='cyan']:shadow-cyan-900/30 border border-gray-100 dark:border-indigo-900/30 dark:[data-theme='purple']:border-purple-900/30 dark:[data-theme='green']:border-emerald-900/30 dark:[data-theme='orange']:border-orange-900/30 dark:[data-theme='pink']:border-pink-900/30 dark:[data-theme='cyan']:border-cyan-900/30">
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-slate-200">{t.experience.slido.company}</h3>
                <span className={`inline-block px-3 py-1 ${getThemeClasses.badgeBg()} ${getThemeClasses.badgeText()} rounded-full text-xs font-semibold border ${getThemeClasses.badgeBorder()}`}>
                  {t.experience.slido.role}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-6 leading-relaxed">{t.experience.slido.description}</p>
              <ul className="space-y-3 text-gray-700 dark:text-slate-300">
                <li className="flex items-start">
                  <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.experience.slido.desc1}</span>
                </li>
                <li className="flex items-start">
                  <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.experience.slido.desc2}</span>
                </li>
                <li className="flex items-start">
                  <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.experience.slido.desc3}</span>
                </li>
              </ul>
            </div>

            {/* Titans Freelancers */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl dark:shadow-indigo-900/30 dark:[data-theme='purple']:shadow-purple-900/30 dark:[data-theme='green']:shadow-emerald-900/30 dark:[data-theme='orange']:shadow-orange-900/30 dark:[data-theme='pink']:shadow-pink-900/30 dark:[data-theme='cyan']:shadow-cyan-900/30 border border-gray-100 dark:border-indigo-900/30 dark:[data-theme='purple']:border-purple-900/30 dark:[data-theme='green']:border-emerald-900/30 dark:[data-theme='orange']:border-orange-900/30 dark:[data-theme='pink']:border-pink-900/30 dark:[data-theme='cyan']:border-cyan-900/30">
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-slate-200">{t.experience.titans.company}</h3>
                <span className={`inline-block px-3 py-1 ${getThemeClasses.badgeBg()} ${getThemeClasses.badgeText()} rounded-full text-xs font-semibold border ${getThemeClasses.badgeBorder()}`}>
                  {t.experience.titans.role}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-6 leading-relaxed">{t.experience.titans.description}</p>
              <ul className="space-y-3 text-gray-700 dark:text-slate-300">
                <li className="flex items-start">
                  <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.experience.titans.desc1}</span>
                </li>
                <li className="flex items-start">
                  <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.experience.titans.desc2}</span>
                </li>
                <li className="flex items-start">
                  <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t.experience.titans.desc3}</span>
                </li>
              </ul>
            </div>

            {/* Extracurricular Activities - Subsection */}
            <div className="mt-12 md:mt-16 col-span-2">
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-gray-800 dark:text-slate-200">{t.extracurricular.title}</h3>
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-indigo-900/30 dark:[data-theme='purple']:shadow-purple-900/30 dark:[data-theme='green']:shadow-emerald-900/30 dark:[data-theme='orange']:shadow-orange-900/30 dark:[data-theme='pink']:shadow-pink-900/30 dark:[data-theme='cyan']:shadow-cyan-900/30 border border-gray-100 dark:border-indigo-900/30 dark:[data-theme='purple']:border-purple-900/30 dark:[data-theme='green']:border-emerald-900/30 dark:[data-theme='orange']:border-orange-900/30 dark:[data-theme='pink']:border-pink-900/30 dark:[data-theme='cyan']:border-cyan-900/30">
                <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-slate-200">{t.extracurricular.swimming}</h4>
                <ul className="space-y-3 text-gray-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.extracurricular.swimmingDecade}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.extracurricular.swimmingDesc1}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.extracurricular.swimmingDesc2}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className={`w-5 h-5 mr-3 mt-1 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.extracurricular.swimmingDesc3}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto w-full section-animate ${visibleSections.has('projects') ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-5 gradient-text">{t.projects.title}</h2>
          <p className="text-center text-gray-600 dark:text-slate-300 mb-10 md:mb-12 text-lg md:text-xl">
            {t.projects.description}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg dark:shadow-indigo-900/20 dark:[data-theme='purple']:shadow-purple-900/20 dark:[data-theme='green']:shadow-emerald-900/20 dark:[data-theme='orange']:shadow-orange-900/20 dark:[data-theme='pink']:shadow-pink-900/20 dark:[data-theme='cyan']:shadow-cyan-900/20 card-hover group overflow-hidden relative border border-gray-100 dark:border-indigo-900/30 dark:[data-theme='purple']:border-purple-900/30 dark:[data-theme='green']:border-emerald-900/30 dark:[data-theme='orange']:border-orange-900/30 dark:[data-theme='pink']:border-pink-900/30 dark:[data-theme='cyan']:border-cyan-900/30"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 dark:[data-theme='purple']:from-purple-500 dark:[data-theme='purple']:via-pink-500 dark:[data-theme='purple']:to-purple-500 dark:[data-theme='green']:from-emerald-500 dark:[data-theme='green']:via-teal-500 dark:[data-theme='green']:to-emerald-500 dark:[data-theme='orange']:from-orange-500 dark:[data-theme='orange']:via-red-500 dark:[data-theme='orange']:to-orange-500 dark:[data-theme='pink']:from-pink-500 dark:[data-theme='pink']:via-rose-500 dark:[data-theme='pink']:to-pink-500 dark:[data-theme='cyan']:from-cyan-500 dark:[data-theme='cyan']:via-blue-500 dark:[data-theme='cyan']:to-cyan-500 rounded-bl-full opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="mb-3">
                    <span className={`px-3 py-1 ${getThemeClasses.badgeBg()} ${getThemeClasses.badgeText()} rounded-full text-xs font-semibold border ${getThemeClasses.badgeBorder()}`}>
                      {t.projects.categories[project.category] || project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-slate-100">{project.title}</h3>
                  <p className="text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIdx) => (
                      <span 
                        key={techIdx}
                        className={`px-3 py-1 ${getThemeClasses.techBadgeBg()} ${getThemeClasses.techBadgeText()} rounded-lg text-sm border ${getThemeClasses.techBadgeBorder()}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/project/${project.id}`}
                    className={`inline-flex items-center ${getThemeClasses.textColor()} font-semibold ${getThemeClasses.hoverTextColor()} transition-colors group/link`}
                  >
                    {t.projects.viewProject}
                    <svg className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">{t.contact.title}</h2>
          <p className="text-center text-gray-600 dark:text-slate-300 mb-12 text-lg">
            {t.contact.description}
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-indigo-900/30 dark:[data-theme='purple']:shadow-purple-900/30 dark:[data-theme='green']:shadow-emerald-900/30 dark:[data-theme='orange']:shadow-orange-900/30 dark:[data-theme='pink']:shadow-pink-900/30 dark:[data-theme='cyan']:shadow-cyan-900/30 border border-gray-100 dark:border-indigo-900/30 dark:[data-theme='purple']:border-purple-900/30 dark:[data-theme='green']:border-emerald-900/30 dark:[data-theme='orange']:border-orange-900/30 dark:[data-theme='pink']:border-pink-900/30 dark:[data-theme='cyan']:border-cyan-900/30">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className={`w-16 h-16 ${getThemeClasses.iconGradient()} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${getThemeClasses.iconShadow()}`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">{t.contact.email}</h3>
                <a href="mailto:simon.godarsky@lyceum.sk" className={`${getThemeClasses.textColor()} ${getThemeClasses.hoverTextColor()} transition-colors`}>
                  simon.godarsky@lyceum.sk
                </a>
              </div>
              <div className="group">
                <div className={`w-16 h-16 ${getThemeClasses.iconGradient()} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${getThemeClasses.iconShadow()}`}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">{t.contact.linkedin}</h3>
                <a href="#" className={`${getThemeClasses.textColor()} ${getThemeClasses.hoverTextColor()} transition-colors`}>
                  linkedin.com/in/tvoje-meno
                </a>
              </div>
              <div className="group">
                <div className={`w-16 h-16 ${getThemeClasses.iconGradient()} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${getThemeClasses.iconShadow()}`}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482 3.97-1.32 6.833-5.08 6.833-9.503C22 6.515 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-2">{t.contact.github}</h3>
                <a href="#" className={`${getThemeClasses.textColor()} ${getThemeClasses.hoverTextColor()} transition-colors`}>
                  github.com/tvoje-meno
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-900 dark:[data-theme='purple']:bg-slate-900 dark:[data-theme='green']:bg-slate-900 dark:[data-theme='orange']:bg-slate-900 dark:[data-theme='pink']:bg-slate-900 dark:[data-theme='cyan']:bg-slate-900 border-t border-gray-800 dark:border-indigo-900/50 dark:[data-theme='purple']:border-purple-900/50 dark:[data-theme='green']:border-emerald-900/50 dark:[data-theme='orange']:border-orange-900/50 dark:[data-theme='pink']:border-pink-900/50 dark:[data-theme='cyan']:border-cyan-900/50 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 dark:text-slate-400 dark:[data-theme='purple']:text-purple-300/70 dark:[data-theme='green']:text-emerald-300/70 dark:[data-theme='orange']:text-orange-300/70 dark:[data-theme='pink']:text-pink-300/70 dark:[data-theme='cyan']:text-cyan-300/70">
            © {new Date().getFullYear()} {t.hero.name}. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project/:projectId" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;
