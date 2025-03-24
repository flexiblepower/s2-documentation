use handlebars::Handlebars;
use s2_documentation_generator::GenericDocumentation;

fn link_type(
    h: &handlebars::Helper,
    _: &Handlebars,
    _: &handlebars::Context,
    _: &mut handlebars::RenderContext,
    out: &mut dyn handlebars::Output,
) -> handlebars::HelperResult {
    let param = h.param(0).unwrap();
    let param_str = param.value().as_str().unwrap();
    if param_str == "string" || param_str == "integer" || param_str == "float" || param_str == "boolean" {
        out.write(&format!("`{0}`", param_str))?;
    } else {
        let split: Vec<_> = param_str.split(".").collect();
        let module_name = if split.len() == 1 { "Common" } else { split[0] };
        out.write(&format!(
            "[`{0}`](/docs/API/{1}/{2})",
            param_str,
            module_name,
            param_str.replace("[]", "")
        ))?;
    }

    Ok(())
}

fn main() {
    let doc_template = include_str!("./doc_item.handlebars");
    let mut handlebars = Handlebars::new();
    handlebars.register_helper("linktype", Box::new(link_type));
    handlebars.register_escape_fn(|x| x.to_string());

    let _ = std::fs::remove_dir_all("../website/docs/API/"); // Ignore errors on this, doesn't matter

    for toml_file in std::fs::read_dir("../structured-documentation").unwrap() {
        let toml_file = toml_file.unwrap();
        let file_contents = std::fs::read_to_string(toml_file.path()).unwrap();

        let doc = toml::from_str::<GenericDocumentation>(&file_contents)
            .expect("Error parsing documentation");
        let mut module_name = doc.type_name().split(".").next().unwrap();
        if module_name.len() != 4 || !module_name.ends_with("BC") {
            module_name = "Common";
        }
        let rendered = handlebars.render_template(doc_template, &doc).unwrap();

        std::fs::create_dir_all(format!("../website/docs/API/{module_name}/")).unwrap();
        std::fs::write(
            format!(
                "../website/docs/API/{module_name}/{type_name}.md",
                type_name = doc.type_name()
            ),
            rendered,
        )
        .unwrap();

        println!(
            "Rendered ../website/docs/API/{module_name}/{type_name}.md",
            type_name = doc.type_name()
        );
    }

    println!("Done!");
}
