// 导航栏主题和语言切换功能
(function() {
    'use strict';
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        initNavSwitches();
    });
    
    function initNavSwitches() {
        // 查找导航栏中的切换按钮
        const navItems = document.querySelectorAll('#nav .nav-item');
        
        navItems.forEach(function(item) {
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === 'javascript:void(0)') {
                const text = link.textContent.trim();
                
                if (text === '主题切换') {
                    setupThemeSwitch(item, link);
                } else if (text === '语言切换') {
                    setupLanguageSwitch(item, link);
                }
            }
        });
    }
    
    // 设置主题切换功能
    function setupThemeSwitch(item, link) {
        // 检查是否已有主题切换功能
        if (typeof window.switchDarkMode === 'function') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.switchDarkMode();
                updateThemeIcon(item, link);
            });
        } else {
            // 如果没有内置功能，创建自定义主题切换
            link.addEventListener('click', function(e) {
                e.preventDefault();
                toggleCustomTheme();
                updateThemeIcon(item, link);
            });
        }
        
        // 初始化图标
        updateThemeIcon(item, link);
    }
    
    // 设置语言切换功能
    function setupLanguageSwitch(item, link) {
        // 创建下拉菜单
        createLanguageDropdown(item, link);
        
        // 点击切换下拉菜单显示/隐藏
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLanguageDropdown(item);
        });
        
        // 点击其他地方关闭下拉菜单
        document.addEventListener('click', function(e) {
            if (!item.contains(e.target)) {
                hideLanguageDropdown(item);
            }
        });
        
        // 初始化图标
        updateLanguageIcon(item, link);
    }
    
    // 更新主题切换图标
    function updateThemeIcon(item, link) {
        const icon = link.querySelector('i');
        if (icon) {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                          document.body.classList.contains('dark') ||
                          document.documentElement.classList.contains('dark');
            
            if (isDark) {
                icon.className = 'fas fa-sun';
                link.title = '切换到浅色模式';
            } else {
                icon.className = 'fas fa-moon';
                link.title = '切换到深色模式';
            }
        }
    }
    
    // 创建语言下拉菜单
    function createLanguageDropdown(item, link) {
        // 检查是否已经存在下拉菜单
        if (item.querySelector('.language-dropdown')) {
            return;
        }
        
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        
        const languages = [
            { code: 'zh-CN', name: '简体中文', icon: 'fas fa-flag' },
            { code: 'zh-TW', name: '繁體中文', icon: 'fas fa-flag' },
            { code: 'en', name: 'English', icon: 'fas fa-flag' },
            { code: 'ja', name: '日本語', icon: 'fas fa-flag' },
            { code: 'ko', name: '한국어', icon: 'fas fa-flag' }
        ];
        
        languages.forEach(function(lang) {
            const item = document.createElement('a');
            item.href = 'javascript:void(0)';
            item.className = 'language-dropdown-item';
            item.setAttribute('data-lang', lang.code);
            item.innerHTML = '<i class="' + lang.icon + '"></i>' + lang.name;
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                switchLanguage(lang.code);
                hideLanguageDropdown(item.parentElement.parentElement);
            });
            
            dropdown.appendChild(item);
        });
        
        item.appendChild(dropdown);
    }
    
    // 切换语言下拉菜单显示/隐藏
    function toggleLanguageDropdown(item) {
        const dropdown = item.querySelector('.language-dropdown');
        if (dropdown) {
            if (dropdown.classList.contains('show')) {
                hideLanguageDropdown(item);
            } else {
                showLanguageDropdown(item);
            }
        }
    }
    
    // 显示语言下拉菜单
    function showLanguageDropdown(item) {
        const dropdown = item.querySelector('.language-dropdown');
        if (dropdown) {
            // 隐藏其他下拉菜单
            hideAllLanguageDropdowns();
            
            // 显示当前下拉菜单
            dropdown.classList.add('show');
            
            // 更新当前语言状态
            updateLanguageDropdownState(dropdown);
        }
    }
    
    // 隐藏语言下拉菜单
    function hideLanguageDropdown(item) {
        const dropdown = item.querySelector('.language-dropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
    
    // 隐藏所有语言下拉菜单
    function hideAllLanguageDropdowns() {
        const dropdowns = document.querySelectorAll('.language-dropdown');
        dropdowns.forEach(function(dropdown) {
            dropdown.classList.remove('show');
        });
    }
    
    // 更新语言下拉菜单状态
    function updateLanguageDropdownState(dropdown) {
        const currentLang = document.documentElement.getAttribute('lang') || 'zh-CN';
        const items = dropdown.querySelectorAll('.language-dropdown-item');
        
        items.forEach(function(item) {
            item.classList.remove('active');
            if (item.getAttribute('data-lang') === currentLang) {
                item.classList.add('active');
            }
        });
    }
    
    // 切换语言
    function switchLanguage(langCode) {
        const html = document.documentElement;
        const currentLang = html.getAttribute('lang') || 'zh-CN';
        
        if (currentLang === langCode) {
            return; // 已经是当前语言，不需要切换
        }
        
        // 更新语言属性
        html.setAttribute('lang', langCode);
        localStorage.setItem('language', langCode);
        
        // 根据语言进行相应的处理
        switch (langCode) {
            case 'zh-CN':
                translateToSimplified();
                break;
            case 'zh-TW':
                translateToTraditional();
                break;
            case 'en':
                translateToEnglish();
                break;
            case 'ja':
                translateToJapanese();
                break;
            case 'ko':
                translateToKorean();
                break;
        }
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: langCode }
        }));
    }
    
    // 更新语言切换图标
    function updateLanguageIcon(item, link) {
        const icon = link.querySelector('i');
        if (icon) {
            const currentLang = document.documentElement.getAttribute('lang') || 'zh-CN';
            icon.className = 'fas fa-language';
            link.title = '选择语言';
        }
    }
    
    // 自定义主题切换功能
    function toggleCustomTheme() {
        const html = document.documentElement;
        const body = document.body;
        
        const isDark = html.getAttribute('data-theme') === 'dark' ||
                      body.classList.contains('dark') ||
                      html.classList.contains('dark');
        
        if (isDark) {
            // 切换到浅色模式
            html.setAttribute('data-theme', 'light');
            html.classList.remove('dark');
            body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            // 切换到深色模式
            html.setAttribute('data-theme', 'dark');
            html.classList.add('dark');
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: isDark ? 'light' : 'dark' }
        }));
    }
    
    // 自定义语言切换功能
    function toggleCustomLanguage() {
        const html = document.documentElement;
        const currentLang = html.getAttribute('lang') || 'zh-CN';
        
        if (currentLang === 'zh-CN') {
            // 切换到繁体中文
            html.setAttribute('lang', 'zh-TW');
            localStorage.setItem('language', 'zh-TW');
            translateToTraditional();
        } else {
            // 切换到简体中文
            html.setAttribute('lang', 'zh-CN');
            localStorage.setItem('language', 'zh-CN');
            translateToSimplified();
        }
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: currentLang === 'zh-CN' ? 'zh-TW' : 'zh-CN' }
        }));
    }
    
    // 简化的繁体中文转换
    function translateToTraditional() {
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, td, th');
        elements.forEach(function(element) {
            if (element.children.length === 0) {
                element.textContent = simplifiedToTraditional(element.textContent);
            }
        });
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
    
    // 翻译为韩文（简化版）
    function translateToKorean() {
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, td, th');
        elements.forEach(function(element) {
            if (element.children.length === 0) {
                element.textContent = chineseToKorean(element.textContent);
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
    
    // 中文到韩文的翻译字典（简化版）
    const chineseToKoreanMap = {
        '技术博客': '기술 블로그',
        '技术': '기술',
        '博客': '블로그',
        '前端': '프론트엔드',
        '后端': '백엔드',
        '数据库': '데이터베이스',
        '开发': '개발',
        '工具': '도구',
        '测试': '테스트',
        '系统': '시스템',
        '管理': '관리',
        '配置': '설정',
        '优化': '최적화',
        '性能': '성능',
        '缓存': '캐시',
        '服务器': '서버',
        '应用': '애플리케이션',
        '程序': '프로그램',
        '代码': '코드',
        '文件': '파일',
        '目录': '디렉토리',
        '标签': '태그',
        '分类': '카테고리',
        '归档': '아카이브',
        '文章': '글',
        '页面': '페이지',
        '内容': '내용',
        '标题': '제목',
        '链接': '링크',
        '按钮': '버튼',
        '菜单': '메뉴',
        '导航': '네비게이션',
        '搜索': '검색',
        '评论': '댓글',
        '用户': '사용자',
        '登录': '로그인',
        '注册': '등록',
        '设置': '설정',
        '主题': '테마',
        '语言': '언어',
        '切换': '전환',
        '模式': '모드',
        '深色': '다크',
        '浅色': '라이트',
        '简体': '간체',
        '繁体': '번체',
        '中文': '중국어',
        '英文': '영어',
        '日文': '일본어',
        '韩文': '한국어',
        '首页': '홈',
        '关于': '소개'
    };
    
    function simplifiedToTraditional(text) {
        let result = text;
        for (const [simplified, traditional] of Object.entries(simplifiedToTraditionalMap)) {
            result = result.replace(new RegExp(simplified, 'g'), traditional);
        }
        return result;
    }
    
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
    
    function chineseToKorean(text) {
        let result = text;
        for (const [chinese, korean] of Object.entries(chineseToKoreanMap)) {
            result = result.replace(new RegExp(chinese, 'g'), korean);
        }
        return result;
    }
    
    // 页面加载时恢复保存的主题和语言设置
    function restoreSettings() {
        const savedTheme = localStorage.getItem('theme');
        const savedLanguage = localStorage.getItem('language');
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                document.body.classList.add('dark');
            }
        }
        
        if (savedLanguage) {
            document.documentElement.setAttribute('lang', savedLanguage);
        }
    }
    
    // 初始化设置
    restoreSettings();
    
})();
