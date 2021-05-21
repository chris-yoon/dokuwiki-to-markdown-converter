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
  if (checkData.length > 18) {
    data = checkData.substring(0, 8);
  } else {
    //숫자가 아닌 문자 모두 제거
    data = checkData.replace(/[^0-9]/g, "");
  }
  console.log(data);
}

//checkNumber("ab12a34c3d");
//checkNumber("abdddkdkdkssldk");
//console.log('test'.length)

//https://regexper.com/
//https://ko.wikipedia.org/wiki/%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D

//![](/images/adt/개발환경목록.gif)
//![표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.jpg)

function parseMd(text) {
  const link_with_ext = /\[(.*?)\]\((.*?\.(.*?))\)/gim;
  const url_end_with_image_ext = /\[(.*?)\]\((.*?\.(jpg|png|gif))\)/gim;
  const url_end_with_not_image_ext = /\[(.*?)\]\((.*?[^\.(jpg|png|gif)])\)/gim;

  //1st Group : String in bracket []
  //2nd Group : String in parenthesis ()
  var txtMutable = text.replace(link_with_ext, "$2");
  //3rd Group : Extenstion in parenthesis ()

  if (url_end_with_image_ext.test(text)) {
    return text.replace(link_with_ext, "[$1](../../media$2)");
  } else if (url_end_with_not_image_ext.test(text)) {
    return text.replace(link_with_ext, "[$1](..$2)");
  }
}

console.log(
  parseMd(
    "[표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.jpg)"
  )
);

console.log(
  parseMd(
    "[표준프레임워크 모바일 디바이스 API 개발환경](/egovframework/hyb3.9/hdev)"
  )
);

console.log(
  parseMd(
    "[표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.gif)"
  )
);
