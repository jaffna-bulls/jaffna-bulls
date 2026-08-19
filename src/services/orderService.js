const API_URL = "https://api.jaffnabulls.com";

export async function createOrder(order) {
  let response;

  try {
    response = await fetch(`${API_URL}/api/v1/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
  } catch {
    throw new Error("Unable to connect to the order service.");
  }

  let result = null;

  try {
    result = await response.json();
  } catch {
    // The API may return an empty response for a successful request.
  }

  if (!response.ok) {
    throw new Error(
      result?.message || result?.error || "The order could not be created.",
    );
  }

  return result;
}
