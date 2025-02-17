const API = `${process.env.NEXT_PUBLIC_API_URL}`

export async function verifyOTP(otp:string) {

  try {
    let response = await fetch(`${API}/otp/verify/?id=${otp}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      throw new Error(`Failed to verify otp`);
    }

    const { data } = await response.json();
    return data;
  } catch (error: any) {
    console.error("OTP verification failed:", error);
    throw new Error(error.message);
  }
}

