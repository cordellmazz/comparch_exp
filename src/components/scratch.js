import CEDropdown from "./CEDropdown";
import CEDiscreteSlider from "./CEDiscreteSlider";
import { simModStructure } from "../layout/simulation/CEConfig";
import { useState } from "react";
import styled from "styled-components";

const ConditionalHaze = styled.div`
    transition: max-height 0.5s, opacity 0.5s ease-in-out;
    opacity: ${(props) => (props.isEnabled ? "1" : "0.5")};
    max-height: ${(props) => (props.isEnabled ? "1000px" : "20px")}; // Adjust max-height as needed
    overflow: hidden;
`;

const SectionTitle = styled.div`
    margin-top: 15px;
    text-align: left;
    font-weight: bold;
`;

const SectionGroup = styled.div`
    margin-bottom: 15px;
`;

const ConditionalWrapper = ({ children, title, initialState = true }) => {
    const [isEnabled, setIsEnabled] = useState(initialState);

    return (
        <ConditionalHaze isEnabled={isEnabled}>
            <label>
                <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => setIsEnabled(!isEnabled)}
                    style={{ marginRight: "10px" }}
                />
                Enable {title}
            </label>
            {children}
        </ConditionalHaze>
    );
};

const renderSimModule = (structure, keyPrefix = "") => {
    console.log("config", structure);
    return Object.entries(structure).map(([key, value]) => {
        const { title, dynamic, type, optional, options } = value;
        const ComponentKey = `${keyPrefix}${key}`;

        let Component;
        if (type === "dropdown") {
            Component = <CEDropdown title={title} options={options} key={ComponentKey} />;
        } else if (type === "dsliders") {
            Component = <CEDiscreteSlider title={title} options={options} key={ComponentKey} />;
        } else if (type === "list" && dynamic) {
            Component = (
                <SectionGroup key={ComponentKey}>
                    <SectionTitle>{title}</SectionTitle>
                    {renderSimModule(options, `${ComponentKey}-`)}
                </SectionGroup>
            );
        }

        return optional ? (
            <ConditionalWrapper title={title} key={ComponentKey}>
                {Component}
            </ConditionalWrapper>
        ) : (
            Component
        );
    });
};

const RecursiveStructure = ({ structure = simModStructure }) => {
    return <div>{renderSimModule(structure)}</div>;
};

export default RecursiveStructure;

/**
 * Simple recursive function to iterate through a configuration object.
 * Specifically targets 'options' for nested dictionary objects, recursively processing them.
 *
 * @param {Object} structureConfig - The configuration object to iterate over.
 * @param {String} [parentKey=""] - The key of the parent object, used for tracking during recursion.
 */
// function simpleIterateConfig(structureConfig, parentKey = "", inputConfig = {}) {
//     console.log(`1. Processing ${parentKey}`, structureConfig);

//     // Iterates through parent object's key-value pairs
//     Object.entries(structureConfig).forEach(([key, value]) => {

//         // Check if the current value is an object, indicating a nested structure
//         if (typeof value === "object" && !Array.isArray(value) && value !== null) {
//             // console.log(`2. Processing ${parentKey}${parentKey ? "." : ""}${key}`, value);

//             // If the key is 'options', it indicates a sub-dictionary that requires recursive processing
//             if (key === "options") {
//                 simpleIterateConfig(value, `${parentKey}${parentKey ? "." : ""}${key}`);
//             } else {
//                 // For other objects, assume they might also have nested 'options' or other objects
//                 // console.log("3. Processing nested object", value);
//                 Object.entries(value).forEach(([subKey, subValue]) => {
//                     // in here goes the check for dynamics and dependents
//                     // if (subKey === "dynamic") {
//                     //     console.log("\n\n\n Dynamic key for ", key, "value", subValue);
//                     // }

//                     if (subKey === "dependent") {
//                         console.log("\n\n\n Dependent key for ", key, "value", subValue);
//                     }

//                     if (subKey === "options" && typeof subValue === "object") {
//                         simpleIterateConfig(subValue, `${parentKey}${parentKey ? "." : ""}${key}`);
//                     }
//                 });
//             }
//         }
//     });
// }

function simpleIterateConfig(structureConfig, inputConfig = {}, path = "") {
    // Iterates through the structureConfig's key-value pairs
    Object.entries(structureConfig).forEach(([key, value]) => {
        // Update the path for the current level
        const currentPath = path ? `${path}.${key}` : key;

        // Ensure a corresponding structure in inputConfig, initializing with defaults if necessary
        // Note: This is a simplistic initialization; adjust as per your actual requirements
        const pathParts = currentPath.split(".");
        let currentInputConfig = inputConfig;
        for (let part of pathParts) {
            const inputKey = part.toLowerCase(); // Corresponding key in inputConfig
            if (!currentInputConfig[inputKey]) {
                currentInputConfig[inputKey] = {}; // Initialize if not present
            }
            currentInputConfig = currentInputConfig[inputKey]; // Navigate deeper
        }

        if (typeof value === "object" && !Array.isArray(value) && value !== null) {
            if (key === "options") {
                // Directly modify the value at the current path in inputConfig
                simpleIterateConfig(value, inputConfig, currentPath);
            } else {
                // For nested objects, we do the same but ensure to pass the entire structureConfig
                Object.entries(value).forEach(([subKey, subValue]) => {
                    if (subKey === "options" && typeof subValue === "object") {
                        simpleIterateConfig(subValue, inputConfig, `${currentPath}.${subKey}`);
                    }
                });
            }
        }
    });

    // Return the modified inputConfig for the root call
    if (!path) {
        return inputConfig;
    }
}

// Call the function without an initial inputConfig to see it generate an empty config
const initialConfig = simpleIterateConfig(simModStructure);
console.log("Generated Input Config:", initialConfig);

// simpleIterateConfig(simModStructure);

{
    "cpu": {
      "cpu_types": {
        "selected": "in_order_pipeline",
        "test": {
          "selected": 1
        },
        "in_order_pipeline": {
          "selected": "magnitude",
          "magnitude": {
            "enabled": true,
            "selected": 10
          },
          "type": {
            "selected": "fast"
          }
        },
        "out_of_order_pipeline": {
          "selected": 40
        }
      }
    },
    "branch_predictors": {
      "enabled": true,
      "selected": "TWO_BIT_LOCAL"
    },
    "cache": {
      "size": {
        "enabled": true,
        "selected": "sub_size",
        "sub_size": {
          "selected": 10
        },
        "super_size": {
          "selected": 100
        },
        "peas": {
          "selected": 10
        },
        "peas_2": {
          "selected": 10
        }
      },
      "associativity": {
        "selected": 1
      },
      "tag_latency": {
        "selected": 0
      },
      "response_latency": {
        "selected": 0
      },
      "number_of_mshrs": {
        "selected": 0
      },
      "targets_of_mshrs": {
        "selected": 0
      }
    },
    "prefetchers": {
      "enabled": true,
      "selected": "ACCESS_MAP_PATTERN_MATCHING"
    },
    "policies": {
      "replacement_policies": {
        "selected": "BASE"
      },
      "coherence_policies": {
        "selected": "NOT_COHERENT"
      }
    },
    "id": "51rl945r4v6",
    "name": ""
  }