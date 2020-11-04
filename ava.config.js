export default {
  extensions: ["ts"],
  require: ["ts-node/register"],
  environmentVariables: {
    TS_NODE_PROJECT: "test/tsconfig.json",
  },
};
