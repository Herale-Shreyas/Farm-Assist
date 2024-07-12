import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const WeatherPage = () => {
  const [pinCode, setPinCode] = useState("");
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchWeatherData = async () => {
    const API_KEY = import.meta.env.WEATHER_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${pinCode},in&${API_KEY}`);
    const data = await response.json();
    if (data.cod !== "200") {
      toast({ description: "Failed to fetch weather data" });
      return;
    }
    setWeatherData(data.list);
    const formattedChartData = data.list.map((item: any) => ({
      date: item.dt_txt,
      temperature: item.main.temp - 273.15, // Convert from Kelvin to Celsius
      humidity: item.main.humidity,
    }));
    setChartData(formattedChartData);
  };

  return (
    <div className="w-full flex flex-col items-center pt-10 pb-10">
      <Card className="w-[95%] max-w-[800px] mb-10">
        <CardHeader>
          <CardTitle>Weather Information</CardTitle>
          <CardDescription>Enter your pin code to get weather data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            <Button onClick={fetchWeatherData}>Get Weather</Button>
          </div>
        </CardContent>
      </Card>

      {weatherData.length > 0 && (
        <Card className="w-[95%] max-w-[800px]">
          <CardHeader>
            <CardTitle>Weather Data</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {weatherData.slice(0, 5).map((item, index) => (
                <li key={index}>
                  <div>Date and Time: {item.dt_txt}</div>
                  <div>Temperature: {(item.main.temp - 273.15).toFixed(2)}°C</div>
                  <div>Humidity: {item.main.humidity}%</div>
                  <div>Weather: {item.weather[0].description}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {chartData.length > 0 && (
        <Card className="w-[95%] max-w-[800px] mt-10">
          <CardHeader>
            <CardTitle>Temperature and Humidity Chart</CardTitle>
            <CardDescription>Showing data for the next 5 days</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart width={700} height={400} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="humidity" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherPage;