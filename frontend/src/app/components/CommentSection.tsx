"use client";

import { useState } from "react";
type TopicRequest = {
  topic_uid: string | null;
};

const COMMENT = (topic_uid: TopicRequest) => {
  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <p className="h-5 w-5 text-primary" />
        <h4 className="font-semibold text-foreground">Comentarios</h4>
      </div>

      <div className="mb-4 p-3 rounded-lg border bg-muted/30">
        <textarea
          className="w-full text-sm"
          placeholder="Agrega un comentario o pregunta..."
          rows={2}
        />
        <div className="mt-2">
          <button className="bg-[#0098af] hover:bg-[#19a2b6] text-white font-bold rounded-4xl px-4 py-2 text-primary-foreground text-sm">
            Comentar
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground text-center py-4">
          No hay comentarios aún
        </p>
      </div>
    </div>
  );
};
export default COMMENT;
