"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

export function CodeEditor() {
  const [code, setCode] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (err) {
      console.error("Clipboard read failed", err);
    }
  };

  return (
    <Card className="p-4 shadow-md">
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Paste code từ clipboard</h2>
          <Button onClick={handlePaste}>Dán mã</Button>
        </div>

        <ScrollArea className="h-96 border rounded-lg p-3 bg-black text-white">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={12}
            className="font-mono text-sm min-h-full outline-none"
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
