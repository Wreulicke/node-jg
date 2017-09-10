/* eslint-disable no-unused-vars */
import {
  ValueNode,
  KeyType,
  MemberNode,
  ObjectNode,
  ArrayNode,
  BooleanTemplateNode,
  StringTemplateNode,
  StringNode,
  NumberTemplateNode,
  NumberNode,
  ObjectTemplateNode,
} from "./ast"
/* eslint-enable no-unused-vars */

const ast = {
  object(members: MemberNode[] = []): ObjectNode {
    return { type: "object", members }
  },
  objectTemplate(id: string): ObjectTemplateNode {
    return { type: "object_template", id: id }
  },
  array(values: ValueNode[]): ArrayNode {
    return { type: "array", values }
  },
  member(key: KeyType, value: ValueNode): MemberNode {
    return { type: "member", key, value }
  },
  booleanTemplate(id: string): BooleanTemplateNode {
    return { type: "boolean_template", id }
  },
  number(value: number): NumberNode {
    return { type: "number", value }
  },
  numberTemplate(id: string): NumberTemplateNode {
    return { type: "number_template", id }
  },
  string(value: string): StringNode {
    return { type: "string", value }
  },
  stringTemplate(id: string): StringTemplateNode {
    return { type: "string_template", id }
  },
}

export { ast }
