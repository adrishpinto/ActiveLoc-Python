import MachineTranslate from "./MachineTranslate";
import PostEditTranslate from "./PostEditTranslate";
import FileUpload from "../components/FileUploadAzure";

const TranslationServices = () => {
  return (
    <div>
      <MachineTranslate />
      <PostEditTranslate />
    </div>
  );
};

export default TranslationServices;
