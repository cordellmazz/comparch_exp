// Objects associated with each parameter and if they are optional or not
const ParameterTypes = {
    CPU_TYPES: "dropdown.dsliders", // dropdown means only one option is presented at a time, and .dsliders means that the option will have a discrete (d) slider
    BRANCH_PREDICTORS: "dropdown",
    CACHE: "list.dsliders", // list means all options are presented at once
    PREFETCHERS: "dropdown",
    REPLACEMENT_POLICIES: "dropdown",
    COHERENCE_POLICIES: "dropdown",
};

const ParameterOptional = {
    CPU_TYPES: false,
    BRANCH_PREDICTORS: true,
    CACHE: false,
    PREFETCHERS: true,
    REPLACEMENT_POLICIES: false,
    COHERENCE_POLICIES: false,
};

const CpuTypes = {
    // both of these will need timing slider values
    In_order_pipeline: {
        magnitude: [10, 20, 30],
        type: { fast: "fast", medium: "medium", slow: "slow" },
    },
    Out_of_order_pipeline: [40, 50, 60],
};

const BranchPredictors = {
    TWO_BIT_LOCAL: "2 bit local",
    BTB: "BTB",
    BI_MODE: "Bi mode",
    INDIRECT: "Indirect",
    LOOP_PREDICTOR: "Loop predictor",
    TAGE: "TAGE",
    PERCEPTRON: "Perceptron",
};

// mock nested dictonaries for now
const Cache = {
    Size: [0, 2, 4, 8, 16, 32, 64],
    Associativity: [1, 2, 3, 4, 5],
    Tag_latency: [0, 2, 4, 8, 16, 32, 64],
    Response_latency: [0, 2, 4, 8, 16, 32, 64],
    Number_of_MSHRs: [0, 2, 4, 8, 16, 32, 64],
    Targets_of_MSHRs: [0, 2, 4, 8, 16, 32, 64], // may not be needed
};

const Prefetchers = {
    ACCESS_MAP_PATTERN_MATCHING: "Access map pattern matching",
    ASSOCIATIVE_SET: "Associative set",
    BASE: "Base",
    BOP: "Bop",
    DELTA_CORRELATING_PREDICTION: "Delta correlating prediction",
    INDIRECT_MEMORY: "Indirect memory",
    IRREGULAR_STREAM_BUFFER: "Irregular stream buffer",
    MULTI: "Multi",
    PIF: "PIF",
    QUEUED: "Queued",
    SBOOE: "Sbooe",
    SIGNATURE_PATH: "Signature path",
    SLIM_AMP: "Slim ampm",
    SPATIO_TEMPORAL_MEMORY_STREAMING: "Spatio/temporal memory streaming",
    STRIDE: "Stride",
    TAGGED: "Tagged",
};

const ReplacementPolicies = {
    BASE: "Base",
    BIP: "bip",
    BRRIP: "brrip",
    DUELING: "Dueling",
    FIFO: "FIFO",
    LFU: "LFU",
    LRU: "LRU",
    MRU: "MRU",
    RANDOM: "Random",
    REPLACEABLE_ENTRY: "Replaceable entry",
    SECOND_CHANCE: "Second chance",
    SHIP: "Ship",
    TREE: "Tree",
    WEIGHTED_LRU: "Weighted LRU",
};

const CoherencePolicies = {
    NOT_COHERENT: "Not coherent",
    MESI_2_LEVEL: "MESI 2 level",
    MESI_3_LEVEL: "MESI 3 level",
    MOESI: "MOESI",
};

/**
 * The structure of the simulation module configuration. Determines the layout of the configuration as well as the default config values.
 *
 * Ways to define structure:
 * 1. Each key-value pair represents a section of the configuration. They all should have a title (title), input type (type), and a set of options (options).
 * 2. Inputs that are dynamic, as in there are additional inputs determined by the selection of a previous input, should have the dynamic key (dynamic) set to true.
 *    What inputs are shown are shown inside the options of the dependent key-value pair.
 * 3. Dynamic inputs should have a set of dependent options (options) that are only shown when the input is selected.
 * 4. If there are inputs that should be shown underneath an input no matter what, do not specify it as dependent. This can be done by either leaving out the dependent key or setting it to false.
 * 5. If an input is optional, set the optional key to true. This will add an enabled key to the input configuration.
 * 6. The input types for the options are dropdown and dsliders. This value is used in the ConfigInput component.
 */
