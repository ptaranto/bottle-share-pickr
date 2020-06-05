export const API_URL = 'api';

export const UNTAPPD_AUTHENTICATE_URL =
  'https://untappd.com/oauth/authenticate/';
export const UNTAPPD_AUTHORIZE_URL = 'https://untappd.com/oauth/authorize/';
export const UNTAPPD_ROOT_URL = 'https://api.untappd.com/v4/';

// Untappd endpoints
export const USER_INFO = 'user/info';
export const USER_WISHLIST = 'user/wishlist';
export const USER_FRIENDS = 'user/friends';
export const BEER_INFO = 'beer/info';
export const SEARCH_BEER = 'search/beer';

export interface DefaultResponse {
  message: string;
}
