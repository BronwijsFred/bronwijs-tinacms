import { defineConfig } from "tinacms";

const branch = process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "static",
    },
  },

  schema: {
    collections: [
      // ─── Collection 1: Home Page ───
      {
        name: "home",
        label: "Home Pagina",
        path: "content",
        format: "md",
        match: { include: "_index" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Paginatitel",
            isTitle: true,
            required: true,
          },
          // Hero section
          {
            type: "object",
            name: "hero",
            label: "Hero Sectie",
            fields: [
              { type: "string", name: "badge", label: "Badge" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "headingEmphasis",
                label: "Heading nadruk",
              },
              { type: "string", name: "subheading", label: "Subheading" },
              {
                type: "string",
                name: "introText",
                label: "Intro tekst",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "introText2",
                label: "Intro tekst 2",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "bulletPoints",
                label: "Bullet points",
                list: true,
              },
              {
                type: "string",
                name: "closingText",
                label: "Afsluitende tekst",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "ctaPrimary",
                label: "CTA Primair",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link" },
                ],
              },
              {
                type: "object",
                name: "ctaSecondary",
                label: "CTA Secundair",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link" },
                ],
              },
            ],
          },
          // About section
          {
            type: "object",
            name: "about",
            label: "Over Ons Sectie",
            fields: [
              { type: "string", name: "sectionLabel", label: "Sectie label" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "headingEmphasis",
                label: "Heading nadruk",
              },
              {
                type: "string",
                name: "description",
                label: "Beschrijving",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "keyPoints",
                label: "Kernpunten",
                list: true,
              },
              { type: "string", name: "tagline", label: "Tagline" },
            ],
          },
          // Samenwerking section
          {
            type: "object",
            name: "samenwerking",
            label: "Samenwerking Sectie",
            fields: [
              { type: "string", name: "sectionLabel", label: "Sectie label" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "headingEmphasis",
                label: "Heading nadruk",
              },
              {
                type: "string",
                name: "paragraphs",
                label: "Paragrafen",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "insight",
                label: "Inzicht",
                ui: { component: "textarea" },
              },
            ],
          },
          // CTA section
          {
            type: "object",
            name: "cta",
            label: "CTA Sectie",
            fields: [
              { type: "string", name: "badge", label: "Badge" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "headingEmphasis",
                label: "Heading nadruk",
              },
              {
                type: "string",
                name: "paragraphs",
                label: "Paragrafen",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "buttons",
                label: "Buttons",
                list: true,
                ui: {
                  itemProps: (item: Record<string, string>) => ({
                    label: item?.label || "Button",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "style",
                    label: "Stijl",
                    options: ["primary", "secondary"],
                  },
                ],
              },
            ],
          },
        ],
      },

      // ─── Collection 2: Urgentie ───
      {
        name: "urgentie",
        label: "Urgentie",
        path: "data",
        format: "yaml",
        match: { include: "urgentie" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "sectionLabel", label: "Sectie label" },
          { type: "string", name: "heading", label: "Heading" },
          {
            type: "string",
            name: "headingEmphasis",
            label: "Heading nadruk",
          },
          { type: "string", name: "headingSuffix", label: "Heading suffix" },
          {
            type: "string",
            name: "description",
            label: "Beschrijving",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "stats",
            label: "Statistieken",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.label
                  ? `${item.value} ${item.label}`
                  : "Statistiek",
              }),
            },
            fields: [
              {
                type: "string",
                name: "value",
                label: "Waarde",
                required: true,
              },
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              { type: "string", name: "sublabel", label: "Sublabel" },
              {
                type: "string",
                name: "description",
                label: "Beschrijving",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "color",
                label: "Kleur",
                options: ["primary-light", "accent-light", "gold-light"],
              },
            ],
          },
          {
            type: "string",
            name: "closingText",
            label: "Afsluitende tekst",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "closingTagline",
            label: "Afsluitende tagline",
          },
        ],
      },

      // ─── Collection 3: Architectuur ───
      {
        name: "architectuur",
        label: "Architectuur",
        path: "data",
        format: "yaml",
        match: { include: "architectuur" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "sectionLabel", label: "Sectie label" },
          { type: "string", name: "heading", label: "Heading" },
          {
            type: "string",
            name: "headingEmphasis",
            label: "Heading nadruk",
          },
          {
            type: "string",
            name: "description",
            label: "Beschrijving",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "cards",
            label: "Kaarten",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.title || "Kaart",
              }),
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titel",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Beschrijving",
                ui: { component: "textarea" },
              },
              { type: "string", name: "iconPath", label: "Icon pad (SVG)" },
              {
                type: "string",
                name: "iconDetail",
                label: "Icon detail (SVG)",
              },
              {
                type: "string",
                name: "color",
                label: "Kleur",
                options: ["primary", "accent", "gold"],
              },
            ],
          },
        ],
      },

      // ─── Collection 4: Kernwaarden ───
      {
        name: "kernwaarden",
        label: "Kernwaarden",
        path: "data",
        format: "yaml",
        match: { include: "kernwaarden" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "sectionLabel", label: "Sectie label" },
          { type: "string", name: "heading", label: "Heading" },
          {
            type: "string",
            name: "headingEmphasis",
            label: "Heading nadruk",
          },
          {
            type: "string",
            name: "description",
            label: "Beschrijving",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "description2",
            label: "Beschrijving 2",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "values",
            label: "Kernwaarden",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.title || "Kernwaarde",
              }),
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titel",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Beschrijving",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "iconColor",
                label: "Icon kleur",
                options: ["primary", "accent", "gold"],
              },
              {
                type: "string",
                name: "iconType",
                label: "Icon type",
                options: ["clock", "triangle", "checkbox", "compass"],
              },
            ],
          },
        ],
      },

      // ─── Collection 5: Navigatie ───
      {
        name: "navigation",
        label: "Navigatie",
        path: "data",
        format: "yaml",
        match: { include: "navigation" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "links",
            label: "Menu links",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.label || "Link",
              }),
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "href",
                label: "Link",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "CTA Button",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
        ],
      },

      // ─── Collection 6: Footer ───
      {
        name: "footer",
        label: "Footer",
        path: "data",
        format: "yaml",
        match: { include: "footer" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "brand",
            label: "Merk",
            fields: [
              {
                type: "string",
                name: "description",
                label: "Beschrijving",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "socials",
                label: "Sociale media",
                list: true,
                ui: {
                  itemProps: (item: Record<string, string>) => ({
                    label: item?.label || "Sociaal",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon (SVG pad)",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "columns",
            label: "Kolommen",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.heading || "Kolom",
              }),
            },
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Koptekst",
                required: true,
              },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                ui: {
                  itemProps: (item: Record<string, string>) => ({
                    label: item?.label || "Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "bottomLinks",
            label: "Links onderaan",
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.label || "Link",
              }),
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "href",
                label: "Link",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
