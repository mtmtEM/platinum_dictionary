/**
 * Mouse Dictionary (https://github.com/wtetsu/mouse-dictionary/)
 * Copyright 2018-present wtetsu
 * Licensed under MIT
 */

export default {
  shortWordLength: 1,
  cutShortWordDescription: 30,
  parseWordsLimit: 8,
  lookupWithCapitalized: false,
  initialPosition: "right",
  scroll: "scroll",
  skipPdfConfirmation: false,
  pdfUrl: "",
  backgroundColor: "#ffffff",
  headFontColor: "#000088",
  descFontColor: "#101010",
  headFontSize: "small",
  descFontSize: "small",
  btnborder: "2px",

  width: 350,
  height: 500,

  replaceRules: [
    {
      search: "(■.+|◆.+)",
      replace: '<span style="{{cssReset}};color:#008000;font-size:100%;">$1</span>',
    },
    {
      search: "({.+?}|\\[.+?\\]|\\(.+?\\))",
      replace: '<span style="{{cssReset}};color:#008000;font-size:100%;">$1</span>',
    },
    {
      search: "(【.+?】|《.+?》|〈.+?〉|〔.+?〕)",
      replace: '<span style="{{cssReset}};color:#008000;font-size:100%;">$1</span>',
    },
    {
      search: "\\n|\\\\n",
      replace: "<br/>",
    },
  ],

  normalDialogStyles: `{
  "opacity": 0.95,
  "zIndex": 2147483647
}`,

  movingDialogStyles: `{
  "opacity": 0.6
}`,

  hiddenDialogStyles: `{
  "opacity": 0.0,
  "zIndex": -1
}`,

  contentWrapperTemplate: `<div style="margin:0;padding:0;border:0;vertical-align:baseline;text-align:left;">
</div>`,

  dialogTemplate: `<div style="all:initial;
            {{systemStyles}}
            width: {{width}}px;
            height: {{height}}px;
            position: fixed;
            overflow-x: hidden;
            overflow-y: {{scroll}};
            top: 5px;
            background-color: {{backgroundColor}};
            z-index: 2147483646;
            padding: 2px 4px 2px 4px;
            border: 1px solid #A0A0A0;">
</div>`,

  contentTemplate: `<div style="{{cssReset}};font-family:'hiragino kaku gothic pro', meiryo, sans-serif;">
  {{#words}}
    {{^isShort}}
      <span style="{{cssReset}};font-size:{{headFontSize}};color:{{headFontColor}};font-weight:bold;">
        {{head}}
      </span>
      <br/>
      <span style="{{cssReset}};font-size:{{descFontSize}};color:{{descFontColor}};">
        {{{desc}}}
      </span>
    {{/isShort}}
    {{#isShort}}
      <span style="{{cssReset}};font-size:{{headFontSize}};color:{{headFontColor}};font-weight:bold;">
        {{head}}
      </span>
      <span style="{{cssReset}};color:#505050;font-size:x-small;">
        {{shortDesc}}
      </span>
    {{/isShort}}
    {{^isLast}}
      <br/><hr style="border:0;border-top:1px solid #E0E0E0;margin:0;height:1px;width:100%;" />
    {{/isLast}}
  {{/words}}
  {{#secWords}}
    {{#isDomain}}
      <span style="{{cssReset}};font-size:{{headFontSize}};color:{{headFontColor}};font-weight:bold;">
        {{domain}}
      </span>
      <br/>
      <button style="{{cssButton}};color:#6699ff;border:2px solid #6699ff;"; onclick="location.href='https://www.virustotal.com/gui/domain/{{domain}}/detection'">[現在タブ] VTでドメインを詳しく調べる</button>
      <button style="{{cssButton}};color:#6699ff;border:2px solid #6699ff;"; onclick="window.open('https://www.virustotal.com/gui/domain/{{domain}}/detection')">[新規タブ] VTでドメインを詳しく調べる</button>
      <br/>
      <button style="{{cssButton}};color:#ff6600;border:2px solid #ff6600;"; onclick="location.href='https://www.hybrid-analysis.com/search?query={{domain}}'">[現在タブ] HAでドメインを詳しく調べる</button>
      <button style="{{cssButton}};color:#ff6600;border:2px solid #ff6600;"; onclick="window.open('https://www.hybrid-analysis.com/search?query={{domain}}')">[新規タブ] HAでドメインを詳しく調べる</button>
      <br/>
      <button style="{{cssButton}};color:#cc3399;border:2px solid #cc3399;"; onclick="location.href='https://urlhaus.abuse.ch/browse.php?search={{domain}}'">[現在タブ] urlhausでドメインを詳しく調べる</button>
      <button style="{{cssButton}};color:#cc3399;border:2px solid #cc3399;"; onclick="window.open('https://urlhaus.abuse.ch/browse.php?search={{domain}}')">[新規タブ] urlhausでドメインを詳しく調べる</button>
    {{/isDomain}}
    {{#isIPAddr}}
      <span style="{{cssReset}};font-size:{{headFontSize}};color:{{headFontColor}};font-weight:bold;">
        {{ipaddr}}
      </span>
      <br/>
      <button style="{{cssButton}};color:#6699ff;border:2px solid #6699ff;"; onclick="location.href='https://www.virustotal.com/gui/ip-address/{{ipaddr}}/detection'">[現在タブ] VTでIPアドレスを詳しく調べる</button>
      <button style="{{cssButton}};color:#6699ff;border:2px solid #6699ff;"; onclick="window.open('https://www.virustotal.com/gui/domain/{{ipaddr}}/detection')">[新規タブ] VTでIPアドレスを詳しく調べる</button>
      <br/>
      <button style="{{cssButton}};color:#ff6600;border:2px solid #ff6600;"; onclick="location.href='https://www.hybrid-analysis.com/search?query={{ipaddr}}'">[現在タブ] HAでIPアドレスを詳しく調べる</button>
      <button style="{{cssButton}};color:#ff6600;border:2px solid #ff6600;"; onclick="window.open('https://www.hybrid-analysis.com/search?query={{ipaddr}}')">[新規タブ] HAでIPアドレスを詳しく調べる</button>
      <br/>
      <button style="{{cssButton}};color:#cc3399;border:2px solid #cc3399;"; onclick="location.href='https://feodotracker.abuse.ch/browse/host/{{ipaddr}}'">[現在タブ] Feodo Tracker/abuse.chでIPアドレスを詳しく調べる</button>
      <button style="{{cssButton}};color:#cc3399;border:2px solid #cc3399;"; onclick="window.open('https://feodotracker.abuse.ch/browse/host/{{ipaddr}}')">[新規タブ] Feodo Tracker/abuse.chでIPアドレスを詳しく調べる</button>
    {{/isIPAddr}}
    {{#isHash}}
      <span style="{{cssReset}};font-size:{{headFontSize}};color:{{headFontColor}};font-weight:bold;">
        {{hash}}
      </span>
      <br/>
      <button style="{{cssButton}};color:#6699ff;border:2px solid #6699ff;"; onclick="location.href='https://www.virustotal.com/gui/file/{{hash}}/detection'">[現在タブ] VTでハッシュ値を詳しく調べる</button>
      <button style="{{cssButton}};color:#6699ff;border:2px solid #6699ff;"; onclick="window.open('https://www.virustotal.com/gui/domain/{{hash}}/detection')">[新規タブ] VTでハッシュ値を詳しく調べる</button>
      <br/>
      <button style="{{cssButton}};color:#ff6600;border:2px solid #ff6600;"; onclick="location.href='https://www.hybrid-analysis.com/search?query={{hash}}/'">[現在タブ] HAでハッシュ値を詳しく調べる</button>
      <button style="{{cssButton}};color:#ff6600;border:2px solid #ff6600;"; onclick="window.open('https://www.hybrid-analysis.com/search?query={{hash}}/')">[新規タブ] HAでハッシュ値を詳しく調べる</button>
      <br/>
      <button style="{{cssButton}};color:#cc3399;border:2px solid #cc3399;"; onclick="location.href='https://bazaar.abuse.ch/browse.php?search={{hash}}/'">[現在タブ] abuse.chでハッシュ値を詳しく調べる</button>
      <button style="{{cssButton}};color:#cc3399;border:2px solid #cc3399;"; onclick="window.open('https://bazaar.abuse.ch/browse.php?search={{hash}}/')">[新規タブ] abuse.chでハッシュ値を詳しく調べる</button>
    {{/isHash}}
  {{/secWords}}
</div>`,
};
