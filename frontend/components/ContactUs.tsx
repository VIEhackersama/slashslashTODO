'use client'; 

import React, { useState } from 'react';


const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted");
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 1000);
  };

  return (
    <div className="bg-[#0B1120] text-slate-300 font-sans py-12">
        
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-slate-400">Found a bug? Have a feature request? Or just want to say hi?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-400">Your Name</label>
                  <input id="name" required type="text" placeholder="John Doe" className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-400">Email Address</label>
                  <input id="email" required type="email" placeholder="john@example.com" className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"/>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-400">Message</label>
                <textarea id="message" required rows={4} placeholder="Describe your issue or idea..." className="w-full bg-[#0B1120] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600 resize-none"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-8 pl-0 lg:pl-12">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Email Support</h3>
                <p className="text-slate-500 mt-1">support@slashslashtodo.com</p>
              </div>
            </div>
            {/* ... Thêm các icon khác nếu cần ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;