// const simModStructure = {
//     CPU: {
//         title: "CPU",
//         options: {
//             CPU_TYPES: {
//                 title: "CPU Types",
//                 dynamic: true,
//                 type: "dropdown",
//                 options: {
//                     TEST: {
//                         title: "Test",
//                         // dependent: false, // should be inferred
//                         type: "dsliders",
//                         options: [1, 2, 3],
//                     },
//                     IN_ORDER_PIPELINE: {
//                         title: "In Order Pipeline",
//                         dependent: true,
//                         dynamic: true,
//                         type: "dropdown",
//                         options: {
//                             MAGNITUDE: {
//                                 title: "Magnitude",
//                                 type: "dsliders",
//                                 dependent: true,
//                                 optional: true,
//                                 options: CpuTypes.In_order_pipeline.magnitude,
//                             },
//                             TYPE: {
//                                 title: "Type",
//                                 type: "dropdown",
//                                 dependent: true,
//                                 options: CpuTypes.In_order_pipeline.type,
//                             },
//                         },
//                     },
//                     OUT_OF_ORDER_PIPELINE: {
//                         title: "Out of Order Pipeline",
//                         dependent: true,
//                         type: "dsliders",
//                         options: CpuTypes.Out_of_order_pipeline,
//                     },
//                 },
//             },
//         },
//     },
//     BRANCH_PREDICTORS: {
//         title: "Branch Predictors",
//         type: "dropdown",
//         optional: true,
//         options: BranchPredictors,
//     },
//     CACHE: {
//         title: "Cache",
//         options: {
//             SIZE: {
//                 title: "Size",
//                 dynamic: true,
//                 optional: true,
//                 type: "dropdown",
//                 options: {
//                     SUB_SIZE: {
//                         title: "sub size",
//                         type: "dropdown",
//                         dependent: true,
//                         options: [10, 20, 30, 40],
//                     },
//                     SUPER_SIZE: {
//                         title: "super size",
//                         type: "dropdown",
//                         dependent: true,
//                         options: [100, 200, 300, 400],
//                     },
//                     PEAS: {
//                         title: "peas",
//                         type: "dropdown",
//                         // dependent: false,
//                         options: [10, 20, 30, 40],
//                     },
//                     PEAS_2: {
//                         title: "peas 2",
//                         type: "dropdown",
//                         // dependent: false,
//                         options: [10, 20, 30, 40],
//                     },
//                 },
//             },
//             ASSOCIATIVITY: {
//                 title: "Associativity",
//                 type: "dsliders",
//                 options: Cache.Associativity,
//             },
//             TAG_LATENCY: {
//                 title: "Tag Latency",
//                 type: "dsliders",
//                 options: Cache.Tag_latency,
//             },
//             RESPONSE_LATENCY: {
//                 title: "Response Latency",
//                 type: "dsliders",
//                 options: Cache.Response_latency,
//             },
//             NUMBER_OF_MSHRS: {
//                 title: "Number of MSHRs",
//                 type: "dsliders",
//                 options: Cache.Number_of_MSHRs,
//             },
//             TARGETS_OF_MSHRS: {
//                 title: "Targets of MSHRs",
//                 type: "dsliders",
//                 options: Cache.Targets_of_MSHRs,
//             },
//         },
//     },
//     PREFETCHERS: {
//         title: "Prefetchers",
//         type: "dropdown",
//         optional: true,
//         options: Prefetchers,
//     },
//     POLICIES: {
//         title: "Policies",
//         options: {
//             REPLACEMENT_POLICIES: {
//                 title: "Replacement Policies",
//                 type: "dropdown",
//                 options: ReplacementPolicies,
//             },
//             COHERENCE_POLICIES: {
//                 title: "Coherence Policies",
//                 type: "dropdown",
//                 options: CoherencePolicies,
//             },
//         },
//     },
// };

// BaseO3CPU has all params
// l1d_size = {"8192", "32768", "131072"}
// l2_size = {"131072", "524288", "2097152"}
// branch_pred_type = {'LocalBP', 'MultiperspectivePerceptron8KB', 'TAGE'}
// num_rob_entries = {'32', '128',  '512'}
// num_phys_int_regs = {'128', '256', '512'}
// fu_list_0_count = {'1', '4', '16'}
// fu_list_1_count = {'1', '4', '16'}

