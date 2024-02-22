export function generateImageURL(img: string) {
  if (import.meta.env.DEV) return img;

  const token = localStorage.getItem("token");
  return (
    "https://www.lifehealthemergency.com/api/files/" + img + "?_s=" + token
  );
}

export function createMapLink(coordinates: number[] | [number, number]) {
  return `https://www.google.com/maps/dir//${coordinates.join(",")}`;
}
