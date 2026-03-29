// ==UserScript==
// @name         Bannergress-Image-Downloader-International
// @namespace    https://github.com/lspqsea/bannergress-image-downloader
// @version      1.8
// @description  Support multiple languages (EN, JP, ES, DE, FR, MS, ZH) to download original (=s0) mission icons.
// @author       lspqsea & Gemini
// @match        https://bannergress.com/banner/*
// @grant        GM_download
// @grant        GM_notification
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 1. 全球语言字典
    const i18n = {
        'en': { btn: '🚀 Download All (s0)', loading: 'Processing...', fail: 'No images found. Expand list!', done: '✅ Finished', title: 'Success', body: 'Saved to Downloads.' },
        'zh-CN': { btn: '🚀 下载全套原图 (s0)', loading: '正在处理...', fail: '未探测到背景图，请展开左侧列表！', done: '✅ 下载完毕', title: '下载成功', body: '已存入下载文件夹' },
        'zh-TW': { btn: '🚀 下載全套原圖 (s0)', loading: '正在處理...', fail: '未探測到背景圖，請展開左側列表！', done: '✅ 下載完畢', title: '下載成功', body: '已存入下載資料夾' },
        'ja': { btn: '🚀 全画像をダウンロード', loading: '処理中...', fail: '画像が見つかりません。リストを広げてください', done: '✅ 完了', title: '成功', body: 'ダウンロードフォルダに保存されました' },
        'es': { btn: '🚀 Descargar todo (s0)', loading: 'Procesando...', fail: 'No se encontraron imágenes.', done: '✅ Terminado', title: 'Éxito', body: 'Guardado en descargas.' },
        'de': { btn: '🚀 Alle herunterladen', loading: 'Verarbeitung...', fail: 'Keine Bilder gefunden.', done: '✅ Fertig', title: 'Erfolg', body: 'In Downloads gespeichert.' },
        'fr': { btn: '🚀 Tout télécharger', loading: 'Traitement...', fail: 'Aucune image trouvée.', done: '✅ Terminé', title: 'Succès', body: 'Enregistré dans Téléchargements.' },
        'ms': { btn: '🚀 Muat Turun Semua', loading: 'Memproses...', fail: 'Imej tidak dijumpai.', done: '✅ Selesai', title: 'Berjaya', body: 'Disimpan dalam folder muat turun.' }
    };

    // 2. 智能语言识别逻辑
    const getLang = () => {
        const l = navigator.language.toLowerCase();
        if (l.includes('zh-tw') || l.includes('zh-hk') || l.includes('zh-mo')) return 'zh-TW';
        if (l.startsWith('zh')) return 'zh-CN';
        if (l.startsWith('ja')) return 'ja';
        if (l.startsWith('es')) return 'es';
        if (l.startsWith('de')) return 'de';
        if (l.startsWith('fr')) return 'fr';
        if (l.startsWith('ms')) return 'ms';
        return 'en'; // 其他所有语言默认显示英文
    };

    const t = i18n[getLang()];

    // 3. 保持原有高效下载逻辑...
    const btn = document.createElement('button');
    btn.innerHTML = t.btn;
    btn.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;padding:12px;background:#1a73e8;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);transition:0.3s;';
    document.body.appendChild(btn);

    btn.onclick = function() {
        const urlSet = new Set();
        document.querySelectorAll('div').forEach(el => {
            const bg = window.getComputedStyle(el).backgroundImage;
            if (bg && bg.includes('googleusercontent')) {
                const match = bg.match(/url\("?(.+?)"?\)/);
                if (match) urlSet.add(match[1].replace(/=s\d+.*$/, '=s0'));
            }
        });

        const finalUrls = Array.from(urlSet);
        if (finalUrls.length === 0) { alert(t.fail); return; }

        btn.innerHTML = t.loading;
        btn.disabled = true;

        finalUrls.forEach((url, index) => {
            GM_download({
                url: url,
                name: `Mission_${(index + 1).toString().padStart(2, '0')}.png`,
                onload: () => {
                    if (index === finalUrls.length - 1) {
                        btn.innerHTML = t.done;
                        btn.disabled = false;
                        if (typeof GM_notification === 'function') {
                            GM_notification({ text: t.body, title: t.title, timeout: 2000 });
                        }
                    }
                }
            });
        });
    };
})();
