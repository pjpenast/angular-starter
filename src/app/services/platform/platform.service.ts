import { Injectable } from '@angular/core';

import { Platform, ANDROID, IOS, WEB } from './platform.interface';

@Injectable()
export class PlatformService {
    private _platforms: Array<Platform> = [
        { value: ANDROID, name: 'Android' },
        { value: IOS, name: 'Ios' },
        { value: WEB, name: 'Web' }
    ]

    constructor() {}

    get platforms() {
        return this._platforms;
    }

    set platforms(platforms) {
        this._platforms = platforms;
    }

}
