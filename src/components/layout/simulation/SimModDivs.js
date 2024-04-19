import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

const slideOutTime = 0.5; // in seconds

const RowColSwapContainer = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.isRow ? "row" : "column")};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const SweepSelectorContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-top: 1px solid gray;
    padding-top: 10px;
    margin-top: 10px;
`;

// styled div for the sim module sets y position to tob of div
const SimModDiv = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
    position: relative;
    margin: 10px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    padding: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 25vw;
    height: 92vh;
`;

// styled div for the sim module when it is deleted
const SimModDivAnimated = styled(SimModDiv)`
    resize: horizontal;
    flex-shrink: 0;
    &.slide-out {
        max-width: 0;
        min-width: 0;
        padding: 0;
        margin-left: 0;
        margin-right: 0;
        opacity: 0;
        overflow: hidden;
        transition: min-width ${slideOutTime - 0.05}s ease-out, opacity 0.5s ease-out, padding 0.5s ease-out,
            margin 0.5s ease-out;
    }
`;

// styled div for a small gray number marker in the top left of the container that says what number the module is
const NumberMarker = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    color: gray;
    padding: 10px;
    border-radius: 10px;
    width: 15px;
    text-align: center;
    z-index: 5;
`;

// styled input for editable title field at the top of the container
const TitleInput = styled.input`
    margin: 10px;
    position: absolute;
    top: 0;
    left: 25px;
    width: 50%;
    height: 15px;
    border: none;
    border-bottom: 1px solid gray;
    text-align: left;
    font-size: 1em;
    z-index: 2;
    color: gray;
`;

const ShiftArrow = styled.div`
    position: absolute;
    top: 0;
    margin: 5px;
    padding: 5px;
    border-radius: 500px;
    border: 1px solid gray;
    cursor: pointer;
    background-color: white;
    color: black;
    z-index: 1;
    transition: 0.14s;
    height: 16px;
    &:hover {
        border: 1px solid #bf5700;
        background-color: #bf5700;
        color: white;
    }
`;

const ShiftArrowRight = styled(ShiftArrow)`
    left: calc(50% + 75px);
`;

const ShiftArrowLeft = styled(ShiftArrow)`
    left: calc(50% + 45px);
`;

const ReorderArrows = ({ shiftRight, shiftLeft }) => {
    return (
        <>
            <ShiftArrowLeft onClick={shiftLeft}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </ShiftArrowLeft>
            <ShiftArrowRight onClick={shiftRight}>
                <FontAwesomeIcon icon={faArrowRight} />
            </ShiftArrowRight>
        </>
    );
};

// styled input at top right that is styled the same as the append button
const DeleteButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid black;
    min-width: 50px;
    cursor: pointer;
    background-color: white;
    color: black;

    z-index: 1;

    transition: 0.14s;
    &:hover {
        border: 1px solid #bf5700;
        background-color: #bf5700;
        color: white;
    }
`;

const HideContainer = styled(({ isEnabled, ...rest }) => <div {...rest} />)`
    transition: max-height 0.5s, opacity 0.5s ease-in-out;
    opacity: ${(props) => (props.isEnabled ? "1" : "0.5")};
    max-height: ${(props) => (props.isEnabled ? "1000px" : "20px")};
`;

// styled div to list the selected metrics, text to the left,
const SelectedMetrics = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

// highlighter styled div
const Highlighter = styled.div`
    display: flex;
    height: 25px;
    text-align: center;
    flex-direction: row;
    justify-content: flex;
    align-items: center;
    border-radius: 5px;

    &:hover {
        background-color: #fc4545;
    }
`;

const TextContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
    overflow: hidden;
`;

// component for text highlighter that if the highlight is hovered over it gets a red overlay, and if it is clicked it is removed from a list
function TextOptions({ texts, setTexts }) {
    function removeFunc(text) {
        setTexts(texts.filter((item) => item !== text));
    }

    if (!texts) {
        return null;
    }
    return (
        <TextContainer>
            Metrics: &nbsp;
            {texts.map((text, index) => (
                <Highlighter key={index} onClick={() => removeFunc(text)}>
                    <p>
                        {text}
                        {index !== texts.length - 1 ? ",\u00A0" : ""}
                    </p>
                </Highlighter>
            ))}
        </TextContainer>
    );
}

const TypeToggle = styled(ShiftArrow)`
    left: calc(50% + 105px);
`;

// component for switching between viewTypes
function ViewTypeSwitcher({ viewType, setViewType, updateConfig }) {
    function switchType() {
        setViewType(viewType === "default" ? "sweep" : "default");
        updateConfig("view_type", viewType === "default" ? "sweep" : "default");
    }

    return (
        <TypeToggle onClick={switchType}>
            {viewType === "default" ? <FontAwesomeIcon icon={faToggleOff} /> : <FontAwesomeIcon icon={faToggleOn} />}
        </TypeToggle>
    );
}

export {
    RowColSwapContainer,
    slideOutTime,
    SimModDiv,
    SimModDivAnimated,
    NumberMarker,
    TitleInput,
    DeleteButton,
    SelectedMetrics,
    Highlighter,
    TextOptions,
    HideContainer,
    SweepSelectorContainer,
    ReorderArrows,
    ViewTypeSwitcher,
};
