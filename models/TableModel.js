export class TableModel {
    constructor(tableDataModel, pagingModel) {
        this.tableDataModel = tableDataModel;
        this.pagingModel = pagingModel;
    }
}

export class TableDataModel {
    constructor(headers, tableApiModel, rawData) {
        this.headers = headers;
        this.tableApiModel = tableApiModel;
        this.rawData = rawData;
    }
}

export class TableApiModel {
    constructor(url, pageNumKeyword, pageSizeKeyword, totalKeyword, dataKeyword) {
        this.url = url;
        this.pageNumKeyword = pageNumKeyword;
        this.pageSizeKeyword = pageSizeKeyword;
        this.totalKeyword = totalKeyword;
        this.dataKeyword = dataKeyword;
    }
}

export class PagingModel {
    constructor(pageSize, totalItems) {
        this.pageSize = pageSize;
        this.totalItems = totalItems;
    }
}