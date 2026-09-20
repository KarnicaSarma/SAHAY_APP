import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { searchLocations } from '../services/locationData';
import {
  Trees, MapPin, Search, Navigation, Globe, Bookmark, ExternalLink, X, Filter, CheckCircle2, Info
} from 'lucide-react';

export const WellbeingExplorer = () => {
  const { addToast, addAuditLog } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('Guwahati');
  const [activePreference, setActivePreference] = useState('ALL');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [inspectingPlace, setInspectingPlace] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Filtered Locations Result
  const results = searchLocations({
    query: searchQuery,
    preference: activePreference,
    categories: selectedCategories
  });

  const preferencesList = [
    { id: 'ALL', label: 'All Places', icon: '✨' },
    { id: 'Nature', label: 'Be around nature', icon: '🌳' },
    { id: 'Walking', label: 'Take a peaceful walk', icon: '🚶' },
    { id: 'Animals', label: 'Spend time around animals', icon: '🐾' },
    { id: 'Quiet time', label: 'Sit somewhere quiet', icon: '🌿' },
    { id: 'Scenic', label: 'Enjoy a scenic view', icon: '🌅' },
    { id: 'Personal time', label: 'Spend personal time', icon: '☕' }
  ];

  const categoryOptions = [
    'Nature', 'Walking', 'Quiet place', 'Animals', 'Scenic place', 'Garden/Park', 'Personal time'
  ];

  const popularCities = [
    'Guwahati', 'Bengaluru', 'Mysuru', 'Kochi', 'Chennai', 'Hyderabad',
    'Kolkata', 'Mumbai', 'Pune', 'Ahmedabad', 'Bhubaneswar', 'Chandigarh'
  ];

  const handleUseMyLocation = () => {
    setIsLocating(true);
    addToast("Requesting location access...", "info");

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          setSearchQuery('Bengaluru'); // Mock location match for demo
          addToast("Location detected: Bengaluru area matched.", "success");
          addAuditLog("Geolocation Used", "User requested browser location match for Well-being Explorer.");
        },
        (error) => {
          setIsLocating(false);
          addToast("Location access denied or unavailable. Defaulted to Guwahati.", "info");
          setSearchQuery('Guwahati');
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
      addToast("Geolocation not supported. Showing Guwahati area.", "info");
      setSearchQuery('Guwahati');
    }
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleSavePlace = (placeId) => {
    setSavedPlaces(prev =>
      prev.includes(placeId) ? prev.filter(id => id !== placeId) : [...prev, placeId]
    );
    addToast(savedPlaces.includes(placeId) ? "Removed from saved places" : "Saved place for your walk!", "success");
  };

  return (
    <div className="space-y-6 py-2 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-xl shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-0.5 rounded font-mono flex items-center gap-1">
                <Trees className="w-3.5 h-3.5" />
                SAHAY WELL-BEING EXPLORER
              </span>
              <span className="text-xs text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Low-SVI Self-Care Module
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
              Find a nearby peaceful space for rest and walks
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Nature • Quiet parks • Pedestrian walking trails • Animal-friendly spaces
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 shrink-0 text-xs">
            <Globe className="w-4 h-4 text-slate-700" />
            <span className="font-semibold text-slate-700">Language:</span>
            <select
              value={activeLanguage}
              onChange={(e) => setActiveLanguage(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 font-medium text-slate-900 focus:outline-none text-xs cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Assamese">Assamese (অসমীয়া)</option>
              <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
              <option value="Malayalam">Malayalam (മലയാളം)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
              <option value="Bengali">Bengali (বাংলা)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search & Location Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city, locality or area (e.g. Guwahati, Bengaluru, Kochi)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-slate-500 font-medium"
            />
          </div>

          <button
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs transition-colors"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Detecting...' : 'Use My Location'}</span>
          </button>
        </div>

        {/* Quick City Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="font-semibold text-slate-500 mr-1">Popular Cities:</span>
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => setSearchQuery(city)}
              className={`px-2.5 py-1 rounded-md border cursor-pointer font-medium transition-colors ${
                searchQuery.toLowerCase().includes(city.toLowerCase())
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-400'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

      </div>

      {/* Mood Preference Selector */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
        <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
          <span>What type of space are you looking for?</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {preferencesList.map((pref) => (
            <button
              key={pref.id}
              onClick={() => setActivePreference(pref.id)}
              className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                activePreference === pref.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-400'
              }`}
            >
              <span className="text-xl">{pref.icon}</span>
              <span className="text-center leading-tight text-[11px]">{pref.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Checkboxes */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-2 text-xs">
        <div className="font-semibold text-slate-500 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-700" />
          <span>Filter Features:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categoryOptions.map((cat) => (
            <label
              key={cat}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium cursor-pointer transition-colors ${
                selectedCategories.includes(cat)
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="hidden"
              />
              <span>{cat}</span>
            </label>
          ))}

          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="text-[11px] text-slate-900 font-semibold underline ml-2 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Showing <strong>{results.length}</strong> peaceful spaces near <strong>"{searchQuery}"</strong>
        </div>
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((place) => {
          const isSaved = savedPlaces.includes(place.id);
          const nativeName = place.nativeNames?.[activeLanguage] || place.nativeNames?.Assamese || place.nativeNames?.Kannada;

          return (
            <div
              key={place.id}
              className="bg-white border border-slate-200 hover:border-slate-400 rounded-xl p-5 shadow-xs space-y-3 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                
                {/* Card Top: Distance & Save */}
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                    <MapPin className="w-3 h-3 text-slate-600" />
                    {place.distance}
                  </span>

                  <button
                    onClick={() => toggleSavePlace(place.id)}
                    className="text-slate-400 hover:text-slate-900 cursor-pointer"
                    title={isSaved ? "Saved" : "Save place"}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-slate-900 text-slate-900' : ''}`} />
                  </button>
                </div>

                {/* Place Name */}
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {place.name}
                  </h3>
                  
                  {nativeName && (
                    <div className="text-xs italic text-slate-600 mt-0.5">
                      "{nativeName}"
                    </div>
                  )}
                </div>

                {/* Categories Badges */}
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {place.bestFor.map(b => (
                    <span key={b} className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                      {b === 'Nature' && '🌳 Nature'}
                      {b === 'Walking' && '🚶 Walking'}
                      {b === 'Quiet time' && '🌿 Quiet Time'}
                      {b === 'Animals' && '🐾 Animals'}
                      {b === 'Scenic' && '🌅 Scenic'}
                    </span>
                  ))}
                </div>

                {/* Why Suitable Description */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 text-xs">
                  <div className="text-[10px] font-bold text-slate-700 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-slate-700" />
                    <span>Preference match</span>
                  </div>
                  <p className="text-slate-800 text-[11px] leading-relaxed">
                    {place.whySuitable}
                  </p>
                </div>

                {/* Hours & Access */}
                <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                  <div><strong>Hours:</strong> {place.hours}</div>
                  <div><strong>Access:</strong> {place.accessibility}</div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                <button
                  onClick={() => setInspectingPlace(place)}
                  className="flex-1 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer flex items-center justify-center gap-1 shadow-xs transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Place Details</span>
                </button>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(place.name + " " + place.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
                  <span>Directions</span>
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {/* Place Details Modal */}
      {inspectingPlace && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Trees className="w-5 h-5 text-slate-800" />
                <h3 className="font-bold text-lg text-slate-900">
                  {inspectingPlace.name}
                </h3>
              </div>
              <button onClick={() => setInspectingPlace(null)} className="cursor-pointer text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-800">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="font-semibold text-slate-900">Location:</div>
                <div>{inspectingPlace.city}, {inspectingPlace.state} • {inspectingPlace.distance}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="font-semibold text-slate-900">Feature Description:</div>
                <p className="text-slate-700 leading-relaxed">
                  {inspectingPlace.whySuitable}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="font-semibold text-slate-900">Hours & Access:</div>
                <div><strong>Hours:</strong> {inspectingPlace.hours}</div>
                <div><strong>Access:</strong> {inspectingPlace.accessibility}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(inspectingPlace.name + " " + inspectingPlace.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Non-Medical Disclaimer */}
      <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-center text-xs text-slate-600 space-y-1">
        <div className="font-semibold text-slate-900 flex items-center justify-center gap-1">
          <Info className="w-4 h-4 text-slate-700" />
          <span>Non-Medical Well-Being Disclaimer</span>
        </div>
        <p className="italic text-[11px]">
          This module provides optional suggestions for outdoor or peaceful spaces for users with low distress indicators. It is not medical or psychological treatment.
        </p>
      </div>

    </div>
  );
};
