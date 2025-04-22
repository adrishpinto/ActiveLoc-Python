import FileUploadGlossary from "../components/upload_components/FileUploadGlossary";
import { useNavigate } from "react-router-dom";

const Glossary = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="mt-20  text-center border w-fit mx-auto px-20 py-10 border-black rounded-xl">
        <h3 className="mb-4 text-3xl ">Add a glossary File</h3>
        <FileUploadGlossary />
      </div>
      <button
        onClick={() => navigate(-1)}
        className="w-fit mt-10 px-2 py-1 mx-auto bg-blue-500 text-white rounded-lg "
      >
        Go Back
      </button>
    </div>
  );
};

export default Glossary;
