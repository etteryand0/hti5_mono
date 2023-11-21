import type { PlopTypes } from "@turbo/gen";
 
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("Create tRPC router", {
    description: "Create new tRPC router and include it into root router",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your new tRPC router name? (skip Router postfix)"
      }
    ],
    actions: [
        (answer) => {
            return "Created your new tRPC router"
        },
        {
            type: "add",
            path: "packages/api/src/router/{{name}}.ts",
            templateFile: "templates/router.hbs",
        },
        {
            type: "modify",
            path: "packages/api/src/root.ts",
            pattern: /(\/\/ Router exports)/g,
            template: "{{name}}: {{name}}Router\n$1"
        },
        {
            type: "modify",
            path: "packages/api/src/root.ts",
            pattern: /(\/\/ Router imports)/g,
            template: "import { {{name}}Router } from \"./router/{{name}}\"\n$1"
        },
    ],
  });

  plop.setGenerator("Create React-Native screen", {
    description: "Create react-native screen",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "New react-native screen name:"
      }
    ],
    actions: [
      (answer) => {
        return "Created your new react-native screen"
      },
      {
        type: "add",
        path: "apps/mobile/src/screens/{{name}}/index.tsx",
        templateFile: "templates/screen.hbs",
      }
    ]
  })
}