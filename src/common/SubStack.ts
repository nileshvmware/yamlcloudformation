export namespace SubStack {
  export interface ParameterReferenceable {
    parameterName: string;
    hasDefault: boolean;
  }

  export interface ParameterReferenceablesMap {
    [templateUrl: string]: ParameterReferenceable[];
  }

  export interface Definitions {
    outputs: string[];
    parameters: ParameterReferenceablesMap;
  }

  export function flattenDefinitions(allReferenceables: Definitions[]): Definitions {
    const resultantReferenceables: Definitions = {
      outputs: [],
      parameters: {},
    };
    allReferenceables.forEach((referenceable) => {
      resultantReferenceables.outputs = [
        ...resultantReferenceables.outputs,
        ...referenceable.outputs,
      ];
      resultantReferenceables.parameters = SubStack.flattenParameterReferenceablesMapsMaps([
        resultantReferenceables.parameters,
        referenceable.parameters,
      ]);
    });
    return resultantReferenceables;
  }

  export function flattenParameterReferenceablesMapsMaps(allParameterReferenceablesMaps: ParameterReferenceablesMap[]): ParameterReferenceablesMap {
    const referenceablesMap = {};
    allParameterReferenceablesMaps.forEach((map) => {
      Object.keys(map).forEach((templateUrl) => {
        const existingReferenceables = referenceablesMap[templateUrl];
        if (existingReferenceables) {
          referenceablesMap[templateUrl] = [
            ...existingReferenceables,
            ...map[templateUrl],
          ];
        } else {
          referenceablesMap[templateUrl] = map[templateUrl];
        }
      });
    });
    return referenceablesMap;
  }
}
