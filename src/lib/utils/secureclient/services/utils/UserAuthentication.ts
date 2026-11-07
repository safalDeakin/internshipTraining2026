import type { User } from "../models/users";

export const users: User[] = [
    {
        id: 1,
        name: "Ram",
        email: "ram@gmail.com",
        password: "123456",
        role: "ADMIN",
        organizationId: 1,
    },
    {
        id: 2,
        name: "Sita",
        email: "sita@gmail.com",
        password: "123456",
        role: "RECEPTIONIST",
        organizationId: 1,
    },
    {
        id: 3,
        name: "Hari",
        email: "hari@gmail.com",
        password: "123456",
        role: "WAITER",
        organizationId: 2,
    },
];

class UserAuthentication {
    //check email and pwd math for login
    login(email: string, password: string): User {

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
    //logout concept remove from localStorage
    logout(): boolean {
        localStorage.removeItem("user");
        return true
    }

    getCurrentUser(): User | undefined {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
            return undefined;
        }
        return JSON.parse(savedUser);
    }
}

export default UserAuthentication;
