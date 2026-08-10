import { Modal, App, Setting } from 'obsidian';
import { Buffer } from 'buffer';

export class Base64Modal extends Modal {
	private base64: string = '';
	private utf_8: string = '';
	private convertedValue: string = '';
	private resultDisplayEl!: HTMLElement;
	constructor(app: App) {
		super(app);
	}
	onOpen() {
		const { contentEl } = this;

		contentEl.createEl('h2', { text: 'Convert Base64 to UTF8' });

		new Setting(contentEl).setName('Base64').addText((text) =>
			text.onChange((value) => {
				this.base64 = String(value) || '';
				this.convertBase64();
			}),
		);
		new Setting(contentEl).setName('utf-8').addText((text) => {
			text.onChange((value) => {
				this.utf_8 = String(value) || '';
				this.convertUtf8();
			});
		});

		new Setting(contentEl)
			.setName('Converted')
			.setDesc('Live result')
			.addText((text) => {
				text.setValue('');
				text.inputEl.readOnly = true;
				text.inputEl.addEventListener('click', () => {
					text.inputEl.select();
				});
				this.resultDisplayEl = text.inputEl;
			});
	}

	private convertBase64() {
		const normal = Buffer.from(this.base64, 'base64').toString('utf-8');
		this.convertedValue = normal.toString();

		if (this.resultDisplayEl instanceof HTMLInputElement) {
			this.resultDisplayEl.value = this.convertedValue;
		}
	}

	private convertUtf8() {
		const converted = Buffer.from(this.utf_8, 'utf-8').toString('base64');
		this.convertedValue = converted.toString();
		if (this.resultDisplayEl.instanceOf(HTMLInputElement)) {
			this.resultDisplayEl.value = this.convertedValue;
		}
	}

	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}
