// This is the config that will be loaded as the default simulation config for the simulation page based off of CEConfig
// for example CPU_TYPE is In_order_pipeline, Cache has a size of 512, and so on
import * as CEConfig from "./CEConfig.js";

var DefaultConfig = {
    CPU_TYPE: CEConfig.CpuTypes.In_order_pipeline.Type,
    BRANCH_PREDICTOR: CEConfig.BranchPredictors.TWO_BIT_LOCAL,
    CACHE: {
        SIZE: [...CEConfig.Cache.Size][0],
        ASSOCIATIVITY: [...CEConfig.Cache.Associativity][0],
        TAG_LATENCY: [...CEConfig.Cache.Tag_latency][0],
        DATA_LATENCY: [...CEConfig.Cache.Response_latency][0],
        RESPONSE_LATENCY: [...CEConfig.Cache.Response_latency][0],
        NUMBER_OF_MSHRS: [...CEConfig.Cache.Number_of_MSHRs][0],
        TARGETS_OF_MSHRS: [...CEConfig.Cache.Targets_of_MSHRs][0],
    },
    PREFETCHER: CEConfig.Prefetchers.BASE,
    REPLACEMENT_POLICIE: CEConfig.ReplacementPolicies.BASE,
    COHERENCE_POLICIE: CEConfig.CoherencePolicies.MSI,
};

export default DefaultConfig;
