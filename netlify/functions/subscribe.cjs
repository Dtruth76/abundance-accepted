exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }
  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = "pub_ecd2bacb-4c39-47c2-a9d4-234f0112062e"
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key not configured" }) }
  }
  try {
    const body = JSON.parse(event.body || "{}")
    const email = body.email
    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Email required" }) }
    }
    const response = await fetch("https://api.beehiiv.com/v2/publications/" + publicationId + "/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
      body: JSON.stringify({ email: email, reactivate_existing: false, send_welcome_email: true })
    })
    const data = await response.json()
    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: data.message || "Failed" }) }
    }
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ success: true }) }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) }
  }
}