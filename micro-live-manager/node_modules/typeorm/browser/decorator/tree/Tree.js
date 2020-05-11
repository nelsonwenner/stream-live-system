import { getMetadataArgsStorage } from "../../";
/**
 * Marks entity to work like a tree.
 * Tree pattern that will be used for the tree entity should be specified.
 * @TreeParent decorator must be used in tree entities.
 * TreeRepository can be used to manipulate with tree entities.
 */
export function Tree(type) {
    return function (target) {
        getMetadataArgsStorage().trees.push({
            target: target,
            type: type
        });
    };
}

//# sourceMappingURL=Tree.js.map
