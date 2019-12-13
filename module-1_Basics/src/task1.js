var encoding = 'utf8';
process.stdin.setEncoding(encoding);

process.stdin.on('readable', function (chunk) {
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`${chunk.split('').reverse().join('')}\n\n`);
  }
});

process.stdin.on('end', function () {
  process.stdout.write('end');
});


