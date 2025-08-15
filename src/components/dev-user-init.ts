import { environment } from '../environments/environment';
import { UserStore } from './../core/current-user/user-store';

export function initDevUser() {
  if (!environment.production) {
    UserStore.setUser({
      Id: 1,
      UserName: 'testuser',
      Role: 'Admin',
      Name: 'Test User'
    });
  }
}
