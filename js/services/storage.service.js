import { utilService } from "./util.service.js";
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    saveAll,
};

// refer to query(entityType)
// function loadFromStorage(key) {
//     let data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : undefined;
// }

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [];
    return Promise.resolve(entities);
}

// refer to saveAll
// function saveToStorage(key, value) {
//     localStorage.setItem(key, JSON.stringify(value) || null);
// }



function saveAll(entityType, newEntities) {
    _save(entityType, newEntities);
    return Promise.resolve(newEntities);
}

function get(entityType, entityId) {
    return query(entityType).then((entities) =>
        entities.find((entity) => entity.id === entityId)
    );
}

function post(entityType, newEntity) {
    newEntity.id = utilService.makeId();
    return query(entityType).then((entities) => {
        entities.push(newEntity);
        _save(entityType, entities);
        return newEntity;
    });
}

function postMany(entityType, newEntities) {
    return query(entityType).then((entities) => {
        entities.push(...newEntities);
        _save(entityType, entities);
        return entities;
    });
}

function put(entityType, updatedEntity) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex(
            (entity) => entity.id === updatedEntity.id
        );
        entities.splice(idx, 1, updatedEntity);
        _save(entityType, entities);
        return updatedEntity;
    });
}

function remove(entityType, entityId) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity.id === entityId);
        entities.splice(idx, 1);
        _save(entityType, entities);
    });
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}
