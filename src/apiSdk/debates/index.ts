import axios from 'axios';
import queryString from 'query-string';
import { DebateInterface, DebateGetQueryInterface } from 'interfaces/debate';
import { GetQueryInterface } from '../../interfaces';

export const getDebates = async (query?: DebateGetQueryInterface) => {
  const response = await axios.get(`/api/debates${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDebate = async (debate: DebateInterface) => {
  const response = await axios.post('/api/debates', debate);
  return response.data;
};

export const updateDebateById = async (id: string, debate: DebateInterface) => {
  const response = await axios.put(`/api/debates/${id}`, debate);
  return response.data;
};

export const getDebateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/debates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDebateById = async (id: string) => {
  const response = await axios.delete(`/api/debates/${id}`);
  return response.data;
};
