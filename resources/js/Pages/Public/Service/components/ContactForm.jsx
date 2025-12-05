import React, { useState } from 'react';

export const ContactForm = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000); // Reset status after 5s
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 bg-primary text-white">
        <h3 className="text-xl font-serif font-medium">Get in Touch</h3>
        <p className="text-slate-300 text-sm mt-1">We typically reply within 24 hours.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">Full Name</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">Email Address</label>
          <input
            name="email"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">Subject</label>
          <input
            name="subject"
            required
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            placeholder="Inquiry about..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">Message</label>
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
            placeholder="How can we help you?"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`w-full py-4 px-6 rounded-lg font-bold text-white uppercase tracking-widest text-sm transition-all duration-300 ${
            status === 'success' 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-accent-700 hover:bg-amber-700'
          } disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1`}
        >
          {status === 'submitting' ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : status === 'success' ? (
            'Message Sent!'
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};