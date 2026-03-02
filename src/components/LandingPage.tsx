import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Play, Download, ArrowRight, X, ScanLine, Globe, CheckCircle, TrendingUp, Award, Users, ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// --- Types & Data ---

type Language = 'zh' | 'en';

const translations = {
  zh: {
    nav: {
      home: '首页',
      traceability: '溯源之旅',
      core: '核心硬核',
      results: '数智成果',
      impact: '社会效益',
      team: '团队与未来',
      contact: '联系我们'
    },
    hero: {
      slogan: '让每一枚好蛋都能看见光明',
      subSlogan: '可视化溯源 · 多语种赋能 · 跨境传播',
      ppt: '查看路演PPT',
      plan: '下载计划书'
    },
    traceability: {
      title: '溯源之旅',
      subtitle: '从源头解决信任危机',
      painPoints: [
        { title: '信任缺失', desc: '消费者难以辨别真正的生态好蛋' },
        { title: '信息断层', desc: '养殖过程不透明，缺乏数据支撑' },
        { title: '品牌弱势', desc: '优质农产品难以走出大山，缺乏国际视野' }
      ]
    },
    core: {
      title: '核心硬核',
      subtitle: '科技赋能每一枚鸡蛋',
      live: '可视化直播',
      liveDesc: '实时查看鸡舍动态，见证真实生态',
      cert: '一蛋一码',
      certDesc: '扫码查看检测报告，数据真实可查',
      multi: '多语种赋能',
      multiDesc: '连接全球市场，讲述中国故事'
    },
    results: {
      title: '数智成果',
      subtitle: '数据驱动品牌增长',
      price: '价格竞争力',
      growth: '营收预测',
      honor: '荣誉墙'
    },
    impact: {
      title: '社会效益',
      subtitle: '助力乡村振兴',
      stats: [
        { label: '带动农户', value: '500+' },
        { label: '增收总额', value: '200万+' },
        { label: '媒体报道', value: '30+' }
      ]
    },
    team: {
      title: '团队与未来',
      subtitle: '跨学科精英团队',
      advisor: '指导老师'
    }
  },
  en: {
    nav: {
      home: 'Home',
      traceability: 'Traceability',
      core: 'Core Tech',
      results: 'Results',
      impact: 'Impact',
      team: 'Team',
      contact: 'Contact'
    },
    hero: {
      slogan: 'Let Every Good Egg See The Light',
      subSlogan: 'Visual Traceability · Multilingual Empowerment · Cross-border Communication',
      ppt: 'View Pitch Deck',
      plan: 'Download Plan'
    },
    traceability: {
      title: 'Traceability Journey',
      subtitle: 'Solving the Trust Crisis from the Source',
      painPoints: [
        { title: 'Lack of Trust', desc: 'Consumers struggle to identify true eco-friendly eggs' },
        { title: 'Information Gap', desc: 'Opaque farming process, lack of data support' },
        { title: 'Weak Branding', desc: 'Quality products struggle to reach global markets' }
      ]
    },
    core: {
      title: 'Core Solution',
      subtitle: 'Empowering Every Egg with Tech',
      live: 'Live Stream',
      liveDesc: 'Real-time view of the coop, witnessing true ecology',
      cert: 'One Egg One Code',
      certDesc: 'Scan to view test reports, verifiable data',
      multi: 'Multilingual Power',
      multiDesc: 'Connecting global markets, telling China\'s story'
    },
    results: {
      title: 'Digital Results',
      subtitle: 'Data-Driven Brand Growth',
      price: 'Price Competitiveness',
      growth: 'Revenue Forecast',
      honor: 'Honor Wall'
    },
    impact: {
      title: 'Social Impact',
      subtitle: 'Boosting Rural Revitalization',
      stats: [
        { label: 'Farmers Helped', value: '500+' },
        { label: 'Total Income Increase', value: '2M+' },
        { label: 'Media Reports', value: '30+' }
      ]
    },
    team: {
      title: 'Team & Future',
      subtitle: 'Interdisciplinary Elite Team',
      advisor: 'Advisor'
    }
  }
};

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const t = translations[lang].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2 text-amber-500 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white">
              <span className="text-lg">🥚</span>
            </div>
            <span className={cn("hidden sm:inline", scrolled ? "text-slate-800" : "text-white")}>
              {lang === 'zh' ? '蛋启光明路' : 'The Light Egg Path'}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { key: 'home', id: 'hero' },
              { key: 'traceability', id: 'traceability' },
              { key: 'core', id: 'core' },
              { key: 'results', id: 'results' },
              { key: 'impact', id: 'impact' },
              { key: 'team', id: 'team' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-sm font-medium hover:text-amber-500 transition-colors",
                  scrolled ? "text-slate-600" : "text-white/90 hover:text-white"
                )}
              >
                {t[item.key as keyof typeof t]}
              </button>
            ))}
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="px-3 py-1 rounded-full border border-amber-500 text-amber-500 text-xs font-bold hover:bg-amber-500 hover:text-white transition-colors"
            >
              {lang === 'zh' ? 'EN' : '中'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="px-2 py-1 rounded border border-amber-500 text-amber-500 text-xs font-bold"
            >
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? "text-slate-800" : "text-white"}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {[
                  { key: 'home', id: 'hero' },
                  { key: 'traceability', id: 'traceability' },
                  { key: 'core', id: 'core' },
                  { key: 'results', id: 'results' },
                  { key: 'impact', id: 'impact' },
                  { key: 'team', id: 'team' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-slate-600 font-medium hover:text-amber-500"
                  >
                    {t[item.key as keyof typeof t]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const t = translations[lang].hero;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 bg-slate-900">
         <img 
            src="https://images.unsplash.com/photo-1516467508483-a721206076f9?q=80&w=2576&auto=format&fit=crop" 
            alt="Farm Background" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-900/90" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {t.slogan}
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 font-light max-w-3xl mx-auto">
            {t.subSlogan}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-amber-500 text-white rounded-full font-bold text-lg shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors"
            >
              <Play size={20} fill="currentColor" />
              {t.ppt}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
            >
              <Download size={20} />
              {t.plan}
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const Traceability = ({ lang }: { lang: Language }) => {
  const t = translations[lang].traceability;

  return (
    <section id="traceability" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.title}</h2>
          <p className="text-xl text-slate-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                {index === 0 ? <ScanLine /> : index === 1 ? <TrendingUp /> : <Globe />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
              <p className="text-slate-600 leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CoreFeatures = ({ lang }: { lang: Language }) => {
  const t = translations[lang].core;
  const [activeFeature, setActiveFeature] = useState<'live' | 'cert' | 'multi'>('live');
  const [showVideo, setShowVideo] = useState(false);
  const [showCertData, setShowCertData] = useState(false);

  return (
    <section id="core" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.title}</h2>
          <p className="text-xl text-slate-600">{t.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Feature Navigation */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <button
              onClick={() => setActiveFeature('live')}
              className={cn(
                "p-6 rounded-2xl text-left transition-all duration-300 border",
                activeFeature === 'live' 
                  ? "bg-amber-50 border-amber-200 shadow-md scale-105" 
                  : "bg-white border-slate-100 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={cn("p-2 rounded-lg", activeFeature === 'live' ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500")}>
                  <Play size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t.live}</h3>
              </div>
              <p className="text-slate-600 pl-14">{t.liveDesc}</p>
            </button>

            <button
              onClick={() => setActiveFeature('cert')}
              className={cn(
                "p-6 rounded-2xl text-left transition-all duration-300 border",
                activeFeature === 'cert' 
                  ? "bg-emerald-50 border-emerald-200 shadow-md scale-105" 
                  : "bg-white border-slate-100 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={cn("p-2 rounded-lg", activeFeature === 'cert' ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500")}>
                  <ScanLine size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t.cert}</h3>
              </div>
              <p className="text-slate-600 pl-14">{t.certDesc}</p>
            </button>

            <button
              onClick={() => setActiveFeature('multi')}
              className={cn(
                "p-6 rounded-2xl text-left transition-all duration-300 border",
                activeFeature === 'multi' 
                  ? "bg-sky-50 border-sky-200 shadow-md scale-105" 
                  : "bg-white border-slate-100 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={cn("p-2 rounded-lg", activeFeature === 'multi' ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500")}>
                  <Globe size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t.multi}</h3>
              </div>
              <p className="text-slate-600 pl-14">{t.multiDesc}</p>
            </button>
          </div>

          {/* Feature Display Area */}
          <div className="w-full lg:w-2/3 h-[500px] bg-slate-50 rounded-3xl border border-slate-200 relative overflow-hidden shadow-inner">
            <AnimatePresence mode="wait">
              {activeFeature === 'live' && (
                <motion.div
                  key="live"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black group cursor-pointer" onClick={() => setShowVideo(true)}>
                    <img 
                      src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1000&auto=format&fit=crop" 
                      alt="Chicken Coop" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={40} className="text-white ml-2" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      LIVE
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeature === 'cert' && (
                <motion.div
                  key="cert"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-emerald-50/50"
                >
                  {!showCertData ? (
                    <div className="text-center">
                      <motion.div 
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mb-8 relative inline-block"
                      >
                        <ScanLine size={120} className="text-emerald-500" />
                        <motion.div 
                          className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                      </motion.div>
                      <button 
                        onClick={() => setShowCertData(true)}
                        className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-600 transition-colors"
                      >
                        {lang === 'zh' ? '模拟扫码溯源' : 'Simulate Scan'}
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-emerald-100"
                    >
                      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                          <CheckCircle className="text-emerald-500" size={20} />
                          {lang === 'zh' ? '检测合格' : 'Verified Safe'}
                        </h3>
                        <span className="text-xs text-slate-400">ID: 20240520-A01</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500">{lang === 'zh' ? '产地' : 'Origin'}</span>
                          <span className="font-medium text-slate-800">{lang === 'zh' ? '天津静海' : 'Jinghai, Tianjin'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{lang === 'zh' ? '采集时间' : 'Harvest Time'}</span>
                          <span className="font-medium text-slate-800">2024-05-20 06:30</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{lang === 'zh' ? '抗生素残留' : 'Antibiotics'}</span>
                          <span className="font-medium text-emerald-600">{lang === 'zh' ? '未检出' : 'None Detected'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{lang === 'zh' ? '沙门氏菌' : 'Salmonella'}</span>
                          <span className="font-medium text-emerald-600">{lang === 'zh' ? '未检出' : 'None Detected'}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowCertData(false)}
                        className="w-full mt-6 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200"
                      >
                        {lang === 'zh' ? '返回' : 'Back'}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeFeature === 'multi' && (
                <motion.div
                  key="multi"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute inset-0 bg-sky-900 flex items-center justify-center p-8 overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-20">
                     {/* Simplified World Map Background */}
                     <svg viewBox="0 0 1000 500" className="w-full h-full fill-white">
                        <path d="M100,100 Q150,50 200,100 T300,100 T400,100" stroke="none" />
                        {/* Abstract shapes representing continents */}
                        <circle cx="200" cy="150" r="50" />
                        <circle cx="500" cy="150" r="60" />
                        <circle cx="800" cy="150" r="50" />
                        <circle cx="300" cy="350" r="40" />
                        <circle cx="600" cy="350" r="40" />
                     </svg>
                  </div>
                  
                  <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-2xl">
                    {['English', 'Français', 'Español', 'العربية'].map((l, i) => (
                      <motion.div
                        key={l}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center hover:bg-white/20 cursor-pointer transition-colors"
                      >
                        <h4 className="text-white text-xl font-bold mb-2">{l}</h4>
                        <p className="text-sky-200 text-sm">{lang === 'zh' ? '点击查看本地化文案' : 'View Localized Content'}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <button 
                className="absolute top-4 right-4 text-white hover:text-amber-500 z-10"
                onClick={(e) => { e.stopPropagation(); setShowVideo(false); }}
              >
                <X size={32} />
              </button>
              <div className="w-full h-full flex items-center justify-center text-white">
                <p className="text-xl">Video Player Placeholder (Simulating Live Stream)</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Results = ({ lang }: { lang: Language }) => {
  const t = translations[lang].results;

  const priceData = [
    { name: '普通鸡蛋 (Regular)', price: 1.2, fill: '#94a3b8' },
    { name: '光明鸡蛋 (Light Egg)', price: 2.5, fill: '#f59e0b' },
    { name: '黄天鹅 (Competitor)', price: 3.8, fill: '#fbbf24' },
  ];

  const growthData = [
    { year: '2024', revenue: 50 },
    { year: '2025', revenue: 120 },
    { year: '2026', revenue: 300 },
  ];

  return (
    <section id="results" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.title}</h2>
          <p className="text-xl text-slate-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Price Chart */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-amber-500" />
              {t.price} (RMB/Unit)
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                  <Tooltip />
                  <Bar dataKey="price" radius={[0, 4, 4, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Growth Chart */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-emerald-500" />
              {t.growth} (Ten Thousand RMB)
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Honor Wall */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Award className="text-amber-500" />
            {t.honor}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 hover:border-amber-300 transition-colors">
                <span className="text-sm">Certificate {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Impact = ({ lang }: { lang: Language }) => {
  const t = translations[lang].impact;

  return (
    <section id="impact" className="py-20 bg-emerald-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-emerald-200">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {t.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 border border-emerald-700 rounded-2xl bg-emerald-800/50 backdrop-blur-sm"
            >
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">{stat.value}</div>
              <div className="text-emerald-100 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = ({ lang }: { lang: Language }) => {
  const t = translations[lang].team;

  const members = [
    { name: 'Alice Wang', role: 'Project Lead', major: 'International Trade' },
    { name: 'Bob Li', role: 'Tech Lead', major: 'Computer Science' },
    { name: 'Charlie Zhang', role: 'Marketing', major: 'Communication' },
    { name: 'Dr. Zhao', role: 'Advisor', major: 'Psychology PhD' },
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.title}</h2>
          <p className="text-xl text-slate-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="text-center group"
            >
              <div className="w-32 h-32 mx-auto bg-slate-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg group-hover:border-amber-400 transition-colors">
                 <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                    alt={member.name}
                    className="w-full h-full"
                 />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
              <p className="text-amber-600 font-medium text-sm mb-1">{member.role}</p>
              <p className="text-slate-500 text-sm">{member.major}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-8 text-white font-bold text-2xl">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm">🥚</div>
          {lang === 'zh' ? '蛋启光明路' : 'The Light Egg Path'}
        </div>
        <p className="mb-8 max-w-md mx-auto text-sm">
          {lang === 'zh' 
            ? '致力于通过可视化溯源与多语种赋能，让中国优质农产品走向世界。' 
            : 'Dedicated to bringing high-quality Chinese agricultural products to the world through visual traceability and multilingual empowerment.'}
        </p>
        <div className="text-xs text-slate-600">
          &copy; 2024 The Light Egg Path. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  const [lang, setLang] = useState<Language>('zh');

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-amber-100 selection:text-amber-900">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Traceability lang={lang} />
      <CoreFeatures lang={lang} />
      <Results lang={lang} />
      <Impact lang={lang} />
      <Team lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