// BaseMinorCPU has all params
// l1d_size = {'32768', '1024', '2048', '131072', '8192', '65536', '4096'}
// l2_size = {"16384", "32768", "65536", "131072", "524288", "1048576", "2097152"}
// branch_pred_type = {'BiModeBP', 'LocalBP', 'MultiperspectivePerceptron8KB', 'TAGE'}

const simModStructure = {
    CORE_TYPE: {
        title: "Core Type",
        type: "dropdown",
        description: "The type of core to simulate",
        dynamic: true,
        options: {
            BASE_O3_CPU: {
                title: "Base O3 CPU",
                dependent: true,
                options: {
                    L1D_SIZE: {
                        title: "L1D Size",
                        description: "the capacity of the L1 Data Cache",
                        type: "dsliders",
                        options: ["8192", "32768", "131072"],
                    },
                    L2_SIZE: {
                        title: "L2 Size",
                        type: "dsliders",
                        description: "the capacity of the L2 Cache",
                        options: ["131072", "524288", "2097152"],
                    },
                    BRANCH_PRED_TYPE: {
                        title: "Branch Predictor Type",
                        type: "dropdown",
                        description:
                            "different implementations for branch prediction, modern processors use Perceptron and or TAGE based predictors",
                        options: ["LocalBP", "MultiperspectivePerceptron8KB", "TAGE"],
                    },
                    NUM_ROB_ENTRIES: {
                        title: "Number of ROB Entries",
                        type: "dsliders",
                        description:
                            "reorder buffer size, more entries allow an out of order processor to execute more instructions in parallel (out of order)",
                        options: ["32", "128", "512"],
                    },
                    NUM_PHYS_INT_REGS: {
                        title: "Number of Physical Integer Registers",
                        type: "dsliders",
                        description:
                            "More physical registers allow the processor to keep more data closer at hand and reduce spills; also improve instruction scheduling efficiency",
                        options: ["128", "256", "512"],
                    },
                    FU_LIST_0_COUNT: {
                        title: "FU List 0 Count",
                        type: "dsliders",
                        description: "number of ALUs in the pipeline",
                        options: ["1", "4", "16"],
                    },
                    FU_LIST_1_COUNT: {
                        title: "FU List 1 Count",
                        type: "dsliders",
                        description: "number of MUL/DIV Units in the pipeline",
                        options: ["1", "4", "16"],
                    },
                },
            },
            BASE_MINOR_CPU: {
                title: "Base Minor CPU",
                dependent: true,
                options: {
                    L1D_SIZE: {
                        title: "L1D Size",
                        description: "the capacity of the L1 Data Cache",
                        type: "dsliders",
                        options: ["1024", "2048", "4096", "8192", "32768", "65536", "131072"],
                    },
                    L2_SIZE: {
                        title: "L2 Size",
                        description: "the capacity of the L2 Cache",
                        type: "dsliders",
                        options: ["16384", "32768", "65536", "131072", "524288", "1048576", "2097152"],
                    },
                    BRANCH_PRED_TYPE: {
                        title: "Branch Predictor Type",
                        type: "dropdown",
                        description:
                            "different implementations for branch prediction, modern processors use Perceptron and or TAGE based predictors",
                        options: ["BiModeBP", "LocalBP", "MultiperspectivePerceptron8KB", "TAGE"],
                    },
                },
            },
        },
    },
};

// const simModStructure = {
//     CORE_TYPE: {
//         title: "Core Type",
//         type: "dropdown",
//         options: ["BaseO3CPU"],
//     },
//     L1D_SIZE: {
//         title: "L1D Size",
//         type: "dsliders",
//         options: ["8192", "32768", "131072"],
//     },
//     L2_SIZE: {
//         title: "L2 Size",
//         type: "dsliders",
//         options: ["131072", "524288", "2097152"],
//     },
//     BRANCH_PRED_TYPE: {
//         title: "Branch Predictor Type",
//         type: "dropdown",
//         options: ["LocalBP", "MultiperspectivePerceptron8KB", "TAGE"],
//     },
//     NUM_ROB_ENTRIES: {
//         title: "Number of ROB Entries",
//         type: "dsliders",
//         options: ["32", "128", "512"],
//     },
//     NUM_PHYS_INT_REGS: {
//         title: "Number of Physical Integer Registers",
//         type: "dsliders",
//         options: ["128", "256", "512"],
//     },
//     FU_LIST_0_COUNT: {
//         title: "FU List 0 Count",
//         type: "dsliders",
//         options: ["1", "4", "16"],
//     },
//     FU_LIST_1_COUNT: {
//         title: "FU List 1 Count",
//         type: "dsliders",
//         options: ["1", "4", "16"],
//     },
// };

