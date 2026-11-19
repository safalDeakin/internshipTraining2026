import { type ReactNode } from "react";
// import './style.css';

export type FormConfig = {
  name: string;
  code: string;
  fields: FieldConfig[];
};

export type FieldType =
  | "number"
  | "text"
  | "textArea"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "date"
  | "date-range"
  | "date-time";

export type FieldConfig = {
  type: FieldType;
  label: string;
  code: string;
  placeholder?: string;
  isRequired?: boolean | undefined;
  validation?: string;
  options?: {
    label: string;
    val: any;
  }[];
};

export type DynamicOption = {
  src: string;
  query: string;
};

export default class FormBuilder {
  private fields: ReactNode[] = [];
  private answers: Record<string, any> = {};
  private onSubmit: (values: string) => void;
  private onCancel?: (values: string) => void;
  private formCode: string;
  private name: string;

  private constructor(
    name: string,
    formCode: string,
    onSubmit: (values: string) => void,
    onCancel?: (values: string) => void,
  ) {
    this.name = name;
    this.formCode = formCode;
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;
  }

  static createForm({
    name,
    code,
    onSubmit,
    onCancel,
  }: {
    name: string;
    code: string;
    onSubmit: (values: string) => void;
    onCancel?: (values: string) => void;
  }) {
    return new FormBuilder(name, code, onSubmit, onCancel);
  }

  static formConfig({
    formConfig,
    onSubmit,
    onCancel,
  }: {
    onSubmit: (values: string) => void;
    onCancel?: (values: string) => void;
    formConfig: FormConfig;
  }) {
    const builder = new FormBuilder(
      formConfig.name,
      formConfig.code,
      onSubmit,
      onCancel,
    );
    formConfig.fields.forEach((item, index) => {
      switch (item.type) {
        case "text":
          console.log("Text" + item.type + "   " + item.code);
          builder.addTextField(
            item.label,
            item.code,
            item.placeholder,
            item.isRequired,
          );
          break;

        case "textArea":
          console.log("Text" + item.type + " " + item.code);
          builder.addTextAreaField(
            item.label,
            item.code,
            item.placeholder,
            item.isRequired,
          );
          break;

        case "number":
          console.log("Number" + item.type + "   " + item.code);
          builder.addNumberField(
            item.label,
            item.code,
            item.placeholder,
            item.isRequired,
          );
          break;

        case "radio":
          if (item.options) {
            builder.addRadiobox(item.label, item.code, item.options);
          }
          break;

        case "dropdown":
          if (item.options) {
            builder.addDropdown(
              item.label,
              item.code,
              item.options,
              item.isRequired,
            );
          }
          break;

        case "checkbox":
          if (item.options) {
            builder.addCheckbox(item.label, item.code, item.options);
          }
          break;

        case "date":
          console.log("Text" + item.type + "   " + item.code);
          builder.addDateField(item.label, item.code, item.isRequired);
          break;

        case "date-range":
          builder.addDateRangeField(item.label, item.code, item.isRequired);
          break;

        case "date-time":
          builder.addDateTimeField(item.label, item.code, item.isRequired);
          break;

        default:
          return;
      }
    });

    return builder;
  }

  addTextField(label: string, code: string, placeholder?: string, isRequired: boolean = true) {
    this.fields.push(<div key={code} className="form-item form-field-item-direction-col">
      <label>{label}</label>
      <input
        type='text'
        className='input'
        name={label}
        placeholder={placeholder}
        required={isRequired}
        onChange={(e) => {
          this.answers[code] = e.target.value;
        }}
      />
    </div>);

    return this;
  }

  addTextAreaField(label: string, code: string, placeholder?: string, isRequired: boolean = true) {
    this.fields.push(
      <div key={code} className="form-item form-field-item-direction-col">
        <label >{label}</label>
        <textarea
          name={label}
          onChange={(e) => {
            this.answers[code] = e.target.value;
          }}
          required={isRequired}
          placeholder={placeholder}
          className="input w-full px-3 py-2"
        />

      </div>
    )
  }


  addNumberField(label: string, code: string, placeholder?: string, isRequired: boolean = true) {
    this.fields.push(<div key={code} className="form-item form-field-item-direction-col" >
      <label>{label}</label>
      <input
        className="input"
        type='number'
        name={label}
        placeholder={placeholder}
        required={isRequired}
        onChange={(e) => {
          this.answers[code] = e.target.value === ""
            ? ""
            : Number(e.target.value);
        }}
      />
    </div>);

    return this;
  }

