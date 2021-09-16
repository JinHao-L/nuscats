import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const SUPPORTED_FILE_TYPES = ['png', 'jpeg'];

export interface UserPhoto {
  dataUrl: string;
}

export const takePhoto = async (): Promise<UserPhoto> => {
  try {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 75,
    });

    if (!cameraPhoto.dataUrl || !isValidFileFormat(cameraPhoto.format)) {
      throw new Error();
    }

    return {
      dataUrl: cameraPhoto.dataUrl,
    };
  } catch (e) {
    throw e;
  }
};

const isValidFileFormat = (format: string): boolean =>
  SUPPORTED_FILE_TYPES.includes(format);
