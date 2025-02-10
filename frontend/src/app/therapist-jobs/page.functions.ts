const API = `${process.env.NEXT_PUBLIC_API_URL}`

export async function submitApplication(formData: FormData) {
  try {
    let response = await fetch(`${API}/auth/therapist-apply`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    })

    if(!response.ok){
        console.log(`HTTP error! status: ${response.status}`)
        throw new Error(`Application submission failed`);
    }

    const data = await response.json();
    return data;
  } catch (error:any) {
    console.error("Upload failed:", error);
    throw new Error(error.message);
  }
}


export async function getQuestions() {

  try {
    let response = await fetch(`${API}/question/?category=therapist-registration`, {
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

