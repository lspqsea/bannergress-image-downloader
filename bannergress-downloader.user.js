// ==UserScript==
// @name         Bannergress 一键打包 (纯背景图提取版)
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  避开 IMG 标签陷阱，直接提取 DIV 背景图并 s0 化下载
// @author       Gemini
// @match        https://bannergress.com/banner/*
// @grant        GM_download
// @grant        GM_notification
// ==/UserScript==

(function() {
    'use strict';

    // 创建悬浮按钮
    const btn = document.createElement('button');
    btn.innerHTML = '📂 抓取全套原图 (s0)';
    btn.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;padding:12px;background:#1a73e8;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
    document.body.appendChild(btn);

    btn.onclick = function() {
        const urlSet = new Set();
        // 1. 深度遍历所有 div
        const allElements = document.querySelectorAll('div');

        allElements.forEach(el => {
            const bg = window.getComputedStyle(el).backgroundImage;
            // 只要背景图包含 googleusercontent 且有任务图标特征
            if (bg && bg.includes('googleusercontent')) {
                const match = bg.match(/url\("?(.+?)"?\)/);
                if (match) {
                    // 核心转换：强制替换尺寸后缀为 =s0
                    const s0Url = match[1].replace(/=s\d+.*$/, '=s0');
                    urlSet.add(s0Url);
                }
            }
        });

        const finalUrls = Array.from(urlSet);

        if (finalUrls.length === 0) {
            alert('未探测到背景图，请确保左侧任务列表已展开');
            return;
        }

        // 2. 排序（Bannergress 图片在 DOM 中的顺序通常就是任务顺序）
        btn.innerHTML = `准备下载 ${finalUrls.length} 张...`;
        btn.disabled = true;

        // 3. 执行下载
        finalUrls.forEach((url, index) => {
            const fileName = `Mission_${(index + 1).toString().padStart(2, '0')}.png`;

            GM_download({
                url: url,
                name: fileName,
                onload: () => {
                    if (index === finalUrls.length - 1) {
                        btn.innerHTML = '✅ 下载完毕';
                        btn.disabled = false;
                        // 弹窗提醒，因为下载在后台
                        if (typeof GM_notification === 'function') {
                            GM_notification({ text: "全部原图已存入下载文件夹", title: "下载成功", timeout: 2000 });
                        }
                    }
                }
            });
        });
    };
})();
