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

// Possible Values for each parameter
const CpuTypes = {
    // both of these will need timing slider values
    In_order_pipeline: {
        Type: "In_order_pipeline",
        Value: new Set([10, 20, 30]),
    },
    Out_of_order_pipeline: {
        Type: "Out_of_order_pipeline",
        Value: new Set([40, 50, 60]),
    },
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

const DefaultConfig = {
    cpuType: CpuTypes.In_order_pipeline.Type,
    branchPredictor: BranchPredictors.TWO_BIT_LOCAL,
    cache: {
        size: [...Cache.Size][0],
        associativity: [...Cache.Associativity][0],
        tagLatency: [...Cache.Tag_latency][0],
        dataLatency: [...Cache.Response_latency][0],
        responseLatency: [...Cache.Response_latency][0],
        numberOfMshrs: [...Cache.Number_of_MSHRs][0],
        targetsOfMshrs: [...Cache.Targets_of_MSHRs][0],
    },
    prefetecher: Prefetchers.BASE,
    replacementPolicy: ReplacementPolicies.BASE,
    coherencePolicy: CoherencePolicies.NOT_COHERENT,
};

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
};
