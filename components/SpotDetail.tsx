import React from 'react';
import { Spot, Category } from '../types';

interface SpotDetailProps {
  spot: Spot;
  onBack: () => void;
}

const SpotDetail: React.FC<SpotDetailProps> = ({ spot, onBack }) => {
  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.BTS: return 'bg-purple-100 text-purple-700 border-purple-200';
      case Category.DRAMA: return 'bg-pink-100 text-pink-700 border-pink-200';
      case Category.FOOD: return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="bg-white h-full flex flex-col relative animate-[fadeIn_0.3s_ease-out]">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:bg-white transition-all text-gray-800"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Image Header */}
      <div className="h-80 w-full relative shrink-0">
        <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content Container */}
      <div className="flex-1 -mt-10 relative px-4 pb-8 overflow-y-auto no-scrollbar">
         <div className="bg-white rounded-3xl p-6 shadow-sm min-h-full">
            {/* Header Info */}
            <div className="flex flex-col gap-2 mb-6">
               <div className="flex justify-between items-start">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(spot.category)}`}>
                    {spot.category}
                  </span>
                  {spot.highlight && (
                    <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                      MUST VISIT
                    </span>
                  )}
               </div>
               <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{spot.name}</h1>
            </div>
            
            {/* Location */}
            <div className="flex items-center text-gray-600 text-sm mb-8 bg-gray-50 p-3 rounded-xl border border-gray-100">
               <div className="bg-white p-2 rounded-full shadow-sm mr-3 text-purple-600">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
               </div>
               <span className="font-medium">{spot.location}</span>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <span>📖</span> About this place
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {spot.description}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                This spot is highly recommended for fans wanting to experience the authentic vibe of Busan. 
                Whether you're recreating a scene from your favorite drama or walking in the footsteps of idols, 
                make sure to take plenty of photos! 📸
              </p>
            </div>

            {/* Fake Action Button */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-200 active:scale-95 transition-transform flex items-center justify-center gap-2">
                 <span>Add to My Itinerary</span>
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                 </svg>
              </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SpotDetail;