import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, firstName, lastName, email, password, phone, address, geographical_location, tax_Identification_Number) {
    return axios.post(API_URL + "signup", {
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      geographical_location,
      tax_Identification_Number,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
