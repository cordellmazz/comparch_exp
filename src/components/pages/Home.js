import React, { useEffect, useState } from "react";
import { useDatabase } from "../../context/DatabaseProvider";
import FlexBox from "../layout/structure/FlexBox";
import Navigation from "../layout/Navigation";
import * as CEConfig from "../layout/simulation/CEConfig";

function PageHome() {
    const { loaded, addRun } = useDatabase();

    function wrapper() {
        if (loaded) {
            var runCounter = 0;
            while (runCounter < 10) {
                const run = {
                    ID: "Run" + runCounter,
                    name: "Run" + runCounter,
                    value0: runCounter,
                    value1: runCounter + 1,
                    value2: runCounter * 2,
                    cpuType:
                        CEConfig.CpuTypes[
                            Object.keys(CEConfig.CpuTypes)[runCounter % Object.keys(CEConfig.CpuTypes).length]
                        ],
                    branchPredictor:
                        CEConfig.BranchPredictors[
                            Object.keys(CEConfig.BranchPredictors)[
                                runCounter % Object.keys(CEConfig.BranchPredictors).length
                            ]
                        ],
                    cacheSize:
                        CEConfig.Cache.Size[
                            Object.keys(CEConfig.Cache.Size)[runCounter % Object.keys(CEConfig.Cache.Size).length]
                        ],
                    cacheAssociativity:
                        CEConfig.Cache.Associativity[
                            Object.keys(CEConfig.Cache.Associativity)[
                                runCounter % Object.keys(CEConfig.Cache.Associativity).length
                            ]
                        ],
                    cacheTagLatency:
                        CEConfig.Cache.Tag_latency[
                            Object.keys(CEConfig.Cache.Tag_latency)[
                                runCounter % Object.keys(CEConfig.Cache.Tag_latency).length
                            ]
                        ],
                    cacheDataLatency:
                        CEConfig.Cache.Response_latency[
                            Object.keys(CEConfig.Cache.Response_latency)[
                                runCounter % Object.keys(CEConfig.Cache.Response_latency).length
                            ]
                        ],
                    cacheResponseLatency:
                        CEConfig.Cache.Response_latency[
                            Object.keys(CEConfig.Cache.Response_latency)[
                                runCounter % Object.keys(CEConfig.Cache.Response_latency).length
                            ]
                        ],
                    cacheNumberOfMshrs:
                        CEConfig.Cache.Number_of_MSHRs[
                            Object.keys(CEConfig.Cache.Number_of_MSHRs)[
                                runCounter % Object.keys(CEConfig.Cache.Number_of_MSHRs).length
                            ]
                        ],
                    cacheTargetsOfMshrs:
                        CEConfig.Cache.Targets_of_MSHRs[
                            Object.keys(CEConfig.Cache.Targets_of_MSHRs)[
                                runCounter % Object.keys(CEConfig.Cache.Targets_of_MSHRs).length
                            ]
                        ],
                    prefetcher:
                        CEConfig.Prefetchers[
                            Object.keys(CEConfig.Prefetchers)[runCounter % Object.keys(CEConfig.Prefetchers).length]
                        ],
                    replacementPolicy:
                        CEConfig.ReplacementPolicies[
                            Object.keys(CEConfig.ReplacementPolicies)[
                                runCounter % Object.keys(CEConfig.ReplacementPolicies).length
                            ]
                        ],
                    coherencePolicie:
                        CEConfig.CoherencePolicies[
                            Object.keys(CEConfig.CoherencePolicies)[
                                runCounter % Object.keys(CEConfig.CoherencePolicies).length
                            ]
                        ],
                };

                const res = addRun(run);
                console.log(res);
                runCounter++;
            }
        }
    }

    return (
        <>
            <Navigation />
            <FlexBox>
                <button onClick={wrapper}>Add Runs</button>
            </FlexBox>
        </>
    );
}

export default PageHome;