  addRadiobox(
    label: string,
    code: string,
    options?: { label: string; val: string }[],
    isRequired: boolean = true,
  ) {
    this.fields.push(
      <div key={code} className="form-item">
        {label && <label>{label}: </label>}

        {options?.map((option, index) => (
          <label
            key={option.val}
            className="form-item form-field-item-direction-row"
          >
            <input
              type="radio"
              name={code}
              value={option.val}
              required={isRequired && index === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  this.answers[code] = option.val;
                }
              }}
            />
            {option.label}
          </label>
        ))}
      </div>,
    );

    return this;
  }

  addCheckbox(
    label: string,
    code: string,
    options?: { label: string; val: string }[],
    isRequired: boolean = true,
  ) {
    this.fields.push(
      <div key={code}>
        {label ?? <label>{label}</label>}
        {options?.map((option) => (
          <label
            key={option.val}
            className="form-item form-field-item-direction-row"
          >
            <input
              type="checkbox"
              name={option.val}
              required={isRequired}
              onChange={(e) => {
                if (!this.answers[code]) {
                  this.answers[code] = [];
                }

                if (e.target.checked) {
                  this.answers[code].push(option.val);
                } else {
                  this.answers[code] = this.answers[code].filter(
                    (val: string) => val !== option.val,
                  );
                }
              }}
            />
            {option.label}
          </label>
        ))}
      </div>,
    );

    return this;
  }

  addDropdown(label: string, code: string,
    options: { label: string, val: any; }[], isRequired: boolean = true) {
    this.fields.push(<div key={code} className='form-item'>
      <label>{label}: </label>
      <select
        className="select"
        key={code}
        name={code}
        required={isRequired}
        defaultValue={"Select"}
        onChange={(e) => {
          this.answers[code] = e.target.value;
        }}
      >
        {/* Empty placeholder option */}
        <option value="Select" disabled hidden>Select </option>
        {options?.map(option => (
          <option
            className='option'
            key={option.val}
            value={option.val}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>);

    return this;
  }

  addDateField(
    label: string,
    code: string,
    isRequired: boolean = true,
    placeholder?: string,
  ) {
    this.fields.push(
      <div key={code} className="flex flex-col gap-1">
        <label>{label}</label>

        <input
          type="date"
          defaultValue={this.answers[code] ?? ""}
          required={isRequired}
          placeholder={placeholder}
          onChange={(e) => {
            this.answers[code] = e.target.value;
          }}
          className="w-full px-3 py-2"
        />
      </div>,
    );

    return this;
  }

  addDateRangeField(label: string, code: string, isRequired: boolean = true) {
    const value = this.answers[code] ?? {
      startDate: "",
      endDate: "",
    };

    this.fields.push(
      <div key={code}>
        <label>{label}</label>

        <div className="grid grid-cols-2 gap-2">
          {/* Start Date */}
          <input
            type="date"
            defaultValue={value.startDate}
            required={isRequired}
            onChange={(e) => {
              const startDate = e.target.value;

              const currentEndDate = this.answers[code]?.endDate ?? "";

              const endDate =
                currentEndDate && currentEndDate >= startDate
                  ? currentEndDate
                  : "";

              this.answers[code] = {
                startDate,
                endDate,
              };
            }}
            className=" w-full px-3 py-2"
          />


          {/* End Date */}
          <input
            type="date"
            defaultValue={value.endDate}
            min={value.startDate || undefined}
            required={isRequired}
            onChange={(e) => {
              const endDate = e.target.value;

              const startDate = this.answers[code]?.startDate ?? "";

              if (startDate && endDate < startDate) {
                return;
              }

              this.answers[code] = {
                startDate,
                endDate,
              };
            }}
            className="w-full px-3 py-2"
          />
        </div>
      </div>,
    );

    return this;
  }

  addDateTimeField(label: string, code: string, isRequired: boolean = true) {
    this.fields.push(
      <div key={code} className="flex flex-col gap-1">
        <label>{label}</label>

        <input
          type="datetime-local"
          defaultValue={this.answers[code] ?? ""}
          required={isRequired}
          onChange={(e) => {
            this.answers[code] = e.target.value;
          }}
          className="w-full px-3 py-2"
        />
      </div>,
    );

    return this;
  }

  private getAnswer() {
    return JSON.stringify(this.answers);
  }

  build(): ReactNode {
    return (
      <form className="form">
        <div className="form-fields">{this.fields.map((field) => field)}</div>
        {/* here we also add banners if u like on other  */}
        <div className="form-footer">
          {this.onCancel !== undefined ? (
            <button
              type="button"
              onClick={() => {
                this.onCancel!(this.getAnswer());
              }}
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
          <button
            type="submit"
            onClick={() => {
              this.onSubmit(this.getAnswer());
            }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
