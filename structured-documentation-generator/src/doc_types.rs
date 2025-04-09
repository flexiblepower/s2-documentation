use indexmap::IndexMap;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum GenericDocumentation {
    Object(ObjectDocumentation),
    Enum(EnumDocumentation),
}

#[derive(Serialize, Deserialize)]
pub struct ObjectDocumentation {
    pub type_name: String,
    pub sent_by: Vec<String>,
    pub description: String,
    pub see_also: Vec<String>,
    pub fields: IndexMap<String, FieldDocumentation>,
}

#[derive(Serialize, Deserialize)]
pub struct FieldDocumentation {
    pub field_name: String,
    pub field_type: String,
    pub optional: bool,
    pub description: String,
}

#[derive(Serialize, Deserialize)]
pub struct EnumDocumentation {
    pub type_name: String,
    pub description: String,
    pub see_also: Vec<String>,
    pub variants: IndexMap<String, VariantDocumentation>,
}

#[derive(Serialize, Deserialize)]
pub struct VariantDocumentation {
    pub variant_name: String,
    pub description: String,
}

impl GenericDocumentation {
    pub fn type_name(&self) -> &str {
        match self {
            Self::Object(obj) => &obj.type_name,
            Self::Enum(obj) => &obj.type_name,
        }
    }

    pub fn description(&self) -> &str {
        match self {
            Self::Object(obj) => &obj.description,
            Self::Enum(obj) => &obj.description,
        }
    }
}