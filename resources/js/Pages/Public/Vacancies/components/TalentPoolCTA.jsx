import React from 'react';

const TalentPoolCTA = ({ onCvSubmit }) => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Didn't find a match?
        </h2>
        <p className="text-gray-700 mb-6">
          Submit your CV to our talent pool and we'll contact you when
          a suitable position becomes available.
        </p>
        <button 
          onClick={onCvSubmit}
          className="px-8 py-3 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors"
        >
          Submit Your CV
        </button>
      </div>
    </div>
  );
};

export default TalentPoolCTA;
