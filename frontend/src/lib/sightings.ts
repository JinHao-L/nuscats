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
