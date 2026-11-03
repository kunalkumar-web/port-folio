import React from 'react';

export interface JJKCharacter {
  id: string;
  name: string;
  japaneseName: string;
  title: string;
  grade: string;
  domain: string;
  technique: string;
  description: string;
  quote: string;
  energyColor: 'red' | 'purple' | 'violet' | 'white' | 'crimson';
  colorHex: string;
  svgIcon: React.ReactNode;
}

// Crisp Vector SVGs for JJK Characters ensuring zero distortion at any resolution
export const SukunaSVG: React.FC<{ className?: string; color?: string }> = ({ className = "w-full h-full", color = "#ef4444" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Background cursed circle */}
    <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
    <circle cx="100" cy="100" r="82" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
    {/* Sukuna Face Markings */}
    {/* Forehead Eye Mark */}
    <ellipse cx="100" cy="60" rx="14" ry="7" fill="none" stroke={color} strokeWidth="3" />
    <circle cx="100" cy="60" r="3" fill="#ffffff" />
    <path d="M82 58 Q100 45 118 58" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Left Eye & Cheek Marking */}
    <path d="M60 85 Q75 75 90 85 Q75 95 60 85 Z" fill="#18181b" stroke={color} strokeWidth="2.5" />
    <circle cx="75" cy="85" r="4" fill="#ffffff" />
    {/* Secondary Eye Left */}
    <ellipse cx="64" cy="72" rx="6" ry="3.5" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="64" cy="72" r="1.5" fill="#ef4444" />
    {/* Left Cheek Bands */}
    <path d="M50 96 L66 112 M42 108 L58 124 M38 122 L52 136" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Right Eye & Cheek Marking */}
    <path d="M140 85 Q125 75 110 85 Q125 95 140 85 Z" fill="#18181b" stroke={color} strokeWidth="2.5" />
    <circle cx="125" cy="85" r="4" fill="#ffffff" />
    {/* Secondary Eye Right */}
    <ellipse cx="136" cy="72" rx="6" ry="3.5" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="136" cy="72" r="1.5" fill="#ef4444" />
    {/* Right Cheek Bands */}
    <path d="M150 96 L134 112 M158 108 L142 124 M162 122 L148 136" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Nose */}
    <path d="M96 92 L100 108 L105 108" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Menacing Grin with Fangs */}
    <path d="M68 130 Q100 160 132 130" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M72 132 Q100 148 128 132" fill="#09090b" stroke="#ffffff" strokeWidth="1.5" />
    <path d="M80 132 L84 139 L88 133 M112 133 L116 139 L120 132" stroke="#ffffff" strokeWidth="2" fill="#ffffff" />
    <path d="M88 142 L92 135 L96 142 M104 142 L108 135 L112 142" stroke="#ffffff" strokeWidth="2" fill="#ffffff" />
    
    {/* Chin & Jaw Marking */}
    <circle cx="100" cy="162" r="4" fill={color} />
    <path d="M92 168 L100 176 L108 168" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Slicing Cleave Aura Lines */}
    <path d="M20 40 L180 160" stroke={color} strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
    <path d="M180 30 L20 170" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
  </svg>
);

export const GojoSVG: React.FC<{ className?: string; color?: string }> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Infinity circles */}
    <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="2" opacity="0.5" />
    <circle cx="100" cy="100" r="76" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
    <circle cx="100" cy="100" r="64" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
    
    {/* Gojo Blindfold / Band */}
    <path d="M30 75 Q100 70 170 75 L168 105 Q100 110 32 105 Z" fill="#09090b" stroke={color} strokeWidth="2.5" />
    
    {/* Glowing Eye Peeking (Six Eyes) */}
    <ellipse cx="75" cy="90" rx="16" ry="6" fill="#3b82f6" opacity="0.8" />
    <ellipse cx="75" cy="90" rx="10" ry="4" fill="#60a5fa" />
    <circle cx="75" cy="90" r="3" fill="#ffffff" />
    <ellipse cx="125" cy="90" rx="16" ry="6" fill="#a855f7" opacity="0.8" />
    <ellipse cx="125" cy="90" rx="10" ry="4" fill="#c084fc" />
    <circle cx="125" cy="90" r="3" fill="#ffffff" />

    {/* White Spiky Hair Silhouette */}
    <path d="M40 75 L30 50 L55 58 L50 32 L75 48 L85 24 L100 45 L115 24 L125 48 L150 32 L145 58 L170 50 L160 75 Z" fill="#f4f4f5" stroke={color} strokeWidth="2" />

    {/* Smile & Chin */}
    <path d="M96 122 L100 130 L104 130" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M82 145 Q100 156 118 145" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M70 115 L100 180 L130 115" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />

    {/* Hollow Purple Convergence Vectors */}
    <path d="M35 150 Q100 120 165 150" stroke="#ef4444" strokeWidth="2" opacity="0.7" />
    <path d="M35 160 Q100 130 165 160" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
    <circle cx="100" cy="140" r="8" fill={color} opacity="0.9" />
    <circle cx="100" cy="140" r="3" fill="#ffffff" />
  </svg>
);

