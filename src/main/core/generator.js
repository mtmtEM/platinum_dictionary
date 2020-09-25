/**
 * Mouse Dictionary (https://github.com/wtetsu/mouse-dictionary/)
 * Copyright 2018-present wtetsu
 * Licensed under MIT
 */

import Hogan from "hogan.js";

export default class Generator {
  constructor(settings) {
    this.shortWordLength = settings.shortWordLength;
    this.cutShortWordDescription = settings.cutShortWordDescription;

    const cssReset = "margin:0;padding:0;border:0;vertical-align:baseline;line-height:normal;";
    const cssButton = "width: 100%;max-width: 340px;padding: 9px 10px;display: inline-block;text-align: center;letter-spacing: 0.1em;";

    this.baseParameters = {
      headFontColor: settings.headFontColor,
      descFontColor: settings.descFontColor,
      headFontSize: settings.headFontSize,
      descFontSize: settings.descFontSize,
      cssReset,
      cssButton,
    };

    this.scroll = settings.scroll;

    this.compiledReplaceRules = compileReplaceRules(settings.replaceRules, { cssReset });

    // Since contentTemplate is executed fairly frequently,
    // Generator uses this compiled result repeatedly.
    this.compiledContentTemplate = Hogan.compile(settings.contentTemplate);
  }

  generate(words, descriptions, enableShortWordLength = true, allEntries) {
    const html = this.createContentHtml(
      words,
      descriptions,
      this.compiledContentTemplate,
      enableShortWordLength,
      allEntries
    );
    const hitCount = Object.keys(descriptions).length;
    return { html, hitCount };
  }
  createContentHtml(words, descriptions, compiledContentTemplate, enableShortWordLength, allEntries) {
    const parameters = {
      ...this.baseParameters,
      words: this.createWordsParameter(words, descriptions, enableShortWordLength),
      secWords: this.createSecWordsParameter(allEntries), //HTMLへのパラメータの受け渡し
    };
    const html = compiledContentTemplate.render(parameters);
    return html;
  }

  createDescriptionHtml(sourceText) {
    let result = sourceText;
    for (let i = 0; i < this.compiledReplaceRules.length; i++) {
      const rule = this.compiledReplaceRules[i];
      result = result.replace(rule.search, rule.replace);
    }
    return result;
  }

  //マウスオーバーで得られたがドメイン,IPアドレス,ハッシュ値のパラメータに該当するか確認
  createSecWordsParameter(entries){
    const data = [];
    for (let i = 0; i < entries.length; i++) {
      const flag = regCheckDomain(entries[i]) || regCheckIPAddr(entries[i]) || regCheckHash(entries[i])
      if (flag==true){
          data.push({
            domain: entries[i],
            ipaddr: entries[i],
            hash: entries[i],
            isDomain: regCheckDomain(entries[i]),
            isIPAddr: regCheckIPAddr(entries[i]),
            isHash: regCheckHash(entries[i])
          });
      }
    }
    return [data[0]];
  };

  createWordsParameter(words, descriptions, enableShortWordLength) {
    const data = [];
    const shortWordLength = enableShortWordLength ? this.shortWordLength : 0;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const desc = descriptions[word];
      if (typeof desc !== "string") {
        continue;
      }
      data.push({
        head: escapeHtml(word),
        desc: this.createDescriptionHtml(desc),
        isShort: word.length <= shortWordLength,
        shortDesc: desc.substring(0, this.cutShortWordDescription),
        isFirst: false,
        isLast: false,
      });
    }
    if (data.length >= 1) {
      data[0].isFirst = true;
      data[data.length - 1].isLast = true;
    }
    return data;
  }
}

const compileReplaceRules = (replaceRules, renderParameters) => {
  const compiledReplaceRules = [];
  for (let i = 0; i < replaceRules.length; i++) {
    const compiledRule = compileReplaceRule(replaceRules[i], renderParameters);
    if (compiledRule) {
      compiledReplaceRules.push(compiledRule);
    }
  }
  return compiledReplaceRules;
};

const compileReplaceRule = (rule, renderParameters) => {
  if (!rule.search) {
    return null;
  }
  let re = null;
  try {
    re = new RegExp(rule.search, "g");
  } catch (error) {
    console.error(error);
  }
  if (!re) {
    return null;
  }

  const template = Hogan.compile(rule.replace);
  const replace = template.render(renderParameters);

  return {
    search: re,
    replace,
  };
};

const mapForEscapeHtml = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

const reForEscapeHtml = /&|<|>|"/g;

const escapeHtml = (str) => {
  return str.replace(reForEscapeHtml, (ch) => mapForEscapeHtml[ch]);
};

//文字列がどれに当てはまるか正規表現による照合を行う
const regCheckDomain = (str) => {
  const checkDomain = /^([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*(\[\.\]|\.))+[a-zA-Z]{2,}$/.test(str);
  return checkDomain;
};

const regCheckIPAddr = (str) => {
  const checkIPAddr = /^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\[\.\]|\.)){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(str);
  return checkIPAddr;
};

const regCheckHash = (str) => {
  const checkMD5 = /(?:[^a-fA-F\d]|\b)([a-fA-F\d]{32})(?:[^a-fA-F\d]|\b)/.test(str);
  const checkSHA1 = /(?:[^a-fA-F\d]|\b)([a-fA-F\d]{40})(?:[^a-fA-F\d]|\b)/.test(str);
  const checkSHA256 = /(?:[^a-fA-F\d]|\b)([a-fA-F\d]{64})(?:[^a-fA-F\d]|\b)/.test(str);

  const checkHash = checkMD5 || checkSHA1 || checkSHA256;

  return checkHash;
};