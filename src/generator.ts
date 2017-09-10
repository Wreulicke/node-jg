import { parse } from "./parser"

/* eslint-disable no-unused-vars */
import * as ast from "./ast"
/* eslint-enable no-unused-vars */

const generate = (src: string, env: object) => {
  const ast = parse(src)
  return evaluate(ast, env)
}

const evaluate = (ast: ast.ValueNode, env: any): any => {
  switch (ast.type) {
    case "null":
      return null
    case "boolean":
    case "string":
    case "number":
      return ast.value
    case "boolean_template":
      if (typeof env[ast.id] !== "boolean") {
        throw new Error(`${ast.id} is not boolean. ${env[ast.id]}`)
      }
      return env[ast.id]
    case "number_template":
      if (typeof env[ast.id] !== "number") {
        throw new Error(`${ast.id} is not number. ${env[ast.id]}`)
      }
      return env[ast.id]
    case "string_template":
      if (typeof env[ast.id] !== "string") {
        throw new Error(`${ast.id} is not string. ${env[ast.id]}`)
      }
      return env[ast.id]
    case "array":
      return ast.values.map(v => evaluate(v, env))
    case "object_template":
      if (typeof env[ast.id] !== "object") {
        throw new Error(`${ast.id} is not object. ${env[ast.id]}`)
      }
      return env[ast.id]
    case "object": {
      const object: any = {}
      ast.members.reduce((r, m) => {
        r[evaluate(m.key, env)] = evaluate(m.value, env)
        return r
      }, object)
      return object
    }
  }
}
export { generate }
