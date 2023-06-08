import fetch from "node-fetch";
import Message from "../model/Message.js";
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

export const message = async (req, res) => {
  try {
    // create new message
    const newMessage = await new Message({
      fullName: req.body.fullName,
      emailTo: req.body.emailTo,
      emailFrom: req.body.emailFrom,
      message: req.body.message,
    });

    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(400).send(err);
    console.log(err, "Message save failed");
  }
};
