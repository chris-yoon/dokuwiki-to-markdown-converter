# How to convert dokuwiki to markdown

This project was created to convert the dokuwiki files in https://www.egovframe.go.kr/wiki/doku.php into a markdown files in github.

It will be helpful when there are too many dokuwiki files to convert.
To convert dokuwiki to markdown I will use a document conversion tool called pandoc.
And also I will use the following basic sentence structure to automate time-consuming tasks.

> for {each item} in {a collection of items} do {command}

## Installation (pandoc, glob, replace)

Pandoc is a free and open-source document converter. It was created by John MacFarlane, a philosophy professor at the University of California, Berkeley. (10 August 2006)

- https://pandoc.org/installing.html
- Check the pandoc version in the cmd

```
pandoc --version
```

- "Globs" are the patterns you type when you do stuff like ls _.js on the command line, or put build/_ in a .gitignore file.
- https://www.npmjs.com/package/glob

```
npm i glob
```

- replace is a command line utility for performing search-and-replace on files
- https://www.npmjs.com/package/replace

```
npm i replace
```

## Usage

### 1. Convert dokuwiki files to md files using pandoc

```
cd d:/markdown
for /r %i in (*.txt) do pandoc -f dokuwiki -t markdown %~fi -o %~dpni.md
```

> for /r : Loop through files (Recurse subfolders)

### 2. Change the names of the url-encoded md files to Korean.

```
for /r %i in (*.md) do @node uri_decode.js %~pi %~ni %~xi %~di >> rename_decoded_ko.bat
```

```
-- process.argv mapping
-- process.argv[0]: node
-- process.argv[1]: uri_decode.js
-- process.argv[2]: %~pi (path)
-- process.argv[3]: %~ni (name)
-- process.argv[4]: %~xi (extention)
-- process.argv[5]: %~di (drive)
console.log('rename ' + process.argv[5] + process.argv[2] + process.argv[3] + process.argv[4] + ' ' + decodeURI(process.argv[3]) + process.argv[4]);

-- result
rename D:\markdown\pages\egovframework\%EA%B2%8C%EC%8B%9C%EB%AC%BC%ED%86%B5%EA%B3%84.md 게시물통계.md
```

run the following batch file from the command line

```
rename_decoded_ko.bat
```

### 3. Delete all dokuwiki txt files

```
for /r %i in (*.txt) do del %~fi
```

### 4. Change the url-encoded image filenames to Korean.

```
for /r %i in (*.gif, *.jpg, *.jpeg, *.png) do @node uri_decode.js %~pi %~ni %~xi %~di >> rename_decoded_ko_img.bat
```

run the following batch file from the command line

```
rename_decoded_ko_img.bat
```

### 5. Delete unnecessary files

```
for /r %i in (*.pdf, *.zip, *.doc, *.ppt, *.tar) do del %~fi
```

### 6. Find and replace text using regular expressions

It is necessary to change the image path within the md file. For example, the following image paths applied to dokuwiki can be different in markdown:

```
![공통분류코드목록 화면](/egovframework/com/sym/ccc/cmmnclcodelist.jpg)
-->
![공통분류코드목록 화면](../../media/egovframework/com/sym/ccc/cmmnclcodelist.jpg)

![](/images/com/cop/smt/lsm/월별일정.png)
-->
![](../../media/egovframework/com/cop/smt/lsm/월별일정.png)

(/egovframework/dev3.8/mavenrepository3.8.jpg)
-->
https://www.egovframe.go.kr/wiki/lib/exe/fetch.php?media=egovframework:dev3.8:mavenrepository3.8.jpg
```

```
-- starting with '/' and ending with '.jpg' or '.png' or '.gif'
-- flag: global, case insensitive, multilne
/\/.*\.(jpg|png|gif)/gim
```

The following absolute path link isn't at all recognized as a link.

```
-- as-is
-   실행환경 참조 : [scheduling](/egovframework/rte/fdl/scheduling)
-- to-be
-   실행환경 참조 : [scheduling](../egovframework/rte/fdl/scheduling)
```

```
-- starting with '/' and ending in not '.jpg' or '.png' or '.gif'
-- flag: global, case insensitive, multilne
/\(.*[^\.(jpg|png|gif)]\)/gim
```

