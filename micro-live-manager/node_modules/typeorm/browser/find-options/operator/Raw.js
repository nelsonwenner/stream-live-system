import { FindOperator } from "../FindOperator";
/**
 * Find Options Operator.
 * Example: { someField: Raw([...]) }
 */
export function Raw(value) {
    return new FindOperator("raw", value, false);
}

//# sourceMappingURL=Raw.js.map
