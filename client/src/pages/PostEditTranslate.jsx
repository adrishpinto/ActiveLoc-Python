import React, { useState } from "react";
import LanguageDropdown from "../components/LanguageDropdownMT";
import FileUpload from "../components/upload_components/FileUploadMTPE";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const PostEditTranslate = () => {
  const [srcLanguage, setSrcLanguage] = useState("");
  const [trgLanguage, setTrgLanguage] = useState("");

  // uploads...

  const convertFile = async () => {
    toast.success("File conversion intiated");
    try {
      const res = await fetch(`${API_URL}/convert-file`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ srcLanguage, trgLanguage }),
      });

      toast.success("File converted successfully");
      console.log("Response:", res.data); // Debugging
    } catch (error) {
      console.log("Error:", error.response ? error.response.data : error);
      toast.error("Failed to convert file. Please try again.");
    }
  };

  //download
  const downloadFile = async () => {
    try {
      const response = await fetch(`${API_URL}/download_xliff`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const file_name = response.headers.get("file_name") || "downloaded_file";
      a.download = `${file_name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl my-20 p-10 mb-20">
        <h1 className="text-center mb-10 text-3xl">Post Edit Translation</h1>
        <h2 className="border-2 border-green-500 bg-green-200 mb-8 w-fit mx-auto px-6 py-2 rounded-lg text-black font-semibold">
          <h2 className="font-semibold text-lg pr-1">Supported File Types: </h2>
          .catkeys, .csv, .dita, .docm, .docx, .dox, .dotm, .dotx, .dtd, .htm,
          .html, .icml, .idml, .json, .lang, .markdown, .md, .mif, .odg, .odp,
          .ods, .odt, .otp, .ots, .ott, .php, .po, .potm, .potx, .ppsm, .ppsx,
          .pptm, .pptx, .properties, .rdf, .resx, .rtf, .sdlppx, .sdlrpx, .srt,
          .strings, .stringsdict, .swd, .swc, .swx, .sxd, .sxi, .tex, .tmx, .ts,
          .tsv, .ttml, .ttx, .txml, .vtt, .vsdm, .vsdx, .wxl, .wiki, .xhtml,
          .xlf, .xliff, .xlsm, .xlsx, .xltm, .xltx, .xml, .yaml, .yml
        </h2>

        <h2 className="border-2 border-red-500 bg-red-200 mb-8 w-fit mx-auto px-6 py-2 rounded-lg text-black font-semibold">
          <h2 className="font-semibold text-lg pr-1">
            Unsupported File Types:
          </h2>
          .doc, .rtfd, .odf, .epub, .mobi, .texi, .xps, .djvu, .ppt, .xls, .pdf
        </h2>

        <FileUpload />
        <div className="flex gap-12 items-center justify-center my-5">
          <div>
            <h2 className="text-sm font-bold mb-1 text-center">
              Select Source Language
            </h2>
            <LanguageDropdown
              language={srcLanguage}
              onLanguageChange={(e) => setSrcLanguage(e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-sm font-bold mb-1 text-center">
              Select Target Language
            </h2>
            <LanguageDropdown
              language={trgLanguage}
              onLanguageChange={(e) => setTrgLanguage(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            onClick={convertFile}
            className="bg-blue-200 hover:bg-blue-300  mx-4 px-2 py-1 rounded"
          >
            Convert File
          </button>
          <button
            onClick={downloadFile}
            className="bg-blue-200 mx-4 px-2 py-1 rounded"
          >
            Download File
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditTranslate;
