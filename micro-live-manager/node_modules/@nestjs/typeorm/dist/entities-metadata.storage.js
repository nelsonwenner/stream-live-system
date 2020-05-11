"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntitiesMetadataStorage {
    static addEntitiesByConnection(connection, entities) {
        const connectionToken = typeof connection === 'string' ? connection : connection.name;
        if (!connectionToken) {
            return;
        }
        let collection = this.storage.get(connectionToken);
        if (!collection) {
            collection = [];
            this.storage.set(connectionToken, collection);
        }
        entities.forEach(entity => {
            if (collection.includes(entity)) {
                return;
            }
            collection.push(entity);
        });
    }
    static getEntitiesByConnection(connection) {
        const connectionToken = typeof connection === 'string' ? connection : connection.name;
        if (!connectionToken) {
            return [];
        }
        return this.storage.get(connectionToken) || [];
    }
}
exports.EntitiesMetadataStorage = EntitiesMetadataStorage;
EntitiesMetadataStorage.storage = new Map();
