fetch("https://us.i.posthog.com/capture/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    api_key: "phc_ptkzpJHE4XTfVYkQaMNH2unB8PbsHkHDqQntmfM2xHZs",
    event: "$pageview",
    properties: {
      distinct_id: "test_server_123",
      $current_url: "https://portofolio-busines.netlify.app"
    }
  })
})
.then(res => res.json())
.then(data => console.log("PostHog Response:", data))
.catch(err => console.error("Error:", err));
