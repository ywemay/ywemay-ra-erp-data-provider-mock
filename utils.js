export const findById = (scope, id) => scope.find(v => v.id.toString() === id.toString());