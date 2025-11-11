import { WebSocketServer } from "ws";

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });
  console.log("📡 WebSocket server started");

  let activeUsers = 0;

  const broadcast = (data) => {
    const json = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(json);
      }
    });
  };

  wss.on("connection", (ws) => {
    console.log("🟢 New client connected");
    activeUsers++;
    ws.send(JSON.stringify({ message: "Connected to Real-Time Weather Server ✅" }));

    ws.on("close", () => {
      console.log("🔴 Client disconnected");
      activeUsers = Math.max(activeUsers - 1, 0);
    });
  });

  // 🌤 Simulate real-time weather data every 5 seconds
  setInterval(() => {
    const temperature = (20 + Math.random() * 10).toFixed(1); // 20–30°C
    const humidity = (50 + Math.random() * 20).toFixed(1); // 50–70%
    const windspeed = (5 + Math.random() * 10).toFixed(1); // 5–15 km/h
    const conditions = ["Sunny ☀️", "Rainy 🌧️", "Cloudy ☁️", "Windy 💨"];
    const weather = conditions[Math.floor(Math.random() * conditions.length)];

    // Simulate 1–10 users randomly
const simulatedUsers = Math.floor(Math.random() * 10) + 1;

broadcast({
  activeUsers: simulatedUsers,
  temperature,
  humidity,
  windspeed,
  weather,
  time: new Date().toLocaleTimeString(),
});


    console.log(`🌡️ Temp: ${temperature}°C | 💧 Humidity: ${humidity}% | 💨 Wind: ${windspeed} km/h | ${weather}`);
  }, 5000);
}
