// 主题切换和语言切换功能 - 支持下拉菜单
(function() {
    'use strict';
    
    // 等待DOM加载完成和Butterfly主题初始化
    document.addEventListener('DOMContentLoaded', function() {
        // 等待Butterfly主题完全加载
        const initWhenReady = () => {
            if (window.btf || document.querySelector('.menus_item_child')) {
                initNavSwitches();
            } else {
                setTimeout(initWhenReady, 100);
            }
        };
        initWhenReady();
    });
    
    function initNavSwitches() {
        // 初始化主题切换下拉菜单
        initThemeDropdown();
        
        // 初始化语言切换下拉菜单
        initLanguageDropdown();
        
        // 恢复保存的设置
        restoreSettings();
    }
    
    // 初始化主题切换下拉菜单
    function initThemeDropdown() {
        const themeItems = document.querySelectorAll('.menus_item_child li a[href*="javascript:void(0)"]');
        
        themeItems.forEach(item => {
            const text = item.textContent.trim();
            
            if (text.includes('浅色模式')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    setTheme('light');
                    showNotification('已切换到浅色模式');
                });
            } else if (text.includes('深色模式')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    setTheme('dark');
                    showNotification('已切换到深色模式');
                });
            } else if (text.includes('跟随系统')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    setTheme('auto');
                    showNotification('已设置为跟随系统主题');
                });
            }
        });
    }
    
    // 初始化语言切换下拉菜单
    function initLanguageDropdown() {
        const languageItems = document.querySelectorAll('.menus_item_child li a[href*="javascript:void(0)"]');
        
        languageItems.forEach(item => {
            const text = item.textContent.trim();
            
            if (text.includes('中文')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    setLanguage('zh-CN');
                    showNotification('已切换到中文');
                });
            } else if (text.includes('英文')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    setLanguage('en');
                    showNotification('已切换到英文');
                });
            } else if (text.includes('日文')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    setLanguage('ja');
                    showNotification('已切换到日文');
                });
            }
        });
    }
    
    // 设置主题
    function setTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'auto') {
            // 跟随系统主题
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                activateDarkMode();
            } else {
                activateLightMode();
            }
            // 保存为auto模式
            if (window.btf && window.btf.saveToLocal) {
                window.btf.saveToLocal.set('theme', 'auto', 2);
            } else {
                localStorage.setItem('theme', 'auto');
            }
        } else if (theme === 'dark') {
            activateDarkMode();
        } else if (theme === 'light') {
            activateLightMode();
        }
        
        // 更新主题切换按钮的图标
        updateThemeIcon(theme);
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: theme }
        }));
    }
    
    // 激活深色模式
    function activateDarkMode() {
        if (window.btf && window.btf.activateDarkMode) {
            // 使用Butterfly的内置函数
            window.btf.activateDarkMode();
        } else {
            // 备用方案
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        // 保存设置
        if (window.btf && window.btf.saveToLocal) {
            window.btf.saveToLocal.set('theme', 'dark', 2);
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // 激活浅色模式
    function activateLightMode() {
        if (window.btf && window.btf.activateLightMode) {
            // 使用Butterfly的内置函数
            window.btf.activateLightMode();
        } else {
            // 备用方案
            document.documentElement.setAttribute('data-theme', 'light');
        }
        
        // 保存设置
        if (window.btf && window.btf.saveToLocal) {
            window.btf.saveToLocal.set('theme', 'light', 2);
        } else {
            localStorage.setItem('theme', 'light');
        }
    }
    
    // 更新主题图标
    function updateThemeIcon(theme) {
        const themeButton = document.querySelector('.menus_item .fa-moon, .menus_item .fa-sun, .menus_item .fa-desktop');
        if (themeButton) {
            const icon = themeButton.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-moon fa-fw';
                } else if (theme === 'light') {
                    icon.className = 'fas fa-sun fa-fw';
                } else {
                    icon.className = 'fas fa-desktop fa-fw';
                }
            }
        }
    }
    
    // 设置语言
    function setLanguage(lang) {
        const html = document.documentElement;
        html.setAttribute('lang', lang);
        localStorage.setItem('language', lang);
        
        // 更新语言切换按钮的图标
        updateLanguageIcon(lang);
        
        // 根据语言进行相应的处理
        switch (lang) {
            case 'zh-CN':
                translateToSimplified();
                break;
            case 'en':
                translateToEnglish();
                break;
            case 'ja':
                translateToJapanese();
                break;
        }
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }
    
    // 更新语言图标
    function updateLanguageIcon(lang) {
        const languageButton = document.querySelector('.menus_item .fa-language, .menus_item .fa-flag, .menus_item .fa-globe, .menus_item .fa-globe-asia');
        if (languageButton) {
            const icon = languageButton.querySelector('i');
            if (icon) {
                if (lang === 'zh-CN') {
                    icon.className = 'fas fa-flag fa-fw';
                } else if (lang === 'en') {
                    icon.className = 'fas fa-globe fa-fw';
                } else if (lang === 'ja') {
                    icon.className = 'fas fa-globe-asia fa-fw';
                }
            }
        }
    }
    
    // 显示通知
    function showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = message;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(73, 177, 245, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // 简化的简体中文转换
    function translateToSimplified() {
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, td, th');
        elements.forEach(function(element) {
            if (element.children.length === 0) {
                element.textContent = traditionalToSimplified(element.textContent);
            }
        });
    }
    
    // 翻译为英文（简化版）
    function translateToEnglish() {
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, td, th');
        elements.forEach(function(element) {
            if (element.children.length === 0) {
                element.textContent = chineseToEnglish(element.textContent);
            }
        });
    }
    
    // 翻译为日文（简化版）
    function translateToJapanese() {
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, td, th');
        elements.forEach(function(element) {
            if (element.children.length === 0) {
                element.textContent = chineseToJapanese(element.textContent);
            }
        });
    }
    
    // 简化的繁简转换字典（部分常用字）
    const simplifiedToTraditionalMap = {
        '技术': '技術',
        '博客': '博客',
        '前端': '前端',
        '后端': '後端',
        '数据库': '數據庫',
        '开发': '開發',
        '工具': '工具',
        '测试': '測試',
        '系统': '系統',
        '管理': '管理',
        '配置': '配置',
        '优化': '優化',
        '性能': '性能',
        '缓存': '緩存',
        '服务器': '服務器',
        '应用': '應用',
        '程序': '程序',
        '代码': '代碼',
        '文件': '文件',
        '目录': '目錄',
        '标签': '標籤',
        '分类': '分類',
        '归档': '歸檔',
        '文章': '文章',
        '页面': '頁面',
        '内容': '內容',
        '标题': '標題',
        '链接': '鏈接',
        '按钮': '按鈕',
        '菜单': '菜單',
        '导航': '導航',
        '搜索': '搜索',
        '评论': '評論',
        '用户': '用戶',
        '登录': '登錄',
        '注册': '註冊',
        '设置': '設置',
        '主题': '主題',
        '语言': '語言',
        '切换': '切換',
        '模式': '模式',
        '深色': '深色',
        '浅色': '淺色',
        '简体': '簡體',
        '繁体': '繁體',
        '中文': '中文'
    };
    
    const traditionalToSimplifiedMap = {};
    for (const [simplified, traditional] of Object.entries(simplifiedToTraditionalMap)) {
        traditionalToSimplifiedMap[traditional] = simplified;
    }
    
    // 中文到英文的翻译字典（简化版）
    const chineseToEnglishMap = {
        '技术博客': 'Tech Blog',
        '技术': 'Technology',
        '博客': 'Blog',
        '前端': 'Frontend',
        '后端': 'Backend',
        '数据库': 'Database',
        '开发': 'Development',
        '工具': 'Tools',
        '测试': 'Testing',
        '系统': 'System',
        '管理': 'Management',
        '配置': 'Configuration',
        '优化': 'Optimization',
        '性能': 'Performance',
        '缓存': 'Cache',
        '服务器': 'Server',
        '应用': 'Application',
        '程序': 'Program',
        '代码': 'Code',
        '文件': 'File',
        '目录': 'Directory',
        '标签': 'Tags',
        '分类': 'Categories',
        '归档': 'Archives',
        '文章': 'Articles',
        '页面': 'Page',
        '内容': 'Content',
        '标题': 'Title',
        '链接': 'Link',
        '按钮': 'Button',
        '菜单': 'Menu',
        '导航': 'Navigation',
        '搜索': 'Search',
        '评论': 'Comments',
        '用户': 'User',
        '登录': 'Login',
        '注册': 'Register',
        '设置': 'Settings',
        '主题': 'Theme',
        '语言': 'Language',
        '切换': 'Switch',
        '模式': 'Mode',
        '深色': 'Dark',
        '浅色': 'Light',
        '简体': 'Simplified',
        '繁体': 'Traditional',
        '中文': 'Chinese',
        '英文': 'English',
        '日文': 'Japanese',
        '韩文': 'Korean',
        '首页': 'Home',
        '关于': 'About'
    };
    
    // 中文到日文的翻译字典（简化版）
    const chineseToJapaneseMap = {
        '技术博客': '技術ブログ',
        '技术': '技術',
        '博客': 'ブログ',
        '前端': 'フロントエンド',
        '后端': 'バックエンド',
        '数据库': 'データベース',
        '开发': '開発',
        '工具': 'ツール',
        '测试': 'テスト',
        '系统': 'システム',
        '管理': '管理',
        '配置': '設定',
        '优化': '最適化',
        '性能': '性能',
        '缓存': 'キャッシュ',
        '服务器': 'サーバー',
        '应用': 'アプリケーション',
        '程序': 'プログラム',
        '代码': 'コード',
        '文件': 'ファイル',
        '目录': 'ディレクトリ',
        '标签': 'タグ',
        '分类': 'カテゴリ',
        '归档': 'アーカイブ',
        '文章': '記事',
        '页面': 'ページ',
        '内容': 'コンテンツ',
        '标题': 'タイトル',
        '链接': 'リンク',
        '按钮': 'ボタン',
        '菜单': 'メニュー',
        '导航': 'ナビゲーション',
        '搜索': '検索',
        '评论': 'コメント',
        '用户': 'ユーザー',
        '登录': 'ログイン',
        '注册': '登録',
        '设置': '設定',
        '主题': 'テーマ',
        '语言': '言語',
        '切换': '切り替え',
        '模式': 'モード',
        '深色': 'ダーク',
        '浅色': 'ライト',
        '简体': '簡体',
        '繁体': '繁体',
        '中文': '中国語',
        '英文': '英語',
        '日文': '日本語',
        '韩文': '韓国語',
        '首页': 'ホーム',
        '关于': 'について'
    };
    
    function traditionalToSimplified(text) {
        let result = text;
        for (const [traditional, simplified] of Object.entries(traditionalToSimplifiedMap)) {
            result = result.replace(new RegExp(traditional, 'g'), simplified);
        }
        return result;
    }
    
    function chineseToEnglish(text) {
        let result = text;
        for (const [chinese, english] of Object.entries(chineseToEnglishMap)) {
            result = result.replace(new RegExp(chinese, 'g'), english);
        }
        return result;
    }
    
    function chineseToJapanese(text) {
        let result = text;
        for (const [chinese, japanese] of Object.entries(chineseToJapaneseMap)) {
            result = result.replace(new RegExp(chinese, 'g'), japanese);
        }
        return result;
    }
    
    // 页面加载时恢复保存的主题和语言设置
    function restoreSettings() {
        let savedTheme;
        
        // 优先使用Butterfly的保存机制
        if (window.btf && window.btf.saveToLocal) {
            savedTheme = window.btf.saveToLocal.get('theme');
        } else {
            savedTheme = localStorage.getItem('theme');
        }
        
        const savedLanguage = localStorage.getItem('language');
        
        if (savedTheme) {
            setTheme(savedTheme);
        }
        
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }
    
})();