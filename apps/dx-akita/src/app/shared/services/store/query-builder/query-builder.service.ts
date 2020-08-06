import {LoadOptions} from 'devextreme/data/load_options';
import {
    CondOperator,
    CreateQueryParams,
    QueryJoin,
    QuerySort,
    RequestQueryBuilder,
    SCondition, SFields
} from '@nestjsx/crud-request';
import {DxLoadOptions} from './query-builder.model';

export class QueryBuilder {

    private static readonly DevExtremeToNestConditionOperator = {
        '=': CondOperator.EQUALS,
        '<>': CondOperator.NOT_EQUALS,
        '>': CondOperator.GREATER_THAN,
        '>=': CondOperator.GREATER_THAN_EQUALS,
        '<': CondOperator.LOWER_THAN,
        '<=': CondOperator.LOWER_THAN_EQUALS,
        'startswith': CondOperator.STARTS,
        'endswith': CondOperator.ENDS,
        'contains': CondOperator.CONTAINS,
        'notcontains': CondOperator.EXCLUDES
    };
    private static readonly DevExtremeToNestBooleanOperator = {
        and: '$and',
        or: '$or'
    };

    static build(loadOptions: DxLoadOptions): {[key: string]: any} {
        const params: CreateQueryParams = {};

        this.buildFieldsQuery(params, loadOptions);
        this.buildSearchQuery(params, loadOptions);
        this.buildJoinQuery(params, loadOptions);
        this.buildSortQuery(params, loadOptions);
        this.buildLimitQuery(params, loadOptions);
        this.buildOffsetQuery(params, loadOptions);

        return RequestQueryBuilder
            .create(params)
            .queryObject;
    }

    private static buildFieldsQuery(params: CreateQueryParams, loadOptions: LoadOptions) {
        if (!loadOptions.select) {
            return;
        }

        if (typeof loadOptions.select === 'string') {
            params.fields = [loadOptions.select];
        }

        if (Array.isArray(loadOptions.select)) {
            params.fields = loadOptions.select;
        }
    }

    private static buildSearchQuery(params: CreateQueryParams, loadOptions: LoadOptions) {
        if (loadOptions.filter && loadOptions.filter.length) {
            params.search = this.devextremeFiltersToNestSearchCondition(loadOptions.filter);
        }
    }

    private static devextremeFiltersToNestSearchCondition(filterExpression: any[]): SCondition {
        if (typeof filterExpression[0] === 'string') {
            return this.createNestSearchFields(filterExpression);
        }

        const allConditions = [];
        let booleanOperator = this.DevExtremeToNestBooleanOperator['and'];

        for (const filter of filterExpression) {
            if (Array.isArray(filter) && typeof filter[0] === 'string') {
                const searchFields = this.createNestSearchFields(filter);

                allConditions.push(searchFields);
            } else if (typeof filter === 'string') {
                booleanOperator = this.DevExtremeToNestBooleanOperator[filter];
            } else {
                const conditions = this.devextremeFiltersToNestSearchCondition(filter);
                allConditions.push(conditions);
            }
        }

        return {
            [booleanOperator]: allConditions
        };
    }

    private static createNestSearchFields(filterExpression: string[]): SFields {
        const devExtremeOperator = filterExpression[1],
            field = filterExpression[0];
        let value: any = filterExpression[2] !== undefined ? filterExpression[2] : filterExpression[1],
            operator = this.DevExtremeToNestConditionOperator[devExtremeOperator]
                ? this.DevExtremeToNestConditionOperator[devExtremeOperator] : CondOperator.EQUALS;

        if (value === null) {
            operator = (operator === CondOperator.EQUALS) ? CondOperator.IS_NULL : CondOperator.NOT_NULL;
            value = true;
        }

        return {
            [field]: {
                [operator]: value
            }
        };
    }

    private static buildJoinQuery(params: CreateQueryParams, loadOptions: LoadOptions) {
        if (!loadOptions.expand) {
            return;
        }

        if (typeof loadOptions.expand === 'string') {
            params.join = [{
                field: loadOptions.expand
            }];
            return;
        }

        const joins: QueryJoin[] = [];

        for (const field of loadOptions.expand) {
            joins.push({field});
        }

        params.join = joins;
    }

    private static buildSortQuery(params: CreateQueryParams, loadOptions: LoadOptions) {
        if (!loadOptions.sort) {
            return;
        }

        if (typeof loadOptions.sort === 'string') {
            params.sort = [{
                field: loadOptions.sort,
                order: 'ASC'
            }];
            return;
        }

        const sorts: QuerySort[] = [];

        for (const sortExpression of loadOptions.sort) {
            if (typeof sortExpression === 'string') {
                sorts.push({
                    field: sortExpression,
                    order: 'ASC'
                });
            } else {
                sorts.push({
                    field: sortExpression.selector,
                    order: sortExpression.desc ? 'DESC' : 'ASC'
                });
            }
        }

        params.sort = sorts;
    }

    private static buildLimitQuery(params: CreateQueryParams, loadOptions: LoadOptions) {
        if (typeof loadOptions.take !== 'number') {
            return;
        }

        params.limit = loadOptions.take;
    }

    private static buildOffsetQuery(params: CreateQueryParams, loadOptions: LoadOptions) {
        if (typeof loadOptions.skip !== 'number') {
            return;
        }

        params.offset = loadOptions.skip;
    }
}
