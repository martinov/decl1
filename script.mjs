#!/usr/bin/env zx

/**
 * @see https://github.com/google/zx
 */

import 'dotenv/config'
import { question, fs } from 'zx'
import mustache from "mustache/mustache.mjs"
const iconv = require("iconv-lite")

// await $`cat package.json | grep name`
// let branch = await $`git branch --show-current`
// await $`dep deploy --branch=${branch}`

let month = await question("Месец (1-12): ")
// let token = await question("Choose env variable: ", {
//   choices: Object.keys(process.env),
// })

let numWorkingDays = await question("Брой работни дни в този месец: ")

const data = {
  month,
  year: "2022",
  uic: process.env.DEC1_UIC ?? "222222222",
  pin: process.env.DEC1_PIN ?? "8888888888",
  familyName: process.env.DEC1_NAME_FAMILY ?? "ФАМИЛИЯ",
  initials: process.env.DEC1_NAME_INITIALS ?? "ПВ",
  monthStartDay: "01",
  numWorkingDays,
  income: "710.00",
  doo: "14.80",
  health: "8.00",
  pension: "5.00",
}

data.monthEndDay = new Date(
  parseInt(data.year),
  parseInt(data.month),
  0
).getDate()

const content = await fs.readFile("./decl-obr-1.template.txt")
let str = iconv.decode(content, "win1251")

const resultFileData = iconv.encode(mustache.render(str, data), "win1251")
await fs.writeFile("./output/EMPL2021.txt", resultFileData)
