'use client';
import Image from "next/image";
import { useMemo } from "react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import React from 'react';

const tabs = [
  { label: "Home" },
  { label: "Dashboard" },
  { label: "Assets" },
  { label: "Bridge" },
  { label: "Security" },
  { label: "Settings" },
  { label: "Help" },
];

const sections = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M8 24V20C8 18.8954 8.89543 18 10 18H22C23.1046 18 24 18.8954 24 20V24" stroke="#3b82f6" strokeWidth="2"/><rect x="8" y="8" width="16" height="8" rx="4" stroke="#3b82f6" strokeWidth="2"/></svg>
    ),
    desc: "Track your portfolio, asset performance, and market trends in real time."
  },
  {
    id: "assets",
    title: "Assets",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" stroke="#3b82f6" strokeWidth="2"/><path d="M16 11V16L19 18" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    desc: "Browse and manage tokenized real-world assets: real estate, art, commodities, and more."
  },
  {
    id: "bridge",
    title: "Bridge",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M8 16H24" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/><path d="M12 12L8 16L12 20" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/><path d="M20 12L24 16L20 20" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    desc: "Seamlessly transfer assets between blockchains with our secure bridge technology."
  },
  {
    id: "security",
    title: "Security",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="8" y="14" width="16" height="8" rx="4" stroke="#3b82f6" strokeWidth="2"/><path d="M16 14V10" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    desc: "Your assets are protected by advanced cryptography and compliance standards."
  },
  {
    id: "settings",
    title: "Settings",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" stroke="#3b82f6" strokeWidth="2"/><path d="M16 10V16L20 18" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    desc: "Customize your experience, notifications, and account preferences."
  },
  {
    id: "help",
    title: "Help",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" stroke="#3b82f6" strokeWidth="2"/><path d="M16 20H16.01" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/><path d="M16 14V16" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    desc: "Need assistance? Explore our FAQ or contact support for help."
  },
];

const solanaNetwork = "https://api.mainnet-beta.solana.com";

// Custom cursor and fade-in animation
if (typeof window !== 'undefined') {
  document.body.style.cursor = 'none';
  if (!document.getElementById('custom-cursor')) {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.zIndex = '9999';
    cursor.style.width = '32px';
    cursor.style.height = '32px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '2px solid #3b82f6';
    cursor.style.background = 'rgba(59,130,246,0.08)';
    cursor.style.pointerEvents = 'none';
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.transition = 'transform 0.15s cubic-bezier(.4,0,.2,1), background 0.2s';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a,button,.card-hover').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.background = 'rgba(59,130,246,0.18)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'rgba(59,130,246,0.08)';
      });
    });
  }
  setTimeout(() => {
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.section-animate').forEach(el => observer.observe(el));
  }, 500);
}

