import {defineConfig} from "es-pkg";

export default defineConfig({
    "es": "./es",
    "lib": "./lib",
    "typings": "./es",
    "publishDir":"../empty-ghost-npm",
    "doc":{
        caseDir:'./examples/cases'
    }
})