export const MegumiMahoragaSVG: React.FC<{ className?: string; color?: string }> = ({ className = "w-full h-full", color = "#6366f1" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Eight-Handled Wheel (Mahoraga Wheel / Dharma Wheel) */}
    <circle cx="100" cy="80" r="45" stroke={color} strokeWidth="3" />
    <circle cx="100" cy="80" r="16" fill="#09090b" stroke="#ffffff" strokeWidth="2" />
    
    {/* 8 Handles */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 100 + Math.cos(rad) * 16;
      const y1 = 80 + Math.sin(rad) * 16;
      const x2 = 100 + Math.cos(rad) * 45;
      const y2 = 80 + Math.sin(rad) * 45;
      const x3 = 100 + Math.cos(rad) * 58;
      const y3 = 80 + Math.sin(rad) * 58;
      return (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
          <circle cx={x3} cy={y3} r="5" fill="#ffffff" stroke={color} strokeWidth="2" />
        </g>
      );
    })}

    {/* Shadow Claws / Chimera Wings */}
    <path d="M40 140 Q60 110 90 145 Q70 175 40 140 Z" fill="#18181b" stroke={color} strokeWidth="2" />
    <path d="M160 140 Q140 110 110 145 Q130 175 160 140 Z" fill="#18181b" stroke={color} strokeWidth="2" />
    <path d="M75 165 Q100 135 125 165 L100 185 Z" fill="#09090b" stroke="#ffffff" strokeWidth="2" />
  </svg>
);

