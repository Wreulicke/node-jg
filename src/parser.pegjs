
start
  = ws v:value ws { return v; }

begin_array     = ws "[" ws
begin_object    = ws "{" ws
end_array       = ws "]" ws
end_object      = ws "}" ws
name_separator  = ws ":" ws
value_separator = ws "," ws

ws "whitespace" = [ \t\n\r]*

value
  = booleanTemplate
  / false
  / null
  / true
  / numberTemplate
  / object
  / array
  / number
  / string
booleanTemplate = "bool(" id:id ")" {
  return ast.booleanTemplate(id)
}
numberTemplate = "{{" id:id "}}" { 
  return ast.numberTemplate(id)
}
false = "false" { return false; }
null  = "null"  { return null;  }
true  = "true"  { return true;  }

object
  = begin_object
    members:(
      head:member
      tail:(value_separator m:member { return m; })*
      {
        return [head].concat(tail);
      }
    )?
    end_object { 
      return ast.object(members)
  }
  / "{{{" id:id "}}}" {
    return ast.objectTemplate(id)
  }

member
  = key:key name_separator value:value {
      return ast.member(key, value)
  }


array
  = begin_array
    values:(
      head:value
      tail:(value_separator v:value { return v; })*
      { return {type: "array", value: [head].concat(tail)}; }
    )?
    end_array {
      return {type: "array", values: values != null ? values : []}
    }

number "number"
  = minus? int frac? exp? { 
    return ast.number(parseFloat(text()))
  }

decimal_point
  = "."

id = id:$([^\0-\x1F\x22\x5C{}]*) {
  return id
}

digit1_9
  = [1-9]

e
  = [eE]

exp
  = e (minus / plus)? DIGIT+

frac
  = decimal_point DIGIT+

int
  = zero / (digit1_9 DIGIT*)

minus
  = "-"

plus
  = "+"

zero
  = "0"

key = e:string {return e}

string "string"
  = quotation_mark "{{" id:id "}}" quotation_mark {
    return ast.stringTemplate(id)
  }
  / quotation_mark chars:$char* quotation_mark { 
  	return ast.string(chars)
  }

char
  = unescaped
  / escape
    sequence:(
        '"'
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    )
    { return sequence; }

escape
  = "\\"

quotation_mark
  = '"'

unescaped
  = [^\0-\x1F\x22\x5C]

DIGIT  = [0-9]
HEXDIG = [0-9a-f]i