const metricOptions = {
    GROUPS: {
        title: "Metric Options Groups:",
        dynamic: true,
        type: "dropdown",
        options: {
            // SIMULATION: {
            //     title: "Simulation metrics",
            //     type: "dropdown",
            //     dependent: true,
            //     options: ["simSeconds", "simTicks", "finalTick", "simFreq", "hostSeconds", "hostTickRate"],
            // },
            L1: {
                title: "L1 parameters",
                type: "dropdown",
                dependent: true,
                options: [
                    "L1doverallHits",
                    "L1doverallMisses",
                    "L1doverallAccesses",
                    "L1doverallMissRate",
                    "L1doverallMshrHits",
                    "L1doverallMshrMisses",
                    "L1doverallMshrMissRate",
                    "L1dreplacements",
                    "L1ioverallHits",
                    "L1ioverallAccesses",
                ],
            },
            L2: {
                title: "L2 parameters",
                type: "dropdown",
                dependent: true,
                options: [
                    "L2overallHits",
                    "L2overallMisses",
                    "L2overallAccesses",
                    "L2overallMissRate",
                    "L2overallMshrHits",
                    "L2overallMshrMisses",
                    "L2overallMshrMissRate",
                    "L2replacements",
                ],
            },
            MEMORY: {
                title: "Memory parameters",
                type: "dropdown",
                dependent: true,
                options: [
                    "ctrl0readReqs",
                    "ctrl0writeReqs",
                    "ctrl0totQLat",
                    "ctrl0totBusLat",
                    "ctrl0totMemAccLat",
                    "ctrl0avgQLat",
                    "ctrl0avgBusLat",
                    "ctrl0avgMemAccLat",
                    "ctrl0readRowHits",
                    "ctrl0writeRowHits",
                    "ctrl0readRowHitRate",
                    "ctrl0writeRowHitRate",
                    "ctrl0pageHitRate",
                    "ctrl1readReqs",
                    "ctrl1writeReqs",
                    "ctrl1totQLat",
                    "ctrl1totBusLat",
                    "ctrl1totMemAccLat",
                    "ctrl1avgQLat",
                    "ctrl1avgBusLat",
                    "ctrl1avgMemAccLat",
                    "ctrl1readRowHits",
                    "ctrl1writeRowHits",
                    "ctrl1readRowHitRate",
                    "ctrl1writeRowHitRate",
                    "ctrl1pageHitRate",
                ],
            },
            PROCESSOR: {
                title: "Processor parameters",
                type: "dropdown",
                dependent: true,
                options: ["numCycles", "cpi", "ipc"],
            },
            BRANCH_PREDICTION: {
                title: "Branch Prediction parameters",
                type: "dropdown",
                dependent: true,
                options: [
                    "lookups_0",
                    "squashes_0",
                    "corrected_0",
                    "committed_0",
                    "mispredicted_0",
                    "targetWrong_0",
                    "condPredicted",
                    "condPredictedTaken",
                    "condIncorrect",
                    "condIncorrectTaken",
                    "predTakenBTBMiss",
                    "BTBHits",
                    "BTBHitRate",
                    "BTBMisses",
                    "BTBMissRate",
                    "BTBWriteAccesses",
                    "indirectHits",
                    "indirectMisses",
                    "indirectMispredicted",
                    "indirectLookups",
                ],
            },
            CONSTRUCTION_TYPES: {
                title: "Construction types",
                type: "dropdown",
                dependent: true,
                options: ["numInsts", "numOps", "No_Op_Class", "IntAlu"],
            },
            TLB: {
                title: "Translation Look-aside Buffer",
                type: "dropdown",
                dependent: true,
                options: ["rdAccesses", "wrAccesses", "wrMisses", "rdMisses"],
            },
            LSQ: {
                title: "Load Store Queue",
                type: "dropdown",
                dependent: true,
                options: [
                    "forwLoads",
                    "squashedLoads",
                    "ignoredResponses",
                    "squashedStores",
                    "memOrderViolations",
                    "rescheduledLoads",
                    "blockedByCache",
                ],
            },

            RENAMING: {
                title: "Renaming",
                type: "dropdown",
                dependent: true,
                options: [
                    "squashCycles",
                    "idleCycles",
                    "blockCycles",
                    "serializeStallCycles",
                    "runCycles",
                    "unblockCycles",
                    "renamedInsts",
                    "ROBFullEvents",
                    "IQFullEvents",
                    "LQFullEvents",
                    "SQFullEvents",
                    "RenamedOperands",
                    "robReads",
                    "robWrites",
                ],
            },
        },
    },
};

