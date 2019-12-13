//2
import {createReadStream, createWriteStream} from 'fs';
const csvtojson = require ('csvtojson');

const inputPath ='./dist/csv/node_mentoring_t1_2_input_example.csv';
const outputPath ='./dist/txt/node_mentoring_t1_2_outut_example.txt';

const readable = createReadStream(inputPath);
const writable = createWriteStream(outputPath);

readable
  .on('open', () => console.info(`Start reading data from ${inputPath}`))
  .on('end', () => console.info(`Finish reading data from ${inputPath}`))
  .on('close', () => console.info('Reading stream has been destroyed and file has been closed'))
  .on('error', (err) => console.error(`Unable to read data from ${inputPath}`, err));

writable
  .on('open', () => console.info(`Start writing data to ${outputPath}`))
  .on('finish', () => console.info(`Finish writing data to ${outputPath}`))
  .on('close', () => console.info('Writing stream has been destroyed and file has been closed'))
  .on('error', (err) => console.error(`Unable to write data to ${outputPath}`, err));

readable.pipe(csvtojson()).pipe(writable);

//1
const encoding = 'utf8';
process.stdin.setEncoding(encoding);

process.stdin.on('readable', (chunk) => {
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`${chunk.split('').reverse().join('')}\n\n`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
