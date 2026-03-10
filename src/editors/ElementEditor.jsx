import ComplexPlaneEditor from "./ComplexPlaneEditor";
import DiscreteGraphEditor from "./DiscreteGraphEditor";
import EquationEditor from "./EquationEditor";
import GraphEditor from "./GraphEditor";
import MCQEditor from "./MCQEditor";
import { ProbaTreeEditor } from "./ProbaTreeEditor";
import QuestionEditor from "./QuestionEditor";
import SignTableEditor from "./SignTableEditor";
import StatsTableEditor from "./StatsTableEditor";
import TextEditor from "./TextEditor";
import VariationTableEditor from "./VariationTableEditor";
import VectorEditor from "./VectorEditor";

const ElementEditor = ({ element, updateElement }) => {
  const { type, content, id } = element;

  const handleUpdate = (updatedContent) => {
    updateElement(id, updatedContent);
  };

  switch (type) {
    case "text":
      return <TextEditor content={content} onUpdate={handleUpdate} />;
    case "graph":
      return <GraphEditor content={content} onUpdate={handleUpdate} />;
    case "variationTable":
      return <VariationTableEditor content={content} onUpdate={handleUpdate} />;
    case "signTable":
      return <SignTableEditor content={content} onUpdate={handleUpdate} />;
    case "probaTree":
      return <ProbaTreeEditor content={content} onUpdate={handleUpdate} />;
    case "discreteGraph":
      return <DiscreteGraphEditor content={content} onUpdate={handleUpdate} />;
    case "complexPlane":
      return <ComplexPlaneEditor content={content} onUpdate={handleUpdate} />;
    case "vector":
      return <VectorEditor content={content} onUpdate={handleUpdate} />;
    case "statsTable":
      return <StatsTableEditor content={content} onUpdate={handleUpdate} />;
    case "equation":
      return <EquationEditor content={content} onUpdate={handleUpdate} />;
    case "question":
      return <QuestionEditor content={content} onUpdate={handleUpdate} />;
    case "mcq":
      return <MCQEditor content={content} onUpdate={handleUpdate} />;
    default:
      return <p className="text-gray-400">Éditeur non disponible</p>;
  }
};

export default ElementEditor;
