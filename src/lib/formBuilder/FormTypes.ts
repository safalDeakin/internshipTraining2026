export type FieldType =
    | "text"
    | "number"
    | "checkbox"
    | "select";

export type FormFieldConfig = {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: string }[];
};

export type FormConfig = {
    fields: FormFieldConfig[];
};