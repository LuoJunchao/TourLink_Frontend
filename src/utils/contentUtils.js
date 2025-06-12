// 内容处理工具

// 敏感词列表（示例）
const sensitiveWords = [
  'MD',
  '鉴证',
  '你妈',
  // 可以根据需要添加更多敏感词
];

// 敏感词过滤
export const filterSensitiveWords = (content) => {
  if (!content) return content;
  
  let filteredContent = content;
  sensitiveWords.forEach(word => {
    // 使用正则表达式全局替换敏感词为星号
    const regex = new RegExp(word, 'gi');
    filteredContent = filteredContent.replace(regex, '*'.repeat(word.length));
  });
  
  return filteredContent;
};

// 格式化文本（例如：修复常见的标点符号错误）
export const formatText = (content) => {
  if (!content) return content;
  
  // 替换多个连续空格为单个空格
  let formattedContent = content.replace(/\s+/g, ' ');
  
  // 修复常见的标点符号错误
  formattedContent = formattedContent
    .replace(/([,，])\s*/g, '，') // 统一逗号
    .replace(/([.。])\s*/g, '。') // 统一句号
    .replace(/([!！])\s*/g, '！') // 统一感叹号
    .replace(/([?？])\s*/g, '？'); // 统一问号
  
  return formattedContent;
};

// 添加段落格式（如果内容中有连续两个换行符，则视为段落分隔）
export const formatParagraphs = (content) => {
  if (!content) return content;
  
  // 将连续的换行符替换为HTML段落标签
  const paragraphs = content.split(/\n{2,}/);
  return paragraphs
    .map(p => p.trim())
    .filter(p => p) // 过滤空段落
    .join('\n\n');
};

// 内容增强（例如：自动添加标签）
export const enhanceContent = (content, tags = []) => {
  if (!content || !Array.isArray(tags) || tags.length === 0) return content;
  
  // 检查内容中是否包含标签关键词，如果包含但用户未添加该标签，则建议添加
  const suggestedTags = [];
  
  tags.forEach(tag => {
    const regex = new RegExp(`\\b${tag.value}\\b`, 'i');
    if (regex.test(content) && !suggestedTags.includes(tag)) {
      suggestedTags.push(tag);
    }
  });
  
  return {
    processedContent: content,
    suggestedTags
  };
};

// 综合处理函数
export const processContent = (content, options = {}) => {
  const { filterSensitive = true, format = true, formatParagraph = true } = options;
  
  let processedContent = content;
  
  if (filterSensitive) {
    processedContent = filterSensitiveWords(processedContent);
  }
  
  if (format) {
    processedContent = formatText(processedContent);
  }
  
  if (formatParagraph) {
    processedContent = formatParagraphs(processedContent);
  }
  
  return processedContent;
};