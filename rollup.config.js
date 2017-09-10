import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import uglify from "rollup-plugin-uglify"
import { minify } from "uglify-es"
import typescript from "rollup-plugin-typescript"

const env = process.env || {}
const m = {
  input: "index.ts",
  output: {
    format: "cjs",
    file: "target/index.js",
  },
  name: "node-jg",
  plugins: [
    typescript({ typescript: require("typescript") }),
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
    env.NODE_ENV === "production" && uglify({}, minify),
  ],
}
export default m
