import { type } from "os";
import React from "react";

// ========================================
// Types
// ========================================

type State = {
  image?: FormData;
  uploadedFile: string;
  caption: string;
  language: string;
  translation: string;
  audio: string;
  wikiDic: { word: string; wiki: string }[];
};
const initialProps: State = {
  uploadedFile: "",
  caption:
    "To catch and print an exception that occurred in a code snippet, wrap it in an indented try block, followed by the command that catches the exception and saves its error message in string variable e. You can now print the error message with",
  image: undefined,
  translation:
    "To catch and print an exception that occurred in a code snippet, wrap it in an indented try block, followed by the command that catches the exception and saves its error message in string variable e. You can now print the error message with",
  language: "",
  audio: "",
  wikiDic: [{ wiki: "", word: "" }],
};

// ========================================
// Actions
// ========================================

export type Action =
  | {
      type: "setFile";
      payload: { uploadedFile: string };
    }
  | {
      type: "setCaption";
      payload: { caption: string };
    }
  | { type: "setImage"; payload: { image: FormData } }
  | { type: "setLanguage"; payload: { language: string } }
  | { type: "setCaptionAudio"; payload: { audio: string } }
  | { type: "setTranslationAudio"; payload: { audio: string } }
  | { type: "setGrammarly"; payload: { res: { word: string; wiki: string }[] } }
  | { type: "setTranslation"; payload: { translation: string } };

// ========================================
// Reducer Functions
// ========================================

const WhispererStateContext = React.createContext<State | undefined>(undefined);
const WhispererDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function WhispererReducer(state: State, action: Action): State {
  const actionType = action.type;
  switch (actionType) {
    case "setFile": {
      const { uploadedFile } = action.payload || {};
      console.log("----file", uploadedFile);
      return {
        ...state,
        // Set open  props
        uploadedFile: uploadedFile,
      };
    }
    case "setCaption": {
      const { caption } = action.payload || {};
      console.log("----caption", caption);
      return {
        ...state,
        // Set open  props
        caption: caption,
      };
    }
    case "setLanguage": {
      const { language } = action.payload || {};
      console.log("----image", language);
      return {
        ...state,
        // Set open  props
        language: language,
      };
    }
    case "setTranslation": {
      const { translation } = action.payload || {};
      console.log("----translation", translation);
      return {
        ...state,
        // Set open  props
        translation: translation,
      };
    }
    case "setCaptionAudio": {
      const { audio } = action.payload || {};
      console.log("----Audio", audio);
      return {
        ...state,
        // Set open  props
        translation: audio,
      };
    }
    case "setTranslationAudio": {
      const { audio } = action.payload || {};
      console.log("----translation Audio", audio);
      return {
        ...state,
        // Set open  props
        translation: audio,
      };
    }
    case "setGrammarly": {
      const { res } = action.payload || {};
      console.log("----words", res);
      return {
        ...state,
        // Set open  props
        wikiDic: res,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${actionType}`);
    }
  }
}

// ========================================
// Provider
// ========================================
type Dispatch = (action: Action) => void;
type Props = { children: React.ReactNode };
export function WhispererProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(WhispererReducer, initialProps);
  return (
    <WhispererStateContext.Provider value={state}>
      <WhispererDispatchContext.Provider value={dispatch}>{children}</WhispererDispatchContext.Provider>
    </WhispererStateContext.Provider>
  );
}

// ========================================
// Hook Functions
// ========================================
export function useWhispererState() {
  const context = React.useContext(WhispererStateContext);
  if (context === undefined) {
    throw new Error("useWhispererState must be used within a WhispererProvider");
  }
  return context;
}

export function useWhispererDispatch() {
  const context = React.useContext(WhispererDispatchContext);
  if (context === undefined) {
    throw new Error("useWhispererDispatch must be used within a WhispererProvider");
  }
  return context;
}

export function setFile(dispatch: Dispatch, uploadedFile: string) {
  dispatch({ type: "setFile", payload: { uploadedFile } });
}
export function setCaption(dispatch: Dispatch, caption: string) {
  dispatch({ type: "setCaption", payload: { caption } });
}
export function setImage(dispatch: Dispatch, image: FormData) {
  dispatch({ type: "setImage", payload: { image } });
}
export function setLanguage(dispatch: Dispatch, language: string) {
  dispatch({ type: "setLanguage", payload: { language } });
}
export function setTranslation(dispatch: Dispatch, translation: string) {
  dispatch({ type: "setTranslation", payload: { translation } });
}

export function setTranslationAudio(dispatch: Dispatch, audio: string) {
  dispatch({ type: "setTranslationAudio", payload: { audio } });
}

export function setGerammarly(dispatch: Dispatch, res: { word: string; wiki: string }[]) {
  dispatch({ type: "setGrammarly", payload: { res } });
}
