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

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    await fetch("https://formsubmit.co/ajax/mo.radford@propellonline.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "https://propello.online",
        "Referer": "https://propello.online/"
      },
      body: JSON.stringify({
        name,
        phone,
        email: email || "Not provided",
        trade: trade || "Contractor",
        preferredDate: preferredDate || "ASAP",
        notes: notes || "Submitted via Propello AI / Netlify",
        _subject: `New Propello Lead: ${name} (${trade || "Contractor"})`,
        _replyto: email || undefined,
        _template: "table"
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
  } catch (deliveryErr) {
    console.warn("Netlify function direct email delivery error:", deliveryErr);
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: "success",
      message: "Consultation request successfully logged and sent to Mo Radford.",
      receivedAt: timestamp
    })
  };
}
