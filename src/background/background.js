/**
 * Mouse Dictionary (https://github.com/wtetsu/mouse-dictionary/)
 * Copyright 2018-present wtetsu
 * Licensed under MIT
 */

import ExpiringQueue from "./queue";
import uniqueId from "./unique";
import {regCheckDomain, regCheckIPAddr, regCheckHash} from "./checkParamType";

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({
    file: "./main.js",
  });
});

// cross-extension messaging
chrome.runtime.onMessageExternal.addListener((message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      chrome.tabs.sendMessage(tab.id, { message: message });
    }
  });
});

// PDF handling
const queue = new ExpiringQueue(1000 * 30);
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request?.type) {
    case "open_pdf": {
      const id = uniqueId(32);
      queue.push(id, request.payload);
      chrome.runtime.sendMessage({ type: "prepare_pdf" });
      chrome.runtime.openOptionsPage(() => {
        sendResponse();
      });
      break;
    }
    case "shift_pdf_id": {
      const frontId = queue.shiftId();
      sendResponse(frontId);
      break;
    }
    case "get_pdf_data": {
      const pdfData = queue.get(request.id);
      sendResponse(pdfData);
      break;
    }
  }
});

// add item to open analysis pages
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openPlatDictAnalysisPage",
    title: "VTの分析結果を見る",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const param = info.selectionText;
  let type;

  if (regCheckDomain(param)){
    type = 0;
  } else if (regCheckIPAddr(param)){
    type = 1;
  } else if (regCheckHash(param)){
    type = 2;
  } else {
    type = 3;
  }

  if(type < 3){
    // 分析ページ用に情報を保存する
    localStorage.vt_type = type;
    localStorage.vt_param = param;

    if (info.menuItemId == "openPlatDictAnalysisPage") {
      chrome.tabs.create({
        index: tab.index+1,
        url: 'analysis/result.html'
      });
    }
  }
});