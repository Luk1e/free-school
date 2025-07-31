// this function gets string with bold tag and returns normal html without using dangerous methods
function parseBoldText(text: string): JSX.Element {
  const parts: (string | JSX.Element)[] = [];
  const regex = /(<b>.*?<\/b>)/g;
  let lastIndex = 0;

  text.replace(regex, (match, p1, offset) => {
    p1;
    // Add text before the <b> tag
    if (offset > lastIndex) {
      parts.push(text.substring(lastIndex, offset));
    }
    // Add the bold text
    const boldText = match.substring(3, match.length - 4);
    parts.push(<strong key={parts.length}>{boldText}</strong>);
    lastIndex = offset + match.length;
    return match;
  });

  // Add any remaining text after the last <b> tag
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
}

export default parseBoldText;
