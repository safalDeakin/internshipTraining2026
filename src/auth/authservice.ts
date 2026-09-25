import { users, type User } from "./users";

class AuthService {
  //login concept take email password as para meter
  login(email: string, password: string): User {
    //check each login of user is math with users data or not
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }
    //store in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  getCurrentUser(): User | null {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      return null;
    }
    return JSON.parse(savedUser);
  }
  //logout concept remove from localStorage
  logout(): void {
    localStorage.removeItem("user");
  }
}
export default AuthService;

//auth servie class have fucntion for authentication only
//login()//logout
//then in provider
