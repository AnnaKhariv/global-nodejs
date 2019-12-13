var fs = require('fs');
var csvtojson = require("csvtojson");
var inputPath ='./csv/node_mentoring_t1_2_input_example.csv';
var outputPath ='./txt/node_mentoring_t1_2_outut_example.txt';

var readable = fs.createReadStream(inputPath);
var writable = fs.createWriteStream(outputPath);

//READABLE
readable.on('open', function() {
  console.info(`Start reading data from ${inputPath}`);
});

readable.on('end', function() {
  console.info(`Finish reading data from ${inputPath}`);
});

readable.on('close', function () {
  console.info('Reading stream has been destroyed and file has been closed');
});

//WRITABLE
writable.on('open', function() {
  console.info(`Start writing data to ${outputPath}`);
});

writable.on('finish', function() {
  console.info(`Finish writing data to ${outputPath}`);
});

writable.on('close', function () {
  console.info('Writing stream has been destroyed and file has been closed');
});

//Error handling
readable.on('error', function(err) {
  console.error(`Unable to read data from ${inputPath}`, err);
  process.exit(0);
});

readable.on('error', function(err) {
  console.error(`Unable to write data to ${outputPath}`, err);
  process.exit(0);
});

readable.pipe(csvtojson()).pipe(writable);