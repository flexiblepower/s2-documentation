# Documentation for the S2 standard
<div align="center">
    <a href="https://s2standard.org"><img src="./Logo-S2.svg" width="200" height="200" /></a>
</div>
<br />

See the live version at [docs.s2standard.org](https://docs.s2standard.org).

This repository contains the source code for the documentation website of the S2 standard. Additionally, it includes the structured documentation from which the data model reference is generated. 

> The structured documentation serves as the single source of truth for other places where the data model is documented, such as in the S2-Rust library.


## Workflow

### Generate structure documentation (one time action)
For the initial generation of the structured documentation, the `structured-documentation-generator` has been used. This is a one time action, i.e. the structured documentation has been generated once, and should not be regenerated again. The data model for the structured documentation is contained in [`structured-documentation-generator/src/doc_types.rs`](structured-documentation-generator/src/doc_types.rs). The result has been put in the `structured-documentation` folder.

### Document the data model
The generated structured documentation from the previous step is the starting point for the documentation of the data model. The documentation has to be extended manually.

### Generate Markdown for data model reference
The data model reference is created directly from the structured-documentation. Since Docusaurus allows for Markdown-based documentation, the `website-generator` takes the structured documentation and generates Markdown files for them, which are placed in `website/model-reference`. Please note that this folder is added to `.gitignore` because the Markdown files will be freshly created during the deployment. 

### Write documentation for S2
The `website` directory contains the file that make up the actual documentation website. Please find in the `website/docs` directory all the Markdown files that constitute the documentation of the S2 standard. The convention is to follow pretty URL patterns (i.e. kebab-case) for the directories and filenames because Docusaurus uses those names to create URLs to the pages (and we want pretty URLs, of course).

### Running the documentation development server
Docusaurus comes with a development server with hot-code replacement. To build the documentation website and to run the development server locally, make sure to have nodejs (v. 18 and higher) installed, and run from the `website` directory:

```
npm run start
```

Sometimes it is needed to clear the build cache in case there are errors displayed on the development website:

```
npm run clear
```


### Deployment
The documentation website is deployed to GitHub pages with GitHub actions. Every time a branch is merged to master, the website is automatically deployed 🚀

## Technical details
The documentation website is created by means of [docusaurus.io](https://docusaurus.io/), that leverages React to create powerful websites but also allows for easy-to-write Markdown-based documentation. "This project uses the default styling theme of Docusaurus that uses [infima](https://infima.dev/). So if you want to style something on the main page, please refer to the infima docs.