export default function Home() {
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
  ], []);

  return (
    <ConnectionProvider endpoint={solanaNetwork}>
      <WalletProvider wallets={wallets} autoConnect>
        <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans relative overflow-x-hidden">
          {/* Subtle grid background */}
          <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-40" style={{backgroundImage:'repeating-linear-gradient(90deg,#23272f 0 1px,transparent 1px 80px),repeating-linear-gradient(180deg,#23272f 0 1px,transparent 1px 80px)'}} />
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md animate-fadein" style={{animationDelay:'0.1s'}}>
            <div className="flex items-center gap-3">
              <Image src="/raw-logo.svg" alt="RAW Logo" width={44} height={44} priority className="animate-fadein" style={{animationDelay:'0.2s'}} />
            </div>
            <nav className="hidden md:flex gap-6 text-base font-medium">
              {tabs.map(tab => (
                <a key={tab.label} href={`#${tab.label.toLowerCase()}`} className="hover:text-blue-500 transition px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {tab.label}
                </a>
              ))}
            </nav>
            <div className="ml-4 flex items-center gap-2">
              <WalletMultiButton className="!bg-zinc-900 !text-blue-500 !font-bold !rounded-lg !shadow-lg !px-4 !py-2 hover:!bg-zinc-800 transition" />
              <a href="https://x.com/realassetsworld" target="_blank" rel="noopener" aria-label="X (Twitter)" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 transition card-hover ml-2">
                <svg width="22" height="22" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="120" rx="60" fill="none"/>
                  <path fill="white" d="M34 30h14.5l11.5 17.5L71.5 30H86L62.5 60 86 90H71.5L60 73.5 48.5 90H34l23.5-30L34 30Zm17.5 0 8.5 13 8.5-13H51.5Zm0 60 8.5-13 8.5 13H51.5Z"/>
                </svg>
              </a>
            </div>
          </header>
          {/* Hero */}
          <section className="flex flex-col items-center justify-center text-center py-24 md:py-36 px-4 border-b border-zinc-800 bg-zinc-950/90 animate-fadein" style={{animationDelay:'0.2s'}}>
            <span className="text-6xl md:text-8xl font-extrabold tracking-tight text-white animate-fadein" style={{fontFamily:'Geist, Arial, sans-serif',animationDelay:'0.3s'}}>RAW</span>
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-200 mb-4 max-w-2xl animate-fadein" style={{animationDelay:'0.4s'}}>Tokenize real assets for the world. Secure. Transparent. Simple.</h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-xl animate-fadein" style={{animationDelay:'0.5s'}}>RAW is a next-generation platform for tokenizing real-world assets (RWA) on the blockchain. Unlock liquidity, transparency, and global access for any asset — from real estate to art, commodities, and more.</p>
            <a href="#dashboard" className="inline-block bg-zinc-900 text-blue-500 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-zinc-800 hover:text-blue-400 transition text-lg md:text-xl uppercase tracking-wider animate-fadein card-hover" style={{animationDelay:'0.6s'}}>Start Building</a>
          </section>
          {/* Solana Section */}
          <section className="flex flex-col items-center justify-center text-center py-16 px-4 border-b border-zinc-800 bg-zinc-950/95 animate-fadein section-animate" style={{animationDelay:'0.7s'}}>
            <div className="flex items-center gap-4 mb-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="12" fill="#18181B"/><rect x="8" y="12" width="24" height="4" rx="2" fill="#3b82f6"/><rect x="8" y="18" width="24" height="4" rx="2" fill="#3b82f6" opacity="0.7"/><rect x="8" y="24" width="24" height="4" rx="2" fill="#3b82f6" opacity="0.5"/></svg>
              <span className="text-2xl md:text-3xl font-bold text-blue-500">Solana Supported</span>
            </div>
            <p className="text-lg md:text-xl text-zinc-300 max-w-xl mb-4">RAW natively supports <span className="font-bold text-blue-500">Solana</span> for ultra-fast, low-fee transactions and seamless wallet integration. Build, transfer, and manage assets on one of the most advanced blockchains.</p>
            <WalletMultiButton className="!bg-zinc-900 !text-blue-500 !font-bold !rounded-lg !shadow-lg !px-6 !py-3 hover:!bg-zinc-800 transition" />
          </section>
          {/* Main Content */}
          <main className="max-w-5xl mx-auto px-4 flex flex-col gap-12 pb-24 mt-12">
            {sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-center gap-6 section-animate" style={{animationDelay: `${0.8 + idx * 0.1}s`}}>
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 mb-4 md:mb-0 card-hover transition-transform duration-200 will-change-transform hover:scale-105 hover:border-blue-500">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{section.title}</h2>
                  <p className="text-lg md:text-xl text-zinc-300">{section.desc}</p>
                </div>
              </section>
            ))}
          </main>
          {/* Scroll to top */}
          <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="fixed bottom-8 right-8 z-50 bg-zinc-900 text-blue-500 rounded-full p-3 shadow-lg hover:bg-zinc-800 transition card-hover" aria-label="Scroll to top">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 19V5M12 5L5 12M12 5l7 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}
