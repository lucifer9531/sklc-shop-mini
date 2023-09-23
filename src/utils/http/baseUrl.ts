import { BASE_URL, GD_BASE_URL } from "@/consts";

const getBaseUrl = (url: string) => {
  let baseUrl = '';
  if (url.includes('/api/')) {
    baseUrl = BASE_URL;
  } else if (url.includes('/v3/')) {
    baseUrl = GD_BASE_URL;
  }
  return baseUrl;
}

export default getBaseUrl;
