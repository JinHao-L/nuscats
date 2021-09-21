import { UploadResponse } from '@api/uploads';
import { UserPhoto } from 'utils/takePhoto';
import { makeRequest } from './api';

export const getSightingImageUpload = async (): Promise<UploadResponse> => {
  return await makeRequest('/v1/uploads/sightings');
};

/**
 * From: https://newbedev.com/how-to-convert-dataurl-to-file-object-in-javascript
 */
const dataURItoBlob = (dataURI: string) => {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export const uploadImage = async (uploadLink: string, image: UserPhoto) => {
  await makeRequest(uploadLink, {
    method: 'PUT',
    body: dataURItoBlob(image.dataUrl),
  });
};
