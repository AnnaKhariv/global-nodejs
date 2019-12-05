process.stdin.setEncoding('utf8');

function reverse(data) {
  const reversedData = [];
  const array = data.split('');
  array.pop();

  for(let i = 0; i < array.length; i++) {
    reversedData.unshift(array[i]);
  }

  return reversedData.join('');
}

process.stdin.on('readable', () => {
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`${reverse(chunk)}\n\n`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});



