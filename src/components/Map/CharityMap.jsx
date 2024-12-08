'use client'

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CampaignSidebar from './CampaignSidebar';
import MapFilters from './MapFilters';
import MapSearch from './MapSearch';

// Custom marker icon
const createClusterCustomIcon = (cluster) => {
  return L.divIcon({
    html: `<div class="bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">${cluster.count}</div>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(32, 32, true),
  });
};

const CharityMap = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [stats, setStats] = useState({
    ongoing: 347,
    targeted: 7,
    completed: 5369
  });

  useEffect(() => {
    // Fetch campaigns from API
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaigns');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 h-full overflow-y-auto">
        <CampaignSidebar campaigns={campaigns} stats={stats} />
      </div>
      <div className="w-2/3 h-full relative">
        <MapSearch />
        <MapFilters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        <MapContainer
          center={[16.0, 106.0]}
          zoom={5}
          className="h-full w-full"
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {campaigns.map((campaign) => (
            <Marker
              key={campaign._id}
              position={[campaign.latitude, campaign.longitude]}
              icon={createClusterCustomIcon({ count: campaign.count })}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{campaign.name}</h3>
                  <p className="text-sm text-gray-600">{campaign.description}</p>
                  <div className="mt-2">
                    <div className="bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Đạt {campaign.raised.toLocaleString()} VND</span>
                      <span>{campaign.progress}%</span>
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors">
                    Ủng hộ
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CharityMap;

