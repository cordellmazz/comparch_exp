import React from "react";
import styled from "styled-components";
import CEButton from "./CEButton";
import CEDropdown from "./CEDropdown";
import { NoteTakingArea } from "../layout/simulation/SimModDivs";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Dialog = styled.div`
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    width: 500px;
`;

const Title = styled.h2`
    margin-top: 0;
`;

const Message = styled.p`
    min-height: 50px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 40px;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px 20px; /* more padding for better appearance */
    border: none;
    border-radius: 5px;
    background-color: #007bff; /* bootstrap primary color for example */
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

// styled component for input field
const Input = styled.input`
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    width: 90%;
`;

const FullWidthTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 200px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    font-size: 16px;
    line-height: 1.5;
`;

const ImportTextArea = ({ importText, setImportText }) => {
    const handleInputChange = (event) => {
        setImportText(event.target.value);
    };

    return (
        <FullWidthTextArea placeholder="Import Sim Set" onChange={handleInputChange}>
            {importText}
        </FullWidthTextArea>
    );
};

const CESaveDialog = ({
    simSetName,
    setSimSetName,
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    importText,
    setImportText,
    importSimSet,
}) => {
    if (!isOpen) return null;

    const handleInputChange = (event) => {
        setSimSetName(event.target.value);
    };

    return (
        <Overlay>
            <Dialog>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <Input type="text" placeholder="simulation set name" onChange={handleInputChange} value={simSetName} />

                <ImportTextArea importText={importText} setImportText={setImportText} />
                <ButtonContainer>
                    <Button onClick={onConfirm}>Save</Button>
                    <Button onClick={importSimSet}>Import</Button>
                    <Button
                        onClick={onCancel}
                        style={{ backgroundColor: "#dc3545", "&:hover": { backgroundColor: "#c82333" } }}
                    >
                        Cancel
                    </Button>
                </ButtonContainer>
            </Dialog>
        </Overlay>
    );
};

export default CESaveDialog;

export const CELoadDialog = ({
    chosenSimSet,
    setChosenSimSet,
    options,
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    deleteSimSet,
    exportSimSet,
}) => {
    if (!isOpen) return null;

    return (
        <Overlay>
            <Dialog>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <CEDropdown options={options} value={chosenSimSet} setValue={setChosenSimSet} width={"250px"} />
                <ButtonContainer>
                    <Button onClick={onConfirm}>Load</Button>
                    <Button onClick={exportSimSet}>Export</Button>
                    <Button onClick={deleteSimSet}>Delete Set</Button>
                    <Button
                        onClick={onCancel}
                        style={{ backgroundColor: "#dc3545", "&:hover": { backgroundColor: "#c82333" } }}
                    >
                        Cancel
                    </Button>
                </ButtonContainer>
            </Dialog>
        </Overlay>
    );
};

export const CEImportDialog = ({ isOpen, onConfirm, onCancel }) => {
    const [importText, setImportText] = React.useState("");

    if (!isOpen) return null;
    return (
        <Overlay>
            <Dialog>
                <Title>Import Simulation Set</Title>
                <Message>Paste the exported data below to import a new set:</Message>

                <NoteTakingArea />
                <ButtonContainer>
                    <Button onClick={onConfirm}>Load</Button>
                    <Button
                        onClick={onCancel}
                        style={{ backgroundColor: "#dc3545", "&:hover": { backgroundColor: "#c82333" } }}
                    >
                        Cancel
                    </Button>
                </ButtonContainer>
            </Dialog>
        </Overlay>
    );
};
