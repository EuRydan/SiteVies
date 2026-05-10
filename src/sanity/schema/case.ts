/* eslint-disable @typescript-eslint/no-explicit-any */

const caseSchema = {
  name: "case",
  title: "Case",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Categoria",
      type: "string",
    },
    {
      name: "type",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Site", value: "site" },
          { title: "App", value: "app" },
          { title: "Sistema", value: "sistema" },
          { title: "E-commerce", value: "ecommerce" },
          { title: "Branding", value: "branding" },
          { title: "Evento", value: "evento" },
        ],
      },
    },
    {
      name: "year",
      title: "Ano",
      type: "string",
    },
    {
      name: "description",
      title: "Descrição",
      type: "text",
    },
    {
      name: "fullDescription",
      title: "Descrição Completa",
      type: "text",
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "images",
      title: "Imagens",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "stack",
      title: "Stack Tecnológica",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "prazo",
      title: "Prazo",
      type: "string",
    },
    {
      name: "results",
      title: "Resultados",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Valor", type: "string" },
          ],
        },
      ],
    },
  ],
};

export default caseSchema;
