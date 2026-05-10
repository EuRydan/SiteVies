/* eslint-disable @typescript-eslint/no-explicit-any */

const serviceSchema = {
  name: "service",
  title: "Serviço",
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
      name: "description",
      title: "Descrição",
      type: "text",
    },
    {
      name: "icon",
      title: "Ícone",
      type: "string",
      description: "Nome do ícone do Lucide React (ex: Layout, Monitor, Settings)",
    },
    {
      name: "deliverables",
      title: "Entregáveis",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "stack",
      title: "Stack",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "order",
      title: "Ordem",
      type: "number",
    },
  ],
};

export default serviceSchema;
