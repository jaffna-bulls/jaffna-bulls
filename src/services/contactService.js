const API_BASE_URL = "https://api.jaffnabulls.com/api/v1";


export async function submitContactForm(payload) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    throw new Error(
      "Unable to reach the server. Please check your connection and try again."
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
  }

  if (!response.ok) {
    const serverMessage =
      data?.message || data?.error || `Request failed (status ${response.status})`;
    throw new Error(serverMessage);
  }

  return data;
}