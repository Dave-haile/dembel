import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription logic here
      console.log('Newsletter subscription:', email);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Mail size={48} className="text-blue-200 mx-auto mb-6" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Subscribe to get the latest offers & events at Dembel City Center
          </p>
        </div>

        {isSubscribed ? (
          <div className="bg-green-500 text-white p-6 rounded-lg max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="font-semibold">Successfully subscribed!</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center group whitespace-nowrap"
              >
                Subscribe
                <ArrowRight 
                  size={20} 
                  className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                />
              </button>
            </div>
          </form>
        )}

        <p className="text-blue-200 text-sm mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;