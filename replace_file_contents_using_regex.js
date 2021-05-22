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
    // replace({
    //   regex: /\[(.*?)\]\((\/egovframework.*?\.(jpg|png|gif))\)/gim,
    //   replacement: "[$1](../../media$2)",
    //   paths: [item],
    //   recursive: true,
    //   silent: true,
    // });

    // [표준관리전체프로세스](/images/adt/표준관리_전체프로세스.jpg) --> [표준관리전체프로세스](../../media/egovframework/adt/표준관리_전체프로세스.jpg)
    // replace({
    //   regex: /\[(.*?)\]\((?:\/images)(.*?\.(jpg|png|gif))\)/gim,
    //   replacement: "[$1](../../media/egovframework$2)",
    //   paths: [item],
    //   recursive: true,
    //   silent: true,
    // });
    // console.log(item + " image url replacement complete");

    // replace({
    //   regex: /\[(.*?)\]\((.*?[^\.(jpg|png|gif)])\)/gim,
    //   replacement: '"[$1](..$2)"',
    //   paths: [item],
    //   recursive: true,
    //   silent: true,
    // });

    // (/egovframework/dev3.8/mavenrepository3.8.jpg) --> (https://www.egovframe.go.kr/wiki/lib/exe/fetch.php?media=egovframework:dev3.8:mavenrepository3.8.jpg)
    // 1st step : In order to convert / into : , use 'regular expression and condition' like '(?=match this expression)'
    // 2nd step : Use capturing group $1
    // node replace_file_contents_using_regex.js test.md
    replace({
      regex: /\/(?=.*\.(jpg|png|gif)\))/gim,
      replacement: ":",
      paths: [item],
      recursive: true,
      silent: true,
    });

    replace({
      regex: /\(\:(egovframework.*?\.(?:jpg|png|gif))\)/gim,
      replacement:
        "(https://www.egovframe.go.kr/wiki/lib/exe/fetch.php?media=$1)",
      paths: [item],
      recursive: true,
      silent: true,
    });

    console.log(item + " url replacement complete");
  });
});
