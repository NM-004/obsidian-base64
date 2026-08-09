import { Modal, App, Setting } from 'obsidian';
import { Buffer } from 'buffer';

export class Base64Modal extends Modal {
	constructor(app: App) {
		super(app);
		this.setTitle('Base64 converter');

		let norm_text = '';
		let converted_string = '';
		new Setting(this.contentEl)
			.setClass('b64')
			.setName('Base64')
			.addTextArea((text) => {
				text.onChange((value) => {
					norm_text = value;
				});
			});

		new Setting(this.contentEl).addButton((btn) => {
			btn.setButtonText('Convert to normal');
			btn.setCta();
			btn.onClick(() => {
				converted_string = Buffer.from(norm_text, 'base64').toString(
					'utf-8',
				);
				this.contentEl.createEl('textarea', {
					text: converted_string,
				});
			});
		});
		new Setting(this.contentEl).addButton((btn) => {
			btn.setButtonText('Convert to base64');
			btn.setCta();
			btn.onClick(() => {
				converted_string = Buffer.from(norm_text).toString('base64');
				this.contentEl.createEl('textarea', {
					text: converted_string,
				});
			});
		});
	}
}
