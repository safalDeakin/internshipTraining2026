//author:shrjja

import AccessControl from "./AccessControl";
import type { Resources } from "../models/permission";
import type { Role } from "../models/roles";

//can navigate to view that resource
//handle navigation-security-ermission check
class NavigationSecurity {
  //private cannot cannot acces from outside the class
  private accessControl: AccessControl;
  //when create const navigation security=new NavigationSecuirty it run auto...
  constructor() {
    this.accessControl = new AccessControl();
  }
  canNavigate(role: Role, resource: Resources) {
    return this.accessControl.can(role, resource, "view");
  }
}
export default NavigationSecurity;