```
node replace_file_contents_using_regex.js 게시물통계.md
for /r %i in (*.md) do @node replace_file_contents_using_regex.js %~fi
```

## Reference

```
– drive only
for /r %i in (*.md) do @echo %~di
– path only
for /r %i in (*.md) do @echo %~pi
– file name only
for /r %i in (*.md) do @echo %~ni
– extention only
for /r %i in (*.md) do @echo %~xi
- full path of a file
for /r %i in (*.md) do @echo %~fi
```

### RegExr

- "[regexr.com/5mhou](..https://regexr.com/5mhou)"
- type the following expression on the webpage and you will realize what it means

```
-- Groups and ranges
/Hi/gm
/Hi|Hello/gm
/(Hi|Hello)|(And)/gm
/gr(e|a|d)y/gm
/gr(?:e|a)y/gm
/gr[aed]y/gm
/gr[abcdef]/gm
/gr[a-f]/gm
/[a-zA-Z0-9]/gm
/[^a-zA-Z0-9]/gm

-- Quantifiers
/gra?y/gm
/gra*y/gm
/gra+y/gm
/gra{2}y/gm
/gra{2,3}/gm
/gra{2,}/gm

-- Boundary-type
/\bYa/gm
/Ya\b/gm
/Ya\B/gm
/^Ya/gm
/Ya$/gm

-- Character classes
/./gm
/\./gm
/\[\]/gm
/\d/gm
/\D/gm
/\w/gm
/\W/gm
/\s/gm
/\S/gm

-- mobile phone number
/\d\d\d-\d\d\d-\d\d\d\d/gm
/\d{2,3}[- .]\d{3}[- .]\d{4}/gm

-- email
/[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/gm

-- youtube url
/(https?:\/\/)?(www\.)?youtu.be\/([a-zA-Z0-9-]{11})/gm
-- If you want only youtube id, please add ?: right next to the parenthesis
/(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9-]{11})/gm
```

- "[RegexOne - Interactive Tutorial](..https://regexone.com/)"

### Replace

```
    // [표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.jpg) --> [표준관리전체프로세스](../../media/egovframework/adt/표준관리_전체프로세스.jpg)
    replace({
      regex: /\[(.*?)\]\((\/egovframework.*?\.(jpg|png|gif))\)/gim,
      replacement: "[$1](../../media$2)",
      paths: [item],
      recursive: true,
      silent: true,
    });
```

```
    // [표준관리전체프로세스](/images/adt/표준관리_전체프로세스.jpg) --> [표준관리전체프로세스](../../media/egovframework/adt/표준관리_전체프로세스.jpg)
    replace({
      regex: /\[(.*?)\]\((?:\/images)(.*?\.(jpg|png|gif))\)/gim,
      replacement: "[$1](../../media/egovframework$2)",
      paths: [item],
      recursive: true,
      silent: true,
    });
```

```
    // [scheduling](/egovframework/rte/fdl/scheduling) --> [scheduling](../egovframework/rte/fdl/scheduling)
    replace({
      regex: /\[(.*?)\]\((.*?[^\.(jpg|png|gif)])\)/gim,
      replacement: '"[$1](..$2)"',
      paths: [item],
      recursive: true,
      silent: true,
    });
```

```
    // (/egovframework/dev3.8/mavenrepository3.8.jpg) --> (https://www.egovframe.go.kr/wiki/lib/exe/fetch.php?media=egovframework:dev3.8:mavenrepository3.8.jpg)
    // 1st step : In order to convert / into : , use 'regular expression and condition' like '(?=match this expression)'
    replace({
      regex: /\/(?=.*\.(jpg|png|gif)\))/gim,
      replacement: ":",
      paths: [item],
      recursive: true,
      silent: true,
    });

    // 2nd step : Use capturing group $1
    replace({
      regex: /\(\:(egovframework.*?\.(?:jpg|png|gif))\)/gim,
      replacement:
        "(https://www.egovframe.go.kr/wiki/lib/exe/fetch.php?media=$1)",
      paths: [item],
      recursive: true,
      silent: true,
    });
```

```
    String.prototype.replaceAll = function (org, dest) {
      return this.replace(org, dest);
    };

    function replaceWithColon(org) {
      var dest;
      dest = org.replace(/\//gi, ":");
      console.log(dest);
      return dest;
    }
```
