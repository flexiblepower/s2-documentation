# Documentation for the S2 standard
<div align="center">
    <a href="https://s2standard.org"><img src="./Logo-S2.svg" width="200" height="200" /></a>
</div>
<br />

This repository contains the source code for the [documentation website for the S2 standard](https://flexiblepower.github.io/s2-documentation/), plus the structured documentation that website is generated from.

## Workflow
For the initial generation of the structured documentation, you can use the `structured-documentation-generator`. The idea is that the initial files are generated, and are then hand-edited to further improve them and add more documentation. This means you'll only generate them once, and never regenerate them. The data model for the structured documentation is contained in [`structured-documentation-generator/src/doc_types.rs`](structured-documentation-generator/src/doc_types.rs).

`website-generator` takes the structured documentation and generates Markdown files for them, which are placed in `website/docs/API`. `website` contains the file that make up the actual documentation website. These are built and deployed to the `deployment` branch, which is used by Github Pages to serve the website.