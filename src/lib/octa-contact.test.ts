import { describe, expect, it } from "vitest";
import { octaContact } from "./octa-contact";

describe("OCTA public contact rules", () => {
  it("uses the email supplied by OCTA", () => {
    expect(octaContact.email).toBe("contato@octalabs.com");
  });
  it("preserves the existing contact telephone", () => {
    expect(octaContact.phone).toBe("(11) 94318-1553");
    expect(octaContact.whatsapp).toBe("https://wa.me/5511943181553");
  });
  it("does not expose company registration or address details", () => {
    expect(octaContact.companyDetails).toBeNull();
  });
});