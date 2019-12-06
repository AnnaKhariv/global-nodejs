var encoding = 'utf8';
process.stdin.setEncoding(encoding);

function reverse(data) {
  var reversedData = [];
  var array = data.split('');
  array.pop();

  for(var i = 0; i < array.length; i++) {
    reversedData.unshift(array[i]);
  }

  return reversedData.join('');
}

process.stdin.on('readable', function (chunk) {
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`${reverse(chunk)}\n\n`);
  }
});

process.stdin.on('end', function () {
  process.stdout.write('end');
});


