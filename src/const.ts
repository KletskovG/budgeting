const BASE_SERVER_URL = 'http://158.160.66.123';

export const API = import.meta.env.DEV
	? `${BASE_SERVER_URL}:3001`
	: BASE_SERVER_URL;

export const ROUTES = {
	'find': '/find',
	'report': '/report',
};

export const API_INSPECTOR_URL = `${BASE_SERVER_URL}/api`;
export const OPEN_API_SPEC_URL = `${BASE_SERVER_URL}/openapi`;
