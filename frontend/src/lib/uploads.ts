import { UploadResponse } from '@api/uploads';
import { UserPhoto } from 'utils/takePhoto';
import { makeRequest, apiFetch } from './api';

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
  console.log(`uploading to ${uploadLink}`)

  let res = await fetch(uploadLink, {
    method: 'PUT',
    body: dataURItoBlob(image.dataUrl),
  });

  console.log({ res: await res.text() })
};

export const getUserProfileImageUpload = async (userId: string): Promise<{ res?: UploadResponse, err?: Error }> => {
  const res = await apiFetch(`/uploads/users/${userId}`)
  if (!res.ok) {
    let msg = ((await res.json()) as any).message
    return {
      err: new Error(msg),
    }
  }

  return { res: (await res.json()) as UploadResponse }
}