export const YujiBlackFlashSVG: React.FC<{ className?: string; color?: string }> = ({ className = "w-full h-full", color = "#ef4444" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Black Flash Lightning Impact Sparks */}
    <circle cx="100" cy="100" r="85" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
    
    {/* Central Fist Outline */}
    <path d="M80 75 C80 65 95 65 95 75 L95 105 C95 110 90 115 85 115 C80 115 75 110 75 105 Z" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
    <path d="M95 70 C95 60 110 60 110 70 L110 105" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
    <path d="M110 75 C110 65 125 65 125 75 L125 105" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
    <path d="M125 85 C125 78 138 78 138 85 L138 110" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
    
    {/* Black Flash Crimson-Black Lightning Bolts */}
    <path d="M100 30 L90 70 L120 75 L85 130 L110 120 L70 175" stroke="#000000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M100 30 L90 70 L120 75 L85 130 L110 120 L70 175" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M100 30 L90 70 L120 75 L85 130 L110 120 L70 175" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    
    <path d="M150 50 L125 85 L145 90 L115 145" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M50 140 L75 105 L60 100 L85 60" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const YutaRikaSVG: React.FC<{ className?: string; color?: string }> = ({ className = "w-full h-full", color = "#8b5cf6" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Engagement Ring / Bound Curse Seal */}
    <ellipse cx="100" cy="95" rx="55" ry="30" stroke={color} strokeWidth="4" />
    <ellipse cx="100" cy="95" rx="42" ry="20" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="100" cy="65" r="10" fill="#ffffff" stroke={color} strokeWidth="3" />
    <path d="M96 60 L104 70 M104 60 L96 70" stroke={color} strokeWidth="2" />

    {/* Rika monstrous claws & eyes */}
    <path d="M30 110 Q50 60 90 85 Q70 130 30 110 Z" fill="#18181b" stroke={color} strokeWidth="2" />
    <path d="M170 110 Q150 60 110 85 Q130 130 170 110 Z" fill="#18181b" stroke={color} strokeWidth="2" />
    
    <circle cx="70" cy="140" r="6" fill="#ef4444" />
    <circle cx="130" cy="140" r="6" fill="#ef4444" />
    <path d="M60 165 Q100 190 140 165" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const JJK_CHARACTERS: JJKCharacter[] = [
  {
    id: 'sukuna',
    name: 'Ryomen Sukuna',
    japaneseName: '両面 宿儺',
    title: 'The King of Curses & Calamity',
    grade: 'Special Grade (Heian Era)',
    domain: 'Malevolent Shrine (伏魔御廚子 - Fukuma Mizushi)',
    technique: 'Dismantle & Cleave (解・捌), Fire Arrow (竈 - Fūga)',
    description: 'The undisputed King of Curses whose domain manifests without an enclosed barrier, slicing everything within a 200m radius into atomized fragments.',
    quote: '"Stand proud. You are strong."',
    energyColor: 'crimson',
    colorHex: '#ef4444',
    svgIcon: <SukunaSVG color="#ef4444" />,
  },
  {
    id: 'gojo',
    name: 'Gojo Satoru',
    japaneseName: '五条 悟',
    title: 'The Honored One',
    grade: 'Special Grade Jujutsu Sorcerer',
    domain: 'Unlimited Void (無量空処 - Muryōkūsho)',
    technique: 'Limitless (無下限), Infinity, Red, Blue, Hollow Purple (茈)',
    description: 'Possessor of the Six Eyes and Limitless technique, commanding absolute spatial manipulation and an endless stream of pure information.',
    quote: '"Throughout heaven and earth, I alone am the honored one."',
    energyColor: 'violet',
    colorHex: '#a855f7',
    svgIcon: <GojoSVG color="#a855f7" />,
  },
  {
    id: 'megumi',
    name: 'Megumi Fushiguro',
    japaneseName: '伏黒 恵',
    title: 'Master of Ten Shadows & Mahoraga',
    grade: 'Grade 1 Sorcerer (Zenin Heir)',
    domain: 'Chimera Shadow Garden (嵌合暗翳庭)',
    technique: 'Ten Shadows Technique (十種影法術), Mahoraga Adaptation',
    description: 'Summoner of the Eight-Handled Sword Divergent Sila Divine General Mahoraga, capable of adapting to any and all phenomena.',
    quote: '"With this treasure, I summon..."',
    energyColor: 'purple',
    colorHex: '#6366f1',
    svgIcon: <MegumiMahoragaSVG color="#6366f1" />,
  },
  {
    id: 'yuji',
    name: 'Yuji Itadori',
    japaneseName: '虎杖 悠仁',
    title: 'Vessel of Sukuna & Black Flash Master',
    grade: 'Special Grade Potential',
    domain: 'Soul Resonance Domain (魂の領域)',
    technique: 'Divergent Fist, Consecutive Black Flash (黒閃), Blood Manipulation',
    description: 'A physical anomaly who holds the world record for consecutive Black Flash strikes, striking at the core boundary of the soul itself.',
    quote: '"I will save people, even if it means dying alone."',
    energyColor: 'red',
    colorHex: '#dc2626',
    svgIcon: <YujiBlackFlashSVG color="#dc2626" />,
  },
  {
    id: 'yuta',
    name: 'Yuta Okkotsu',
    japaneseName: '乙骨 憂太',
    title: 'The Queen of Curses Bound Sorcerer',
    grade: 'Special Grade Sorcerer',
    domain: 'Authentic Mutual Love (真贋相愛)',
    technique: 'Cursed Technique Copy, Reverse Cursed Energy, Rika Manifestation',
    description: 'Possesses boundless cursed energy output, wielding a domain filled with infinite katanas imbued with copied cursed techniques.',
    quote: '"It’s pure love."',
    energyColor: 'white',
    colorHex: '#e4e4e7',
    svgIcon: <YutaRikaSVG color="#8b5cf6" />,
  },
];
