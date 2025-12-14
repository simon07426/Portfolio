import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './App.css';
import { translations } from './App.jsx';

const darkThemes = {
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
  cyan: {
    bg: 'from-slate-900 via-cyan-950 to-slate-800',
    card: 'bg-slate-800',
    text: 'text-slate-200',
    accent: 'cyan',
    border: 'border-cyan-900/30',
    shadow: 'shadow-cyan-900/20'
  }
};

// Projekty s detailnými informáciami (obsahujú preklady)
const projectsDataBase = [
  {
    id: 'quizme',
    title: { sk: 'QuizMe AI', en: 'QuizMe AI' },
    description: { 
      sk: 'Aplikácia s umelou inteligenciou na vytváranie kvízov zo študijných materiálov. Nahráš PDF alebo text a AI vygeneruje personalizované kvízy.',
      en: 'AI-powered application for creating quizzes from study materials. Upload PDFs or text and AI generates personalized quizzes.'
    },
    detailedDescription: {
      sk: `QuizMe AI je webová aplikácia, ktorá transformuje študijné materiály na personalizované kvízy pomocou umelnej inteligencie.

Aplikácia umožňuje študentom nahrávať svoje študijné materiály (PDF súbory, textové dokumenty) a pomocou OpenAI API automaticky generuje kvízy s otázkami založenými na obsahu. Používatelia si môžu vybrať počet otázok, typ otázok (multiple choice alebo true/false) a potom si kvízy uložiť a riešiť v interaktívnom režime.

Projekt používa Flask backend pre API endpointy, OpenAI GPT-4 pre generovanie kvízov a PyPDF2 pre extrakciu textu z PDF súborov. Frontend je vytvorený v vanilla JavaScript s podporou Google OAuth autentifikácie a dark mode. Kvízy sú ukladané v localStorage a organizované podľa používateľa.

Aplikácia poskytuje intuitívne používateľské rozhranie pre nahrávanie súborov, generovanie kvízov a ich riešenie s okamžitou spätnou väzbou. Dashboard umožňuje správu všetkých vytvorených kvízov.`,
      en: `QuizMe AI is a web application that transforms study materials into personalized quizzes using artificial intelligence.

The application allows students to upload their study materials (PDF files, text documents) and automatically generates quizzes with questions based on the content using OpenAI API. Users can choose the number of questions, question types (multiple choice or true/false), and then save and take quizzes in an interactive mode.

The project uses Flask backend for API endpoints, OpenAI GPT-4 for quiz generation, and PyPDF2 for text extraction from PDF files. The frontend is built in vanilla JavaScript with Google OAuth authentication and dark mode support. Quizzes are stored in localStorage organized by user.

The application provides an intuitive user interface for file uploads, quiz generation, and taking quizzes with immediate feedback. The dashboard allows management of all created quizzes.`
    },
    technologies: ['Python', 'Flask', 'OpenAI API', 'JavaScript', 'HTML/CSS', 'Google OAuth'],
    category: 'Web Development',
    link: 'https://github.com/simon07426/QuizMe---portfolio',
    repositoryLink: 'https://github.com/simon07426/QuizMe---portfolio',
    features: {
      sk: [
        'Generovanie kvízov pomocou AI z PDF a textových súborov',
        'Interaktívny režim na riešenie kvízov',
        'Dashboard na správu kvízov',
        'Google OAuth autentifikácia',
        'Podpora dark mode',
        'Otázky typu multiple choice a True/False'
      ],
      en: [
        'AI-powered quiz generation from PDF and text files',
        'Interactive mode for taking quizzes',
        'Dashboard for quiz management',
        'Google OAuth authentication',
        'Dark mode support',
        'Multiple choice and True/False questions'
      ]
    },
    challenges: {
      sk: [
        'Integrácia OpenAI API a formátovanie promptov',
        'Extrakcia textu z PDF súborov s rôznymi formátmi',
        'Vytvorenie intuitívneho používateľského rozhrania bez frameworku',
        'Správa stavu aplikácie v vanilla JavaScript',
        'Implementácia Google OAuth'
      ],
      en: [
        'OpenAI API integration and prompt formatting',
        'Text extraction from PDF files with various formats',
        'Creating intuitive UI without a framework',
        'State management in vanilla JavaScript',
        'Google OAuth implementation'
      ]
    },
    lessons: {
      sk: [
        'Naučil som sa pracovať s OpenAI API a vytvárať efektívne prompty',
        'Získal som skúsenosti s vývojom Flask backendu',
        'Pochopil som spracovanie PDF súborov v Pythone',
        'Naučil som sa implementovať OAuth autentifikáciu',
        'Zlepšil som svoje zručnosti v vanilla JavaScript'
      ],
      en: [
        'I learned to work with OpenAI API and create effective prompts',
        'I gained experience with Flask backend development',
        'I understood PDF processing in Python',
        'I learned to implement OAuth authentication',
        'I improved my vanilla JavaScript skills'
      ]
    },
    images: [] // Môžeš pridať cesty k obrázkom neskôr
  },
  {
    id: 'g-game',
    title: { sk: 'MonoGame', en: 'MonoGame' },
    description: { 
      sk: 'Tímový projekt hry vytvorenej v MonoGame. Zameraný na spoluprácu, Git workflow, merge requests a rotáciu vedúcich rolí v tíme štyroch ľudí.',
      en: 'Team project of a game created in MonoGame. Focused on collaboration, Git workflow, merge requests and rotating leadership roles in a team of four.'
    },
    detailedDescription: {
      sk: `MonoGame je tímový projekt hry vytvorenej v MonoGame, na ktorom som pracoval v tíme štyroch ľudí. Tento projekt bol pre mňa skvelou príležitosťou naučiť sa efektívne spolupracovať v tíme a zvládnuť Git workflow v reálnom prostredí.

Projekt bol postavený na MonoGame frameworku, čo nám umožnilo vytvoriť plnohodnotnú 2D hru s komplexnou mechanikou. Počas vývoja sme pravidelne rotovali vedúce role v tíme, čo každému z nás dalo možnosť viesť projekt a rozhodovať o architektúre a smerovaní vývoja.

Kľúčovou súčasťou nášho workflow bolo používanie GitLabu pre verzovanie kódu a merge requests. Každý feature bol vyvíjaný v samostatnej vetve, následne sme vytvárali merge requests, ktoré sme spolu kontrolovali pred mergovaním do hlavnej vetvy. Tento proces nás naučil dôležitosť code review, komunikácie v tíme a správneho riešenia konfliktov.

Projekt využíva MonoGame pre rendering, game loop a správu vstupov. Implementovali sme rôzne herné mechaniky vrátane kolízií, animácií a stavového stroja pre herné objekty.`,
      en: `G-Game is a team project of a game created in MonoGame, which I worked on in a team of four people. This project was a great opportunity for me to learn how to collaborate effectively in a team and master Git workflow in a real environment.

The project was built on the MonoGame framework, which allowed us to create a full-featured 2D game with complex mechanics. During development, we regularly rotated leadership roles in the team, giving each of us the opportunity to lead the project and make decisions about architecture and development direction.

A key part of our workflow was using GitLab for code versioning and merge requests. Each feature was developed in a separate branch, then we created merge requests that we reviewed together before merging into the main branch. This process taught us the importance of code review, team communication, and proper conflict resolution.

The project uses MonoGame for rendering, game loop, and input management. We implemented various game mechanics including collisions, animations, and state machines for game objects.`
    },
    technologies: ['C#', 'MonoGame', 'Git', 'GitLab'],
    category: 'Game Development',
    link: 'https://gitlab.com/tomtom4465248/g-game',
    repositoryLink: 'https://gitlab.com/tomtom4465248/g-game',
    features: {
      sk: [
        'Tímová spolupráca v tíme štyroch ľudí',
        'Rotácia vedúcich rolí v tíme',
        'Git workflow s vetvami a merge requests',
        'Proces code review',
        'Riešenie konfliktov v Gite',
        'Komplexné herné mechaniky v MonoGame',
        'Kolízie a animácie',
        'Stavový stroj pre herné objekty'
      ],
      en: [
        'Team collaboration in a team of four',
        'Rotating leadership roles in the team',
        'Git workflow with branches and merge requests',
        'Code review process',
        'Resolving Git conflicts',
        'Complex game mechanics in MonoGame',
        'Collisions and animations',
        'State machine for game objects'
      ]
    },
    challenges: {
      sk: [
        'Koordinácia práce v tíme štyroch ľudí',
        'Riešenie konfliktov pri merge requests',
        'Komunikácia a synchronizácia zmien',
        'Rozdelenie úloh a zodpovedností',
        'Udržiavanie konzistentného kódu v tíme',
        'Zvládnutie Git workflow v tímovom prostredí',
        'Integrácia rôznych častí hry od rôznych členov tímu'
      ],
      en: [
        'Coordinating work in a team of four',
        'Resolving conflicts in merge requests',
        'Communication and synchronization of changes',
        'Task distribution and responsibilities',
        'Maintaining consistent code in a team',
        'Mastering Git workflow in a team environment',
        'Integrating different parts of the game from different team members'
      ]
    },
    lessons: {
      sk: [
        'Naučil som sa efektívne spolupracovať v tíme pomocou Git a GitLab',
        'Získal som skúsenosti s merge requests a procesom code review',
        'Pochopil som dôležitosť komunikácie v tímovom prostredí',
        'Naučil som sa riešiť konflikty v Gite',
        'Získal som skúsenosti s rotáciou vedúcich rolí',
        'Zlepšil som svoje zručnosti v MonoGame a C#',
        'Naučil som sa organizovať prácu v tíme a rozdeliť úlohy',
        'Pochopil som dôležitosť verzovania kódu a best practices v Gite'
      ],
      en: [
        'I learned to collaborate effectively in a team using Git and GitLab',
        'I gained experience with merge requests and code review process',
        'I understood the importance of communication in a team environment',
        'I learned to resolve conflicts in Git',
        'I gained experience with rotating leadership roles',
        'I improved my skills in MonoGame and C#',
        'I learned to organize work in a team and distribute tasks',
        'I understood the importance of code versioning and Git best practices'
      ]
    },
    images: []
  },
  {
    id: 'titans-extension',
    title: { sk: 'Chrome Extension', en: 'Chrome Extension' },
    description: { 
      sk: 'Chrome rozšírenie vyvinuté počas stáže v Titans Freelancers. Automaticky extrahuje informácie z LinkedIn profilov a firiem a zobrazuje údaje z databázy.',
      en: 'Chrome extension developed during internship at Titans Freelancers. Automatically extracts information from LinkedIn profiles and companies and displays data from database.'
    },
    detailedDescription: {
      sk: `Chrome rozšírenie je projekt, ktorý som vyvinul spolu s kamarátom počas stáže v Titans Freelancers. Projekt bol vytvorený na zlepšenie efektivity práce s LinkedIn profilmi a firmami.

Rozšírenie funguje tak, že keď používateľ navštívi LinkedIn profil alebo stránku firmy, automaticky extrahuje meno alebo názov firmy z stránky. Tieto informácie sa potom odošlú na Flask backend API, ktorý vyhľadáva v databáze a vracia relevantné informácie o profile alebo firme.

Rozšírenie podporuje oba typy LinkedIn stránok – osobné profily aj firemné stránky. Pre osobné profily zobrazuje informácie ako meno, pozícia, email, oddelenie a LinkedIn odkaz. Pre firemné stránky zobrazuje názov firmy, IČO, adresu, web a ďalšie firemné informácie.

Projekt využíva Chrome Extension Manifest V3, JavaScript pre frontend logiku, Flask pre backend API a integráciu s databázou. Rozšírenie automaticky normalizuje text (odstraňuje diakritiku) pre lepšie vyhľadávanie v databáze.`,
      en: `Titans LinkedIn Extension is a Chrome extension that I developed together with a friend during an internship at Titans Freelancers. The project was created to improve efficiency when working with LinkedIn profiles and companies.

The extension works by automatically extracting the name or company name from the LinkedIn page when a user visits a LinkedIn profile or company page. This information is then sent to a Flask backend API, which searches the database and returns relevant information about the profile or company.

The extension supports both types of LinkedIn pages - personal profiles and company pages. For personal profiles, it displays information such as name, position, email, department, and LinkedIn link. For company pages, it displays company name, company ID (IČO), address, website, and other company information.

The project uses Chrome Extension Manifest V3, JavaScript for frontend logic, Flask for backend API, and database integration. The extension automatically normalizes text (removes diacritics) for better database searching.`
    },
    technologies: ['JavaScript', 'Chrome Extension', 'Flask', 'Python', 'HTML/CSS', 'API Integration'],
    category: 'Web Development',
    link: 'https://github.com/Svoboda-Michal/titans',
    repositoryLink: 'https://github.com/Svoboda-Michal/titans',
    features: {
      sk: [
        'Automatická extrakcia mien a názvov firiem z LinkedIn stránok',
        'Podpora pre osobné profily aj firemné stránky',
        'Integrácia s databázou cez Flask API',
        'Normalizácia textu (odstránenie diakritiky)',
        'Zobrazenie detailných informácií v popup okne',
        'Chrome Extension Manifest V3',
        'Zobrazenie dát z databázy v reálnom čase'
      ],
      en: [
        'Automatic extraction of names and company names from LinkedIn pages',
        'Support for both personal profiles and company pages',
        'Database integration via Flask API',
        'Text normalization (removing diacritics)',
        'Display of detailed information in popup window',
        'Chrome Extension Manifest V3',
        'Real-time display of database data'
      ]
    },
    challenges: {
      sk: [
        'Extrakcia dát z LinkedIn stránok s rôznymi štruktúrami',
        'Integrácia Chrome rozšírenia s Flask backend API',
        'Normalizácia slovenských znakov pre vyhľadávanie',
        'Rozpoznanie typu stránky (osobný profil vs. firma)',
        'Spracovanie viacerých výsledkov z databázy',
        'Riešenie CORS medzi rozšírením a backend API',
        'Spolupráca v tíme počas stáže'
      ],
      en: [
        'Extracting data from LinkedIn pages with different structures',
        'Integrating Chrome Extension with Flask backend API',
        'Normalizing Slovak characters for searching',
        'Recognizing page type (personal profile vs. company)',
        'Processing multiple results from database',
        'CORS handling between extension and backend API',
        'Team collaboration during internship'
      ]
    },
    lessons: {
      sk: [
        'Naučil som sa vytvárať Chrome rozšírenia s Manifest V3',
        'Získal som skúsenosti s integráciou frontendu a backendu',
        'Pochopil som dôležitosť normalizácie textu v databázach',
        'Naučil som sa pracovať s Chrome Extension API',
        'Získal som skúsenosti s vývojom Flask API',
        'Zlepšil som svoje zručnosti v týmovej spolupráci',
        'Pochopil som výzvy integrácie externých služieb (LinkedIn)',
        'Naučil som sa riešiť CORS problémy v Chrome rozšíreniach'
      ],
      en: [
        'I learned to create Chrome extensions with Manifest V3',
        'I gained experience with frontend and backend integration',
        'I understood the importance of text normalization in databases',
        'I learned to work with Chrome Extension API',
        'I gained experience with Flask API development',
        'I improved my team collaboration skills',
        'I understood the challenges of integrating external services (LinkedIn)',
        'I learned to solve CORS issues in Chrome extensions'
      ]
    },
    images: []
  },
  {
    id: 'patractino-crowdfunding',
    title: { sk: 'Crowdfunding', en: 'Crowdfunding' },
    description: { 
      sk: 'Skupinový projekt odmenového crowdfundingu pre spoločnosť PátračTino na platforme StartLabe. Cieľ 500€ bol naplnený na 162%.',
      en: 'Group project of reward-based crowdfunding for PátračTino company on StartLabe platform. Goal of 500€ was achieved at 162%.'
    },
    detailedDescription: {
      sk: `PátračTino Crowdfunding bol skupinový projekt odmenového crowdfundingu, na ktorom som pracoval v tíme. Projekt bol vytvorený pre spoločnosť PátračTino a prebiehal na platforme StartLabe.

Každý člen tímu mal svoju špecifickú úlohu v projekte. Moja úloha zahŕňala prípravu príspevkov a cien pre odmenový crowdfunding v rôznych hodnotách. Spolupracoval som s tímom na vytvorení atraktívnych odmenových balíčkov, ktoré by motivovali ľudí k príspevkom.

Projekt zahŕňal aj platenú marketingovú kampaň, ktorá pomohla zvýšiť dosah a úspešnosť crowdfundingovej kampane. Cieľom bolo zozbierať 500€ pre spoločnosť PátračTino, ktorá nepotrebovala viac finančných prostriedkov.

Kampaň bola veľmi úspešná - cieľ bol naplnený na 162%, čo znamená, že sa podarilo zozbierať 810€. Tento projekt mi dal skúsenosti s crowdfundingom, marketingom a tímovou spoluprácou v ne-IT prostredí.`,
      en: `PátračTino Crowdfunding was a group project of reward-based crowdfunding that I worked on in a team. The project was created for PátračTino company and took place on the StartLabe platform.

Each team member had their specific role in the project. My role included preparing contributions and prices for reward-based crowdfunding at various values. I collaborated with the team to create attractive reward packages that would motivate people to contribute.

The project also included a paid marketing campaign that helped increase the reach and success of the crowdfunding campaign. The goal was to raise 500€ for PátračTino company, which didn't need more financial resources.

The campaign was very successful - the goal was achieved at 162%, meaning we managed to raise 810€. This project gave me experience with crowdfunding, marketing, and team collaboration in a non-IT environment.`
    },
    technologies: ['Crowdfunding', 'Marketing', 'StartLabe', 'Project Management'],
    category: 'Marketing',
    link: null,
    repositoryLink: null,
    features: {
      sk: [
        'Príprava príspevkov a cien pre odmenový crowdfunding',
        'Rôzne hodnoty odmenových balíčkov',
        'Platená marketingová kampaň',
        'Platforma StartLabe',
        'Tímová spolupráca s rozdelenými úlohami',
        'Cieľ 500€ naplnený na 162%',
        'Zozbieraných 810€'
      ],
      en: [
        'Preparation of contributions and prices for reward-based crowdfunding',
        'Various reward package values',
        'Paid marketing campaign',
        'StartLabe platform',
        'Team collaboration with divided tasks',
        'Goal of 500€ achieved at 162%',
        'Raised 810€'
      ]
    },
    challenges: {
      sk: [
        'Koordinácia práce v tíme s rôznymi úlohami',
        'Vytvorenie atraktívnych odmenových balíčkov',
        'Plánovanie a realizácia marketingovej kampane',
        'Komunikácia so spoločnosťou PátračTino',
        'Použitie platformy StartLabe',
        'Dosiahnutie crowdfundingového cieľa',
        'Spolupráca v ne-IT prostredí'
      ],
      en: [
        'Coordinating team work with different tasks',
        'Creating attractive reward packages',
        'Planning and executing marketing campaign',
        'Communication with PátračTino company',
        'Using StartLabe platform',
        'Achieving crowdfunding goal',
        'Collaboration in non-IT environment'
      ]
    },
    lessons: {
      sk: [
        'Naučil som sa pracovať s crowdfundingom a odmenovými balíčkami',
        'Získal som skúsenosti s marketingovými kampaňami',
        'Pochopil som dôležitosť tímovej spolupráce a rozdelenia úloh',
        'Naučil som sa používať platformu StartLabe',
        'Získal som skúsenosti s komunikáciou so zákazníkmi',
        'Pochopil som proces plánovania a realizácie crowdfundingovej kampane',
        'Zlepšil som svoje zručnosti v ne-IT prostredí'
      ],
      en: [
        'I learned to work with crowdfunding and reward packages',
        'I gained experience with marketing campaigns',
        'I understood the importance of team collaboration and task division',
        'I learned to use StartLabe platform',
        'I gained experience with customer communication',
        'I understood the process of planning and executing crowdfunding campaigns',
        'I improved my skills in non-IT environment'
      ]
    },
    images: []
  }
];

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [darkTheme, setDarkTheme] = useState('cyan');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    // Zobraziť stránku hore bez animácie pri načítaní alebo zmene projektu
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [projectId]);

  // Funkcia na získanie preložených projektov
  const getProjectsData = () => {
    return projectsDataBase.map(project => ({
      ...project,
      title: typeof project.title === 'object' ? project.title.en : project.title,
      description: typeof project.description === 'object' ? project.description.en : project.description,
      detailedDescription: typeof project.detailedDescription === 'object' ? project.detailedDescription.en : project.detailedDescription,
      features: typeof project.features === 'object' ? project.features.en : project.features,
      challenges: typeof project.challenges === 'object' ? project.challenges.en : project.challenges,
      lessons: typeof project.lessons === 'object' ? project.lessons.en : project.lessons
    }));
  };

  const projectsData = getProjectsData();
  const t = translations.en;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedDarkTheme = localStorage.getItem('darkTheme') || 'cyan';
    // Ak nie je v localStorage, default je dark mode
    const shouldBeDark = savedTheme === null ? true : savedTheme === 'dark';
    
    setIsDarkMode(shouldBeDark);
    setDarkTheme(savedDarkTheme);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', savedDarkTheme);
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', savedDarkTheme);
    }
  }, []);

  useEffect(() => {
    // Aplikovať tému vždy, aj v light mode
    document.documentElement.setAttribute('data-theme', darkTheme);
  }, [darkTheme, isDarkMode]);

  // Dynamicky meniť favicon podľa témy
  useEffect(() => {
    const faviconMap = {
      green: '/favicon-green.svg',
      orange: '/favicon-orange.svg',
      cyan: '/favicon-cyan.svg'
    };

    const faviconPath = faviconMap[darkTheme] || faviconMap.cyan;
    
    // Nájsť existujúci favicon link
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconPath;

    // Aktualizovať aj apple-touch-icon
    let appleLink = document.querySelector("link[rel~='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      document.getElementsByTagName('head')[0].appendChild(appleLink);
    }
    appleLink.href = faviconPath;
  }, [darkTheme]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', darkTheme);
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', darkTheme);
      localStorage.setItem('theme', 'light');
    }
  };

  const changeDarkTheme = (themeName) => {
    setDarkTheme(themeName);
    localStorage.setItem('darkTheme', themeName);
    // Aplikovať tému aj v light mode
    document.documentElement.setAttribute('data-theme', themeName);
    setShowThemeMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showThemeMenu && !event.target.closest('.theme-menu-container')) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showThemeMenu]);

  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t.projects.detail.projectNotFound}</h1>
          <button
            onClick={() => navigate('/')}
            className={`px-6 py-3 ${getThemeClasses.buttonGradient()} text-white rounded-lg ${getThemeClasses.shadowColor()} transition-colors`}
          >
            {t.projects.detail.backToHome}
          </button>
        </div>
      </div>
    );
  }

  const getThemeClasses = {
    textColor: () => {
      if (!isDarkMode) {
        const colors = {
          green: 'text-emerald-600',
          orange: 'text-orange-600',
          cyan: 'text-cyan-600'
        };
        return colors[darkTheme] || colors.cyan;
      }
      const colors = {
        green: 'text-emerald-400',
        orange: 'text-orange-400',
        cyan: 'text-cyan-400'
      };
      return colors[darkTheme] || colors.cyan;
    },
    borderColor: () => {
      if (!isDarkMode) {
        const colors = {
          green: 'border-emerald-600',
          orange: 'border-orange-600',
          cyan: 'border-cyan-600'
        };
        return colors[darkTheme] || colors.cyan;
      }
      const colors = {
        green: 'border-emerald-400',
        orange: 'border-orange-400',
        cyan: 'border-cyan-400'
      };
      return colors[darkTheme] || colors.cyan;
    },
    buttonGradient: () => {
      if (!isDarkMode) {
        const gradients = {
          green: 'bg-gradient-to-r from-emerald-600 to-teal-600',
          orange: 'bg-gradient-to-r from-orange-600 to-amber-600',
          cyan: 'bg-gradient-to-r from-cyan-600 to-blue-600'
        };
        return gradients[darkTheme] || gradients.cyan;
      }
      const gradients = {
        green: 'bg-gradient-to-r from-emerald-500 to-teal-600',
        orange: 'bg-gradient-to-r from-orange-500 to-red-600',
        cyan: 'bg-gradient-to-r from-cyan-500 to-blue-600'
      };
      return gradients[darkTheme] || gradients.cyan;
    },
    badgeBg: () => {
      if (!isDarkMode) {
        const backgrounds = {
          green: 'bg-emerald-100',
          orange: 'bg-orange-100',
          cyan: 'bg-cyan-100'
        };
        return backgrounds[darkTheme] || backgrounds.cyan;
      }
      const backgrounds = {
        green: 'bg-emerald-900/60',
        orange: 'bg-orange-900/60',
        cyan: 'bg-cyan-900/60'
      };
      return backgrounds[darkTheme] || backgrounds.cyan;
    },
    badgeText: () => {
      if (!isDarkMode) {
        const colors = {
          green: 'text-emerald-700',
          orange: 'text-orange-700',
          cyan: 'text-cyan-700'
        };
        return colors[darkTheme] || colors.cyan;
      }
      const colors = {
        green: 'text-emerald-300',
        orange: 'text-orange-300',
        cyan: 'text-cyan-300'
      };
      return colors[darkTheme] || colors.cyan;
    },
    badgeBorder: () => {
      if (!isDarkMode) {
        const borders = {
          green: 'border-emerald-200',
          orange: 'border-orange-200',
          cyan: 'border-cyan-200'
        };
        return borders[darkTheme] || borders.cyan;
      }
      const borders = {
        green: 'border-emerald-700/50',
        orange: 'border-orange-700/50',
        cyan: 'border-cyan-700/50'
      };
      return borders[darkTheme] || borders.cyan;
    },
    techBadgeBg: () => {
      if (!isDarkMode) {
        const backgrounds = {
          green: 'bg-emerald-100',
          orange: 'bg-orange-100',
          cyan: 'bg-cyan-100'
        };
        return backgrounds[darkTheme] || backgrounds.cyan;
      }
      const backgrounds = {
        green: 'bg-emerald-900/60',
        orange: 'bg-orange-900/60',
        cyan: 'bg-cyan-900/60'
      };
      return backgrounds[darkTheme] || backgrounds.cyan;
    },
    techBadgeText: () => {
      if (!isDarkMode) {
        const colors = {
          green: 'text-emerald-700',
          orange: 'text-orange-700',
          cyan: 'text-cyan-700'
        };
        return colors[darkTheme] || colors.cyan;
      }
      const colors = {
        green: 'text-emerald-300',
        orange: 'text-orange-300',
        cyan: 'text-cyan-300'
      };
      return colors[darkTheme] || colors.cyan;
    },
    techBadgeBorder: () => {
      if (!isDarkMode) {
        const borders = {
          green: 'border-emerald-200',
          orange: 'border-orange-200',
          cyan: 'border-cyan-200'
        };
        return borders[darkTheme] || borders.cyan;
      }
      const borders = {
        green: 'border-emerald-700/50',
        orange: 'border-orange-700/50',
        cyan: 'border-cyan-700/50'
      };
      return borders[darkTheme] || borders.cyan;
    },
    hoverTextColor: () => {
      if (!isDarkMode) {
        const colors = {
          green: 'hover:text-emerald-600',
          orange: 'hover:text-orange-600',
          cyan: 'hover:text-cyan-600'
        };
        return colors[darkTheme] || colors.cyan;
      }
      const colors = {
        green: 'hover:text-teal-400',
        orange: 'hover:text-red-400',
        cyan: 'hover:text-blue-400'
      };
      return colors[darkTheme] || colors.cyan;
    },
    shadowColor: () => {
      if (!isDarkMode) {
        const shadows = {
          green: 'hover:shadow-emerald-500/50',
          orange: 'hover:shadow-orange-500/50',
          cyan: 'hover:shadow-cyan-500/50'
        };
        return shadows[darkTheme] || shadows.cyan;
      }
      const shadows = {
        green: 'hover:shadow-emerald-500/50',
        orange: 'hover:shadow-orange-500/50',
        cyan: 'hover:shadow-cyan-500/50'
      };
      return shadows[darkTheme] || shadows.cyan;
    },
    // Card background - transparentné pozadie pre lepší kontrast
    cardBg: () => {
      if (!isDarkMode) return 'bg-white';
      // Transparentné pozadie - karty budú viditeľné len cez border a shadow
      return 'bg-transparent';
    },
    // Page background gradient
    pageBg: () => {
      if (!isDarkMode) {
        return 'bg-gradient-to-br from-gray-50 via-white to-gray-50';
      }
      const gradients = {
        green: 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800',
        orange: 'bg-gradient-to-br from-slate-900 via-orange-950 to-slate-800',
        cyan: 'bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-800'
      };
      return gradients[darkTheme] || gradients.cyan;
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClasses.pageBg()}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? `bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:[data-theme='green']:border-emerald-900/50 dark:[data-theme='orange']:border-orange-900/50 dark:[data-theme='cyan']:border-cyan-900/50` 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity">Portfolio</Link>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                <a href="/#home" className={`text-gray-700 dark:text-slate-200 ${getThemeClasses.hoverTextColor()} transition-colors font-medium`}>{t.nav.home}</a>
                <a href="/#about" className={`text-gray-700 dark:text-slate-200 ${getThemeClasses.hoverTextColor()} transition-colors font-medium`}>{t.nav.about}</a>
                <a href="/#skills" className={`text-gray-700 dark:text-slate-200 ${getThemeClasses.hoverTextColor()} transition-colors font-medium`}>{t.nav.skills}</a>
                <a href="/#experience" className={`text-gray-700 dark:text-slate-200 ${getThemeClasses.hoverTextColor()} transition-colors font-medium`}>{t.nav.experience}</a>
                <a href="/#projects" className={`text-gray-700 dark:text-slate-200 ${getThemeClasses.hoverTextColor()} transition-colors font-medium`}>{t.nav.projects}</a>
                <a href="/#contact" className={`text-gray-700 dark:text-slate-200 ${getThemeClasses.hoverTextColor()} transition-colors font-medium`}>{t.nav.contact}</a>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative theme-menu-container">
                    <button
                      onClick={() => setShowThemeMenu(!showThemeMenu)}
                      className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 [data-theme='green']:bg-emerald-100 dark:[data-theme='green']:bg-emerald-900/50 [data-theme='orange']:bg-orange-100 dark:[data-theme='orange']:bg-orange-900/50 [data-theme='cyan']:bg-cyan-100 dark:[data-theme='cyan']:bg-cyan-900/50 text-gray-800 dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-600 [data-theme='green']:hover:bg-emerald-200 dark:[data-theme='green']:hover:bg-emerald-800/60 [data-theme='orange']:hover:bg-orange-200 dark:[data-theme='orange']:hover:bg-orange-800/60 [data-theme='cyan']:hover:bg-cyan-200 dark:[data-theme='cyan']:hover:bg-cyan-800/60 transition-all duration-300"
                      aria-label="Choose theme"
                      title="Vybrať farebnú tému"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </button>
                    {showThemeMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 dark:[data-theme='green']:bg-slate-800 dark:[data-theme='orange']:bg-slate-800 dark:[data-theme='cyan']:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 dark:[data-theme='green']:border-emerald-800/50 dark:[data-theme='orange']:border-orange-800/50 dark:[data-theme='cyan']:border-cyan-800/50 py-2 z-50">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Farebné témy</div>
                        {Object.keys(darkThemes).map((themeName) => (
                          <button
                            key={themeName}
                            onClick={() => changeDarkTheme(themeName)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 [data-theme='green']:hover:bg-emerald-50 dark:[data-theme='green']:hover:bg-emerald-900/30 [data-theme='orange']:hover:bg-orange-50 dark:[data-theme='orange']:hover:bg-orange-900/30 [data-theme='cyan']:hover:bg-cyan-50 dark:[data-theme='cyan']:hover:bg-cyan-900/30 transition-colors flex items-center justify-between ${
                              darkTheme === themeName 
                                ? `[data-theme='green']:bg-emerald-50 dark:[data-theme='green']:bg-emerald-900/40 [data-theme='orange']:bg-orange-50 dark:[data-theme='orange']:bg-orange-900/40 [data-theme='cyan']:bg-cyan-50 dark:[data-theme='cyan']:bg-cyan-900/40 [data-theme='green']:text-emerald-600 dark:[data-theme='green']:text-emerald-400 [data-theme='orange']:text-orange-600 dark:[data-theme='orange']:text-orange-400 [data-theme='cyan']:text-cyan-600 dark:[data-theme='cyan']:text-cyan-400` 
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
                <button
                  onClick={toggleDarkMode}
                  className="p-2.5 rounded-full bg-gray-200 dark:bg-slate-700 [data-theme='green']:bg-emerald-100 dark:[data-theme='green']:bg-emerald-900/50 [data-theme='orange']:bg-orange-100 dark:[data-theme='orange']:bg-orange-900/50 [data-theme='cyan']:bg-cyan-100 dark:[data-theme='cyan']:bg-cyan-900/50 text-gray-800 dark:text-yellow-300 [data-theme='green']:text-emerald-700 dark:[data-theme='green']:text-emerald-300 [data-theme='orange']:text-orange-700 dark:[data-theme='orange']:text-orange-300 [data-theme='cyan']:text-cyan-700 dark:[data-theme='cyan']:text-cyan-300 hover:bg-gray-300 dark:hover:bg-slate-600 [data-theme='green']:hover:bg-emerald-200 dark:[data-theme='green']:hover:bg-emerald-800/60 [data-theme='orange']:hover:bg-orange-200 dark:[data-theme='orange']:hover:bg-orange-800/60 [data-theme='cyan']:hover:bg-cyan-200 dark:[data-theme='cyan']:hover:bg-cyan-800/60 transition-all duration-300 shadow-md hover:shadow-lg [data-theme='green']:shadow-emerald-500/30 dark:[data-theme='green']:shadow-emerald-900/30 [data-theme='orange']:shadow-orange-500/30 dark:[data-theme='orange']:shadow-orange-900/30 [data-theme='cyan']:shadow-cyan-500/30 dark:[data-theme='cyan']:shadow-cyan-900/30"
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

      {/* Project Detail Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4">
              <span className={`px-3 py-1 ${getThemeClasses.badgeBg()} ${getThemeClasses.badgeText()} rounded-full text-xs font-semibold border ${getThemeClasses.badgeBorder()}`}>
                {t.projects.categories[project.category] || project.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-300">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-slate-200">{t.projects.detail.technologies}</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 ${getThemeClasses.techBadgeBg()} ${getThemeClasses.techBadgeText()} rounded-lg text-sm border ${getThemeClasses.techBadgeBorder()}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div className={`${getThemeClasses.cardBg()} rounded-3xl p-8 md:p-12 mb-8`}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-slate-200">{t.projects.detail.about}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {project.detailedDescription}
              </p>
            </div>
          </div>

          {/* Features, Challenges, Lessons */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Features */}
            <div className={`${getThemeClasses.cardBg()} rounded-2xl p-6`}>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-slate-200">{t.projects.detail.features}</h3>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-slate-300 flex items-start">
                    <svg className={`w-5 h-5 mr-2 mt-0.5 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className={`${getThemeClasses.cardBg()} rounded-2xl p-6`}>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-slate-200">{t.projects.detail.challenges}</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-slate-300 flex items-start">
                    <svg className={`w-5 h-5 mr-2 mt-0.5 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lessons */}
            <div className={`${getThemeClasses.cardBg()} rounded-2xl p-6`}>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-slate-200">{t.projects.detail.lessons}</h3>
              <ul className="space-y-2">
                {project.lessons.map((lesson, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-slate-300 flex items-start">
                    <svg className={`w-5 h-5 mr-2 mt-0.5 ${getThemeClasses.textColor()} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Images Section */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-slate-200">{t.projects.detail.screenshots}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.images.map((image, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.repositoryLink && project.repositoryLink !== null && (() => {
              const isGitLab = project.repositoryLink.includes('gitlab.com');
              const isGitHub = project.repositoryLink.includes('github.com');
              return (
                <a
                  href={project.repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 ${getThemeClasses.buttonGradient()} text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center`}
                >
                  {isGitLab ? (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.042 0L9.21 8.25H.375L6 12.75 3.168 21l8.874-6.375L20.916 21 18.084 12.75 23.71 8.25H14.875L12.042 0z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482 3.97-1.32 6.833-5.08 6.833-9.503C22 6.515 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  )}
                  {isGitLab ? t.projects.detail.gitlabRepo : t.projects.detail.githubRepo}
                </a>
              );
            })()}
            <button
              onClick={() => navigate('/')}
              className={`px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border-2 ${getThemeClasses.borderColor()} rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300`}
            >
              {t.projects.detail.backToProjects}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
export { projectsDataBase };

