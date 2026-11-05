import { Link } from "@tanstack/react-router";
import { ArrowRightLeft, CalendarDays, Calculator, ChevronDown, Droplets, FlaskConical, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { tools } from "@/lib/octa-tools";

const icons = { flask: FlaskConical, droplet: Droplets, arrows: ArrowRightLeft, calculator: Calculator, calendar: CalendarDays, scale: Scale };

export function ToolsMenu() {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild><Button variant="ghost" className="h-auto px-0 py-2 text-sm text-muted-foreground hover:bg-transparent hover:text-highlight">Ferramentas Grátis<ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-72 max-w-[calc(100vw-2rem)] border-border bg-card p-2 text-foreground">
      {tools.map(tool => { const Icon = icons[tool.icon]; return <DropdownMenuItem key={tool.id} asChild className="p-3 focus:bg-highlight-soft focus:text-highlight"><Link to={tool.path}><Icon className="text-highlight" />{tool.title}</Link></DropdownMenuItem>; })}
    </DropdownMenuContent>
  </DropdownMenu>;
}

export function MobileToolLinks({ onNavigate }: { onNavigate: () => void }) {
  return <><p className="pt-3 text-xs font-semibold uppercase text-highlight">Ferramentas Grátis</p>
    {tools.map(tool => { const Icon = icons[tool.icon]; return <Button key={tool.id} variant="ghost" asChild className="h-auto justify-start whitespace-normal px-0 py-2 text-left text-sm text-foreground"><Link to={tool.path} onClick={onNavigate}><Icon className="shrink-0 text-highlight" />{tool.title}</Link></Button>; })}
  </>;
}