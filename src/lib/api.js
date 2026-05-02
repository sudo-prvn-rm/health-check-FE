const HOST = import.meta.env.VITE_HOST || 'http://127.0.0.1:8000';

console.log('API HOST:', HOST);

export const api = {
  async signup(data) {
    const response = await fetch(`${HOST}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    return result;
  },

  async login(data) {
    const response = await fetch(`${HOST}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    return result;
  },

  async refresh(refreshToken) {
    const response = await fetch(`${HOST}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    return response.json();
  },

  async me(accessToken) {
    const response = await fetch(`${HOST}/api/v1/auth/me`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.json();
  },

  async updateMe(accessToken, data) {
    const response = await fetch(`${HOST}/api/v1/auth/me`, {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    return result;
  },
};
