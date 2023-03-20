export const findById = (resources, id) => resources.find((r) => r.id === id);

// upsert is a common name meaning updating and insert
export const upsert = (resources, resource) => {
  const index = resources.findIndex((p) => p.id === resource.id);
  if (resource.id && index !== -1) {
    resources[index] = resource;
  } else {
    resources.push(resource);
  }
};

export const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    resource[child].push(childId);
  };
};
