export const parseNote = (text: string) => {
  let buffer = '';
  let isWidget = false;
  const result: (string | number)[] = [];

  try {
    for (const [i, char] of [...text].entries()) {
      //   if (['<', '>'].includes(text[i]) && Number(i) > 0 && text[Number(i) - 1] === '\\') {
      // потом
      //   }
      if (char === '>') {
        const widgetId = Number(buffer);
        if (buffer.trim() === '' || isNaN(widgetId)) {
          return new Error('Ошибка парсинга 3: ожидалось число');
        }
        result.push(widgetId);
        buffer = '';
        isWidget = false;
      } else if (char !== '<') {
        buffer += char;
      } else {
        if (isWidget) {
          return new Error('Ошибка парсинга 2: вложенный виджет"');
        }
        if (buffer) {
          result.push(buffer);
        }
        buffer = '';
        isWidget = true;
      }
    }
    if (isWidget) {
      return new Error('Ошибка парсинга 4: незакрытый виджет');
    }
    if (buffer) {
      result.push(buffer);
    }
  } catch (error) {
    return new Error(
      'Неизвестная ошибка парсинга' + (error instanceof Error ? '. ' + error.message : ''),
    );
  }

  return result;
};
