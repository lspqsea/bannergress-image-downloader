// ==UserScript==
// @name         Bannergress-Image-Downloader
// @namespace    https://github.com/lspqsea/bannergress-image-downloader
// @version      2.2
// @description  Automatically create folders by banner name, save composite preview and mission icons into 'Mission_Images' subfolder.
// @author       lspqsea & Gemini
// @match        https://bannergress.com/banner/*
// @grant        GM_download
// @grant        GM_notification
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 1. 语言字典
    const i18n = {
        'en': { btn: '🚀 Archive Full Set', loading: 'Archiving...', done: '✅ Finished', folder: 'Mission_Images' },
        'zh-CN': { btn: '🚀 一键归档全套', loading: '正在归档...', done: '✅ 归档完成', folder: 'Mission_Images' },
        'zh-TW': { btn: '🚀 下載全套原圖', loading: '正在處理...', done: '✅ 下載完畢', folder: 'Mission_Images' },
        'ja': { btn: '🚀 全画像をダウンロード', loading: '処理中...', done: '✅ 完了', folder: 'Mission_Images' }
    };

    const getLang = () => {
        const l = navigator.language.toLowerCase();
        if (l.includes('zh-tw') || l.includes('zh-hk')) return 'zh-TW';
        if (l.startsWith('zh')) return 'zh-CN';
        if (l.startsWith('ja')) return 'ja';
        return 'en';
    };

    const t = i18n[getLang()];

    // 2. 创建按钮
    const btn = document.createElement('button');
    btn.innerHTML = t.btn;
    btn.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;padding:12px;background:#1a73e8;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);transition:0.3s;';
    document.body.appendChild(btn);

    btn.onclick = function() {
        // --- A. 获取项目名称 ---
        let bannerTitle = 'Unknown_Banner';
        const titleEl = document.querySelector('h1') || document.querySelector('.banner-info-title') || document.querySelector('title');
        if (titleEl) {
            bannerTitle = titleEl.innerText.split('\n')[0].trim().replace(/[\\/:*?"<>|]/g, '_');
        }
        
        const missionUrls = new Set();
        let previewUrl = '';

        // --- B. 探测合成预览图 ---
        const allImgs = Array.from(document.querySelectorAll('img'));
        const foundPreview = allImgs.find(img => 
            img.src.includes('api.bannergress.com/bmrs/picture') || 
            (img.closest('.banner-card-picture') && img.src.includes('picture'))
        );
        if (foundPreview) previewUrl = foundPreview.src;

        // --- C. 探测任务单图 (s0) ---
        document.querySelectorAll('div').forEach(el => {
            const bg = window.getComputedStyle(el).backgroundImage;
            if (bg && bg.includes('googleusercontent')) {
                const match = bg.match(/url\("?(.+?)"?\)/);
                if (match) missionUrls.add(match[1].replace(/=s\d+.*$/, '=s0'));
            }
        });

        const missions = Array.from(missionUrls);
        if (missions.length === 0 && !previewUrl) {
            alert('No images detected!');
            return;
        }

        btn.innerHTML = t.loading;
        btn.disabled = true;

        // --- D. 执行归档 ---
        
        // 下载合成预览图
        if (previewUrl) {
            GM_download({
                url: previewUrl,
                name: `${bannerTitle}/${bannerTitle}_Full_Preview.png`
            });
        }

        // 下载所有任务单图 (放入 Mission_Images 文件夹)
        missions.forEach((url, index) => {
            const fileName = `Mission_${(index + 1).toString().padStart(2, '0')}.png`;
            GM_download({
                url: url,
                name: `${bannerTitle}/${t.folder}/${fileName}`,
                onload: () => {
                    if (index === missions.length - 1) {
                        btn.innerHTML = t.done;
                        btn.disabled = false;
                        if (typeof GM_notification === 'function') {
                            GM_notification({ text: `${bannerTitle} archived!`, title: 'Success', timeout: 3000 });
                        }
                    }
                }
            });
        });
    };
})();// ==UserScript==
// @name         Bannergress-Image-Downloader
// @namespace    https://github.com/lspqsea/bannergress-image-downloader
// @version      2.2
// @description  Automatically create folders by banner name, save composite preview and mission icons into 'Mission_Images' subfolder.
// @author       lspqsea & Gemini
// @match        https://bannergress.com/banner/*
// @grant        GM_download
// @grant        GM_notification
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 1. 语言字典
    const i18n = {
        'en': { btn: '🚀 Archive Full Set', loading: 'Archiving...', done: '✅ Finished', folder: 'Mission_Images' },
        'zh-CN': { btn: '🚀 一键归档全套', loading: '正在归档...', done: '✅ 归档完成', folder: 'Mission_Images' },
        'zh-TW': { btn: '🚀 下載全套原圖', loading: '正在處理...', done: '✅ 下載完畢', folder: 'Mission_Images' },
        'ja': { btn: '🚀 全画像をダウンロード', loading: '処理中...', done: '✅ 完了', folder: 'Mission_Images' }
    };

    const getLang = () => {
        const l = navigator.language.toLowerCase();
        if (l.includes('zh-tw') || l.includes('zh-hk')) return 'zh-TW';
        if (l.startsWith('zh')) return 'zh-CN';
        if (l.startsWith('ja')) return 'ja';
        return 'en';
    };

    const t = i18n[getLang()];

    // 2. 创建按钮
    const btn = document.createElement('button');
    btn.innerHTML = t.btn;
    btn.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;padding:12px;background:#1a73e8;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);transition:0.3s;';
    document.body.appendChild(btn);

    btn.onclick = function() {
        // --- A. 获取项目名称 ---
        let bannerTitle = 'Unknown_Banner';
        const titleEl = document.querySelector('h1') || document.querySelector('.banner-info-title') || document.querySelector('title');
        if (titleEl) {
            bannerTitle = titleEl.innerText.split('\n')[0].trim().replace(/[\\/:*?"<>|]/g, '_');
        }
        
        const missionUrls = new Set();
        let previewUrl = '';

        // --- B. 探测合成预览图 ---
        const allImgs = Array.from(document.querySelectorAll('img'));
        const foundPreview = allImgs.find(img => 
            img.src.includes('api.bannergress.com/bmrs/picture') || 
            (img.closest('.banner-card-picture') && img.src.includes('picture'))
        );
        if (foundPreview) previewUrl = foundPreview.src;

        // --- C. 探测任务单图 (s0) ---
        document.querySelectorAll('div').forEach(el => {
            const bg = window.getComputedStyle(el).backgroundImage;
            if (bg && bg.includes('googleusercontent')) {
                const match = bg.match(/url\("?(.+?)"?\)/);
                if (match) missionUrls.add(match[1].replace(/=s\d+.*$/, '=s0'));
            }
        });

        const missions = Array.from(missionUrls);
        if (missions.length === 0 && !previewUrl) {
            alert('No images detected!');
            return;
        }

        btn.innerHTML = t.loading;
        btn.disabled = true;

        // --- D. 执行归档 ---
        
        // 下载合成预览图
        if (previewUrl) {
            GM_download({
                url: previewUrl,
                name: `${bannerTitle}/${bannerTitle}_Full_Preview.png`
            });
        }

        // 下载所有任务单图 (放入 Mission_Images 文件夹)
        missions.forEach((url, index) => {
            const fileName = `Mission_${(index + 1).toString().padStart(2, '0')}.png`;
            GM_download({
                url: url,
                name: `${bannerTitle}/${t.folder}/${fileName}`,
                onload: () => {
                    if (index === missions.length - 1) {
                        btn.innerHTML = t.done;
                        btn.disabled = false;
                        if (typeof GM_notification === 'function') {
                            GM_notification({ text: `${bannerTitle} archived!`, title: 'Success', timeout: 3000 });
                        }
                    }
                }
            });
        });
    };
})();
