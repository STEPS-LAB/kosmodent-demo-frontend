/**
 * Public API Client - for public endpoints only (no auth)
 * This is a lightweight version for public pages
 */

import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const publicApiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const publicApi = {
  // Services
  getServices: async (params?: Record<string, string>) => {
    const response = await publicApiClient.get<any[]>('/api/services', { params });
    return response.data;
  },

  getServiceBySlug: async (slug: string) => {
    const response = await publicApiClient.get<any>(`/api/services/${slug}`);
    return response.data;
  },

  // Doctors
  getDoctors: async (params?: Record<string, string>) => {
    const response = await publicApiClient.get<any[]>('/api/doctors', { params });
    return response.data;
  },

  getDoctorBySlug: async (slug: string) => {
    const response = await publicApiClient.get<any>(`/api/doctors/${slug}`);
    return response.data;
  },

  // Reviews
  getReviews: async (params?: Record<string, string>) => {
    const response = await publicApiClient.get<any[]>('/api/reviews', { params });
    return response.data;
  },

  getReviewStatistics: async () => {
    try {
      const response = await publicApiClient.get<any>('/api/reviews/statistics');
      return response.data;
    } catch {
      return {
        totalReviews: 0,
        activeReviews: 0,
        averageRating: 0,
        ratingDistribution: [
          { rating: 1, count: 0 },
          { rating: 2, count: 0 },
          { rating: 3, count: 0 },
          { rating: 4, count: 0 },
          { rating: 5, count: 0 },
        ],
      };
    }
  },

  createReview: async (data: {
    patientName: string;
    patientPhone?: string;
    service?: string;
    doctor?: string;
    rating: number;
    title: string;
    content: string;
  }) => {
    const response = await publicApiClient.post('/api/reviews', data);
    return response.data;
  },

  // Appointments
  getAvailableDates: async (days?: number) => {
    const response = await publicApiClient.get<any[]>('/api/appointments/available-dates', {
      params: { days },
    });
    return response.data;
  },

  getAvailableSlots: async (date: string, service?: string) => {
    const response = await publicApiClient.get<any[]>('/api/appointments/available-slots', {
      params: { date, service },
    });
    return response.data;
  },

  checkAvailability: async (date: string, timeSlot: string) => {
    const response = await publicApiClient.get('/api/appointments/check-availability', {
      params: { date, timeSlot },
    });
    return response.data;
  },

  createAppointment: async (data: {
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    patientNotes?: string;
    service: string;
    doctor?: string;
    date: string;
    timeSlot: string;
  }) => {
    const response = await publicApiClient.post('/api/appointments', data);
    return response.data;
  },

  // Blog
  getBlogPosts: async (params?: Record<string, string>) => {
    const response = await publicApiClient.get<any[]>('/api/blog', { params });
    return response.data;
  },

  getBlogPostBySlug: async (slug: string) => {
    const response = await publicApiClient.get<any>(`/api/blog/${slug}`);
    return response.data;
  },

  getFeaturedPosts: async () => {
    const response = await publicApiClient.get<any[]>('/api/blog/featured');
    return response.data;
  },

  // Settings
  getSettings: async () => {
    const response = await publicApiClient.get('/api/settings');
    return response.data;
  },

  getContactInfo: async () => {
    const response = await publicApiClient.get('/api/settings/contact');
    return response.data;
  },
};

export default publicApi;

// Alias for backward compatibility
export const api = publicApi;
