'use strict';

const app = {};

app.namespace = function(namespaceString) {
    let parts = namespaceString.split('.');
    let parent = app;
    let i;

    if (parts[0] === 'app') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
