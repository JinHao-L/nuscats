export function PlaceholderCatUrl(x: number, y: number): string {
  return `https://placekitten.com/${x}/${y}`;
}

export const parseDate = (date: any): Date => {
  const strDate = date as unknown as string;
  return new Date(strDate);
};
