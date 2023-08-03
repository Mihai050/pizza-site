const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");

function easyEdit(fileName, callback, param) {
    let data = JSON.parse(
    fs.readFileSync(path.join(__dirname, `${fileName}.json`), "utf8", (err) => {
        if (err) {
            console.log(err);
            return;
         }
    })
  );

    if (param) {
        data = callback(data, param);
    } else {
        data = callback(data);
    }
 

  const edited = JSON.stringify(data, null, 2);
  fs.writeFileSync(path.join(__dirname, `${fileName}.json`), edited, (err) => {
    if (err) {
        console.error(err);
    }
  });

}

module.exports = easyEdit;
