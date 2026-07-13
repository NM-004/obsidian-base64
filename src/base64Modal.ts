import { Modal, App, Setting } from 'obsidian';
import { Buffer } from 'buffer';

export class Base64Modal extends Modal {
	constructor(app: App) {
		super(app);
		this.setTitle('Base64 converter');

		let encoded = '';
		let decodedString = '';
		new Setting(this.contentEl).setName('Base64').addTextArea((text) => {
			text.onChange((value) => {
				encoded = value;
			});
		});

		new Setting(this.contentEl).addButton((btn) => {
			btn.setButtonText('Convert');
			btn.setCta();
			btn.onClick(() => {
				decodedString = Buffer.from(encoded, 'base64').toString(
					'utf-8',
				);
				console.log(decodedString);
				this.contentEl.createEl('h1', {
					text: decodedString,
				});
			});
		});
	}
}
