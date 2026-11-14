import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { askOctaSupport } from "@/lib/octa-support.functions";
import { supportSources } from "@/lib/octa-support";
import { octaContact } from "@/lib/octa-contact";

type ChatMessage = {
  role: "user" | "assistant";
  parts: { type: "text"; text: string }[];
  handoff?: boolean;
  sources?: string[];
};
export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);
  const request = useServerFn(askOctaSupport);
  useEffect(() => {
    if (open && !busy) field.current?.focus();
  }, [open, busy]);
  async function send(text: string) {
    if (busy || !text.trim()) return;
    const next: ChatMessage[] = [
      ...messages,
      { role: "user", parts: [{ type: "text", text: text.trim() }] },
    ];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);
    try {
      const result = await request({
        data: {
          messages: next.map((message) => ({
            role: message.role,
            content: message.parts.map((part) => part.text).join("\n"),
          })),
        },
      });
      setMessages([
        ...next,
        {
          role: "assistant",
          parts: [{ type: "text", text: result.answer }],
          handoff: result.handoff,
          sources: result.sources,
        },
      ]);
      setError(result.error);
    } catch {
      setError("Resposta indisponível. Fale com a equipe OCTA.");
      setMessages([
        ...next,
        {
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Não foi possível verificar sua dúvida. A equipe OCTA pode ajudar.",
            },
          ],
          handoff: true,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }
  async function copyConversation() {
    try {
      await navigator.clipboard.writeText(
        messages
          .map(
            (message) =>
              `${message.role === "user" ? "Cliente" : "OCTA"}: ${message.parts.map((part) => part.text).join("\n")}`,
          )
          .join("\n\n"),
      );
      setCopied(true);
    } catch {
      setError("Não foi possível copiar a conversa.");
    }
  }
  const handoff = messages.some((message) => message.handoff);
  return (
    <>
      {!open && (
        <Button
          className="fixed bottom-5 right-5 z-50 h-12 gap-2 border border-border shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Abrir suporte OCTA"
        >
          <MessageCircle />
          Suporte OCTA
        </Button>
      )}
      {open && (
        <section
          role="dialog"
          aria-label="Suporte OCTA"
          className="fixed bottom-4 right-4 z-50 flex h-[min(660px,calc(100dvh-32px))] w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-lg"
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-border bg-card px-4 py-3">
            <img
              src="/site-assets/652a01c8780ff967.png"
              alt=""
              className="h-9 w-9 object-contain"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold">OCTA Labs</h2>
              <p className="text-xs text-highlight">Atendimento</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              title="Fechar suporte"
              aria-label="Fechar suporte"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </header>
          <Conversation className="min-h-0" initial="instant" resize="instant">
            <ConversationContent className="gap-5">
              {messages.length === 0 && (
                <div className="space-y-5 py-5">
                  <h3 className="text-xl font-semibold">Olá! Como podemos ajudar?</h3>
                  <p className="text-sm text-muted-foreground">
                    Sou o assistente virtual OCTA. Não envie senhas, documentos ou dados de
                    pagamento.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => void send("Vocês enviam para o Brasil?")}
                    >
                      Envios no Brasil
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => void send("Quero falar com um atendente")}
                    >
                      Falar com a equipe
                    </Button>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <Message from={message.role} key={index}>
                  <MessageContent
                    className={
                      message.role === "user"
                        ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground"
                        : "leading-relaxed"
                    }
                  >
                    {message.parts.map((part, partIndex) => (
                      <MessageResponse key={partIndex}>{part.text}</MessageResponse>
                    ))}
                  </MessageContent>
                  {!!message.sources?.length && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      {message.sources.map((id) => {
                        const source = Object.entries(supportSources).find(
                          ([key]) => key === id,
                        )?.[1];
                        return source ? (
                          <a className="text-highlight underline" href={source.href} key={id}>
                            {source.label}
                          </a>
                        ) : null;
                      })}
                    </div>
                  )}
                </Message>
              ))}
              {busy && (
                <div
                  role="status"
                  className="text-sm text-muted-foreground motion-reduce:animate-none"
                >
                  <Shimmer>Consultando informações OCTA…</Shimmer>
                </div>
              )}
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton aria-label="Ir para a última mensagem" />
          </Conversation>
          {handoff && (
            <div className="shrink-0 space-y-2 border-t border-border px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Copie a conversa e envie à equipe no WhatsApp.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => void copyConversation()}>
                  {copied ? <Check /> : <Copy />}
                  {copied ? "Copiada" : "Copiar conversa"}
                </Button>
                <Button asChild size="sm">
                  <a href={octaContact.whatsapp} target="_blank" rel="noreferrer">
                    <ExternalLink />
                    Falar com a OCTA
                  </a>
                </Button>
              </div>
            </div>
          )}
          <div className="shrink-0 border-t border-border p-3">
            <PromptInput onSubmit={({ text }) => send(text)} className="w-full">
              <PromptInputTextarea
                ref={field}
                aria-label="Sua dúvida"
                placeholder="Escreva sua dúvida…"
                maxLength={4000}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={busy}
                className="min-h-16 text-base"
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit
                  status={busy ? "submitted" : "ready"}
                  disabled={busy || !input.trim()}
                  aria-label="Enviar mensagem"
                  title="Enviar mensagem"
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </section>
      )}
    </>
  );
}
