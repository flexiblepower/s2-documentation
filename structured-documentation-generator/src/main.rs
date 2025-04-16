use doc_types::{
    EnumDocumentation, FieldDocumentation, GenericDocumentation, ObjectDocumentation,
    VariantDocumentation,
};
use indexmap::IndexMap;
use regex::Regex;
use schemars::schema::{ArrayValidation, InstanceType, RootSchema, SingleOrVec};

mod doc_types;

fn process_description(description: String) -> String {
    let s2_type_regex = Regex::new(r"\w[\w\d]+\.\w[\w\d]+").unwrap();
    s2_type_regex.replace_all(&description, "`$0`").into()
}

fn main() {
    let schema: RootSchema = serde_json::from_str(include_str!("./s2.schema.json")).unwrap();
    let enum_description_regex = Regex::new(r"([\w\._]+): ([^\n]+)").unwrap();
    let multiline_description_regex = Regex::new(r#"description = "(.*)"\n"#).unwrap();

    std::fs::create_dir_all("../structured-documentation/").unwrap();
    for (name, def) in schema.definitions {
        let def = def.into_object();

        let doc_object = if let Some(enum_values) = def.enum_values {
            // Case: enum
            let description = def
                .metadata
                .unwrap()
                .description
                .unwrap_or("TODO".to_string());

            let root_description_end = enum_description_regex
                .find(&description)
                .map(|desc| desc.start())
                .unwrap_or(description.len());
            let (mut root_description, _) = description.split_at(root_description_end);
            if root_description.len() == 0 {
                root_description = "TODO";
            }

            let variant_descriptions: Vec<_> =
                enum_description_regex.captures_iter(&description).collect();

            let variants: IndexMap<_, _> = enum_values
                .iter()
                .filter_map(|enum_value| enum_value.as_str())
                .map(|enum_value| {
                    let variant_description = variant_descriptions
                        .iter()
                        .filter(|desc| desc.get(1).unwrap().as_str() == enum_value)
                        .map(|desc| process_description(desc.get(2).unwrap().as_str().into()))
                        .next()
                        .unwrap_or("TODO".to_string());

                    (
                        enum_value.to_string(),
                        VariantDocumentation {
                            variant_name: enum_value.to_string(),
                            description: variant_description,
                        },
                    )
                })
                .collect();

            GenericDocumentation::Enum(EnumDocumentation {
                type_name: name.clone(),
                description: process_description(root_description.to_string()),
                see_also: Vec::new(),
                variants,
            })
        } else if let Some(object_values) = def.object {
            // Case: object
            let description = def
                .metadata
                .unwrap()
                .description
                .unwrap_or("TODO".to_string());

            let fields: IndexMap<_, _> = object_values
                .properties
                .iter()
                .map(|(field_name, field)| {
                    let field = field.clone().into_object();

                    let field_desc = field
                        .metadata
                        .map(|md| process_description(md.description.unwrap_or("TODO".to_string())))
                        .unwrap_or("TODO".to_string());

                    let mut field_type = field
                        .reference
                        .iter()
                        .filter_map(|r| r.split("/").last())
                        .map(|s| s.to_string())
                        .next();

                    if let Some(SingleOrVec::Single(instance_type)) = field.instance_type {
                        field_type = match *instance_type {
                            InstanceType::Array => {
                                if let Some(ArrayValidation {
                                    items: Some(SingleOrVec::Single(item)),
                                    ..
                                }) = field.array.as_deref()
                                {
                                    let item = item.clone().into_object();
                                    item.reference
                                        .iter()
                                        .filter_map(|r| r.split("/").last())
                                        .map(|s| s.to_string())
                                        .next()
                                        .map(|r| format!("{}[]", r))
                                } else {
                                    None
                                }
                            }
                            InstanceType::String => Some("string".to_string()),
                            InstanceType::Number => Some("float".to_string()),
                            InstanceType::Integer => Some("integer".to_string()),
                            InstanceType::Boolean => Some("boolean".to_string()),
                            _ => None,
                        }
                    }

                    let field_type = match field_type {
                        Some(s) => s,
                        None => String::from("TODO"),
                    };

                    let optional = !object_values.required.contains(field_name);

                    (
                        field_name.to_string(),
                        FieldDocumentation {
                            field_name: field_name.to_string(),
                            field_type,
                            description: field_desc,
                            optional,
                        },
                    )
                })
                .collect();

            GenericDocumentation::Object(ObjectDocumentation {
                type_name: name.clone(),
                sent_by: Some(Vec::new()),
                description: process_description(description),
                see_also: Vec::new(),
                fields,
            })
        } else {
            println!("Skipping {name}");
            continue;
        };

        let rendered_doc = toml::to_string_pretty(&doc_object).unwrap();
        let rendered_doc = multiline_description_regex
            .replace_all(&rendered_doc, "description = '''\n$1\n'''\n")
            .to_string();
        std::fs::write(
            format!("../structured-documentation/{name}.toml"),
            rendered_doc,
        )
        .unwrap();
        println!("Generated ../structured-documentation/{name}.toml");
    }

    println!("Done!");
}
