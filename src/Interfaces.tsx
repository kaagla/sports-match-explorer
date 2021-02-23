export interface Club {
  id: string;
  name: string;
  sport: string;
}

export interface League {
  id: string;
  name: string;
  sport: string;
}

export interface Team {
  id: string;
  name: string;
  club_id: string;
  club: string;
  league_id: string;
  league: string;
  sport: string;
}

export interface Match {
  id: string;
  date: string;
  start_date: Date;
  time: string;
  venue: string;
  sport: string;
  league_id: string;
  league: string;
  hometeam_id: string;
  hometeam: string;
  awayteam_id: string;
  awayteam: string;
  score: string;
  municipality: string;
  location_id: string;
}

export interface Location {
  id: string;
  address: string;
  postoffice: string;
  lat: number;
  lon: number;
  postalcode: string;
  municipality: string;
  grandarea: string;
}