/**
 * Gets the depth of a JSON object.
 *
 * @param {Object} obj The object to get the depth of.
 * @returns {Number} The depth of the object.
 */
function getDepth(obj) {
    let depth = 0;
    if (obj !== null && typeof obj === "object") {
        Object.values(obj).forEach((val) => {
            if (typeof val === "object") {
                const depthCount = getDepth(val);
                if (depthCount > depth) {
                    depth = depthCount;
                }
            }
        });
    }
    return depth + 1;
}

/**
 * Gets the dependent options for a given set of options.
 *
 * @param {Object} options The options to check for dependent keys.
 * @returns {Object} The dependent options for the given set of options.
 */
function getDependentOptions(options) {
    return Object.entries(options).reduce((acc, [optionKey, optionValue]) => {
        if (optionValue.dependent) {
            acc[optionKey] = optionKey;
        }
        return acc;
    }, {});
}

/**
 * Adds a value to a configuration object at a specified path.
 *
 * @param {Object} config The configuration object to modify.
 * @param {String} path The path to the value to modify, represented as a dot-separated string.
 * @param {Object} value The value to add to the configuration object.
 * @returns {Object} The modified configuration object with the value added.
 * */
function addToConfig(config, path, value) {
    const keys = path.split(".");
    let current = config;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        // if it doesn't exist or isn't an object, create an object
        if (!(key in current) || typeof current[key] !== "object") {
            current[key] = {};
        }

        current = current[key];
    }

    // update value at final key by adding the value
    current[keys[keys.length - 1]] = { ...current[keys[keys.length - 1]], ...value };

    return config;
}

/**
 * Adds "selected" keys to sections marked as dynamic in the configuration structure.
 * Traverses the structure configuration, reflecting the structure in the input configuration
 * and adding "selected" to dynamic parts.
 *
 * @param {Object} structureConfig The base structure configuration to traverse.
 * @param {Object} inputConfig The input configuration to modify, defaulting to an empty object.
 * @param {String} path The current traversal path, defaulting to an empty string.
 * @returns {Object} The modified input configuration with "selected" keys added.
 */
function processConfig(structureConfig, inputConfig = {}, path = "") {
    // For each key-value pair in the structure configuration
    Object.entries(structureConfig).forEach(([key, value]) => {
        // Get the current path
        const currentPath = (path ? `${path}.${key}` : key).toLowerCase();

        if (value.optional) {
            // add the enabled key to the input configuration set to default true
            inputConfig = addToConfig(inputConfig, currentPath, { enabled: true });
        }

        // if the current value has a dynamic key, add a selected key to the input configuration
        if (value.dynamic) {
            // set select key to the first dependent key in the options object
            const dependentOptions = getDependentOptions(value.options);
            const dependentOptionsKeys = Object.keys(dependentOptions);

            // important to note that when determing which input to show in recursive config input we will need to cast this to upper case
            const firstDepdendentOptionKey = dependentOptionsKeys[0].toLowerCase();
            inputConfig = addToConfig(inputConfig, currentPath, { selected: firstDepdendentOptionKey });

            // iterate through all options
            Object.entries(value.options).forEach(([optionKey, optionValue]) => {
                // inputConfig[currentPath][optionKey.toLowerCase()] = {}; // what was this for?

                // if the depth of the value's options is greater than 1, call process config:
                if (getDepth(value.options) > 1) {
                    processConfig(value.options, inputConfig, currentPath);
                }
            });
        } else {
            // current value is not dynamic so its structure is static, add a selected key and set it to the first option
            if (getDepth(value.options) > 1) {
                processConfig(value.options, inputConfig, currentPath);
            } else {
                // options is depth 1 so it the recursive function ends by adding the selected key
                let selectedValue;
                // We expect two types of options: an array of numbers or an object with key-values (enum)
                if (Array.isArray(value.options)) {
                    // if number array, select the first value
                    selectedValue = value.options[0];
                } else {
                    // if object, select the first key
                    selectedValue = Object.keys(value.options)[0];
                }
                inputConfig = addToConfig(inputConfig, currentPath, { selected: selectedValue });
            }
        }
    });

    return inputConfig;
}

