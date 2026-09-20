// SAHAY Well-being Explorer — Local Multi-State Peaceful Location Dataset

export const WELLBEING_LOCATIONS = [
  // ASSAM (Guwahati & regional)
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
    categories: ["Nature", "Walking", "Animals", "Garden/Park"],
    bestFor: ["Nature", "Animals", "Walking"],
    distance: "2.4 km from city center",
    whySuitable: "Suitable for spending relaxed outdoor time surrounded by lush natural greenery and animal habitats.",
    nativeWhySuitable: {
      Assamese: "প্ৰাকৃতিক সেউজীয়া আৰু জীৱ-জন্তুৰ পৰিৱেশৰ মাজত আৰামদায়ক সময় কটোৱাৰ বাবে উপযোগী।",
      Hindi: "प्राकृतिक हरियाली और वन्यजीवों के बीच शांत समय बिताने के लिए उपयुक्त।"
    },
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
    categories: ["Nature", "Walking", "Quiet place", "Scenic place"],
    bestFor: ["Walking", "Quiet time", "Scenic"],
    distance: "1.1 km",
    whySuitable: "Historic water body with paved walking trails, tall shade trees, and quiet seating benches.",
    nativeWhySuitable: {
      Assamese: "খোজ কঢ়া পথ, ওখ গছৰ ছাঁ আৰু শান্ত বহাৰ ব্যৱস্থাৰে পুষ্ট ঐতিহাসিক জলাশয়।",
      Hindi: "पैदल चलने के रास्ते और घने पेड़ों की छांव वाला शांत ऐतिहासिक जलाशय।"
    },
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
    categories: ["Nature", "Scenic place", "Animals", "Quiet place"],
    bestFor: ["Nature", "Scenic", "Animals"],
    distance: "8.5 km",
    whySuitable: "Expansive natural wetland area suitable for watching migratory birds and taking peaceful walks in nature.",
    nativeWhySuitable: {
      Assamese: "পৰিভ্ৰমী চৰাই চোৱা আৰু প্ৰকৃতিৰ মাজত শান্ত সময় কটোৱাৰ বাবে উৎকৃষ্ট বিল।",
      Hindi: "प्रवासी पक्षियों को देखने और प्रकृति के शांत माहौल में समय बिताने के लिए उपयुक्त।"
    },
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
    categories: ["Nature", "Quiet place", "Scenic place"],
    bestFor: ["Quiet time", "Nature"],
    distance: "11 km",
    whySuitable: "Peaceful mountain stream surroundings with gentle running water and dense green hillside cover.",
    nativeWhySuitable: {
      Assamese: "পাহাৰীয়া জান আৰু সেউজীয়া পাহাৰৰ কাষৰ অতি শান্ত পৰিৱেশ।",
      Hindi: "पहाड़ी झरने और घनी हरियाली के बीच अत्यंत शांत और सुरम्य वातावरण।"
    },
    hours: "6:00 AM – 6:00 PM",
    accessibility: "Step access to stream, stone pathways",
    isDemoData: true
  },

  // KARNATAKA (Bengaluru, Mysuru)
  {
    id: "LOC-KAR-001",
    state: "Karnataka",
    city: "Bengaluru",
    name: "Cubbon Park",
    nativeNames: {
      Kannada: "ಕಬ್ಬನ್ ಪಾರ್ಕ್",
      Hindi: "कब्बन पार्क",
      Tamil: "கப்பல் பார்க்"
    },
    categories: ["Nature", "Walking", "Quiet place", "Garden/Park", "Personal time"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "1.8 km",
    whySuitable: "Sprawling 300-acre green public park with bamboo groves, shaded avenues, and pedestrian-only walking zones.",
    nativeWhySuitable: {
      Kannada: "ಬಿದಿರಿನ ನೆರಳು, ಹಸಿರು ಹಾದಿಗಳು ಮತ್ತು ಪ್ರಶಾಂತ ನಡಿಗೆಗೆ ಸೂಕ್ತವಾದ 300 ಎಕರೆ ಬೃಹತ್ ಉದ್ಯಾನವನ.",
      Hindi: "बांस के बगीचों और घने पेड़ों की छांव वाला 300 एकड़ का हरा-भरा विशाल पार्क।"
    },
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
    categories: ["Nature", "Walking", "Scenic place", "Garden/Park"],
    bestFor: ["Nature", "Walking", "Scenic"],
    distance: "3.5 km",
    whySuitable: "Centuries-old botanical sanctuary with a serene glasshouse, lake walk, and century-old rare trees.",
    nativeWhySuitable: {
      Kannada: "ಶಾಂತವಾದ ಕೆರೆ ಹಾದಿ, ಅಪರೂಪದ ಮರಗಳು ಮತ್ತು ಸೌಂದರ್ಯಯುತ ಗ್ಲಾಸ್‌ಹೌಸ್ ಹೊಂದಿರುವ ಹಸಿರು ಮಡಿಲು.",
      Hindi: "शांत झील, दुर्लभ पेड़ और ऐतिहासिक ग्लासहाउस वाला प्रसिद्ध वनस्पति उद्यान।"
    },
    hours: "6:00 AM – 7:00 PM Daily",
    accessibility: "Wheelchair friendly main loops, battery buggies available",
    isDemoData: true
  },
  {
    id: "LOC-KAR-003",
    state: "Karnataka",
    city: "Bengaluru",
    name: "Bannerghatta Biological Park (Butterflies & Green Zone)",
    nativeNames: {
      Kannada: "ಬನ್ನೇರುಘಟ್ಟ ಜೈವಿಕ ಉದ್ಯಾನವನ",
      Hindi: "बन्नेरघट्टा जैविक उद्यान"
    },
    categories: ["Nature", "Animals", "Walking", "Garden/Park"],
    bestFor: ["Animals", "Nature", "Walking"],
    distance: "18 km",
    whySuitable: "Dedicated butterfly park dome, zoo enclosures, and forest trail perimeter.",
    nativeWhySuitable: {
      Kannada: "ಚಿಟ್ಟೆಗಳ ಉದ್ಯಾನವನ, ಮೃಗಾಲಯ ಮತ್ತು ಕಾಡಿನ ಅಂಚಿನಲ್ಲಿ ಪ್ರಕೃತಿಯ ಒಡನಾಟ.",
      Hindi: "तितली पार्क, चिड़ियाघर और प्राकृतिक जंगल के वातावरण में समय बिताने के लिए उपयुक्त।"
    },
    hours: "9:00 AM – 5:00 PM (Closed Tuesdays)",
    accessibility: "Paved main pathways, shade structures",
    isDemoData: true
  },
  {
    id: "LOC-KAR-004",
    state: "Karnataka",
    city: "Bengaluru",
    name: "Sankey Tank Lakeside Walk",
    nativeNames: {
      Kannada: "ಸಾಂಕಿ ಕೆರೆ ನಡಿಗೆ ಮಾರ್ಗ",
      Hindi: "सांकी टैंक झील मार्ग"
    },
    categories: ["Walking", "Scenic place", "Quiet place"],
    bestFor: ["Walking", "Scenic", "Quiet time"],
    distance: "4.2 km",
    whySuitable: "Landscaped lake perimeter with dedicated walking track, duck pond, and sunset views.",
    nativeWhySuitable: {
      Kannada: "ಸುಂದರ ಕೆರೆಯ ಸುತ್ತಲೂ ಸಾಗುವ ಸುಸಜ್ಜಿತ ನಡಿಗೆ ಪಥ ಮತ್ತು ಸೂರ್ಯಾಸ್ತದ ವೀಕ್ಷಣೆ.",
      Hindi: "झील के चारों ओर सुंदर पैदल मार्ग और शांत शाम बिताने का वातावरण।"
    },
    hours: "6:00 AM – 10:00 AM & 4:00 PM – 8:00 PM",
    accessibility: "Continuous paved walkway with handrails",
    isDemoData: true
  },

  // KERALA (Kochi, Thiruvananthapuram)
  {
    id: "LOC-KER-001",
    state: "Kerala",
    city: "Kochi",
    name: "Subhash Bose Park & Marine Drive Promenade",
    nativeNames: {
      Malayalam: "സുഭാഷ് ബോസ് പാർക്ക് & മറൈൻ ഡ്രൈവ്",
      Hindi: "सुभाष बोस पार्क एवं मरीन ड्राइव"
    },
    categories: ["Nature", "Walking", "Scenic place", "Quiet place"],
    bestFor: ["Scenic", "Walking", "Quiet time"],
    distance: "1.2 km",
    whySuitable: " Waterfront promenade with sea breeze, musical fountains, green lawns, and backwater views.",
    nativeWhySuitable: {
      Malayalam: "കടൽക്കാറ്റും കായൽക്കാഴ്ചകളും നിറഞ്ഞ പ്രശാന്തമായ പാർക്കും നടപ്പാതയും.",
      Hindi: "समुद्री हवा और शांत बैकवाटर के सुंदर दृश्यों वाला पार्क और पैदल मार्ग।"
    },
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
    categories: ["Nature", "Walking", "Scenic place", "Personal time"],
    bestFor: ["Walking", "Scenic", "Personal time"],
    distance: "9.5 km",
    whySuitable: "Shaded walkway under rain trees, historic Chinese fishing nets, and calm ocean breeze.",
    nativeWhySuitable: {
      Malayalam: "മരത്തണലുള്ള നടപ്പാതയും ചീനവലകളും കടൽക്കാറ്റും നിറഞ്ഞ ശാന്തമായ അന്തരീക്ഷം.",
      Hindi: "छायादार पेड़ों के नीचे पैदल मार्ग और शांत समुद्री हवा।"
    },
    hours: "Open 24/7",
    accessibility: "Paved beach road, public benches",
    isDemoData: true
  },

  // TAMIL NADU (Chennai, Coimbatore)
  {
    id: "LOC-TN-001",
    state: "Tamil Nadu",
    city: "Chennai",
    name: "Semmozhi Poonga Botanical Garden",
    nativeNames: {
      Tamil: "செம்மொழிப் பூங்கா தாவரவியல் பூங்கா",
      Hindi: "செம்மொழி பூங்கா वनस्पति उद्यान"
    },
    categories: ["Nature", "Walking", "Garden/Park", "Quiet place"],
    bestFor: ["Nature", "Quiet time", "Walking"],
    distance: "2.1 km",
    whySuitable: "Lush 20-acre botanical garden with medicinal plant sections, duck pond, and shaded green walkways.",
    nativeWhySuitable: {
      Tamil: "அமைதியான சூழ்நிலை, மூலிகைத் தோட்டங்கள் மற்றும் பசுமையான நடைபாதைகள் கொண்ட பூங்கா.",
      Hindi: "शांत वातावरण, औषधीय पौधे और घने पेड़ों की छांव वाला पार्क।"
    },
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
    categories: ["Nature", "Animals", "Walking"],
    bestFor: ["Nature", "Animals", "Walking"],
    distance: "7.8 km",
    whySuitable: "Protected dry evergreen forest in heart of city with spotted deer, blackbucks, and shaded forest trails.",
    nativeWhySuitable: {
      Tamil: "மான்கள் மற்றும் இயற்கை வனப்பகுதியுடன் கூடிய அமைதியான இயற்கை பூங்கா.",
      Hindi: "प्राकृतिक हिरणों और घने जंगल के वातावरण में समय बिताने की जगह।"
    },
    hours: "9:00 AM – 5:30 PM (Closed Tuesdays)",
    accessibility: "Paved walking paths, shaded rest huts",
    isDemoData: true
  },

  // TELANGANA & ANDHRA (Hyderabad, Vizag)
  {
    id: "LOC-TEL-001",
    state: "Telangana",
    city: "Hyderabad",
    name: "KBR National Park (Kasu Brahmananda Reddy Park)",
    nativeNames: {
      Telugu: "కాసు బ్రహ్మానందరెడ్డి జాతీయ పార్కు (KBR పార్కు)",
      Hindi: "केबीआर राष्ट्रीय उद्यान"
    },
    categories: ["Nature", "Walking", "Quiet place"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "3.8 km",
    whySuitable: "Extensive urban national park with dedicated 5 km outer walking ring and peacock sightings.",
    nativeWhySuitable: {
      Telugu: "నెమళ్లు మరియు దట్టమైన చెట్లతో కూడిన ప్రశాంతమైన 5 కిమీ నడక మార్గం.",
      Hindi: "मोरों और घने पेड़ों के बीच 5 किमी लंबा शांत पैदल मार्ग।"
    },
    hours: "5:30 AM – 10:00 AM & 4:00 PM – 6:30 PM",
    accessibility: "Paved outer walkway, seating benches",
    isDemoData: true
  },
  {
    id: "LOC-AP-001",
    state: "Andhra Pradesh",
    city: "Visakhapatnam",
    name: "RK Beach Promenade & VUDA Park",
    nativeNames: {
      Telugu: "ఆర్కే బీచ్ రోడ్ నడక మార్గం",
      Hindi: "आरके बीच मार्ग"
    },
    categories: ["Nature", "Walking", "Scenic place"],
    bestFor: ["Scenic", "Walking"],
    distance: "1.5 km",
    whySuitable: "Clean seaside promenade with coastal ocean view, landscaped gardens, and morning walking track.",
    nativeWhySuitable: {
      Telugu: "సముద్రపు గాలి మరియు సుందరమైన సముద్ర తీర నడక మార్గం.",
      Hindi: "ताज़ी समुद्री हवा और सुंदर तटीय पैदल मार्ग।"
    },
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
    categories: ["Nature", "Walking", "Quiet place", "Scenic place"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "2.8 km",
    whySuitable: "Artificial lake surrounded by ancient mahogany and banyan trees, ideal for quiet contemplative walks.",
    nativeWhySuitable: {
      Bengali: "বিশাল লেক এবং প্রাচীন গাছের ছায়ায় ঘেরা অত্যন্ত শান্ত হাঁটার জায়গা।",
      Hindi: "विशाल झील और घने पेड़ों की छांव वाला शांत टहलने का स्थान।"
    },
    hours: "5:00 AM – 7:00 PM Daily",
    accessibility: "Paved perimeter path, lakeside benches",
    isDemoData: true
  },

  // MAHARASHTRA (Mumbai, Pune)
  {
    id: "LOC-MAH-001",
    state: "Maharashtra",
    city: "Mumbai",
    name: "Sanjay Gandhi National Park (Kanheri Trail & Nature Area)",
    nativeNames: {
      Marathi: "संजय गांधी राष्ट्रीय उद्यान",
      Hindi: "संजय गांधी राष्ट्रीय उद्यान"
    },
    categories: ["Nature", "Walking", "Scenic place", "Animals"],
    bestFor: ["Nature", "Walking", "Animals"],
    distance: "12 km",
    whySuitable: "Vast forest park within metropolitan limits with green canopy, stream walk, and deer sightings.",
    nativeWhySuitable: {
      Marathi: "हिरवागार निसर्ग, शांत रस्ते आणि निसर्गाच्या सानिध्यात वेळ घालवण्यासाठी उत्तम ठिकाण.",
      Hindi: "घने जंगल, शांत सड़कें और प्राकृतिक माहौल में समय बिताने के लिए उत्तम।"
    },
    hours: "7:30 AM – 6:30 PM (Closed Mondays)",
    accessibility: "Paved main road, electric vehicle safari option",
    isDemoData: true
  },

  // ODISHA (Bhubaneswar)
  {
    id: "LOC-ODI-001",
    state: "Odisha",
    city: "Bhubaneswar",
    name: "Ekamra Kanan Botanical Gardens & Regional Plant Resource Centre",
    nativeNames: {
      Odia: "ଏକାମ୍ର କାନନ ଉଦ୍ଭିଦ ଉଦ୍ୟାନ",
      Hindi: "एकाम्र कानन वनस्पति उद्यान"
    },
    categories: ["Nature", "Walking", "Garden/Park", "Quiet place"],
    bestFor: ["Nature", "Quiet time", "Walking"],
    distance: "3.1 km",
    whySuitable: "500-acre botanical park featuring a large lake, rose gardens, and secluded walking trails.",
    nativeWhySuitable: {
      Odia: "ବିଶାଳ ପୋଖରୀ ଏବଂ ସବୁଜ ବଗିଚା ଘେରା ପ୍ରଶାନ୍ତ ପରିବେଶ।",
      Hindi: "विशाल झील और हरे-भरे बगीचों से घिरा अत्यंत शांत वातावरण।"
    },
    hours: "8:00 AM – 7:00 PM Daily",
    accessibility: "Wide paved footpaths, park benches",
    isDemoData: true
  },

  // PUNJAB (Chandigarh)
  {
    id: "LOC-PUN-001",
    state: "Punjab",
    city: "Chandigarh",
    name: "Sukhna Lake Promenade & Bird Sanctuary Promenade",
    nativeNames: {
      Punjabi: "ਸੁਖਨਾ ਝੀਲ ਸੈਰਗਾਹ",
      Hindi: "सुखना झील मार्ग"
    },
    categories: ["Nature", "Walking", "Scenic place", "Quiet place"],
    bestFor: ["Walking", "Scenic", "Quiet time"],
    distance: "2.0 km",
    whySuitable: "Peaceful 3 km dam promenade at foothills of Shivalik hills with clean breeze and waterfowl.",
    nativeWhySuitable: {
      Punjabi: "ਸ਼ਿਵਾਲਿਕ ਪਹਾੜੀਆਂ ਦੇ ਪੈਰਾਂ ਵਿੱਚ ਸ਼ਾਂਤ ਝੀਲ ਅਤੇ ਖੁੱਲ੍ਹੀ ਹਵਾ ਵਿੱਚ ਸੈਰ।",
      Hindi: "शिवालिक पहाड़ियों की तलहटी में शांत झील और ताज़ी हवा में टहलने का स्थान।"
    },
    hours: "5:00 AM – 9:00 PM Daily",
    accessibility: "Flat paved promenade, wheelchair ramps",
    isDemoData: true
  },

  // GUJARAT (Ahmedabad)
  {
    id: "LOC-GUJ-001",
    state: "Gujarat",
    city: "Ahmedabad",
    name: "Law Garden & Parimal Garden Pathways",
    nativeNames: {
      Gujarati: "લો ગાર્ડન અને પરિમલ ગાર્ડન",
      Hindi: "लॉ गार्डन एवं परिमल गार्डन"
    },
    categories: ["Nature", "Walking", "Garden/Park", "Quiet place"],
    bestFor: ["Nature", "Walking", "Quiet time"],
    distance: "1.9 km",
    whySuitable: "Lush manicured public park with lotus pond, shade canopy, and dedicated morning/evening walking loops.",
    nativeWhySuitable: {
      Gujarati: "લીલોતરી, શાંત વાતાવરણ અને કમળના તળાવ સાથેની સુંદર ચાલવાની જગ્યા.",
      Hindi: "हरियाली, शांत माहौल और कमल के तालाब वाला सुंदर पार्क।"
    },
    hours: "6:00 AM – 9:00 PM Daily",
    accessibility: "Smooth footpaths, multiple wooden rest benches",
    isDemoData: true
  }
];

// Helper: Filter locations by query or state/city name
export function searchLocations({ query = '', preference = 'ALL', categories = [] }) {
  const q = (query || '').toLowerCase().trim();
  
  return WELLBEING_LOCATIONS.filter(loc => {
    // Location / City / State match
    const matchesQuery = !q || 
      loc.city.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(q) ||
      loc.name.toLowerCase().includes(q) ||
      Object.values(loc.nativeNames || {}).some(name => name.toLowerCase().includes(q));

    // Preference match
    let matchesPreference = true;
    if (preference !== 'ALL') {
      matchesPreference = loc.bestFor.includes(preference) || loc.categories.includes(preference);
    }

    // Category filter match
    let matchesCategories = true;
    if (categories && categories.length > 0) {
      matchesCategories = categories.some(cat => loc.categories.includes(cat));
    }

    return matchesQuery && matchesPreference && matchesCategories;
  });
}
