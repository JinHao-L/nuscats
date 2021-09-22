import { CatSighting, CreateSightingRequest } from '@api/sightings';
import { makeRequest } from './api';

export const uploadSighting = async (
  request: CreateSightingRequest,
): Promise<CatSighting> => {
  return await makeRequest('/v1/sightings', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
};

export const updateSighting = async (
  sightingId: CatSighting['id'],
  updates: Partial<CreateSightingRequest>,
): Promise<CatSighting> => {
  return await makeRequest(`/v1/sightings/${sightingId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
};

export const deleteSighting = async (
  sightingId: CatSighting['id'],
): Promise<CatSighting> => {
  return await makeRequest(`/v1/sightings/${sightingId}`, {
    method: 'DELETE',
  });
};
