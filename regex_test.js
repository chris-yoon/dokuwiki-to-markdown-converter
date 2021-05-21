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
  const REGEX_URL_END_WITH_IMG_EXT1 =
    /\[(.*?)\]\((\/egovframework.*?\.(jpg|png|gif))\)/gim;

  // (Important) Non-capturing group in regular expressions : ?:
  const REGEX_URL_END_WITH_IMG_EXT2 =
    /\[(.*?)\]\((?:\/images)(.*?\.(jpg|png|gif))\)/gim;

  const REGEX_URL_END_WITH_NOT_IMG_EXT =
    /\[(.*?)\]\((.*?[^\.(jpg|png|gif)])\)/gim;

  //1st Group : String in bracket []
  //2nd Group : String in parenthesis ()
  //3rd Group : Extenstion in parenthesis ()

  if (REGEX_URL_END_WITH_IMG_EXT1.test(text)) {
    return text.replace(REGEX_URL_END_WITH_IMG_EXT1, "[$1](../../media$2)");
  } else if (REGEX_URL_END_WITH_IMG_EXT2.test(text)) {
    return text.replace(
      REGEX_URL_END_WITH_IMG_EXT2,
      "[$1](../../media/egovframework$2)"
    );
  } else if (REGEX_URL_END_WITH_NOT_IMG_EXT.test(text)) {
    return text.replace(REGEX_URL_END_WITH_NOT_IMG_EXT, "[$1](..$2)");
  }
}

console.log(
  parseMd("[표준관리전체프로세스](/images/adt/표준관리_전체프로세스.jpg)")
);

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
