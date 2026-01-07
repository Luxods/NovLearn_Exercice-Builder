import React from 'react';
import MathText from '../utils/mathRenderer';

const TextRenderer = ({ content, variables }) => {
  const text = typeof content === 'string' ? content : content?.text || '';

  if (!text) return null;

  return (
    <div className="prose max-w-none text-gray-700 leading-relaxed">
      <MathText content={text} variables={variables} />
    </div>
  );
};

export default TextRenderer;