const fs = require("fs");
// const http = require("http");
const express = require("express");
const app = express();
const port = 3000;

// middleware untuk membaca json dari request body(client) ke kita
app.use(express.json());

// default url = health check
app.get("/", (req, res) => {
    res.status(200).json({
        status: "200",
        message: "Application is running good..."
   });
});

// kalau HTTP module kan if (req.url === / "muria") {}
app.get("/muria", (req, res) => {
    res.status(200).json({
        message: "Ping Succesfully !",
    });
});

// API/v1/(collection) => collection nya harus jamak
app.get("/api/v1/cars", async (req, res) => {
  try {
    const cars = JSON.parse(
      await fs.promises.readFile(`${__dirname}/assets/data/cars.json`, "utf-8")
    );

    res.status(200).json({
      status: "200",
      message: "Success get cars data",
      isSuccess: true,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get cars data",
      isSuccess: false,
      error: error.message,
    });
  }
});

const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);

app.get("/api/v1/cars/:id", (req, res) => {
  // SELECT * FROM
  // console.log({ data: req.params.id });
  const id = req.params.id;
  console.log(id);
  const car = cars.find((i) => i.id == id);

  if (!car) {
    return res.status(404).json({
      status: "Failed!",
      message: `Failed get data from id: ${id}`,
      isSuccess: false,
      data: null,
    });
  }

  res.status(200).json({
    status: "Success",
    car: { car },
  });
});

// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di aplikasi
// membuat middleware = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        status: "404",
        message: "API not exist",
    });
});

app.listen("3000", () => {
    console.log("server running on port 3000");
});
