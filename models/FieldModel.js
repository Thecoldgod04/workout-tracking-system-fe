export class FieldModel {
    constructor(name, label, type, required, initialValue, data) {
        this.name = name;
        this.label = label
        this.type = type;
        this.required = required;
        this.initialValue = initialValue;
        this.data = data;
    }
}