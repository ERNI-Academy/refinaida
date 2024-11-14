import "@/pdf-worker";

import Papa from "papaparse";
import * as pdfjsLib from "pdfjs-dist";

const KEY_ENTER = "Enter";

export const handleEnterKey = (
  e: React.KeyboardEvent<HTMLElement>,
  onEnter: () => void | Promise<void>
) => {
  if (e.key === KEY_ENTER) {
    onEnter();
  }
};

export const jsonToCsv = (json: any): string => {
  return Papa.unparse(json);
};

export const downloadCsv = (csv: string, fileName: string): void => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const convertPdfToText = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    text += pageText + " ";
  }

  return text.trim();
};
