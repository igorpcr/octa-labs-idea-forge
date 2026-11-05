import { createFileRoute } from "@tanstack/react-router";
import { LabTool } from "@/components/lab-tool";
import { toolHead } from "@/lib/octa-tools";

export const Route = createFileRoute("/ferramentas/rendimento")({
  head: () => toolHead("rendimento"),
  component: () => <LabTool id="rendimento" />,
});
