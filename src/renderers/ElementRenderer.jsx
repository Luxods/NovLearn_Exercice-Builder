import EquationRenderer from "./EquationRenderer";
import GraphRenderer from "./GraphRenderer";
import MCQRenderer from "./MCQRenderer";
import ProbaTreeRenderer from "./ProbaTreeRenderer";
import QuestionRenderer from "./QuestionRenderer";
import SignTableRenderer from "./SignTableRenderer";
import StatsTableRenderer from "./StatsTableRenderer";
import TextRenderer from "./TextRenderer";
import VariationTableRenderer from "./VariationTableRenderer";
import VectorRenderer from "./VectorRenderer";

const ElementRenderer = ({ element, variables }) => {
  const { type, content } = element;

  // On passe systématiquement 'variables' à tous les renderers
  switch (type) {
    case "text":
      return <TextRenderer content={content} variables={variables} />;
    case "equation":
      return <EquationRenderer content={content} variables={variables} />;
    case "graph":
      return <GraphRenderer content={content} variables={variables} />;
    case "question":
      return <QuestionRenderer content={content} variables={variables} />;
    case "signTable":
      return <SignTableRenderer content={content} variables={variables} />;
    case "variationTable":
      return <VariationTableRenderer content={content} variables={variables} />;
    case "statsTable":
      return <StatsTableRenderer content={content} variables={variables} />;
    case "probaTree":
      return <ProbaTreeRenderer content={content} variables={variables} />;
    case "vector":
      return <VectorRenderer content={content} variables={variables} />;
    case "mcq":
      return <MCQRenderer content={content} variables={variables} />;
    default:
      console.warn(`Type d'élément non supporté dans le rendu : ${type}`);
      return null;
  }
};

export default ElementRenderer;
