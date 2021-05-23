// https://regexper.com/
// https://ko.wikipedia.org/wiki/%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D
// https://regexr.com/5mhou

//![](/images/adt/개발환경목록.gif)
//![표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.jpg)

function replaceDokuwikiLinkWithMarkdownStyle(text) {
  // (Important) Non-capturing group in regular expressions : (?:
  const REGEX_URL_END_WITH_IMG_EXT = /\[(.*?)\]\((\/.*?\.(?:jpg|png|gif))\)/gim;

  // (Important) Negative lookbehind, make sure we haven't ".jpg" : (?<!
  const REGEX_URL_END_WITH_NOT_IMG_EXT =
    /\[(.*?)\]\((.*?)(?<!.(?:jpg|gif|png))\)/gim;

  // (Important) Positive lookahead. Matches a group after the main expression without including in the result : (?=
  const REGEX_SLASH_IN_IMG_URL = /\/(?=.*\.(jpg|png|gif)\))/gim;

  //1st Group ($1) : String in bracket []
  //2nd Group ($2) : String in parenthesis ()

  if (REGEX_URL_END_WITH_IMG_EXT.test(text)) {
    let modifiedText = text.replace(REGEX_SLASH_IN_IMG_URL, ":");

    return modifiedText.replace(
      /\[(.*?)\]\(\:(.*?\.(?:jpg|png|gif))\)/gim,
      "[$1](https://www.egovframe.go.kr/wiki/lib/exe/fetch.php?media=$2)"
    );
  } else if (REGEX_URL_END_WITH_NOT_IMG_EXT.test(text)) {
    return text.replace(REGEX_URL_END_WITH_NOT_IMG_EXT, "[$1](..$2.md)");
  }
}

console.log(
  replaceDokuwikiLinkWithMarkdownStyle(
    "[표준관리전체프로세스](/images/adt/표준관리_전체프로세스.jpg)"
  )
); //?

console.log(
  replaceDokuwikiLinkWithMarkdownStyle(
    "[표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.gif)"
  )
);

console.log(
  replaceDokuwikiLinkWithMarkdownStyle(
    "[표준관리전체프로세스](/egovframework/adt/표준관리_전체프로세스.png)"
  )
);

console.log(
  replaceDokuwikiLinkWithMarkdownStyle(
    "[표준프레임워크 모바일 디바이스 API 개발환경](/egovframework/hyb3.9/hdev)"
  )
);
