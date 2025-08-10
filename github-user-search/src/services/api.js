export async function fetchData(endpoint) {
  const response = await fetch(`https://api.example.com/${endpoint}`);
  return await response.json();
}