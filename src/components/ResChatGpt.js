"use client";

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function ResChatGpt({ response }) {
  const isFull = true;

  console.log("response object", response);

  return (
    <div
      // className={`overflow-y-scroll ${
      //   isFull
      //     ? "xl:w-[60%] lg:w-[70%] md:w-[80%] w-[90%] mx-auto max-h-[80vh]"
      //     : "max-h-[60vh] md:w-[70vw] w-[80vw] lg:w-[700px] xl:w-[900px]"
      // }`}
      className='overflow-y-scroll md:h-[70vh] h-[65vh] max-w-[750px] custom-scroll pr-1 space-y-1  '
    >
      {response?.map((resItem, index) => {
        const res = resItem.response;
        const codeBlockMatch = res.answer.match(/```([a-zA-Z]*)\n([\s\S]*?)```/);

        return (
          <div key={index} className="p-4 border-b border-black mb-6 text-sm md:text-lg ">
            {/* Prompt (User Question) */}
           <div className='flex justify-between items-center ' >
           <p className='text-right font-semibold opacity-50 ' >{res.model}</p>

           <div className="font-semibold flex justify-end pr-3 items-center gap-3 mb-3">
              <div className="w-[40px] h-[40px] bg-gray-200 flex items-center justify-center rounded-full">
                <h1 className='text-black' >U</h1>
              </div>
              <h1>{res.prompt}</h1>
            </div>
           </div>


            


            {/* Render Answer Content */}
            <div>
  {String(res.answer ?? "")
    .split("\n")
    .map((line, idx) => {
      const trimmed = line.trim();

      // Skip code block markers
      if (trimmed.startsWith("```")) return null;

      // Bold line: **text**
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <p key={idx} className="font-bold text-lg mt-2">
            {trimmed.slice(2, -2)}
          </p>
        );
      }

      // Numbered list: 1. 2. etc.
      if (/^\d+\.\s/.test(trimmed)) {
        // Check if it's a bolded numbered item
        const parts = trimmed.split("**");
        if (parts.length === 3) {
          return (
            <p key={idx} className="ml-2">
              <span className="font-semibold">{parts[0]}</span>
              <span className="font-bold">{parts[1]}</span>
              <span>{parts[2]}</span>
            </p>
          );
        }
        return (
          <p key={idx} className="ml-2">
            {trimmed}
          </p>
        );
      }

      // Bullet with bold: * **text**
      if (trimmed.startsWith("* **")) {
        return (
          <p key={idx} className="ml-4 list-disc font-semibold">
            {trimmed.replace("* **", "").replace("**", "")}
          </p>
        );
      }

      // Bullet: * text
      if (trimmed.startsWith("*")) {
        return (
          <p key={idx} className="ml-6 list-disc">
            {trimmed.replace("*", "").trim()}
          </p>
        );
      }

      // Fallback bold line
      if (trimmed.startsWith("**")) {
        return (
          <p key={idx} className="font-bold text-lg mt-2">
            {trimmed.replace(/\*\*/g, "")}
          </p>
        );
      }

      // Normal line
      return (
        <p key={idx} className="mt-1">
          {trimmed}
        </p>
      );
    })}
</div>



            {/* Render Code Block */}
            {codeBlockMatch && (
              <SyntaxHighlighter
                language={codeBlockMatch[1] || "plaintext"}
                style={dracula}
                className="rounded-lg mt-3 p-3"
              >
                {codeBlockMatch[2]}
              </SyntaxHighlighter>
            )}
          </div>
        );
      })}
    </div>
  );
}