/**
 * Gets or creates a configuration path within the input configuration.
 * This function ensures that a path exists in the input configuration by navigating to it,
 * or creating it if it does not already exist.
 *
 * @param {Object} config The input configuration to navigate or modify.
 * @param {String} path The path to get or create, represented as a dot-separated string.
 * @returns {Object} The reference to the final location within the input configuration.
 */
function getOrCreateConfigPath(config, path) {
    const pathSegments = path.toLowerCase().split(".");
    let currentSegment = config;

    pathSegments.forEach((segment) => {
        if (!currentSegment[segment]) {
            currentSegment[segment] = {};
        }
        currentSegment = currentSegment[segment];
    });

    return currentSegment;
}

// function findSelected(obj, prevKey = "") {
//     let retDict = {}; // dict of all selected values with their keys

//     // for each key-value pair in the object
//     Object.entries(obj).forEach(([key, value]) => {
//         if (typeof value === "object" && !value.selected) {
//             // if current value is an object and does nto have a selected key, call findDeepestSelected
//             retDict = { ...retDict, ...findDeepestSelected(value, key) };
//         } else {
//             if (typeof value === "object") {
//                 // if the value of the object at the selected key is an object, call findDeepestSelected
//                 retDict = { ...retDict, ...findDeepestSelected(value, key) };
//             } else {
//                 // if there is no object at the selected key, return the value of selected
//                 // if the object is enabled or does not have an enabled key, add it to the return dictionary
//                 if (obj.enabled === undefined || obj.enabled) {
//                     retDict[prevKey] = value;
//                 }
//             }
//         }
//     });
//     return retDict;
// }

function findSelected(obj, prevKey = "") {
    let retDict = {};
    // if the object has a selected key call find selected on the value of the selected key
    if (obj.selected) {
        if (typeof obj.selected !== "number") {
            if (obj[obj.selected] === undefined && obj[obj.selected.toLowerCase()] === undefined) {
                retDict[prevKey] = obj.selected;
            } else {
                retDict = { ...retDict, ...findSelected(obj[obj.selected.toLowerCase()], obj.selected) };
            }
        } else {
            retDict[prevKey] = obj.selected;
        }
    } else {
        // if the object does not have a selected key, call findSelected on all values
        Object.entries(obj).forEach(([key, value]) => {
            retDict = { ...retDict, ...findSelected(value, key) };
        });
    }

    return retDict;
}

const DefaultConfig = processConfig(simModStructure);
// store default config in local storage
if (localStorage.getItem("defaultConfig") === null) {
    localStorage.setItem("defaultConfig", JSON.stringify(DefaultConfig));
    // clear local configs to reset the simulation
    localStorage.removeItem("configs");
} else {
    /// check if there are any differences between the default config and the stored default config
    const storedDefaultConfig = JSON.parse(localStorage.getItem("defaultConfig"));
    if (JSON.stringify(DefaultConfig) !== JSON.stringify(storedDefaultConfig)) {
        localStorage.setItem("defaultConfig", JSON.stringify(DefaultConfig));
        // clear local configs to reset the simulation
        localStorage.removeItem("configs");
    }
}
// console.log("Updated Input Configuration with Dynamic Selections:", DefaultConfig);

const DefaultMetricsConfig = processConfig(metricOptions);

/**
 * l1d_size
 * l1i_size
 * l2_size
 * memory_type
 * memory_size
 * cpu_type
 * isa
 * num_cores
 * board_clk_freq
 */

export {
    ParameterTypes,
    ParameterOptional,
    CpuTypes,
    BranchPredictors,
    Cache,
    Prefetchers,
    ReplacementPolicies,
    CoherencePolicies,
    DefaultConfig,
    DefaultMetricsConfig,
    simModStructure,
    metricOptions,
    findSelected,
};
