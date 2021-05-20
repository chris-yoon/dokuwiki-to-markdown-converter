function idCheck(data) {
    var titleCheck = data;
    var languageCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (languageCheck.test(titleCheck)) {
        console.log("ID에 한글이 포함되어 있습니다.");
        return;
    }
}

function checkNumber(data) {
    let checkData = data;
    if(checkData.length > 18) {
        data = checkData.substring(0,8);
    } else {
        //숫자가 아닌 문자 모두 제거
        data = checkData.replace(/[^0-9]/g, '');
    }
    console.log(data)
}

//checkNumber("ab12a34c3d");
//checkNumber("abdddkdkdkssldk");
//console.log('test'.length)

//https://regexper.com/
//https://ko.wikipedia.org/wiki/%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D

//![](/images/adt/개발환경목록.gif)
//![표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.jpg)


function parseMd(text) {
    const codeblock = /```([^]+?.*?[^]+?[^]+?)```/g
    const code = /`(.*?)`/g
    const link = /\[(.*?)\]\((.*?)\)/g
    const paragraph = /(.+((\r?\n.+)*))/g
    const link_with_ext = /\[(.*?)\]\((.*?\.(.*?))\)/g
    const link_dir_with_ext = /\[(.*?)\]\(\/(.*?)\/(.*?\.(.*?))\)/g
    const end_with_jpg = /jpg$|png$/g //jpg, png 로 끝나는 문자열 체크
    const image_extiontions = /jpg|png|gif/g //값이 jpg 또는 png 또는 gif

    var txtResult = text.replace(link_with_ext, '$2');
    var extention = text.replace(link_with_ext, '$3');
    console.log(extention);

    if(image_extiontions.test(extention)) {
        console.log("images")
    }

    if (end_with_jpg.test(txtResult)) {
        console.log("다음은 이미지 파일입니다.");
        return text.replace(link_with_ext, '[$1]($2)')
        
    } else  {
        console.log("다음은 이미지 파일이 아닙니다.");
        return text.replace(link_with_ext, '[$1]($2.md)')
    }

//    return text.replace(codeblock, '<pre><code>$1</code></pre>')
//    .replace(code, '<code>$1</code>')
    //.replace(link, '<a href="$2">$1</a>')
    //.replace(paragraph, '<p>$1</p>')
    //.replace(link_dir_with_ext, '1: $1, 2: $2, 3: $3, 4: $4');;
//    .replace(link_with_ext, '[$1]($2.md)')
    //.replace(".jpg", '');

}

//console.log(parseMd("```test```"))
console.log(parseMd("[표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.jpg)"))
console.log(parseMd("[표준프레임워크 모바일 디바이스 API 개발환경](/egovframework/hyb3.9/hdev)"))
console.log(parseMd("[표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.jpg)"))

