# How to convert dokuwiki to markdown
It will be helpful when there are too many dokuwiki files to convert.
To convert dokuwiki to markdown I will use a document conversion tool called pandoc.
And also I will use the following basic sentence structure to automate time-consuming tasks.
> for {each item} in {a collection of items} do {command} 

## Installation (pandoc)
Pandoc is a free and open-source document converter. It was created by John MacFarlane, a philosophy professor at the University of California, Berkeley. (10 August 2006)

* https://pandoc.org/installing.html
* Check the pandoc version in the cmd
```
pandoc --version
```

## Usage
### 1. Convert dokuwiki files to md files using pandoc
```
cd d:/markdown
for /r %i in (*.txt) do pandoc -f dokuwiki -t markdown %~fi -o %~dpni.md
```
> for /r : Loop through files (Recurse subfolders)
> 
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

### 6. regexp replace 적용
It is necessary to change the image path within the md file. For example, the following image paths applied to dokuwiki can be different in markdown:
```
-- as-is
![공통분류코드목록 화면](/egovframework/com/sym/ccc/cmmnclcodelist.jpg)
-- to-be
![공통분류코드목록 화면](../../media/egovframework/com/sym/ccc/cmmnclcodelist.jpg)
```
The following absolute path link isn't at all recognized as a link.
```
-- as-is
-   실행환경 참조 : [scheduling](/egovframework/rte/fdl/scheduling)
-- to-be
-   실행환경 참조 : [scheduling](../egovframework/rte/fdl/scheduling)
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
-
for /r %i in (*.md) do @echo %~fi
```