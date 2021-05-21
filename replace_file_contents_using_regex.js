var glob = require("glob");
var fs = require("fs");
var replace = require("replace");

// Find file(s)
// glob(process.argv[2], function (err, files) {
// glob("**/*.md", function (err, files) {
glob(process.argv[2], function (err, files) {
  if (err) {
    throw err;
  }
  files.forEach(function (item, index, array) {
    // console.log(item + " found");
    // Read file
    // console.log(fs.readFileSync(item, 'utf8'));
    // Find and Replace string

    // [표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.jpg) --> [표준관리전체프로세스](../../media/egovframework/adt/표준관리_전체프로세스.jpg)
    replace({
      regex: /\[(.*?)\]\((\/egovframework.*?\.(jpg|png|gif))\)/gim,
      replacement: "[$1](../../media$2)",
      paths: [item],
      recursive: true,
      silent: true,
    });

    // [표준관리전체프로세스](/images/adt/표준관리_전체프로세스.jpg) --> [표준관리전체프로세스](../../media/egovframework/adt/표준관리_전체프로세스.jpg)
    replace({
      regex: /\[(.*?)\]\((?:\/images)(.*?\.(jpg|png|gif))\)/gim,
      replacement: "[$1](../../media/egovframework$2)",
      paths: [item],
      recursive: true,
      silent: true,
    });
    // console.log(item + " image url replacement complete");

    replace({
      regex: /\[(.*?)\]\((.*?[^\.(jpg|png|gif)])\)/gim,
      replacement: '"[$1](..$2)"',
      paths: [item],
      recursive: true,
      silent: true,
    });

    console.log(item + " url replacement complete");
  });
});
