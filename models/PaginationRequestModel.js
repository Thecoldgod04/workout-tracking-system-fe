export class PaginationRequestModel {
    constructor(sortModel, filterModel) {
        this.sortModel = sortModel;
        this.filterModel = filterModel;
    }
}

export class SortModel {
    constructor(sortDirection, sortField) {
        this.sortDirection = sortDirection;
        this.sortField = sortField;
    }
}

export class FilterModel {
    constructor(){

    }
}