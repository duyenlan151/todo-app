import { Component, VERSION, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MessagingService } from './services/messing.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';
import { CookieService } from 'ngx-cookie-service';


const STORAGE_LANG_NAME: string = 'langCode';
const LANG_LIST = [
	{
		code: 'vi',
		name: 'Vietnamese',
	},
	{
		code: 'en',
		name: 'English',
	}
]

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	hasTodos: Observable<boolean>;
	name = 'Angular ' + VERSION.major;
	items: Observable<any[]>;
	currentMessage = new BehaviorSubject(null);
	title = 'push-notification';
	message;
	isCollapsed: boolean = true;

	defaultImage = 'https://www.placecage.com/1000/1000';
	image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
	constructor(
		private _todoServices: TodoService,
		private messagingService: MessagingService,
		public _translateService: TranslateService,
		private _cookieService: CookieService
	) {

	}

	ngOnInit() {
		this.messagingService.requestPermission();
		this.messagingService.receiveMessage();
		this.message = this.messagingService.currentMessage;
		this.initLanguage();
	}

	initLanguage() {
		return new Promise((resolve: Function) => {
			this._translateService.addLangs(LANG_LIST.map(lang => lang.code))
			const language = this._cookieService.get('STORAGE_LANG_NAME');
			// console.log(language);
			if (!language) {
				this._translateService.setDefaultLang('en');
			} else {

			}
		})
	}
	onChangeLang(value) {
		this._translateService.use(value);
	}

	handleCollapsed(): void {
		this.isCollapsed = !this.isCollapsed;
	}
}
