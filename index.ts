import { generate } from "./src/generator"
import { readFile } from "fs"
import * as commandpost from "commandpost"
import { promisify } from "util"

/* eslint-disable no-unused-vars, no-undef */
type Options = {
  env?: string[],
  prettyPrint: boolean,
}
type Arguments = {
  file: string,
}
/* eslint-enable no-unused-vars, no-undef */
const read = promisify(readFile)

const printer = (isPretty: boolean) => (data: any) => {
  if (isPretty) {
    console.log(JSON.stringify(data, null, 2))
  } else {
    console.log(JSON.stringify(data))
  }
}

const origin = commandpost
  .create("file <file>")
  .option("-e, --env <file>", "enviroment settings")
  .option("-p, --pretty-print", "pretty-print generated json")
  .action((opt: Options, args: Arguments) => {
    if (opt.env != null && opt.env.length > 0) {
      return Promise.all([read(args.file), read(opt.env[0])])
        .then(([template, env]) =>
          generate(template.toString(), JSON.parse(env.toString())),
        )
        .then(printer(opt.prettyPrint))
    } else {
      return read(args.file)
        .then(data => generate(data.toString(), process.env))
        .then(printer(opt.prettyPrint))
    }
  })
commandpost.exec(origin, process.argv).catch(err => {
  if (err instanceof Error) {
    console.error(err.stack)
  } else console.error(err)
  process.exit(1)
})
