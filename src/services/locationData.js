// SAHAY Well-being Explorer — Local Multi-State Peaceful Location Dataset
// Embedded with real latitude & longitude coordinates for Leaflet map view

export const WELLBEING_LOCATIONS = [
  // DELHI (New City Scope)
  {
    id: "LOC-DEL-001",
    state: "Delhi",
    city: "Delhi",
    name: "Lodhi Gardens & Heritage Park",
    nativeNames: {
      Hindi: "लोधी गार्डन",
      Punjabi: "ਲੋਧੀ ਗਾਰਡਨ"
    },
    address: "Lodhi Road, Khan Market, New Delhi, Delhi 110003",
    latitude: 28.5931,
    longitude: 77.2197,
    categories: ["Nature", "Parks", "Quiet Spaces", "Culture"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "1.5 km from Khan Market Metro",
    whySuitable: "Sprawling 90-acre historic park with shaded walking tracks, lotus ponds, ancient monuments, and expansive green lawns.",
    hours: "6:00 AM – 7:30 PM Daily",
    accessibility: "Flat paved walking loops, wheelchair access ramps, public benches throughout",
    isDemoData: true
  },
  {
    id: "LOC-DEL-002",
    state: "Delhi",
    city: "Delhi",
    name: "Sunder Nursery Heritage Park",
    nativeNames: {
      Hindi: "सुंदर नर्सरी",
      Punjabi: "ਸੁੰਦਰ ਨਰਸਰੀ"
    },
    address: "Opposite Humayun Tomb, Nizamuddin, New Delhi, Delhi 110013",
    latitude: 28.5901,
    longitude: 77.2483,
    categories: ["Nature", "Parks", "Quiet Spaces", "Wellness"],
    bestFor: ["Nature", "Quiet time", "Scenic"],
    distance: "0.8 km from Nizamuddin Station",
    whySuitable: "Restored 90-acre UNESCO heritage park featuring botanical micro-forests, peaceful water channels, and quiet shaded pavilions.",
    hours: "7:00 AM – 7:00 PM Daily",
    accessibility: "Wheelchair accessible paved paths, designated quiet zones, visitor amenities",
    isDemoData: true
  },
  {
    id: "LOC-DEL-003",
    state: "Delhi",
    city: "Delhi",
    name: "Nehru Park & Chanakyapuri Green Belt",
    nativeNames: {
      Hindi: "नेहरू पार्क चाणक्यपुरी",
      Punjabi: "ਨੇਹਰੂ ਪਾਰਕ"
    },
    address: "Vinay Marg, Chanakyapuri, New Delhi, Delhi 110021",
    latitude: 28.5862,
    longitude: 77.1953,
    categories: ["Parks", "Nature", "Quiet Spaces", "Wellness"],
    bestFor: ["Walking", "Quiet time", "Nature"],
    distance: "2.0 km from Lok Kalyan Marg Metro",
    whySuitable: "Expansive 80-acre landscaped park in diplomatic zone with tranquil walking trails and quiet shaded seating.",
    hours: "5:00 AM – 8:00 PM Daily",
    accessibility: "Paved circular walking track, grassy knolls, accessible parking",
    isDemoData: true
  },
  {
    id: "LOC-DEL-004",
    state: "Delhi",
    city: "Delhi",
    name: "India Habitat Centre Courtyards",
    nativeNames: {
      Hindi: "इण्डिया हैबिटैट सेंटर",
      Punjabi: "ਇੰਡੀਆ ਹੈਬੀਟੇਟ ਸੈਂਟਰ"
    },
    address: "Lodhi Road, Near Air Force Bal Bharati School, New Delhi, Delhi 110003",
    latitude: 28.5894,
    longitude: 77.2248,
    categories: ["Culture", "Quiet Spaces", "Community"],
    bestFor: ["Quiet time", "Personal time", "Culture"],
    distance: "0.5 km from Lodhi Garden",
    whySuitable: "Serene open-air architectural courtyards with art galleries, shade canopy screens, and quiet seating niches.",
    hours: "10:00 AM – 8:00 PM Daily",
    accessibility: "Ramp and elevator access throughout galleries and courtyards",
    isDemoData: true
  },
  {
    id: "LOC-DEL-005",
    state: "Delhi",
    city: "Delhi",
    name: "Garden of Five Senses",
    nativeNames: {
      Hindi: "ज्ञान एवं पांच इंद्रिय उद्यान",
      Punjabi: "ਗਾਰਡਨ ਆਫ਼ ਫਾਈਵ ਸੈਂਸਿਸ"
    },
    address: "Westend Marg, Saidul Ajaib, Saket, New Delhi, Delhi 110030",
    latitude: 28.5132,
    longitude: 77.1979,
    categories: ["Nature", "Parks", "Wellness", "Quiet Spaces"],
    bestFor: ["Nature", "Scenic", "Quiet time"],
    distance: "1.0 km from Saket Metro",
    whySuitable: "Specially designed 20-acre sensory garden with bamboo paths, solar energy park, and tranquil rock gardens.",
    hours: "9:00 AM – 6:00 PM Daily",
    accessibility: "Stepped and stone paved paths, shaded pavilions",
    isDemoData: true
  },
  {
    id: "LOC-DEL-006",
    state: "Delhi",
    city: "Delhi",
    name: "Hauz Khas Deer Park & Lake Walk",
    nativeNames: {
      Hindi: "हौज खास डियर पार्क",
      Punjabi: "ਹੌਜ਼ ਖਾਸ ਡੀਅਰ ਪਾਰਕ"
    },
    address: "Hauz Khas Enclave, New Delhi, Delhi 110016",
    latitude: 28.5528,
    longitude: 77.1947,
    categories: ["Nature", "Parks", "Quiet Spaces", "Community"],
    bestFor: ["Nature", "Walking", "Animals"],
    distance: "1.2 km from IIT Metro",
    whySuitable: "Green forest cover with deer enclosure, duck lake perimeter, and peaceful earthen walking trails.",
    hours: "5:00 AM – 7:30 PM Daily",
    accessibility: "Paved perimeter path, shaded wooden benches",
    isDemoData: true
  },

  // ASSAM (Guwahati)
  {
    id: "LOC-ASSAM-001",
    state: "Assam",
    city: "Guwahati",
    name: "Assam State Zoo cum Botanical Garden",
    nativeNames: {
      Assamese: "অসম ৰাজ্যিক চিৰিয়াখানা আৰু উদ্ভিদ উদ্যান",
      Hindi: "असम राज्य प्राणी उद्यान एवं वनस्पति उद्यान",
      Bengali: "আসাম রাজ্য চিড়িয়াখানা ও উদ্ভিদ উদ্যান"
    },
    address: "RG Baruah Road, Sundarpur, Guwahati, Assam 781005",
    latitude: 26.1602,
    longitude: 91.7825,
    categories: ["Nature", "Parks", "Wellness"],
    bestFor: ["Nature", "Animals", "Walking"],
    distance: "2.4 km from city center",
    whySuitable: "Suitable for spending relaxed outdoor time surrounded by lush natural greenery and animal habitats.",
    hours: "8:00 AM – 4:30 PM (Closed Fridays)",
    accessibility: "Wheelchair accessible pathways, shaded benches & drinking water available",
    isDemoData: true
  },
  {
    id: "LOC-ASSAM-002",
    state: "Assam",
    city: "Guwahati",
    name: "Dighalipukhuri Park & Waterfront",
    nativeNames: {
      Assamese: "দীঘলীপুখুৰী উদ্যান",
      Hindi: "दीघलीपुखुरी पार्क",
      Bengali: "দীঘলীপুকুর উদ্যান"
    },
    address: "Dighalipukhuri East Bank, Dighalipukhuri, Guwahati, Assam 781001",
    latitude: 26.1884,
    longitude: 91.7516,
    categories: ["Parks", "Nature", "Quiet Spaces"],
    bestFor: ["Walking", "Quiet time", "Scenic"],
    distance: "1.1 km",
    whySuitable: "Historic water body with paved walking trails, tall shade trees, and quiet seating benches.",
    hours: "6:00 AM – 8:00 PM Daily",
    accessibility: "Flat paved walking path, rest pavilions",
    isDemoData: true
  },
  {
    id: "LOC-ASSAM-003",
    state: "Assam",
    city: "Guwahati",
    name: "Deepor Beel Wetland & Bird Sanctuary Area",
    nativeNames: {
      Assamese: "দীপৰ বিল পক্ষী অভয়াৰণ্য",
      Hindi: "दीपर बील पक्षी अभयारण्य"
    },
    address: "Deepor Beel, Rani Khamar, Guwahati, Assam 781017",
    latitude: 26.1264,
    longitude: 91.6575,
    categories: ["Nature", "Quiet Spaces"],
    bestFor: ["Nature", "Scenic", "Animals"],
    distance: "8.5 km",
    whySuitable: "Expansive natural wetland area suitable for watching migratory birds and taking peaceful walks in nature.",
    hours: "6:00 AM – 5:00 PM Daily",
    accessibility: "Natural trails, watchtower access",
    isDemoData: true
  },
  {
    id: "LOC-ASSAM-004",
    state: "Assam",
    city: "Guwahati",
    name: "Basistha Ashram Nature Surroundings",
    nativeNames: {
      Assamese: "বশিষ্ট আশ্ৰম প্ৰাকৃতিক পৰিৱেশ",
      Hindi: "वशिष्ठ आश्रम प्राकृतिक परिसर"
    },
    address: "Basistha Temple Road, Basistha, Guwahati, Assam 781029",
    latitude: 26.0967,
    longitude: 91.7876,
    categories: ["Quiet Spaces", "Nature", "Culture"],
    bestFor: ["Quiet time", "Nature"],
    distance: "11 km",
    whySuitable: "Peaceful mountain stream surroundings with gentle running water and dense green hillside cover.",
    hours: "6:00 AM – 6:00 PM",
    accessibility: "Step access to stream, stone pathways",
    isDemoData: true
  },

  // KARNATAKA (Bengaluru)
  {
    id: "LOC-KAR-001",
    state: "Karnataka",
    city: "Bengaluru",
    name: "Cubbon Park",
    nativeNames: {
      Kannada: "ಕಬ್ಬನ್ ಪಾರ್ಕ್",
      Hindi: "कब्बन पार्क"
    },
    address: "Kasturba Road, Sampangi Rama Nagara, Bengaluru, Karnataka 560001",
    latitude: 12.9763,
    longitude: 77.5929,
    categories: ["Parks", "Nature", "Quiet Spaces", "Wellness"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "1.8 km",
    whySuitable: "Sprawling 300-acre green public park with bamboo groves, shaded avenues, and pedestrian-only walking zones.",
    hours: "6:00 AM – 7:00 PM (Vehicles banned Sun & Holidays)",
    accessibility: "Smooth paved roads, ramp access, multiple seating benches",
    isDemoData: true
  },
  {
    id: "LOC-KAR-002",
    state: "Karnataka",
    city: "Bengaluru",
    name: "Lalbagh Botanical Garden",
    nativeNames: {
      Kannada: "ಲಾಲ್ ಬಾಗ್ ಸಸ್ಯಶಾಸ್ತ್ರೀಯ ಉದ್ಯಾನವನ",
      Hindi: "लालबाग वनस्पति उद्यान"
    },
    address: "Mavalli, Bengaluru, Karnataka 560004",
    latitude: 12.9507,
    longitude: 77.5848,
    categories: ["Nature", "Parks", "Culture"],
    bestFor: ["Nature", "Walking", "Scenic"],
    distance: "3.5 km",
    whySuitable: "Centuries-old botanical sanctuary with a serene glasshouse, lake walk, and century-old rare trees.",
    hours: "6:00 AM – 7:00 PM Daily",
    accessibility: "Wheelchair friendly main loops, battery buggies available",
    isDemoData: true
  },
  {
    id: "LOC-KAR-003",
    state: "Karnataka",
    city: "Bengaluru",
    name: "Sankey Tank Lakeside Walk",
    nativeNames: {
      Kannada: "ಸಾಂಕಿ ಕೆರೆ ನಡಿಗೆ ಮಾರ್ಗ",
      Hindi: "सांकी टैंक झील मार्ग"
    },
    address: "Sadashiva Nagar, Kodandarampura, Bengaluru, Karnataka 560080",
    latitude: 13.0076,
    longitude: 77.5728,
    categories: ["Nature", "Parks", "Quiet Spaces"],
    bestFor: ["Walking", "Scenic", "Quiet time"],
    distance: "4.2 km",
    whySuitable: "Landscaped lake perimeter with dedicated walking track, duck pond, and sunset views.",
    hours: "6:00 AM – 10:00 AM & 4:00 PM – 8:00 PM",
    accessibility: "Continuous paved walkway with handrails",
    isDemoData: true
  },

  // KERALA (Kochi)
  {
    id: "LOC-KER-001",
    state: "Kerala",
    city: "Kochi",
    name: "Subhash Bose Park & Marine Drive Promenade",
    nativeNames: {
      Malayalam: "സുഭാഷ് ബോസ് പാർക്ക് & മറൈൻ ഡ്രൈവ്",
      Hindi: "सुभाष बोस पार्क एवं मरीन ड्राइव"
    },
    address: "Park Avenue, Marine Drive, Ernakulam, Kochi, Kerala 682011",
    latitude: 9.9722,
    longitude: 76.2778,
    categories: ["Parks", "Nature", "Quiet Spaces"],
    bestFor: ["Scenic", "Walking", "Quiet time"],
    distance: "1.2 km",
    whySuitable: "Waterfront promenade with sea breeze, green lawns, and quiet backwater views.",
    hours: "6:00 AM – 9:00 PM Daily",
    accessibility: "Flat paved promenade, ample seating facing water",
    isDemoData: true
  },
  {
    id: "LOC-KER-002",
    state: "Kerala",
    city: "Kochi",
    name: "Fort Kochi Beach & Heritage Walk",
    nativeNames: {
      Malayalam: "ഫോർട്ട് കൊച്ചി ബീച്ച് ഫ്രണ്ട്",
      Hindi: "फोर्ट कोच्चि बीच क्षेत्र"
    },
    address: "Tower Road, Fort Kochi, Kochi, Kerala 682001",
    latitude: 9.9657,
    longitude: 76.2427,
    categories: ["Nature", "Culture", "Quiet Spaces"],
    bestFor: ["Walking", "Scenic", "Personal time"],
    distance: "9.5 km",
    whySuitable: "Shaded walkway under rain trees, historic Chinese fishing nets, and calm ocean breeze.",
    hours: "Open 24/7",
    accessibility: "Paved beach road, public benches",
    isDemoData: true
  },

  // TAMIL NADU (Chennai)
  {
    id: "LOC-TN-001",
    state: "Tamil Nadu",
    city: "Chennai",
    name: "Semmozhi Poonga Botanical Garden",
    nativeNames: {
      Tamil: "செம்மொழிப் பூங்கா தாவரவியல் பூங்கா",
      Hindi: "செம்மொழி பூங்கா वनस्पति उद्यान"
    },
    address: "Cathedral Road, Teynampet, Chennai, Tamil Nadu 600086",
    latitude: 13.0489,
    longitude: 80.2526,
    categories: ["Nature", "Parks", "Wellness"],
    bestFor: ["Nature", "Quiet time", "Walking"],
    distance: "2.1 km",
    whySuitable: "Lush 20-acre botanical garden with medicinal plant sections, duck pond, and shaded green walkways.",
    hours: "6:00 AM – 8:00 PM (Closed Tuesdays)",
    accessibility: "Wheelchair ramps, wide paved paths",
    isDemoData: true
  },
  {
    id: "LOC-TN-002",
    state: "Tamil Nadu",
    city: "Chennai",
    name: "Guindy National Park & Children's Park Area",
    nativeNames: {
      Tamil: "கிண்டி தேசிய பூங்கா",
      Hindi: "गिंडी राष्ट्रीय उद्यान"
    },
    address: "Rangoon Street, Guindy, Chennai, Tamil Nadu 600022",
    latitude: 13.0067,
    longitude: 80.2206,
    categories: ["Nature", "Parks"],
    bestFor: ["Nature", "Animals", "Walking"],
    distance: "7.8 km",
    whySuitable: "Protected dry evergreen forest in heart of city with spotted deer and shaded forest trails.",
    hours: "9:00 AM – 5:30 PM (Closed Tuesdays)",
    accessibility: "Paved walking paths, shaded rest huts",
    isDemoData: true
  },

  // TELANGANA (Hyderabad)
  {
    id: "LOC-TEL-001",
    state: "Telangana",
    city: "Hyderabad",
    name: "KBR National Park (Kasu Brahmananda Reddy Park)",
    nativeNames: {
      Telugu: "కాసు బ్రహ్మానందరెడ్డి జాతీయ పార్కు (KBR పార్కు)",
      Hindi: "केबीआर राष्ट्रीय उद्यान"
    },
    address: "Road No. 2, Jubilee Hills, Hyderabad, Telangana 500034",
    latitude: 17.4239,
    longitude: 78.4184,
    categories: ["Nature", "Parks", "Quiet Spaces"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "3.8 km",
    whySuitable: "Extensive urban national park with dedicated 5 km outer walking ring and peacock sightings.",
    hours: "5:30 AM – 10:00 AM & 4:00 PM – 6:30 PM",
    accessibility: "Paved outer walkway, seating benches",
    isDemoData: true
  },

  // ANDHRA PRADESH (Visakhapatnam)
  {
    id: "LOC-AP-001",
    state: "Andhra Pradesh",
    city: "Visakhapatnam",
    name: "RK Beach Promenade & VUDA Park",
    nativeNames: {
      Telugu: "ఆర్కే బీచ్ రోడ్ నడక మార్గం",
      Hindi: "आरके बीच मार्ग"
    },
    address: "Beach Road, Pandurangapuram, Visakhapatnam, Andhra Pradesh 530002",
    latitude: 17.7126,
    longitude: 83.3175,
    categories: ["Nature", "Parks", "Quiet Spaces"],
    bestFor: ["Scenic", "Walking"],
    distance: "1.5 km",
    whySuitable: "Clean seaside promenade with coastal ocean view, landscaped gardens, and morning walking track.",
    hours: "Open 24/7",
    accessibility: "Wide paved promenade, well-lit pathways",
    isDemoData: true
  },

  // WEST BENGAL (Kolkata)
  {
    id: "LOC-WB-001",
    state: "West Bengal",
    city: "Kolkata",
    name: "Rabindra Sarobar Lake & Gardens",
    nativeNames: {
      Bengali: "রবীন্দ্র সরোবর লেক ও উদ্যান",
      Hindi: "रवींद्र सरोवर झील"
    },
    address: "Southern Avenue, Dhakuria, Kolkata, West Bengal 700029",
    latitude: 22.5126,
    longitude: 88.3636,
    categories: ["Nature", "Parks", "Quiet Spaces"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "2.8 km",
    whySuitable: "Artificial lake surrounded by ancient mahogany and banyan trees, ideal for quiet contemplative walks.",
    hours: "5:00 AM – 7:00 PM Daily",
    accessibility: "Paved perimeter path, lakeside benches",
    isDemoData: true
  },

  // MAHARASHTRA (Mumbai)
  {
    id: "LOC-MAH-001",
    state: "Maharashtra",
    city: "Mumbai",
    name: "Sanjay Gandhi National Park Area",
    nativeNames: {
      Marathi: "संजय गांधी राष्ट्रीय उद्यान",
      Hindi: "संजय गांधी राष्ट्रीय उद्यान"
    },
    address: "Borivali East, Mumbai, Maharashtra 400066",
    latitude: 19.2312,
    longitude: 72.8624,
    categories: ["Nature", "Parks", "Quiet Spaces"],
    bestFor: ["Nature", "Walking", "Animals"],
    distance: "12 km",
    whySuitable: "Vast forest park within metropolitan limits with green canopy, stream walk, and deer sightings.",
    hours: "7:30 AM – 6:30 PM (Closed Mondays)",
    accessibility: "Paved main road, electric vehicle safari option",
    isDemoData: true
  },

  // ODISHA (Bhubaneswar)
  {
    id: "LOC-ODI-001",
    state: "Odisha",
    city: "Bhubaneswar",
    name: "Ekamra Kanan Botanical Gardens",
    nativeNames: {
      Odia: "ଏକାମ୍ର କାନନ ଉଦ୍ଭିଦ ଉଦ୍ୟାନ",
      Hindi: "एकाम्र कानन वनस्पति उद्यान"
    },
    address: "IRC Village, Nayapalli, Bhubaneswar, Odisha 751015",
    latitude: 20.2974,
    longitude: 85.8086,
    categories: ["Nature", "Parks", "Quiet Spaces"],
    bestFor: ["Nature", "Quiet time", "Walking"],
    distance: "3.1 km",
    whySuitable: "500-acre botanical park featuring a large lake, rose gardens, and secluded walking trails.",
    hours: "8:00 AM – 7:00 PM Daily",
    accessibility: "Wide paved footpaths, park benches",
    isDemoData: true
  },

  // PUNJAB (Chandigarh)
  {
    id: "LOC-PUN-001",
    state: "Punjab",
    city: "Chandigarh",
    name: "Sukhna Lake Promenade",
    nativeNames: {
      Punjabi: "ਸੁਖਨਾ ਝੀਲ ਸੈਰਗਾਹ",
      Hindi: "सुखना झील मार्ग"
    },
    address: "Sector 1, Chandigarh 160001",
    latitude: 30.7421,
    longitude: 76.8188,
    categories: ["Nature", "Parks", "Quiet Spaces"],
    bestFor: ["Walking", "Scenic", "Quiet time"],
    distance: "2.0 km",
    whySuitable: "Peaceful 3 km dam promenade at foothills of Shivalik hills with clean breeze and waterfowl.",
    hours: "5:00 AM – 9:00 PM Daily",
    accessibility: "Flat paved promenade, wheelchair ramps",
    isDemoData: true
  },

  // GUJARAT (Ahmedabad)
  {
    id: "LOC-GUJ-001",
    state: "Gujarat",
    city: "Ahmedabad",
    name: "Parimal Garden Pathways",
    nativeNames: {
      Gujarati: "પરિમલ ગાર્ડન",
      Hindi: "परिमल गार्डन"
    },
    address: "Ambawadi, Ahmedabad, Gujarat 380006",
    latitude: 23.0189,
    longitude: 72.5562,
    categories: ["Nature", "Parks", "Quiet Spaces"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "1.9 km",
    whySuitable: "Lush manicured public park with lotus pond, shade canopy, and dedicated walking loops.",
    hours: "6:00 AM – 9:00 PM Daily",
    accessibility: "Smooth footpaths, multiple wooden rest benches",
    isDemoData: true
  }
];

// Pure Text Category Filter Options (No Emojis)
export const CATEGORY_OPTIONS = [
  'All',
  'Nature',
  'Parks',
  'Culture',
  'Quiet Spaces',
  'Wellness',
  'Community'
];

// Helper: Filter locations by query, city, preference, or category
export function searchLocations({ query = '', city = 'ALL', preference = 'ALL', category = 'All', categories = [] }) {
  const q = (query || '').toLowerCase().trim();
  
  return WELLBEING_LOCATIONS.filter(loc => {
    // City filter
    if (city !== 'ALL' && loc.city.toLowerCase() !== city.toLowerCase()) {
      return false;
    }

    // Singular Category filter
    if (category !== 'All' && !loc.categories.includes(category)) {
      return false;
    }

    // Multiple Categories filter
    if (categories && categories.length > 0) {
      const matchesCategory = categories.some(cat => loc.categories.includes(cat));
      if (!matchesCategory) return false;
    }

    // Preference filter
    if (preference !== 'ALL' && !loc.bestFor.includes(preference) && !loc.categories.includes(preference)) {
      return false;
    }

    // Search Query match
    if (q) {
      const matchesName = loc.name.toLowerCase().includes(q);
      const matchesCity = loc.city.toLowerCase().includes(q);
      const matchesState = loc.state.toLowerCase().includes(q);
      const matchesDesc = loc.whySuitable.toLowerCase().includes(q);
      const matchesNative = Object.values(loc.nativeNames || {}).some(n => n.toLowerCase().includes(q));
      if (!matchesName && !matchesCity && !matchesState && !matchesDesc && !matchesNative) {
        return false;
      }
    }

    return true;
  });
}
