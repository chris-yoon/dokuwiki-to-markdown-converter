# dokuwiki 파일을 markdown 파일로 변환

## pandoc 설치
* https://pandoc.org/installing.html
* cmd 창에서 pandoc 버전 체크
```
pandoc --version
```

## 작업 폴더로 이동하여 txt 파일을 pandoc 실행하여 md 파일로 변환
```
cd d:/markdown
for /r %i in (*.txt) do pandoc -f dokuwiki -t markdown %~fi -o %~dpni.md
```

## md 파일중 uri encoded 된 파일명을 한글명으로 rename 하는 스크립트 작성
```
for /r %i in (*.md) do @node uri_decode.js %~pi %~ni %~xi %~di >> rename_decoded_ko.bat
```

## txt 파일은 모두 삭제
```
for /r %i in (*.txt) do del %~fi
```

## 이미지 파일중 uri encoded 된 파일명을 한글명으로 rename 하는 스크립트 작성
```
for /r %i in (*.gif, *.jpg, *.jpeg, *.png) do @node uri_decode.js %~pi %~ni %~xi %~di >> rename_decoded_ko_img.bat
```

## 이미지 파일외 파일 삭제
```
for /r %i in (*.pdf, *.zip, *.doc, *.ppt, *.tar) do del %~fi
```

## regexp replace 적용


## 참고사항
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