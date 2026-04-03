import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.HEAD || "main",
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
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "Link", required: true },
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
    ],
  },
});
