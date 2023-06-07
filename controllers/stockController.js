import fetch from "node-fetch";

export const stockData = async (req, res) => {
  const apikey = process.env.STOCK_API_KEY;
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=RELIANCE.BSE&outputsize=compact&apikey=${apikey}`;
    const response = await fetch(url);
    const data = await response.json();
    const timeSeriesData = data["Time Series (Daily)"];
    const targetDate = "2023-05-15";
    const stockData = timeSeriesData[targetDate];
    res.status(200).send(stockData);
  } catch (err) {
    console.log(err);
  }
};
