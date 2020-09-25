import immer from "immer";
import { debounce } from "../../options/logic";
import { dom, Generator, view, entry, storage } from "../../options/extern";
import { MouseDictionarySettings } from "../../options/types";

type PreviewWindow = { dialog: HTMLElement; content: HTMLElement };

export class Preview {
  element: HTMLElement;
  update: (settings: MouseDictionarySettings, text: string, refresh: boolean) => void;
  previewWindow: PreviewWindow;
  generator: Generator;

  constructor(settings: MouseDictionarySettings) {
    this.update = debounce(this.updateBody.bind(this), 64);
    this.element = dom.create('<div style="position:absolute;top:10;left:0;z-index:-1;"></div>') as HTMLElement;
    this.element.hidden = true;
    document.body.appendChild(this.element);
    this.refreshGenerator(settings);
    this.refreshElement(settings);
  }

  updateBody(settings: MouseDictionarySettings, text: string, refresh: boolean): void {
    if (refresh) {
      this.refreshElement(settings);
    }
    this.refreshGenerator(settings);
    this.updateText(text, settings.lookupWithCapitalized);
    dom.applyStyles(this.previewWindow.dialog, {
      margin: "0 auto",
      transform: "translateY(5%) translateX(0%)",
      left: "25rem",
      right: "25rem",
      width: "600px",
      height: "50%",
      overflow: 'scroll',
      maxWidth: '40rem',
      maxHeight: '40rem',
    });
  }

  async updateText(previewText: string, lookupWithCapitalized: boolean): Promise<void> {
    const { entries, lang } = entry.build(previewText, lookupWithCapitalized, false);

    const allEntries = [];
    const descriptions = await storage.local.get(entries);
    const { html } = this.generator.generate(entries, descriptions, lang === "en", allEntries);

    if (this.previewWindow) {
      const newDom = dom.create(html);
      this.previewWindow.content.innerHTML = "";
      this.previewWindow.content.appendChild(newDom);
    }
  }

  createWindow(settings: MouseDictionarySettings): PreviewWindow {
    const tmpSettings = immer(settings, (d) => {
      d.normalDialogStyles = null;
      d.hiddenDialogStyles = null;
      d.movingDialogStyles = null;
    });
    const trialWindow = view.create(tmpSettings) as PreviewWindow;
    dom.applyStyles(trialWindow.dialog, {
      top: "310px",
      left: "0px",
    });

    return trialWindow;
  }

  refreshGenerator(settings: MouseDictionarySettings): void {
    try {
      const newGenerator = new Generator(settings);
      if (newGenerator) {
        this.generator = newGenerator;
      }
    } catch {
      // Creating a Generator instance fails when settings is incorrect
    }
  }

  refreshElement(settings: MouseDictionarySettings): void {
    const orgPreviewWindow = this.previewWindow;
    this.previewWindow = null;

    try {
      this.previewWindow = this.createWindow(settings);
      this.element.appendChild(this.previewWindow.dialog);
    } catch (e) {
      console.error(e);
    }

    if (orgPreviewWindow?.dialog) {
      this.element.removeChild(orgPreviewWindow.dialog);
    }
  }

  setVisible(visible: boolean): void {
    this.element.hidden = !visible;
  }
}
