import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, MapPin, Clock, Info, Navigation, ExternalLink } from 'lucide-react';

// Custom SVG Leaflet Marker Icon to prevent missing image asset paths in Vite
const customMarkerIcon = new L.DivIcon({
  className: 'custom-leaflet-marker',
  html: `
    <div style="
      background-color: #0F172A;
      color: #FFFFFF;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #FFFFFF;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    ">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34]
});

// Helper component to center map on coordinates change
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

export const WellBeingMap = ({
  latitude = 26.1445,
  longitude = 91.7362,
  locationName = 'Location',
  address = '',
  city = '',
  distance = '',
  whySuitable = '',
  hours = '',
  accessibility = '',
  onBack
}) => {
  const position = [latitude, longitude];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-0">
      
      {/* Map Header Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Locations</span>
          </button>

          <div>
            <h2 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{locationName}</span>
            </h2>
            <p className="text-xs text-slate-300">
              {city} • {distance || 'Peaceful Area'}
            </p>
          </div>
        </div>

        <div className="text-xs font-mono font-semibold bg-slate-800 px-3 py-1.5 rounded border border-slate-700 text-slate-200 self-start sm:self-auto">
          Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}
        </div>
      </div>

      {/* Map Container Area */}
      <div className="h-[450px] w-full relative z-0">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeView center={position} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customMarkerIcon}>
            <Popup className="custom-leaflet-popup">
              <div className="p-1 space-y-1.5 text-xs text-slate-900 max-w-xs font-sans">
                <div className="font-bold text-sm text-slate-900">{locationName}</div>
                {address && <div className="text-[11px] text-slate-600">{address}</div>}
                {whySuitable && <p className="text-[11px] text-slate-700 leading-relaxed italic pt-1">{whySuitable}</p>}
                {hours && <div className="text-[10px] text-slate-500"><strong>Hours:</strong> {hours}</div>}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Map Details Footer Card */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {address && (
          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-slate-700" />
              <span>Full Address</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">{address}, {city}</p>
          </div>
        )}

        {hours && (
          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-700" />
              <span>Operating Hours</span>
            </div>
            <p className="text-slate-600 text-[11px]">{hours}</p>
          </div>
        )}

        {accessibility && (
          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1 sm:col-span-2 lg:col-span-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-700" />
              <span>Accessibility & Amenities</span>
            </div>
            <p className="text-slate-600 text-[11px]">{accessibility}</p>
          </div>
        )}
      </div>

    </div>
  );
};
