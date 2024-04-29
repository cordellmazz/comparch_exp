import styled from "styled-components";
import Navigation from "../layout/Navigation";
import MemberSummary from "../layout/misc/MemberSummary";

const WhiteBackground = styled.div`
    background-color: white;
    opacity: 0.85;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
`;

const AboutContainer = styled.div`
    width: 60%;
    height: 100%;
    padding: 5%;
    // center the container
    margin: auto;
`;

// With text wrapping applied
const AboutText = styled.div`
    font-size: 20px;
    text-align: left;
    width: 100%;
    overflow-wrap: break-word; // This line ensures text wrapping

    h1 {
        font-size: 30px;
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 20px;
    }
`;

const BackgroundBanner = styled.img`
    position: absolute;
    top: 0;
    // opacity: 0.3;
    width: 100%;
    height: 400px;
    background-color: #f0f0f0;
    z-index: -2;
    object-fit: cover;
`;

const BackestgroundImage = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("/images/background4.jpeg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -3;
`;

const Page404 = () => {
    const navigate = () => {
        window.location.href = "/";
    };
    return (
        <div>
            <Navigation />
            <BackestgroundImage />
            <BackgroundBanner src={"/images/background1.jpeg"} />
            <WhiteBackground />
            <AboutContainer>
                <AboutText>
                    <h1>404</h1>
                    <p>It appears you've reached a page which doesn't exist.</p>
                    <p>
                        You can click this <a href="/simulate">link</a> to go to the simulation page.
                    </p>
                    <p style={{ marginTop: "120vh" }}>Still here?</p>
                    <p style={{ marginTop: "20vh" }}>I have been looking for someone to give feedback on my poems...</p>
                    <p style={{ marginTop: "10vh" }}>You want to hear them? Really?</p>
                    <p>Yay!</p>
                    <p>Ok this one's about a dog trying to open a jar of pickles. Don't laugh, it's very sad.</p>
                    <p style={{ marginTop: "10vh" }}>Ehem...</p>
                    <p>A dog named Peter Barker</p>
                    <p>Loved pickles far beyond any other</p>
                    <p>Lacto-fermentation, skills proving he was no starter</p>
                    <p>Days pass, his sweet pickled crop</p>
                    <p>Alas, a paw cannot opens jars...</p>
                    <p style={{ marginTop: "20vh" }}>Pretty brutal, right? no? Come on get out of here</p>
                    <p>
                        No? Come on... <a href="/home">Get out</a> of here!
                    </p>
                </AboutText>
            </AboutContainer>
        </div>
    );
};

export default Page404;
