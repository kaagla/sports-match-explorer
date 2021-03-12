import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Location, Match } from '../../Interfaces';
import LocationDetails from './LocationDetails';
import LocationMatches from './LocationMatches';
import './Map.css';

interface MapProps {
  locations: Location[];
  matches: Match[];
  lat?: number;
  lon?: number;
}

export default function Map({ locations, matches, lat, lon }: MapProps) {
  function matchesInLocation(locationId: string): Match[] {
    return matches.filter((match: Match) => match.location_id === locationId);
  }

  const cLat = lat ? lat : 63;
  const cLon = lon ? lon : 25;
  const zoom = lat && lon ? 10 : 6;

  return (
    <MapContainer center={[cLat, cLon]} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location: Location) => (
        <Marker key={location.id} position={[location.lat, location.lon]}>
          <Popup className="request-popup">
            <LocationDetails location={location} />
            <LocationMatches
              matches={matches.filter((m) => m.location_id === location.id)}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
