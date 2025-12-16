document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const loadWordsBtn = document.getElementById('loadWordsBtn');
    const nounInput = document.getElementById('nounInput');
    const adjInput = document.getElementById('adjInput');
    const customWordsTextarea = document.getElementById('customWords');
    const hybridWordDisplay = document.getElementById('hybridWord');
    const wordCountDisplay = document.getElementById('wordCount');

    // 1. 默认备用词库（防止用户什么都不输入）
    const defaultNouns = ["海豚", "棕榈树", "电路板", "独角兽", "磁带", "晶体", "雕塑", "气泡水"];
    const prefixes = ["NEON", "CYBER", "KAWAII", "RETRO", "HOLO", "VAPOR", "PIXEL"];

    // 2. 存储用户加载的词汇
    let userNouns = [];

    // --- 加载词库的功能 ---
    function loadCustomWords() {
        const text = customWordsTextarea.value.trim();
        if (!text) {
            alert("请先在文本框输入一些词汇（每行一个）");
            return;
        }
        // 分割字符串并过滤空行
        userNouns = text.split('\n')
                        .map(word => word.trim())
                        .filter(word => word.length > 0);
        
        wordCountDisplay.textContent = `已成功加载：${userNouns.length} 个词汇`;
        wordCountDisplay.style.color = "#00FF00"; // 成功时变绿提示
    }

    // --- 核心：随机获取一个词 ---
    function getRandomWord(excludeWord = "") {
        // 优先使用用户上传的词库，如果没有则使用默认词库
        let source = userNouns.length > 0 ? userNouns : defaultNouns;
        let word = source[Math.floor(Math.random() * source.length)];
        
        // 简单去重：如果随机到的词跟第一个词一样，再随机一次
        if (word === excludeWord && source.length > 1) {
            return getRandomWord(excludeWord);
        }
        return word;
    }

    // --- 生成混合词的核心逻辑 ---
    function generateHybrid() {
        let word1 = nounInput.value.trim();
        let word2 = adjInput.value.trim();

        // 逻辑判断：如果输入框是空的，就从词库抽词
        if (!word1) {
            word1 = getRandomWord();
        }
        if (!word2) {
            word2 = getRandomWord(word1); // 传入word1以尽量避免重复
        }

        // 随机选一个酷炫前缀
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

        // 最终拼接并显示
        const result = `[ ${prefix} ] ${word1} × ${word2}`;
        
        // 添加一个简单的CSS动画触发（如果想更华丽）
        hybridWordDisplay.style.opacity = 0;
        setTimeout(() => {
            hybridWordDisplay.textContent = result.toUpperCase();
            hybridWordDisplay.style.opacity = 1;
        }, 100);
    }

    // --- 事件绑定 ---
    loadWordsBtn.addEventListener('click', loadCustomWords);
    generateBtn.addEventListener('click', generateHybrid);

    // 默认初始状态
    console.log("蒸汽波脚本已就绪 💾");
});