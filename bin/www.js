const app = require("../index");
const syncDb = require("./sync-db");

syncDb().then(() => {
  console.log("Sync database");
  app.listen(3000, () => {
    console.log(`Example app listening on 3000 port`);
  });
});
