import React from "react";
import { render } from "react-dom";
import { Layout } from "./components/Layout";
import { res } from "../options/logic";
import rule from "../main/core/rule";

res.setLang(res.decideInitialLanguage([...navigator.languages]));

render(<Layout />, document.getElementById('app'));

rule.load();