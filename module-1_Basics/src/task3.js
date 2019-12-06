//2
import * as fs from 'fs';
import * as csvtojson from 'csvtojson';

const inputPath ='./csv/node_mentoring_t1_2_input_example.csv';
const outputPath ='./txt/node_mentoring_t1_2_outut_example.txt';

const readable = fs.createReadStream(inputPath);
const writable = fs.createWriteStream(outputPath);

readable.on('open', () => {
  console.info(`Start reading data from ${inputPath}`);
});


readable.pipe(csvtojson()).pipe(writable);
// //1
// const encoding = 'utf8';
// process.stdin.setEncoding(encoding);

// const reverse = (data) => {
//   const reversedData = [];
//   const array = data.split('');
//   array.pop();

//   for(let i = 0; i < array.length; i++) {
//     reversedData.unshift(array[i]);
//   }

//   return reversedData.join('');
// };

// process.stdin.on('readable', (chunk) => {
//   while ((chunk = process.stdin.read()) !== null) {
//     process.stdout.write(`${reverse(chunk)}\n\n`);
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });


