// Mock data for the SunTrack solar panel system

// Panel data
export const mockPanelData = {
  temperature: 32,
  horizontalAngle: 135,
  verticalAngle: 45,
  tracking: "active",
  lastAdjustment: "10 minutes ago",
  systemHealth: "optimal",
  motorStatus: "operational",
  sensorStatus: "operational",
  nextMaintenance: "45 days",
  alerts: [],
  performanceData: [
    { time: "6:00", angle: 15, energy: 0.2 },
    { time: "7:00", angle: 25, energy: 0.8 },
    { time: "8:00", angle: 35, energy: 1.5 },
    { time: "9:00", angle: 45, energy: 2.2 },
    { time: "10:00", angle: 55, energy: 2.8 },
    { time: "11:00", angle: 75, energy: 3.2 },
    { time: "12:00", angle: 90, energy: 3.5 },
    { time: "13:00", angle: 85, energy: 3.4 },
    { time: "14:00", angle: 75, energy: 3.2 },
    { time: "15:00", angle: 65, energy: 2.8 },
    { time: "16:00", angle: 45, energy: 2.1 },
    { time: "17:00", angle: 30, energy: 1.4 },
    { time: "18:00", angle: 20, energy: 0.8 },
    { time: "19:00", angle: 10, energy: 0.3 },
  ],
}

// Weather data
export const mockWeatherData = {
  temperature: 28,
  humidity: 45,
  windSpeed: 8,
  uvIndex: 7,
  forecast: [
    { day: "Monday", condition: "sunny", temperature: 28, precipitation: 0 },
    { day: "Tuesday", condition: "partly-cloudy", temperature: 25, precipitation: 10 },
    { day: "Wednesday", condition: "cloudy", temperature: 22, precipitation: 30 },
    { day: "Thursday", condition: "rainy", temperature: 19, precipitation: 70 },
    { day: "Friday", condition: "partly-cloudy", temperature: 23, precipitation: 20 },
  ],
}

// Energy data
export const mockEnergyData = {
  currentOutput: 2.8,
  dailyTotal: 14.1,
  weeklyTotal: 98.5,
  monthlyTotal: 420.3,
  batteryLevel: 85,
  productionData: [
    { hour: "6 AM", production: 0.2, predicted: 0.2 },
    { hour: "7 AM", production: 0.8, predicted: 0.7 },
    { hour: "8 AM", production: 1.5, predicted: 1.4 },
    { hour: "9 AM", production: 2.2, predicted: 2.0 },
    { hour: "10 AM", production: 2.8, predicted: 2.5 },
    { hour: "11 AM", production: 3.2, predicted: 3.0 },
    { hour: "12 PM", production: 3.5, predicted: 3.2 },
    { hour: "1 PM", production: 3.4, predicted: 3.1 },
    { hour: "2 PM", production: 3.2, predicted: 3.0 },
    { hour: "3 PM", production: 2.8, predicted: 2.6 },
    { hour: "4 PM", production: 2.1, predicted: 2.0 },
    { hour: "5 PM", production: 1.4, predicted: 1.3 },
    { hour: "6 PM", production: 0.8, predicted: 0.7 },
    { hour: "7 PM", production: 0.3, predicted: 0.3 },
  ],
}
