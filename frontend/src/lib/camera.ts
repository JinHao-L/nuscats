import { Photo } from "@capacitor/camera"

const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
	const reader = new FileReader;
	reader.onerror = reject;
	reader.onload = () => {
		resolve(reader.result);
	};
	reader.readAsDataURL(blob);
});

export async function readAsBase64(photoWebPath: string) {
	const response = await fetch(photoWebPath!);
	const blob = await response.blob();

	return await convertBlobToBase64(blob) as string;
}