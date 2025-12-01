"use client";

import React from 'react';
import { Navbar } from '@/components/common/NavBar';
// Nếu bạn có Footer, hãy uncomment dòng dưới:
// import { Footer } from "@/components/common/Footer";

// Tech Stack Icons (SVG) - Giữ nguyên data của bạn
const techStack = [
  { 
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
      </svg>
    ), 
    name: 'Frontend', 
    desc: 'Next.js, React, Tailwind CSS' 
  },
  { 
    icon: (
      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4a2 2 0 01-2-2m-2-4h.01M17 16h.01"></path>
      </svg>
    ), 
    name: 'Backend', 
    desc: 'Node.js, Express, Python' 
  },
  { 
    icon: (
      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
      </svg>
    ), 
    name: 'Database', 
    desc: 'MongoDB, PostgreSQL' 
  },
  { 
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    ), 
    name: 'DevOps', 
    desc: 'Docker, AWS, Vercel' 
  },
];

const AboutUs = () => {
  return (
    // 1. KHUNG BAO NGOÀI: Thêm min-h-screen, dark:bg-neutral-950 và overflow-hidden để chứa hiệu ứng
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col transition-colors relative overflow-hidden font-sans">
      
      {/* 2. HIỆU ỨNG NỀN (Blobs): Copy từ HomePage sang */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. NAVBAR */}
      <Navbar />

      {/* 4. NỘI DUNG CHÍNH: Thêm relative z-10 để nội dung nổi lên trên nền blur */}
      <main className="relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Intro */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Developers</span>, <br/>
              For Developers.
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Hi, I'm a Web Developer passionate about building practical applications. 
              <b> //TODO Extractor</b> was created to solve a common problem we all face: 
              managing the "technical debt" hidden within our own code comments.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Tech Stack Used</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((item, index) => (
                <div key={index} className="bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors group backdrop-blur-sm">
                  <div className="mb-4 p-3 bg-gray-100 dark:bg-slate-950 rounded-lg w-fit group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why this tool?</h2>
              <div className="space-y-4 text-gray-600 dark:text-slate-400">
                <p>
                  When working on large-scale projects, leaving <code>//TODO</code> comments is a universal habit among developers. 
                  However, these notes often get lost in thousands of lines of code.
                </p>
                <p>
                  Leveraging modern web technologies (Next.js & Regex processing), I wanted to create a 
                  simple, lightweight tool to "scan" your code and bring those tasks to light.
                </p>
              </div>
            </div>
            
            {/* Decoration */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-10 rounded-full"></div>
              <div className="relative bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-slate-800 p-6 rounded-lg shadow-xl font-mono text-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-500 dark:text-slate-500 mb-2"># Developer Profile</div>
                <div className="text-purple-600 dark:text-purple-400">class <span className="text-yellow-600 dark:text-yellow-400">Developer</span> {'{'}</div>
                <div className="pl-4 text-blue-600 dark:text-blue-400">passion: <span className="text-green-600 dark:text-green-400">"Building Cool Stuff"</span>;</div>
                <div className="pl-4 text-blue-600 dark:text-blue-400">experience: <span className="text-orange-500 dark:text-orange-400">["Java", "JS", "Python"]</span>;</div>
                <div className="text-purple-600 dark:text-purple-400">{'}'}</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer (Nếu có) */}
      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;