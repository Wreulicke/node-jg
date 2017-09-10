export type ValueNode =  
  | ObjectNode 
  | ArrayNode
  | NumberNode
  | NumberTemplateNode
  | BooleanNode
  | BooleanTemplateNode
  | StringNode
  | StringTemplateNode
  | NullNode
  | ObjectTemplateNode

export type KeyType = StringNode|StringTemplateNode
export type MemberNode = { 
  type: "member", 
  key: KeyType,
  value: ValueNode
}
export type StringNode = { type: "string", value: string }
export type StringTemplateNode = { type: "string_template", id: string }
export type NullNode = { type: "null", value: null }
export type ObjectNode = { type: "object", members: MemberNode[] }
export type NumberNode = { type: "number", value: number}
export type NumberTemplateNode = { type: "number_template", id: string}
export type BooleanTemplateNode = { type: "boolean_template", id: string }
export type ObjectTemplateNode = { type: "object_template", id: string }
export type BooleanNode = {type: "boolean", value: boolean }
export type ArrayNode = {type : "array", values: ValueNode[] }
