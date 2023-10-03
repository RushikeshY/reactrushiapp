const fs = require("fs");
const csv = require("fast-csv");

class ProdCSV {
  rows = [];
  async init(path) {
    await new Promise((rs, rj) => {
      fs.createReadStream("products.csv")
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => console.error(error))
        .on("data", (row) => {
          this.rows.push(row);
        })
        .on("end", (rowCount) => {
          console.log(`Parsed ${rowCount} rows`);
          rs();
        });
    });
  }
  keys() {
    return this.keyIndex;
  }
}

async function main() {
  const pc = new ProdCSV();
  await pc.init("./products.csv");
  console.log(pc.rows[5]);
}

module.exports = ProdCSV;
