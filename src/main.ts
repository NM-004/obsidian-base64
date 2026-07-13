import { Plugin } from 'obsidian';
import { Base64Modal } from './base64Modal';

export default class ObsidianBase64 extends Plugin {
	async onload(): Promise<void> {
		this.addRibbonIcon('file-lock', 'Obsidian base64', () => {
			new Base64Modal(this.app).open();
		});
	}
}
