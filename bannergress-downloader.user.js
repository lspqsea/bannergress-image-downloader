// ==UserScript==
// @name         Bannergress-Image-Downloader
// @namespace    https://github.com/lspqsea/bannergress-image-downloader
// @version      1.7
// @description  Automatically detect language and download original (=s0) mission icons from Bannergress.
// @author       lspqsea & Gemini
// @match        https://bannergress.com/banner/*
// @grant        GM_download
// @grant        GM_notification
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 1. 定义多语言字典
    const i18n = {
        'zh-CN': {
            btnText: '🚀 下载全套原图 (s0)',
            processing: '正在处理...',
            noImages: '未探测到背景图，请确保左侧任务列表已展开',
            preparing: '准备下载',
            finished: '✅ 下载完毕',
            notifyTitle: '下载成功',
            notifyBody: '全部原图已存入下载文件夹'
        },
        'en': {
            btnText: '🚀 Download All (s0)',
            processing: 'Processing...',
            noImages: 'No images found. Please ensure the mission list is expanded.',
            preparing: 'Preparing',
            finished: '✅ Finished',
            notifyTitle: 'Success',
            notifyBody: 'All images saved to your downloads folder'
        }
    };

    // 2. 自动探测语言（默认为英文）
    const lang = navigator.language.startsWith('zh') ? 'zh-CN' : 'en';
    const t = i18n[lang];

    // 3. 创建悬浮按钮
    const btn = document.createElement('button');
    btn.innerHTML = t.btnText;
    btn.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;padding:12px;background:#1a73e8;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
    document.body.appendChild(btn);

    btn.onclick = function() {
        const urlSet = new Set();
        const allElements = document.querySelectorAll('div');

        allElements.forEach(el => {
            const bg = window.getComputedStyle(el).backgroundImage;
            if (bg && bg.includes('googleusercontent')) {
                const match = bg.match(/url\("?(.+?)"?\)/);
                if (match) {
                    const s0Url = match[1].replace(/=s\d+.*$/, '=s0');
                    urlSet.add(s0Url);
                }
            }
        });

        const finalUrls = Array.from(urlSet);

        if (finalUrls.length === 0) {
            alert(t.noImages);
            return;
        }

        btn.innerHTML = t.processing;
        btn.disabled = true;

        finalUrls.forEach((url, index) => {
            const fileName = `Mission_${(index + 1).toString().padStart(2, '0')}.png`;
            
            GM_download({
                url: url,
                name: fileName,
                onload: () => {
                    if (index === finalUrls.length - 1) {
                        btn.innerHTML = t.finished;
                        btn.disabled = false;
                        if (typeof GM_notification === 'function') {
                            GM_notification({ text: t.notifyBody, title: t.notifyTitle, timeout: 2000 });
                        }
                    }
                }
            });
        });
    };
})();
