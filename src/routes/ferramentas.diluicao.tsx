import { createFileRoute } from "@tanstack/react-router";
import { LabTool } from "@/components/lab-tool";
import { toolHead } from "@/lib/octa-tools";

export const Route = createFileRoute("/ferramentas/diluicao")({
  head: () => toolHead("diluicao"),
  component: () => <LabTool id="diluicao" />,
});
