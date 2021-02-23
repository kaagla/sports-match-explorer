import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Location, Match } from '../../Interfaces';
import LocationDetails from './LocationDetails';
import LocationMatches from './LocationMatches'
import './Map.css';

interface MapProps {
  locations: Location[];
  matches: Match[];
}

export default function Map({ locations, matches }: MapProps) {

  function matchesInLocation(locationId: string): Match[] {
    return matches.filter((match: Match) => match.location_id === locationId)
  }

  return (
    <MapContainer center={[63, 25]} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location: Location) => (
        <Marker key={location.id} position={[location.lat, location.lon]}>
          <Popup className='request-popup'>
            <LocationDetails location={location} />
            <LocationMatches matches={matches.filter(m => m.location_id === location.id)} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
