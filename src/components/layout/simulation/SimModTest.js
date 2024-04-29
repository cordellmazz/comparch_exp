import * as CEConfig from "./CEConfig.js";
import React, { useState } from "react";

function createFormConfig(parameterTypes, parameterOptional, specificConfigs) {
    return Object.entries(parameterTypes).map(([key, type]) => {
        let options = [];
        if (type === "dropdown" || type === "dropdown.sliders") {
            options = Object.values(specificConfigs[key]);
        } else if (type === "sliders") {
            options = Array.from(specificConfigs[key].Size); // Assuming slider options are based on size
        }
        return {
            name: key,
            type: type,
            optional: parameterOptional[key],
            options: options,
        };
    });
}

export default function SimModTest({}) {
    const CEParameterTypes = CEConfig.ParameterTypes;
    const CEParameterOptional = CEConfig.ParameterOptional;
    const CECache = CEConfig.Cache;
    const CECpuTypes = CEConfig.CpuTypes;
    const CEBranchPredictors = CEConfig.BranchPredictors;
    const CEPrefetchers = CEConfig.Prefetchers;
    const CEReplacementPolicies = CEConfig.ReplacementPolicies;
    const CECoherencePolicies = CEConfig.CoherencePolicies;
    const specificConfigs = {
        CECache,
        CECpuTypes,
        CEBranchPredictors,
        CEPrefetchers,
        CEReplacementPolicies,
        CECoherencePolicies,
    };
    const config = createFormConfig(CEParameterTypes, CEParameterOptional, specificConfigs);
    // Dynamically initialize state based on config
    const [formData, setFormData] = useState(
        config.reduce((acc, curr) => {
            acc[curr.name] = curr.type === "select" ? curr.options[0] : "";
            return acc;
        }, {})
    );

    // Handle change in input
    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const renderInput = (input) => {
        switch (input.type) {
            case "checkbox":
                return (
                    <input
                        type="checkbox"
                        name={input.name}
                        checked={!!formData[input.name]}
                        onChange={(e) => handleChange(input.name, e.target.checked)}
                    />
                );
            case "dropdown":
            case "dropdown.sliders": // Treat both similarly, but sliders could have additional UI
                return (
                    <select
                        name={input.name}
                        value={formData[input.name]}
                        onChange={(e) => handleChange(input.name, e.target.value)}
                    >
                        {input.options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case "sliders":
                return input.options.map((option, index) => (
                    // Render a slider for each option. This is a simplification.
                    // You may need to use a slider component or HTML range input here.
                    <div key={index}>
                        {option}:{" "}
                        <input
                            type="range"
                            name={`${input.name}_${option}`}
                            min="0"
                            max="10"
                            onChange={(e) => handleChange(`${input.name}_${option}`, e.target.value)}
                        />
                    </div>
                ));
            default:
                return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            {config.map((input) => (
                <div key={input.name}>
                    <label>{input.name}:</label>
                    {renderInput(input)}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}
