export async function handler(event: any) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  let body: any = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON body" })
    };
  }

  const { name, phone, email, trade, preferredDate, notes } = body;

  if (!name || !phone) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Name and phone are required for consultation requests." })
    };
  }

  const timestamp = new Date().toISOString();
  console.log("==========================================================================");
  console.log(`📅 NEW CONTRACTOR CONSULTATION REQUEST AT ${timestamp}:`);
  console.log(`👤 Name           : ${name}`);
  console.log(`📞 Phone          : ${phone}`);
  console.log(`📧 Email          : ${email || "Not provided"}`);
  console.log(`🔨 Trade / Niche  : ${trade || "General Contracting"}`);
  console.log(`⏰ Preferred Time : ${preferredDate || "Earliest available"}`);
  console.log(`📝 Notes          : ${notes || "None"}`);
  console.log(`✉️ Notification Route: mo.radford@propellonline.com`);
  console.log("==========================================================================");

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: "success",
      message: "Consultation request successfully logged. Mo Radford will reach out directly to confirm your appointment time.",
      receivedAt: timestamp
    })
  };
}
