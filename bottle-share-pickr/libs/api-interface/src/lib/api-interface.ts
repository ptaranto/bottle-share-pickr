export const API_URL = 'api';

export const UNTAPPD_AUTHENTICATE_URL =
  'https://untappd.com/oauth/authenticate/';
export const UNTAPPD_AUTHORIZE_URL = 'https://untappd.com/oauth/authorize/';
export const UNTAPPD_ROOT_URL = 'https://api.untappd.com/v4/';

export const UNTAPPD_DEFAULT_PAGINATION = 25;
export const UNTAPPD_BEER_PAGINATION = 50;

// Untappd endpoints
export const USER_INFO = 'user/info';
export const USER_WISHLIST = 'user/wishlist';
export const USER_FRIENDS = 'user/friends';
export const USER_BEERS = 'user/beers';
export const BEER_INFO = 'beer/info';
export const SEARCH_BEER = 'search/beer';

export const untappdEndpoint = (
  endpoint: string,
  options: {
    client_id?: string;
    client_secret?: string;
    access_token?: string;
    compact?: boolean;
    offset?: number;
    limit?: number;
    sort?: string;
  }
) => {
  const params = Object.entries(options)
    .map((entry) => entry.join('='))
    .join('&');
  return `${UNTAPPD_ROOT_URL}${endpoint}?${params}`;
};

export interface DefaultResponse {
  message: string;
}

export interface User {
  first_name: string;
  last_name: string;
  location: string;
  is_supporter: boolean;
  stats?: UserStats;
  uid: number;
  user_name: string;
  user_avatar: string;
}

export interface UserStats {
  total_badges: number;
  total_beers: number; // unique beer ticks
  total_checkins: number; // total beer ticks
  total_created_beers: number;
  total_friends: number;
}

export interface Friend {
  friendship_hash: string;
  user: User;
}
