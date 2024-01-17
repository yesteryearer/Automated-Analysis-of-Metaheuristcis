function processExperimentTable(container: { experimentTable: any }): string[][] {
    const data = container.experimentTable;

    if (!Array.isArray(data)) {
        throw new Error("experimentTable must be an array.");
    }

    for (const item of data) {
        if (!Array.isArray(item)) {
        throw new Error("Each item in the experimentTable must also be an array.");
        }

        for (const subItem of item) {
        if (typeof subItem !== 'string') {
            throw new Error("Each item in the sub-arrays of experimentTable must be a string.");
        }
        }
    }

    return data as string[][];
}

export default processExperimentTable;