import {LoadOptions} from 'devextreme/data/load_options';

export interface DxLoadOptions extends LoadOptions {
    select?: string | string[];
    filter?: DxFilterExpression;
    expand?: string | string[];
    sort?: string | string[] | DxSortExpression[];
}

export type DxFilter = Array<string | number | DxFilterOperator>;
export type DxFilterOperator = '=' | '<>' | '>' | '>=' | '<' | '<=' | 'startswith' | 'endswith' | 'contains'| 'notcontains';
export type DxBooleanOperator = 'and' | 'or';
export type DxFilterExpression = DxFilter | Array<DxFilter | DxBooleanOperator | DxFilterExpression>;
export interface DxSortExpression {
    selector: string;
    desc: boolean;
}
