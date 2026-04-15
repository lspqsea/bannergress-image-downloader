# 🛰️ Bannergress Image Downloader (Original s0)

<p align="center">
  <img src="./043.jpg" width="1000" alt="使用演示">
</p>

[English](#english) | [日本語](#日本語) | [中文](#中文)

---

<a name="english"></a>
## 🌐 English

### 💡 Background
Developed by an active Ingress Agent with the assistance of **Google Gemini (AI)**. This project aims to help fellow Agents efficiently archive high-quality mission memories and keep their local collections organized.

### ✨ Key Features
* **Auto-Archiving**: Automatically creates a main folder named after the Banner.
* **Structured Organization**: Saves the composite preview in the root and mission icons in a `Mission_Images` sub-folder.
* **Original Resolution**: Automatically replaces thumbnail URLs with Google's original high-resolution (`=s0`) links.
* **Cross-Platform**: Fully compatible with Chrome + Tampermonkey on **Windows, macOS, and Linux**.
* **Smart UI**: Interface adapts to EN, ZH, JP, ES, DE, FR based on browser settings.

### 🚀 Instructions
1. Install [Tampermonkey](https://www.tampermonkey.net/) extension.
2. Click `bannergress-downloader.user.js` in this repo, then click **Raw** to install.
3. Open a banner page on [Bannergress](https://bannergress.com/), and **Expand the mission list**.
4. Click **"🚀 Archive Full Set"** at the top right.

### ⚠️ Important Tips
* **Browser Settings**: To avoid multiple popups, go to **Chrome Settings -> Downloads** and **Turn OFF** "Ask where to save each file before downloading".
* **Permission**: Click "Allow" if the browser asks for permission to download multiple files.

---

<a name="日本語"></a>
## 🇯🇵 日本語

### 💡 背景
このプロジェクトは、現役の Ingress エージェントが **Google Gemini (AI)** の協力を得て開発しました。エージェントの皆さんがミッションの思い出を高画質で効率的にアーカイブし、ローカルでの整理を容易にすることを目的としています。

### ✨ 主な機能
* **自動アーカイブ**: バナー名でメインフォルダを自動作成します。
* **構造化保存**: プレビュー画像をルートに、ミッションアイコンを `Mission_Images` サブフォルダに整理して保存します。
* **高品質**: すべての画像をオリジナルの高解像度（`=s0`）で自動的に取得します。
* **マルチプラットフォーム**: **Windows, macOS, Linux** の各 OS 上の Chrome + Tampermonkey で動作します。
* **多言語対応**: ブラウザ設定に合わせて、UI が自動的に切り替わります。

### 🚀 使用方法
1. [Tampermonkey](https://www.tampermonkey.net/) をインストールします。
2. `bannergress-downloader.user.js` を開き、**Raw** ボタンを押してインストールします。
3. Bannergress でバナーページを開き、**ミッションリストを展開します**。
4. 右上の **"🚀 全画像をダウンロード"** ボタンをクリックします。

### ⚠️ 重要なヒント
* **ブラウザ設定**: 保存先を確認するポップアップが何度も出ないよう、**Chromeの設定 > ダウンロード** で **「ダウンロード前に各ファイルの保存場所を確認する」をオフ** にしてください。
* **権限**: 複数のファイルのダウンロード許可を求められたら「許可」をクリックしてください。

---

<a name="中文"></a>
## 🇨🇳 中文

### 💡 开发背景
本项目由本人（Ingress 特工）在 **Google Gemini (AI)** 的协助下开发完成。旨在提高 Agent 们的效率，轻松归档高清任务图片纪念，并保持本地文件的整洁有序。

### ✨ 核心功能
* **自动归档**：以 Banner 标题自动创建主文件夹，告别手动分类。
* **结构化整理**：Banner 合成预览图存放在主目录，所有单图自动存放在 `Mission_Images` 子文件夹。
* **高清原图**：脚本会自动将缩略图地址替换为 Google 服务器的原始高清（`=s0`）分辨率地址。
* **全平台支持**：支持 **Windows, macOS, Linux** 上的 Chrome + Tampermonkey 环境。
* **多国语言**：UI 界面根据浏览器语言自动切换（支持简/繁中、英、日、西、德、法、马来语）。

### 🚀 使用说明
1. 确保浏览器安装了 [Tampermonkey](https://www.tampermonkey.net/) 插件。
2. 点击本仓库中的 `bannergress-downloader.user.js`，点击 **Raw** 按钮完成安装。
3. 打开 Bannergress 任务页面，**务必点击 Expand All 展开任务列表**。
4. 点击页面右上方蓝色的 **"🚀 一键归档全套"** 按钮。

### ⚠️ 关键小贴士
* **避免弹窗**：为了防止下载几十张图时弹出几十个保存窗口，请进入 **Chrome 设置 -> 下载**，**关闭** “下载前询问每个文件的保存位置”。
* **下载权限**：浏览器询问“是否允许下载多个文件”时，请务必点击 **“允许”**。

---

## ⚖️ Disclaimer / 声明
* Image copyrights belong to original authors and Niantic.
* For personal use only. **Commercial use is strictly prohibited**.
