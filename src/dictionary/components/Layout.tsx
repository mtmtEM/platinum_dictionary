import React, { useReducer, useEffect, useRef } from "react";
import immer from "immer";
import { EditableSpan } from "../../options/component"
import { MouseDictionarySettings } from "../../options/types";
import { data, res } from "../../options/logic";
import { Preview } from "./Lookup";

import { config } from "../../options/extern";

type MainState = {
    dictDataUsage?: number;
    busy: boolean;
    progress: string;
    settings: MouseDictionarySettings;
    previewText: string;
    panelLevel: 0 | 1 | 2 | 3;
    lang: string;
    initialized: boolean;
  };

type Action =
  | {
      type: "patch_state";
      statePatch: Partial<MainState>;
    }
  | {
      type: "patch_settings";
      settingsPatch: Partial<MouseDictionarySettings>;
    }
  | {
      type: "patch_state_and_settings";
      statePatch: Partial<MainState>;
      settingsPatch: Partial<MouseDictionarySettings>;
    }
  | {
      type: "replace_settings";
      settings: MouseDictionarySettings;
    };

const reducer = (state: MainState, action: Action): MainState => {
switch (action.type) {
    case "patch_state":
    return immer(state, (d) => {
        Object.assign(d, action.statePatch);
    });
    case "patch_settings":
    return immer(state, (d) => {
        Object.assign(d.settings, action.settingsPatch);
    });
    case "patch_state_and_settings":
    return immer(state, (d) => {
        Object.assign(d, action.statePatch);
        Object.assign(d.settings, action.settingsPatch);
    });
    case "replace_settings":
    return immer(state, (d) => {
        d.settings = action.settings;
    });
}
};

const initialState: MainState = {
    dictDataUsage: null,
    busy: false,
    progress: "",
    settings: {} as MouseDictionarySettings,
    previewText: "検索する用語を入力して下さい",
    panelLevel: 1,
    lang: "",
    initialized: false,
  };

export const Layout: React.FC = () => {
    const refPreview = useRef<Preview>();

    const [state, dispatch] = useReducer(reducer, { ...initialState, lang: res.getLang() });

    const updateState = (
        statePatch: Partial<MainState>,
        settingsPatch: Partial<MouseDictionarySettings> = null
    ): void => {
        if (statePatch && settingsPatch) {
            dispatch({ type: "patch_state_and_settings", statePatch, settingsPatch });
        } else if (statePatch) {
            dispatch({ type: "patch_state", statePatch });
        } else if (settingsPatch) {
            dispatch({ type: "patch_settings", settingsPatch });
        }
    };

    useEffect(() => {
        const init = async () => {
            const settings = data.preProcessSettings(await config.loadRawSettings());
            refPreview.current = new Preview(settings);
            updateState({ settings });
            updateState({ initialized: true });
        };
        init();
    }, []);

    const s = state.settings;
    useEffect(() => {
        refPreview.current?.setVisible(state.panelLevel == 1);        
        refPreview.current?.update(state.settings, state.previewText, false);
    }, [state.panelLevel, state.previewText, s]);

    return (
        <div>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <img src="logo_lookup.png" width="300" />
            </div>

            <label>セキュリティ用語検索</label>
            <EditableSpan
                value={state.previewText}
                style={{ width: 600, maxWidth: "70%" }}
                onChange={(e) => updateState({ previewText: e.target.value })}
            ></EditableSpan>
            <br />

            <label>辞書内容</label>
        </div>
    );
}