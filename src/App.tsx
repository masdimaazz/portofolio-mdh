import { useState, useEffect } from 'react';
import PortfolioHero from '@/components/ui/portfolio-hero';
import HalideLanding from '@/components/ui/halide-landing';
import { Component as HalideTopoHero } from '@/components/ui/halide-topo-hero';
import { Settings, RefreshCw, X, Sliders, Layout, Sparkles } from 'lucide-react';
import localAvatar from './assets/avatar.jpg';

function App() {
  // Load configuration state from localStorage or use defaults
  const [activeHero, setActiveHero] = useState<'portfolio' | 'halide'>(() => {
    return (localStorage.getItem('config_activeHero') as 'portfolio' | 'halide') || 'portfolio';
  });

  const [firstName, setFirstName] = useState(() => {
    return localStorage.getItem('config_firstName') || 'ALEX';
  });

  const [lastName, setLastName] = useState(() => {
    return localStorage.getItem('config_lastName') || 'KANE';
  });

  const [tagline, setTagline] = useState(() => {
    return localStorage.getItem('config_tagline') || 'Designing human experiences in code.';
  });

  const [profileImg, setProfileImg] = useState(() => {
    return localStorage.getItem('config_profileImg') || localAvatar;
  });

  const [signature, setSignature] = useState(() => {
    return localStorage.getItem('config_signature') || 'A';
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('config_accentColor') || '#C3E41D';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('config_isDark');
    return saved === null ? true : saved === 'true';
  });

  const [halideTitle, setHalideTitle] = useState(() => {
    return localStorage.getItem('config_halideTitle') || 'SILVER SULPHIDE';
  });

  // Admin panel visibility
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('config_activeHero', activeHero);
    localStorage.setItem('config_firstName', firstName);
    localStorage.setItem('config_lastName', lastName);
    localStorage.setItem('config_tagline', tagline);
    localStorage.setItem('config_profileImg', profileImg);
    localStorage.setItem('config_signature', signature);
    localStorage.setItem('config_accentColor', accentColor);
    localStorage.setItem('config_isDark', String(isDark));
    localStorage.setItem('config_halideTitle', halideTitle);
  }, [activeHero, firstName, lastName, tagline, profileImg, signature, accentColor, isDark, halideTitle]);

  const handleReset = () => {
    if (window.confirm('Reset all values to project defaults?')) {
      setActiveHero('portfolio');
      setFirstName('ALEX');
      setLastName('KANE');
      setTagline('Designing human experiences in code.');
      setProfileImg(localAvatar);
      setSignature('A');
      setAccentColor('#C3E41D');
      setIsDark(true);
      setHalideTitle('SILVER SULPHIDE');
    }
  };

  const handleUseAvatar = (type: 'local' | 'unsplash') => {
    if (type === 'local') {
      setProfileImg(localAvatar);
    } else {
      setProfileImg('https://i.postimg.cc/y8DnKLyK/albert-dera-ILip77-Sbm-OE-unsplash.jpg');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Active Hero Page */}
      {activeHero === 'portfolio' ? (
        <PortfolioHero
          firstName={firstName}
          lastName={lastName}
          tagline={tagline}
          profileImg={profileImg}
          signature={signature}
          isDark={isDark}
          accentColor={accentColor}
          onToggleTheme={() => setIsDark(!isDark)}
        />
      ) : (
        <HalideLanding
          title={halideTitle}
          accentColor={accentColor}
        />
      )}

      {/* Floating Counter Component (Bottom Left) for testing halide-topo-hero */}
      <div className="fixed bottom-6 left-6 z-40 max-w-xs transition-all duration-300">
        <div className="glass-panel p-2 bg-black/75 border border-white/10 rounded-xl backdrop-blur-md shadow-lg scale-90 origin-bottom-left hover:scale-100 transition-transform">
          <p className="text-[10px] text-neutral-400 font-mono mb-1 text-center uppercase tracking-widest border-b border-white/5 pb-1">
            Component Testing
          </p>
          <HalideTopoHero />
        </div>
      </div>

      {/* Floating Settings Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsAdminOpen(!isAdminOpen)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-900 text-white border border-neutral-800 hover:border-neutral-700 shadow-2xl hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500 text-[#C3E41D]" />
          <span className="font-semibold text-sm tracking-wide">ADMIN PANEL</span>
          {/* Subtle pulse badge */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C3E41D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C3E41D]"></span>
          </span>
        </button>
      </div>

      {/* Admin Panel Panel */}
      {isAdminOpen && (
        <div
          className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-neutral-800 p-6 z-50 overflow-y-auto max-h-[70vh] flex flex-col gap-6 shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: 'rgba(10, 10, 10, 0.9)',
            backdropFilter: 'blur(20px)',
            color: '#e0e0e0',
          }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#C3E41D]" />
              <h2 className="font-bold text-lg tracking-tight uppercase font-mono">Control Center</h2>
            </div>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section: Layout Switcher */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold font-mono tracking-wider text-neutral-400 flex items-center gap-1.5 uppercase">
              <Layout className="w-3.5 h-3.5" />
              Active Hero Theme
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => setActiveHero('portfolio')}
                className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                  activeHero === 'portfolio'
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                Portfolio Hero
              </button>
              <button
                onClick={() => setActiveHero('halide')}
                className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                  activeHero === 'halide'
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                Halide 3D
              </button>
            </div>
          </div>

          {/* Settings depending on theme */}
          {activeHero === 'portfolio' ? (
            <div className="flex flex-col gap-4">
              <div className="border-t border-neutral-900 pt-3">
                <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded font-mono uppercase tracking-widest">
                  Portfolio Hero Settings
                </span>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-neutral-400">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value.toUpperCase())}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-sm focus:border-white outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-neutral-400">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.toUpperCase())}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-sm focus:border-white outline-none"
                  />
                </div>
              </div>

              {/* Tagline Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-neutral-400">Tagline Description</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-sm focus:border-white outline-none"
                />
              </div>

              {/* Signature Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-neutral-400">Cursive Signature Letter</label>
                <input
                  type="text"
                  maxLength={3}
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-sm focus:border-white outline-none"
                />
              </div>

              {/* Avatar Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold text-neutral-400">Profile Image</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUseAvatar('local')}
                    className={`flex-1 py-1.5 rounded text-xs border font-medium cursor-pointer ${
                      profileImg === localAvatar
                        ? 'bg-neutral-800 border-neutral-700 text-white'
                        : 'bg-transparent border-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    3D Pixar Avatar
                  </button>
                  <button
                    onClick={() => handleUseAvatar('unsplash')}
                    className={`flex-1 py-1.5 rounded text-xs border font-medium cursor-pointer ${
                      profileImg !== localAvatar
                        ? 'bg-neutral-800 border-neutral-700 text-white'
                        : 'bg-transparent border-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Unsplash Mockup
                  </button>
                </div>
                <input
                  type="text"
                  value={profileImg === localAvatar ? 'Using local 3D avatar asset' : profileImg}
                  disabled={profileImg === localAvatar}
                  onChange={(e) => setProfileImg(e.target.value)}
                  placeholder="Or paste direct image URL here..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-xs focus:border-white outline-none mt-1 disabled:opacity-50"
                />
              </div>

              {/* Color Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-neutral-400">Accent Neon Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded border border-neutral-800 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1 text-sm focus:border-white outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="border-t border-neutral-900 pt-3">
                <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded font-mono uppercase tracking-widest">
                  Halide 3D Theme Settings
                </span>
              </div>

              {/* Halide Title */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-neutral-400">Hero Large Title</label>
                <input
                  type="text"
                  value={halideTitle}
                  onChange={(e) => setHalideTitle(e.target.value.toUpperCase())}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-sm focus:border-white outline-none"
                />
              </div>

              {/* Accent Color for Halide */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-neutral-400">Accent Neon Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded border border-neutral-800 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1 text-sm focus:border-white outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold hover:text-white transition-colors cursor-pointer border border-neutral-800"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
            <button
              onClick={() => {
                setIsAdminOpen(false);
                alert('Settings saved to local storage!');
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Apply & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
