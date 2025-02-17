const API = `${process.env.NEXT_PUBLIC_API_URL}`

export async function getQuestions(type: string) {

  try {
    let response = await fetch(`${API}/question/?category=client-registration-${type}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw new Error(`Failed to fetch questions`);
    }

    const { data } = await response.json();
    return data;
  } catch (error: any) {
    console.error("Fetching questions failed:", error);
    throw new Error(error.message);
  }
}

export async function signUp(body:object) {
  try {
    const response = await fetch(`${API}/auth/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Sign-up failed:", error);
    throw new Error(error.message);
  }
}
