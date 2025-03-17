export const BASE_API_URL =
  "https://prueba-tecnica-api-tienda-moviles.onrender.com";
export const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!BASE_API_URL || !NEXT_PUBLIC_API_KEY) {
  console.warn("Missing environment variables:", {
    hasBaseUrl: !!BASE_API_URL,
    hasApiKey: !!NEXT_PUBLIC_API_KEY,
  });
}
