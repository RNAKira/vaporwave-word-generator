document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const loadWordsBtn = document.getElementById('loadWordsBtn');
    const nounInput = document.getElementById('nounInput');
    const adjInput = document.getElementById('adjInput');
    const customWordsTextarea = document.getElementById('customWords');
    const hybridWordDisplay = document.getElementById('hybridWord');
    const wordCountDisplay = document.getElementById('wordCount');

    // 默认备选词库
    const defaultNouns = ["汽锅鸡", "霓虹", "多巴胺", "电子羊", "软盘", "棕榈树", "磁带", "晶体"];
    const prefixes = ["NEON", "VAPOR", "CYBER", "RETRO", "KAWAII"];

    let userNouns = [];

    // 加载词库
    loadWordsBtn.addEventListener('click', () => {
        const text = customWordsTextarea.value.trim();
        if (!text) {
            alert("请先输入一些词汇哦！");
            return;
        }
        userNouns = text.split('\n').map(w => w.trim()).filter(w => w.length > 0);
        wordCountDisplay.textContent = `词库状态：已成功加载 ${userNouns.length} 个词`;
        wordCountDisplay.style.color = "#00FFFF";
    });

    // 随机取词函数
    function getRandom(exclude = "") {
        let source = userNouns.length > 0 ? userNouns : defaultNouns;
        let picked = source[Math.floor(Math.random() * source.length)];
        if (picked === exclude && source.length > 1) return getRandom(exclude);
        return picked;
    }

    // 生成逻辑
    generateBtn.addEventListener('click', () => {
        let w1 = nounInput.value.trim();
        let w2 = adjInput.value.trim();

        if (!w1) w1 = getRandom();
        if (!w2) w2 = getRandom(w1);

        const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
        
        // 瞬间淡出效果
        hybridWordDisplay.style.opacity = 0;
        
        setTimeout(() => {
            hybridWordDisplay.textContent = `${pre} · ${w1} × ${w2}`;
            hybridWordDisplay.style.opacity = 1;
        }, 150);
    });
});