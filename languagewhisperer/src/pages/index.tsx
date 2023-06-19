/* eslint-disable @next/next/no-img-element */
import LanguageMenu from "@/components/DropdownMenu";
import { FileUpload } from "@/components/FileUpload";
import {
  setTranslationAudio,
  setCaption,
  setTranslation,
  useWhispererDispatch,
  useWhispererState,
} from "@/providers/WhispererProvider";
import { getImageUrl } from "@/utils/getImageURL";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import Head from "next/head";
import { FC, useCallback, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const StyledTitle = styled(Typography)(() => ({
  maxWidth: "100%",
  margin: "auto",
}));
const StyledStack = styled(Stack)({
  flexDirection: "column",
  maxWidth: "50em",
  margin: "auto",
  marginTop: "2rem",
  alignItems: "center",
  justifyContent: "start",
  spacing: "1em",
  height: "100vh",
  gap: "2rem",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "600px",
  gap: "1rem",
});

const Home: FC = () => {
  const { uploadedFile, caption, language, translation, audio, wikiDic } = useWhispererState();
  const dispatch = useWhispererDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (uploadedFile) {
      setImageUrl(getImageUrl(uploadedFile));
    }
  }, [uploadedFile]);

  const onGenerateCaption = useCallback(() => {
    setLoading(true);
    fetch("/api/generate-caption", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ image: uploadedFile }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCaption(dispatch, data);
        setLoading(false);
      });
  }, [uploadedFile]);

  const onTranslateCaption = useCallback(() => {
    setLoading(true);
    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ caption: caption, language: language }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTranslation(dispatch, data);
        setLoading(false);
      });
  }, [uploadedFile, language, caption]);

  const onGenerateAudio = useCallback((text: string) => {
    setLoading(true);
    fetch("/api/generate-audio", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ caption: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTranslationAudio(dispatch, data);
        setLoading(false);
      });
  }, []);

  const onGenerateGrammarly = useCallback(() => {
    setLoading(true);
    fetch("/api/generate-etymology", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ translation: translation }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTranslationAudio(dispatch, data);
        setLoading(false);
      });
  }, [uploadedFile]);
  return (
    <>
      <Head>
        <title>Language Whisperer</title>
        <meta name="description" content="Generative AI powered app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Page Title */}
      <StyledStack>
        <Stack mb={4}>
          <StyledTitle variant="h4">Language Whisperer</StyledTitle>
          <StyledTitle>Facilitate your language learning with Transformers!</StyledTitle>
        </Stack>
        {/* Page Image upload */}
        <FileUpload />
        {/* Page Image preview if one has been uploaded */}
        {/* A button next to the image name that says Describe Image*/}
        {imageUrl && (
          <StyledBox>
            <img alt="file upload" src={imageUrl} style={{ height: "inherit", maxWidth: "70%", margin: "auto" }} />
            {!caption && (
              <Button variant="outlined" onClick={onGenerateCaption} style={{ margin: "auto" }} disabled={loading}>
                Generate Caption
              </Button>
            )}
          </StyledBox>
        )}
        {/* Image description or caption */}
        {caption && (
          <StyledBox>
            <Typography variant="h5">Image Description</Typography>
            {/*  TO DO: A button next to the image description that says Play Audio*/}
            <Typography variant="body1">{caption}</Typography>
          </StyledBox>
        )}
        {caption && (
          <StyledBox>
            <Stack style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem" }}>
              {/* A drop down to chose the language from*/}
              <LanguageMenu />
              {/* A button next to the image description that says Translate*/}
              <Button
                variant="outlined"
                onClick={onTranslateCaption}
                style={{ margin: "auto" }}
                disabled={!language || loading}>
                Translate
              </Button>
            </Stack>
          </StyledBox>
        )}
        {/* Image's caption Translation */}
        {translation && (
          <StyledBox>
            <Typography variant="h5">Description Translation</Typography>
            <Typography variant="body1">{translation}</Typography>
          </StyledBox>
        )}
        {/* A button next to the image Translation that says Grammarly*/}
        {translation && (
          <StyledBox>
            <Stack style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem" }}>
              {/* A button next to the image description that says Translate*/}
              <Button
                variant="outlined"
                onClick={onGenerateGrammarly}
                style={{ margin: "auto" }}
                disabled={!translation || loading}>
                Grammarly
              </Button>
              <Button
                variant="outlined"
                onClick={() => onGenerateAudio(translation)}
                style={{ margin: "auto" }}
                disabled={loading || !translation}>
                Generate Audio
              </Button>
            </Stack>
            {audio && <ReactAudioPlayer src={audio} autoPlay controls />}
          </StyledBox>
        )}
        {/* Image's caption Grammarly Wiki buttons */}
        {translation && wikiDic && (
          <StyledBox>
            {wikiDic.map((wikiDic: { word: string; wiki: string }, index: number) => {
              return (
                <Stack
                  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem" }}
                  key={index}>
                  {/* A drop down to chose the language from*/}

                  <Typography variant="h6">{wikiDic.word}</Typography>
                  <Typography variant="body1">{wikiDic.wiki}</Typography>
                  {/* A button next to the image description that says Translate*/}
                  <Button
                    variant="outlined"
                    onClick={() => onGenerateAudio(wikiDic.word)}
                    style={{ margin: "auto" }}
                    disabled={!wikiDic.word || !wikiDic.wiki || loading}>
                    Generate audio
                  </Button>
                  {audio && <ReactAudioPlayer src={audio} autoPlay controls />}
                </Stack>
              );
            })}
          </StyledBox>
        )}
      </StyledStack>
    </>
  );
};

export default Home;
