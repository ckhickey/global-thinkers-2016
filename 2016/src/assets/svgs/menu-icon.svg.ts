import { Injectable } from '@angular/core';

@Injectable()

export class MenuIcon{
    
    print(){
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><g><g><rect x="0.2" y="9.2" width="49.6" height="2"></rect></g><g><rect x="0.2" y="24.7" width="49.6" height="2"></rect></g><g><rect x="0.2" y="40.1" width="49.6" height="2"></rect></g></g></svg>`
    }
}