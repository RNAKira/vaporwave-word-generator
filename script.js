document.addEventListener('DOMContentLoaded', () => {
    // ... (保留之前的 DOM 元素获取代码) ...
    const loadWordsBtn = document.getElementById('loadWordsBtn');
    const customWordsTextarea = document.getElementById('customWords');
    const wordCountDisplay = document.getElementById('wordCount');

    // 默认词库（用于保底）
    const defaultNouns = ["彩虹", "海豚", "独角兽", "晶体", "城市", "废墟", "计算机", "磁带"];
    
    // 全局词库变量
    let userNouns = []; 

    // 可爱/蒸汽波风格的随机修饰语（Prefixes）
    const prefixes = [
        "赛博 (Cyber)", "霓虹 (Neon)", "蒸汽朋克 (Steam-Powered)", "全息 (Holo)", 
        "像素 (Pixel)", "闪耀 (Glitter)", "可爱 (Kawaii)", "未来 (Future)", "复古 (Retro)"
    ];

    // --- 新功能函数：加载词库 ---
    function loadCustomWords() {
        const text = customWordsTextarea.value.trim();
        // 按换行符分割，过滤掉空行，并去除每个词汇的首尾空白
        const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        
        if (words.length > 0) {
            userNouns = words;
            wordCountDisplay.textContent = `词库已加载：${userNouns.length} 个自定义词汇`;
        } else {
            userNouns = []; // 清空词库
            wordCountDisplay.textContent = `词库已加载：0 个自定义词汇`;
            hybridWordDisplay.textContent = "自定义词库为空，将使用默认词汇。";
        }
    }

    // --- 核心混合函数更新 ---
    function generateHybrid() {
        let noun1 = nounInput.value.trim();
        let noun2 = adjInput.value.trim();
        
        let sourceWords = userNouns.length > 0 ? userNouns : defaultNouns; // 优先使用自定义词库

        // 逻辑：如果输入框为空，则从词库中随机抽取
        if (noun1 === "") {
            noun1 = sourceWords[Math.floor(Math.random() * sourceWords.length)];
        }
        if (noun2 === "") {
            // 确保 noun2 不与 noun1 重复 (如果从词库中抽取的话)
            let tempNouns = [...sourceWords]; 
            const index1 = tempNouns.indexOf(noun1);
            if (index1 > -1) {
                tempNouns.splice(index1, 1); 
            }
            noun2 = tempNouns[Math.floor(Math.random() * tempNouns.length)];
        }

        // 只有当两个输入都为空且词库也为空时，才显示错误
        if (!noun1 || !noun2) {
             hybridWordDisplay.textContent = "请输入词汇或添加自定义词库！";
             return;
        }

        // 随机选择一个前缀
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        
        // 构建混合词
        const hybrid = `${randomPrefix.toUpperCase()} - ${noun1.toUpperCase()} - ${noun2.toUpperCase()}`;
        
        hybridWordDisplay.textContent = hybrid; 
    }

    // 绑定事件
    loadWordsBtn.addEventListener('click', loadCustomWords);
    generateBtn.addEventListener('click', generateHybrid);
    
    // 允许回车键生成
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { // 避免在文本区按回车触发
            generateHybrid();
        }
    });

    // 初始提示
    wordCountDisplay.textContent = `词库已加载：0 个自定义词汇`;
    hybridWordDisplay.textContent = "开始创造你的蒸汽波怪词！";
});